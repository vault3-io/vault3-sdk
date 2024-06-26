import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Flex } from "@chakra-ui/react";

import { LayoutInputs } from "./components/LayoutInputs";
import { SocialInputs } from "./components/SocialInputs";
import { CtaInputs } from "./components/CtaInputs";
import { TABS_IDS } from "../../../spaces/details/utils";
import { BrandingFormData } from "types/form-data/brandingFormData";
import { useWindow } from "src/utils/ssr";
// import { useUnsavedChanges } from "../../../app/UnsavedChangesProvider";

interface Props {
	onSubmit: (data: BrandingFormData) => void;
	disableSaveButton: Dispatch<SetStateAction<boolean>>;
}

export const SpaceBrandingForm = ({ onSubmit, disableSaveButton }: Props) => {
	// const { handleUnsavedChange } = useUnsavedChanges();

	const {
		handleSubmit,
		watch,
		formState: {
			isDirty,
			defaultValues: { logoFileContent, logoFileMime, logoFileName },
		},
		reset,
	} = useFormContext();
	const watchLogoFileContent = watch("logoFileContent");

	useEffect(() => {
		const isFormInvalid =
			!isDirty && watchLogoFileContent === logoFileContent;
		disableSaveButton(isFormInvalid);
		// handleUnsavedChange(
		// 	isDirty || watchLogoFileContent !== logoFileContent
		// );
	}, [
		isDirty,
		watchLogoFileContent,
		logoFileContent,
		disableSaveButton,
		// handleUnsavedChange,
	]);

	const window = useWindow();

	useEffect(() => {
		reset();
	}, [window?.location?.search]);

	return (
		<form id={TABS_IDS.branding} onSubmit={handleSubmit(onSubmit)}>
			<Flex direction="column" gap={9} maxW={800}>
				<LayoutInputs />
				<SocialInputs />
				<CtaInputs />
			</Flex>
		</form>
	);
};
