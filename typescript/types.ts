export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
};

export type AuthPayload = {
   __typename?: 'AuthPayload',
  accessToken: Scalars['String'],
  user: User,
};

export type CreateAuthorRelation = {
  connect?: Maybe<Scalars['ID']>,
};

export type CreatePageInput = {
  title?: Maybe<Scalars['String']>,
  slug?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  author?: Maybe<CreateAuthorRelation>,
};

export type CreatePostInput = {
  title?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  author?: Maybe<CreateAuthorRelation>,
};

export type ForgotPasswordInput = {
  email: Scalars['String'],
};

export type ForgotPasswordResponse = {
   __typename?: 'ForgotPasswordResponse',
  status: Scalars['String'],
  message?: Maybe<Scalars['String']>,
};

export type Group = {
   __typename?: 'Group',
  id: Scalars['ID'],
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  permissions: Array<Permission>,
  members: Array<User>,
};

export enum GroupColumn {
  Name = 'name',
  Description = 'description',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

export type GroupPaginator = {
   __typename?: 'GroupPaginator',
  paginatorInfo: PaginatorInfo,
  data: Array<Group>,
};

export type GroupsOrderByOrderByClause = {
  field: GroupColumn,
  order: SortOrder,
};

export type LoginInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type LogoutResponse = {
   __typename?: 'LogoutResponse',
  status: Scalars['String'],
  message?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  login?: Maybe<AuthPayload>,
  updateMe?: Maybe<User>,
  updateMyPassword?: Maybe<User>,
  createUser?: Maybe<User>,
  updateUser?: Maybe<User>,
  deleteUser?: Maybe<User>,
  restoreUser?: Maybe<User>,
  createGroup?: Maybe<Group>,
  updateGroup?: Maybe<Group>,
  deleteGroup?: Maybe<Group>,
  syncGroupPermissions?: Maybe<Group>,
  syncGroupMembers?: Maybe<Group>,
  addGroupMembers?: Maybe<Group>,
  removeGroupMembers?: Maybe<Group>,
  syncUserPermissions?: Maybe<User>,
  syncUserGroups?: Maybe<User>,
  createPage?: Maybe<Page>,
  updatePage?: Maybe<Page>,
  deletePage?: Maybe<Page>,
  restorePage?: Maybe<Page>,
  createPost?: Maybe<Post>,
  updatePost?: Maybe<Post>,
  deletePost?: Maybe<Post>,
  restorePost?: Maybe<Post>,
};

export type MutationLoginArgs = {
  data?: Maybe<LoginInput>
};

export type MutationUpdateMeArgs = {
  data: UpdateOrCreateUserInput
};

export type MutationUpdateMyPasswordArgs = {
  data: UpdateUserPasswordInput
};

export type MutationCreateUserArgs = {
  data: UpdateOrCreateUserInput
};

export type MutationUpdateUserArgs = {
  id: Scalars['ID'],
  data: UpdateOrCreateUserInput
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID']
};

export type MutationRestoreUserArgs = {
  id: Scalars['ID']
};

export type MutationCreateGroupArgs = {
  data: UpdateOrCreateGroupInput
};

export type MutationUpdateGroupArgs = {
  id: Scalars['ID'],
  data: UpdateOrCreateGroupInput
};

export type MutationDeleteGroupArgs = {
  id: Scalars['ID']
};

export type MutationSyncGroupPermissionsArgs = {
  id: Scalars['ID'],
  permissions: Array<Scalars['ID']>
};

export type MutationSyncGroupMembersArgs = {
  id: Scalars['ID'],
  members: Array<Scalars['ID']>
};

export type MutationAddGroupMembersArgs = {
  id: Scalars['ID'],
  members: Array<Scalars['ID']>
};

export type MutationRemoveGroupMembersArgs = {
  id: Scalars['ID'],
  members: Array<Scalars['ID']>
};

export type MutationSyncUserPermissionsArgs = {
  id: Scalars['ID'],
  permissions: Array<Scalars['ID']>
};

export type MutationSyncUserGroupsArgs = {
  id: Scalars['ID'],
  groups: Array<Scalars['ID']>
};

export type MutationCreatePageArgs = {
  data: CreatePageInput
};

export type MutationUpdatePageArgs = {
  id: Scalars['ID'],
  data: UpdatePageInput
};

export type MutationDeletePageArgs = {
  id: Scalars['ID']
};

export type MutationRestorePageArgs = {
  id: Scalars['ID']
};

export type MutationCreatePostArgs = {
  data: CreatePostInput
};

export type MutationUpdatePostArgs = {
  id: Scalars['ID'],
  data: UpdatePostInput
};

export type MutationDeletePostArgs = {
  id: Scalars['ID']
};

export type MutationRestorePostArgs = {
  id: Scalars['ID']
};

export type NewPasswordWithCodeInput = {
  email: Scalars['String'],
  token: Scalars['String'],
  password: Scalars['String'],
  passwordConfirmation: Scalars['String'],
};

export type OrderByClause = {
  field: Scalars['String'],
  order: SortOrder,
};

export type Page = {
   __typename?: 'Page',
  id: Scalars['ID'],
  title: Scalars['String'],
  slug: Scalars['String'],
  content: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  deletedAt?: Maybe<Scalars['DateTime']>,
  author: User,
};

export type PageInfo = {
   __typename?: 'PageInfo',
  hasNextPage: Scalars['Boolean'],
  hasPreviousPage: Scalars['Boolean'],
  startCursor?: Maybe<Scalars['String']>,
  endCursor?: Maybe<Scalars['String']>,
  total?: Maybe<Scalars['Int']>,
  count?: Maybe<Scalars['Int']>,
  currentPage?: Maybe<Scalars['Int']>,
  lastPage?: Maybe<Scalars['Int']>,
};

export type PaginatorInfo = {
   __typename?: 'PaginatorInfo',
  count: Scalars['Int'],
  currentPage: Scalars['Int'],
  firstItem?: Maybe<Scalars['Int']>,
  hasMorePages: Scalars['Boolean'],
  lastItem?: Maybe<Scalars['Int']>,
  lastPage: Scalars['Int'],
  perPage: Scalars['Int'],
  total: Scalars['Int'],
};

export type Permission = {
   __typename?: 'Permission',
  id: Scalars['ID'],
  name: Scalars['String'],
  groups: Array<Group>,
};

export type PermissionPaginator = {
   __typename?: 'PermissionPaginator',
  paginatorInfo: PaginatorInfo,
  data: Array<Permission>,
};

export type Post = {
   __typename?: 'Post',
  id: Scalars['ID'],
  title: Scalars['String'],
  content: Scalars['String'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  deletedAt?: Maybe<Scalars['DateTime']>,
  author: User,
};

export type PostPaginator = {
   __typename?: 'PostPaginator',
  paginatorInfo: PaginatorInfo,
  data: Array<Post>,
};

export type Query = {
   __typename?: 'Query',
  me?: Maybe<User>,
  user?: Maybe<User>,
  users?: Maybe<UserPaginator>,
  group?: Maybe<Group>,
  groups?: Maybe<GroupPaginator>,
  permission?: Maybe<Permission>,
  permissions?: Maybe<PermissionPaginator>,
  page?: Maybe<Page>,
  pages: Array<Page>,
  post?: Maybe<Post>,
  posts?: Maybe<PostPaginator>,
};

export type QueryUserArgs = {
  id: Scalars['ID']
};

export type QueryUsersArgs = {
  search?: Maybe<Scalars['String']>,
  orderBy?: Maybe<Array<UsersOrderByOrderByClause>>,
  first: Scalars['Int'],
  page?: Maybe<Scalars['Int']>,
  trashed?: Maybe<Trashed>
};

export type QueryGroupArgs = {
  id: Scalars['ID']
};

export type QueryGroupsArgs = {
  search?: Maybe<Scalars['String']>,
  orderBy?: Maybe<Array<GroupsOrderByOrderByClause>>,
  first: Scalars['Int'],
  page?: Maybe<Scalars['Int']>
};

export type QueryPermissionArgs = {
  id: Scalars['ID']
};

export type QueryPermissionsArgs = {
  first: Scalars['Int'],
  page?: Maybe<Scalars['Int']>
};

export type QueryPageArgs = {
  id: Scalars['ID']
};

export type QueryPagesArgs = {
  trashed?: Maybe<Trashed>
};

export type QueryPostArgs = {
  id: Scalars['Int']
};

export type QueryPostsArgs = {
  first: Scalars['Int'],
  page?: Maybe<Scalars['Int']>,
  trashed?: Maybe<Trashed>
};

export type RegisterInput = {
  name: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
  passwordConfirmation: Scalars['String'],
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

export type UpdateOrCreateGroupInput = {
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type UpdateOrCreateUserInput = {
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  street?: Maybe<Scalars['String']>,
  postcode?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
};

export type UpdatePageInput = {
  title?: Maybe<Scalars['String']>,
  slug?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
};

export type UpdatePostInput = {
  title?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
};

export type UpdateUserPasswordInput = {
  currentPassword?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  passwordConfirmation?: Maybe<Scalars['String']>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  fullName?: Maybe<Scalars['String']>,
  initials?: Maybe<Scalars['String']>,
  street?: Maybe<Scalars['String']>,
  postcode?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  loginAt?: Maybe<Scalars['DateTime']>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  deletedAt?: Maybe<Scalars['DateTime']>,
  permissions: Array<Permission>,
  directPermissions: Array<Permission>,
  inheritedPermissions: Array<Permission>,
  groups?: Maybe<Array<Group>>,
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
   __typename?: 'UserPaginator',
  paginatorInfo: PaginatorInfo,
  data: Array<User>,
};

export type UsersOrderByOrderByClause = {
  field: UserColumn,
  order: SortOrder,
};

export type AddGroupMembersMutationVariables = {
  id: Scalars['ID'],
  members: Array<Scalars['ID']>
};

export type AddGroupMembersMutation = (
  { __typename?: 'Mutation' }
  & { addGroupMembers: Maybe<(
    { __typename?: 'Group' }
    & Pick<Group, 'id'>
  )> }
);

export type CreateGroupMutationVariables = {
  data: UpdateOrCreateGroupInput
};

export type CreateGroupMutation = (
  { __typename?: 'Mutation' }
  & { createGroup: Maybe<(
    { __typename?: 'Group' }
    & Pick<Group, 'id' | 'name' | 'description'>
  )> }
);

export type CreateUserMutationVariables = {
  data: UpdateOrCreateUserInput
};

export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'initials' | 'email' | 'street' | 'postcode' | 'city' | 'country'>
  )> }
);

export type DeleteGroupMutationVariables = {
  id: Scalars['ID']
};

export type DeleteGroupMutation = (
  { __typename?: 'Mutation' }
  & { deleteGroup: Maybe<(
    { __typename?: 'Group' }
    & Pick<Group, 'id'>
  )> }
);

export type DeleteUserMutationVariables = {
  id: Scalars['ID']
};

export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type LoginMutationVariables = {
  data: LoginInput
};

export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: Maybe<(
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'accessToken'>
  )> }
);

