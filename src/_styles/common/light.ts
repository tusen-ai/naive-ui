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

  alphaClose: '0.52',

  alphaDisabled: '0.5',
  alphaDisabledInput: '0.02',
  alphaPending: '0.04',
  alphaTablePending: '0.02',
  alphaActive: '0.06',

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
  successSuppl: '#36ad6a',

  boxShadow1: ''
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
  textColor1: neutral(base.alpha1),
  textColor2: neutral(base.alpha2),
  textColor3: neutral(base.alpha3),
  textColor4: neutral(base.alpha4), // disabled, placeholder, icon
  textColor5: neutral(base.alpha5),

  textColorDisabled: neutral(base.alpha4),
  placeholderColor: neutral(base.alpha4),
  placeholderColorDisabled: neutral(base.alpha5),
  iconColor: neutral(base.alpha4),
  iconColorDisabled: neutral(base.alpha5),

  opacity1: base.alpha1,
  opacity2: base.alpha2,
  opacity3: base.alpha3,
  opacity4: base.alpha4,
  opacity5: base.alpha5,
  opacityPending: base.alphaPending,

  dividerColor: neutral(base.alphaDivider),
  borderColor: neutral(base.alphaBorder),

  // close
  closeColorHover: neutral(Number(base.alphaClose) * 0.8),
  closeColor: neutral(Number(base.alphaClose)),
  closeColorPressed: neutral(Number(base.alphaClose) * 1.25),
  closeColorDisabled: neutral(base.alpha4),
  closeOpacity: Number(base.alphaClose),
  closeOpacityHover: Number(base.alphaClose) * 0.8,
  closeOpacityPressed: Number(base.alphaClose) * 1.25,

  // clear
  clearColor: neutral(base.alpha4),
  clearColorHover: scaleColor(neutral(base.alpha4), { lightness: 0.75 }),
  clearColorPressed: scaleColor(neutral(base.alpha4), { lightness: 0.9 }),

  scrollbarColor: overlay(base.alphaScrollbar),
  scrollbarColorHover: overlay(base.alphaScrollbarHover),

  progressRailColor: neutral(base.alphaProgressRail),
  railColor: neutral(base.alphaRail),

  popoverColor: base.neutralPopover,
  tableColor: base.neutralCard,
  cardColor: base.neutralCard,
  modalColor: base.neutralModal,
  bodyColor: base.neutralBody,
  tagColor: neutral(base.alphaTag),
  avatarColor: neutral(base.alphaAvatar),

  inputColor: neutral(base.alphaInput),
  codeColor: neutral(base.alphaCode),
  tabColor: overlay(base.alphaTab),
  actionColor: neutral(base.alphaAction),
  tableHeaderColor: overlay(base.alphaAction),

  hoverColor: neutral(base.alphaPending),
  tableColorHover: overlay(base.alphaTablePending),
  activeColor: overlay(base.alphaActive),

  opacityDisabled: base.alphaDisabled,
  inputColorDisabled: neutral(base.alphaDisabledInput),

  boxShadow2:
    '0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)',
  boxShadow3:
    '0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)'
}

export default derived
export type ThemeCommonVars = typeof derived
