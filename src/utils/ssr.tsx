import { PropsWithChildren } from "react";

export function canUseDOM() {
	return (
		typeof window !== "undefined" &&
		window.document &&
		window.document.createElement
	);
}

/**
 * Check if in SSR context or return window
 */
export function useWindow() {
	if (!canUseDOM()) {
		return null;
	}
	return window;
}

/**
 * Only render children on the client
 */
export function NoSSR({ children }: PropsWithChildren) {
	if (!canUseDOM()) {
		return <></>;
	}
	return children;
}
