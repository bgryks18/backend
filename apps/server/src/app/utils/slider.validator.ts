import * as yup from 'yup'

export const SliderCreateSchema = yup.object().shape({
  name: yup.string().trim().required(),
  images: yup.array(),
  product: yup.number(),
})
