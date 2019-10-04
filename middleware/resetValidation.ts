import { Middleware } from '@nuxt/types'
import Validation from '~/utils/validation/index'

const resetValidation: Middleware = () => {
  Validation.reset()
}

export default resetValidation
