export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A datetime string with iso8601 format, e.g. `2019-02-01T03:45:27+00:00` */
  DateTime: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  accessToken: Scalars['String'];
  user: User;
};

export type Content = Page;

export enum ContentType {
  /** Page */
  Page = 'Page'
}

export type CreateAuthorRelation = {
  connect?: Maybe<Scalars['ID']>;
};

export type CreateFolderInput = {
  name: Scalars['String'];
};

export type CreateNavigationentryInput = {
  title: Scalars['String'];
  type: ContentType;
  slug?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  published?: Maybe<Scalars['Boolean']>;
  author?: Maybe<CreateAuthorRelation>;
};


export type Folder = {
  __typename?: 'Folder';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  status: Scalars['String'];
  message?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  status?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<AuthPayload>;
  logout?: Maybe<LogoutResponse>;
  updateMe?: Maybe<User>;
  updateMyPassword?: Maybe<User>;
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
  restoreUser?: Maybe<User>;
  createRole?: Maybe<Role>;
  updateRole?: Maybe<Role>;
  deleteRole?: Maybe<Role>;
  syncRolePermissions?: Maybe<Role>;
  syncRoleMembers?: Maybe<Role>;
  addRoleMembers?: Maybe<Role>;
  removeRoleMembers?: Maybe<Role>;
  syncUserPermissions?: Maybe<User>;
  syncUserRoles?: Maybe<User>;
  createNavigationentry?: Maybe<Navigationentry>;
  updateNavigationentry?: Maybe<Navigationentry>;
  deleteNavigationentry?: Maybe<Navigationentry>;
  forceDeleteNavigationentry?: Maybe<Navigationentry>;
  restoreNavigationentry?: Maybe<Navigationentry>;
  syncNavigationentryOrder?: Maybe<Array<Maybe<Navigationentry>>>;
  updatePage?: Maybe<Page>;
  createFolder?: Maybe<Folder>;
  updateFolder?: Maybe<Folder>;
  deleteFolder?: Maybe<Folder>;
  forceDeleteFolder?: Maybe<Folder>;
  restoreFolder?: Maybe<Folder>;
};


export type MutationLoginArgs = {
  data?: Maybe<LoginInput>;
};


export type MutationUpdateMeArgs = {
  data: UpdateOrCreateUserInput;
};


export type MutationUpdateMyPasswordArgs = {
  data: UpdateUserPasswordInput;
};


