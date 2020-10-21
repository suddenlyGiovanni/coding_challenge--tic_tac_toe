import React, { ReactNode } from 'react'

import { mainStyle } from './main.styles'

export function Main({ children }: { children: ReactNode }): JSX.Element {
  return <div className={mainStyle}>{children}</div>
}
