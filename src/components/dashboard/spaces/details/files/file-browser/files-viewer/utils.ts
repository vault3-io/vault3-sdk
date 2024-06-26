export const viewerStyles = {
	"#image-img": { borderRadius: "8px", maxHeight: "80vh" },
	"#react-doc-viewer, #header-bar, #proxy-renderer, #image-renderer": {
		background: "transparent",
		backgroundColor: "transparent",
		backgroundImage: "none",
	},
	"#doc-nav-prev, #doc-nav-next": {
		backgroundColor: "var(--chakra-colors-blue-700)",
	},
	"#pdf-controls": {
		background: "transparent",
		boxShadow: "none",
	},
	"#pdf-controls button": {
		backgroundColor: "var(--chakra-colors-blue-700)",
		width: "32px",
		height: "32px",
		padding: "4px",
		color: "white",
		fontSize: "14px",
	},
	"#pdf-controls button svg g": {
		fill: "white",
	},
	"#pdf-controls #pdf-download, #pdf-controls #pdf-zoom-reset": {
		display: "none",
	},
};
