import { Flex, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface Props {
	icon: IconType;
}

export function NoDataIcon({ icon }: Props) {
	return (
		<Flex
			justifyContent="center"
			alignItems="center"
			w="82px"
			h="82px"
			borderRadius="50%"
			backgroundColor="blue.50"
		>
			<Icon as={icon} color="blue.700" fontSize="40px" />
		</Flex>
	);
}
