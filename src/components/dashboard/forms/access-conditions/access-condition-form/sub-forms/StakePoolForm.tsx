import {
	Flex,
	Input,
	Text,
	FormControl,
	FormLabel,
	FormErrorMessage,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { NumberInput } from "src/components/dashboard/forms/access-conditions/access-condition-form/components/NumberInput";

export const StakePoolForm = () => {
	const {
		register,
		formState: {
			errors,
			defaultValues: { minEpochs, minDelegation },
		},
	} = useFormContext();

	return (
		<Flex direction="column" gap={5}>
			<Text fontSize="18px" fontWeight="700">
				Stake Pool ID (bech32)
			</Text>
			<FormControl isInvalid={!!errors["poolId"]}>
				<Input
					{...register("poolId")}
					errorBorderColor="red.300"
					placeholder="pool10fx...XYZ"
					autoComplete="off"
				/>
				<FormErrorMessage
					position="absolute"
					mt="2px"
					fontSize="12px"
				>{`${errors["poolId"]?.message}`}</FormErrorMessage>
			</FormControl>
			<FormControl>
				<FormLabel>Minimum Amount of Epochs</FormLabel>
				<NumberInput name="minEpochs" defaultValue={minEpochs} />
			</FormControl>
			<FormControl>
				<FormLabel>Minimum Delegation (ADA)</FormLabel>
				<NumberInput
					name="minDelegation"
					defaultValue={minDelegation}
				/>
			</FormControl>
		</Flex>
	);
};
