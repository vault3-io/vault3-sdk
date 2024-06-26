import React, { useState } from "react";
import {
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { InputFile } from "src/components/dashboard/forms/spaces/branding-form/components/logo-uploader/InputFile";
import { useFormContext } from "react-hook-form";
import { base64ToFile, fileToBase64 } from "utils/functions/io";

export const LayoutInputs = () => {
	const {
		register,
		setValue,
		formState: { defaultValues },
	} = useFormContext();
	const { logoFileName, logoFileMime, logoFileContent } = defaultValues;

	const initialLogo =
		logoFileContent && logoFileMime && logoFileName
			? base64ToFile(logoFileName, logoFileMime, logoFileContent)
			: null;

	const [logoError, setLogoError] = useState("");

	const handleOnValueChangeLogo = async (logo: File) => {
		const logoFileContent = logo
			? ((await fileToBase64(logo)) as string)
			: "";

		setValue("logoFileContent", logoFileContent);
		setValue("logoFileMime", logo.name);
		setValue("logoFileName", logo.type);
	};

	const handleOnDeleteLogo = () => {
		setValue("logoFileContent", "");
		setValue("logoFileMime", "");
		setValue("logoFileName", "");
	};

	const handleOnLogoError = (error: string) => {
		setLogoError(error);
	};

	return (
		<Flex direction="column" gap={4}>
			<FormControl isInvalid={!!logoError}>
				<FormLabel mb={4}>Logo</FormLabel>
				<InputFile
					initialValue={initialLogo}
					onAddFile={handleOnValueChangeLogo}
					onDeleteFile={handleOnDeleteLogo}
					onError={handleOnLogoError}
					maxSize={1e6}
				/>
				<FormErrorMessage mt="4px">{logoError}</FormErrorMessage>
			</FormControl>
			<FormControl>
				<FormLabel>Website</FormLabel>
				<Input
					placeholder="https://mywebsite.io"
					{...register("websiteURL")}
				/>
			</FormControl>
			<Flex w="100%" gap={8}>
				<FormControl>
					<FormLabel>Background Color</FormLabel>
					<Input
						{...register("backgroundColor")}
						type="color"
						padding={0}
						width={10}
						appearance="none"
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Font Color</FormLabel>
					<Input
						{...register("fontColor")}
						type="color"
						padding={0}
						width={10}
						appearance="none"
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Primary Color</FormLabel>
					<Input
						{...register("primaryColor")}
						type="color"
						padding={0}
						width={10}
						appearance="none"
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Secondary Color</FormLabel>
					<Input
						{...register("secondaryColor")}
						type="color"
						padding={0}
						width={10}
						appearance="none"
					/>
				</FormControl>
			</Flex>
		</Flex>
	);
};
