import { ChakraProvider } from "@chakra-ui/react";

import { MeshProvider } from "@meshsdk/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import theme from "../theme";
import { AppProvider } from "./AppProvider";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
	config: {
		tenant: string;
		token: string;
	};
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 1000 * 60 * 60 * 24, // 24 hours
		},
	},
});

export function Bootstrap({ config: { tenant, token }, children }: Props) {
	return (
		<ChakraProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<MeshProvider>
					<AppProvider>{children}</AppProvider>
				</MeshProvider>
			</QueryClientProvider>
		</ChakraProvider>
	);
}
