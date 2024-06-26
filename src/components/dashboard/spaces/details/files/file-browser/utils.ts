import { ChonkyActions, ChonkyIconName, defineFileAction, FileAction } from "chonky";

export const fileBrowserBoxStyles = {
	'[class^="previewFile"]': {
		backgroundColor: "#eef2f9 !important",
	},
	svg: { width: "14px !important" },
	".chonky-iconDropdown svg": {
		width: "10px !important",
		marginLeft: "2px",
	},
	".chonky-chonkyRoot": {
		height: "325px",
		maxHeight: "600px",
	},
	".chonky-fileListEmptyContent": {
		display: "flex",
	},
};

export const copyTitleWithoutFileExtension = (fileName: string) => {
	const indexOfTypeBegining = fileName?.lastIndexOf(".");

	return fileName?.slice(0, indexOfTypeBegining);
};

export const saveNewTitleWithOldExtension = (
	newTitle: string,
	oldTitle: string
) => {
	const indexOfTypeBegining = oldTitle?.lastIndexOf(".");
	const extension = oldTitle.slice(indexOfTypeBegining);

	return `${newTitle}${extension}`;
};

export const CustomActions: Record<string, FileAction> = {
	EditFileTitle: defineFileAction({
		id: "edit_file_title",
		requiresSelection: true,
		button: {
			name: "Rename title",
			toolbar: false,
			contextMenu: true,
			icon: ChonkyIconName.code,
		},
	}),
	DownloadSelectedFiles: defineFileAction({
		id: "download_selected_files",
		requiresSelection: true,
		button: {
			name: "Download selected",
			toolbar: true,
			contextMenu: false,
			icon: ChonkyIconName.download,
		},
	}),
	DownloadSelectedFile: defineFileAction({
		id: "download_files",
		button: {
			name: "Download file",
			toolbar: false,
			contextMenu: true,
			icon: ChonkyIconName.download,
		},
	}),
	DeleteFiles: defineFileAction({
		id: "delete_files",
		requiresSelection: true,
		button: {
			name: "Delete selected",
			toolbar: true,
			contextMenu: true,
			icon: ChonkyIconName.trash,
		},
	}),
};

export const fileActions: FileAction[] = [
	ChonkyActions.UploadFiles,
	CustomActions.DownloadSelectedFiles,
	CustomActions.EditFileTitle,
	CustomActions.DownloadSelectedFile,
	CustomActions.DeleteFiles,
	ChonkyActions.SelectAllFiles,
	ChonkyActions.ClearSelection,
	ChonkyActions.EnableGridView,
	ChonkyActions.EnableListView,
];
