import create from '../_utils/create-theme-base.js'
import { read, composite } from '../../_utils/color/index.js'
import commonVariables from '../_common-style/base.js'

export default create({
  getBaseVariables () {
    return Object.assign({
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
      alpha5: '0.2',

      alphaDisabled: '0.6',
      alphaDisabledInput: '0.06',
      alphaPending: '0.09',
      alphaTablePending: '0.06',
      alphaActive: '0.03',

      alphaAvatar: '0.18',
      alphaRail: '0.20',
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
      primaryHs: 'rgb(42, 148, 125)',

      // info
      infoHover: '#8acbec',
      infoDefault: '#70c0e8',
      infoActive: '#66afd3',
      infoHs: 'rgb(56, 137, 197)',

      // error
      errorHover: '#e98b8b',
      errorDefault: '#e88080',
      errorActive: '#e57272',
      errorHs: 'rgb(208, 58, 82)',

      // warning
      warningHover: '#f5d599',
      warningDefault: '#f2c97d',
      warningActive: '#e6c260',
      warningHs: 'rgb(240, 138, 0)',

      // success
      successHover: '#7fe7c4',
      successDefault: '#63e2b7',
      successActive: '#5acea7',
      successHs: 'rgb(42, 148, 125)'
    }, commonVariables)
  },
  getDerivedVariables (base) {
    const baseBackgroundRgb = read(base.neutralBase)
    const baseInvertBackgroundRgb = read(base.neutralInvertBase)
    const overlayPrefix = 'rgba(' + baseInvertBackgroundRgb.slice(0, 3).join(', ') + ', '
    function overlay (alpha) {
      return overlayPrefix + String(alpha) + ')'
    }
    function neutral (alpha) {
      const overlayRgba = Array.from(baseInvertBackgroundRgb)
      overlayRgba[3] = Number(alpha)
      return composite(baseBackgroundRgb, overlayRgba)
    }
    const derived = {
      baseBackgroundColor: base.neutralBase,

      // primary color
      primaryColor: base.primaryDefault,
      primaryHoverColor: base.primaryHover,
      primaryActiveColor: base.primaryActive,
      primaryHsColor: base.primaryHs,
      // info color
      infoColor: base.infoDefault,
      infoHoverColor: base.infoHover,
      infoActiveColor: base.infoActive,
      infoHsColor: base.infoHs,
      // success color
      successColor: base.successDefault,
      successHoverColor: base.successHover,
      successActiveColor: base.successActive,
      successHsColor: base.successHs,
      // warning color
      warningColor: base.warningDefault,
      warningHoverColor: base.warningHover,
      warningActiveColor: base.warningActive,
      warningHsColor: base.warningHs,
      // error color
      errorColor: base.errorDefault,
      errorHoverColor: base.errorHover,
      errorActiveColor: base.errorActive,
      errorHsColor: base.errorHs,
      // text color
      baseTextColor: base.neutralTextBase,
      primaryTextColor: neutral(base.alpha1),
      primaryTextOverlayColor: overlay(base.alpha1),
      secondaryTextColor: neutral(base.alpha2),
      secondaryTextOverlayColor: overlay(base.alpha2),
      tertiaryTextColor: neutral(base.alpha3),
      tertiaryTextOverlayColor: overlay(base.alpha3),
      quaternaryTextColor: neutral(base.alpha4), // disabled, placeholder, icon
      quaternaryTextOverlayColor: overlay(base.alpha4),
      quinaryTextColor: neutral(base.alpha5),
      quinaryTextOverlayColor: overlay(base.alpha5),

      primaryOpacity: base.alpha1,
      secondaryOpacity: base.alpha2,
      tertiaryOpacity: base.alpha3,
      pendingOpacity: base.alphaPending,
      disabledInputOpacity: base.alphaDisabledInput,

      iconColor: neutral(base.alpha4),
      iconOverlayColor: overlay(base.alpha4),

      dividerColor: neutral(base.alphaDivider),
      dividerOverlayColor: overlay(base.alphaDivider),
      borderColor: neutral(base.alphaBorder),
      borderOverlayColor: overlay(base.alphaBorder),

      closeHoverColor: neutral(base.alpha2),
      closeHoverOverlayColor: overlay(base.alpha2),
      closeColor: neutral(base.alpha3),
      closeOverlayColor: overlay(base.alpha3),
      disabledCloseColor: neutral(base.alpha4),
      disabledCloseHoverColor: overlay(base.alpha4),

      scrollbarBackgroundOverlayColor: overlay(base.alphaScrollbar),
      scrollbarHoverBackgroundOverlayColor: overlay(base.alphaScrollbarHover),

      progressRailBackgroundColor: neutral(base.alphaProgressRail),
      progressRailBackgroundOverlayColor: overlay(base.alphaProgressRail),
      railBackgroundColor: neutral(base.alphaRail),
      railBackgroundOverlayColor: overlay(base.alphaRail),

      popoverBackgroundColor: base.neutralPopover,
      tableBodyBackgroundColor: base.neutralCard,
      cardBackgroundColor: base.neutralCard,
      modalBackgroundColor: base.neutralModal,
      bodyBackgroundColor: base.neutralBody,
      tagBackgroundColor: neutral(base.alphaTag),

      inputBackgroundColor: neutral(base.alphaInput),
      inputBackgroundOverlayColor: overlay(base.alphaInput),
      codeBackgroundOverlayColor: overlay(base.alphaCode),
      tabBackgroundOverlayColor: overlay(base.alphaTab),
      avatarBackgroundOverlayColor: overlay(base.alphaAvatar),
      actionBackgroundOverlayColor: overlay(base.alphaAction),
      tableHeaderBackgroundOverlayColor: overlay(base.alphaAction),

      pendingBackgroundOverlayColor: overlay(base.alphaPending),
      tablePendingBackgroundOverlayColor: overlay(base.alphaTablePending),
      activeBackgroundOverlayColor: overlay(base.alphaActive),

      disabledOpacity: base.alphaDisabled,
      disabledInputBackgroundColor: neutral(base.alphaDisabledInput),
      disabledInputBackgroundOverlayColor: overlay(base.alphaDisabledInput),
      messageColoredBoxShadow: null
    }
    return derived
  }
})
