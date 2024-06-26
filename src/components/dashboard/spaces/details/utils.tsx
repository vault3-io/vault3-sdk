import { Dispatch, SetStateAction } from "react";
import { SummaryTab } from "./summary/SummaryTab";
import { Center, Flex, Icon } from "@chakra-ui/react";
import { MdOutlineDiamond } from "react-icons/md";
import { BrandingTab } from "./branding/BrandingTab";
import { SpaceDetailsQuery } from "generated/graphql";
import { SpaceLoader } from "src/features";
import { AccessConditionTab } from "./access-conditions/AccessConditionTab";
import { FilesTab } from "./files/FilesTab";

export const TABS_IDS = {
	metrics: "metrics",
	details: "details",
	accessConditions: "access-conditions",
	files: "files",
	branding: "branding",
};

export const tabs = (
	id: string,
	space: SpaceDetailsQuery["spaceById"],
	disableSaveButton: Dispatch<SetStateAction<boolean>>,
	startLoading: Dispatch<SetStateAction<boolean>>,
	onCreateAccessCondition: () => void
) =>
	space
		? [
				{
					key: TABS_IDS.metrics,
					name: "Metrics",
					content: (
						<Center>
							<SpaceLoader
								iconVariant="blue"
								primaryColor="blue.700"
								message="Coming soon..."
							/>
						</Center>
					),
				},
				{
					key: TABS_IDS.details,
					name: "Details",
					content: (
						<SummaryTab
							disableSaveButton={disableSaveButton}
							startLoading={startLoading}
							space={space}
							id={id}
						/>
					),
				},
				{
					key: TABS_IDS.accessConditions,
					name: "Access Conditions",
					content: (
						<AccessConditionTab
							id={id}
							accessConditions={space.spaceAccessConditions}
							onCreateAccessCondition={onCreateAccessCondition}
						/>
					),
				},
				{
					key: TABS_IDS.files,
					name: "Files",
					content: <FilesTab id={id} />,
				},
				{
					key: TABS_IDS.branding,
					name: (
						<Flex gap="5px" align="center">
							<Icon as={MdOutlineDiamond} fontSize={18} />{" "}
							Branding
						</Flex>
					),
					content: (
						<BrandingTab
							disableSaveButton={disableSaveButton}
							startLoading={startLoading}
							space={space}
							id={id}
						/>
					),
				},
		  ]
		: [];
