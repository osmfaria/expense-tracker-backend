import * as yup from 'yup'

export const userCreateSchema = yup.object().shape({
  companyId: yup
    .number()
    .positive()
    .required()
    .integer()
    .min(1, 'should be equal or higher than 1')
    .max(1000, 'should be lower than 1000'),
  name: yup
    .string()
    .required()
    .min(3, 'should be at least 3 characters long')
    .max(50, 'should be lower than 50 characters'),
})
