import { Flex, Heading, Text } from "@chakra-ui/react";

import { NoDataButtons } from "src/components/dashboard/common/no-data-box/buttons/NoDataButtons";
import { NoDataIcon } from "src/components/dashboard/common/no-data-box/no-data-icon/NoDataIcon";
import { IconType } from "react-icons";

interface Props {
	title: string;
	description: string;
	icon: IconType;
	primaryButtonAction?: () => void;
	secondaryButtonAction?: () => void;
	primaryButtonText?: string;
	secondaryButtonText?: string;
}

export const NoDataBox = ({
	title,
	description,
	icon,
	primaryButtonAction,
	secondaryButtonAction,
	secondaryButtonText,
	primaryButtonText,
}: Props) => {
	return (
		<Flex justifyContent="center" alignItems="center" mt="100px">
			<Flex alignItems="start" gap="22px">
				<NoDataIcon icon={icon} />
				<Flex direction="column" maxW="min-content">
					<Heading
						fontSize="32px"
						lineHeight="48px"
						mb="8px"
						whiteSpace="nowrap"
						fontWeight="700"
					>
						{title}
					</Heading>
					<Text fontSize="14px" fontWeight="500" mb="20px">
						{description}
					</Text>
					<NoDataButtons
						primaryButtonAction={primaryButtonAction}
						secondaryButtonAction={secondaryButtonAction}
						primaryButtonText={primaryButtonText}
						secondaryButtonText={secondaryButtonText}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};
