import React, { useState } from "react";
import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { CtaFields } from "src/components/dashboard/forms/spaces/branding-form/components/cta/CtaFields";
import { SectionTitle } from "src/components/dashboard/forms/common/section-title/SectionTitle";

export const CtaInputs = () => {
	const { register, watch } = useFormContext();

	const [ctaManager, setCtaManager] = useState({
		primarySuccessCta: true,
		secondarySuccessCta:
			!!watch("secondarySuccessCallToActionURL") ||
			!!watch("secondarySuccessCallToActionButtonText"),
		primaryFallbackCta: true,
		secondaryFallbackCta:
			!!watch("secondaryFailureCallToActionURL") ||
			!!watch("secondaryFailureCallToActionButtonText"),
	});

	return (
		<>
			<Flex direction="column" gap={4}>
				<SectionTitle
					title="Success Call To Action"
					subtitle="Add follow up call to actions for users who successfuly unlocked your token gare. Use this feature to boost your campaigns, and enhance your engagement."
				/>
				<FormControl>
					<FormLabel>Success Message</FormLabel>
					<Input {...register("successCallToActionText")} />
				</FormControl>
				<Flex w="100%" gap={8}>
					<CtaFields
						title="Primary success call to action"
						urlField="successCallToActionURL"
						buttonTextField="successCallToActionButtonText"
						switchState={ctaManager.primarySuccessCta}
						handleSwitch={() =>
							setCtaManager((prev) => ({
								...prev,
								primarySuccessCta: !prev.primarySuccessCta,
							}))
						}
					/>
					<CtaFields
						title="Secondary success call to action"
						urlField="secondarySuccessCallToActionURL"
						buttonTextField="secondarySuccessCallToActionButtonText"
						switchState={ctaManager.secondarySuccessCta}
						handleSwitch={() =>
							setCtaManager((prev) => ({
								...prev,
								secondarySuccessCta: !prev.secondarySuccessCta,
							}))
						}
					/>
				</Flex>
			</Flex>
			<Flex direction="column" gap={4}>
				<SectionTitle
					title="Fallback Call To Action"
					subtitle="Add a fallback call to action for users who didn't fulfill your access conditions. Use this feature to boost your convertion rates and sales."
				/>
				<FormControl>
					<FormLabel>Fallback Message</FormLabel>
					<Input {...register("failureCallToActionText")} />
				</FormControl>
				<Flex w="100%" gap={8}>
					<CtaFields
						title="Primary fallback call to action"
						urlField="failureCallToActionURL"
						buttonTextField="failureCallToActionButtonText"
						switchState={ctaManager.primaryFallbackCta}
						handleSwitch={() =>
							setCtaManager((prev) => ({
								...prev,
								primaryFallbackCta: !prev.primaryFallbackCta,
							}))
						}
					/>
					<CtaFields
						title="Secondary fallback call to action"
						urlField="secondaryFailureCallToActionURL"
						buttonTextField="secondaryFailureCallToActionButtonText"
						switchState={ctaManager.secondaryFallbackCta}
						handleSwitch={() =>
							setCtaManager((prev) => ({
								...prev,
								secondaryFallbackCta:
									!prev.secondaryFallbackCta,
							}))
						}
					/>
				</Flex>
			</Flex>
		</>
	);
};
