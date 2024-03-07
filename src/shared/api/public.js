import axios from 'axios'
import * as yup from 'yup'
import YupPassword from 'yup-password'
import { yupResolver } from '@hookform/resolvers/yup'

import { BASE_URL } from '~/configs/constants'

const baseUrl = BASE_URL

YupPassword(yup)

export const signinSchema = yup.object().shape({
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().label('Password'),
})
export const signinResolver = yupResolver(signinSchema)

export const signIn = async input => {
  return await axios.post(`${baseUrl}/auth/signIn`, { ...input })
}

export const signupSchema = yup.object().shape({
  email: yup.string().email().required().label('Email'),
  password: yup
    .string()
    .password()
    .required()
    .min(8)
    .max(64)
    .minSymbols(1)
    .label('Password'),
  confirmpassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], "Passwords don't match")
    .label('Confirm password'),
  terms: yup
    .bool()
    .oneOf(
      [true],
      'To proceed with registration, please agree to the Terms and Conditions',
    )
    .required(
      'To proceed with registration, please agree to the Terms and Conditions',
    ),
})
export const signupResolver = yupResolver(signupSchema)
export const register = async input => {
  return await axios.post(`${baseUrl}/auth/register`, { ...input })
}

export const registerOTP = async input => {
  return await axios.post(`${baseUrl}/auth/register-OTP`, { ...input })
}

export const forgotPassSchema = yup.object().shape({
  email: yup.string().email().required().label('Email'),
})
export const forgotPassResolver = yupResolver(forgotPassSchema)
export const forgotPassword = async input => {
  return await axios.post(`${baseUrl}/auth/forgot-password`, { ...input })
}

export const resetPasswordOTP = async input => {
  return await axios.post(`${baseUrl}/auth/reset-pass-OTP`, { ...input })
}

export const resetPassSchema = yup.object().shape({
  password: yup
    .string()
    .password()
    .required()
    .min(8)
    .max(64)
    .minSymbols(1)
    .label('Password'),
  confirmpassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], "Passwords don't match")
    .label('Confirm password'),
})
export const resetPassResolver = yupResolver(resetPassSchema)
export const resetPassword = async input => {
  return await axios.post(`${baseUrl}/auth/reset-password`, { ...input })
}
