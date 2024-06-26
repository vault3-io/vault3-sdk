import { useToast, UseToastOptions } from "@chakra-ui/react";
import { PropsWithChildren, useEffect, useState } from "react";

import { AppContext, AppContextShape } from "../../context";
import { getBaseUrl, GraphQLAPIEnv, graphQLClient } from "utils/graphql";
import { Session } from "generated/graphql";

const SESSION_KEY = "session";

const defaultToastOptions: UseToastOptions = {
	variant: "top-accent",
	duration: 6000,
	isClosable: true,
};
const toastIdError = "app-error";

export type AppConfig = {
	env?: GraphQLAPIEnv;
	tenant?: string;
	token?: string;
};

export function AppProvider({
	config,
	children,
}: PropsWithChildren<{ config: AppConfig }>) {
	const toast = useToast();

	// Overwrite and set api url
	useEffect(() => {
		const baseURL = getBaseUrl(config?.env);
		graphQLClient.setEndpoint(baseURL);
	}, [config?.env]);

	const [ctx, setCtx] = useState<AppContextShape>({
		isReady: false,
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
			sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
		},
		onSignOut() {
			graphQLClient.setHeader("authorization", "");
			setCtx((ctx) => ({
				...ctx,
				isSignedIn: false,
				user: null,
				session: null,
			}));
			sessionStorage.removeItem(SESSION_KEY);
		},
	});

	useEffect(() => {
		if (ctx.isReady) return;

		const sessionStr = sessionStorage.getItem(SESSION_KEY);
		const session = sessionStr ? (JSON.parse(sessionStr) as Session) : null;

		if (session && new Date(session.lifetime).getTime() > Date.now()) {
			graphQLClient.setHeader("authorization", session.token);
			setCtx((ctx) => ({
				...ctx,
				isSignedIn: true,
				isReady: true,
				user: session.user,
				session,
			}));
		} else {
			setCtx((ctx) => ({
				...ctx,
				isReady: true,
			}));
		}
	}, [ctx.isReady]);

	return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
}
