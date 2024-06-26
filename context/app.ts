import { UseToastOptions } from "@chakra-ui/react";

import { Session, User } from "../generated/graphql";
import { createContext } from "react";

export type AppContextShape = {
	isReady: boolean;
	isSignedIn: boolean;
	user: Omit<User, "__typename" | "spaces"> | null;
	session: Omit<Session, "__typename" | "user" | "id" | "userId"> | null;
	error: (err: Error | string, title?: string) => void;
	toast: (options?: UseToastOptions) => void;
	onSignIn: (session: Session) => void;
	onSignOut: () => void;
};

export const AppContext = createContext<AppContextShape>({
	isReady: false,
	isSignedIn: false,
	user: null,
	session: null,
	error: () => null,
	toast: () => null,
	onSignIn: () => null,
	onSignOut: () => null,
});
