import { apiActions } from 'features/api'
import { duckActions } from 'features/duck'

export const rootAction = {
  duck: duckActions,
  api: apiActions,
} as const
