import { ReactNode, useEffect, useRef, useState } from "react";
import {
	Box,
	Button,
	Flex,
	Heading,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";

import { FiSave } from "react-icons/fi";
import { SpaceDetailsQuery } from "generated/graphql";
import { TABS_IDS, tabs } from "./utils";
import { motion } from "framer-motion";
import { useWindow } from "src/utils/ssr";

interface Props {
	space: SpaceDetailsQuery["spaceById"];
	id: string;
	onCreateAccessCondition: () => void;
	title?: ReactNode;
	handleRouteChange?: (url: string) => Promise<boolean>;
}

const tabsWithSaveButton = [TABS_IDS.details, TABS_IDS.branding];

export const SpaceDetails = ({
	space,
	id,
	title,
	onCreateAccessCondition,
	handleRouteChange,
}: Props) => {
	const buttonRef = useRef<HTMLButtonElement>(null);

	const [isInView, setIsInView] = useState(true);

	const checkInView = () => {
		if (!buttonRef.current) return;
		const rect = buttonRef.current.getBoundingClientRect();
		setIsInView(rect.top < window.innerHeight && rect.bottom >= 10);
	};

	useEffect(() => checkInView(), []);

	useEffect(() => {
		document.addEventListener("wheel", checkInView, false);
		return () => {
			document.removeEventListener("wheel", checkInView);
		};
	}, []);

	const window = useWindow();
	const searchParams = new URLSearchParams(window?.location?.search);
	const tabParam = searchParams.get("tab");

	const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);
	const [isSaveButtonLoading, setIsSaveButtonLoading] = useState(false);

	const availableTabs = tabs(
		id,
		space,
		setIsSaveButtonDisabled,
		setIsSaveButtonLoading,
		onCreateAccessCondition
	);

	const [activeTab, setActiveTab] = useState(
		availableTabs.find((tab) => tab?.key === tabParam)?.key ??
			availableTabs[0]?.key
	);

	useEffect(() => {
		if (tabParam !== activeTab) {
			searchParams.set("tab", activeTab);
			if (handleRouteChange && tabParam) {
				setActiveTab(tabParam);
			} else {
				history.replaceState(null, null, `?${searchParams.toString()}`);
			}
		}
	}, [tabParam, activeTab, handleRouteChange]);

	useEffect(() => {
		if (handleRouteChange) {
			handleRouteChange(`/spaces/${id}?tab=${activeTab}`);
		}
	}, []);

	const activeTabIndex = availableTabs.indexOf(
		availableTabs.find((tab) => tab.key === activeTab) ?? availableTabs[0]
	);

	return (
		<>
			<Tabs index={activeTabIndex} variant="line">
				<Flex justifyContent="space-between" align="start">
					<TabList>
						{availableTabs.map((tab) => (
							<Tab
								onClick={() => {
									handleRouteChange
										? handleRouteChange(
												`/spaces/${id}?tab=${tab.key}`
										  )
										: setActiveTab(tab.key);
								}}
								key={tab.key}
							>
								{tab.name}
							</Tab>
						))}
					</TabList>
					<motion.div
						initial={{ opacity: 1 }}
						animate={{ opacity: !isInView ? 0 : 1 }}
						transition={{ duration: 0.5 }}
					>
						<Button
							ref={buttonRef}
							size="sm"
							variant="primaryAction"
							type="submit"
							form={activeTab}
							isDisabled={isSaveButtonDisabled}
							isLoading={isSaveButtonLoading}
							hidden={!tabsWithSaveButton.includes(activeTab)}
							leftIcon={<FiSave />}
						>
							Save
						</Button>
					</motion.div>
				</Flex>
				<TabPanels>
					{availableTabs.map((tab) => (
						<TabPanel key={tab.key}>{tab.content}</TabPanel>
					))}
				</TabPanels>
			</Tabs>
			{!isInView && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					<Button
						size="sm"
						zIndex={100}
						variant="primaryAction"
						type="submit"
						position="fixed"
						top="112px"
						right="39px"
						form={activeTab}
						isDisabled={isSaveButtonDisabled}
						isLoading={isSaveButtonLoading}
						hidden={!tabsWithSaveButton.includes(activeTab)}
						leftIcon={<FiSave />}
					>
						Save
					</Button>
				</motion.div>
			)}
		</>
	);
};