export type MutationCreateUserArgs = {
  data: UpdateOrCreateUserInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  data: UpdateOrCreateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationRestoreUserArgs = {
  id: Scalars['ID'];
};


export type MutationCreateRoleArgs = {
  data: UpdateOrCreateRoleInput;
};


export type MutationUpdateRoleArgs = {
  id: Scalars['ID'];
  data: UpdateOrCreateRoleInput;
};


export type MutationDeleteRoleArgs = {
  id: Scalars['ID'];
};


export type MutationSyncRolePermissionsArgs = {
  id: Scalars['ID'];
  permissions: Array<Scalars['ID']>;
};


export type MutationSyncRoleMembersArgs = {
  id: Scalars['ID'];
  members: Array<Scalars['ID']>;
};


export type MutationAddRoleMembersArgs = {
  id: Scalars['ID'];
  members: Array<Scalars['ID']>;
};


export type MutationRemoveRoleMembersArgs = {
  id: Scalars['ID'];
  members: Array<Scalars['ID']>;
};


export type MutationSyncUserPermissionsArgs = {
  id: Scalars['ID'];
  permissions: Array<Scalars['ID']>;
};


export type MutationSyncUserRolesArgs = {
  id: Scalars['ID'];
  roles: Array<Scalars['ID']>;
};


export type MutationCreateNavigationentryArgs = {
  data: CreateNavigationentryInput;
};


export type MutationUpdateNavigationentryArgs = {
  id: Scalars['ID'];
  data: UpdateNavigationentryInput;
};


export type MutationDeleteNavigationentryArgs = {
  id: Scalars['ID'];
};


export type MutationForceDeleteNavigationentryArgs = {
  id: Scalars['ID'];
};


export type MutationRestoreNavigationentryArgs = {
  id: Scalars['ID'];
};


export type MutationSyncNavigationentryOrderArgs = {
  data: Array<Scalars['ID']>;
};


export type MutationUpdatePageArgs = {
  id: Scalars['ID'];
  data: UpdatePageInput;
};


export type MutationCreateFolderArgs = {
  data: CreateFolderInput;
};


export type MutationUpdateFolderArgs = {
  id: Scalars['ID'];
  data: UpdateFolderInput;
};


export type MutationDeleteFolderArgs = {
  id: Scalars['ID'];
};


export type MutationForceDeleteFolderArgs = {
  id: Scalars['ID'];
};


export type MutationRestoreFolderArgs = {
  id: Scalars['ID'];
};

export type Navigationentry = {
  __typename?: 'Navigationentry';
  id: Scalars['ID'];
  title: Scalars['String'];
  slug: Scalars['String'];
  order: Scalars['Int'];
  published: Scalars['Boolean'];
  content: Content;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  author: User;
};

export type NewPasswordWithCodeInput = {
  email: Scalars['String'];
  token: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  field: Scalars['String'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

export type Page = {
  __typename?: 'Page';
  id: Scalars['ID'];
  body: Scalars['String'];
  navigationentry: Navigationentry;
};

/** Pagination information about the corresponding list of items. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** Total number of node in connection. */
  total?: Maybe<Scalars['Int']>;
  /** Count of nodes in current request. */
  count?: Maybe<Scalars['Int']>;
  /** Current page of request. */
  currentPage?: Maybe<Scalars['Int']>;
  /** Last page in connection. */
  lastPage?: Maybe<Scalars['Int']>;
};

/** Pagination information about the corresponding list of items. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Total count of available items in the page. */
  count: Scalars['Int'];
  /** Current pagination page. */
  currentPage: Scalars['Int'];
  /** Index of first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** If collection has more pages. */
  hasMorePages: Scalars['Boolean'];
  /** Index of last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Last page number of the collection. */
  lastPage: Scalars['Int'];
  /** Number of items per page in the collection. */
  perPage: Scalars['Int'];
  /** Total items available in the collection. */
  total: Scalars['Int'];
};

export type Permission = {
  __typename?: 'Permission';
  id: Scalars['ID'];
  name: Scalars['String'];
  category?: Maybe<Scalars['String']>;
  roles: Array<Role>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  user?: Maybe<User>;
  users?: Maybe<UserPaginator>;
  role?: Maybe<Role>;
  roles?: Maybe<RolePaginator>;
  permission?: Maybe<Permission>;
  permissions: Array<Permission>;
  navigationentry?: Maybe<Navigationentry>;
  navigationentries: Array<Navigationentry>;
  folder?: Maybe<Folder>;
  folders: Array<Folder>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  search?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Array<UsersOrderByOrderByClause>>;
  first: Scalars['Int'];
  page?: Maybe<Scalars['Int']>;
  trashed?: Maybe<Trashed>;
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
};


export type QueryRolesArgs = {
  search?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Array<RolesOrderByOrderByClause>>;
  first: Scalars['Int'];
  page?: Maybe<Scalars['Int']>;
};


export type QueryPermissionArgs = {
  id: Scalars['ID'];
};


export type QueryNavigationentryArgs = {
  id: Scalars['ID'];
};


export type QueryNavigationentriesArgs = {
  trashed?: Maybe<Trashed>;
};


export type QueryFolderArgs = {
  id: Scalars['ID'];
};


export type QueryFoldersArgs = {
  trashed?: Maybe<Trashed>;
};

export type RegisterInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  mailingList?: Maybe<RoleMailingList>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  permissions: Array<Permission>;
  members: Array<User>;
  membersCount: Scalars['Int'];
};

export enum RoleColumn {
  Name = 'name',
  Description = 'description',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

export enum RoleMailingList {
  /** Disabled */
  Disabled = 'Disabled',
  /** Members */
  Members = 'Members',
  /** Public */
  Public = 'Public'
}

/** A paginated list of Role items. */
export type RolePaginator = {
  __typename?: 'RolePaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Role items. */
  data: Array<Role>;
};

/** Order by clause for the `orderBy` argument on the query `roles`. */
export type RolesOrderByOrderByClause = {
  /** The column that is used for ordering. */
  field: RoleColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** The available directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type UpdateFolderInput = {
  name: Scalars['String'];
};

export type UpdateNavigationentryInput = {
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
};

export type UpdateOrCreateRoleInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  mailingList?: Maybe<RoleMailingList>;
};

export type UpdateOrCreateUserInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type UpdatePageInput = {
  body: Scalars['String'];
};

export type UpdateUserPasswordInput = {
  currentPassword?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  passwordConfirmation?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  initials?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  loginAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  permissions: Array<Permission>;
  directPermissions: Array<Permission>;
  inheritedPermissions: Array<Permission>;
  roles?: Maybe<Array<Role>>;
};

export enum UserColumn {
  FirstName = 'firstName',
  LastName = 'lastName',
  Initials = 'initials',
  Street = 'street',
  Postcode = 'postcode',
  City = 'city',
  Country = 'country',
  Email = 'email',
  LoginAt = 'loginAt',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  DeletedAt = 'deletedAt'
}

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator';
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of User items. */
  data: Array<User>;
};

