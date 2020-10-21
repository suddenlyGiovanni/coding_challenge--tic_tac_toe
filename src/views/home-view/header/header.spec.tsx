import { render } from '@testing-library/react'
import React from 'react'

import { Header } from './header'

describe('App', () => {
  it('renders `Learn React`', () => {
    const { getByText } = render(<Header />)
    expect(getByText('Learn React')).toBeInTheDocument()
  })
})
