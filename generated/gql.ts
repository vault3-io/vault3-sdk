/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tquery SignatureChallengeForAddress($address: String!) {\n\t\tsignatureChallenge(address: $address) {\n\t\t\tmessage\n\t\t}\n\t}\n": types.SignatureChallengeForAddressDocument,
    "\n\tmutation CreateSession(\n\t\t$address: String!\n\t\t$key: String!\n\t\t$signature: String!\n\t) {\n\t\tcreateSession(address: $address, key: $key, signature: $signature) {\n\t\t\tlifetime\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tcardanoAddress\n\t\t\t}\n\t\t}\n\t}\n": types.CreateSessionDocument,
    "\n\tquery FilesInSpace($spaceId: String!) {\n\t\tfilesInSpace(spaceId: $spaceId) {\n\t\t\tid\n\t\t\tname\n\t\t\tmime\n\t\t}\n\t}\n": types.FilesInSpaceDocument,
    "\n\tquery DownloadFile($id: String!) {\n\t\tdownloadFile(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tmime\n\t\t\tcontent\n\t\t}\n\t}\n": types.DownloadFileDocument,
    "\n\tquery DownloadFilesFromSpace($spaceId: String!) {\n\t\tfilesInSpace(spaceId: $spaceId) {\n\t\t\tdownload {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tmime\n\t\t\t\tcontent\n\t\t\t}\n\t\t}\n\t}\n": types.DownloadFilesFromSpaceDocument,
    "\n\tmutation CreateFile(\n\t\t$spaceId: String!\n\t\t$name: String!\n\t\t$mime: String!\n\t\t$content: String!\n\t) {\n\t\tcreateFile(\n\t\t\tspaceId: $spaceId\n\t\t\tname: $name\n\t\t\tmime: $mime\n\t\t\tcontent: $content\n\t\t) {\n\t\t\tid\n\t\t}\n\t}\n": types.CreateFileDocument,
    "\n\tquery FormOverview($id: String!) {\n\t\tformById(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tdescription\n\t\t\tbranding {\n\t\t\t\tbackgroundColor\n\t\t\t\tfontColor\n\t\t\t\tprimaryColor\n\t\t\t\tsecondaryColor\n\t\t\t\tlogoFileContent\n\t\t\t\tlogoFileMime\n\t\t\t\tlogoFileName\n\t\t\t\tfailureCallToActionButtonText\n\t\t\t\tfailureCallToActionText\n\t\t\t\tfailureCallToActionURL\n\t\t\t\tsuccessCallToActionButtonText\n\t\t\t\tsuccessCallToActionText\n\t\t\t\tsuccessCallToActionURL\n\t\t\t\tsecondaryFailureCallToActionButtonText\n\t\t\t\tsecondaryFailureCallToActionURL\n\t\t\t\tsecondarySuccessCallToActionButtonText\n\t\t\t\tsecondarySuccessCallToActionURL\n\t\t\t\tx\n\t\t\t\tdiscord\n\t\t\t\ttelegram\n\t\t\t\tyoutube\n\t\t\t\twebsiteURL\n\t\t\t}\n\t\t\tisActive\n\t\t}\n\t}\n": types.FormOverviewDocument,
    "\n\tmutation CreateFormEntry($formId: String!, $values: JSONObject!) {\n\t\tcreateFormEntry(formId: $formId, values: $values) {\n\t\t\tid\n\t\t}\n\t}\n": types.CreateFormEntryDocument,
    "\n\tquery CheckFormEntryConditions($formId: String!) {\n\t\tcheckFormEntryConditions(formId: $formId)\n\t}\n": types.CheckFormEntryConditionsDocument,
    "\n\tmutation RegisterInteraction(\n\t\t$action: InteractionActionType!\n\t\t$topic: String!\n\t\t$event: JSONObject!\n\t) {\n\t\tregisterInteraction(action: $action, topic: $topic, event: $event) {\n\t\t\tid\n\t\t}\n\t}\n": types.RegisterInteractionDocument,
    "\n\tquery SpaceOverview($id: String!) {\n\t\tspaceById(id: $id) {\n\t\t\tname\n\t\t\tdescription\n\t\t\tslug\n\t\t\tbranding {\n\t\t\t\tbackgroundColor\n\t\t\t\tfontColor\n\t\t\t\tprimaryColor\n\t\t\t\tsecondaryColor\n\t\t\t\tlogoFileContent\n\t\t\t\tlogoFileMime\n\t\t\t\tlogoFileName\n\t\t\t\tfailureCallToActionButtonText\n\t\t\t\tfailureCallToActionText\n\t\t\t\tfailureCallToActionURL\n\t\t\t\tsuccessCallToActionButtonText\n\t\t\t\tsuccessCallToActionText\n\t\t\t\tsuccessCallToActionURL\n\t\t\t\tsecondaryFailureCallToActionButtonText\n\t\t\t\tsecondaryFailureCallToActionURL\n\t\t\t\tsecondarySuccessCallToActionButtonText\n\t\t\t\tsecondarySuccessCallToActionURL\n\t\t\t\tx\n\t\t\t\tdiscord\n\t\t\t\ttelegram\n\t\t\t\tyoutube\n\t\t\t\twebsiteURL\n\t\t\t}\n\t\t\tisActive\n\t\t}\n\t}\n": types.SpaceOverviewDocument,
    "\n\tquery SpaceList {\n\t\tspaces {\n\t\t\tid\n\t\t\tname\n\t\t\tisActive\n\t\t\tcreatedAt\n\t\t\tslug\n\t\t\tspaceAccessConditions {\n\t\t\t\taccessCondition {\n\t\t\t\t\tid\n\t\t\t\t\ttype\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.SpaceListDocument,
    "\n\tmutation CreateSpace($name: String!, $description: String, $slug: String) {\n\t\tcreateSpace(name: $name, description: $description, slug: $slug) {\n\t\t\tid\n\t\t}\n\t}\n": types.CreateSpaceDocument,
    "\n\tmutation UpdateSpaceBranding(\n\t\t$id: String!\n\t\t$logoFileContent: String\n\t\t$logoFileName: String\n\t\t$logoFileMime: String\n\t\t$websiteURL: String\n\t\t$backgroundColor: String\n\t\t$fontColor: String\n\t\t$primaryColor: String\n\t\t$secondaryColor: String\n\t\t$x: String\n\t\t$discord: String\n\t\t$telegram: String\n\t\t$youtube: String\n\t\t$failureCallToActionButtonText: String\n\t\t$failureCallToActionText: String\n\t\t$failureCallToActionURL: String\n\t\t$successCallToActionButtonText: String\n\t\t$successCallToActionText: String\n\t\t$successCallToActionURL: String\n\t\t$secondaryFailureCallToActionButtonText: String\n\t\t$secondaryFailureCallToActionURL: String\n\t\t$secondarySuccessCallToActionButtonText: String\n\t\t$secondarySuccessCallToActionURL: String\n\t) {\n\t\tupdateSpaceBranding(\n\t\t\tid: $id\n\t\t\tlogoFileContent: $logoFileContent\n\t\t\tlogoFileName: $logoFileName\n\t\t\tlogoFileMime: $logoFileMime\n\t\t\twebsiteURL: $websiteURL\n\t\t\tbackgroundColor: $backgroundColor\n\t\t\tfontColor: $fontColor\n\t\t\tprimaryColor: $primaryColor\n\t\t\tsecondaryColor: $secondaryColor\n\t\t\tx: $x\n\t\t\tdiscord: $discord\n\t\t\ttelegram: $telegram\n\t\t\tyoutube: $youtube\n\t\t\tfailureCallToActionButtonText: $failureCallToActionButtonText\n\t\t\tfailureCallToActionText: $failureCallToActionText\n\t\t\tfailureCallToActionURL: $failureCallToActionURL\n\t\t\tsuccessCallToActionButtonText: $successCallToActionButtonText\n\t\t\tsuccessCallToActionText: $successCallToActionText\n\t\t\tsuccessCallToActionURL: $successCallToActionURL\n\t\t\tsecondaryFailureCallToActionButtonText: $secondaryFailureCallToActionButtonText\n\t\t\tsecondaryFailureCallToActionURL: $secondaryFailureCallToActionURL\n\t\t\tsecondarySuccessCallToActionButtonText: $secondarySuccessCallToActionButtonText\n\t\t\tsecondarySuccessCallToActionURL: $secondarySuccessCallToActionURL\n\t\t) {\n\t\t\tid\n\t\t}\n\t}\n": types.UpdateSpaceBrandingDocument,
    "\n\tmutation AssignWhitelistAccessCondition(\n\t\t$name: String!\n\t\t$allow: [String!]!\n\t) {\n\t\tcreateWhitelistAccessCondition(name: $name, allow: $allow) {\n\t\t\tid\n\t\t}\n\t}\n": types.AssignWhitelistAccessConditionDocument,
    "\n\tmutation AssignAssetOwnerAccessCondition(\n\t\t$name: String!\n\t\t$policyId: String!\n\t\t$minAmount: Int!\n\t\t$assetFingerprint: String!\n\t) {\n\t\tcreateAssetOwnerAccessCondition(\n\t\t\tname: $name\n\t\t\tpolicyId: $policyId\n\t\t\tminAmount: $minAmount\n\t\t\tassetFingerprint: $assetFingerprint\n\t\t) {\n\t\t\tid\n\t\t}\n\t}\n": types.AssignAssetOwnerAccessConditionDocument,
    "\n\tmutation AssignPoolDelegationAccessCondition(\n\t\t$name: String!\n\t\t$poolId: String!\n\t\t$minEpochs: Int!\n\t\t$minDelegation: Int!\n\t) {\n\t\tcreatePoolDelegationAccessCondition(\n\t\t\tname: $name\n\t\t\tpoolId: $poolId\n\t\t\tminEpochs: $minEpochs\n\t\t\tminDelegation: $minDelegation\n\t\t) {\n\t\t\tid\n\t\t}\n\t}\n": types.AssignPoolDelegationAccessConditionDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery SignatureChallengeForAddress($address: String!) {\n\t\tsignatureChallenge(address: $address) {\n\t\t\tmessage\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery SignatureChallengeForAddress($address: String!) {\n\t\tsignatureChallenge(address: $address) {\n\t\t\tmessage\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreateSession(\n\t\t$address: String!\n\t\t$key: String!\n\t\t$signature: String!\n\t) {\n\t\tcreateSession(address: $address, key: $key, signature: $signature) {\n\t\t\tlifetime\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tcardanoAddress\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateSession(\n\t\t$address: String!\n\t\t$key: String!\n\t\t$signature: String!\n\t) {\n\t\tcreateSession(address: $address, key: $key, signature: $signature) {\n\t\t\tlifetime\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tcardanoAddress\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery FilesInSpace($spaceId: String!) {\n\t\tfilesInSpace(spaceId: $spaceId) {\n\t\t\tid\n\t\t\tname\n\t\t\tmime\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery FilesInSpace($spaceId: String!) {\n\t\tfilesInSpace(spaceId: $spaceId) {\n\t\t\tid\n\t\t\tname\n\t\t\tmime\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery DownloadFile($id: String!) {\n\t\tdownloadFile(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tmime\n\t\t\tcontent\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery DownloadFile($id: String!) {\n\t\tdownloadFile(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tmime\n\t\t\tcontent\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery DownloadFilesFromSpace($spaceId: String!) {\n\t\tfilesInSpace(spaceId: $spaceId) {\n\t\t\tdownload {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tmime\n\t\t\t\tcontent\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery DownloadFilesFromSpace($spaceId: String!) {\n\t\tfilesInSpace(spaceId: $spaceId) {\n\t\t\tdownload {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tmime\n\t\t\t\tcontent\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreateFile(\n\t\t$spaceId: String!\n\t\t$name: String!\n\t\t$mime: String!\n\t\t$content: String!\n\t) {\n\t\tcreateFile(\n\t\t\tspaceId: $spaceId\n\t\t\tname: $name\n\t\t\tmime: $mime\n\t\t\tcontent: $content\n\t\t) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateFile(\n\t\t$spaceId: String!\n\t\t$name: String!\n\t\t$mime: String!\n\t\t$content: String!\n\t) {\n\t\tcreateFile(\n\t\t\tspaceId: $spaceId\n\t\t\tname: $name\n\t\t\tmime: $mime\n\t\t\tcontent: $content\n\t\t) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery FormOverview($id: String!) {\n\t\tformById(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tdescription\n\t\t\tbranding {\n\t\t\t\tbackgroundColor\n\t\t\t\tfontColor\n\t\t\t\tprimaryColor\n\t\t\t\tsecondaryColor\n\t\t\t\tlogoFileContent\n\t\t\t\tlogoFileMime\n\t\t\t\tlogoFileName\n\t\t\t\tfailureCallToActionButtonText\n\t\t\t\tfailureCallToActionText\n\t\t\t\tfailureCallToActionURL\n\t\t\t\tsuccessCallToActionButtonText\n\t\t\t\tsuccessCallToActionText\n\t\t\t\tsuccessCallToActionURL\n\t\t\t\tsecondaryFailureCallToActionButtonText\n\t\t\t\tsecondaryFailureCallToActionURL\n\t\t\t\tsecondarySuccessCallToActionButtonText\n\t\t\t\tsecondarySuccessCallToActionURL\n\t\t\t\tx\n\t\t\t\tdiscord\n\t\t\t\ttelegram\n\t\t\t\tyoutube\n\t\t\t\twebsiteURL\n\t\t\t}\n\t\t\tisActive\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery FormOverview($id: String!) {\n\t\tformById(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tdescription\n\t\t\tbranding {\n\t\t\t\tbackgroundColor\n\t\t\t\tfontColor\n\t\t\t\tprimaryColor\n\t\t\t\tsecondaryColor\n\t\t\t\tlogoFileContent\n\t\t\t\tlogoFileMime\n\t\t\t\tlogoFileName\n\t\t\t\tfailureCallToActionButtonText\n\t\t\t\tfailureCallToActionText\n\t\t\t\tfailureCallToActionURL\n\t\t\t\tsuccessCallToActionButtonText\n\t\t\t\tsuccessCallToActionText\n\t\t\t\tsuccessCallToActionURL\n\t\t\t\tsecondaryFailureCallToActionButtonText\n\t\t\t\tsecondaryFailureCallToActionURL\n\t\t\t\tsecondarySuccessCallToActionButtonText\n\t\t\t\tsecondarySuccessCallToActionURL\n\t\t\t\tx\n\t\t\t\tdiscord\n\t\t\t\ttelegram\n\t\t\t\tyoutube\n\t\t\t\twebsiteURL\n\t\t\t}\n\t\t\tisActive\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreateFormEntry($formId: String!, $values: JSONObject!) {\n\t\tcreateFormEntry(formId: $formId, values: $values) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateFormEntry($formId: String!, $values: JSONObject!) {\n\t\tcreateFormEntry(formId: $formId, values: $values) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery CheckFormEntryConditions($formId: String!) {\n\t\tcheckFormEntryConditions(formId: $formId)\n\t}\n"): (typeof documents)["\n\tquery CheckFormEntryConditions($formId: String!) {\n\t\tcheckFormEntryConditions(formId: $formId)\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation RegisterInteraction(\n\t\t$action: InteractionActionType!\n\t\t$topic: String!\n\t\t$event: JSONObject!\n\t) {\n\t\tregisterInteraction(action: $action, topic: $topic, event: $event) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation RegisterInteraction(\n\t\t$action: InteractionActionType!\n\t\t$topic: String!\n\t\t$event: JSONObject!\n\t) {\n\t\tregisterInteraction(action: $action, topic: $topic, event: $event) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery SpaceOverview($id: String!) {\n\t\tspaceById(id: $id) {\n\t\t\tname\n\t\t\tdescription\n\t\t\tslug\n\t\t\tbranding {\n\t\t\t\tbackgroundColor\n\t\t\t\tfontColor\n\t\t\t\tprimaryColor\n\t\t\t\tsecondaryColor\n\t\t\t\tlogoFileContent\n\t\t\t\tlogoFileMime\n\t\t\t\tlogoFileName\n\t\t\t\tfailureCallToActionButtonText\n\t\t\t\tfailureCallToActionText\n\t\t\t\tfailureCallToActionURL\n\t\t\t\tsuccessCallToActionButtonText\n\t\t\t\tsuccessCallToActionText\n\t\t\t\tsuccessCallToActionURL\n\t\t\t\tsecondaryFailureCallToActionButtonText\n\t\t\t\tsecondaryFailureCallToActionURL\n\t\t\t\tsecondarySuccessCallToActionButtonText\n\t\t\t\tsecondarySuccessCallToActionURL\n\t\t\t\tx\n\t\t\t\tdiscord\n\t\t\t\ttelegram\n\t\t\t\tyoutube\n\t\t\t\twebsiteURL\n\t\t\t}\n\t\t\tisActive\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery SpaceOverview($id: String!) {\n\t\tspaceById(id: $id) {\n\t\t\tname\n\t\t\tdescription\n\t\t\tslug\n\t\t\tbranding {\n\t\t\t\tbackgroundColor\n\t\t\t\tfontColor\n\t\t\t\tprimaryColor\n\t\t\t\tsecondaryColor\n\t\t\t\tlogoFileContent\n\t\t\t\tlogoFileMime\n\t\t\t\tlogoFileName\n\t\t\t\tfailureCallToActionButtonText\n\t\t\t\tfailureCallToActionText\n\t\t\t\tfailureCallToActionURL\n\t\t\t\tsuccessCallToActionButtonText\n\t\t\t\tsuccessCallToActionText\n\t\t\t\tsuccessCallToActionURL\n\t\t\t\tsecondaryFailureCallToActionButtonText\n\t\t\t\tsecondaryFailureCallToActionURL\n\t\t\t\tsecondarySuccessCallToActionButtonText\n\t\t\t\tsecondarySuccessCallToActionURL\n\t\t\t\tx\n\t\t\t\tdiscord\n\t\t\t\ttelegram\n\t\t\t\tyoutube\n\t\t\t\twebsiteURL\n\t\t\t}\n\t\t\tisActive\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery SpaceList {\n\t\tspaces {\n\t\t\tid\n\t\t\tname\n\t\t\tisActive\n\t\t\tcreatedAt\n\t\t\tslug\n\t\t\tspaceAccessConditions {\n\t\t\t\taccessCondition {\n\t\t\t\t\tid\n\t\t\t\t\ttype\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery SpaceList {\n\t\tspaces {\n\t\t\tid\n\t\t\tname\n\t\t\tisActive\n\t\t\tcreatedAt\n\t\t\tslug\n\t\t\tspaceAccessConditions {\n\t\t\t\taccessCondition {\n\t\t\t\t\tid\n\t\t\t\t\ttype\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreateSpace($name: String!, $description: String, $slug: String) {\n\t\tcreateSpace(name: $name, description: $description, slug: $slug) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateSpace($name: String!, $description: String, $slug: String) {\n\t\tcreateSpace(name: $name, description: $description, slug: $slug) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation UpdateSpaceBranding(\n\t\t$id: String!\n\t\t$logoFileContent: String\n\t\t$logoFileName: String\n\t\t$logoFileMime: String\n\t\t$websiteURL: String\n\t\t$backgroundColor: String\n\t\t$fontColor: String\n\t\t$primaryColor: String\n\t\t$secondaryColor: String\n\t\t$x: String\n\t\t$discord: String\n\t\t$telegram: String\n\t\t$youtube: String\n\t\t$failureCallToActionButtonText: String\n\t\t$failureCallToActionText: String\n\t\t$failureCallToActionURL: String\n\t\t$successCallToActionButtonText: String\n\t\t$successCallToActionText: String\n\t\t$successCallToActionURL: String\n\t\t$secondaryFailureCallToActionButtonText: String\n\t\t$secondaryFailureCallToActionURL: String\n\t\t$secondarySuccessCallToActionButtonText: String\n\t\t$secondarySuccessCallToActionURL: String\n\t) {\n\t\tupdateSpaceBranding(\n\t\t\tid: $id\n\t\t\tlogoFileContent: $logoFileContent\n\t\t\tlogoFileName: $logoFileName\n\t\t\tlogoFileMime: $logoFileMime\n\t\t\twebsiteURL: $websiteURL\n\t\t\tbackgroundColor: $backgroundColor\n\t\t\tfontColor: $fontColor\n\t\t\tprimaryColor: $primaryColor\n\t\t\tsecondaryColor: $secondaryColor\n\t\t\tx: $x\n\t\t\tdiscord: $discord\n\t\t\ttelegram: $telegram\n\t\t\tyoutube: $youtube\n\t\t\tfailureCallToActionButtonText: $failureCallToActionButtonText\n\t\t\tfailureCallToActionText: $failureCallToActionText\n\t\t\tfailureCallToActionURL: $failureCallToActionURL\n\t\t\tsuccessCallToActionButtonText: $successCallToActionButtonText\n\t\t\tsuccessCallToActionText: $successCallToActionText\n\t\t\tsuccessCallToActionURL: $successCallToActionURL\n\t\t\tsecondaryFailureCallToActionButtonText: $secondaryFailureCallToActionButtonText\n\t\t\tsecondaryFailureCallToActionURL: $secondaryFailureCallToActionURL\n\t\t\tsecondarySuccessCallToActionButtonText: $secondarySuccessCallToActionButtonText\n\t\t\tsecondarySuccessCallToActionURL: $secondarySuccessCallToActionURL\n\t\t) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateSpaceBranding(\n\t\t$id: String!\n\t\t$logoFileContent: String\n\t\t$logoFileName: String\n\t\t$logoFileMime: String\n\t\t$websiteURL: String\n\t\t$backgroundColor: String\n\t\t$fontColor: String\n\t\t$primaryColor: String\n\t\t$secondaryColor: String\n\t\t$x: String\n\t\t$discord: String\n\t\t$telegram: String\n\t\t$youtube: String\n\t\t$failureCallToActionButtonText: String\n\t\t$failureCallToActionText: String\n\t\t$failureCallToActionURL: String\n\t\t$successCallToActionButtonText: String\n\t\t$successCallToActionText: String\n\t\t$successCallToActionURL: String\n\t\t$secondaryFailureCallToActionButtonText: String\n\t\t$secondaryFailureCallToActionURL: String\n\t\t$secondarySuccessCallToActionButtonText: String\n\t\t$secondarySuccessCallToActionURL: String\n\t) {\n\t\tupdateSpaceBranding(\n\t\t\tid: $id\n\t\t\tlogoFileContent: $logoFileContent\n\t\t\tlogoFileName: $logoFileName\n\t\t\tlogoFileMime: $logoFileMime\n\t\t\twebsiteURL: $websiteURL\n\t\t\tbackgroundColor: $backgroundColor\n\t\t\tfontColor: $fontColor\n\t\t\tprimaryColor: $primaryColor\n\t\t\tsecondaryColor: $secondaryColor\n\t\t\tx: $x\n\t\t\tdiscord: $discord\n\t\t\ttelegram: $telegram\n\t\t\tyoutube: $youtube\n\t\t\tfailureCallToActionButtonText: $failureCallToActionButtonText\n\t\t\tfailureCallToActionText: $failureCallToActionText\n\t\t\tfailureCallToActionURL: $failureCallToActionURL\n\t\t\tsuccessCallToActionButtonText: $successCallToActionButtonText\n\t\t\tsuccessCallToActionText: $successCallToActionText\n\t\t\tsuccessCallToActionURL: $successCallToActionURL\n\t\t\tsecondaryFailureCallToActionButtonText: $secondaryFailureCallToActionButtonText\n\t\t\tsecondaryFailureCallToActionURL: $secondaryFailureCallToActionURL\n\t\t\tsecondarySuccessCallToActionButtonText: $secondarySuccessCallToActionButtonText\n\t\t\tsecondarySuccessCallToActionURL: $secondarySuccessCallToActionURL\n\t\t) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation AssignWhitelistAccessCondition(\n\t\t$name: String!\n\t\t$allow: [String!]!\n\t) {\n\t\tcreateWhitelistAccessCondition(name: $name, allow: $allow) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation AssignWhitelistAccessCondition(\n\t\t$name: String!\n\t\t$allow: [String!]!\n\t) {\n\t\tcreateWhitelistAccessCondition(name: $name, allow: $allow) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation AssignAssetOwnerAccessCondition(\n\t\t$name: String!\n\t\t$policyId: String!\n\t\t$minAmount: Int!\n\t\t$assetFingerprint: String!\n\t) {\n\t\tcreateAssetOwnerAccessCondition(\n\t\t\tname: $name\n\t\t\tpolicyId: $policyId\n\t\t\tminAmount: $minAmount\n\t\t\tassetFingerprint: $assetFingerprint\n\t\t) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation AssignAssetOwnerAccessCondition(\n\t\t$name: String!\n\t\t$policyId: String!\n\t\t$minAmount: Int!\n\t\t$assetFingerprint: String!\n\t) {\n\t\tcreateAssetOwnerAccessCondition(\n\t\t\tname: $name\n\t\t\tpolicyId: $policyId\n\t\t\tminAmount: $minAmount\n\t\t\tassetFingerprint: $assetFingerprint\n\t\t) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation AssignPoolDelegationAccessCondition(\n\t\t$name: String!\n\t\t$poolId: String!\n\t\t$minEpochs: Int!\n\t\t$minDelegation: Int!\n\t) {\n\t\tcreatePoolDelegationAccessCondition(\n\t\t\tname: $name\n\t\t\tpoolId: $poolId\n\t\t\tminEpochs: $minEpochs\n\t\t\tminDelegation: $minDelegation\n\t\t) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation AssignPoolDelegationAccessCondition(\n\t\t$name: String!\n\t\t$poolId: String!\n\t\t$minEpochs: Int!\n\t\t$minDelegation: Int!\n\t) {\n\t\tcreatePoolDelegationAccessCondition(\n\t\t\tname: $name\n\t\t\tpoolId: $poolId\n\t\t\tminEpochs: $minEpochs\n\t\t\tminDelegation: $minDelegation\n\t\t) {\n\t\t\tid\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;