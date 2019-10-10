export interface Application {
  readonly name: string,
  readonly title: string | null,
  readonly description: string | null,
  readonly icon: string,
  readonly url: string,
  readonly exact?: boolean,
}

const applicationsMap : Application[] = [
  {
    name: 'pages',
    title: 'applications.pages.title',
    description: 'applications.pages.description',
    icon: 'insert_drive_file',
    url: '/pages'
  },
  {
    name: 'users',
    title: 'applications.users.title',
    description: 'applications.users.description',
    icon: 'person',
    url: '/users'
  },
  {
    name: 'groups',
    title: 'applications.groups.title',
    description: 'applications.groups.description',
    icon: 'group',
    url: '/groups'
  }
]

export default applicationsMap
