export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AuthPayload = {
   __typename?: 'AuthPayload';
  accessToken: Scalars['String'];
  user: User;
};

export type CreateAuthorRelation = {
  connect?: Maybe<Scalars['ID']>;
};

export type CreatePageInput = {
  title: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  content?: Maybe<Scalars['String']>;
  author?: Maybe<CreateAuthorRelation>;
};

export type CreatePostInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  author?: Maybe<CreateAuthorRelation>;
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
  createPage?: Maybe<Page>;
  updatePage?: Maybe<Page>;
  deletePage?: Maybe<Page>;
  restorePage?: Maybe<Page>;
  createPost?: Maybe<Post>;
  updatePost?: Maybe<Post>;
  deletePost?: Maybe<Post>;
  restorePost?: Maybe<Post>;
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


export type MutationCreatePageArgs = {
  data: CreatePageInput;
};


export type MutationUpdatePageArgs = {
  id: Scalars['ID'];
  data: UpdatePageInput;
};


export type MutationDeletePageArgs = {
  id: Scalars['ID'];
};


export type MutationRestorePageArgs = {
  id: Scalars['ID'];
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['ID'];
  data: UpdatePostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationRestorePostArgs = {
  id: Scalars['ID'];
};

export type NewPasswordWithCodeInput = {
  email: Scalars['String'];
  token: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};

export type OrderByClause = {
  field: Scalars['String'];
  order: SortOrder;
};

export type Page = {
   __typename?: 'Page';
  id: Scalars['ID'];
  title: Scalars['String'];
  slug: Scalars['String'];
  published: Scalars['Boolean'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  author: User;
};

export type PageInfo = {
   __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
  lastPage?: Maybe<Scalars['Int']>;
};

export type PaginatorInfo = {
   __typename?: 'PaginatorInfo';
  count: Scalars['Int'];
  currentPage: Scalars['Int'];
  firstItem?: Maybe<Scalars['Int']>;
  hasMorePages: Scalars['Boolean'];
  lastItem?: Maybe<Scalars['Int']>;
  lastPage: Scalars['Int'];
  perPage: Scalars['Int'];
  total: Scalars['Int'];
};

export type Permission = {
   __typename?: 'Permission';
  id: Scalars['ID'];
  name: Scalars['String'];
  category?: Maybe<Scalars['String']>;
  roles: Array<Role>;
};

export type Post = {
   __typename?: 'Post';
  id: Scalars['ID'];
  title: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  author: User;
};

export type PostPaginator = {
   __typename?: 'PostPaginator';
  paginatorInfo: PaginatorInfo;
  data: Array<Post>;
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
  page?: Maybe<Page>;
  pages: Array<Page>;
  post?: Maybe<Post>;
  posts?: Maybe<PostPaginator>;
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


export type QueryPageArgs = {
  id: Scalars['ID'];
};


export type QueryPagesArgs = {
  trashed?: Maybe<Trashed>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  first: Scalars['Int'];
  page?: Maybe<Scalars['Int']>;
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

export type RolePaginator = {
   __typename?: 'RolePaginator';
  paginatorInfo: PaginatorInfo;
  data: Array<Role>;
};

export type RolesOrderByOrderByClause = {
  field: RoleColumn;
  order: SortOrder;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum Trashed {
  Only = 'ONLY',
  With = 'WITH',
  Without = 'WITHOUT'
}

export type UpdateOrCreateRoleInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
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
  title: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  content?: Maybe<Scalars['String']>;
};

export type UpdatePostInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
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

export type UserPaginator = {
   __typename?: 'UserPaginator';
  paginatorInfo: PaginatorInfo;
  data: Array<User>;
};

export type UsersOrderByOrderByClause = {
  field: UserColumn;
  order: SortOrder;
};

export type AddRoleMembersMutationVariables = {
  id: Scalars['ID'];
  members: Array<Scalars['ID']>;
};


export type AddRoleMembersMutation = (
  { __typename?: 'Mutation' }
  & { addRoleMembers?: Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'id'>
  )> }
);

export type CreateRoleMutationVariables = {
  data: UpdateOrCreateRoleInput;
};


export type CreateRoleMutation = (
  { __typename?: 'Mutation' }
  & { createRole?: Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'id' | 'name' | 'description'>
  )> }
);

export type CreateUserMutationVariables = {
  data: UpdateOrCreateUserInput;
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'initials' | 'email' | 'street' | 'postcode' | 'city' | 'country'>
  )> }
);

