import { WalletConnect } from "../../public";
import { SpaceTemplate } from "./SpaceTemplate";

interface Props {
	space: {
		name: string;
		description: string;
	};
	fontColor?: string | null | undefined;
	primaryColor?: string | null | undefined;
}

export function SpaceIntro({
	space: { name, description },
	primaryColor,
	fontColor,
}: Props) {
	return (
		<SpaceTemplate
			title={name}
			description={description}
			buttons={
				<WalletConnect label="Unlock" color={fontColor || "black"} />
			}
			primaryColor={primaryColor}
			fontColor={fontColor}
		/>
	);
}
