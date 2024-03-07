import axios from 'axios'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { BASE_URL } from '~/configs/constants'

const baseUrl = BASE_URL

export const validateUsername = input =>
  axios.post(`${baseUrl}/user/validate-username`, { ...input })

export const updateProfileSchema = yup.object().shape({
  first_name: yup.string().required().max(64).label('First name'),
  last_name: yup.string().required().max(64).label('Last name'),
  username: yup.string().required().label('Username'),
})
export const updateProfileResolver = yupResolver(updateProfileSchema)
export const updateProfile = input =>
  axios.post(`${baseUrl}/user/update-profile`, { ...input })

export const uploadPhoto = blob => {
  const form_data = new FormData()
  form_data.append('file', blob)
  return axios.post(`${baseUrl}/user/upload-profile-photo`, form_data)
}

export const initiateUpload = input =>
  axios.post(`${baseUrl}/content/initiate-upload`, { ...input })

export const uploadFile = input =>
  axios.post(`${baseUrl}/content/upload`, { ...input })

export const completeUpload = input =>
  axios.post(`${baseUrl}/content/complete-upload`, { ...input })

export const addVideo = formData =>
  axios.post(`${baseUrl}/content/video`, formData)

export const updateVideo = ({ id, formData }) =>
  axios.put(`${baseUrl}/content/video/${id}`, formData)

export const deleteVideo = id => axios.delete(`${baseUrl}/content/video/${id}`)

export const contentUploadSchema = yup.object().shape({
  type: yup.object().required().label('Content type'),
  market: yup.object().required().label('Market'),
  title: yup
    .string()
    .when('type', (type, schema) => {
      if (type?.[0]?.value === 'playlist') {
        return schema.required()
      }
      return schema
    })
    .label('Title'),
  description: yup
    .string()
    .when('type', (type, schema) => {
      if (type?.[0]?.value === 'playlist') {
        return schema.required()
      }
      return schema
    })
    .max(1024)
    .label('Description'),
  files: yup.array().min(1).label('Files'),
})
export const contentUploadResolver = yupResolver(contentUploadSchema)
export const uploadContent = input =>
  axios.post(`${baseUrl}/content`, { ...input })

export const videoSchema = yup.object().shape({
  name: yup.string().required().label('Name'),
  description: yup.string().required().max(1024).label('Description'),
  cover: yup.object().required().label('Cover'),
})
export const videoResolver = yupResolver(videoSchema)

export const fetchProfile = userId =>
  axios.get(`${baseUrl}/user/profile/${userId}`)

export const getVideos = userId =>
  axios.get(`${baseUrl}/content/videos`, { params: { userId } })

export const getPlaylists = userId =>
  axios.get(`${baseUrl}/content/playlists`, { params: { userId } })

export const contentEditSchema = yup.object().shape({
  name: yup.string().required().label('Name'),
  description: yup.string().required().max(1024).label('Description'),
})
export const contentEditResolver = yupResolver(contentEditSchema)
export const updateContent = input =>
  axios.put(`${baseUrl}/content/${input.id}`, { ...input })
export const deleteContent = id => axios.delete(`${baseUrl}/content/${id}`)

export const viewVideo = id => axios.put(`${baseUrl}/content/video/${id}/view`)

export const viewContent = id => axios.put(`${baseUrl}/content/${id}/view`)

export const viewUserProfile = id =>
  axios.put(`${baseUrl}/user/profile/${id}/view`)

export const getPopularPlaylists = () =>
  axios.get(`${baseUrl}/discovery/popular-playlists`)

export const createSetupIntentSecret = () =>
  axios.post(`${baseUrl}/payment-method/setup-intent-secret`)

export const getPaymentMethod = () => axios.get(`${baseUrl}/payment-method`)

export const getPayoutDetails = () => axios.get(`${baseUrl}/payout`)

export const getStripeAccountLink = () =>
  axios.get(`${baseUrl}/payout/account-link`)

export const getReviews = userId =>
  axios.get(`${baseUrl}/review`, { params: { userId } })

export const addReviewSchema = yup.object().shape({
  rate: yup.number().moreThan(0).required().label('Rate'),
  review: yup.string().required().max(250).label('Description'),
})
export const addReviewResolver = yupResolver(addReviewSchema)
export const addReview = input => axios.post(`${baseUrl}/review`, { ...input })

export const deleteReview = id => axios.delete(`${baseUrl}/review/${id}`)

export const getProducts = () => axios.get(`${baseUrl}/product`)

export const getSubsciption = () => axios.get(`${baseUrl}/subscription`)

export const subscribePlan = input =>
  axios.post(`${baseUrl}/subscription`, { ...input })

export const cancelSubscription = () =>
  axios.post(`${baseUrl}/subscription/cancel`)

export const updateSubscription = input =>
  axios.post(`${baseUrl}/subscription/update`, { ...input })

export const profileSubscriptionSchema = yup.object().shape({
  price: yup
    .number()
    .typeError('You must specify a number')
    .required()
    .moreThan(0)
    .max(999)
    .label('Price'),
})

export const profileSubscriptionResolver = yupResolver(
  profileSubscriptionSchema,
)
export const createProfileSubscription = input =>
  axios.post(`${baseUrl}/subscription/profile`, { ...input })
export const editProfileSubscription = input =>
  axios.put(`${baseUrl}/subscription/profile`, { ...input })
export const deleteProfileSubscription = () =>
  axios.delete(`${baseUrl}/subscription/profile`)
export const getProfileSubscription = userId =>
  axios.get(`${baseUrl}/subscription/profile`, { params: { userId } })
export const subscribeProfilePlan = input =>
  axios.post(`${baseUrl}/subscription/profile/subscribe`, { ...input })
export const getSubscriptionsForOtherUser = () =>
  axios.get(`${baseUrl}/subscription/profile/subscriptions`)
export const getMyProfileSubscriptions = () =>
  axios.get(`${baseUrl}/subscription/profile/subscribers`)
