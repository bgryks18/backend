import * as yup from 'yup'

export const ProductCreateSchema = yup.object().shape({
  name: yup.string().trim().required(),
  categoryId: yup.number().nullable(),
  description: yup.string().required(),
  priority: yup.number().required(),
  sliderId: yup.number().nullable(),
  posterId: yup.number().nullable(),
  seoTitle: yup.string().trim(),
  seoContent: yup.string().trim(),
})
