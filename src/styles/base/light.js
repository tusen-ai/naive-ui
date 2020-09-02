import create from '../_utils/create-theme-base.js'
import { read, composite } from '../../_utils/color/index.js'
import commonVariables from '../_common-style/base.js'

export default create({
  theme: 'light',
  name: 'base',
  getBaseVariables () {
    return Object.assign({
      neutralBase: '#FFF',
      neutralInvertBase: '#000',
      neutralTextBase: '#000',
      neutralPopover: '#fff',
      neutralCard: '#fff',
      neutralModal: '#fff',
      neutralBody: 'rgb(248, 248, 248)',

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
      alphaBorder: '0.14',
      alphaDivider: '0.08',
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
      primaryHs: '#36ad6a',

      // info
      infoHover: '#4098fc',
      infoDefault: '#2080f0',
      infoActive: '#1060c9',
      infoHs: '#4098fc',

      // error
      errorHover: '#de576d',
      errorDefault: '#d03050',
      errorActive: '#ab1f3f',
      errorHs: '#de576d',

      // warning
      warningHover: '#fcb040',
      warningDefault: '#f0a020',
      warningActive: '#c97c10',
      warningHs: '#fcb040',

      // success
      successHover: '#36ad6a',
      successDefault: '#18a058',
      successActive: '#0c7a43',
      successHs: '#36ad6a',

      boxShadow2: '0 3px 6px -4px rgba(0, 0, 0, .16), 0 6px 12px 0 rgba(0, 0, 0, .08), 0 9px 18px 8px rgba(0, 0, 0, .04)'
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

      disabledTextColor: neutral(base.alpha4),
      disabledTextOverlayColor: overlay(base.alpha4),
      placeholderColor: neutral(base.alpha4),
      placeholderOverlayColor: overlay(base.alpha4),
      disabledPlaceholderColor: neutral(base.alpha5),
      disabledPlaceholderOverlayColor: overlay(base.alpha5),
      iconColor: neutral(base.alpha4),
      iconOverlayColor: overlay(base.alpha4),
      disabledIconColor: neutral(base.alpha5),
      disabledIconOverlayColor: neutral(base.alpha5),

      primaryOpacity: base.alpha1,
      secondaryOpacity: base.alpha2,
      tertiaryOpacity: base.alpha3,
      quaternaryOpacity: base.alpha4,
      quinaryOpacity: base.alpha5,
      pendingOpacity: base.alphaPending,
      disabledInputOpacity: base.alphaDisabledInput,

      dividerColor: neutral(base.alphaDivider),
      dividerOverlayColor: overlay(base.alphaDivider),
      borderColor: neutral(base.alphaBorder),
      borderOverlayColor: overlay(base.alphaBorder),

      // close
      closeHoverColor: neutral(base.alphaClose * 0.8),
      closeHoverOverlayColor: overlay(base.alphaClose * 0.8),
      closeColor: neutral(base.alphaClose),
      closeOverlayColor: overlay(base.alphaClose),
      closeActiveColor: neutral(base.alphaClose * 1.25),
      closeActiveOverlayColor: overlay(base.alphaClose * 1.25),
      disabledCloseColor: neutral(base.alpha4),
      disabledCloseOverlayColor: overlay(base.alpha4),
      closeOpacity: base.alphaClose,
      closeHoverOpacity: base.alphaClose * 0.8,
      closeActiveOpacity: base.alphaClose * 1.25,

      scrollbarBackgroundOverlayColor: overlay(base.alphaScrollbar),
      scrollbarHoverBackgroundOverlayColor: overlay(base.alphaScrollbarHover),

      progressRailBackgroundColor: neutral(base.alphaProgressRail),
      progressRailBackgroundOverlayColor: overlay(base.alphaProgressRail),
      railBackgroundColor: neutral(base.alphaRail),
      railBackgroundOverlayColor: overlay(base.alphaRail),
      railHoverBackgroundOverlayColor: overlay(base.alphaRail * 0.75),

      popoverBackgroundColor: base.neutralPopover,
      tableBodyBackgroundColor: base.neutralCard,
      cardBackgroundColor: base.neutralCard,
      modalBackgroundColor: base.neutralModal,
      bodyBackgroundColor: base.neutralBody,
      tagBackgroundColor: neutral(base.alphaTag),
      avatarBackgroundColor: neutral(base.alphaAvatar),

      inputBackgroundColor: neutral(base.alphaInput),
      inputBackgroundOverlayColor: overlay(base.alphaInput),
      codeBackgroundColor: neutral(base.alphaCode),
      codeBackgroundOverlayColor: overlay(base.alphaCode),
      tabBackgroundOverlayColor: overlay(base.alphaTab),
      avatarBackgroundOverlayColor: overlay(base.alphaAvatar),
      actionBackgroundColor: neutral(base.alphaAction),
      actionBackgroundOverlayColor: overlay(base.alphaAction),
      tableHeaderBackgroundOverlayColor: overlay(base.alphaAction),

      pendingBackgroundOverlayColor: overlay(base.alphaPending),
      tablePendingBackgroundOverlayColor: overlay(base.alphaTablePending),
      activeBackgroundOverlayColor: overlay(base.alphaActive),

      disabledOpacity: base.alphaDisabled,
      disabledInputBackgroundColor: neutral(base.alphaDisabledInput),
      disabledInputBackgroundOverlayColor: overlay(base.alphaDisabledInput),
      messageColoredBoxShadow: '0px 2px 18px 0px rgba(0, 0, 0, 0.27)',

      popoverBoxShadow: base.boxShadow2
    }
    return derived
  }
})
