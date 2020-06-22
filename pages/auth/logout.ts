import Vue from 'vue'

export default Vue.extend({
  layout: 'guest',

  render (createElement) {
    this.$apolloHelpers.onLogout()
    window.location.replace('/auth/login')

    return createElement('div', 'Redirecting to login page...')
  }
})
