import * as yup from 'yup'

export const AdminCreateSchema = yup.object().shape({
  username: yup.string().trim().required(),
  password: yup.string().trim().required(),
  email: yup.string().trim().required(),
})

export const AdminLoginSchema = yup.object().shape({
  username: yup.string().trim().required(),
  password: yup.string().trim().required(),
})
