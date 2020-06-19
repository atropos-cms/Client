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

export const dashboard : Application = {
  name: 'dashboard',
  title: 'applications.dashboard.title',
  description: 'applications.dashboard.description',
  icon: 'dashboard',
  url: '/'
}

//
// Application Maps
//
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
  },
  {
    name: 'settings',
    title: 'applications.settings.title',
    description: 'applications.settings.description',
    icon: 'settings',
    url: '/settings'
  }
]

export const websiteApps : Application[] = [
  {
    name: 'content',
    title: 'applications.website.content.title',
    description: 'applications.website.content.description',
    icon: 'widgets',
    url: '/website/content'
  },
  {
    name: 'design',
    title: 'applications.website.design.title',
    description: 'applications.website.design.description',
    icon: 'style',
    url: '/website/design'
  },
  {
    name: 'websiteSettings',
    title: 'applications.website.settings.title',
    description: 'applications.website.settings.description',
    icon: 'settings_applications',
    url: '/website/settings'
  }
]

export const collaborationApps : Application[] = [
  {
    name: 'files',
    title: 'applications.collaboration.files.title',
    description: 'applications.collaboration.files.description',
    icon: 'dns',
    url: '/collaboration/files'
  },
  {
    name: 'messages',
    title: 'applications.collaboration.messages.title',
    description: 'applications.collaboration.messages.description',
    icon: 'email',
    url: '/collaboration/messages'
  }
]

//
// Categories Map
//
const categoriesMap : Category[] = [
  {
    name: 'collaboration',
    title: 'categories.collaboration.title',
    applications: collaborationApps
  },
  {
    name: 'website',
    title: 'categories.website.title',
    applications: websiteApps
  },
  {
    name: 'admin',
    title: 'categories.admin.title',
    applications: adminApps
  }
]

export const applicationsMap : Application[] = [
  ...collaborationApps,
  ...websiteApps,
  ...adminApps
]

export default categoriesMap
