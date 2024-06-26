import {
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Stack,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

import { DownloadFilesFromSpaceQuery } from "generated/graphql";
import { base64ToBlob } from "utils/functions/base64";
import { viewerStyles } from "./utils";
import { ViewerActionButtons } from "./components/ViewerActionButtons";
import { SpaceLoader } from "@vault/ui/components/space";
import dynamic from "next/dynamic";

// NOTICE: React-PDF a subdependency from the viewer we are using is not supported in SSR context
// See https://github.com/diegomura/react-pdf/issues/2624
const FilesViewer = dynamic(
	() =>
		import("./components/FilesViewer").then((module) => module.FilesViewer),
	{
		ssr: false,
	}
);

interface Props {
	isOpen: boolean;
	onClose: () => void;
	files: DownloadFilesFromSpaceQuery["filesInSpace"];
	activeFileIndex: number | null;
	setActiveFileIndex: Dispatch<SetStateAction<number>>;
}

export function FilesViewerModal({
	isOpen,
	onClose,
	files,
	activeFileIndex,
	setActiveFileIndex,
}: Props) {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (isLoading && files.length > 1) {
			setActiveFileIndex(0);
		}
	}, [isLoading]);

	useEffect(() => {
		if (!files[activeFileIndex]) {
			setActiveFileIndex(null);
		}
	}, [files]);

	const renderedFiles = useMemo(
		() =>
			files.map(({ download: file }, index) => {
				return {
					index: index,
					uri: URL.createObjectURL(
						base64ToBlob(file.mime, file.content)
					),
					fileName: file.name,
				};
			}),
		[files]
	);

	const handleActiveFileIndex = (index: number) => {
		setActiveFileIndex(index);
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size={"4xl"}
			motionPreset="slideInBottom"
			isCentered
			closeOnOverlayClick={false}
		>
			<ModalOverlay backdropFilter="blur(10px)" bg="transparent" />
			<ModalContent
				backdropFilter="auto"
				backdropBlur="100px"
				bg="rgba(255, 255, 255, 0.02)"
				rounded="2xl"
			>
				<ModalCloseButton
					isDisabled={isLoading}
					_focus={{ boxShadow: "none" }}
					onClick={() => onClose()}
				/>
				<ModalBody p="35px 63px">
					<Stack
						overflowY="auto"
						maxH="80vh"
						align="center"
						spacing={2}
						css={viewerStyles}
					>
						{!isLoading && (
							<FilesViewer
								files={renderedFiles}
								activeFile={renderedFiles[activeFileIndex]}
								handleActiveFileIndex={handleActiveFileIndex}
							/>
						)}
						{isLoading && (
							<Flex
								h="100%"
								justifyContent="center"
								py="24px"
								alignItems="center"
							>
								<SpaceLoader
									message="Removing your file..."
									primaryColor="blue.700"
									iconVariant="blue"
								/>
							</Flex>
						)}
					</Stack>
					<Stack align="center" pt={4} spacing={2}>
						<ViewerActionButtons
							file={files[activeFileIndex]?.download}
							setIsLoading={setIsLoading}
						/>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
