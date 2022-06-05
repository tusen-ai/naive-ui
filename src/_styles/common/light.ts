import { rgba, composite, scaleColor } from 'seemly'
import commonVariables from './_common'

const base = {
  neutralBase: '#FFF',
  neutralInvertBase: '#000',
  neutralTextBase: '#000',
  neutralPopover: '#fff',
  neutralCard: '#fff',
  neutralModal: '#fff',
  neutralBody: '#fff',

  alpha1: '0.82',
  alpha2: '0.72',
  alpha3: '0.38',
  alpha4: '0.24', // disabled text, placeholder, icon
  alpha5: '0.18', // disabled placeholder

  alphaClose: '0.6',

  alphaDisabled: '0.5',
  alphaDisabledInput: '0.02',
  alphaPending: '0.05',
  alphaTablePending: '0.02',
  alphaPressed: '0.07',

  alphaAvatar: '0.2',
  alphaRail: '0.14',
  alphaProgressRail: '.08',
  alphaBorder: '0.12',
  alphaDivider: '0.06',
  alphaInput: '0',
  alphaAction: '0.02',
  alphaTab: '0.04',
  alphaScrollbar: '0.25',
  alphaScrollbarHover: '0.4',
  alphaCode: '0.05',
  alphaTag: '0.02',

  // primary
  primaryHover: '#36ad6a',
  primaryDefault: '#18a058',
  primaryActive: '#0c7a43',
  primarySuppl: '#36ad6a',

  // info
  infoHover: '#4098fc',
  infoDefault: '#2080f0',
  infoActive: '#1060c9',
  infoSuppl: '#4098fc',

  // error
  errorHover: '#de576d',
  errorDefault: '#d03050',
  errorActive: '#ab1f3f',
  errorSuppl: '#de576d',

  // warning
  warningHover: '#fcb040',
  warningDefault: '#f0a020',
  warningActive: '#c97c10',
  warningSuppl: '#fcb040',

  // success
  successHover: '#36ad6a',
  successDefault: '#18a058',
  successActive: '#0c7a43',
  successSuppl: '#36ad6a'
}

const baseBackgroundRgb = rgba(base.neutralBase)
const baseInvertBackgroundRgb = rgba(base.neutralInvertBase)
const overlayPrefix =
  'rgba(' + baseInvertBackgroundRgb.slice(0, 3).join(', ') + ', '
function overlay (alpha: string | number) {
  return overlayPrefix + String(alpha) + ')'
}
function neutral (alpha: string | number) {
  const overlayRgba = Array.from(baseInvertBackgroundRgb)
  overlayRgba[3] = Number(alpha)
  return composite(
    baseBackgroundRgb,
    overlayRgba as [number, number, number, number]
  )
}
const derived = {
  name: 'common' as const,

  ...commonVariables,

  baseColor: base.neutralBase,

  // primary color
  primaryColor: base.primaryDefault,
  primaryColorHover: base.primaryHover,
  primaryColorPressed: base.primaryActive,
  primaryColorSuppl: base.primarySuppl,
  // info color
  infoColor: base.infoDefault,
  infoColorHover: base.infoHover,
  infoColorPressed: base.infoActive,
  infoColorSuppl: base.infoSuppl,
  // success color
  successColor: base.successDefault,
  successColorHover: base.successHover,
  successColorPressed: base.successActive,
  successColorSuppl: base.successSuppl,
  // warning color
  warningColor: base.warningDefault,
  warningColorHover: base.warningHover,
  warningColorPressed: base.warningActive,
  warningColorSuppl: base.warningSuppl,
  // error color
  errorColor: base.errorDefault,
  errorColorHover: base.errorHover,
  errorColorPressed: base.errorActive,
  errorColorSuppl: base.errorSuppl,
  // text color
  textColorBase: base.neutralTextBase,
  textColor1: 'rgb(31, 34, 37)',
  textColor2: 'rgb(51, 54, 57)',
  textColor3: 'rgb(118, 124, 130)',
  // textColor4: neutral(base.alpha4), // disabled, placeholder, icon
  // textColor5: neutral(base.alpha5),

  textColorDisabled: neutral(base.alpha4),
  placeholderColor: neutral(base.alpha4),
  placeholderColorDisabled: neutral(base.alpha5),
  iconColor: neutral(base.alpha4),
  iconColorHover: scaleColor(neutral(base.alpha4), { lightness: 0.75 }),
  iconColorPressed: scaleColor(neutral(base.alpha4), { lightness: 0.9 }),
  iconColorDisabled: neutral(base.alpha5),

  opacity1: base.alpha1,
  opacity2: base.alpha2,
  opacity3: base.alpha3,
  opacity4: base.alpha4,
  opacity5: base.alpha5,

  dividerColor: 'rgb(239, 239, 245)',
  borderColor: 'rgb(224, 224, 230)',

  // close
  closeIconColor: neutral(Number(base.alphaClose)),
  closeIconColorHover: neutral(Number(base.alphaClose)),
  closeIconColorPressed: neutral(Number(base.alphaClose)),
  closeColorHover: 'rgba(0, 0, 0, .09)',
  closeColorPressed: 'rgba(0, 0, 0, .13)',

  // clear
  clearColor: neutral(base.alpha4),
  clearColorHover: scaleColor(neutral(base.alpha4), { lightness: 0.75 }),
  clearColorPressed: scaleColor(neutral(base.alpha4), { lightness: 0.9 }),

  scrollbarColor: overlay(base.alphaScrollbar),
  scrollbarColorHover: overlay(base.alphaScrollbarHover),
  scrollbarWidth: '5px',
  scrollbarHeight: '5px',
  scrollbarBorderRadius: '5px',

  progressRailColor: neutral(base.alphaProgressRail),
  railColor: 'rgb(219, 219, 223)',

  popoverColor: base.neutralPopover,
  tableColor: base.neutralCard,
  cardColor: base.neutralCard,
  modalColor: base.neutralModal,
  bodyColor: base.neutralBody,
  tagColor: '#eee',
  avatarColor: neutral(base.alphaAvatar),
  invertedColor: 'rgb(0, 20, 40)',

  inputColor: neutral(base.alphaInput),
  codeColor: 'rgb(244, 244, 248)',
  tabColor: 'rgb(247, 247, 250)',
  actionColor: 'rgb(250, 250, 252)',
  tableHeaderColor: 'rgb(250, 250, 252)',

  hoverColor: 'rgb(243, 243, 245)',
  // use color with alpha since it can be nested with header filter & sorter effect
  tableColorHover: 'rgba(0, 0, 100, 0.03)',
  tableColorStriped: 'rgba(0, 0, 100, 0.02)',
  pressedColor: 'rgb(237, 237, 239)',

  opacityDisabled: base.alphaDisabled,
  inputColorDisabled: 'rgb(250, 250, 252)',

  // secondary button color
  // can also be used in tertiary button & quaternary button
  buttonColor2: 'rgba(46, 51, 56, .05)',
  buttonColor2Hover: 'rgba(46, 51, 56, .09)',
  buttonColor2Pressed: 'rgba(46, 51, 56, .13)',

  boxShadow1:
    '0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)',
  boxShadow2:
    '0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)',
  boxShadow3:
    '0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)'
}

export default derived
export type ThemeCommonVars = typeof derived
