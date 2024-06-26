import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
	Flex,
	Grid,
	FormControl,
	FormLabel,
	Switch,
	Input,
	Textarea,
	Text,
	Box,
	Icon,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { Slug } from "./slug/Slug";
import { useQuerySpaceSlugAvailable } from "hooks";
import { TABS_IDS } from "../../../spaces/details/utils";
import { SummaryFormData } from "types/form-data/summaryFormData";
import { Tooltip } from "src/components/dashboard/common/tooltip/Tooltip";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useWindow } from "src/utils/ssr";
// import { useUnsavedChanges } from "../../../app/UnsavedChangesProvider";

interface Props {
	spaceId?: string;
	disableSaveButton: Dispatch<SetStateAction<boolean>>;
	onSubmit: (data: SummaryFormData) => void;
}

export const SpaceSummaryForm = ({
	disableSaveButton,
	onSubmit,
	spaceId,
}: Props) => {
	// const { handleUnsavedChange } = useUnsavedChanges();

	const {
		register,
		watch,
		handleSubmit,
		formState: { isDirty, isSubmitted, isSubmitting },
		reset,
	} = useFormContext();

	const window = useWindow();

	useEffect(() => {
		reset();
	}, [window?.location?.search]);

	const isCreatingMode = spaceId === undefined;

	// useEffect(() => {
	// 	handleUnsavedChange(isDirty && !isSubmitted && !isSubmitting);
	// }, [handleUnsavedChange, isDirty, isSubmitted, isSubmitting]);

	const watchSlug = watch("slug");
	const [slugValue, setSlugValue] = useState(watchSlug);
	const { spaceSlugAvailable, isLoading: isValidateLoading } =
		useQuerySpaceSlugAvailable({
			slug: slugValue,
			ignoreSpaceId: spaceId as string,
		});

	useEffect(() => {
		const delay = setTimeout(() => {
			setSlugValue(watchSlug);
		}, 500);
		return () => clearTimeout(delay);
	}, [watchSlug]);

	useEffect(() => {
		const isFormInvalid =
			(!spaceSlugAvailable && spaceSlugAvailable !== undefined) ||
			!watchSlug ||
			!isDirty;
		disableSaveButton(isFormInvalid);
	}, [disableSaveButton, spaceSlugAvailable, watchSlug, isDirty]);

	return (
		<form id={TABS_IDS.details} onSubmit={handleSubmit(onSubmit)}>
			<Flex direction="column" gap={4}>
				<Grid
					templateColumns={
						isCreatingMode ? "max-content 1fr" : undefined
					}
					columnGap={8}
					alignItems="center"
				>
					{!isCreatingMode && (
						<FormControl display="contents">
							<FormLabel>Active</FormLabel>
							<Switch
								size="lg"
								gridRow={2}
								isChecked={watch("isActive")}
								{...register("isActive")}
							/>
						</FormControl>
					)}
					<FormControl
						display={isCreatingMode ? "contents" : undefined}
					>
						<FormLabel
							display="flex"
							alignItems="center"
							gap="6px"
							maxW="fit-content"
						>
							<Box>
								Title
								<Text display="inline" color="red.500">
									*
								</Text>
							</Box>
							<Tooltip label="Add a title to your space to help users know what to expect. It will be displayed on your unlocking website so make it as short and punchy as possible.">
								<Box>
									<Icon
										as={FaRegQuestionCircle}
										fontSize="14px"
										color="gray.700"
									/>
								</Box>
							</Tooltip>
						</FormLabel>
						<Input
							placeholder="Super cool space"
							autoComplete="off"
							{...register("name")}
						/>
					</FormControl>
				</Grid>
				<Slug
					isSlugValid={spaceSlugAvailable}
					isValidatorLoading={isValidateLoading}
					isCreatingMode={isCreatingMode}
					currentSlug={slugValue}
				/>
				<FormControl>
					<FormLabel
						display="flex"
						alignItems="center"
						gap="6px"
						maxW="fit-content"
					>
						<Text>Description</Text>
						<Tooltip label="Add a description to your space to tell your users what are the access conditions to get access. It will be displayed on your unlocking website so try to keep it as short and  concise as possible.">
							<Box>
								<Icon
									as={FaRegQuestionCircle}
									fontSize="14px"
									color="gray.700"
								/>
							</Box>
						</Tooltip>
					</FormLabel>
					<Textarea
						placeholder="This super cool space is only accessible to my NFT holders."
						{...register("description")}
					/>
				</FormControl>
			</Flex>
		</form>
	);
};
