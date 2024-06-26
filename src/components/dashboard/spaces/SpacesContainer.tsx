import { ReactNode } from "react";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { GoRocket } from "react-icons/go";

import { GatesTable } from "./table/table";
import { useApp, useQuerySpaceList } from "hooks";
import { NoDataBox } from "../common/no-data-box/NoDataBox";
import { EaseInAnimation } from "src/animations";
import { SpaceLoader } from "src/features";
import { ErrorBox } from "../common/error-box/ErrorBox";
import { WalletConnect } from "src/public";

interface Props {
	title?: ReactNode;
	onCreateGate: () => void;
	onGateDetails: (id: string) => void;
}

export const SpacesContainer = ({
	title,
	onCreateGate,
	onGateDetails,
}: Props) => {
	const { isSignedIn } = useApp();

	const { spaces, isLoading, isError } = useQuerySpaceList({
		enabled: isSignedIn,
	});

	const sortedSpacesByDate = spaces?.sort((space1, space2) => {
		const date1 = new Date(space1.createdAt).getTime();
		const date2 = new Date(space2.createdAt).getTime();

		return date2 - date1;
	});

	const renderContents = () => {
		if (!isSignedIn) {
			return <WalletConnect />;
		}

		if (isLoading) {
			return (
				<SpaceLoader
					message="Gates Loading..."
					primaryColor="blue.700"
					iconVariant="blue"
				/>
			);
		}

		if (isError) {
			return <ErrorBox />;
		}

		if (!sortedSpacesByDate?.length) {
			return (
				<NoDataBox
					title="No spaces so far"
					description="Create your first token gate and start distributing exclusive content to your community!"
					icon={GoRocket}
					primaryButtonAction={onCreateGate}
					secondaryButtonAction={() => null}
				/>
			);
		}

		return <GatesTable data={sortedSpacesByDate} onEdit={onGateDetails} />;
	};

	return (
		<EaseInAnimation duration={0.5}>
			<>
				<Flex justify="space-between" align="start">
					{title ?? (
						<Heading size="md" fontWeight={700} mb={3}>
							Spaces
						</Heading>
					)}
					{!isLoading && (
						<Button
							variant="primaryAction"
							size="sm"
							leftIcon={<FiPlus color="white" />}
							onClick={onCreateGate}
						>
							Create
						</Button>
					)}
				</Flex>
				<Text
					fontSize="12px"
					mb="24px"
					fontWeight="500"
					color="gray.600"
				>
					Spaces are like paywalls to distribute exclusive content
					with your web3 community. Each space has a website with a
					wallet connection button where users can access your files
					as long as they fulfill your access conditions. Make sure to
					brand your space to achieve seamless unlocking experiences.
				</Text>
				{renderContents()}
			</>
		</EaseInAnimation>
	);
};
