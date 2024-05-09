/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
};

export type AccessCondition = {
  __typename?: 'AccessCondition';
  assetOwnerSettings?: Maybe<AccessConditionAssetOwnerSettings>;
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  creatorId: Scalars['String']['output'];
  form?: Maybe<Form>;
  formId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  poolDelegationSettings?: Maybe<AccessConditionPoolDelegationSettings>;
  space?: Maybe<Space>;
  spaceId?: Maybe<Scalars['String']['output']>;
  type: AccessConditionType;
  updatedAt: Scalars['DateTime']['output'];
  whitelistSettings?: Maybe<AccessConditionWhitelistSettings>;
};

export type AccessConditionAssetOwnerSettings = {
  __typename?: 'AccessConditionAssetOwnerSettings';
  assetFingerprint: Scalars['String']['output'];
  minAmount: Scalars['Int']['output'];
  policyId: Scalars['String']['output'];
};

export type AccessConditionPoolDelegationSettings = {
  __typename?: 'AccessConditionPoolDelegationSettings';
  minDelegation: Scalars['Int']['output'];
  minEpochs: Scalars['Int']['output'];
  poolId: Scalars['String']['output'];
};

export enum AccessConditionType {
  AssetOwner = 'ASSET_OWNER',
  PoolDelegation = 'POOL_DELEGATION',
  Whitelist = 'WHITELIST'
}

export type AccessConditionWhitelistSettings = {
  __typename?: 'AccessConditionWhitelistSettings';
  allow: Array<Scalars['String']['output']>;
};

export type BrandingSettings = {
  __typename?: 'BrandingSettings';
  backgroundColor?: Maybe<Scalars['String']['output']>;
  discord?: Maybe<Scalars['String']['output']>;
  failureCallToActionButtonText?: Maybe<Scalars['String']['output']>;
  failureCallToActionText?: Maybe<Scalars['String']['output']>;
  failureCallToActionURL?: Maybe<Scalars['String']['output']>;
  fontColor?: Maybe<Scalars['String']['output']>;
  logoFileContent?: Maybe<Scalars['String']['output']>;
  logoFileMime?: Maybe<Scalars['String']['output']>;
  logoFileName?: Maybe<Scalars['String']['output']>;
  primaryColor?: Maybe<Scalars['String']['output']>;
  secondaryColor?: Maybe<Scalars['String']['output']>;
  secondaryFailureCallToActionButtonText?: Maybe<Scalars['String']['output']>;
  secondaryFailureCallToActionURL?: Maybe<Scalars['String']['output']>;
  secondarySuccessCallToActionButtonText?: Maybe<Scalars['String']['output']>;
  secondarySuccessCallToActionURL?: Maybe<Scalars['String']['output']>;
  successCallToActionButtonText?: Maybe<Scalars['String']['output']>;
  successCallToActionText?: Maybe<Scalars['String']['output']>;
  successCallToActionURL?: Maybe<Scalars['String']['output']>;
  telegram?: Maybe<Scalars['String']['output']>;
  websiteURL?: Maybe<Scalars['String']['output']>;
  x?: Maybe<Scalars['String']['output']>;
  youtube?: Maybe<Scalars['String']['output']>;
};