export type RemoveGroupMembersMutationVariables = {
  id: Scalars['ID'],
  members: Array<Scalars['ID']>
};

export type RemoveGroupMembersMutation = (
  { __typename?: 'Mutation' }
  & { removeGroupMembers: Maybe<(
    { __typename?: 'Group' }
    & Pick<Group, 'id'>
  )> }
);

export type UpdateGroupMutationVariables = {
  id: Scalars['ID'],
  data: UpdateOrCreateGroupInput
};

export type UpdateGroupMutation = (
  { __typename?: 'Mutation' }
  & { updateGroup: Maybe<(
    { __typename?: 'Group' }
    & Pick<Group, 'id' | 'name' | 'description'>
  )> }
);

export type UpdateMeMutationVariables = {
  data: UpdateOrCreateUserInput
};

export type UpdateMeMutation = (
  { __typename?: 'Mutation' }
  & { updateMe: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'initials' | 'email' | 'street' | 'postcode' | 'city' | 'country'>
  )> }
);

export type UpdateMyPasswordMutationVariables = {
  data: UpdateUserPasswordInput
};

export type UpdateMyPasswordMutation = (
  { __typename?: 'Mutation' }
  & { updateMyPassword: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type UpdateUserMutationVariables = {
  id: Scalars['ID'],
  data: UpdateOrCreateUserInput
};

export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'initials' | 'email' | 'street' | 'postcode' | 'city' | 'country'>
  )> }
);

