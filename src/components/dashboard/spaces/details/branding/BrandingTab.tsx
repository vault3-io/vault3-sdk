import { Dispatch, SetStateAction, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutationUpdateSpaceBranding } from "hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { SpaceDetailsQuery } from "generated/graphql";
import { SpaceBrandingForm } from "src/components/dashboard/forms/spaces/branding-form/BrandingForm";
import { brandingScheme } from "utils/resolvers/brandingScheme";
import { BrandingFormData } from "types/form-data/brandingFormData";

interface Props {
	id: string;
	space: SpaceDetailsQuery["spaceById"];
	disableSaveButton: Dispatch<SetStateAction<boolean>>;
	startLoading: Dispatch<SetStateAction<boolean>>;
}

export function BrandingTab({
	space,
	id,
	startLoading,
	disableSaveButton,
}: Props) {
	const { mutate: updateBranding, isLoading: isBrandingUpdating } =
		useMutationUpdateSpaceBranding();

	useEffect(() => startLoading(isBrandingUpdating), [isBrandingUpdating]);

	const methods = useForm({
		resolver: yupResolver(brandingScheme),
		defaultValues: getInitialData(space),
	});

	const { reset, getValues } = methods;

	const onSubmit = (data: BrandingFormData) => {
		updateBranding(
			{ id, ...data },
			{ onSuccess: () => reset({ ...getValues() }) }
		);
	};

	return (
		<FormProvider {...methods}>
			<SpaceBrandingForm
				onSubmit={onSubmit}
				disableSaveButton={disableSaveButton}
			/>
		</FormProvider>
	);
}

function getInitialData(space: SpaceDetailsQuery["spaceById"]) {
	const {
		branding: {
			backgroundColor,
			discord,
			failureCallToActionButtonText,
			failureCallToActionText,
			failureCallToActionURL,
			fontColor,
			logoFileContent,
			logoFileMime,
			logoFileName,
			primaryColor,
			secondaryColor,
			secondaryFailureCallToActionButtonText,
			secondaryFailureCallToActionURL,
			secondarySuccessCallToActionButtonText,
			secondarySuccessCallToActionURL,
			successCallToActionButtonText,
			successCallToActionText,
			successCallToActionURL,
			telegram,
			websiteURL,
			x,
			youtube,
		},
	} = space;

	return {
		backgroundColor: backgroundColor ?? "",
		discord: discord ?? "",
		failureCallToActionButtonText: failureCallToActionButtonText ?? "",
		failureCallToActionText: failureCallToActionText ?? "",
		failureCallToActionURL: failureCallToActionURL ?? "",
		fontColor: fontColor ?? "",
		logoFileContent: logoFileContent ?? "",
		logoFileMime: logoFileMime ?? "",
		logoFileName: logoFileName ?? "",
		primaryColor: primaryColor ?? "",
		secondaryColor: secondaryColor ?? "",
		secondaryFailureCallToActionButtonText:
			secondaryFailureCallToActionButtonText ?? "",
		secondaryFailureCallToActionURL: secondaryFailureCallToActionURL ?? "",
		secondarySuccessCallToActionButtonText:
			secondarySuccessCallToActionButtonText ?? "",
		secondarySuccessCallToActionURL: secondarySuccessCallToActionURL ?? "",
		successCallToActionButtonText: successCallToActionButtonText ?? "",
		successCallToActionText: successCallToActionText ?? "",
		successCallToActionURL: successCallToActionURL ?? "",
		telegram: telegram ?? "",
		websiteURL: websiteURL ?? "",
		x: x ?? "",
		youtube: youtube ?? "",
	};
}
