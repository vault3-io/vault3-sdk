export function fileToBase64(file: File): Promise<string | null> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () =>
			resolve(
				reader.result?.toString().replace(/^data:(.*,)?/, "") || null
			);
		reader.onerror = reject;
	});
}

export function base64ToFile(filename: string, mime: string, base64: string) {
	const blob = base64ToBlob(mime, base64);
	return new File([blob], filename);
}

export function base64ToBlob(mime: string, base64: string) {
	const byteString = atob(base64);

	// Write content to ArrayBuffer
	const ab = new ArrayBuffer(byteString.length);
	const ia = new Uint8Array(ab);
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	return new Blob([ab], { type: mime });
}

export function downloadBlob(blob: Blob, filename: string) {
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.style.display = "none";
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	window.URL.revokeObjectURL(url);
}

export function blobToUrl(mime: string, base64: string) {
	const blob = base64ToBlob(mime, base64);

	const url = window.URL.createObjectURL(blob);

	return url;
}