export type GroupQueryVariables = {
  id: Scalars['ID']
};

export type GroupQuery = (
  { __typename?: 'Query' }
  & { group: Maybe<(
    { __typename?: 'Group' }
    & Pick<Group, 'id' | 'name' | 'description' | 'createdAt' | 'updatedAt'>
    & { members: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'fullName'>
    )> }
  )> }
);

export type GroupsQueryVariables = {
  first: Scalars['Int'],
  page?: Maybe<Scalars['Int']>,
  search?: Maybe<Scalars['String']>,
  orderBy?: Maybe<Array<GroupsOrderByOrderByClause>>
};

export type GroupsQuery = (
  { __typename?: 'Query' }
  & { groups: Maybe<(
    { __typename?: 'GroupPaginator' }
    & { paginatorInfo: (
      { __typename?: 'PaginatorInfo' }
      & Pick<PaginatorInfo, 'count' | 'currentPage' | 'total'>
    ), data: Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name' | 'description'>
    )> }
  )> }
);

export type MeQueryVariables = {};

export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'initials' | 'email' | 'street' | 'postcode' | 'city' | 'country'>
  )> }
);

export type PageQueryVariables = {
  id: Scalars['ID']
};

export type PageQuery = (
  { __typename?: 'Query' }
  & { page: Maybe<(
    { __typename?: 'Page' }
    & Pick<Page, 'id' | 'title' | 'slug' | 'createdAt' | 'updatedAt'>
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

export type UserQueryVariables = {
  id: Scalars['ID']
};

export type UserQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'fullName' | 'initials' | 'email' | 'street' | 'postcode' | 'city' | 'country' | 'createdAt' | 'updatedAt' | 'loginAt'>
    & { groups: Maybe<Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )>> }
  )> }
);

export type UsersQueryVariables = {
  first: Scalars['Int'],
  page?: Maybe<Scalars['Int']>,
  search?: Maybe<Scalars['String']>,
  orderBy?: Maybe<Array<UsersOrderByOrderByClause>>
};

export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Maybe<(
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
