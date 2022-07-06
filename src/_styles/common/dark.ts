import { rgba, composite, scaleColor } from 'seemly'
import type { ThemeCommonVars } from './light'
import commonVariables from './_common'

const base = {
  neutralBase: '#000',
  neutralInvertBase: '#fff',
  neutralTextBase: '#fff',
  neutralPopover: 'rgb(72, 72, 78)',
  neutralCard: 'rgb(24, 24, 28)',
  neutralModal: 'rgb(44, 44, 50)',
  neutralBody: 'rgb(16, 16, 20)',

  alpha1: '0.9',
  alpha2: '0.82',
  alpha3: '0.52',
  alpha4: '0.38',
  alpha5: '0.28',

  alphaClose: '0.52',

  alphaDisabled: '0.38',
  alphaDisabledInput: '0.06',
  alphaPending: '0.09',
  alphaTablePending: '0.06',
  alphaTableStriped: '0.05',
  alphaPressed: '0.05',

  alphaAvatar: '0.18',
  alphaRail: '0.2',
  alphaProgressRail: '0.12',
  alphaBorder: '0.24',
  alphaDivider: '0.09',
  alphaInput: '0.1',
  alphaAction: '0.06',
  alphaTab: '0.04',
  alphaScrollbar: '0.2',
  alphaScrollbarHover: '0.3',
  alphaCode: '0.12',
  alphaTag: '0.2',

  // primary
  primaryHover: '#7fe7c4',
  primaryDefault: '#63e2b7',
  primaryActive: '#5acea7',
  primarySuppl: 'rgb(42, 148, 125)',

  // info
  infoHover: '#8acbec',
  infoDefault: '#70c0e8',
  infoActive: '#66afd3',
  infoSuppl: 'rgb(56, 137, 197)',

  // error
  errorHover: '#e98b8b',
  errorDefault: '#e88080',
  errorActive: '#e57272',
  errorSuppl: 'rgb(208, 58, 82)',

  // warning
  warningHover: '#f5d599',
  warningDefault: '#f2c97d',
  warningActive: '#e6c260',
  warningSuppl: 'rgb(240, 138, 0)',

  // success
  successHover: '#7fe7c4',
  successDefault: '#63e2b7',
  successActive: '#5acea7',
  successSuppl: 'rgb(42, 148, 125)'
}

const baseBackgroundRgb = rgba(base.neutralBase)
const baseInvertBackgroundRgb = rgba(base.neutralInvertBase)
const overlayPrefix =
  'rgba(' + baseInvertBackgroundRgb.slice(0, 3).join(', ') + ', '
function overlay (alpha: number | string): string {
  return overlayPrefix + String(alpha) + ')'
}
function neutral (alpha: number | string): string {
  const overlayRgba = Array.from(baseInvertBackgroundRgb)
  overlayRgba[3] = Number(alpha)
  return composite(
    baseBackgroundRgb,
    overlayRgba as [number, number, number, number]
  )
}
const derived: ThemeCommonVars = {
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
  textColor1: overlay(base.alpha1),
  textColor2: overlay(base.alpha2),
  textColor3: overlay(base.alpha3),
  // textColor4: overlay(base.alpha4), // disabled, placeholder, icon
  // textColor5: overlay(base.alpha5),

  textColorDisabled: overlay(base.alpha4),
  placeholderColor: overlay(base.alpha4),
  placeholderColorDisabled: overlay(base.alpha5),
  iconColor: overlay(base.alpha4),
  iconColorDisabled: overlay(base.alpha5),
  iconColorHover: overlay(Number(base.alpha4) * 1.25),
  iconColorPressed: overlay(Number(base.alpha4) * 0.8),

  opacity1: base.alpha1,
  opacity2: base.alpha2,
  opacity3: base.alpha3,
  opacity4: base.alpha4,
  opacity5: base.alpha5,

  dividerColor: overlay(base.alphaDivider),
  borderColor: overlay(base.alphaBorder),

  // close
  closeIconColorHover: overlay(Number(base.alphaClose)),
  closeIconColor: overlay(Number(base.alphaClose)),
  closeIconColorPressed: overlay(Number(base.alphaClose)),
  closeColorHover: 'rgba(255, 255, 255, .12)',
  closeColorPressed: 'rgba(255, 255, 255, .08)',

  // clear
  clearColor: overlay(base.alpha4),
  clearColorHover: scaleColor(overlay(base.alpha4), { alpha: 1.25 }),
  clearColorPressed: scaleColor(overlay(base.alpha4), { alpha: 0.8 }),

  scrollbarColor: overlay(base.alphaScrollbar),
  scrollbarColorHover: overlay(base.alphaScrollbarHover),
  scrollbarWidth: '5px',
  scrollbarHeight: '5px',
  scrollbarBorderRadius: '5px',

  progressRailColor: overlay(base.alphaProgressRail),
  railColor: overlay(base.alphaRail),

  popoverColor: base.neutralPopover,
  tableColor: base.neutralCard,
  cardColor: base.neutralCard,
  modalColor: base.neutralModal,
  bodyColor: base.neutralBody,
  tagColor: neutral(base.alphaTag),
  avatarColor: overlay(base.alphaAvatar),
  invertedColor: base.neutralBase,

  inputColor: overlay(base.alphaInput),
  codeColor: overlay(base.alphaCode),
  tabColor: overlay(base.alphaTab),
  actionColor: overlay(base.alphaAction),
  tableHeaderColor: overlay(base.alphaAction),

  hoverColor: overlay(base.alphaPending),
  tableColorHover: overlay(base.alphaTablePending),
  tableColorStriped: overlay(base.alphaTableStriped),
  pressedColor: overlay(base.alphaPressed),

  opacityDisabled: base.alphaDisabled,
  inputColorDisabled: overlay(base.alphaDisabledInput),

  buttonColor2: 'rgba(255, 255, 255, .08)',
  buttonColor2Hover: 'rgba(255, 255, 255, .12)',
  buttonColor2Pressed: 'rgba(255, 255, 255, .08)',

  boxShadow1:
    '0 1px 2px -2px rgba(0, 0, 0, .24), 0 3px 6px 0 rgba(0, 0, 0, .18), 0 5px 12px 4px rgba(0, 0, 0, .12)',
  boxShadow2:
    '0 3px 6px -4px rgba(0, 0, 0, .24), 0 6px 12px 0 rgba(0, 0, 0, .16), 0 9px 18px 8px rgba(0, 0, 0, .10)',
  boxShadow3:
    '0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)'
}

export default derived
