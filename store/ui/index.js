export const state = () => ({
  drawer: true,
  miniDrawer: false,
  dialog: null
})

export const getters = {
  drawer: state => state.drawer,
  miniDrawer: state => state.miniDrawer,
  dialog: state => state.dialog
}

export const mutations = {
  setDrawer (state, value) {
    state.drawer = value
  },
  toggleDrawer (state) {
    state.drawer = !state.drawer
  },
  toggleMiniDrawer (state) {
    state.miniDrawer = !state.miniDrawer
  },
  setMiniDrawer (state, value) {
    state.miniDrawer = value
  },
  setDialog (state, value) {
    state.dialog = value
  }
}
