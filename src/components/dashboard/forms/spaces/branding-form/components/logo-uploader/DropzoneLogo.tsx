import React from "react";
import { Box, Center, Icon, Stack, Text } from "@chakra-ui/react";
import { Accept, useDropzone } from "react-dropzone";
import { MdOutlineFileUpload } from "react-icons/md";
import { DropzonePreview } from "src/components/dashboard/forms/spaces/branding-form/components/logo-uploader/DropzonePreview";

interface DropzoneLogoProps {
	acceptFileType: { [value: string]: string[] };
	files?: File[] | null;
	onDrop: (acceptedFiles: File[]) => void;
	onDelete: () => void;
}

export const DropzoneLogo = ({
	acceptFileType,
	files,
	onDrop,
	onDelete,
}: DropzoneLogoProps) => {
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: acceptFileType as Accept,
	});

	return (
		<Stack>
			<Box
				{...getRootProps()}
				maxH="fit-content"
				minH="44"
				p="3"
				borderRadius={8}
				borderColor="gray.500"
				borderWidth="2px"
				borderStyle="dashed"
				maxW="fit-content"
				minW="44"
				backdropFilter="auto"
				backdropBlur="100px"
				bg="white"
				transition="0.5s"
				_hover={{ backgroundColor: "gray.100" }}
			>
				<Center mt={-2} verticalAlign="center" cursor="pointer">
					{isDragActive ? (
						<Text py={28}>Release to drop the files here</Text>
					) : files && files[0] ? (
						<DropzonePreview file={files[0]} onDelete={onDelete} />
					) : (
						<Icon
							as={MdOutlineFileUpload}
							color="blue.700"
							w={16}
							h={16}
							my={12}
							_hover={{
								transform: "scale(1.2)",
								transition: "0.2s",
							}}
						/>
					)}
				</Center>
				<input {...getInputProps()} />
			</Box>
		</Stack>
	);
};
