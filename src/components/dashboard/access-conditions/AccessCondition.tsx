import { ReactNode } from "react";
import { Heading, Text } from "@chakra-ui/react";
import { useQueryAccessConditionById } from "hooks/graphql/accessConditions";
import { AccessConditionByIdQuery } from "generated/graphql";
import { EaseInAnimation } from "src/animations";
import { SpaceLoader } from "src/features";
import { AccessConditionDetails } from "./AccessConditionDetails";

interface Props {
	accessConditionId: string;
	title?:
		| ReactNode
		| ((
				accessCondition: AccessConditionByIdQuery["accessConditionById"]
		  ) => ReactNode)
		| null
		| undefined;
	onSave: () => void;
}

export const AccessCondition = ({
	accessConditionId,
	title,
	onSave,
}: Props) => {
	const { accessCondition, isLoading } = useQueryAccessConditionById({
		id: accessConditionId,
	});

	return (
		<EaseInAnimation duration={0.5}>
			<>
				{isLoading && !accessCondition && (
					<SpaceLoader
						iconVariant="blue"
						primaryColor="blue.700"
						message="Access condition is loading..."
					/>
				)}
				{!isLoading && !accessCondition && (
					<Text>Access condition not found</Text>
				)}
				{!isLoading && !!accessCondition && (
					<>
						{typeof title === "function"
							? title(accessCondition)
							: title ?? (
									<Heading size="md" fontWeight={700} mb={3}>
										{accessCondition.name}
									</Heading>
							  )}
						<AccessConditionDetails
							accessCondition={accessCondition}
							onSave={onSave}
						/>
					</>
				)}
			</>
		</EaseInAnimation>
	);
};
