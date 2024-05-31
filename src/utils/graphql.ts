import { GraphQLClient } from "graphql-request";

function getBaseUrl() {
	return 'http://127.0.0.1:8080';
}

export const graphQLClient = new GraphQLClient(getBaseUrl() + "/api/graphql", {
	fetch,
});
