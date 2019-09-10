export const state = () => ({
  drawer: true,
  miniDrawer: false
})

export const getters = {
  drawer: state => state.drawer,
  miniDrawer: state => state.miniDrawer
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
  }
}
