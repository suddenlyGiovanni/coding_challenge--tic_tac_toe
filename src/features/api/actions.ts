/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AxiosError, AxiosRequestConfig } from 'axios'
import cuid from 'cuid'

import { createAction, createAsyncAction } from 'typesafe-actions'

import apiTypes from './types'

interface Temp1 {
  feature: string
  cuid: string
  timestamp: number
}
export const apiStart = createAction(
  apiTypes.API_START,
  ({ timestamp }: Temp1) => ({ timestamp }),
  ({ feature, cuid }: Temp1) => ({ cuid, feature })
)()

export const apiEnd = createAction(
  apiTypes.API_END,
  ({ timestamp }: Temp1) => ({ timestamp }),
  ({ feature, cuid }: Temp1) => ({ cuid, feature })
)()

interface Temp2 {
  pathname: string
  feature: string
  cuid: string
}
export const accessDenied = createAction(
  apiTypes.ACCESS_DENIED,

  ({ pathname }: Temp2) => ({ pathname }),
  ({ feature, cuid }: Temp2) => ({ cuid, feature })
)()

interface ApiActionFactory extends AxiosRequestConfig {
  feature: string
  accessToken?: null | string
}

interface Temp3<T = {}> {
  feature: string
  data: T
  cuid: string
}

interface Temp4 {
  feature: string
  error: AxiosError
  cuid: string
}

export const api = createAsyncAction(
  [
    apiTypes.API_REQUEST,
    ({
      url = '',
      method = 'GET',
      data = null,
      feature = '',
      accessToken = null,
      ...rest
    }: ApiActionFactory) => ({ url, method, data, accessToken, ...rest }),
    ({ feature = '' }: ApiActionFactory) => ({ cuid: cuid(), feature }),
  ],
  [
    apiTypes.API_SUCCESS,
    <T = {}>({ data }: Temp3<T>) => ({ data }),
    <T = {}>({ feature, cuid }: Temp3<T>) => ({ cuid, feature }),
  ],
  [
    apiTypes.API_ERROR,
    ({ error }: Temp4) => ({ error }),
    ({ feature, cuid }: Temp4) => ({ cuid, feature }),
  ]
)()
