import { useState } from "react";
import { IconButton, Spinner } from "@chakra-ui/react";
import { Tooltip } from "src/components/dashboard/common/tooltip/Tooltip";

import { AiOutlineDisconnect } from "react-icons/ai";
import { ConfirmationModal } from "src/components/dashboard/common/modals/ConfirmationModal";
import { useMutationUnlinkAccessCondition } from "hooks";

interface Props {
	accessConditionId: string;
	spaceId: string;
	name: string;
}

export function ActionButtons({ name, accessConditionId, spaceId }: Props) {
	const { mutate: unlinkConditionFromSpace, isLoading } =
		useMutationUnlinkAccessCondition();

	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

	return (
		<>
			{isLoading && (
				<Spinner color="blue.700" width="16px" h="16px" mx="12px" />
			)}
			{!isLoading && (
				<Tooltip label="Disconnect">
					<IconButton
						icon={
							<AiOutlineDisconnect width="16px" height="16px" />
						}
						color="gray.600"
						backgroundColor="transparent"
						aria-label="disconnect"
						onClick={(e) => {
							e.stopPropagation();
							setIsConfirmationOpen(true);
						}}
					/>
				</Tooltip>
			)}
			<ConfirmationModal
				isOpen={isConfirmationOpen}
				text={`Are you sure you want to disconnect <b>${name}</b> from the token gate?`}
				actionOnConfirm={() =>
					unlinkConditionFromSpace({ accessConditionId, spaceId })
				}
				onClose={() => setIsConfirmationOpen(false)}
			/>
		</>
	);
}
