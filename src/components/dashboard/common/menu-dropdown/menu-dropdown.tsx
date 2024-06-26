import { PropsWithChildren } from "react";
import { IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

export const MenuDropdown = ({ children }: PropsWithChildren) => {
	return (
		<Menu>
			<MenuButton
				as={IconButton}
				aria-label="Options"
				fontSize="22px"
				backgroundColor="transparent"
				border="none"
				icon={<BsThreeDots />}
				variant="outline"
				onClick={(e) => e.stopPropagation()}
				_hover={{ backgroundColor: "gray.200" }}
			/>
			<MenuList>{children}</MenuList>
		</Menu>
	);
};
