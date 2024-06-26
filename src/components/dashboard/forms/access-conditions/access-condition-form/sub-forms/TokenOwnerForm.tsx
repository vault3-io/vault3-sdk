import {
	Flex,
	Input,
	Text,
	FormControl,
	FormLabel,
	HStack,
	Switch,
	FormErrorMessage,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { NumberInput } from "src/components/dashboard/forms/access-conditions/access-condition-form/components/NumberInput";
import { Dispatch, SetStateAction } from "react";
import { NFTAddressesFields } from "src/components/dashboard/forms/access-conditions/access-condition-form/components/NFTAddressesFields";

interface Props {
	isTokenAmount: boolean;
	setAreFungibleTokens: Dispatch<SetStateAction<boolean>>;
}

export const TokenOwnerForm = ({
	isTokenAmount,
	setAreFungibleTokens,
}: Props) => {
	const {
		register,
		formState: {
			errors,
			defaultValues: { minAmount },
		},
	} = useFormContext();

	return (
		<Flex direction="column" gap={6}>
			<Text fontSize="18px" fontWeight="700">
				Policy ID
			</Text>
			<FormControl isInvalid={!!errors["policyId"]}>
				<Input
					{...register("policyId")}
					errorBorderColor="red.300"
					placeholder="9b426921a21f...XYZ"
					autoComplete="off"
				/>
				<FormErrorMessage
					position="absolute"
					mt="2px"
					fontSize="12px"
				>{`${errors["policyId"]?.message}`}</FormErrorMessage>
			</FormControl>
			<HStack>
				<FormLabel m="0">By token amount</FormLabel>
				<Switch
					size="lg"
					gridRow={2}
					isChecked={isTokenAmount}
					onChange={() => setAreFungibleTokens((state) => !state)}
				/>
				<FormLabel m="0">By single token</FormLabel>
			</HStack>
			{!isTokenAmount && (
				<FormControl>
					<FormLabel>Minimum Amount of Tokens</FormLabel>
					<NumberInput name="minAmount" defaultValue={minAmount} />
				</FormControl>
			)}
			{isTokenAmount && <NFTAddressesFields />}
		</Flex>
	);
};