export type DecryptedFile = {
  __typename?: 'DecryptedFile';
  content: Scalars['String']['output'];
  id: Scalars['String']['output'];
  mime: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

/** The File object represents a stored data object with a unique name and encrypted content. The content can be decrypted and downloaded. */
export type File = {
  __typename?: 'File';
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  creatorId: Scalars['String']['output'];
  download: DecryptedFile;
  id: Scalars['ID']['output'];
  /** Mime type of the file */
  mime: Scalars['String']['output'];
  /** Name of the file including extension if any */
  name: Scalars['String']['output'];
  space: Space;
  spaceId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Form = {
  __typename?: 'Form';
  /** AccessConditions used for authenticate users to the form */
  accessConditions: Array<AccessCondition>;
  branding?: Maybe<BrandingSettings>;
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  creatorId: Scalars['String']['output'];
  /** Description of the form */
  description: Scalars['String']['output'];
  fields: Array<FormField>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  /** Name of the form */
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FormEntry = {
  __typename?: 'FormEntry';
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  creatorId: Scalars['String']['output'];
  form?: Maybe<Form>;
  formId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  values: Scalars['JSONObject']['output'];
};

export type FormField = {
  __typename?: 'FormField';
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  options: Scalars['JSONObject']['output'];
  type: FormFieldTypes;
};

export enum FormFieldTypes {
  Select = 'SELECT',
  Text = 'TEXT'
}

export type Interaction = {
  __typename?: 'Interaction';
  action: InteractionActionType;
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  creatorId: Scalars['String']['output'];
  event: Scalars['JSONObject']['output'];
  id: Scalars['ID']['output'];
  topic: Scalars['String']['output'];
};

export enum InteractionActionType {
  Create = 'CREATE',
  Delete = 'DELETE',
  Read = 'READ',
  Update = 'UPDATE'
}

export type Mutation = {
  __typename?: 'Mutation';
  assignAssetOwnerAccessCondition: AccessCondition;
  assignPoolDelegationAccessCondition: AccessCondition;
  assignWhitelistAccessCondition: AccessCondition;
  createFile: File;
  createFormEntry: FormEntry;
  createSession: Session;
  createSpace: Space;
  createUser: User;
  deleteFile: File;
  deleteSpace: Space;
  deleteSpaceAccessCondition: AccessCondition;
  registerInteraction: Interaction;
  updateFile: File;
  updateSpace: Space;
  updateSpaceBranding: Space;
};


export type MutationAssignAssetOwnerAccessConditionArgs = {
  assetFingerprint: Scalars['String']['input'];
  minAmount: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  policyId: Scalars['String']['input'];
  spaceId: Scalars['String']['input'];
};


export type MutationAssignPoolDelegationAccessConditionArgs = {
  minDelegation: Scalars['Int']['input'];
  minEpochs: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  poolId: Scalars['String']['input'];
  spaceId: Scalars['String']['input'];
};


export type MutationAssignWhitelistAccessConditionArgs = {
  allow: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  spaceId: Scalars['String']['input'];
};


export type MutationCreateFileArgs = {
  content: Scalars['String']['input'];
  mime: Scalars['String']['input'];
  name: Scalars['String']['input'];
  spaceId: Scalars['String']['input'];
};


export type MutationCreateFormEntryArgs = {
  formId: Scalars['String']['input'];
  values: Scalars['JSONObject']['input'];
};


export type MutationCreateSessionArgs = {
  address: Scalars['String']['input'];
  key: Scalars['String']['input'];
  signature: Scalars['String']['input'];
};


export type MutationCreateSpaceArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateUserArgs = {
  address: Scalars['String']['input'];
};


export type MutationDeleteFileArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSpaceArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSpaceAccessConditionArgs = {
  id: Scalars['String']['input'];
};


export type MutationRegisterInteractionArgs = {
  action: InteractionActionType;
  event: Scalars['JSONObject']['input'];
  topic: Scalars['String']['input'];
};


export type MutationUpdateFileArgs = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateSpaceArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateSpaceBrandingArgs = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  discord?: InputMaybe<Scalars['String']['input']>;
  failureCallToActionButtonText?: InputMaybe<Scalars['String']['input']>;
  failureCallToActionText?: InputMaybe<Scalars['String']['input']>;
  failureCallToActionURL?: InputMaybe<Scalars['String']['input']>;
  fontColor?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  logoFileContent?: InputMaybe<Scalars['String']['input']>;
  logoFileMime?: InputMaybe<Scalars['String']['input']>;
  logoFileName?: InputMaybe<Scalars['String']['input']>;
  primaryColor?: InputMaybe<Scalars['String']['input']>;
  secondaryColor?: InputMaybe<Scalars['String']['input']>;
  secondaryFailureCallToActionButtonText?: InputMaybe<Scalars['String']['input']>;
  secondaryFailureCallToActionURL?: InputMaybe<Scalars['String']['input']>;
  secondarySuccessCallToActionButtonText?: InputMaybe<Scalars['String']['input']>;
  secondarySuccessCallToActionURL?: InputMaybe<Scalars['String']['input']>;
  successCallToActionButtonText?: InputMaybe<Scalars['String']['input']>;
  successCallToActionText?: InputMaybe<Scalars['String']['input']>;
  successCallToActionURL?: InputMaybe<Scalars['String']['input']>;
  telegram?: InputMaybe<Scalars['String']['input']>;
  websiteURL?: InputMaybe<Scalars['String']['input']>;
  x?: InputMaybe<Scalars['String']['input']>;
  youtube?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  checkFormEntryConditions: Scalars['Boolean']['output'];
  downloadFile: DecryptedFile;
  fileById?: Maybe<File>;
  files: Array<File>;
  filesInSpace: Array<File>;
  formById?: Maybe<Form>;
  formEntriesByFormId?: Maybe<Array<FormEntry>>;
  me: User;
  signatureChallenge: SignatureChallengeResponse;
  spaceAccessConditionById?: Maybe<AccessCondition>;
  spaceById?: Maybe<Space>;
  spaceSlugAvailable: Scalars['Boolean']['output'];
  spaces: Array<Space>;
};


export type QueryCheckFormEntryConditionsArgs = {
  formId: Scalars['String']['input'];
};


export type QueryDownloadFileArgs = {
  id: Scalars['String']['input'];
};


export type QueryFileByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFilesInSpaceArgs = {
  spaceId: Scalars['String']['input'];
};


export type QueryFormByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFormEntriesByFormIdArgs = {
  id: Scalars['String']['input'];
};


export type QuerySignatureChallengeArgs = {
  address: Scalars['String']['input'];
};


export type QuerySpaceAccessConditionByIdArgs = {
  id: Scalars['String']['input'];
};


export type QuerySpaceByIdArgs = {
  id: Scalars['String']['input'];
};


export type QuerySpaceSlugAvailableArgs = {
  ignoreSpaceId?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
};

export type Session = {
  __typename?: 'Session';
  id: Scalars['ID']['output'];
  /** Date when the token expires */
  lifetime: Scalars['DateTime']['output'];
  /** Token identifying this session */
  token: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type SignatureChallengeResponse = {
  __typename?: 'SignatureChallengeResponse';
  message: Scalars['String']['output'];
};

export type Space = {
  __typename?: 'Space';
  /** AccessConditions used for authenticate users to the space */
  accessConditions: Array<AccessCondition>;
  branding?: Maybe<BrandingSettings>;
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  creatorId: Scalars['String']['output'];
  /** Description of the space */
  description: Scalars['String']['output'];
  /** Files linked the space */
  files: Array<File>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  /** Name of the space */
  name: Scalars['String']['output'];
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type User = {
  __typename?: 'User';
  cardanoAddress: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  spaces: Array<Space>;
};

export type SignatureChallengeForAddressQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type SignatureChallengeForAddressQuery = { __typename?: 'Query', signatureChallenge: { __typename?: 'SignatureChallengeResponse', message: string } };

export type CreateSessionMutationVariables = Exact<{
  address: Scalars['String']['input'];
  key: Scalars['String']['input'];
  signature: Scalars['String']['input'];
}>;


export type CreateSessionMutation = { __typename?: 'Mutation', createSession: { __typename?: 'Session', lifetime: any, token: string, user: { __typename?: 'User', id: string, cardanoAddress: string } } };

export type FilesInSpaceQueryVariables = Exact<{
  spaceId: Scalars['String']['input'];
}>;


export type FilesInSpaceQuery = { __typename?: 'Query', filesInSpace: Array<{ __typename?: 'File', id: string, name: string, mime: string }> };

export type DownloadFileQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DownloadFileQuery = { __typename?: 'Query', downloadFile: { __typename?: 'DecryptedFile', id: string, name: string, mime: string, content: string } };

export type DownloadFilesFromSpaceQueryVariables = Exact<{
  spaceId: Scalars['String']['input'];
}>;


export type DownloadFilesFromSpaceQuery = { __typename?: 'Query', filesInSpace: Array<{ __typename?: 'File', download: { __typename?: 'DecryptedFile', id: string, name: string, mime: string, content: string } }> };

export type CreateFileMutationVariables = Exact<{
  spaceId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  mime: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type CreateFileMutation = { __typename?: 'Mutation', createFile: { __typename?: 'File', id: string } };

export type FormOverviewQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type FormOverviewQuery = { __typename?: 'Query', formById?: { __typename?: 'Form', id: string, name: string, description: string, isActive: boolean, branding?: { __typename?: 'BrandingSettings', backgroundColor?: string | null, fontColor?: string | null, primaryColor?: string | null, secondaryColor?: string | null, logoFileContent?: string | null, logoFileMime?: string | null, logoFileName?: string | null, failureCallToActionButtonText?: string | null, failureCallToActionText?: string | null, failureCallToActionURL?: string | null, successCallToActionButtonText?: string | null, successCallToActionText?: string | null, successCallToActionURL?: string | null, secondaryFailureCallToActionButtonText?: string | null, secondaryFailureCallToActionURL?: string | null, secondarySuccessCallToActionButtonText?: string | null, secondarySuccessCallToActionURL?: string | null, x?: string | null, discord?: string | null, telegram?: string | null, youtube?: string | null, websiteURL?: string | null } | null } | null };

export type CreateFormEntryMutationVariables = Exact<{
  formId: Scalars['String']['input'];
  values: Scalars['JSONObject']['input'];
}>;


export type CreateFormEntryMutation = { __typename?: 'Mutation', createFormEntry: { __typename?: 'FormEntry', id: string } };

export type CheckFormEntryConditionsQueryVariables = Exact<{
  formId: Scalars['String']['input'];
}>;


export type CheckFormEntryConditionsQuery = { __typename?: 'Query', checkFormEntryConditions: boolean };

export type RegisterInteractionMutationVariables = Exact<{
  action: InteractionActionType;
  topic: Scalars['String']['input'];
  event: Scalars['JSONObject']['input'];
}>;


export type RegisterInteractionMutation = { __typename?: 'Mutation', registerInteraction: { __typename?: 'Interaction', id: string } };

export type SpaceOverviewQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SpaceOverviewQuery = { __typename?: 'Query', spaceById?: { __typename?: 'Space', name: string, description: string, isActive: boolean, branding?: { __typename?: 'BrandingSettings', backgroundColor?: string | null, fontColor?: string | null, primaryColor?: string | null, secondaryColor?: string | null, logoFileContent?: string | null, logoFileMime?: string | null, logoFileName?: string | null, failureCallToActionButtonText?: string | null, failureCallToActionText?: string | null, failureCallToActionURL?: string | null, successCallToActionButtonText?: string | null, successCallToActionText?: string | null, successCallToActionURL?: string | null, secondaryFailureCallToActionButtonText?: string | null, secondaryFailureCallToActionURL?: string | null, secondarySuccessCallToActionButtonText?: string | null, secondarySuccessCallToActionURL?: string | null, x?: string | null, discord?: string | null, telegram?: string | null, youtube?: string | null, websiteURL?: string | null } | null } | null };

export type SpaceListQueryVariables = Exact<{ [key: string]: never; }>;


export type SpaceListQuery = { __typename?: 'Query', spaces: Array<{ __typename?: 'Space', id: string, name: string, isActive: boolean, createdAt: any, slug?: string | null, accessConditions: Array<{ __typename?: 'AccessCondition', id: string, type: AccessConditionType }> }> };

export type CreateSpaceMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateSpaceMutation = { __typename?: 'Mutation', createSpace: { __typename?: 'Space', id: string } };

export type UpdateSpaceBrandingMutationVariables = Exact<{
  id: Scalars['String']['input'];
  logoFileContent?: InputMaybe<Scalars['String']['input']>;
  logoFileName?: InputMaybe<Scalars['String']['input']>;
  logoFileMime?: InputMaybe<Scalars['String']['input']>;
  websiteURL?: InputMaybe<Scalars['String']['input']>;
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  fontColor?: InputMaybe<Scalars['String']['input']>;
  primaryColor?: InputMaybe<Scalars['String']['input']>;
  secondaryColor?: InputMaybe<Scalars['String']['input']>;
  x?: InputMaybe<Scalars['String']['input']>;
  discord?: InputMaybe<Scalars['String']['input']>;
  telegram?: InputMaybe<Scalars['String']['input']>;
  youtube?: InputMaybe<Scalars['String']['input']>;
  failureCallToActionButtonText?: InputMaybe<Scalars['String']['input']>;
  failureCallToActionText?: InputMaybe<Scalars['String']['input']>;
  failureCallToActionURL?: InputMaybe<Scalars['String']['input']>;
  successCallToActionButtonText?: InputMaybe<Scalars['String']['input']>;
  successCallToActionText?: InputMaybe<Scalars['String']['input']>;
  successCallToActionURL?: InputMaybe<Scalars['String']['input']>;
  secondaryFailureCallToActionButtonText?: InputMaybe<Scalars['String']['input']>;
  secondaryFailureCallToActionURL?: InputMaybe<Scalars['String']['input']>;
  secondarySuccessCallToActionButtonText?: InputMaybe<Scalars['String']['input']>;
  secondarySuccessCallToActionURL?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateSpaceBrandingMutation = { __typename?: 'Mutation', updateSpaceBranding: { __typename?: 'Space', id: string } };

export type AssignWhitelistAccessConditionMutationVariables = Exact<{
  spaceId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  allow: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type AssignWhitelistAccessConditionMutation = { __typename?: 'Mutation', assignWhitelistAccessCondition: { __typename?: 'AccessCondition', id: string } };

export type AssignAssetOwnerAccessConditionMutationVariables = Exact<{
  spaceId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  policyId: Scalars['String']['input'];
  minAmount: Scalars['Int']['input'];
  assetFingerprint: Scalars['String']['input'];
}>;


export type AssignAssetOwnerAccessConditionMutation = { __typename?: 'Mutation', assignAssetOwnerAccessCondition: { __typename?: 'AccessCondition', id: string } };

export type AssignPoolDelegationAccessConditionMutationVariables = Exact<{
  spaceId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  poolId: Scalars['String']['input'];
  minEpochs: Scalars['Int']['input'];
  minDelegation: Scalars['Int']['input'];
}>;


export type AssignPoolDelegationAccessConditionMutation = { __typename?: 'Mutation', assignPoolDelegationAccessCondition: { __typename?: 'AccessCondition', id: string } };


export const SignatureChallengeForAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SignatureChallengeForAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signatureChallenge"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SignatureChallengeForAddressQuery, SignatureChallengeForAddressQueryVariables>;
export const CreateSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signature"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}},{"kind":"Argument","name":{"kind":"Name","value":"signature"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signature"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lifetime"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"cardanoAddress"}}]}}]}}]}}]} as unknown as DocumentNode<CreateSessionMutation, CreateSessionMutationVariables>;
export const FilesInSpaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FilesInSpace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filesInSpace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spaceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}}]}}]}}]} as unknown as DocumentNode<FilesInSpaceQuery, FilesInSpaceQueryVariables>;
export const DownloadFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DownloadFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"downloadFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<DownloadFileQuery, DownloadFileQueryVariables>;
export const DownloadFilesFromSpaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DownloadFilesFromSpace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filesInSpace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spaceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"download"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mime"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}}]} as unknown as DocumentNode<DownloadFilesFromSpaceQuery, DownloadFilesFromSpaceQueryVariables>;
export const CreateFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spaceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"mime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mime"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateFileMutation, CreateFileMutationVariables>;
export const FormOverviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FormOverview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"branding"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backgroundColor"}},{"kind":"Field","name":{"kind":"Name","value":"fontColor"}},{"kind":"Field","name":{"kind":"Name","value":"primaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"logoFileContent"}},{"kind":"Field","name":{"kind":"Name","value":"logoFileMime"}},{"kind":"Field","name":{"kind":"Name","value":"logoFileName"}},{"kind":"Field","name":{"kind":"Name","value":"failureCallToActionButtonText"}},{"kind":"Field","name":{"kind":"Name","value":"failureCallToActionText"}},{"kind":"Field","name":{"kind":"Name","value":"failureCallToActionURL"}},{"kind":"Field","name":{"kind":"Name","value":"successCallToActionButtonText"}},{"kind":"Field","name":{"kind":"Name","value":"successCallToActionText"}},{"kind":"Field","name":{"kind":"Name","value":"successCallToActionURL"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryFailureCallToActionButtonText"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryFailureCallToActionURL"}},{"kind":"Field","name":{"kind":"Name","value":"secondarySuccessCallToActionButtonText"}},{"kind":"Field","name":{"kind":"Name","value":"secondarySuccessCallToActionURL"}},{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"discord"}},{"kind":"Field","name":{"kind":"Name","value":"telegram"}},{"kind":"Field","name":{"kind":"Name","value":"youtube"}},{"kind":"Field","name":{"kind":"Name","value":"websiteURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<FormOverviewQuery, FormOverviewQueryVariables>;
export const CreateFormEntryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFormEntry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"formId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"values"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFormEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"formId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"formId"}}},{"kind":"Argument","name":{"kind":"Name","value":"values"},"value":{"kind":"Variable","name":{"kind":"Name","value":"values"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateFormEntryMutation, CreateFormEntryMutationVariables>;
export const CheckFormEntryConditionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckFormEntryConditions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"formId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkFormEntryConditions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"formId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"formId"}}}]}]}}]} as unknown as DocumentNode<CheckFormEntryConditionsQuery, CheckFormEntryConditionsQueryVariables>;
export const RegisterInteractionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterInteraction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"action"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InteractionActionType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topic"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerInteraction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"action"},"value":{"kind":"Variable","name":{"kind":"Name","value":"action"}}},{"kind":"Argument","name":{"kind":"Name","value":"topic"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topic"}}},{"kind":"Argument","name":{"kind":"Name","value":"event"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RegisterInteractionMutation, RegisterInteractionMutationVariables>;
export const SpaceOverviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SpaceOverview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spaceById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"branding"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backgroundColor"}},{"kind":"Field","name":{"kind":"Name","value":"fontColor"}},{"kind":"Field","name":{"kind":"Name","value":"primaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"logoFileContent"}},{"kind":"Field","name":{"kind":"Name","value":"logoFileMime"}},{"kind":"Field","name":{"kind":"Name","value":"logoFileName"}},{"kind":"Field","name":{"kind":"Name","value":"failureCallToActionButtonText"}},{"kind":"Field","name":{"kind":"Name","value":"failureCallToActionText"}},{"kind":"Field","name":{"kind":"Name","value":"failureCallToActionURL"}},{"kind":"Field","name":{"kind":"Name","value":"successCallToActionButtonText"}},{"kind":"Field","name":{"kind":"Name","value":"successCallToActionText"}},{"kind":"Field","name":{"kind":"Name","value":"successCallToActionURL"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryFailureCallToActionButtonText"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryFailureCallToActionURL"}},{"kind":"Field","name":{"kind":"Name","value":"secondarySuccessCallToActionButtonText"}},{"kind":"Field","name":{"kind":"Name","value":"secondarySuccessCallToActionURL"}},{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"discord"}},{"kind":"Field","name":{"kind":"Name","value":"telegram"}},{"kind":"Field","name":{"kind":"Name","value":"youtube"}},{"kind":"Field","name":{"kind":"Name","value":"websiteURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<SpaceOverviewQuery, SpaceOverviewQueryVariables>;
export const SpaceListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SpaceList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"accessConditions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<SpaceListQuery, SpaceListQueryVariables>;
export const CreateSpaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSpace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSpace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateSpaceMutation, CreateSpaceMutationVariables>;
export const UpdateSpaceBrandingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSpaceBranding"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"logoFileContent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"logoFileName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"logoFileMime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"websiteURL"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"backgroundColor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fontColor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"primaryColor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"secondaryColor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"x"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"discord"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"telegram"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"youtube"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"failureCallToActionButtonText"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"failureCallToActionText"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"failureCallToActionURL"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"successCallToActionButtonText"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"successCallToActionText"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"successCallToActionURL"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"secondaryFailureCallToActionButtonText"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"secondaryFailureCallToActionURL"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"secondarySuccessCallToActionButtonText"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"secondarySuccessCallToActionURL"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSpaceBranding"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"logoFileContent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"logoFileContent"}}},{"kind":"Argument","name":{"kind":"Name","value":"logoFileName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"logoFileName"}}},{"kind":"Argument","name":{"kind":"Name","value":"logoFileMime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"logoFileMime"}}},{"kind":"Argument","name":{"kind":"Name","value":"websiteURL"},"value":{"kind":"Variable","name":{"kind":"Name","value":"websiteURL"}}},{"kind":"Argument","name":{"kind":"Name","value":"backgroundColor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"backgroundColor"}}},{"kind":"Argument","name":{"kind":"Name","value":"fontColor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fontColor"}}},{"kind":"Argument","name":{"kind":"Name","value":"primaryColor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"primaryColor"}}},{"kind":"Argument","name":{"kind":"Name","value":"secondaryColor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"secondaryColor"}}},{"kind":"Argument","name":{"kind":"Name","value":"x"},"value":{"kind":"Variable","name":{"kind":"Name","value":"x"}}},{"kind":"Argument","name":{"kind":"Name","value":"discord"},"value":{"kind":"Variable","name":{"kind":"Name","value":"discord"}}},{"kind":"Argument","name":{"kind":"Name","value":"telegram"},"value":{"kind":"Variable","name":{"kind":"Name","value":"telegram"}}},{"kind":"Argument","name":{"kind":"Name","value":"youtube"},"value":{"kind":"Variable","name":{"kind":"Name","value":"youtube"}}},{"kind":"Argument","name":{"kind":"Name","value":"failureCallToActionButtonText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"failureCallToActionButtonText"}}},{"kind":"Argument","name":{"kind":"Name","value":"failureCallToActionText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"failureCallToActionText"}}},{"kind":"Argument","name":{"kind":"Name","value":"failureCallToActionURL"},"value":{"kind":"Variable","name":{"kind":"Name","value":"failureCallToActionURL"}}},{"kind":"Argument","name":{"kind":"Name","value":"successCallToActionButtonText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"successCallToActionButtonText"}}},{"kind":"Argument","name":{"kind":"Name","value":"successCallToActionText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"successCallToActionText"}}},{"kind":"Argument","name":{"kind":"Name","value":"successCallToActionURL"},"value":{"kind":"Variable","name":{"kind":"Name","value":"successCallToActionURL"}}},{"kind":"Argument","name":{"kind":"Name","value":"secondaryFailureCallToActionButtonText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"secondaryFailureCallToActionButtonText"}}},{"kind":"Argument","name":{"kind":"Name","value":"secondaryFailureCallToActionURL"},"value":{"kind":"Variable","name":{"kind":"Name","value":"secondaryFailureCallToActionURL"}}},{"kind":"Argument","name":{"kind":"Name","value":"secondarySuccessCallToActionButtonText"},"value":{"kind":"Variable","name":{"kind":"Name","value":"secondarySuccessCallToActionButtonText"}}},{"kind":"Argument","name":{"kind":"Name","value":"secondarySuccessCallToActionURL"},"value":{"kind":"Variable","name":{"kind":"Name","value":"secondarySuccessCallToActionURL"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateSpaceBrandingMutation, UpdateSpaceBrandingMutationVariables>;
export const AssignWhitelistAccessConditionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignWhitelistAccessCondition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allow"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignWhitelistAccessCondition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spaceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"allow"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allow"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AssignWhitelistAccessConditionMutation, AssignWhitelistAccessConditionMutationVariables>;
export const AssignAssetOwnerAccessConditionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignAssetOwnerAccessCondition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"policyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"minAmount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assetFingerprint"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignAssetOwnerAccessCondition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spaceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"policyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"policyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"minAmount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"minAmount"}}},{"kind":"Argument","name":{"kind":"Name","value":"assetFingerprint"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assetFingerprint"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AssignAssetOwnerAccessConditionMutation, AssignAssetOwnerAccessConditionMutationVariables>;
export const AssignPoolDelegationAccessConditionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignPoolDelegationAccessCondition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"poolId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"minEpochs"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"minDelegation"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignPoolDelegationAccessCondition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spaceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"spaceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"poolId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"poolId"}}},{"kind":"Argument","name":{"kind":"Name","value":"minEpochs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"minEpochs"}}},{"kind":"Argument","name":{"kind":"Name","value":"minDelegation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"minDelegation"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AssignPoolDelegationAccessConditionMutation, AssignPoolDelegationAccessConditionMutationVariables>;