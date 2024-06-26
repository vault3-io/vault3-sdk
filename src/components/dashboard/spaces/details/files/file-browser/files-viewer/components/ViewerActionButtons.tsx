import { Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { Tooltip } from "@vault/ui/components/tooltip/Tooltip";
import { FaPen, FaTrash } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { useMutationDeleteFile } from "hooks";
import { DownloadFilesFromSpaceQuery } from "generated/graphql";
import { contentToBase64 } from "utils/functions/base64";
import { EditTitleModal } from "../../edit-modal/EditTitleModal";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useToastRender } from "hooks/useToast";

type SpaceFile = DownloadFilesFromSpaceQuery["filesInSpace"][0]["download"];

interface Props {
	file: SpaceFile;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const ViewerActionButtons = ({ file, setIsLoading }: Props) => {
	const { successToast } = useToastRender();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { mutate: deleteFile, isLoading: isRemoving } =
		useMutationDeleteFile();

	const handleDownloadFile = (file: SpaceFile) => {
		const link = document.createElement("a");
		link.href = contentToBase64(file.mime, file.content);
		link.download = file.name;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	useEffect(() => setIsLoading(isRemoving), [isRemoving]);

	return (
		<>
			<Flex gap={4} alignItems="center">
				<Tooltip placement="bottom" label="Download file">
					<IconButton
						icon={<MdOutlineFileDownload />}
						aria-label="download-button"
						size="sm"
						variant="primaryAction"
						borderRadius="50%"
						fontSize="24px"
						width="42px"
						height="42px"
						type="button"
						isDisabled={isRemoving}
						onClick={() => handleDownloadFile(file)}
					/>
				</Tooltip>

				<Tooltip placement="bottom" label="Edit file name">
					<IconButton
						icon={<FaPen />}
						aria-label="next-button"
						size="sm"
						variant="primaryAction"
						borderRadius="50%"
						fontSize="16px"
						width="42px"
						height="42px"
						type="button"
						isDisabled={isRemoving}
						onClick={onOpen}
					/>
				</Tooltip>
				<Tooltip placement="bottom" label="Delete file">
					<IconButton
						icon={<FaTrash />}
						aria-label="next-button"
						size="sm"
						variant="primaryAction"
						borderRadius="50%"
						fontSize="16px"
						width="42px"
						height="42px"
						type="button"
						isLoading={isRemoving}
						isDisabled={isRemoving}
						onClick={() =>
							deleteFile(
								{ id: file.id },
								{
									onSuccess: () =>
										successToast({
											description:
												"File has been removed successfully!",
										}),
								}
							)
						}
					/>
				</Tooltip>
			</Flex>
			<EditTitleModal
				isOpen={isOpen}
				onClose={onClose}
				currentName={file?.name}
				fileId={file?.id}
			/>
		</>
	);
};
