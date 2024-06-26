import {
	Button,
	Flex,
	Heading,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	Stack,
	Text,
} from "@chakra-ui/react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	actionOnConfirm: () => void;
	title?: string;
	text?: string;
	confirmButton?: string;
	cancelButton?: string;
}

export function ConfirmationModal({
	isOpen,
	onClose,
	title,
	text,
	confirmButton,
	cancelButton,
	actionOnConfirm,
}: Props) {
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
							{title ?? "Confirmation Needed"}
						</Heading>
						<Text
							dangerouslySetInnerHTML={{
								__html: text ?? "Are you sure?",
							}}
							textAlign="left"
							my="10px"
							fontSize={20}
							w="100%"
						/>
						<Flex
							direction="column"
							align="center"
							gap="10px"
							width="100%"
						>
							<Button
								onClick={() => {
									actionOnConfirm();
									onClose();
								}}
								size="lg"
								w="250px"
								maxW="250px"
								variant="modalAction"
							>
								{confirmButton ?? "Confirm"}
							</Button>
							<Button
								onClick={onClose}
								size="lg"
								w="250px"
								maxW="250px"
								variant="secondaryModalAction"
							>
								{cancelButton ?? "Cancel"}
							</Button>
						</Flex>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