export type DeleteRoleMutationVariables = {
  id: Scalars['ID'];
};


export type DeleteRoleMutation = (
  { __typename?: 'Mutation' }
  & { deleteRole?: Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'id'>
  )> }
);

export type DeleteUserMutationVariables = {
  id: Scalars['ID'];
};


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type LoginMutationVariables = {
  data: LoginInput;
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'accessToken'>
  )> }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout?: Maybe<(
    { __typename?: 'LogoutResponse' }
    & Pick<LogoutResponse, 'status'>
  )> }
);

export type RemoveRoleMembersMutationVariables = {
  id: Scalars['ID'];
  members: Array<Scalars['ID']>;
};


export type RemoveRoleMembersMutation = (
  { __typename?: 'Mutation' }
  & { removeRoleMembers?: Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'id'>
  )> }
);

export type SyncRolePermissionsMutationVariables = {
  id: Scalars['ID'];
  permissions: Array<Scalars['ID']>;
};


export type SyncRolePermissionsMutation = (
  { __typename?: 'Mutation' }
  & { syncRolePermissions?: Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'id'>
  )> }
);

export type UpdateMeMutationVariables = {
  data: UpdateOrCreateUserInput;
};


export type UpdateMeMutation = (
  { __typename?: 'Mutation' }
  & { updateMe?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'initials' | 'email' | 'street' | 'postcode' | 'city' | 'country'>
  )> }
);

export type UpdateMyPasswordMutationVariables = {
  data: UpdateUserPasswordInput;
};


export type UpdateMyPasswordMutation = (
  { __typename?: 'Mutation' }
  & { updateMyPassword?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type UpdatePageMutationVariables = {
  id: Scalars['ID'];
  data: UpdatePageInput;
};


export type UpdatePageMutation = (
  { __typename?: 'Mutation' }
  & { updatePage?: Maybe<(
    { __typename?: 'Page' }
    & Pick<Page, 'id' | 'title' | 'slug' | 'published' | 'content' | 'createdAt' | 'updatedAt'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'fullName'>
    ) }
  )> }
);

export type UpdateRoleMutationVariables = {
  id: Scalars['ID'];
  data: UpdateOrCreateRoleInput;
};


export type UpdateRoleMutation = (
  { __typename?: 'Mutation' }
  & { updateRole?: Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'id' | 'name' | 'description'>
  )> }
);

export type UpdateUserMutationVariables = {
  id: Scalars['ID'];
  data: UpdateOrCreateUserInput;
};


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'initials' | 'email' | 'street' | 'postcode' | 'city' | 'country'>
  )> }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'initials' | 'email' | 'street' | 'postcode' | 'city' | 'country'>
  )> }
);

export type PageQueryVariables = {
  id: Scalars['ID'];
};


export type PageQuery = (
  { __typename?: 'Query' }
  & { page?: Maybe<(
    { __typename?: 'Page' }
    & Pick<Page, 'id' | 'title' | 'slug' | 'published' | 'content' | 'createdAt' | 'updatedAt'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'fullName'>
    ) }
  )> }
);

export type PagesQueryVariables = {};


export type PagesQuery = (
  { __typename?: 'Query' }
  & { pages: Array<(
    { __typename?: 'Page' }
    & Pick<Page, 'id' | 'title' | 'createdAt' | 'updatedAt'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'fullName'>
    ) }
  )> }
);

export type PermissionsQueryVariables = {};


export type PermissionsQuery = (
  { __typename?: 'Query' }
  & { permissions: Array<(
    { __typename?: 'Permission' }
    & Pick<Permission, 'id' | 'name' | 'category'>
  )> }
);

export type RoleQueryVariables = {
  id: Scalars['ID'];
};


export type RoleQuery = (
  { __typename?: 'Query' }
  & { role?: Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'id' | 'name' | 'description' | 'createdAt' | 'updatedAt'>
    & { members: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'fullName' | 'email'>
    )>, permissions: Array<(
      { __typename?: 'Permission' }
      & Pick<Permission, 'id'>
    )> }
  )> }
);

export type RolesQueryVariables = {
  first: Scalars['Int'];
  page?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Array<RolesOrderByOrderByClause>>;
};


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

export type UserQueryVariables = {
  id: Scalars['ID'];
};


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

export type UsersQueryVariables = {
  first: Scalars['Int'];
  page?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Array<UsersOrderByOrderByClause>>;
};


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
