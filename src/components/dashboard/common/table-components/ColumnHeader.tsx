import { Box, Flex, Icon, Th } from "@chakra-ui/react";
import { SortDirection } from "utils/enums";
import { Tooltip } from "src/components/dashboard/common/tooltip/Tooltip";
import { GoQuestion } from "react-icons/go";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

interface ColumnHeaderProps {
	title: string;
	tooltip?: string;
	onClick?: () => void;
	sortDirection?: SortDirection;
	columnsWithoutSorting?: (string | null)[];
}

export const ColumnHeader = ({
	title,
	tooltip = undefined,
	onClick,
	sortDirection,
	columnsWithoutSorting,
}: ColumnHeaderProps) => {
	return (
		<Th
			onClick={onClick}
			cursor={
				columnsWithoutSorting.includes(title) ? "default" : "pointer"
			}
		>
			{!tooltip && (
				<Flex>
					{title}
					<SortArrows sortDirection={sortDirection} />
				</Flex>
			)}
			{tooltip && (
				<Flex gap="4px">
					{title}
					<Tooltip label={tooltip}>
						<Box>
							<Icon
								as={GoQuestion}
								fontSize="18px"
								color="gray.700"
							/>
						</Box>
					</Tooltip>
					<SortArrows sortDirection={sortDirection} />
				</Flex>
			)}
		</Th>
	);
};

const SortArrows = ({ sortDirection }: { sortDirection: SortDirection }) => {
	return (
		<Flex align="center" position="relative" h="100%">
			<Box position="absolute" left="2px">
				{sortDirection === SortDirection.Ascending && (
					<TiArrowSortedDown />
				)}
				{sortDirection === SortDirection.Descending && (
					<TiArrowSortedUp />
				)}
			</Box>
		</Flex>
	);
};
