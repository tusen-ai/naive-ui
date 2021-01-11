import { rgba, composite } from 'seemly'
import commonVariables from './_common.js'

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

  alphaDisabled: '0.6',
  alphaDisabledInput: '0.06',
  alphaPending: '0.09',
  alphaTablePending: '0.06',
  alphaActive: '0.03',

  alphaAvatar: '0.18',
  alphaRail: '0.2',
  alphaProgressRail: '0.12',
  alphaBorder: '0.24',
  alphaDivider: '0.09',
  alphaInput: '0.1',
  alphaAction: '0.06',
  alphaTab: '0.1',
  alphaScrollbar: '0.2',
  alphaScrollbarHover: '0.3',
  alphaCode: '0.12',
  alphaTag: '0',

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
function overlay (alpha) {
  return overlayPrefix + String(alpha) + ')'
}
function neutral (alpha) {
  const overlayRgba = Array.from(baseInvertBackgroundRgb)
  overlayRgba[3] = Number(alpha)
  return composite(baseBackgroundRgb, overlayRgba)
}
const derived = {
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
  textColor1Overlay: overlay(base.alpha1),
  textColor2: neutral(base.alpha2),
  textColor2Overlay: overlay(base.alpha2),
  textColor3: neutral(base.alpha3),
  textColor3Overlay: overlay(base.alpha3),
  textColor4: neutral(base.alpha4), // disabled, placeholder, icon
  textColor4Overlay: overlay(base.alpha4),
  textColor5: neutral(base.alpha5),
  textColor5Overlay: overlay(base.alpha5),

  textColorDisabled: neutral(base.alpha4),
  textColorDisabledOverlay: overlay(base.alpha4),
  placeholderColor: neutral(base.alpha4),
  placeholderColorOverlay: overlay(base.alpha4),
  placeholderColorDisabled: neutral(base.alpha5),
  placeholderColorDisabledOverlay: overlay(base.alpha5),
  iconColor: neutral(base.alpha4),
  iconColorOverlay: overlay(base.alpha4),
  iconColorDisabled: neutral(base.alpha5),
  iconColorDisabledOverlay: overlay(base.alpha5),

  opacity1: base.alpha1,
  opacity2: base.alpha2,
  opacity3: base.alpha3,
  opacity4: base.alpha4,
  opacity5: base.alpha5,
  opacityPending: base.alphaPending,

  dividerColor: neutral(base.alphaDivider),
  dividerColorOverlay: overlay(base.alphaDivider),
  borderColor: neutral(base.alphaBorder),
  borderColorOverlay: overlay(base.alphaBorder),

  // close
  closeColorHover: neutral(base.alphaClose * 1.25),
  closeColorHoverOverlay: overlay(base.alphaClose * 1.25),
  closeColor: neutral(base.alphaClose),
  closeColorOverlay: overlay(base.alphaClose),
  closeColorPressed: neutral(base.alphaClose * 0.8),
  closeColorPressedOverlay: overlay(base.alphaClose * 0.8),
  closeColorDisabled: neutral(base.alpha4),
  closeColorDisabledOverlay: overlay(base.alpha4),
  closeOpacity: base.alphaClose,
  closeOpacityHover: base.alphaClose * 1.25,
  closeOpacityPressed: base.alphaClose * 0.8,

  scrollbarColorOverlay: overlay(base.alphaScrollbar),
  scrollbarColorHoverOverlay: overlay(base.alphaScrollbarHover),

  progressRailColor: neutral(base.alphaProgressRail),
  progressRailColorOverlay: overlay(base.alphaProgressRail),
  railColor: neutral(base.alphaRail),
  railColorOverlay: overlay(base.alphaRail),

  popoverColor: base.neutralPopover,
  tableColor: base.neutralCard,
  cardColor: base.neutralCard,
  modalColor: base.neutralModal,
  bodyColor: base.neutralBody,
  tagColor: neutral(base.alphaTag),
  avatarColor: overlay(base.alphaAvatar),

  inputColor: neutral(base.alphaInput),
  inputColorOverlay: overlay(base.alphaInput),
  codeColor: neutral(base.alphaCode),
  codeColorOverlay: overlay(base.alphaCode),
  tabColorOverlay: overlay(base.alphaTab),
  avatarColorOverlay: overlay(base.alphaAvatar),
  actionColor: neutral(base.alphaAction),
  actionColorOverlay: overlay(base.alphaAction),
  tableHeaderColorOverlay: overlay(base.alphaAction),

  hoverColor: neutral(base.alphaPending),
  hoverColorOverlay: overlay(base.alphaPending),
  tableColorHoverOverlay: overlay(base.alphaTablePending),
  activeColorOverlay: overlay(base.alphaActive),

  opacityDisabled: base.alphaDisabled,
  inputColorDisabled: neutral(base.alphaDisabledInput),
  inputColorDisabledOverlay: overlay(base.alphaDisabledInput),

  boxShadow2:
    '0 3px 6px -4px rgba(0, 0, 0, .16), 0 6px 12px 0 rgba(0, 0, 0, .08), 0 9px 18px 8px rgba(0, 0, 0, .04)',
  boxShadow3:
    '0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)'
}

export default derived
