import { Flex, FormControl, FormLabel, Switch, Input } from "@chakra-ui/react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	title: string;
	urlField: string;
	buttonTextField: string;
	handleSwitch: () => void;
	switchState: boolean;
}

export const CtaFields = ({
	title,
	urlField,
	buttonTextField,
	handleSwitch,
	switchState,
}: Props) => {
	const {
		register,
		watch,
		formState: { defaultValues },
		setValue,
	} = useFormContext();

	useEffect(() => {
		if (!switchState) {
			setValue(urlField, "");
			setValue(buttonTextField, "");
		} else {
			setValue(urlField, defaultValues[urlField]);
			setValue(buttonTextField, defaultValues[buttonTextField]);
		}
	}, [switchState, setValue, urlField, buttonTextField, defaultValues]);

	return (
		<Flex flex={1} direction="column" gap={4}>
			<FormControl>
				<FormLabel mb={3}>{title}</FormLabel>
				<Switch
					size="lg"
					isChecked={switchState}
					onChange={handleSwitch}
				/>
			</FormControl>
			{switchState && (
				<>
					<FormControl>
						<FormLabel>URL</FormLabel>
						<Input
							placeholder="https://mywebsite.io"
							{...register(urlField)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Button text</FormLabel>
						<Input
							isDisabled={!watch(urlField)}
							{...register(buttonTextField)}
						/>
					</FormControl>
				</>
			)}
		</Flex>
	);
};
