import React, { useState, useEffect, useRef } from "react";
import {
	Box,
	Flex,
	Input,
	InputGroup,
	InputLeftElement,
	List,
	ListItem,
	Skeleton,
} from "@chakra-ui/react";
import { SearchItem } from "./SearchItem";
import { AiOutlineLink } from "react-icons/ai";
import { AccessConditionListQuery } from "generated/graphql";

interface Props {
	spaceId: string;
	data: AccessConditionListQuery["accessConditions"];
	isDataLoading: boolean;
	onCreateAccessCondition: () => void;
}

export const AccessConditionsSearch = ({
	spaceId,
	data,
	isDataLoading,
	onCreateAccessCondition,
}: Props) => {
	const searchRef = useRef<HTMLDivElement>(null);

	const [searchResults, setSearchResults] =
		useState<AccessConditionListQuery["accessConditions"]>(data);

	useEffect(() => setSearchResults(data), [data]);

	const [searchTerm, setSearchTerm] = useState("");

	const [showDropdown, setShowDropdown] = useState(false);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const term = event.target.value;
		setSearchTerm(term);

		const filteredResults = data.filter((result) =>
			result.name.toLowerCase().includes(term.toLowerCase())
		);
		setSearchResults(filteredResults);
	};

	const handleInputClick = () => {
		setShowDropdown(true);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			searchRef.current &&
			!searchRef.current.contains(event.target as Node)
		) {
			setShowDropdown(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<Flex gap="9px" width="100%" mb="20px">
			<Box ref={searchRef} width="100%">
				<InputGroup position="relative">
					<InputLeftElement pointerEvents="none">
						<AiOutlineLink color="gray.300" />
					</InputLeftElement>
					<Input
						placeholder="Link access condition"
						autoComplete="off"
						backgroundColor="gray.100"
						value={searchTerm}
						onChange={handleInputChange}
						onClick={handleInputClick}
					/>
				</InputGroup>
				{showDropdown && (
					<Box position="absolute" zIndex="100" w="100%" mt={1}>
						{isDataLoading && <Skeleton w="100%" h="100px" />}
						{!isDataLoading && (
							<List
								borderWidth="1px"
								borderColor="gray.200"
								borderRadius="md"
								py="12px"
								boxShadow="0px 4px 9px var(--chakra-colors-gray-300), 0px 0px 2px var(--chakra-colors-gray-300)"
								backgroundColor="white"
							>
								<Box maxH="510px" overflowY="auto">
									{searchResults?.map((result) => (
										<SearchItem
											key={result.id}
											data={result}
											spaceId={spaceId}
										/>
									))}
								</Box>
								<ListItem
									color="gray.700"
									cursor="pointer"
									display="flex"
									gap="16px"
									p="4px 24px"
									_hover={{ backgroundColor: "gray.100" }}
									onClick={onCreateAccessCondition}
								>
									<b>+</b>
									Create new and link to this space
								</ListItem>
							</List>
						)}
					</Box>
				)}
			</Box>
		</Flex>
	);
};
