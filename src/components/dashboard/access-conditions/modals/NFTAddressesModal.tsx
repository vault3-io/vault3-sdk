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
	Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

export function NFTAddressesModal({ isOpen, onClose }: Props) {
	const { setValue, getValues } = useFormContext();

	const [text, setText] = useState("");

	const currentFingerPrints = !getValues("assetFingerprints")?.[0]?.value
		? []
		: getValues("assetFingerprints");

	const processInput = () => {
		const formattedText = text.replace(/[.,;:]/g, "");

		const fingerPrintsArray = formattedText
			.split(/\s+/)
			.map((fingerPrint) => {
				return { value: fingerPrint };
			});

		setValue("assetFingerprints", [
			...currentFingerPrints,
			...fingerPrintsArray,
		]);
		onClose();
	};

	useEffect(() => setText(""), [onClose]);

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
							Add multiple asset fingerprints
						</Heading>
						<Text textAlign="left" my="10px" fontSize={20} w="100%">
							Paste here <strong>asset fingerprints</strong>. Each
							asset fingerprint should starts from{" "}
							<strong>asset</strong> word and be separated by the{" "}
							<strong>space</strong> or the{" "}
							<strong>new line</strong>.
						</Text>
						<Flex
							direction="column"
							align="center"
							gap="18px"
							width="100%"
						>
							<Textarea
								value={text}
								onChange={(e) => setText(e.target.value)}
								placeholder="asset101...XYZ asset102...XYZ etc."
								autoComplete="off"
								textAlign="start"
								resize="none"
								maxH="500px"
								w="100%"
							/>

							<Button
								size="lg"
								variant="modalAction"
								type="button"
								onClick={processInput}
							>
								Add
							</Button>
						</Flex>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
