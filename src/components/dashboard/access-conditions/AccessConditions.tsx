import { ReactNode } from "react";
import { FiPlus } from "react-icons/fi";
import { BiDoorOpen } from "react-icons/bi";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useQueryAccessConditionList } from "hooks/graphql/accessConditions";
import { EaseInAnimation } from "src/animations";
import { SpaceLoader } from "src/features";
import { NoDataBox } from "../common/no-data-box/NoDataBox";
import { AccessConditionsTable } from "./table/Table";
import { ErrorBox } from "../common/error-box/ErrorBox";
import { useApp } from "hooks";
import { WalletConnect } from "src/public";

interface Props {
	title?: ReactNode;
	onCreateCondition: () => void;
	onConditionDetails: (id: string) => void;
	onRedirectToSpace: (id: string) => void;
}

export const AccessConditions = ({
	title,
	onCreateCondition,
	onConditionDetails,
	onRedirectToSpace,
}: Props) => {
	const { isSignedIn } = useApp();
	const { accessConditions, isLoading, isError } =
		useQueryAccessConditionList({ enabled: isSignedIn });

	const renderContents = () => {
		if (!isSignedIn) {
			return <WalletConnect />;
		}

		if (isLoading) {
			return (
				<SpaceLoader
					message="Access Conditions Loading..."
					primaryColor="blue.700"
					iconVariant="blue"
				/>
			);
		}

		if (isError) {
			return <ErrorBox />;
		}

		if (!accessConditions?.length) {
			return (
				<NoDataBox
					title="No access conditions so far"
					description="Create your first access condition and link it to this space."
					icon={BiDoorOpen}
					primaryButtonAction={onCreateCondition}
				/>
			);
		}

		return (
			<AccessConditionsTable
				data={accessConditions}
				onEdit={onConditionDetails}
				onRedirectToTheSpace={onRedirectToSpace}
			/>
		);
	};

	return (
		<EaseInAnimation duration={0.5}>
			<>
				<Flex justify="space-between" align="start">
					{title ?? (
						<Heading size="md" fontWeight={700} mb={3}>
							Access Conditions
						</Heading>
					)}
					{!isLoading && (
						<Button
							variant="primaryAction"
							size="sm"
							leftIcon={<FiPlus color="white" />}
							onClick={onCreateCondition}
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
					Access conditions are rules to limit access to your spaces.
					They are customizable and reusable, which allows you to link
					them to several spaces to save time.
				</Text>
				{renderContents()}
			</>
		</EaseInAnimation>
	);
};
