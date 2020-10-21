import { css, keyframes } from 'emotion/macro'

export const headerWrapper = css`
  text-align: center;
  width: 100%;
`
export const link = css`
  color: #61dafb;
`
export const headerContainer = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  /* min-height: 100vh; */

  color: white;
  background-color: #282c34;

  font-size: calc(10px + 2vmin);
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
export const logo = css`
  height: 40vmin;

  animation: ${rotate} infinite 20s linear;
  pointer-events: none;
`
export const editCopy = css`
  color: white;
  background-color: #282c34;

  font-size: calc(10px + 2vmin);

  code {
    color: palegoldenrod;
  }
`
