import * as yup from "yup";

export const brandingScheme = yup.object().shape({
	backgroundColor: yup.string().nullable(),
	discord: yup.string().nullable(),
	failureCallToActionButtonText: yup.string().nullable(),
	failureCallToActionText: yup.string().nullable(),
	failureCallToActionURL: yup.string().nullable(),
	fontColor: yup.string().nullable(),
	logoFileContent: yup.string().nullable(),
	logoFileMime: yup.string().nullable(),
	logoFileName: yup.string().nullable(),
	primaryColor: yup.string().nullable(),
	secondaryColor: yup.string().nullable(),
	secondaryFailureCallToActionButtonText: yup.string().nullable(),
	secondaryFailureCallToActionURL: yup.string().nullable(),
	secondarySuccessCallToActionButtonText: yup.string().nullable(),
	secondarySuccessCallToActionURL: yup.string().nullable(),
	successCallToActionButtonText: yup.string().nullable(),
	successCallToActionText: yup.string().nullable(),
	successCallToActionURL: yup.string().nullable(),
	telegram: yup.string().nullable(),
	websiteURL: yup.string().nullable(),
	x: yup.string().nullable(),
	youtube: yup.string().nullable(),
});
