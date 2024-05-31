import { CodegenConfig } from "@graphql-codegen/cli";
import { printSchema } from "graphql";
import { schema } from "@vault/graphql";

const config: CodegenConfig = {
	schema: printSchema(schema),
	documents: ["./**/!(*.d).{ts,tsx}"],
	debug: true,
	ignoreNoDocuments: true,
	verbose: true,
	overwrite: true,
	generates: {
		"./generated/": {
			preset: "client",
		},
	},
};

export default config;
