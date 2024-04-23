import { Box, space } from "@chakra-ui/react";
import {
	MainCallToActionButton,
	SecondaryCallToActionButton,
	DiscoverVAULT3Button,
} from "../../components";
import { SpaceTemplate } from "./SpaceTemplate";
import { SpaceDocumentsSlider } from "./SpaceDocumentsSlider";

interface SpaceAccessGrantedProps {
	successCallToActionText?: string | null | undefined;
	successCallToActionURL?: string | null | undefined;
	successCallToActionButtonText?: string | null | undefined;
	secondarySuccessCallToActionURL?: string | null | undefined;
	secondarySuccessCallToActionButtonText?: string | null | undefined;
	fontColor?: string | null | undefined;
	primaryColor?: string | null | undefined;
	secondaryColor?: string | null | undefined;
	// onPrimaryInteractionClick?: () => void;
	// onSecondaryInteractionClick?: () => void;
}

export function SpaceAccessGranted(props: SpaceAccessGrantedProps) {
	const {
		successCallToActionText,
		successCallToActionURL,
		successCallToActionButtonText,
		secondarySuccessCallToActionURL,
		secondarySuccessCallToActionButtonText,
		fontColor,
		primaryColor,
		secondaryColor,
		// onPrimaryInteractionClick,
		// onSecondaryInteractionClick,
	} = props;

	return (
		<SpaceTemplate
			title="Access Granted"
			description={
				successCallToActionText || "Enjoy your exclusive experience!"
			}
			buttons={
				<>
					{!!successCallToActionURL && (
						<Box>
							<MainCallToActionButton
								callToActionText={successCallToActionButtonText}
								callToActionURL={successCallToActionURL}
								primaryColor={primaryColor}
								secondaryColor={secondaryColor}
							/>
						</Box>
					)}
					{!!secondarySuccessCallToActionURL &&
					!!secondarySuccessCallToActionButtonText ? (
						<Box>
							<SecondaryCallToActionButton
								callToActionText={
									secondarySuccessCallToActionButtonText
								}
								callToActionURL={
									secondarySuccessCallToActionURL
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
		>
			<SpaceDocumentsSlider
				images={[
					"https://keen-slider.io/images/next.png",
					"https://www.luelue.pl/pub/media/catalog/product/cache/50b84ec3e651e460d895eb9d2537ee0f/t/h/the-blind-girl-1856_1.jpg",
					"https://niezlasztuka.net/wp-content/uploads/2016/04/ofelia.jpg",
				]}
			/>
		</SpaceTemplate>
	);
}
