import { GraphQLClient } from "graphql-request";

export type GraphQLAPIEnv = "LOCAL" | "STAGING" | "PROD";

export function getBaseUrl(env: GraphQLAPIEnv = "PROD") {
	if (env == "PROD") {
		return "https://api.vault3.io/api/graphql";
	}
	if (env == "STAGING") {
		return "https://api-staging.vault3.io/api/graphql";
	}
	if (env == "LOCAL") {
		return "http://127.0.0.1:8080/api/graphql";
	}
	throw new Error("Unkown GraphQL enviorment!");
}

export const graphQLClient = new GraphQLClient(getBaseUrl(), {
	fetch,
});
