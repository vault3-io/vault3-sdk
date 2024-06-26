import React, { ReactNode, useEffect, useState } from "react";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { FiSave } from "react-icons/fi";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AccessConditionByIdQuery } from "generated/graphql";
import { accessConditionScheme } from "utils/resolvers/accessConditionScheme";
import { AccessConditions } from "utils/enums";
import { AccessConditionForm } from "src/components/dashboard/forms/access-conditions/access-condition-form/AccessConditionForm";
import { AccessConditionFormData } from "types/form-data/accessConditionFormData";
import {
	useMutationUpdateAssetOwnerAccessCondition,
	useMutationUpdatePoolDelegationAccessCondition,
	useMutationUpdateWhitelistAccessCondition,
} from "hooks/graphql/accessConditions";

interface Props {
	accessCondition: AccessConditionByIdQuery["accessConditionById"];
	onSave: () => void;
}

export const AccessConditionDetails = ({ accessCondition, onSave }: Props) => {
	const {
		name,
		type,
		id: conditionId,
		whitelistSettings,
		assetOwnerSettings,
		poolDelegationSettings,
	} = accessCondition ?? {};

	const { mutate: updateWhitelist, isLoading: isWhitelistLoading } =
		useMutationUpdateWhitelistAccessCondition();
	const { mutate: updatePoolDelegation, isLoading: isPoolDelegationLoading } =
		useMutationUpdatePoolDelegationAccessCondition();
	const { mutate: updateTokenOwner, isLoading: isTokenOwnerLoading } =
		useMutationUpdateAssetOwnerAccessCondition();

	const [selectedConditionType, setSelectedConditionType] =
		useState<string>(type);

	const [isTokenAmount, setIsTokenAmount] = useState<boolean>(false);

	useEffect(() => {
		setIsTokenAmount(!!assetOwnerSettings?.assetFingerprints[0]);
	}, [type, assetOwnerSettings?.assetFingerprints]);

	//DEFAULT VALUES
	const defaultValues = {
		name: name ?? "",
		allow: whitelistSettings?.allow?.map((item) => {
			return { value: item };
		}) ?? [{ value: "" }],
		policyId: assetOwnerSettings?.policyId ?? "",
		minAmount: assetOwnerSettings?.minAmount ?? 1,
		assetFingerprints:
			assetOwnerSettings?.assetFingerprints?.map((item) => {
				return { value: item };
			}) ?? [{ value: "" }] ??
			"",
		poolId: poolDelegationSettings?.poolId ?? "",
		minEpochs: poolDelegationSettings?.minEpochs ?? 0,
		minDelegation: poolDelegationSettings?.minDelegation ?? 0,
	};

	// FORM INITIALIZATION
	const methods = useForm({
		mode: "onSubmit",
		resolver: yupResolver(
			accessConditionScheme(
				selectedConditionType ?? AccessConditions.whitelist,
				isTokenAmount ?? false
			)
		),
		defaultValues: defaultValues,
	});

	const {
		getValues,
		formState: { isDirty },
	} = methods;

	const onSubmit = async (values: AccessConditionFormData) => {
		if (selectedConditionType === AccessConditions.whitelist) {
			updateWhitelist(
				{
					id: conditionId,
					name: values.name,
					allow: values.allow.map((item) => item.value),
				},
				{
					onSuccess: onSave,
				}
			);
		}
		if (selectedConditionType === AccessConditions.stakePool) {
			updatePoolDelegation(
				{
					id: conditionId,
					name: values.name,
					poolId: values.poolId,
					minDelegation: values.minDelegation,
					minEpochs: values.minEpochs,
				},
				{
					onSuccess: onSave,
				}
			);
		}
		if (selectedConditionType === AccessConditions.token) {
			updateTokenOwner(
				{
					id: conditionId,
					name: values.name,
					policyId: values.policyId,
					minAmount: isTokenAmount ? 1 : values.minAmount,
					assetFingerprints: isTokenAmount
						? values.assetFingerprints.map((item) => item.value)
						: [],
				},
				{
					onSuccess: onSave,
				}
			);
		}
	};

	return (
		<FormProvider {...methods}>
			<Flex justifyContent="space-between" align="start">
				<Button
					size="sm"
					variant="primaryAction"
					type="submit"
					leftIcon={<FiSave />}
					form="accessConditionForm"
					isDisabled={
						!isDirty &&
						JSON.stringify(getValues()) ===
							JSON.stringify(defaultValues)
					}
					isLoading={
						isPoolDelegationLoading ||
						isTokenOwnerLoading ||
						isWhitelistLoading
					}
				>
					Save
				</Button>
			</Flex>
			<AccessConditionForm
				accessConditionId={conditionId}
				onSubmit={onSubmit}
				selectedConditionType={selectedConditionType}
				setSelectedConditionType={setSelectedConditionType}
				isTokenAmount={isTokenAmount}
				setIsTokenAmount={setIsTokenAmount}
			/>
		</FormProvider>
	);
};
