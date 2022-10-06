import * as yup from 'yup'

export const ProductImageCreateSchema = yup.object().shape({
  name: yup.string().trim().required(),
  path: yup.string().trim().required(),
})
