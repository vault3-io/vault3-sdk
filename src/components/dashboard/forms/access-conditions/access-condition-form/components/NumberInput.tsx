import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface Props {
	name: string;
	defaultValue: number;
}

export const NumberInput = ({ name, defaultValue }: Props) => {
	const {
		watch,
		setValue,
		formState: { errors },
	} = useFormContext();

	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
		useNumberInput({
			step: 1,
			defaultValue: defaultValue,
			min: 0,
			onChange: (value) => setValue(name, value),
		});

	const inc = getIncrementButtonProps();
	const dec = getDecrementButtonProps();
	const input = getInputProps();

	return (
		<HStack maxW="240px">
			<Button {...dec}>-</Button>
			<Input
				textAlign="center"
				value={watch(name)}
				errorBorderColor="red.300"
				isInvalid={!!errors[name]}
				{...input}
			/>
			<Button
				_hover={{ backgroundColor: "blue.800" }}
				backgroundColor="blue.700"
				color="white"
				{...inc}
			>
				+
			</Button>
		</HStack>
	);
};