/** Order by clause for the `orderBy` argument on the query `users`. */
export type UsersOrderByOrderByClause = {
  /** The column that is used for ordering. */
  field: UserColumn;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

export type AddRoleMembersMutationVariables = Exact<{
  id: Scalars['ID'];
  members: Array<Scalars['ID']>;
}>;


export type AddRoleMembersMutation = (
  { __typename?: 'Mutation' }
  & { addRoleMembers?: Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'id'>
  )> }
);

export type CreateNavigationentryMutationVariables = Exact<{
  data: CreateNavigationentryInput;
}>;


export type CreateNavigationentryMutation = (
  { __typename?: 'Mutation' }
  & { createNavigationentry?: Maybe<(
    { __typename?: 'Navigationentry' }
    & Pick<Navigationentry, 'id' | 'title' | 'slug' | 'published' | 'createdAt' | 'updatedAt'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'fullName'>
    ) }
  )> }
);

export type CreateRoleMutationVariables = Exact<{
  data: UpdateOrCreateRoleInput;
}>;


export type CreateRoleMutation = (
  { __typename?: 'Mutation' }
  & { createRole?: Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'id' | 'name' | 'description' | 'emailAddress' | 'mailingList'>
  )> }
);

export type CreateUserMutationVariables = Exact<{
  data: UpdateOrCreateUserInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'initials' | 'email' | 'street' | 'postcode' | 'city' | 'country'>
  )> }
);

export type DeleteNavigationentryMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteNavigationentryMutation = (
  { __typename?: 'Mutation' }
  & { deleteNavigationentry?: Maybe<(
    { __typename?: 'Navigationentry' }
    & Pick<Navigationentry, 'id'>
  )> }
);

export type DeleteRoleMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteRoleMutation = (
  { __typename?: 'Mutation' }
  & { deleteRole?: Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'id'>
  )> }
);

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'accessToken'>
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout?: Maybe<(
    { __typename?: 'LogoutResponse' }
    & Pick<LogoutResponse, 'status'>
  )> }
);

export type RemoveRoleMembersMutationVariables = Exact<{
  id: Scalars['ID'];
  members: Array<Scalars['ID']>;
}>;


export type RemoveRoleMembersMutation = (
  { __typename?: 'Mutation' }
  & { removeRoleMembers?: Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'id'>
  )> }
);

export type SyncNavigationentryOrderMutationVariables = Exact<{
  data: Array<Scalars['ID']>;
}>;


export type SyncNavigationentryOrderMutation = (
  { __typename?: 'Mutation' }
  & { syncNavigationentryOrder?: Maybe<Array<Maybe<(
    { __typename?: 'Navigationentry' }
    & Pick<Navigationentry, 'id' | 'order'>
  )>>> }
);

export type SyncRolePermissionsMutationVariables = Exact<{
  id: Scalars['ID'];
  permissions: Array<Scalars['ID']>;
}>;


export type SyncRolePermissionsMutation = (
  { __typename?: 'Mutation' }
  & { syncRolePermissions?: Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'id'>
  )> }
);

export type UpdateMeMutationVariables = Exact<{
  data: UpdateOrCreateUserInput;
}>;


export type UpdateMeMutation = (
  { __typename?: 'Mutation' }
  & { updateMe?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'initials' | 'email' | 'street' | 'postcode' | 'city' | 'country'>
  )> }
);

export type UpdateMyPasswordMutationVariables = Exact<{
  data: UpdateUserPasswordInput;
}>;


