import * as yup from "yup";

export const createSpaceScheme = yup
	.object()
	.shape({
		name: yup.string().required("This field is required"),
		slug: yup.string().nullable(),
		description: yup.string().nullable(),
	})
	.required();
