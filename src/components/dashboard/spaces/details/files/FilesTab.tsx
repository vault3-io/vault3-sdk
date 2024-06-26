import { useQueryDownloadFilesFromSpace } from "hooks";
import { FileBrowser } from "./file-browser/FileBrowser";
import { SpaceLoader } from "src/features";

interface Props {
	id: string;
}

export const FilesTab = ({ id }: Props) => {
	const { data: spaceFiles, isLoading } = useQueryDownloadFilesFromSpace({
		spaceId: id,
	});

	return (
		<>
			{isLoading && (
				<SpaceLoader
					message="Files Loading..."
					primaryColor="blue.700"
					iconVariant="blue"
				/>
			)}
			{!isLoading && !!spaceFiles && (
				<FileBrowser files={spaceFiles} spaceId={id} />
			)}
		</>
	);
};
