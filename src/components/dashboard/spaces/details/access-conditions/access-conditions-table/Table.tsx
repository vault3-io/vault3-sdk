import { useEffect, useState } from "react";
import { TableContainer, Table, Thead, Tbody, Tr, Td } from "@chakra-ui/react";

import { ActionButtons } from "./action-buttons/ActionButtons";

import {
	conditionsHeaders,
	getNextSortDirection,
	mapTitleToKey,
	sortByKey,
} from "./utils";
import { ColumnHeader } from "src/components/dashboard/common/table-components/ColumnHeader";
import { ConditionSockets } from "src/components/dashboard/common/condition-sockets/ConditionSockets";
import { SortDirection } from "utils/enums";
import { AccessCondition } from "generated/graphql";

interface Props {
	data: { accessCondition: Pick<AccessCondition, "id" | "name" | "type"> }[];
	spaceId: string;
}

const columnsWithoutSorting = [null];

export function SpaceAccessConditionsTable({ spaceId, data }: Props) {
	const accessConditions = data.map(({ accessCondition }) => {
		return {
			id: accessCondition.id,
			name: accessCondition.name,
			type: accessCondition.type,
		};
	});

	const [sortedData, setSortedData] = useState<
		{ id: string; name: string; type: string }[] | null
	>(null);
	const [sortDirection, setSortDirection] = useState<SortDirection>(
		SortDirection.None
	);
	const [sortKey, setSortKey] = useState<
		keyof { id: string; name: string; type: string } | null
	>(null);

	useEffect(() => {
		if (sortKey && sortDirection !== SortDirection.None) {
			const sorted = sortByKey(accessConditions, sortKey, sortDirection);
			setSortedData(sorted);
		} else {
			setSortedData(null);
		}
	}, [accessConditions, sortKey, sortDirection]);

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
						{conditionsHeaders.map(({ title, tooltip }) => (
							<ColumnHeader
								key={title}
								title={title}
								tooltip={tooltip}
								columnsWithoutSorting={columnsWithoutSorting}
								onClick={() => handleSort(title)}
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
					{(sortedData || accessConditions).map((item, index) => (
						<Tr key={index}>
							<Td>{item.name}</Td>
							<Td>
								<ConditionSockets conditions={[item]} />
							</Td>
							<Td width="60%">
								<ActionButtons
									accessConditionId={item.id}
									spaceId={spaceId}
									name={item.name}
								/>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
