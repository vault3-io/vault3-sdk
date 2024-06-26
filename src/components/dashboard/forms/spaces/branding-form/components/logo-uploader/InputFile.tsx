import React, { useEffect, useState } from "react";
import { Stack, Text } from "@chakra-ui/react";
import { DropzoneLogo } from "src/components/dashboard/forms/spaces/branding-form/components/logo-uploader/DropzoneLogo";
import { useWindow } from "src/utils/ssr";

interface InputFileProps {
	maxSize: number;
	initialValue?: File;
	onAddFile?: (file: File) => void;
	onDeleteFile: () => void;
	onError: (error: string) => void;
}

const supportedFileTypes = ["png", "jpg", "jpeg", "svg", "gif"];

export const InputFile = ({
	maxSize,
	initialValue,
	onAddFile,
	onDeleteFile,
	onError,
}: InputFileProps) => {
	const [file, setFile] = useState<File | null>(initialValue || null);

	const window = useWindow();
	useEffect(() => {
		if (initialValue) setFile(initialValue);
	}, [window?.location?.search]);

	const onDrop = (acceptedFiles: File[]) => {
		const uploadedFile = acceptedFiles[0];

		if (
			!supportedFileTypes.includes(
				uploadedFile.name.split(".").pop() || ""
			)
		) {
			onError("This file type is not supported.");
			return;
		}

		if (uploadedFile.size > maxSize) {
			onError("This file is too large. Please upload a smaller file.");
			return;
		}

		setFile(uploadedFile);

		if (onAddFile) {
			onAddFile(uploadedFile);
		}

		onError("");
	};

	const onDelete = () => {
		setFile(null);
		onDeleteFile();
	};

	return (
		<Stack>
			<DropzoneLogo
				onDrop={onDrop}
				acceptFileType={{ "image/*": [] }}
				files={file ? [file] : null}
				onDelete={onDelete}
			/>
			<Text fontSize="sm" color="gray.600">
				{"Supported file types: JPG, PNG, GIF, SVG. Max size: 1 MB"}
			</Text>
		</Stack>
	);
};
