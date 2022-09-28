import * as yup from 'yup'

export const ProductCreateSchema = yup.object().shape({
  name: yup.string().trim().required(),
  categoryId: yup.number().required(),
  description: yup.string().required(),
  priority: yup.number().required(),
  sliderId: yup.number().required(),
  posterId: yup.number().required(),
  seoTitle: yup.string().trim(),
  seoContent: yup.string().trim(),
})
