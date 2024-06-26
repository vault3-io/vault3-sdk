import { Button, ButtonGroup } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

interface Props {
	primaryButtonText?: string;
	secondaryButtonText?: string;
	primaryButtonAction?: () => void;
	secondaryButtonAction?: () => void;
}

export function NoDataButtons({
	primaryButtonText,
	secondaryButtonText,
	primaryButtonAction,
	secondaryButtonAction,
}: Props) {
	if (!primaryButtonAction && !secondaryButtonAction) return null;

	return (
		<ButtonGroup>
			{primaryButtonAction && (
				<Button
					size="sm"
					variant="primaryAction"
					leftIcon={
						!primaryButtonText ? <FiPlus color="white" /> : null
					}
					onClick={primaryButtonAction}
				>
					{primaryButtonText ?? "Create"}
				</Button>
			)}
			{/* Temporary till getting-started page */}
			{secondaryButtonAction && (
				<Button
					as="a"
					size="sm"
					variant="secondaryAction"
					href="https://vault3.io/explore"
					target="_blank"
					// onClick={secondaryButtonAction}
				>
					{secondaryButtonText ?? "Getting started"}
				</Button>
			)}
		</ButtonGroup>
	);
}
