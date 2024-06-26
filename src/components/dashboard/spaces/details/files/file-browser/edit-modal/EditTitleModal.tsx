import {
	Button,
	Flex,
	Heading,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMutationUpdateFile } from "hooks";
import {
	copyTitleWithoutFileExtension,
	saveNewTitleWithOldExtension,
} from "../utils";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	currentName: string;
	fileId: string;
}

export function EditTitleModal({
	isOpen,
	onClose,
	currentName,
	fileId,
}: Props) {
	const [title, setTitle] = useState("");

	useEffect(() => {
		setTitle(copyTitleWithoutFileExtension(currentName));
	}, [currentName, isOpen]);

	const { mutate: updateTitle, isLoading } = useMutationUpdateFile();

	const handleUpdate = () =>
		updateTitle(
			{
				id: fileId,
				name: saveNewTitleWithOldExtension(title, currentName),
			},
			{ onSuccess: () => onClose() }
		);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size={{ base: "xs", md: "sm", lg: "xl" }}
			motionPreset="slideInBottom"
			isCentered
			scrollBehavior={"inside"}
			closeOnOverlayClick={false}
		>
			<ModalOverlay backdropFilter="blur(10px)" bg="transparent" />
			<ModalContent
				backdropFilter="auto"
				backdropBlur="100px"
				bg="rgba(255, 255, 255, 0.2)"
				rounded="2xl"
			>
				<ModalCloseButton
					_focus={{ boxShadow: "none" }}
					onClick={() => onClose()}
				/>
				<ModalBody p="35px 63px">
					<Stack align="center" spacing={2}>
						<Heading
							as="h2"
							fontSize="36px"
							fontWeight="700"
							lineHeight="48px"
							my="10px"
							textAlign="center"
							size="sm"
						>
							Rename Title
						</Heading>
						<Flex
							direction="column"
							align="center"
							gap="18px"
							width="100%"
						>
							<Input
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>

							<Button
								size="lg"
								variant="modalAction"
								type="button"
								isLoading={isLoading}
								onClick={handleUpdate}
							>
								Save
							</Button>
						</Flex>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