export type UpdateMyPasswordMutation = (
  { __typename?: 'Mutation' }
  & { updateMyPassword?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type UpdateNavigationentryMutationVariables = Exact<{
  id: Scalars['ID'];
  data: UpdateNavigationentryInput;
}>;


export type UpdateNavigationentryMutation = (
  { __typename?: 'Mutation' }
  & { updateNavigationentry?: Maybe<(
    { __typename?: 'Navigationentry' }
    & Pick<Navigationentry, 'id' | 'title' | 'slug' | 'published' | 'createdAt' | 'updatedAt'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'fullName'>
    ), content: (
      { __typename: 'Page' }
      & Pick<Page, 'id' | 'body'>
    ) }
  )> }
);

export type UpdatePageMutationVariables = Exact<{
  id: Scalars['ID'];
  data: UpdatePageInput;
}>;


export type UpdatePageMutation = (
  { __typename?: 'Mutation' }
  & { updatePage?: Maybe<(
    { __typename?: 'Page' }
    & Pick<Page, 'id' | 'body'>
  )> }
);

export type UpdateRoleMutationVariables = Exact<{
  id: Scalars['ID'];
  data: UpdateOrCreateRoleInput;
}>;


export type UpdateRoleMutation = (
  { __typename?: 'Mutation' }
  & { updateRole?: Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'id' | 'name' | 'description' | 'emailAddress' | 'mailingList'>
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID'];
  data: UpdateOrCreateUserInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'initials' | 'email' | 'street' | 'postcode' | 'city' | 'country'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'initials' | 'email' | 'street' | 'postcode' | 'city' | 'country'>
  )> }
);

export type NavigationentriesQueryVariables = Exact<{ [key: string]: never; }>;


export type NavigationentriesQuery = (
  { __typename?: 'Query' }
  & { navigationentries: Array<(
    { __typename?: 'Navigationentry' }
    & Pick<Navigationentry, 'id' | 'title' | 'published' | 'slug' | 'order'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'fullName'>
    ), content: (
      { __typename: 'Page' }
      & Pick<Page, 'id'>
    ) }
  )> }
);

export type NavigationentryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NavigationentryQuery = (
  { __typename?: 'Query' }
  & { navigationentry?: Maybe<(
    { __typename?: 'Navigationentry' }
    & Pick<Navigationentry, 'id' | 'title' | 'slug' | 'published' | 'createdAt' | 'updatedAt'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'fullName'>
    ), content: (
      { __typename: 'Page' }
      & Pick<Page, 'id' | 'body'>
    ) }
  )> }
);

export type PermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type PermissionsQuery = (
  { __typename?: 'Query' }
  & { permissions: Array<(
    { __typename?: 'Permission' }
    & Pick<Permission, 'id' | 'name' | 'category'>
  )> }
);

export type RoleQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RoleQuery = (
  { __typename?: 'Query' }
  & { role?: Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'id' | 'name' | 'description' | 'emailAddress' | 'mailingList' | 'createdAt' | 'updatedAt'>
    & { members: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'fullName' | 'email'>
    )>, permissions: Array<(
      { __typename?: 'Permission' }
      & Pick<Permission, 'id'>
    )> }
  )> }
);

export type RolesQueryVariables = Exact<{
  first: Scalars['Int'];
  page?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Array<RolesOrderByOrderByClause>>;
}>;


export type RolesQuery = (
  { __typename?: 'Query' }
  & { roles?: Maybe<(
    { __typename?: 'RolePaginator' }
    & { paginatorInfo: (
      { __typename?: 'PaginatorInfo' }
      & Pick<PaginatorInfo, 'count' | 'currentPage' | 'total'>
    ), data: Array<(
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'name' | 'membersCount'>
    )> }
  )> }
);

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'fullName' | 'initials' | 'email' | 'street' | 'postcode' | 'city' | 'country' | 'createdAt' | 'updatedAt' | 'loginAt'>
    & { roles?: Maybe<Array<(
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'name'>
    )>> }
  )> }
);

export type UsersQueryVariables = Exact<{
  first: Scalars['Int'];
  page?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Array<UsersOrderByOrderByClause>>;
}>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<(
    { __typename?: 'UserPaginator' }
    & { paginatorInfo: (
      { __typename?: 'PaginatorInfo' }
      & Pick<PaginatorInfo, 'count' | 'currentPage' | 'total'>
    ), data: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'fullName' | 'email'>
    )> }
  )> }
);
