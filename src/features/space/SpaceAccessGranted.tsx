import { Box } from "@chakra-ui/react";
import {
	MainCallToActionButton,
	SecondaryCallToActionButton,
	DiscoverVAULT3Button,
} from "../../components";
import { SpaceTemplate } from "./SpaceTemplate";
import { SpaceDocumentsSlider } from "./SpaceDocumentsSlider";
import { DownloadFilesFromSpaceQuery } from "../../../generated/graphql";
import { blobToUrl } from "../../utils/io";

interface SpaceAccessGrantedProps {
	successCallToActionText?: string | null | undefined;
	successCallToActionURL?: string | null | undefined;
	successCallToActionButtonText?: string | null | undefined;
	secondarySuccessCallToActionURL?: string | null | undefined;
	secondarySuccessCallToActionButtonText?: string | null | undefined;
	fontColor?: string | null | undefined;
	primaryColor?: string | null | undefined;
	secondaryColor?: string | null | undefined;
	files: DownloadFilesFromSpaceQuery["filesInSpace"];
	downloadFiles: () => void;
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
		files,
		downloadFiles,
		// onPrimaryInteractionClick,
		// onSecondaryInteractionClick,
	} = props;

	const images = files.map(({ download }) =>
		blobToUrl(download.mime, download.content)
	);

	return (
		<SpaceTemplate
			title="Access Granted"
			downloadFiles={downloadFiles}
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
			<SpaceDocumentsSlider images={images} />
		</SpaceTemplate>
	);
}
