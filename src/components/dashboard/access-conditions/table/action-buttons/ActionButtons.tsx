import { useState } from "react";
import { MenuItem, Spinner } from "@chakra-ui/react";

import { ConfirmationModal } from "../../../common/modals/ConfirmationModal";
import { FaPen, FaTrash } from "react-icons/fa";

import { MdContentCopy } from "react-icons/md";
import { useToastRender } from "hooks/useToast";
import {
	useMutationDeleteAccessCondition,
	useMutationDuplicateAccessCondition,
	useQuerySpacesLinkedToAccessCondition,
} from "hooks";
import { MenuDropdown } from "src/components/dashboard/common/menu-dropdown/menu-dropdown";
import { SpacesLinkedToAccessConditionModal } from "../../modals/SpacesLinkedToAccessConditionModal";

interface Props {
	accessConditionId: string;
	name: string;
	onEdit: () => void;
	onRedirectToTheSpace?: (spaceId: string) => void;
}

export function ActionButtons({
	name,
	accessConditionId,
	onEdit,
	onRedirectToTheSpace,
}: Props) {
	const { errorToast, successToast } = useToastRender();

	const { mutate: deleteAccessCondition } =
		useMutationDeleteAccessCondition();

	const { mutate: duplicateAccessCondition, isLoading } =
		useMutationDuplicateAccessCondition();

	const { spaceAccessConditions } = useQuerySpacesLinkedToAccessCondition({
		accessConditionId,
	});

	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const [isLinkedSpaceOpen, setIsLinkedSpacesOpen] = useState(false);

	const handleDeleteAccessCondition = () => {
		if (!!spaceAccessConditions?.length) {
			setIsLinkedSpacesOpen(true);
		} else {
			deleteAccessCondition(
				{ id: accessConditionId },
				{
					onSuccess: ({ name }) => {
						successToast({
							description: `${name} has been removed successfully!`,
						});
					},
					onError: (error: Error) => {
						errorToast({
							title: "Removing access condition has failed",
							description: error?.message ?? "",
						});
					},
				}
			);
		}
	};

	return (
		<>
			<MenuDropdown>
				<MenuItem
					icon={<FaPen width="16px" height="16px" />}
					color="gray.600"
					fontSize="16px"
					onClick={(e) => {
						e.stopPropagation();
						onEdit();
					}}
				>
					Edit access condition
				</MenuItem>
				<MenuItem
					icon={
						isLoading ? (
							<Spinner
								color="blue.700"
								width="16px"
								h="16px"
								m="12px"
							/>
						) : (
							<MdContentCopy width="16px" height="16px" />
						)
					}
					color="gray.600"
					fontSize="16px"
					isDisabled={isLoading}
					onClick={(e) => {
						e.stopPropagation();
						duplicateAccessCondition(
							{ id: accessConditionId },
							{
								onSuccess: () =>
									successToast({
										description:
											"Access condition has been duplicated successfully!",
									}),
							}
						);
					}}
				>
					Duplicate access condition
				</MenuItem>
				<MenuItem
					icon={<FaTrash width="16px" height="16px" />}
					color="gray.600"
					fontSize="16px"
					onClick={(e) => {
						e.stopPropagation();
						setIsConfirmationOpen(true);
					}}
				>
					Delete access condition
				</MenuItem>
			</MenuDropdown>
			<ConfirmationModal
				isOpen={isConfirmationOpen}
				text={`Are you sure you want to remove <b>${name}</b> from the access conditions?`}
				actionOnConfirm={handleDeleteAccessCondition}
				onClose={() => setIsConfirmationOpen(false)}
			/>
			<SpacesLinkedToAccessConditionModal
				isOpen={isLinkedSpaceOpen}
				onClose={() => setIsLinkedSpacesOpen(false)}
				spaces={spaceAccessConditions}
				onRedirectToTheSpace={onRedirectToTheSpace}
			/>
		</>
	);
}
