import { Box, Flex } from "@chakra-ui/react";
import { Tooltip } from "src/components/dashboard/common/tooltip/Tooltip";

interface Props {
	status: boolean;
}

export function StatusDot({ status }: Props) {
	return (
		<Flex width="100%" pl="15px" justify="start" align="center">
			<Tooltip label={status ? "Active" : "Inactive"}>
				<Box
					width="18px"
					height="18px"
					borderRadius="50%"
					backgroundColor={status ? "blue.500" : "gray.400"}
				/>
			</Tooltip>
		</Flex>
	);
}
