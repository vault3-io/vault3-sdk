export function formatDateToDateString(dateString: string) {
	const userLocale = window.navigator.language;
	const date = new Date(dateString);
	return date.toLocaleDateString(userLocale);
}

export function formatDateToDateTimeString(dateString: string) {
	const userLocale = window.navigator.language;
	const date = new Date(dateString);
	return date.toLocaleString(userLocale);
}
