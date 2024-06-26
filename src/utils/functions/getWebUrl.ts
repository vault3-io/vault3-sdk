export function getWebUrl() {
	if (process.env.NEXT_PUBLIC_ENV_TYPE === "LOCAL") {
		return `http://localhost:3001`;
	}
	return `https://vault3.io`;
}
