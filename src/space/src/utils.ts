import { isBrowser } from '../../_utils'

let supportFlexGap: boolean | undefined

export const ensureSupportFlexGap = (): boolean => {
  if (!isBrowser) return true
  if (supportFlexGap === undefined) {
    // create flex container with row-gap set
    const flex = document.createElement('div')
    flex.style.display = 'flex'
    flex.style.flexDirection = 'column'
    flex.style.rowGap = '1px'

    // create two, elements inside it
    flex.appendChild(document.createElement('div'))
    flex.appendChild(document.createElement('div'))

    // append to the DOM (needed to obtain scrollHeight)
    document.body.appendChild(flex)
    const isSupported = flex.scrollHeight === 1 // flex container should be 1px high from the row-gap
    document.body.removeChild(flex)
    return (supportFlexGap = isSupported)
  }
  return supportFlexGap
}
