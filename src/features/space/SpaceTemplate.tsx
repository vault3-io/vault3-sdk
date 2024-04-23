import { Stack, Icon, HStack, Text, Box, IconButton } from "@chakra-ui/react";
import { EaseInAnimation } from "../../animations/EaseInAnimation";
import { IconType } from "react-icons";
import { ReactNode } from "react";
import { MdOutlineFileUpload } from "react-icons/md";

interface Props {
	icon?: IconType;
	title: string;
	description?: string;
	children?: ReactNode;
	buttons?: ReactNode;
	size?: "lg" | "md";
	primaryColor?: string | null;
	secondaryColor?: string | null;
	fontColor?: string | null;
	downloadFiles?: () => void;
}

export function SpaceTemplate({
	icon,
	title,
	description,
	children,
	buttons,
	size = "md",
	primaryColor,
	fontColor,
	downloadFiles,
}: Props) {
	return (
		<EaseInAnimation>
			<Stack align="center" position="relative" spacing={8}>
				{icon && (
					<Icon
						as={icon}
						w={12}
						h={12}
						mb={-4}
						color={primaryColor || "brand.dark"}
					/>
				)}
				{downloadFiles && (
					<Box display="flex" justifyContent="end" w="100%">
						<IconButton
							icon={<MdOutlineFileUpload fontSize={"42px"} />}
							aria-label="download-button"
							onClick={downloadFiles}
							color={primaryColor || "brand.dark"}
							mb={-4}
							_hover={{
								transform: "scale(1.2)",
								transition: "0.2s",
							}}
						/>
					</Box>
				)}
				<Text
					color={primaryColor || "brand.dark"}
					fontWeight={"bold"}
					fontSize={size === "lg" ? "3xl" : "2xl"}
					lineHeight={1.25}
					textAlign={"center"}
					px={{ base: 6, "2xl": 0 }}
				>
					{title}
				</Text>

				{children}

				<Text
					color={fontColor || "black"}
					fontWeight={"normal"}
					fontSize={size === "lg" ? "2xl" : "lg"}
					lineHeight={1.25}
					textAlign={"center"}
					mt={-4}
					px={{ base: 6, "2xl": 0 }}
				>
					{description}
				</Text>

				{buttons && <HStack spacing="2">{buttons}</HStack>}
			</Stack>
		</EaseInAnimation>
	);
}
