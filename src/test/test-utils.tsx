import { render, wait, RenderOptions } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

const renderWithRouter = (
  ui: React.ReactElement<any>,
  options?: Omit<RenderOptions, 'queries'> & { route: string }
) => {
  const { route, ...renderOptions } = options || { route: '/' }
  const history = createMemoryHistory({ initialEntries: [route] })
  const utils = render(<Router history={history}>{ui}</Router>, renderOptions)

  const finishLoading = (): Promise<void> =>
    wait(() => expect(utils.queryByText('Loading')).toBeNull())

  return { ...utils, finishLoading, history }
}

export { wait, render, cleanup, fireEvent } from '@testing-library/react'
export { renderWithRouter }
