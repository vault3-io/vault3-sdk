import { FaRegPaste } from "react-icons/fa6";
import {
	Flex,
	Input,
	Text,
	InputGroup,
	InputRightElement,
	Button,
	Icon,
	FormControl,
	FormErrorMessage,
} from "@chakra-ui/react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { Tooltip } from "src/components/dashboard/common/tooltip/Tooltip";
import { useState } from "react";
import { NFTAddressesModal } from "src/components/dashboard/access-conditions/modals/NFTAddressesModal";

export const NFTAddressesFields = () => {
	const [isNFTModalOpen, setIsNFTModalOpen] = useState(false);

	const {
		register,
		control,
		formState: { errors },
	} = useFormContext();

	const { fields, append, remove } = useFieldArray({
		control,
		name: "assetFingerprints",
	});

	return (
		<>
			<Flex direction="column" gap={5}>
				<Flex justifyContent="space-between" alignItems="center">
					<Text fontSize="18px" fontWeight="700">
						Asset Fingerprints
					</Text>
					<Flex alignItems="center" gap="8px">
						<Tooltip label="Add multiple asset fingerprints">
							<Button
								size="sm"
								variant="primaryAction"
								borderRadius="50%"
								fontSize="16px"
								width="36px"
								height="36px"
								type="button"
								onClick={() => setIsNFTModalOpen(true)}
							>
								<Icon as={FaRegPaste} />
							</Button>
						</Tooltip>
						<Tooltip label="Add asset fingerprint field">
							<Button
								size="sm"
								variant="primaryAction"
								borderRadius="50%"
								fontSize="16px"
								width="36px"
								height="36px"
								type="button"
								onClick={() => append({ value: "" })}
							>
								+
							</Button>
						</Tooltip>
					</Flex>
				</Flex>
				{fields.map((field, index) => (
					<FormControl
						key={field.id}
						isInvalid={!!errors["assetFingerprints"]?.[index]}
					>
						<InputGroup>
							<Input
								errorBorderColor="red.300"
								placeholder="asset123...XYZ"
								autoComplete="off"
								{...register(
									`assetFingerprints.${index}.value`
								)}
							/>
							{fields.length > 1 && (
								<InputRightElement
									cursor="pointer"
									onClick={() => remove(index)}
								>
									<Icon as={RxCross2} color="red.500" />
								</InputRightElement>
							)}
						</InputGroup>
						<FormErrorMessage
							position="absolute"
							mt="2px"
							fontSize="12px"
						>{`${errors["assetFingerprints"]?.[index]?.value?.message}`}</FormErrorMessage>
					</FormControl>
				))}
			</Flex>
			<NFTAddressesModal
				isOpen={isNFTModalOpen}
				onClose={() => setIsNFTModalOpen(false)}
			/>
		</>
	);
};
