import * as yup from 'yup'

export const CategoryCreateSchema = yup.object().shape({
  name: yup.string().trim().required(),
  seoTitle: yup.string().trim(),
  seoContent: yup.string().trim(),
})
