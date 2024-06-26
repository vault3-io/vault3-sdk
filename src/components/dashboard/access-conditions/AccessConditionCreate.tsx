import React, { ReactNode, useEffect, useState } from "react";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiSave } from "react-icons/fi";
import { FormProvider, useForm } from "react-hook-form";

import { AccessConditions } from "utils/enums";
import { accessConditionScheme } from "utils/resolvers/accessConditionScheme";
import { AccessConditionFormData } from "types/form-data/accessConditionFormData";
import { useToastRender } from "hooks/useToast";
import {
	useMutationAssignAssetOwnerAccessCondition,
	useMutationAssignPoolDelegationAccessCondition,
	useMutationAssignWhitelistAccessCondition,
	useMutationLinkAccessConditionToSpace,
} from "hooks";
import { EaseInAnimation } from "src/animations";
import { AccessConditionForm } from "../forms/access-conditions/access-condition-form/AccessConditionForm";

interface Props {
	spaceId?: string;
	title?: ReactNode;
	onSuccess: (spaceId: string | null) => void;
}

export const AccessConditionCreate = ({ spaceId, title, onSuccess }: Props) => {
	const { mutate: assignPoolDelegation, isLoading: poolDelegationLoading } =
		useMutationAssignPoolDelegationAccessCondition();
	const { mutate: assignTokenOwner, isLoading: tokenOwnerLoading } =
		useMutationAssignAssetOwnerAccessCondition();
	const { mutate: assignWhitelist, isLoading: whitelistLoading } =
		useMutationAssignWhitelistAccessCondition();

	const { mutate: linkConditionToSpace } =
		useMutationLinkAccessConditionToSpace();

	const { successToast, errorToast } = useToastRender();
	const [selectedConditionType, setSelectedConditionType] = useState<string>(
		AccessConditions.whitelist
	);

	const [isTokenAmount, setIsTokenAmount] = useState<boolean>(false);

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
		reset,
		formState: { isDirty },
	} = methods;

	useEffect(() => reset(), [reset, selectedConditionType]);

	const onSuccessFunction = (id: string) => {
		reset();
		if (spaceId) {
			linkConditionToSpace({
				accessConditionId: id,
				spaceId,
			});
			onSuccess(id);
		} else {
			onSuccess(null);
		}
	};

	const onSubmit = async (values: AccessConditionFormData) => {
		if (selectedConditionType === AccessConditions.whitelist) {
			assignWhitelist(
				{
					name: values.name,
					allow: values.allow.map((item) => item.value),
				},
				{
					onSuccess: ({ id }) => {
						successToast({
							description:
								"Whitelist has been created successfully!",
						});
						onSuccessFunction(id);
					},
					onError: () => {
						errorToast({
							description:
								"Something went wrong. Contact with our support.",
						});
					},
				}
			);
		}
		if (selectedConditionType === AccessConditions.stakePool) {
			assignPoolDelegation(
				{
					name: values.name,
					poolId: values.poolId,
					minDelegation: values.minDelegation,
					minEpochs: values.minEpochs,
				},
				{
					onSuccess: ({ id }) => {
						successToast({
							description:
								"Pool Delegation has been created successfully!",
						});
						onSuccessFunction(id);
					},
					onError: () => {
						errorToast({
							description:
								"Something went wrong. Contact with our support.",
						});
					},
				}
			);
		}
		if (selectedConditionType === AccessConditions.token) {
			assignTokenOwner(
				{
					name: values.name,
					policyId: values.policyId,
					minAmount: isTokenAmount ? 1 : values.minAmount,
					assetFingerprints: isTokenAmount
						? values.assetFingerprints.map((item) => item.value)
						: [],
				},
				{
					onSuccess: ({ id }) => {
						successToast({
							description:
								"Token Owner has been created successfully!",
						});
						onSuccessFunction(id);
					},
					onError: () => {
						errorToast({
							description:
								"Something went wrong. Contact with our support.",
						});
					},
				}
			);
		}
	};

	return (
		<EaseInAnimation duration={0.5}>
			<FormProvider {...methods}>
				<Flex justifyContent="space-between" align="start">
					{title ?? (
						<Heading size="md" fontWeight={700} mb={3}>
							New Access Condition
						</Heading>
					)}
					<Button
						size="sm"
						variant="primaryAction"
						type="submit"
						leftIcon={<FiSave />}
						form="accessConditionForm"
						isDisabled={!isDirty}
						isLoading={
							tokenOwnerLoading ||
							poolDelegationLoading ||
							whitelistLoading
						}
					>
						Save
					</Button>
				</Flex>
				<AccessConditionForm
					onSubmit={onSubmit}
					selectedConditionType={selectedConditionType}
					setSelectedConditionType={setSelectedConditionType}
					isTokenAmount={isTokenAmount}
					setIsTokenAmount={setIsTokenAmount}
				/>
			</FormProvider>
		</EaseInAnimation>
	);
};

const defaultValues = {
	name: "",
	allow: [{ value: "" }],
	policyId: "",
	minAmount: 1,
	assetFingerprints: [{ value: "" }],
	poolId: "",
	minEpochs: 0,
	minDelegation: 0,
};
