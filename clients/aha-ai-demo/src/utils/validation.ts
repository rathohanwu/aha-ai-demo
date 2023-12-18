import * as yup from 'yup';

const passwordValidation = yup
  .string()
  .required('Password is required')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
  .min(8, 'Password should be at least 8 characters')
  .max(20, 'Password cannot exceed more than 20 characters');

const emailValidation = yup.string().required('Email is required').email();

const nameValidation = yup.string().required('Name is required');

export {passwordValidation, emailValidation, nameValidation};
