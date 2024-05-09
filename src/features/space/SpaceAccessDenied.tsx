import { Box } from "@chakra-ui/react";
import { IoMdLock } from "react-icons/io";
import {
	DiscoverVAULT3Button,
	MainCallToActionButton,
	SecondaryCallToActionButton,
} from "../../components";
import { SpaceTemplate } from "./SpaceTemplate";

interface SpaceAccessDeniedProps {
	failureCallToActionText?: string | null | undefined;
	failureCallToActionURL?: string | null | undefined;
	failureCallToActionButtonText?: string | null | undefined;
	secondaryFailureCallToActionURL?: string | null | undefined;
	secondaryFailureCallToActionButtonText?: string | null | undefined;
	fontColor?: string | null | undefined;
	primaryColor?: string | null | undefined;
	secondaryColor?: string | null | undefined;
	// onPrimaryInteractionClick?: () => void;
	// onSecondaryInteractionClick?: () => void;
}

export function SpaceAccessDenied(props: SpaceAccessDeniedProps) {
	const {
		failureCallToActionText,
		failureCallToActionURL,
		failureCallToActionButtonText,
		secondaryFailureCallToActionURL,
		secondaryFailureCallToActionButtonText,
		fontColor,
		primaryColor,
		secondaryColor,
		// onPrimaryInteractionClick,
		// onSecondaryInteractionClick,
	} = props;
	return (
		<SpaceTemplate
			title="Access Denied"
			icon={IoMdLock}
			description={
				failureCallToActionText ||
				"Get in touch with the creator of this space and try again."
			}
			buttons={
				<>
					{!!failureCallToActionURL && (
						<Box>
							<MainCallToActionButton
								callToActionText={failureCallToActionButtonText}
								callToActionURL={failureCallToActionURL}
								primaryColor={primaryColor}
								secondaryColor={secondaryColor}
							/>
						</Box>
					)}
					{!!secondaryFailureCallToActionURL &&
					!!secondaryFailureCallToActionButtonText ? (
						<Box>
							<SecondaryCallToActionButton
								callToActionText={
									secondaryFailureCallToActionButtonText
								}
								callToActionURL={
									secondaryFailureCallToActionURL
								}
								primaryColor={primaryColor}
								secondaryColor={secondaryColor}
							/>
						</Box>
					) : (
						<DiscoverVAULT3Button />
					)}
				</>
			}
			primaryColor={primaryColor}
			fontColor={fontColor}
		/>
	);
}
