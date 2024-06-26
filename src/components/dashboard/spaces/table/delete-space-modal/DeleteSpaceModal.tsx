import {
	Alert,
	AlertIcon,
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
	Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { FaRegTrashCan } from "react-icons/fa6";
import { useMutationDeleteSpace } from "hooks";

interface Props {
	id: string;
	spaceName: string;
	isOpen: boolean;
	onClose: () => void;
}

export function DeleteSpaceModal({ id, spaceName, isOpen, onClose }: Props) {
	const { mutate: deleteSpace, isLoading } = useMutationDeleteSpace();

	const { register, watch, handleSubmit } = useForm({
		defaultValues: { spaceTitle: "" },
	});

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
				bg="rgba(255, 255, 255, 0.02)"
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
							fontSize="42px"
							fontWeight="700"
							lineHeight="48px"
							mt="10px"
							textAlign="center"
							size="sm"
						>
							Delete Space
						</Heading>
						<Text textAlign="left" my="10px" fontSize={20} w="100%">
							{"To delete"} <strong>{spaceName}</strong>{" "}
							{"please type the space's title"}{" "}
							<strong>{spaceName}</strong>
							{"."}
						</Text>
						<form
							style={{ width: "100%" }}
							onSubmit={handleSubmit(() => deleteSpace({ id }))}
						>
							<Flex
								direction="column"
								align="center"
								gap="18px"
								width="100%"
							>
								<Input
									placeholder={spaceName}
									autoComplete="off"
									textAlign="center"
									{...register("spaceTitle")}
								/>
								<Alert status="warning">
									<AlertIcon />
									This action is irreversible and it will also
									delete all associated files to this space.
								</Alert>
								<Button
									size="lg"
									variant="modalAction"
									type="submit"
									isDisabled={
										watch("spaceTitle") !== spaceName
									}
									isLoading={isLoading}
									leftIcon={<FaRegTrashCan />}
								>
									Delete
								</Button>
							</Flex>
						</form>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
