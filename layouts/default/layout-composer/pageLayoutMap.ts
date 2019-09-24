import Vue from 'vue'

export interface PageLayout {
  readonly name: String,
  readonly title: String | null,
  readonly regex: [RegExp],
  readonly showNavigationDrawer: Boolean,
  readonly navigationDrawerComponent?: () => Promise<Vue>
}

const pageLayoutMap : [PageLayout] = [
  {
    name: 'account',
    title: 'pageLayouts.account.title',
    regex: [/^account(.*)/],
    showNavigationDrawer: false
  }
]

export const defaultPageLayout : PageLayout = {
  name: 'default',
  title: null,
  regex: [/.*/],
  showNavigationDrawer: false,
  navigationDrawerComponent: () => import('~/layouts/default/navigation-drawer/drawers/temp.vue')
}
export default pageLayoutMap