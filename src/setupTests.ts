// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import '@testing-library/react/cleanup-after-each'
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect'

import { matchers } from 'jest-emotion'
expect.extend(matchers)

export default undefined
