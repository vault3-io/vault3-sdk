import { DiscoverVAULT3Button } from "../../components";
import { SpaceTemplate } from "./SpaceTemplate";
import { BiBug } from "react-icons/bi";

interface SpaceErrorProps {
	fontColor?: string | null | undefined;
	primaryColor?: string | null | undefined;
}

export function SpaceError({ primaryColor, fontColor }: SpaceErrorProps) {
	return (
		<SpaceTemplate
			icon={BiBug}
			title="Something went wrong"
			description="Get in touch with the creator and try again later."
			primaryColor={primaryColor}
			fontColor={fontColor}
		/>
	);
}
