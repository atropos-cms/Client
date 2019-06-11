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

export default function ({ app, redirect }) {
  const hasToken = !!app.$apolloHelpers.getToken()
  // // If the user is authenticated
  if (hasToken)  return redirect('/')
}
