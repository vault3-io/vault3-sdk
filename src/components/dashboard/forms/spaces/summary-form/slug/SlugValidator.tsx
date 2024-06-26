import { Flex, Icon, Text } from "@chakra-ui/react";
import { CiCircleCheck } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { motion } from "framer-motion";
import Vault3Spinner from "src/components/Vault3Spinner";

interface Props {
	isSlugValid: boolean;
	loadingDelay: boolean;
}

export const SlugValidator = ({ isSlugValid, loadingDelay }: Props) => {
	const { icon, text, color } = generateSlugContent(isSlugValid) ?? {};

	if (loadingDelay || !icon || !text || !color)
		return (
			<Flex align="center" gap="2px">
				<Vault3Spinner color="blue" imageWidth={22} imageHeight={22} />
				<Text fontSize="14px" fontWeight="400" color="blue.700">
					Checking availability
				</Text>
			</Flex>
		);

	return (
		<motion.div
			key={loadingDelay ? "loading" : "content"}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			<Flex align="center" gap="2px">
				{icon}{" "}
				<Text fontSize="14px" fontWeight="400" color={color}>
					{text}
				</Text>
			</Flex>
		</motion.div>
	);
};

const generateSlugContent = (isValid: boolean | undefined) => {
	if (isValid)
		return {
			icon: <Icon as={CiCircleCheck} fontSize={22} color="blue.500" />,
			text: "Custom link is available",
			color: "blue.500",
		};
	else if (isValid === false)
		return {
			icon: <Icon as={RxCrossCircled} fontSize={22} color="red.600" />,
			text: "Custom link is unavailable",
			color: "red.600",
		};
};
