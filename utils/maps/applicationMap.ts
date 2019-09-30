export interface Application {
  readonly name: string,
  readonly title: string | null,
  readonly description: string | null,
  readonly icon: string,
  readonly url: string,
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