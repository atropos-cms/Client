import { Middleware } from '@nuxt/types'

const guestRoutes = [
  'auth-login',
  'auth-reset',
  'auth-reset-all'
]

const ignoreRedirect = [
  '/',
  '/auth',
  '/auth/logout'
]

const authenticatedMiddleware: Middleware = ({ app, redirect, route }) => {
  const hasToken = !!app.$apolloHelpers.getToken()

  // If the user is authenticated it's all good
  if (hasToken) {
    return
  }

  // If the user is on the login page
  if (route.name && guestRoutes.includes(route.name)) {
    return
  }

  // Add the current route as parameter if it is not ignored
  if (!ignoreRedirect.includes(route.path)) {
    return redirect('/auth/login', { redirect: route.path })
  }

  // Redirect back to the login page
  return redirect('/auth/login')
}

export default authenticatedMiddleware
