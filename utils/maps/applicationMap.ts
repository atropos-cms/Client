export interface Application {
  readonly name: String,
  readonly title: String | null,
  readonly description: String | null,
  readonly icon: String,
  readonly url: String,
}

const applicationsMap : Application[] = [
  {
    name: 'users',
    title: 'applications.users.title',
    description: 'applications.users.description',
    icon: 'person',
    url: '/users',
  },
  {
    name: 'groups',
    title: 'applications.groups.title',
    description: 'applications.groups.description',
    icon: 'group',
    url: '/groups',
  }
]

export default applicationsMap