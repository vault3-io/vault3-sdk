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
import { SpaceAccessConditionsByAccessConditionQuery } from "generated/graphql";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	spaces: SpaceAccessConditionsByAccessConditionQuery["spaceAccessConditionsByAccessCondition"];
	onRedirectToTheSpace?: (spaceId: string) => void;
}

export const SpacesLinkedToAccessConditionModal = ({
	isOpen,
	onClose,
	spaces,
	onRedirectToTheSpace,
}: Props) => {
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
							size="lg"
						>
							Can&apos;t delete linked access conditions
						</Heading>
						<Text w="full" fontSize={19} mt="10px">
							This access condition is still linked to space
							{spaces?.length === 1 ? "" : "s"}{" "}
							{
								<MappedSpaces
									data={spaces}
									onRedirectToTheSpace={onRedirectToTheSpace}
								/>
							}
						</Text>
						<Text w="full" fontSize={19} mb="20px">
							Please unlink it and try again.
						</Text>
						<Flex direction="column" align="center" width="100%">
							<Button
								onClick={() => {
									onClose();
								}}
								size="lg"
								w="250px"
								maxW="250px"
								variant="modalAction"
							>
								Ok
							</Button>
						</Flex>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

const MappedSpaces = ({
	data,
	onRedirectToTheSpace,
}: {
	data: SpaceAccessConditionsByAccessConditionQuery["spaceAccessConditionsByAccessCondition"];
	onRedirectToTheSpace?: (spaceId: string) => void;
}) => {
	if (onRedirectToTheSpace) {
		return (
			<>
				{data.map(({ space }, index) => (
					<>
						<Text
							as="span"
							color="blue.700"
							textDecor="underline"
							cursor="pointer"
							transition="0.3s"
							_hover={{ color: "blue.900" }}
							onClick={() => onRedirectToTheSpace(space.id)}
						>
							{space.name}
						</Text>
						{data.length !== index + 1 && ", "}
						{data.length === index + 1 && ". "}
					</>
				))}
			</>
		);
	}

	return (
		<>
			{data.map(({ space }, index) => (
				<>
					<Text as="span" fontWeight="700">
						{space.name}
					</Text>
					{data.length !== index + 1 && ", "}
					{data.length === index + 1 && ". "}
				</>
			))}
		</>
	);
};
