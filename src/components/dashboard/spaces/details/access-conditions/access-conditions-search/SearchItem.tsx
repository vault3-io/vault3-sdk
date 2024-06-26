import { Flex, Icon, ListItem, Spinner } from "@chakra-ui/react";
import { AiOutlineLink } from "react-icons/ai";
import { ConditionSocket } from "../../../../common/condition-sockets/ConditionSockets";
import { Tooltip } from "src/components/dashboard/common/tooltip/Tooltip";
import { AccessConditionListQuery } from "generated/graphql";
import { useMutationLinkAccessConditionToSpace } from "hooks";

interface Props {
	data: AccessConditionListQuery["accessConditions"][0];
	spaceId: string;
}

export const SearchItem = ({ data, spaceId }: Props) => {
	const { name, type, id: accessConditionId } = data;

	const { mutate: linkConditionToSpace, isLoading } =
		useMutationLinkAccessConditionToSpace();

	return (
		<Tooltip
			placement="top"
			label="Click to link access condition to this space"
		>
			<ListItem
				key={accessConditionId}
				display="flex"
				gap="8px"
				color="gray.700"
				p="4px 16px"
				cursor={isLoading ? "default" : "pointer"}
				_hover={{ backgroundColor: "gray.50" }}
				onClick={() => {
					if (!isLoading)
						linkConditionToSpace({ accessConditionId, spaceId });
				}}
			>
				<Flex
					w="100%"
					alignItems="center"
					justifyContent="space-between"
				>
					<Flex userSelect="none" alignItems="center" gap="8px">
						{name}
						<ConditionSocket condition={type} pointer />
					</Flex>
					{isLoading && (
						<Spinner color="blue.700" w="21px" h="21px" />
					)}
					{!isLoading && (
						<Icon
							as={AiOutlineLink}
							color="blue.700"
							fontSize="21px"
							w="20px"
							h="20px"
						/>
					)}
				</Flex>
			</ListItem>
		</Tooltip>
	);
};
