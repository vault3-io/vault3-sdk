import React, { useState, useMemo, useCallback } from "react";
import { Box, Divider, Flex, useDisclosure } from "@chakra-ui/react";
import {
	FileBrowser as Browser,
	FileToolbar,
	FileList,
	FileContextMenu,
	ChonkyActions,
	FileActionHandler,
	FileData,
} from "chonky";
import { ChonkyIconFA } from "chonky-icon-fontawesome";
import { CustomActions, fileActions, fileBrowserBoxStyles } from "./utils";
import { EditTitleModal } from "./edit-modal/EditTitleModal";
import { useMutationCreateFile, useMutationDeleteFile } from "hooks";
import { contentToBase64, fileToBase64 } from "utils/functions/io";
import { SpaceLoader } from "src/features";
import { isExecutable } from "@vault/ui/components/upload/FileHandler";
import { useToastRender } from "hooks/useToast";
import { DownloadFilesFromSpaceQuery } from "generated/graphql";
import { ZipWriter, BlobWriter, BlobReader } from "@zip.js/zip.js";
import { FileDropzone } from "./file-dropzone/FileDropzone";
import { FilesViewerModal } from "./files-viewer/FilesViewerModal";

const _FileBrowser = Browser as any;

interface Props {
	files: DownloadFilesFromSpaceQuery["filesInSpace"];
	spaceId: string;
}

export const FileBrowser = ({ files, spaceId }: Props) => {
	const [isDropzone, setIsDropzone] = useState(false);
	const [activeFileIndex, setActiveFileIndex] = useState<number | null>(null);

	const formattedFiles = useMemo(
		() =>
			files?.map(({ download: file }) => {
				return {
					id: file.id,
					name: file.name,
					thumbnailUrl: contentToBase64(file.mime, file.content),
				};
			}),
		[files]
	);

	const { errorToast } = useToastRender();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedFile, setSelectedFile] = useState<FileData | null>(null);

	const { mutateAsync: createFile, isLoading: isCreating } =
		useMutationCreateFile();
	const { mutateAsync: deleteFile, isLoading: isRemoving } =
		useMutationDeleteFile();

	const uploadFiles = async (dropedFiles: File[]) => {
		if (dropedFiles) {
			for (const file of dropedFiles) {
				if (isExecutable(file.name)) {
					errorToast({
						description: `${file.name} has unsupported file type.`,
					});
				} else if (file.size > 4e6) {
					errorToast({
						description:
							"This file is too large. Please upload a smaller file.",
					});
				} else {
					createFile({
						spaceId: spaceId,
						name: file.name,
						mime: file.type,
						content: (await fileToBase64(file)) as string,
					});
				}
			}
		}
	};

	const handleFileAction: FileActionHandler = useCallback(
		(data) => {
			if (data.id === ChonkyActions.OpenFiles.id) {
				if (data.payload.targetFile) {
					const activeIndex = files.findIndex(
						({ download: file }) =>
							file.id === data.payload.targetFile.id
					);
					setActiveFileIndex(activeIndex);
				}
			}
			if (data.id === ChonkyActions.UploadFiles.id) {
				const input = document.createElement("input");
				input.type = "file";
				input.multiple = true;
				input.onchange = async () =>
					uploadFiles(Array.from(input.files));
				input.click();
			} else if (data.id === ChonkyActions.DownloadFiles.id) {
				data.state.selectedFiles.forEach((file) => {
					const link = document.createElement("a");
					link.href = file.thumbnailUrl;
					link.download = file.name;
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				});
			} else if (data.id === CustomActions.EditFileTitle.id) {
				const fileToEdit = data.state.selectedFiles[0];
				if (fileToEdit) {
					setSelectedFile(fileToEdit);
					onOpen();
				}
			} else if (data.id === CustomActions.DownloadSelectedFiles.id) {
				if (!data.state.selectedFiles.length) return;

				const zipWriter = new ZipWriter(
					new BlobWriter("application/zip")
				);

				const filePromises = data.state.selectedFiles.map(
					async (file) => {
						const response = await fetch(file.thumbnailUrl);
						const blob = await response.blob();
						await zipWriter.add(file.name, new BlobReader(blob));
					}
				);

				Promise.all(filePromises).then(async () => {
					const zipBlob = await zipWriter.close();
					const link = document.createElement("a");
					link.href = URL.createObjectURL(zipBlob);
					link.download = `space-${spaceId}-files.zip`;
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				});
			} else if (data.id === CustomActions.DeleteFiles.id) {
				data.state.selectedFiles.forEach(
					async (file) => await deleteFile({ id: file.id })
				);
			}
		},
		[onOpen, files]
	);

	return (
		<>
			<Box
				position="relative"
				height="325px"
				css={fileBrowserBoxStyles}
				onDragEnter={() => setIsDropzone(true)}
			>
				<_FileBrowser
					files={formattedFiles}
					disableDragAndDrop={true}
					disableDragAndDropProvider={true}
					disableDefaultFileActions={true}
					clearSelectionOnOutsideClick={true}
					iconComponent={ChonkyIconFA}
					fileActions={fileActions}
					onFileAction={handleFileAction}
				>
					<FileToolbar />
					<Divider mb={3} />
					{(isCreating || isRemoving) && (
						<Flex
							h="100%"
							justifyContent="center"
							alignItems="center"
						>
							<SpaceLoader
								message={
									isCreating
										? "Storing your files..."
										: "Removing your files..."
								}
								primaryColor="blue.700"
								iconVariant="blue"
							/>
						</Flex>
					)}
					{!isCreating && !isRemoving && (
						<>
							<FileList />
							<FileContextMenu />
						</>
					)}
				</_FileBrowser>
				{isDropzone && (
					<FileDropzone
						onDragLeave={() => setIsDropzone(false)}
						onDrop={uploadFiles}
					/>
				)}
			</Box>
			{selectedFile && (
				<EditTitleModal
					isOpen={isOpen}
					onClose={onClose}
					currentName={selectedFile.name}
					fileId={selectedFile.id}
				/>
			)}
			{/* {activeFileIndex !== null && (
				<FilesViewerModal
					isOpen={activeFileIndex !== null}
					onClose={() => setActiveFileIndex(null)}
					files={files}
					activeFileIndex={activeFileIndex}
					setActiveFileIndex={setActiveFileIndex}
				/>
			)} */}
		</>
	);
};
