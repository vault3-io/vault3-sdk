import { AccessCondition } from "generated/graphql";
import { TableHeader } from "types/tableHeader";
import { SortDirection } from "utils/enums";

export const conditionsHeaders: TableHeader[] = [
	{
		title: "Name",
	},
	{
		title: "Type",
	},
	{
		title: null,
	},
];

export const getNextSortDirection = (
	currentDirection: SortDirection
): SortDirection => {
	switch (currentDirection) {
		case SortDirection.Descending:
			return SortDirection.Ascending;
		case SortDirection.Ascending:
			return SortDirection.None;
		case SortDirection.None:
			return SortDirection.Descending;
	}
};

export enum ColumnKeys {
	Name = "name",
	Type = "type",
}

export function mapTitleToKey(
	title: string
): keyof Pick<AccessCondition, "id" | "name" | "type"> {
	switch (title) {
		case "Name":
			return ColumnKeys.Name;
		case "Type":
			return ColumnKeys.Type;
		case null:
			return null;
		default:
			return ColumnKeys.Name;
	}
}

export function sortByKey<T>(
	arr: T[],
	key: keyof Pick<AccessCondition, "id" | "name" | "type">,
	direction: SortDirection
): T[] {
	if (direction === SortDirection.None) return arr;

	return [...arr].sort((a, b) => {
		const valA = a[key]?.toLowerCase() || "";
		const valB = b[key]?.toLowerCase() || "";
		if (valA < valB) return direction === SortDirection.Ascending ? -1 : 1;
		if (valA > valB) return direction === SortDirection.Ascending ? 1 : -1;
		return 0;
	});
}
