import { SpaceListQuery } from "generated/graphql";
import { TableHeader } from "types/tableHeader";
import { SortDirection } from "utils/enums";

export const gateHeaders: TableHeader[] = [
	{
		title: "Status",
	},
	{
		title: "Title",
	},
	{
		title: "Custom Link",
	},
	{
		title: "Access Conditions",
	},
	{
		title: "Created At",
	},
	{
		title: '',
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
	Id = "id",
	Name = "name",
	IsActive = "isActive",
	CreatedAt = "createdAt",
	Slug = "slug",
	AccessConditions = "spaceAccessConditions",
}

export function mapTitleToKey(
	title: string
): keyof SpaceListQuery["spaces"][0] | null {
	switch (title) {
		case "Title":
			return ColumnKeys.Name;
		case "Status":
			return ColumnKeys.IsActive;
		case "Created At":
			return ColumnKeys.CreatedAt;
		case "Slug":
			return ColumnKeys.Slug;
		case "Access Conditions":
			return ColumnKeys.AccessConditions;
		case '':
			return null;
		default:
			return ColumnKeys.Name;
	}
}

export function sortByKey<T>(
	arr: T[],
	key: keyof SpaceListQuery["spaces"][0],
	direction: SortDirection
): T[] {
	if (direction === SortDirection.None) return arr;

	return [...arr].sort((a, b) => {
		if (key === ColumnKeys.CreatedAt) {
			const numA = new Date(a[key] as string).getTime();
			const numB = new Date(b[key] as string).getTime();
			return direction === SortDirection.Ascending
				? numA - numB
				: numB - numA;
		} else {
			const valA = a[key]?.toLowerCase() || "";
			const valB = b[key]?.toLowerCase() || "";
			if (valA < valB)
				return direction === SortDirection.Ascending ? -1 : 1;
			if (valA > valB)
				return direction === SortDirection.Ascending ? 1 : -1;
			return 0;
		}
	});
}
