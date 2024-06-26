import { Box, Text } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { FiHelpCircle } from "react-icons/fi";
import { Tooltip } from "src/components/dashboard/common/tooltip/Tooltip";

interface Props {
	title: string;
	subtitle?: string;
	hint?: ReactNode;
}

export const SectionTitle = ({ title, subtitle, hint }: Props) => {
	return (
		<Box>
			<Text
				fontSize="lg"
				fontWeight={700}
				display="flex"
				gap={1.5}
				alignItems="center"
			>
				{title}
				{hint && (
					<Tooltip label={hint}>
						<span>
							<FiHelpCircle />
						</span>
					</Tooltip>
				)}
			</Text>
			{subtitle && (
				<Text mb={4} color="gray.500">
					{subtitle}
				</Text>
			)}
		</Box>
	);
};
