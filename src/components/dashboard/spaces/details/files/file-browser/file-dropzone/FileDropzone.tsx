import { Box, Flex, Stack, Text, Icon } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

import { ImFire } from "react-icons/im";

interface DropzoneProps {
	onDrop: (acceptedFiles: File[]) => void;
	onDragLeave: () => void;
}

export const FileDropzone = ({ onDrop, onDragLeave }: DropzoneProps) => {
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		noClick: true,
		onDrop,
	});

	return (
		<Box
			{...getRootProps()}
			position="absolute"
			top={0}
			left={0}
			w={"full"}
			h={"full"}
			textColor={"black"}
			transition="0.3s"
			backdropFilter={isDragActive && "blur(0.5rem)"}
			css={{
				svg: { width: "46px !important", fontSize: "46px !important" },
			}}
		>
			<Flex
				w="full"
				h="100%"
				justifyContent="center"
				alignItems="center"
				cursor="pointer"
			>
				{isDragActive ? (
					<Stack alignItems="center" userSelect="none">
						<Flex gap="6px" alignItems="center">
							<Text fontSize="5xl">Drop it like it’s hot!</Text>
							<Icon as={ImFire} w="46px" color="#e6a26b" />
						</Flex>
					</Stack>
				) : (
					<></>
				)}
			</Flex>
			<Box
				position="absolute"
				top="0"
				left="0"
				w="full"
				h="100%"
				backgroundColor="transparent"
				zIndex="10"
				onDragLeave={onDragLeave}
				onDrop={onDragLeave}
			/>
			<input type="file" {...getInputProps()} />
		</Box>
	);
};
