import { FaRegPaste } from "react-icons/fa6";
import { useFieldArray, useFormContext } from "react-hook-form";
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
import { RxCross2 } from "react-icons/rx";
import { Tooltip } from "src/components/dashboard/common/tooltip/Tooltip";
import { StakeAddressesModal } from "../../../../access-conditions/modals/StakeAddressesModal";
import { useState } from "react";

export const WhitelistForm = () => {
	const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);

	const {
		register,
		control,
		formState: { errors },
	} = useFormContext();

	const { fields, append, remove } = useFieldArray({
		control,
		name: "allow",
	});

	return (
		<>
			<Flex direction="column" gap={5}>
				<Flex justifyContent="space-between" alignItems="center">
					<Text fontSize="18px" fontWeight="700">
						Stake Addresses
					</Text>
					<Flex alignItems="center" gap="8px">
						<Tooltip label="Add multiple stake addresses">
							<Button
								size="sm"
								variant="primaryAction"
								borderRadius="50%"
								fontSize="16px"
								width="36px"
								height="36px"
								type="button"
								onClick={() => setIsStakeModalOpen(true)}
							>
								<Icon as={FaRegPaste} />
							</Button>
						</Tooltip>
						<Tooltip label="Add stake address field">
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
						isInvalid={!!errors["allow"]?.[index]}
					>
						<InputGroup>
							<Input
								errorBorderColor="red.300"
								placeholder="stake123...XYZ"
								autoComplete="off"
								{...register(`allow.${index}.value`)}
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
						>{`${errors["allow"]?.[index]?.value?.message}`}</FormErrorMessage>
					</FormControl>
				))}
			</Flex>
			<StakeAddressesModal
				isOpen={isStakeModalOpen}
				onClose={() => setIsStakeModalOpen(false)}
			/>
		</>
	);
};
