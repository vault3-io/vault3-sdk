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
	createGate: () => void;
	isLoading: boolean;
}

export function FirstSpaceModal({
	isOpen,
	onClose,
	createGate,
	isLoading,
}: Props) {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size="lg"
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
							textAlign="center"
							size="sm"
						>
							Congratulations
						</Heading>
						<Text textAlign="justify" fontSize={20} my="10px">
							You just created your first space! Finish it by
							adding access conditions, exclusive files, and
							branding before sharing it with your community.
						</Text>
						<Flex
							direction="column"
							align="center"
							gap="10px"
							width="100%"
						>
							<Button
								onClick={() => {
									createGate();
								}}
								size="lg"
								w="250px"
								maxW="250px"
								isLoading={isLoading}
								isDisabled={isLoading}
								variant="modalAction"
							>
								Add access conditions
							</Button>
						</Flex>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
