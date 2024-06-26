import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Select,
} from "@chakra-ui/react";
// import { useUnsavedChanges } from "../../../app/UnsavedChangesProvider";
import { AccessConditions } from "utils/enums";
import { WhitelistForm } from "./sub-forms/WhitelistForm";
import { StakePoolForm } from "./sub-forms/StakePoolForm";
import { TokenOwnerForm } from "./sub-forms/TokenOwnerForm";
import { AccessConditionFormData } from "types/form-data/accessConditionFormData";

interface Props {
	accessConditionId?: string;
	onSubmit: (data: AccessConditionFormData) => void;
	selectedConditionType: string;
	setSelectedConditionType?: Dispatch<SetStateAction<string>>;
	isTokenAmount: boolean;
	setIsTokenAmount: Dispatch<SetStateAction<boolean>>;
}

export const AccessConditionForm = ({
	accessConditionId,
	onSubmit,
	selectedConditionType,
	setSelectedConditionType,
	isTokenAmount,
	setIsTokenAmount,
}: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isSubmitted, isSubmitting },
	} = useFormContext();

	// const { handleUnsavedChange } = useUnsavedChanges();

	// useEffect(() => {
	// 	handleUnsavedChange(isDirty && !isSubmitted && !isSubmitting);
	// }, [isDirty, isSubmitted, isSubmitting, handleUnsavedChange]);

	const isCreateMode = !accessConditionId;

	return (
		<form id="accessConditionForm" onSubmit={handleSubmit(onSubmit)}>
			<Flex direction="column" gap={6}>
				<FormControl>
					<FormLabel>Type</FormLabel>
					<Select
						value={selectedConditionType}
						isDisabled={!isCreateMode}
						onChange={(e) => {
							if (setSelectedConditionType)
								setSelectedConditionType(e.target.value);
						}}
						w="25%"
					>
						{selectOptions.map(({ label, value }) => (
							<option key={value} value={value}>
								{label}
							</option>
						))}
					</Select>
				</FormControl>
				<FormControl height="max-content" isInvalid={!!errors["name"]}>
					<FormLabel>Name</FormLabel>
					<Input errorBorderColor="red.300" {...register("name")} />
					<FormErrorMessage
						position="absolute"
						mt="2px"
						fontSize="12px"
					>{`${errors["name"]?.message}`}</FormErrorMessage>
				</FormControl>
				{selectedConditionType === AccessConditions.whitelist && (
					<WhitelistForm />
				)}
				{selectedConditionType === AccessConditions.stakePool && (
					<StakePoolForm />
				)}
				{selectedConditionType === AccessConditions.token && (
					<TokenOwnerForm
						isTokenAmount={isTokenAmount}
						setAreFungibleTokens={setIsTokenAmount}
					/>
				)}
			</Flex>
		</form>
	);
};

const selectOptions = [
	{ label: "Whitelist", value: AccessConditions.whitelist },
	{ label: "Token Owner", value: AccessConditions.token },
	{ label: "Stake Pool", value: AccessConditions.stakePool },
];
