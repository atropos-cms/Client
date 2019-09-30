import Vue from 'vue'

export interface PageLayout {
  readonly name: string,
  readonly title: string | null,
  readonly regex: RegExp | RegExp[],
  readonly showNavigationDrawer: boolean,
  readonly navigationDrawerComponent?: () => Promise<Vue>
}

// the current route will be matched against this list of PageLayout
// definitions. The defined regex prop will be used to compare against the
// current url.
const pageLayoutMap : PageLayout[] = [
  {
    name: 'dashboard',
    title: 'applications.dashboard.title',
    regex: [/^$/, /^\//],
    showNavigationDrawer: true,
    navigationDrawerComponent: () => import('~/layouts/default/navigation-drawer/drawers/dashboard.vue')
  },
  {
    name: 'account',
    title: 'applications.account.title',
    regex: [/^account(.*)/],
    showNavigationDrawer: false
  }
]

// default page settings will be used when no other page matched
export const defaultPageLayout : PageLayout = {
  name: 'default',
  title: null,
  regex: [/.*/],
  showNavigationDrawer: false,
  navigationDrawerComponent: () => import('~/layouts/default/navigation-drawer/drawers/temp.vue')
}
export default pageLayoutMap