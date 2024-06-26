import * as yup from "yup";
import { AccessConditions } from "../enums";
import {
	validateAssetFingerprint,
	validateCardanoStakeAddress,
	validateCardanoStakePoolId,
	validatePolicyId,
} from "../functions/uploadValidators";

export const accessConditionScheme = (
	selectedType: string,
	areFungibleTokens: boolean
) => {
	const isWhitelist = selectedType === AccessConditions.whitelist;
	const isAccessOwner = selectedType === AccessConditions.token;
	const isStakePool = selectedType === AccessConditions.stakePool;

	let schema = yup.object().shape({
		name: yup.string().required("This field is required"),
	});

	if (isWhitelist) {
		schema = schema.shape({
			allow: yup
				.array()
				.of(
					yup.object().shape({
						value: yup
							.string()
							.test(
								"cardano-stake-address-validation",
								"Invalid address",
								(value) =>
									validateCardanoStakeAddress(value ?? "")
							)
							.required("This field is required"),
					})
				)
				.required("This field is required"),
		});
	}

	if (isAccessOwner) {
		schema = schema.shape({
			policyId: yup
				.string()
				.test("policy-id-validation", "Invalid policy ID", (policyId) =>
					validatePolicyId(policyId ?? "")
				)
				.required("This field is required"),
			minAmount: yup.number().required("This field is required"),
		});
		if (areFungibleTokens) {
			schema = schema.shape({
				assetFingerprints: yup
					.array()
					.of(
						yup.object().shape({
							value: yup
								.string()
								.test(
									"asset-fingerprint-validation",
									"Invalid asset fingerprint",
									(assetFingerprint) =>
										validateAssetFingerprint(
											assetFingerprint ?? ""
										)
								)
								.required("This field is required"),
						})
					)
					.required("This field is required"),
			});
		}
	}

	if (isStakePool) {
		schema = schema.shape({
			poolId: yup
				.string()
				.test(
					"stake-pool-id-validation",
					"Invalid stake pool ID",
					(poolId) => validateCardanoStakePoolId(poolId ?? "")
				)
				.required("This field is required"),
			minEpochs: yup.number().required("This field is required"),
			minDelegation: yup.number().required("This field is required"),
		});
	}

	return schema;
};
