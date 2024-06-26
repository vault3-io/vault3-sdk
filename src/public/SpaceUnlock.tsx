import { useState } from "react";
// import { EaseInAnimation } from "@vault/ui/components/animations/EaseInAnimation";

import {
	SpaceLoader,
	SpaceInactive,
	SpaceAccessDenied,
	SpaceAccessGranted,
	SpaceError,
	SpaceIntro,
} from "../features/space";
import {
	InteractionCallToActionType,
	InteractionTopicType,
	useApp,
	useDebounce,
	useMutationRegisterInteraction,
	useQueryDownloadFilesFromSpace,
	useQuerySpaceOverviewById,
} from "hooks";
import { useMutation } from "@tanstack/react-query";
import { DecryptedFile, InteractionActionType } from "../../generated/graphql";
import { base64ToBlob, base64ToFile, downloadBlob } from "utils";
import { ZipWriter, BlobWriter, BlobReader } from "@zip.js/zip.js";

interface Props {
	id: string;
}

export function SpaceUnlock({ id: spaceId }: Props) {
	const { isSignedIn } = useApp();
	const [spaceLogo, setSpaceLogo] = useState({} as Blob);

	/*const { isOpen, onOpen, onClose } = useDisclosure();
	const [popoverClosed, setPopoverToClosed] = useState(false);*/

	const { mutate: registerInteraction, isLoading: isRegistering } =
		useMutationRegisterInteraction();

	function registerCTAClick(callToActionType: InteractionCallToActionType) {
		registerInteraction({
			action: InteractionActionType.Read,
			topic: InteractionTopicType.CallToAction,
			event: {
				spaceId,
				callToActionType,
			},
		});
	}

	const handleSuccessCTAClick = () =>
		registerCTAClick(InteractionCallToActionType.Success);

	const handleSecondarySuccessCTAClick = () =>
		registerCTAClick(InteractionCallToActionType.SecondarySuccess);

	const handleFallbackCTAClick = () =>
		registerCTAClick(InteractionCallToActionType.Fallback);

	const handleSecondaryFallbackCTAClick = () =>
		registerCTAClick(InteractionCallToActionType.SecondaryFallback);

	function handleWebsiteLinkClick() {
		registerInteraction({
			action: InteractionActionType.Read,
			topic: InteractionTopicType.Website,
			event: { spaceId },
		});
	}

	function handleSocialMediaLinkClick(socialMedia: string) {
		registerInteraction({
			action: InteractionActionType.Read,
			topic: InteractionTopicType.SocialMedia,
			event: {
				spaceId,
				socialType: socialMedia,
			},
		});
	}

	const downloadedFiles = useQueryDownloadFilesFromSpace({
		spaceId,
		enabled: isSignedIn && !!spaceId,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
		async onSuccess(data) {
			console.log(data);
			/*	downloadFiles.mutate({
				files: data.map((d) => d.download),
			});*/
		},
		onError(err) {
			console.log("Failed to authorize for space!");
		},
	});

	const spaceQuery = useQuerySpaceOverviewById({
		id: spaceId as string,
		enabled: !!spaceId,
		onSuccess(data) {
			if (data) {
				if (
					data?.branding?.logoFileContent &&
					data?.branding?.logoFileName &&
					data?.branding?.logoFileMime
				) {
					const logo = base64ToBlob(
						data.branding.logoFileMime,
						data.branding.logoFileContent
					);

					setSpaceLogo(logo);
				}
			}
		},
		onError(err) {
			console.log("Failed to fetch space overview!");
		},
	});

	const isSpaceLoading = useDebounce(spaceQuery.isLoading, 1500);
	const isDownloadingFiles = useDebounce(downloadedFiles.isLoading, 1500);

	const downloadFiles = useMutation({
		mutationFn: async (data: { files: DecryptedFile[] }) => {
			const blobs = data.files.map((file) =>
				base64ToFile(file.name, file.mime, file.content)
			);

			if (blobs.length == 0) {
				throw new Error("No blobs :(");
			}

			if (blobs.length == 1) {
				downloadBlob(blobs[0], blobs[0].name);
				return;
			}

			const zipWriter = new ZipWriter(new BlobWriter("application/zip"), {
				bufferedWrite: true,
			});
			blobs.forEach((blob) =>
				zipWriter.add(blob.name, new BlobReader(blob))
			);
			const zipBlob = await zipWriter.close();
			downloadBlob(zipBlob, "space-" + spaceId + ".zip");
		},
	});

	const downloadAllFiles = () => {
		downloadFiles.mutate({
			files:
				downloadedFiles.data?.map(({ download }) => {
					return { ...download };
				}) ?? [],
		});
	};

	if (isSpaceLoading)
		return (
			<SpaceLoader
				message={"Fetching Space details"}
				// primaryColor={space?.branding?.primaryColor}
			/>
		);

	if (spaceQuery.isError || !spaceQuery.data)
		return (
			<SpaceError
			// fontColor={space?.branding?.fontColor}
			// primaryColor={space?.branding?.primaryColor}
			/>
		);

	const { data: space } = spaceQuery;

	if (!space.isActive)
		return (
			<SpaceInactive
				fontColor={space.branding?.fontColor}
				primaryColor={space.branding?.primaryColor}
			/>
		);

	if (!isSignedIn)
		return (
			<SpaceIntro
				space={space}
				primaryColor={space.branding?.primaryColor}
				fontColor={space.branding?.fontColor}
			/>
		);

	if (isDownloadingFiles)
		return (
			<SpaceLoader
				message={"Checking access conditions"}
				primaryColor={space.branding?.primaryColor}
			/>
		);

	if (downloadedFiles.isError || !downloadedFiles.files?.length)
		return (
			<SpaceAccessDenied
				failureCallToActionText={
					space.branding?.failureCallToActionText
				}
				failureCallToActionURL={space.branding?.failureCallToActionURL}
				failureCallToActionButtonText={
					space.branding?.failureCallToActionButtonText
				}
				secondaryFailureCallToActionButtonText={
					space.branding?.secondaryFailureCallToActionButtonText
				}
				secondaryFailureCallToActionURL={
					space.branding?.secondaryFailureCallToActionURL
				}
				fontColor={space.branding?.fontColor}
				primaryColor={space.branding?.primaryColor}
				secondaryColor={space.branding?.secondaryColor}
				// onPrimaryInteractionClick={handleFallbackCTAClick}
				// onSecondaryInteractionClick={handleSecondaryFallbackCTAClick}
			/>
		);

	return (
		<SpaceAccessGranted
			successCallToActionText={space.branding?.successCallToActionText}
			successCallToActionURL={space.branding?.successCallToActionURL}
			successCallToActionButtonText={
				space.branding?.successCallToActionButtonText
			}
			secondarySuccessCallToActionButtonText={
				space.branding?.secondarySuccessCallToActionButtonText
			}
			secondarySuccessCallToActionURL={
				space.branding?.secondarySuccessCallToActionURL
			}
			fontColor={space.branding?.fontColor}
			primaryColor={space.branding?.primaryColor}
			secondaryColor={space.branding?.secondaryColor}
			files={downloadedFiles?.data ?? []}
			downloadFiles={downloadAllFiles}
			// onPrimaryInteractionClick={handleSuccessCTAClick}
			// onSecondaryInteractionClick={handleSecondarySuccessCTAClick}
		/>
	);
}
