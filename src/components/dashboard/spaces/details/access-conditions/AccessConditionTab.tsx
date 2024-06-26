import { AccessCondition } from "generated/graphql";
import { NoDataBox } from "src/components/dashboard/common/no-data-box/NoDataBox";
import { SpaceAccessConditionsTable } from "./access-conditions-table/Table";
import { BiDoorOpen } from "react-icons/bi";
import { AccessConditionsSearch } from "./access-conditions-search/AccessConditionsSearch";
import { useQueryAccessConditionList } from "hooks/graphql/accessConditions";

interface Props {
	id: string;
	accessConditions: {
		accessCondition: Pick<AccessCondition, "id" | "name" | "type">;
	}[];
	onCreateAccessCondition: () => void;
}

export const AccessConditionTab = ({
	accessConditions,
	id,
	onCreateAccessCondition,
}: Props) => {
	const { accessConditions: availableAccessConditionsList, isLoading } =
		useQueryAccessConditionList({});

	const searchData = availableAccessConditionsList?.filter(
		(item) =>
			!accessConditions
				.map(({ accessCondition }) => accessCondition.id)
				.includes(item.id)
	);

	return (
		<>
			{!!availableAccessConditionsList?.length && (
				<AccessConditionsSearch
					spaceId={id}
					data={searchData}
					isDataLoading={isLoading}
					onCreateAccessCondition={onCreateAccessCondition}
				/>
			)}
			{!!accessConditions.length && (
				<SpaceAccessConditionsTable
					spaceId={id}
					data={accessConditions}
				/>
			)}
			{!accessConditions.length && (
				<NoDataBox
					title={
						!availableAccessConditionsList?.length
							? "No access conditions to link"
							: "No access conditions so far"
					}
					description={
						!availableAccessConditionsList?.length
							? "Create your first access condition and link it to this space."
							: "Search for your access conditions and link them to this space. If this space should be public, you can leave it like this 😉"
					}
					icon={BiDoorOpen}
					primaryButtonAction={
						!availableAccessConditionsList?.length
							? onCreateAccessCondition
							: undefined
					}
				/>
			)}
		</>
	);
};
