import { useState } from "react";
import { MenuItem, Spinner } from "@chakra-ui/react";

import { FaPen, FaRegEye } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { useMutationDuplicateSpace, useToastRender } from "hooks";
import { MenuDropdown } from "src/components/dashboard/common/menu-dropdown/menu-dropdown";
import { DeleteSpaceModal } from "../delete-space-modal/DeleteSpaceModal";
import { getWebUrl } from "src/utils/functions/getWebUrl";

interface Props {
	id: string;
	name: string;
	slug?: string | null;
	onEdit: () => void;
}

export function ActionButtons({ id, name, slug, onEdit }: Props) {
	const { successToast } = useToastRender();
	const { mutate: duplicateSpace, isLoading } = useMutationDuplicateSpace();
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
					Edit space
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
						duplicateSpace(
							{ id },
							{
								onSuccess: () =>
									successToast({
										description:
											"Space has been duplicated successfully!",
									}),
							}
						);
					}}
				>
					Duplicate space
				</MenuItem>
				<MenuItem
					icon={<FaTrash width="16px" height="16px" />}
					color="gray.600"
					fontSize="16px"
					onClick={(e) => {
						e.stopPropagation();
						setIsDeleteModalOpen(true);
					}}
				>
					Delete space
				</MenuItem>
				<MenuItem
					icon={<FaRegEye width="16px" height="16px" />}
					color="gray.600"
					fontSize="16px"
					onClick={(e) => {
						e.stopPropagation();
						window.open(`${getWebUrl()}/space/${slug ?? id}`);
					}}
				>
					View space
				</MenuItem>
			</MenuDropdown>
			<DeleteSpaceModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				id={id}
				spaceName={name}
			/>
		</>
	);
}
