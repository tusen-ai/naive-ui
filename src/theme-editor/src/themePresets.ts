import type { GlobalThemeOverrides } from '../../config-provider'

export interface ThemePreset {
  name: string
  nameEn: string
  author: string
  description: string
  descriptionEn: string
  colors: string[]
  overrides: GlobalThemeOverrides
}

export const themePresets: ThemePreset[] = [
  // ═══════════════════════════════════════════════════
  // 1. Ant Design 6 (Light)
  // ═══════════════════════════════════════════════════
  {
    name: 'Ant Design',
    nameEn: 'Ant Design',
    author: 'Naive UI',
    description: '参考 Ant Design 6 的设计语言',
    descriptionEn: 'Classic enterprise design inspired by Ant Design 6',
    colors: ['#1677ff', '#52c41a', '#faad14', '#ff4d4f'],
    overrides: {
      common: {
        // ── Primary: #1677ff ──
        primaryColor: '#1677ff',
        primaryColorHover: '#4096ff',
        primaryColorPressed: '#0958d9',
        primaryColorSuppl: '#91caff',
        // ── Info (same as primary in antd) ──
        infoColor: '#1677ff',
        infoColorHover: '#4096ff',
        infoColorPressed: '#0958d9',
        infoColorSuppl: '#91caff',
        // ── Success: #52c41a ──
        successColor: '#52c41a',
        successColorHover: '#73d13d',
        successColorPressed: '#389e0d',
        successColorSuppl: '#b7eb8f',
        // ── Warning: #faad14 ──
        warningColor: '#faad14',
        warningColorHover: '#ffc53d',
        warningColorPressed: '#d48806',
        warningColorSuppl: '#ffe58f',
        // ── Error: #ff4d4f ──
        errorColor: '#ff4d4f',
        errorColorHover: '#ff7875',
        errorColorPressed: '#d9363e',
        errorColorSuppl: '#ffa39e',
        // ── Text colors ──
        textColor1: 'rgba(0, 0, 0, 0.88)',
        textColor2: 'rgba(0, 0, 0, 0.65)',
        textColor3: 'rgba(0, 0, 0, 0.45)',
        textColorDisabled: 'rgba(0, 0, 0, 0.25)',
        placeholderColor: 'rgba(0, 0, 0, 0.25)',
        placeholderColorDisabled: 'rgba(0, 0, 0, 0.25)',
        // ── Icon colors ──
        iconColor: 'rgba(0, 0, 0, 0.45)',
        iconColorHover: 'rgba(0, 0, 0, 0.88)',
        iconColorPressed: 'rgba(0, 0, 0, 0.65)',
        iconColorDisabled: 'rgba(0, 0, 0, 0.25)',
        // ── Border / Divider ──
        borderColor: '#d9d9d9',
        dividerColor: '#f0f0f0',
        // ── Border radius ──
        borderRadius: '6px',
        borderRadiusSmall: '4px',
        // ── Typography: antd default ──
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        fontFamilyMono:
          '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
        fontWeight: '400',
        fontWeightStrong: '500',
        fontSize: '14px',
        fontSizeMini: '12px',
        fontSizeTiny: '12px',
        fontSizeSmall: '14px',
        fontSizeMedium: '14px',
        fontSizeLarge: '16px',
        fontSizeHuge: '20px',
        lineHeight: '1.5714',
        // ── Component heights (antd: small 24, default 32, large 40) ──
        heightMini: '16px',
        heightTiny: '24px',
        heightSmall: '28px',
        heightMedium: '32px',
        heightLarge: '40px',
        heightHuge: '48px',
        // ── Surface / background colors ──
        bodyColor: '#f5f5f5',
        cardColor: '#ffffff',
        modalColor: '#ffffff',
        popoverColor: '#ffffff',
        tableColor: '#ffffff',
        tableHeaderColor: '#fafafa',
        tableColorHover: '#fafafa',
        tableColorStriped: '#fafafa',
        inputColor: '#ffffff',
        inputColorDisabled: 'rgba(0, 0, 0, 0.04)',
        tagColor: '#f5f5f5',
        avatarColor: '#d9d9d9',
        codeColor: 'rgba(150, 150, 150, 0.1)',
        tabColor: '#ffffff',
        actionColor: '#fafafa',
        // ── Interaction states ──
        hoverColor: '#f5f5f5',
        pressedColor: '#e8e8e8',
        buttonColor2: '#f0f0f0',
        buttonColor2Hover: '#e8e8e8',
        buttonColor2Pressed: '#d9d9d9',
        progressRailColor: '#f0f0f0',
        railColor: '#f0f0f0',
        // ── Scrollbar ──
        scrollbarColor: 'rgba(0, 0, 0, 0.15)',
        scrollbarColorHover: 'rgba(0, 0, 0, 0.25)',
        scrollbarWidth: '6px',
        scrollbarHeight: '6px',
        scrollbarBorderRadius: '3px',
        // ── Shadows (antd elevation levels) ──
        boxShadow1:
          '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
        boxShadow2:
          '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        boxShadow3:
          '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        // ── Opacity ──
        opacity1: '0.88',
        opacity2: '0.65',
        opacity3: '0.45',
        opacity4: '0.25',
        opacity5: '0.1',
        opacityDisabled: '0.25',
        // ── Close / Clear ──
        closeIconColor: 'rgba(0, 0, 0, 0.45)',
        closeIconColorHover: 'rgba(0, 0, 0, 0.88)',
        closeIconColorPressed: 'rgba(0, 0, 0, 0.65)',
        closeColorHover: 'rgba(0, 0, 0, 0.06)',
        closeColorPressed: 'rgba(0, 0, 0, 0.1)',
        clearColor: 'rgba(0, 0, 0, 0.25)',
        clearColorHover: 'rgba(0, 0, 0, 0.45)',
        clearColorPressed: 'rgba(0, 0, 0, 0.65)'
      }
    }
  },
  // ═══════════════════════════════════════════════════
  // 1.1 Ant Design 6 (Dark)
  // ═══════════════════════════════════════════════════
  {
    name: 'Ant Design Dark',
    nameEn: 'Ant Design Dark',
    author: 'Naive UI',
    description: '参考 Ant Design 6 的暗色设计语言',
    descriptionEn: 'Dark theme inspired by Ant Design 6',
    colors: ['#00b2ff', '#36c759', '#ff9f3c', '#ff5252'],
    overrides: {
      common: {
        // ── Primary: #00b2ff ──
        primaryColor: '#00b2ff',
        primaryColorHover: '#33c2ff',
        primaryColorPressed: '#0099ff',
        primaryColorSuppl: '#005a99',
        // ── Info (same as primary) ──
        infoColor: '#00b2ff',
        infoColorHover: '#33c2ff',
        infoColorPressed: '#0099ff',
        infoColorSuppl: '#005a99',
        // ── Success: #36c759 ──
        successColor: '#36c759',
        successColorHover: '#4cd964',
        successColorPressed: '#36c759',
        successColorSuppl: '#1a6b33',
        // ── Warning: #ff9f3c ──
        warningColor: '#ff9f3c',
        warningColorHover: '#ffb24c',
        warningColorPressed: '#ff9f3c',
        warningColorSuppl: '#995500',
        // ── Error: #ff5252 ──
        errorColor: '#ff5252',
        errorColorHover: '#ff6666',
        errorColorPressed: '#ff5252',
        errorColorSuppl: '#990000',
        // ── Text colors (light on dark) ──
        textColor1: 'rgba(232, 234, 239, 0.88)',
        textColor2: 'rgba(232, 234, 239, 0.65)',
        textColor3: 'rgba(232, 234, 239, 0.45)',
        textColorDisabled: 'rgba(232, 234, 239, 0.25)',
        placeholderColor: 'rgba(232, 234, 239, 0.25)',
        placeholderColorDisabled: 'rgba(232, 234, 239, 0.25)',
        // ── Icon colors ──
        iconColor: 'rgba(232, 234, 239, 0.45)',
        iconColorHover: 'rgba(232, 234, 239, 0.88)',
        iconColorPressed: 'rgba(232, 234, 239, 0.65)',
        iconColorDisabled: 'rgba(232, 234, 239, 0.25)',
        // ── Border / Divider ──
        borderColor: '#2c2d32',
        dividerColor: '#34363c',
        // ── Border radius (dark uses slightly larger) ──
        borderRadius: '8px',
        borderRadiusSmall: '4px',
        // ── Typography ──
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        fontFamilyMono:
          '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
        fontWeight: '400',
        fontWeightStrong: '500',
        fontSize: '14px',
        fontSizeMini: '12px',
        fontSizeTiny: '12px',
        fontSizeSmall: '14px',
        fontSizeMedium: '14px',
        fontSizeLarge: '16px',
        fontSizeHuge: '20px',
        lineHeight: '1.5714',
        // ── Component heights ──
        heightMini: '16px',
        heightTiny: '24px',
        heightSmall: '28px',
        heightMedium: '32px',
        heightLarge: '40px',
        heightHuge: '48px',
        // ── Surface / background colors (dark) ──
        bodyColor: '#0f0f12',
        cardColor: '#1a1b20',
        modalColor: '#232429',
        popoverColor: '#232429',
        tableColor: '#1a1b20',
        tableHeaderColor: '#232429',
        tableColorHover: '#232429',
        tableColorStriped: '#1e1f24',
        inputColor: '#1a1b20',
        inputColorDisabled: 'rgba(232, 234, 239, 0.04)',
        tagColor: '#232429',
        avatarColor: '#34363c',
        codeColor: 'rgba(232, 234, 239, 0.08)',
        tabColor: '#1a1b20',
        actionColor: '#232429',
        // ── Interaction states ──
        hoverColor: 'rgba(232, 234, 239, 0.06)',
        pressedColor: 'rgba(232, 234, 239, 0.1)',
        buttonColor2: '#2c2d32',
        buttonColor2Hover: '#34363c',
        buttonColor2Pressed: '#3e4046',
        progressRailColor: '#2c2d32',
        railColor: '#2c2d32',
        // ── Scrollbar ──
        scrollbarColor: 'rgba(232, 234, 239, 0.15)',
        scrollbarColorHover: 'rgba(232, 234, 239, 0.25)',
        scrollbarWidth: '6px',
        scrollbarHeight: '6px',
        scrollbarBorderRadius: '3px',
        // ── Shadows (darker / more opaque for dark mode) ──
        boxShadow1:
          '0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 4px -1px rgba(0, 0, 0, 0.15)',
        boxShadow2: '0 2px 8px 0 rgba(0, 0, 0, 0.35)',
        boxShadow3: '0 4px 12px 0 rgba(0, 0, 0, 0.45)',
        // ── Opacity ──
        opacity1: '0.88',
        opacity2: '0.65',
        opacity3: '0.45',
        opacity4: '0.25',
        opacity5: '0.1',
        opacityDisabled: '0.25',
        // ── Close / Clear ──
        closeIconColor: 'rgba(232, 234, 239, 0.45)',
        closeIconColorHover: 'rgba(232, 234, 239, 0.88)',
        closeIconColorPressed: 'rgba(232, 234, 239, 0.65)',
        closeColorHover: 'rgba(232, 234, 239, 0.06)',
        closeColorPressed: 'rgba(232, 234, 239, 0.1)',
        clearColor: 'rgba(232, 234, 239, 0.25)',
        clearColorHover: 'rgba(232, 234, 239, 0.45)',
        clearColorPressed: 'rgba(232, 234, 239, 0.65)'
      }
    }
  },
  // ═══════════════════════════════════════════════════
  // 2. Material Design 3 (Material You)
  // ═══════════════════════════════════════════════════
  {
    name: 'Material Design',
    nameEn: 'Material Design',
    author: 'Naive UI',
    description: '严格遵循 Material Design 3 (Material You) 官方设计规范',
    descriptionEn:
      'Strictly following Material Design 3 (Material You) official specs',
    colors: ['#6750A4', '#625B71', '#7D5260', '#B3261E'],
    overrides: {
      common: {
        // ── M3 Primary tonal: Primary #6750A4 ──
        primaryColor: '#6750A4',
        primaryColorHover: '#7965AF',
        primaryColorPressed: '#4F378B',
        primaryColorSuppl: '#D0BCFF',
        // ── M3 Secondary: #625B71 ──
        infoColor: '#625B71',
        infoColorHover: '#7A7289',
        infoColorPressed: '#4A4458',
        infoColorSuppl: '#CCC2DC',
        // ── M3 Custom green for success ──
        successColor: '#386A20',
        successColorHover: '#4E8235',
        successColorPressed: '#2B5418',
        successColorSuppl: '#B2D89B',
        // ── M3 Tertiary: #7D5260 ──
        warningColor: '#7D5260',
        warningColorHover: '#976977',
        warningColorPressed: '#633B48',
        warningColorSuppl: '#FFD8E4',
        // ── M3 Error: #B3261E ──
        errorColor: '#B3261E',
        errorColorHover: '#C5453D',
        errorColorPressed: '#8C1D18',
        errorColorSuppl: '#F9DEDC',
        // ── M3 On-Surface / On-Surface-Variant ──
        textColor1: '#1C1B1F',
        textColor2: '#49454F',
        textColor3: '#79747E',
        textColorDisabled: 'rgba(28, 27, 31, 0.38)',
        placeholderColor: '#79747E',
        placeholderColorDisabled: 'rgba(28, 27, 31, 0.38)',
        iconColor: '#49454F',
        iconColorHover: '#1C1B1F',
        iconColorPressed: '#49454F',
        iconColorDisabled: 'rgba(28, 27, 31, 0.38)',
        // ── M3 Outline / Outline-Variant ──
        borderColor: '#79747E',
        dividerColor: '#CAC4D0',
        // ── M3 Shape: medium = 12dp, small = 8dp ──
        borderRadius: '12px',
        borderRadiusSmall: '8px',
        // ── M3 Typography: Roboto, body-medium 14/20 ──
        fontFamily:
          '"Google Sans", Roboto, "Noto Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
        fontFamilyMono:
          '"Roboto Mono", "Noto Sans Mono", Consolas, "Liberation Mono", Menlo, monospace',
        fontWeight: '400',
        fontWeightStrong: '500',
        fontSize: '14px',
        fontSizeMini: '11px',
        fontSizeTiny: '12px',
        fontSizeSmall: '14px',
        fontSizeMedium: '14px',
        fontSizeLarge: '16px',
        fontSizeHuge: '22px',
        lineHeight: '1.43',
        // ── M3 Component heights ──
        heightMini: '16px',
        heightTiny: '24px',
        heightSmall: '32px',
        heightMedium: '40px',
        heightLarge: '48px',
        heightHuge: '56px',
        // ── M3 Surface colors ──
        bodyColor: '#FEF7FF',
        cardColor: '#FFFBFE',
        modalColor: '#ECE6F0',
        popoverColor: '#FFFBFE',
        tableColor: '#FFFBFE',
        tableHeaderColor: '#F6EDFF',
        tableColorHover: '#F6EDFF',
        tableColorStriped: '#F6EDFF',
        inputColor: '#FFFBFE',
        inputColorDisabled: 'rgba(28, 27, 31, 0.04)',
        tagColor: '#E8DEF8',
        avatarColor: '#E8DEF8',
        codeColor: 'rgba(103, 80, 164, 0.08)',
        tabColor: '#FFFBFE',
        actionColor: '#F6EDFF',
        // ── M3 State layers ──
        hoverColor: 'rgba(103, 80, 164, 0.08)',
        pressedColor: 'rgba(103, 80, 164, 0.12)',
        buttonColor2: '#E8DEF8',
        buttonColor2Hover: '#D0BCFF',
        buttonColor2Pressed: '#C4B5D6',
        progressRailColor: '#E7E0EC',
        railColor: '#E7E0EC',
        // ── Scrollbar ──
        scrollbarColor: 'rgba(73, 69, 79, 0.3)',
        scrollbarColorHover: 'rgba(73, 69, 79, 0.5)',
        scrollbarWidth: '4px',
        scrollbarHeight: '4px',
        scrollbarBorderRadius: '2px',
        // ── M3 Elevation (shadow) levels 1-3 ──
        boxShadow1:
          '0 1px 2px rgba(0, 0, 0, 0.30), 0 1px 3px 1px rgba(0, 0, 0, 0.15)',
        boxShadow2:
          '0 1px 2px rgba(0, 0, 0, 0.30), 0 2px 6px 2px rgba(0, 0, 0, 0.15)',
        boxShadow3:
          '0 4px 8px 3px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.30)',
        // ── M3 Opacity / State ──
        opacity1: '0.87',
        opacity2: '0.6',
        opacity3: '0.38',
        opacity4: '0.16',
        opacity5: '0.08',
        opacityDisabled: '0.38',
        // ── Close / Clear ──
        closeIconColor: '#49454F',
        closeIconColorHover: '#1C1B1F',
        closeIconColorPressed: '#49454F',
        closeColorHover: 'rgba(103, 80, 164, 0.08)',
        closeColorPressed: 'rgba(103, 80, 164, 0.12)',
        clearColor: '#79747E',
        clearColorHover: '#49454F',
        clearColorPressed: '#1C1B1F'
      },
      Button: {
        // M3 Filled button: full-radius (Stadium shape = height/2)
        borderRadiusTiny: '16px',
        borderRadiusSmall: '16px',
        borderRadiusMedium: '20px',
        borderRadiusLarge: '24px',
        fontWeight: '500',
        fontWeightStrong: '500'
      },
      Card: {
        // M3 Card: medium shape = 12dp
        borderRadius: '12px',
        boxShadow:
          '0 1px 2px rgba(0, 0, 0, 0.30), 0 1px 3px 1px rgba(0, 0, 0, 0.15)'
      },
      Input: {
        // M3 TextField: extra-small-top shape = 4dp top, 0 bottom
        borderRadius: '4px'
      },
      Tag: {
        // M3 Assist/Filter chip: small shape = 8dp
        borderRadius: '8px'
      },
      Dialog: {
        // M3 Dialog: extra-large shape = 28dp
        borderRadius: '28px'
      },
      DataTable: {
        borderRadius: '12px'
      },
      Tabs: {
        tabBorderRadius: '12px'
      },
      Menu: {
        // M3 Menu: extra-small shape = 4dp
        borderRadius: '4px'
      }
    }
  },
  // ═══════════════════════════════════════════════════
  // 3. Apple Human Interface Guidelines
  // ═══════════════════════════════════════════════════
  {
    name: 'Apple HIG',
    nameEn: 'Apple HIG',
    author: 'Naive UI',
    description: '严格遵循 Apple Human Interface Guidelines 设计规范',
    descriptionEn: 'Strictly following Apple Human Interface Guidelines',
    colors: ['#007AFF', '#34C759', '#FF9500', '#FF3B30'],
    overrides: {
      common: {
        // ── iOS System Blue ──
        primaryColor: '#007AFF',
        primaryColorHover: '#0A84FF',
        primaryColorPressed: '#0064D2',
        primaryColorSuppl: '#5AC8FA',
        // ── iOS System Teal ──
        infoColor: '#30B0C7',
        infoColorHover: '#40C8E0',
        infoColorPressed: '#289DAF',
        infoColorSuppl: '#64D2FF',
        // ── iOS System Green ──
        successColor: '#34C759',
        successColorHover: '#30D158',
        successColorPressed: '#248A3D',
        successColorSuppl: '#A8E6B0',
        // ── iOS System Orange ──
        warningColor: '#FF9500',
        warningColorHover: '#FF9F0A',
        warningColorPressed: '#C93400',
        warningColorSuppl: '#FFD60A',
        // ── iOS System Red ──
        errorColor: '#FF3B30',
        errorColorHover: '#FF453A',
        errorColorPressed: '#D70015',
        errorColorSuppl: '#FF6961',
        // ── HIG Label colors ──
        textColor1: 'rgba(0, 0, 0, 1.0)',
        textColor2: 'rgba(60, 60, 67, 0.6)',
        textColor3: 'rgba(60, 60, 67, 0.3)',
        textColorDisabled: 'rgba(60, 60, 67, 0.18)',
        placeholderColor: 'rgba(60, 60, 67, 0.3)',
        placeholderColorDisabled: 'rgba(60, 60, 67, 0.18)',
        // ── HIG Symbol colors ──
        iconColor: 'rgba(60, 60, 67, 0.6)',
        iconColorHover: 'rgba(0, 0, 0, 0.85)',
        iconColorPressed: 'rgba(60, 60, 67, 0.6)',
        iconColorDisabled: 'rgba(60, 60, 67, 0.18)',
        // ── HIG Separator ──
        borderColor: 'rgba(60, 60, 67, 0.29)',
        dividerColor: 'rgba(60, 60, 67, 0.12)',
        // ── HIG Corner radius: 10pt continuous ──
        borderRadius: '10px',
        borderRadiusSmall: '8px',
        // ── HIG Typography: SF Pro, body = 17pt, line-height 22pt ──
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
        fontFamilyMono:
          '"SF Mono", SFMono-Regular, ui-monospace, Menlo, Monaco, Consolas, monospace',
        fontWeight: '400',
        fontWeightStrong: '600',
        fontSize: '17px',
        fontSizeMini: '11px',
        fontSizeTiny: '13px',
        fontSizeSmall: '15px',
        fontSizeMedium: '17px',
        fontSizeLarge: '20px',
        fontSizeHuge: '22px',
        lineHeight: '1.29',
        // ── HIG Control heights ──
        heightMini: '18px',
        heightTiny: '24px',
        heightSmall: '28px',
        heightMedium: '34px',
        heightLarge: '44px',
        heightHuge: '50px',
        // ── HIG System backgrounds (Grouped) ──
        bodyColor: '#F2F2F7',
        cardColor: '#FFFFFF',
        modalColor: '#FFFFFF',
        popoverColor: '#FFFFFF',
        tableColor: '#FFFFFF',
        tableHeaderColor: '#F2F2F7',
        tableColorHover: 'rgba(0, 122, 255, 0.08)',
        tableColorStriped: '#F2F2F7',
        inputColor: '#FFFFFF',
        inputColorDisabled: 'rgba(120, 120, 128, 0.08)',
        // ── HIG Fill colors ──
        tagColor: 'rgba(120, 120, 128, 0.12)',
        avatarColor: 'rgba(120, 120, 128, 0.2)',
        codeColor: 'rgba(120, 120, 128, 0.08)',
        tabColor: '#FFFFFF',
        actionColor: '#F2F2F7',
        // ── HIG Interaction states ──
        hoverColor: 'rgba(120, 120, 128, 0.08)',
        pressedColor: 'rgba(120, 120, 128, 0.16)',
        buttonColor2: 'rgba(120, 120, 128, 0.16)',
        buttonColor2Hover: 'rgba(120, 120, 128, 0.24)',
        buttonColor2Pressed: 'rgba(120, 120, 128, 0.32)',
        progressRailColor: 'rgba(120, 120, 128, 0.16)',
        railColor: 'rgba(120, 120, 128, 0.16)',
        // ── Scrollbar: macOS native-like ──
        scrollbarColor: 'rgba(0, 0, 0, 0.15)',
        scrollbarColorHover: 'rgba(0, 0, 0, 0.35)',
        scrollbarWidth: '8px',
        scrollbarHeight: '8px',
        scrollbarBorderRadius: '4px',
        // ── HIG Shadows (subtle, layered) ──
        boxShadow1:
          '0 0.5px 1px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.04)',
        boxShadow2:
          '0 2px 8px rgba(0, 0, 0, 0.08), 0 0.5px 2px rgba(0, 0, 0, 0.06)',
        boxShadow3:
          '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)',
        // ── Opacity ──
        opacity1: '1.0',
        opacity2: '0.6',
        opacity3: '0.3',
        opacity4: '0.18',
        opacity5: '0.12',
        opacityDisabled: '0.3',
        // ── Close / Clear (SF Symbol gray tones) ──
        closeIconColor: 'rgba(60, 60, 67, 0.6)',
        closeIconColorHover: 'rgba(0, 0, 0, 0.85)',
        closeIconColorPressed: 'rgba(60, 60, 67, 0.6)',
        closeColorHover: 'rgba(120, 120, 128, 0.12)',
        closeColorPressed: 'rgba(120, 120, 128, 0.2)',
        clearColor: 'rgba(60, 60, 67, 0.3)',
        clearColorHover: 'rgba(60, 60, 67, 0.6)',
        clearColorPressed: 'rgba(60, 60, 67, 0.85)'
      },
      Button: {
        // HIG: large button radius ≈ height/2 for capsule style
        borderRadiusTiny: '6px',
        borderRadiusSmall: '8px',
        borderRadiusMedium: '10px',
        borderRadiusLarge: '22px',
        fontWeight: '600',
        fontWeightStrong: '600'
      },
      Card: {
        // HIG: grouped content card, continuous corner ~16pt
        borderRadius: '16px',
        boxShadow:
          '0 2px 8px rgba(0, 0, 0, 0.08), 0 0.5px 2px rgba(0, 0, 0, 0.06)'
      },
      Input: {
        // HIG: search bar / text field ~10pt
        borderRadius: '10px'
      },
      Tag: {
        // HIG: capsule / pill shape
        borderRadius: '9999px'
      },
      Dialog: {
        // HIG: alert / modal sheet ~14pt
        borderRadius: '14px'
      },
      DataTable: {
        borderRadius: '10px'
      },
      Tabs: {
        // HIG: segmented control ~9pt
        tabBorderRadius: '9px'
      },
      Menu: {
        // HIG: context menu / pull-down ~10pt
        borderRadius: '10px'
      }
    }
  },
  // ═══════════════════════════════════════════════════
  // 4. Element Plus
  // ═══════════════════════════════════════════════════
  {
    name: 'Element Plus',
    nameEn: 'Element Plus',
    author: 'Naive UI',
    description: '参考 Element Plus 的经典 Vue 组件库设计',
    descriptionEn: 'Inspired by Element Plus design system for Vue',
    colors: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C'],
    overrides: {
      common: {
        primaryColor: '#409EFF',
        primaryColorHover: '#66B1FF',
        primaryColorPressed: '#3A8EE6',
        primaryColorSuppl: '#A0CFFF',
        infoColor: '#909399',
        infoColorHover: '#A6A9AD',
        infoColorPressed: '#82848A',
        infoColorSuppl: '#C8C9CC',
        successColor: '#67C23A',
        successColorHover: '#85CE61',
        successColorPressed: '#5DAF34',
        successColorSuppl: '#B3E19D',
        warningColor: '#E6A23C',
        warningColorHover: '#EBB563',
        warningColorPressed: '#CF9236',
        warningColorSuppl: '#F3D19E',
        errorColor: '#F56C6C',
        errorColorHover: '#F78989',
        errorColorPressed: '#DD6161',
        errorColorSuppl: '#FAB6B6',
        textColor1: '#303133',
        textColor2: '#606266',
        textColor3: '#909399',
        textColorDisabled: '#A8ABB2',
        placeholderColor: '#A8ABB2',
        placeholderColorDisabled: '#C0C4CC',
        iconColor: '#606266',
        iconColorHover: '#303133',
        iconColorPressed: '#606266',
        iconColorDisabled: '#A8ABB2',
        borderColor: '#DCDFE6',
        dividerColor: '#DCDFE6',
        borderRadius: '4px',
        borderRadiusSmall: '2px',
        fontFamily:
          '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\u5FAE\u8F6F\u96C5\u9ED1", Arial, sans-serif',
        fontFamilyMono:
          '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
        fontWeight: '400',
        fontWeightStrong: '500',
        fontSize: '14px',
        fontSizeMini: '12px',
        fontSizeTiny: '12px',
        fontSizeSmall: '13px',
        fontSizeMedium: '14px',
        fontSizeLarge: '14px',
        fontSizeHuge: '16px',
        lineHeight: '1.5',
        heightMini: '16px',
        heightTiny: '24px',
        heightSmall: '32px',
        heightMedium: '32px',
        heightLarge: '40px',
        heightHuge: '40px',
        bodyColor: '#FFFFFF',
        cardColor: '#FFFFFF',
        modalColor: '#FFFFFF',
        popoverColor: '#FFFFFF',
        tableColor: '#FFFFFF',
        tableHeaderColor: '#F5F7FA',
        tableColorHover: '#F5F7FA',
        tableColorStriped: '#FAFAFA',
        inputColor: '#FFFFFF',
        inputColorDisabled: '#F5F7FA',
        tagColor: '#F0F2F5',
        avatarColor: '#C0C4CC',
        codeColor: '#F5F7FA',
        tabColor: '#FFFFFF',
        actionColor: '#F5F7FA',
        hoverColor: '#F5F7FA',
        pressedColor: '#EBEDF0',
        buttonColor2: '#F0F2F5',
        buttonColor2Hover: '#E6E8EB',
        buttonColor2Pressed: '#DCDFE6',
        progressRailColor: '#E4E7ED',
        railColor: '#E4E7ED',
        scrollbarColor: 'rgba(144, 147, 153, 0.3)',
        scrollbarColorHover: 'rgba(144, 147, 153, 0.5)',
        scrollbarWidth: '6px',
        scrollbarHeight: '6px',
        scrollbarBorderRadius: '4px',
        boxShadow1:
          '0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04)',
        boxShadow2: '0 2px 12px 0 rgba(0, 0, 0, 0.10)',
        boxShadow3: '0 2px 16px 0 rgba(0, 0, 0, 0.15)',
        opacity1: '0.85',
        opacity2: '0.65',
        opacity3: '0.45',
        opacity4: '0.25',
        opacity5: '0.15',
        opacityDisabled: '0.5',
        closeIconColor: '#909399',
        closeIconColorHover: '#606266',
        closeIconColorPressed: '#303133',
        closeColorHover: 'rgba(144, 147, 153, 0.12)',
        closeColorPressed: 'rgba(144, 147, 153, 0.2)',
        clearColor: '#A8ABB2',
        clearColorHover: '#909399',
        clearColorPressed: '#606266'
      },
      Button: {
        borderRadiusTiny: '2px',
        borderRadiusSmall: '4px',
        borderRadiusMedium: '4px',
        borderRadiusLarge: '4px',
        fontWeight: '500',
        fontWeightStrong: '500'
      },
      Card: {
        borderRadius: '4px',
        boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.10)'
      },
      Input: {
        borderRadius: '4px'
      },
      Tag: {
        borderRadius: '4px'
      },
      Dialog: {
        borderRadius: '4px'
      },
      DataTable: {
        borderRadius: '4px'
      },
      Tabs: {
        tabBorderRadius: '4px'
      },
      Menu: {
        borderRadius: '4px'
      }
    }
  },
  // ═══════════════════════════════════════════════════
  // 5. Arco Design (ByteDance)
  // ═══════════════════════════════════════════════════
  {
    name: 'Arco Design',
    nameEn: 'Arco Design',
    author: 'Naive UI',
    description: '参考字节跳动 Arco Design 设计系统',
    descriptionEn: 'Inspired by ByteDance Arco Design system',
    colors: ['#165DFF', '#00B42A', '#FF7D00', '#F53F3F'],
    overrides: {
      common: {
        primaryColor: '#165DFF',
        primaryColorHover: '#4080FF',
        primaryColorPressed: '#0E42D2',
        primaryColorSuppl: '#6AA1FF',
        infoColor: '#165DFF',
        infoColorHover: '#4080FF',
        infoColorPressed: '#0E42D2',
        infoColorSuppl: '#6AA1FF',
        successColor: '#00B42A',
        successColorHover: '#23C343',
        successColorPressed: '#009A29',
        successColorSuppl: '#7BE188',
        warningColor: '#FF7D00',
        warningColorHover: '#FF9A2E',
        warningColorPressed: '#D25F00',
        warningColorSuppl: '#FFB65D',
        errorColor: '#F53F3F',
        errorColorHover: '#F76560',
        errorColorPressed: '#CB2634',
        errorColorSuppl: '#F98981',
        textColor1: '#1D2129',
        textColor2: '#4E5969',
        textColor3: '#86909C',
        textColorDisabled: '#C9CDD4',
        placeholderColor: '#C9CDD4',
        placeholderColorDisabled: '#C9CDD4',
        iconColor: '#4E5969',
        iconColorHover: '#1D2129',
        iconColorPressed: '#4E5969',
        iconColorDisabled: '#C9CDD4',
        borderColor: '#E5E6EB',
        dividerColor: '#E5E6EB',
        borderRadius: '4px',
        borderRadiusSmall: '2px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
        fontFamilyMono:
          '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
        fontWeight: '400',
        fontWeightStrong: '500',
        fontSize: '14px',
        fontSizeMini: '12px',
        fontSizeTiny: '12px',
        fontSizeSmall: '14px',
        fontSizeMedium: '14px',
        fontSizeLarge: '14px',
        fontSizeHuge: '16px',
        lineHeight: '1.5715',
        heightMini: '16px',
        heightTiny: '24px',
        heightSmall: '28px',
        heightMedium: '32px',
        heightLarge: '36px',
        heightHuge: '44px',
        bodyColor: '#F2F3F5',
        cardColor: '#FFFFFF',
        modalColor: '#FFFFFF',
        popoverColor: '#FFFFFF',
        tableColor: '#FFFFFF',
        tableHeaderColor: '#F2F3F5',
        tableColorHover: '#F7F8FA',
        tableColorStriped: '#FAFAFA',
        inputColor: '#F2F3F5',
        inputColorDisabled: '#F2F3F5',
        tagColor: '#F2F3F5',
        avatarColor: '#C9CDD4',
        codeColor: '#F2F3F5',
        tabColor: '#FFFFFF',
        actionColor: '#F7F8FA',
        hoverColor: '#F2F3F5',
        pressedColor: '#E8E8E8',
        buttonColor2: '#F2F3F5',
        buttonColor2Hover: '#E5E6EB',
        buttonColor2Pressed: '#C9CDD4',
        progressRailColor: '#F2F3F5',
        railColor: '#F2F3F5',
        scrollbarColor: 'rgba(201, 205, 212, 0.5)',
        scrollbarColorHover: 'rgba(201, 205, 212, 0.8)',
        scrollbarWidth: '6px',
        scrollbarHeight: '6px',
        scrollbarBorderRadius: '3px',
        boxShadow1: '0 2px 5px rgba(0, 0, 0, 0.06)',
        boxShadow2: '0 4px 10px rgba(0, 0, 0, 0.10)',
        boxShadow3: '0 8px 20px rgba(0, 0, 0, 0.12)',
        opacity1: '0.9',
        opacity2: '0.7',
        opacity3: '0.4',
        opacity4: '0.25',
        opacity5: '0.15',
        opacityDisabled: '0.5',
        closeIconColor: '#86909C',
        closeIconColorHover: '#4E5969',
        closeIconColorPressed: '#1D2129',
        closeColorHover: '#F2F3F5',
        closeColorPressed: '#E5E6EB',
        clearColor: '#C9CDD4',
        clearColorHover: '#86909C',
        clearColorPressed: '#4E5969'
      },
      Button: {
        borderRadiusTiny: '2px',
        borderRadiusSmall: '2px',
        borderRadiusMedium: '4px',
        borderRadiusLarge: '4px',
        fontWeight: '400',
        fontWeightStrong: '500'
      },
      Card: {
        borderRadius: '4px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.10)'
      },
      Input: {
        borderRadius: '4px'
      },
      Tag: {
        borderRadius: '2px'
      },
      Dialog: {
        borderRadius: '4px'
      },
      DataTable: {
        borderRadius: '4px'
      },
      Tabs: {
        tabBorderRadius: '4px'
      },
      Menu: {
        borderRadius: '4px'
      }
    }
  }
]
