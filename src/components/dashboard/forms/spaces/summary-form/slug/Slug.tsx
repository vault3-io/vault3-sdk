import {
	Grid,
	FormControl,
	FormLabel,
	Input,
	Flex,
	Box,
	Text,
	Icon,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { SlugButton } from "src/components/dashboard/forms/spaces/summary-form/slug/SlugButton";
import { SlugValidator } from "src/components/dashboard/forms/spaces/summary-form/slug/SlugValidator";
import { useEffect, useState } from "react";
import { Tooltip } from "@vault/ui/components/tooltip/Tooltip";
import { FaRegQuestionCircle } from "react-icons/fa";

interface Props {
	isCreatingMode: boolean;
	isSlugValid: boolean;
	isValidatorLoading: boolean;
	currentSlug: string;
}

export const Slug = ({
	isCreatingMode,
	isSlugValid,
	isValidatorLoading,
	currentSlug,
}: Props) => {
	const [loadingDelay, setLoadingDelay] = useState(false);

	useEffect(() => {
		let delayTimeout: NodeJS.Timeout;

		if (isValidatorLoading) {
			setLoadingDelay(true);
		} else {
			delayTimeout = setTimeout(() => {
				setLoadingDelay(false);
			}, 1000);
		}

		return () => clearTimeout(delayTimeout);
	}, [isValidatorLoading]);

	const {
		register,
		watch,
		setValue,
		formState: { defaultValues },
	} = useFormContext();

	const isCurrentSlug = defaultValues.slug === currentSlug;

	const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newSlug = transformSlug(event.target.value);
		setValue("slug", newSlug);
	};

	return (
		<Flex direction="column" gap="4px">
			<Grid
				templateColumns="1fr 1fr"
				columnGap={8}
				alignItems="center"
				justifyItems="start"
			>
				<FormControl display="contents">
					<FormLabel
						display="flex"
						alignItems="center"
						gap="6px"
						maxW="fit-content"
					>
						<Text>Custom Link</Text>
						<Tooltip label="Add a custom URL to brand your space’s public access link. This improves the readability and memorability of the link in your social media posts to share and advertise this space.">
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
						autoComplete="off"
						gridRow={2}
						placeholder="my-brand-name"
						{...register("slug")}
						onChange={handleSlugChange}
					/>
				</FormControl>
				{!!watch("slug") && (
					<SlugButton
						isValidatorLoading={loadingDelay}
						isSlugValid={isSlugValid}
						slugValue={watch("slug")}
						isCreatingMode={isCreatingMode}
					/>
				)}
			</Grid>
			<Box height={22}>
				{!isCurrentSlug && !!watch("slug").length && (
					<SlugValidator
						isSlugValid={isSlugValid}
						loadingDelay={loadingDelay}
					/>
				)}
			</Box>
		</Flex>
	);
};

const transformSlug = (value: string) => {
	return value.replace(/\s+/g, "-").toLowerCase();
};
