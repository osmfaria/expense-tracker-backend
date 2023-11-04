import * as yup from 'yup'

export const expenseCreateSchema = yup.object().shape({
  date: yup.date().required(),
  description: yup.string().required().min(3).max(200),
  amount: yup
    .number()
    .positive()
    .required()
    .test((value) => (value.toString().split('.')[1] || '').length <= 2),
  userId: yup.string().required(),
})
