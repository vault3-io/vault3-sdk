import { useQuerySpaceDetailsById } from "hooks";
import { SpaceDetails } from "./SpaceDetails";
import { ReactNode } from "react";
import { Heading, Text } from "@chakra-ui/react";
import { EaseInAnimation } from "src/animations";
import { SpaceLoader } from "src/features";
import { SpaceDetailsQuery } from "generated/graphql";

interface Props {
	spaceId: string;
	title?: ReactNode | ((space: SpaceDetailsQuery["spaceById"]) => ReactNode);
	onCreateAccessCondition: (spaceId: string) => void;
}

export const SpaceContainer = ({
	spaceId,
	title,
	onCreateAccessCondition,
}: Props) => {
	const { data: space, isLoading } = useQuerySpaceDetailsById({
		id: spaceId,
		enabled: !!spaceId,
	});

	return (
		<EaseInAnimation duration={0.5}>
			<>
				{isLoading && !space && (
					<SpaceLoader
						message="Space Loading..."
						primaryColor="blue.700"
						iconVariant="blue"
					/>
				)}
				{!isLoading && !space && <Text>Space not found</Text>}
				{!isLoading && !!space && (
					<>
						{typeof title === "function"
							? title(space)
							: title ?? (
									<Heading size="md" fontWeight={700} mb={3}>
										{space.name}
									</Heading>
							  )}
						<SpaceDetails
							space={space}
							id={spaceId}
							onCreateAccessCondition={() =>
								onCreateAccessCondition(spaceId)
							}
						/>
					</>
				)}
			</>
		</EaseInAnimation>
	);
};
