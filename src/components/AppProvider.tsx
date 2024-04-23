import { useToast, UseToastOptions } from "@chakra-ui/react";
import { PropsWithChildren, useState } from "react";

import { AppContext, AppContextShape } from "../context";
import { graphQLClient } from "../utils/graphql";

const defaultToastOptions: UseToastOptions = {
	variant: "top-accent",
	duration: 6000,
	isClosable: true,
};
const toastIdError = "app-error";

export function AppProvider({ children }: PropsWithChildren<any>) {
	const toast = useToast();
	const [ctx, setCtx] = useState<AppContextShape>({
		isSignedIn: false,
		user: null,
		session: null,
		error(err, title) {
			err = err instanceof Error ? err : new Error(err);
			console.error(err);
			if (!toast.isActive(toastIdError)) {
				toast({
					id: toastIdError,
					...defaultToastOptions,
					status: "error",
					title: title || "A wild 🐞 appeared!",
				});
			}
		},
		toast(options?: UseToastOptions) {
			toast({
				...defaultToastOptions,
				...options,
			});
		},
		onSignIn(session) {
			graphQLClient.setHeader("authorization", session.token);
			setCtx((ctx) => ({
				...ctx,
				isSignedIn: true,
				// Any should cast down to types
				user: session as any,
				session: session.user as any,
			}));
		},
		onSignOut() {
			graphQLClient.setHeader("authorization", "");
			setCtx((ctx) => ({
				...ctx,
				isSignedIn: false,
				user: null,
				session: null,
			}));
		},
	});

	return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
}
