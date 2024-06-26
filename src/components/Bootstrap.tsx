import { ChakraProvider } from "@chakra-ui/react";

import { MeshProvider } from "@meshsdk/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import theme from "../theme";
import { AppConfig, AppProvider } from "./AppProvider";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
	config: AppConfig;
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 1000 * 60 * 60 * 24, // 24 hours
		},
	},
});

export function Bootstrap({ config, children }: Props) {
	return (
		<ChakraProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<MeshProvider>
					<AppProvider config={config}>{children}</AppProvider>
				</MeshProvider>
			</QueryClientProvider>
		</ChakraProvider>
	);
}
