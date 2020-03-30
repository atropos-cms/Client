export interface Application {
  readonly name: string,
  readonly title: string | null,
  readonly description: string | null,
  readonly icon: string,
  readonly url: string,
  readonly exact?: boolean,
}

export interface Category {
  readonly name: string,
  readonly title: string | null,
  readonly applications : Application[]
}

export const adminApps : Application[] = [
  {
    name: 'users',
    title: 'applications.users.title',
    description: 'applications.users.description',
    icon: 'person',
    url: '/users'
  },
  {
    name: 'roles',
    title: 'applications.roles.title',
    description: 'applications.roles.description',
    icon: 'group',
    url: '/roles'
  }
]

export const contentApps : Application[] = [
  {
    name: 'pages',
    title: 'applications.pages.title',
    description: 'applications.pages.description',
    icon: 'insert_drive_file',
    url: '/pages'
  }
]

const categoriesMap : Category[] = [
  {
    name: 'countent',
    title: 'categories.content.title',
    applications: contentApps
  },
  {
    name: 'admin',
    title: 'categories.admin.title',
    applications: adminApps
  }
]

export const applicationsMap : Application[] = [
  ...contentApps,
  ...adminApps
]

export default categoriesMap
