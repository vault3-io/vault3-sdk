import { useState, useEffect } from "react";
import { TableContainer, Table, Thead, Tbody, Tr, Td } from "@chakra-ui/react";
import { SpaceListQuery } from "generated/graphql";
import {
	gateHeaders,
	mapTitleToKey,
	getNextSortDirection,
	sortByKey,
} from "./utils";
import {
	formatDateToDateString,
	formatDateToDateTimeString,
} from "utils/functions/dateFormatters";
import { PulsingDot } from "./status-dot/PulsingDot";
import { ConditionSockets } from "../../common/condition-sockets/ConditionSockets";
import { Tooltip } from "../../common/tooltip/Tooltip";
import { ActionButtons } from "./action-buttons/ActionButtons";

import { SortDirection } from "utils/enums";
import { ColumnHeader } from "src/components/dashboard/common/table-components/ColumnHeader";

interface Props {
	data: SpaceListQuery["spaces"];
	onEdit: (spaceId: string) => void;
}

const columnsWithoutSorting = ["Access Conditions", null];

export function GatesTable({ data, onEdit }: Props) {
	const [sortedData, setSortedData] = useState<
		SpaceListQuery["spaces"] | null
	>(null);
	const [sortDirection, setSortDirection] = useState<SortDirection>(
		SortDirection.None
	);
	const [sortKey, setSortKey] = useState<
		keyof SpaceListQuery["spaces"][0] | null
	>(null);

	useEffect(() => {
		if (sortKey && sortDirection !== SortDirection.None) {
			const sorted = sortByKey(data, sortKey, sortDirection);
			setSortedData(sorted);
		} else {
			setSortedData(null);
		}
	}, [data, sortKey, sortDirection]);

	const handleSort = (title: string) => {
		const key = mapTitleToKey(title);
		if (columnsWithoutSorting.includes(title)) return;

		if (key === sortKey) {
			const newDirection = getNextSortDirection(sortDirection);
			setSortDirection(newDirection);
		} else {
			setSortKey(key);
			setSortDirection(SortDirection.Descending);
		}
	};

	return (
		<TableContainer>
			<Table>
				<Thead>
					<Tr>
						{gateHeaders.map(({ title, tooltip }) => (
							<ColumnHeader
								key={title}
								title={title}
								tooltip={tooltip}
								onClick={() => handleSort(title)}
								columnsWithoutSorting={columnsWithoutSorting}
								sortDirection={
									sortKey === mapTitleToKey(title)
										? sortDirection
										: SortDirection.None
								}
							/>
						))}
					</Tr>
				</Thead>
				<Tbody>
					{(sortedData || data).map((item) => (
						<Tr
							key={item.id}
							onClick={() => onEdit(item.id)}
							cursor="pointer"
						>
							<Td>
								<PulsingDot
									isActive={item.isActive}
									color="blue.500"
								/>
							</Td>
							<Td>{item.name}</Td>
							<Td>{item.slug ?? "-"}</Td>
							<Td>
								<ConditionSockets
									showConditionName
									conditions={item.spaceAccessConditions.map(
										({ accessCondition }) => accessCondition
									)}
								/>
							</Td>
							<Td>
								<Tooltip
									label={formatDateToDateTimeString(
										item.createdAt
									)}
								>
									{formatDateToDateString(item.createdAt)}
								</Tooltip>
							</Td>
							<Td>
								<ActionButtons
									id={item.id}
									name={item.name}
									slug={item.slug}
									onEdit={() => onEdit(item.id)}
								/>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
