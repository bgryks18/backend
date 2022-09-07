import * as yup from 'yup';

export const CategoryCreateSchema = yup.object().shape({
  name: yup.string().required(),
  seoTitle: yup.string(),
  seoContent: yup.string(),
});
