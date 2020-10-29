import React, { StrictMode } from 'react'
import { render } from 'react-dom'

import reportWebVitals from './reportWebVitals'
import * as serviceWorker from './serviceWorker'

import { App } from 'view'

import 'styles/index.css'

const rootElement = document.getElementById('root')

const reactTree = (
  <StrictMode>
    <App />
  </StrictMode>
)

render(reactTree, rootElement)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
