import React from "react";

import DocViewer, {
	DocViewerRenderers,
	IDocument,
} from "@cyntler/react-doc-viewer";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { ViewerHeader } from "./ViewerHeader";

interface Props {
	files: IDocument[] & { index: number }[];
	activeFile?: IDocument;
	handleActiveFileIndex: (id: number) => void;
}

export const FilesViewer = ({
	files,
	activeFile,
	handleActiveFileIndex,
}: Props) => {
	return (
		<DocViewer
			documents={files}
			activeDocument={activeFile}
			onDocumentChange={(document) =>
				handleActiveFileIndex(document["index"])
			}
			pluginRenderers={DocViewerRenderers}
			config={{
				header: {
					overrideComponent: (
						state,
						previousDocument,
						nextDocument
					) =>
						ViewerHeader({
							state: state,
							previousDocument: previousDocument,
							nextDocument: nextDocument,
							filesLength: files.length,
						}),
				},
			}}
		/>
	);
};
