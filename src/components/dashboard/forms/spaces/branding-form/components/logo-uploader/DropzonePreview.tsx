import React from "react";
import { Icon, Image, Stack } from "@chakra-ui/react";
import { TiDelete } from "react-icons/ti";

interface DropzonePreviewProps {
	file: File;
	onDelete: () => void;
}

export const DropzonePreview = ({ file, onDelete }: DropzonePreviewProps) => {
	return (
		<Stack>
			<Icon
				zIndex={999}
				onClick={(e) => {
					e.stopPropagation();
					onDelete();
				}}
				position="absolute"
				right="0"
				mt="-1"
				as={TiDelete}
				color="blue.700"
				w="8"
				h="8"
				_hover={{
					cursor: "pointer",
					transform: "scale(1.1)",
					transition: "0.1s",
				}}
			/>
			<Image
				src={URL.createObjectURL(file)}
				alt="Preview of dropped file"
				minH={20}
				maxH={44}
				maxW={96}
				mt="2"
				objectFit="scale-down"
				borderTopRadius={7}
				borderBottomRadius={7}
			/>
		</Stack>
	);
};
