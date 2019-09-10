import { Middleware } from '@nuxt/types'

const guestMiddleware: Middleware = ({ app, redirect }) => {
  const hasToken = !!app.$apolloHelpers.getToken()
  // If the user is authenticated
  if (hasToken) {
    return redirect('/')
  }
}

export default guestMiddleware
