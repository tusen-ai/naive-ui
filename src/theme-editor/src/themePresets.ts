import type { GlobalThemeOverrides } from '../../config-provider'

export interface ThemePreset {
  name: string
  nameEn: string
  author: string
  description: string
  descriptionEn: string
  overrides: GlobalThemeOverrides
  darkOverrides?: GlobalThemeOverrides
}

export const themePresets: ThemePreset[] = [
  // ═══════════════════════════════════════════════════
  // 1. Ant Design 6
  // https://ant.design/docs/react/customize-theme
  // Seed Token: colorPrimary=#1677ff, borderRadius=6,
  //   fontSize=14, controlHeight=32
  // ═══════════════════════════════════════════════════
  {
    name: 'Ant Design',
    nameEn: 'Ant Design',
    author: 'Naive UI',
    description: '参考 Ant Design 6 的设计语言',
    descriptionEn: 'Classic enterprise design inspired by Ant Design 6',
    overrides: {
      common: {
        // --- Colors ---
        primaryColor: '#1677ff',
        primaryColorHover: '#4096ff',
        primaryColorPressed: '#0958d9',
        primaryColorSuppl: '#4096ff',
        infoColor: '#1677ff',
        infoColorHover: '#69b1ff',
        infoColorPressed: '#0958d9',
        infoColorSuppl: '#69b1ff',
        successColor: '#52c41a',
        successColorHover: '#95de64',
        successColorPressed: '#389e0d',
        successColorSuppl: '#95de64',
        warningColor: '#faad14',
        warningColorHover: '#ffd666',
        warningColorPressed: '#d48806',
        warningColorSuppl: '#ffd666',
        errorColor: '#ff4d4f',
        errorColorHover: '#ff7875',
        errorColorPressed: '#d9363e',
        errorColorSuppl: '#ff7875',
        // --- Text ---
        textColor1: 'rgba(0, 0, 0, 0.88)',
        textColor2: 'rgba(0, 0, 0, 0.65)',
        textColor3: 'rgba(0, 0, 0, 0.45)',
        textColorDisabled: 'rgba(0, 0, 0, 0.25)',
        placeholderColor: 'rgba(0, 0, 0, 0.25)',
        // --- Border & Divider ---
        borderColor: '#d9d9d9',
        dividerColor: '#f0f0f0',
        borderRadius: '6px',
        borderRadiusSmall: '4px',
        // --- Background ---
        bodyColor: '#ffffff',
        cardColor: '#ffffff',
        modalColor: '#ffffff',
        popoverColor: '#ffffff',
        tableColor: '#ffffff',
        tableHeaderColor: '#fafafa',
        inputColor: '#ffffff',
        actionColor: '#fafafa',
        hoverColor: '#f5f5f5',
        pressedColor: '#e6e6e6',
        tagColor: '#fafafa',
        // --- Typography ---
        fontFamily:
          '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, \'Noto Sans\', sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\', \'Noto Color Emoji\'',
        fontSize: '14px',
        // --- Sizing ---
        heightTiny: '22px',
        heightSmall: '24px',
        heightMedium: '32px',
        heightLarge: '40px',
        // --- Shadow (Ant Design boxShadow / boxShadowSecondary / boxShadowTertiary) ---
        boxShadow1:
          '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
        boxShadow2:
          '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        boxShadow3:
          '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'
      }
    },
    darkOverrides: {
      common: {
        // --- Colors (Ant Design dark algorithm) ---
        primaryColor: '#1668dc',
        primaryColorHover: '#3c89e8',
        primaryColorPressed: '#1554ad',
        primaryColorSuppl: '#3c89e8',
        infoColor: '#1668dc',
        infoColorHover: '#3c89e8',
        infoColorPressed: '#1554ad',
        infoColorSuppl: '#3c89e8',
        successColor: '#49aa19',
        successColorHover: '#6abe39',
        successColorPressed: '#3c8618',
        successColorSuppl: '#6abe39',
        warningColor: '#d89614',
        warningColorHover: '#e8b339',
        warningColorPressed: '#aa7714',
        warningColorSuppl: '#e8b339',
        errorColor: '#dc4446',
        errorColorHover: '#e86e6b',
        errorColorPressed: '#ad393a',
        errorColorSuppl: '#e86e6b',
        // --- Text ---
        textColor1: 'rgba(255, 255, 255, 0.85)',
        textColor2: 'rgba(255, 255, 255, 0.65)',
        textColor3: 'rgba(255, 255, 255, 0.45)',
        textColorDisabled: 'rgba(255, 255, 255, 0.25)',
        placeholderColor: 'rgba(255, 255, 255, 0.25)',
        // --- Border & Divider ---
        borderColor: '#424242',
        dividerColor: '#303030',
        borderRadius: '6px',
        borderRadiusSmall: '4px',
        // --- Background ---
        bodyColor: '#141414',
        cardColor: '#1f1f1f',
        modalColor: '#1f1f1f',
        popoverColor: '#1f1f1f',
        tableColor: '#1f1f1f',
        tableHeaderColor: '#1d1d1d',
        inputColor: 'rgba(255, 255, 255, 0.04)',
        actionColor: '#1d1d1d',
        hoverColor: 'rgba(255, 255, 255, 0.08)',
        pressedColor: 'rgba(255, 255, 255, 0.04)',
        tagColor: 'rgba(255, 255, 255, 0.08)',
        // --- Typography ---
        fontFamily:
          '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, \'Noto Sans\', sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\', \'Noto Color Emoji\'',
        fontSize: '14px',
        // --- Sizing ---
        heightTiny: '22px',
        heightSmall: '24px',
        heightMedium: '32px',
        heightLarge: '40px',
        // --- Shadow ---
        boxShadow1:
          '0 1px 2px 0 rgba(0, 0, 0, 0.16), 0 1px 6px -1px rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.09)',
        boxShadow2:
          '0 6px 16px 0 rgba(0, 0, 0, 0.32), 0 3px 6px -4px rgba(0, 0, 0, 0.48), 0 9px 28px 8px rgba(0, 0, 0, 0.2)',
        boxShadow3:
          '0 6px 16px 0 rgba(0, 0, 0, 0.32), 0 3px 6px -4px rgba(0, 0, 0, 0.48), 0 9px 28px 8px rgba(0, 0, 0, 0.2)'
      }
    }
  },
  // ═══════════════════════════════════════════════════
  // 2. Material Design 3 (Material You)
  // https://m3.material.io/styles
  // Baseline: primary=#6750A4, surface=#FEF7FF
  // Shape: medium=12dp, small=8dp
  // Elevation: level1..level5 box-shadow
  // ═══════════════════════════════════════════════════
  {
    name: 'Material Design',
    nameEn: 'Material Design',
    author: 'Naive UI',
    description: '严格遵循 Material Design 3 (Material You) 官方设计规范',
    descriptionEn:
      'Strictly following Material Design 3 (Material You) official specs',
    overrides: {
      common: {
        // --- Colors (MD3 baseline light) ---
        primaryColor: '#6750A4',
        primaryColorHover: '#7965AF',
        primaryColorPressed: '#4F378B',
        primaryColorSuppl: '#7965AF',
        infoColor: '#6750A4',
        infoColorHover: '#7965AF',
        infoColorPressed: '#4F378B',
        infoColorSuppl: '#7965AF',
        successColor: '#386A20',
        successColorHover: '#4E8536',
        successColorPressed: '#2B5418',
        successColorSuppl: '#4E8536',
        warningColor: '#7D5700',
        warningColorHover: '#996B00',
        warningColorPressed: '#624400',
        warningColorSuppl: '#996B00',
        errorColor: '#B3261E',
        errorColorHover: '#C5453D',
        errorColorPressed: '#8C1D18',
        errorColorSuppl: '#C5453D',
        // --- Text (MD3 onSurface / onSurfaceVariant) ---
        textColor1: '#1D1B20',
        textColor2: '#49454F',
        textColor3: '#79747E',
        textColorDisabled: 'rgba(29, 27, 32, 0.38)',
        placeholderColor: 'rgba(29, 27, 32, 0.38)',
        // --- Border & Divider (MD3 outline / outlineVariant) ---
        borderColor: '#79747E',
        dividerColor: '#CAC4D0',
        borderRadius: '12px',
        borderRadiusSmall: '8px',
        // --- Background (MD3 surface / surfaceContainer) ---
        bodyColor: '#FEF7FF',
        cardColor: '#F3EDF7',
        modalColor: '#ECE6F0',
        popoverColor: '#F3EDF7',
        tableColor: '#FEF7FF',
        tableHeaderColor: '#F3EDF7',
        inputColor: '#F3EDF7',
        actionColor: '#F3EDF7',
        hoverColor: 'rgba(103, 80, 164, 0.08)',
        pressedColor: 'rgba(103, 80, 164, 0.12)',
        tagColor: '#E8DEF8',
        // --- Typography ---
        fontSize: '14px',
        fontFamily:
          '\'Roboto\', \'Noto Sans\', system-ui, -apple-system, sans-serif',
        // --- Shadow (MD3 elevation level 1/2/3) ---
        boxShadow1: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
        boxShadow2:
          '0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.3)',
        boxShadow3:
          '0 11px 7px 0 rgba(0, 0, 0, 0.19), 0 13px 25px 0 rgba(0, 0, 0, 0.3)'
      }
    },
    darkOverrides: {
      common: {
        // --- Colors (MD3 baseline dark) ---
        primaryColor: '#D0BCFF',
        primaryColorHover: '#DDD0FF',
        primaryColorPressed: '#B69DF8',
        primaryColorSuppl: '#DDD0FF',
        infoColor: '#D0BCFF',
        infoColorHover: '#DDD0FF',
        infoColorPressed: '#B69DF8',
        infoColorSuppl: '#DDD0FF',
        successColor: '#7DD75D',
        successColorHover: '#93E474',
        successColorPressed: '#68C248',
        successColorSuppl: '#93E474',
        warningColor: '#FFB951',
        warningColorHover: '#FFC970',
        warningColorPressed: '#E8A43D',
        warningColorSuppl: '#FFC970',
        errorColor: '#F2B8B5',
        errorColorHover: '#F6CDC9',
        errorColorPressed: '#E09995',
        errorColorSuppl: '#F6CDC9',
        // --- Text (MD3 dark onSurface / onSurfaceVariant) ---
        textColor1: '#E6E0E9',
        textColor2: '#CAC4D0',
        textColor3: '#938F99',
        textColorDisabled: 'rgba(230, 224, 233, 0.38)',
        placeholderColor: 'rgba(230, 224, 233, 0.38)',
        // --- Border & Divider ---
        borderColor: '#938F99',
        dividerColor: '#49454F',
        borderRadius: '12px',
        borderRadiusSmall: '8px',
        // --- Background (MD3 dark surface) ---
        bodyColor: '#141218',
        cardColor: '#211F26',
        modalColor: '#2B2930',
        popoverColor: '#2B2930',
        tableColor: '#141218',
        tableHeaderColor: '#211F26',
        inputColor: '#211F26',
        actionColor: '#211F26',
        hoverColor: 'rgba(208, 188, 255, 0.08)',
        pressedColor: 'rgba(208, 188, 255, 0.12)',
        tagColor: 'rgba(208, 188, 255, 0.16)',
        // --- Typography ---
        fontSize: '14px',
        fontFamily:
          '\'Roboto\', \'Noto Sans\', system-ui, -apple-system, sans-serif',
        // --- Shadow ---
        boxShadow1: '0 1px 4px 0 rgba(0, 0, 0, 0.6)',
        boxShadow2:
          '0 2px 2px 0 rgba(0, 0, 0, 0.4), 0 6px 10px 0 rgba(0, 0, 0, 0.5)',
        boxShadow3:
          '0 11px 7px 0 rgba(0, 0, 0, 0.38), 0 13px 25px 0 rgba(0, 0, 0, 0.5)'
      }
    }
  },
  // ═══════════════════════════════════════════════════
  // 3. Apple Human Interface Guidelines
  // https://developer.apple.com/design/human-interface-guidelines
  // System Blue: #007AFF, systemBackground: #F2F2F7
  // iOS corner radius: ~10px, SF Pro font
  // ═══════════════════════════════════════════════════
  {
    name: 'Apple HIG',
    nameEn: 'Apple HIG',
    author: 'Naive UI',
    description: '严格遵循 Apple Human Interface Guidelines 设计规范',
    descriptionEn: 'Strictly following Apple Human Interface Guidelines',
    overrides: {
      common: {
        // --- Colors (iOS system colors - light) ---
        primaryColor: '#007AFF',
        primaryColorHover: '#0A84FF',
        primaryColorPressed: '#0056B3',
        primaryColorSuppl: '#0A84FF',
        infoColor: '#5856D6',
        infoColorHover: '#6E6CE0',
        infoColorPressed: '#4240A8',
        infoColorSuppl: '#6E6CE0',
        successColor: '#34C759',
        successColorHover: '#30D158',
        successColorPressed: '#248A3D',
        successColorSuppl: '#30D158',
        warningColor: '#FF9500',
        warningColorHover: '#FF9F0A',
        warningColorPressed: '#C93C00',
        warningColorSuppl: '#FF9F0A',
        errorColor: '#FF3B30',
        errorColorHover: '#FF453A',
        errorColorPressed: '#D70015',
        errorColorSuppl: '#FF453A',
        // --- Text (iOS semantic label colors) ---
        textColor1: '#000000',
        textColor2: 'rgba(60, 60, 67, 0.6)',
        textColor3: 'rgba(60, 60, 67, 0.3)',
        textColorDisabled: 'rgba(60, 60, 67, 0.18)',
        placeholderColor: 'rgba(60, 60, 67, 0.3)',
        // --- Border & Divider ---
        borderColor: 'rgba(0, 0, 0, 0.12)',
        dividerColor: 'rgba(60, 60, 67, 0.12)',
        borderRadius: '10px',
        borderRadiusSmall: '6px',
        // --- Background (iOS systemBackground) ---
        bodyColor: '#F2F2F7',
        cardColor: '#FFFFFF',
        modalColor: '#FFFFFF',
        popoverColor: '#FFFFFF',
        tableColor: '#FFFFFF',
        tableHeaderColor: '#F2F2F7',
        inputColor: '#FFFFFF',
        actionColor: '#F2F2F7',
        hoverColor: 'rgba(0, 122, 255, 0.06)',
        pressedColor: 'rgba(0, 122, 255, 0.1)',
        tagColor: 'rgba(0, 122, 255, 0.08)',
        // --- Typography (SF Pro) ---
        fontFamily:
          '-apple-system, BlinkMacSystemFont, \'SF Pro Text\', \'SF Pro Display\', \'Helvetica Neue\', Arial, sans-serif',
        fontSize: '14px',
        // --- Sizing ---
        heightSmall: '28px',
        heightMedium: '34px',
        heightLarge: '40px',
        // --- Shadow (iOS-style subtle shadows) ---
        boxShadow1:
          '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        boxShadow2:
          '0 4px 14px 0 rgba(0, 0, 0, 0.1), 0 2px 6px 0 rgba(0, 0, 0, 0.06)',
        boxShadow3:
          '0 12px 28px 0 rgba(0, 0, 0, 0.12), 0 4px 10px 0 rgba(0, 0, 0, 0.06)'
      }
    },
    darkOverrides: {
      common: {
        // --- Colors (iOS system colors - dark) ---
        primaryColor: '#0A84FF',
        primaryColorHover: '#409CFF',
        primaryColorPressed: '#0071E3',
        primaryColorSuppl: '#409CFF',
        infoColor: '#5E5CE6',
        infoColorHover: '#7876EB',
        infoColorPressed: '#4946B8',
        infoColorSuppl: '#7876EB',
        successColor: '#30D158',
        successColorHover: '#4ADE71',
        successColorPressed: '#24A644',
        successColorSuppl: '#4ADE71',
        warningColor: '#FF9F0A',
        warningColorHover: '#FFB340',
        warningColorPressed: '#CC7E08',
        warningColorSuppl: '#FFB340',
        errorColor: '#FF453A',
        errorColorHover: '#FF6961',
        errorColorPressed: '#D32F2F',
        errorColorSuppl: '#FF6961',
        // --- Text (iOS dark label colors) ---
        textColor1: '#FFFFFF',
        textColor2: 'rgba(235, 235, 245, 0.6)',
        textColor3: 'rgba(235, 235, 245, 0.3)',
        textColorDisabled: 'rgba(235, 235, 245, 0.18)',
        placeholderColor: 'rgba(235, 235, 245, 0.3)',
        // --- Border & Divider ---
        borderColor: 'rgba(84, 84, 88, 0.6)',
        dividerColor: 'rgba(84, 84, 88, 0.36)',
        borderRadius: '10px',
        borderRadiusSmall: '6px',
        // --- Background (iOS dark systemBackground) ---
        bodyColor: '#000000',
        cardColor: '#1C1C1E',
        modalColor: '#2C2C2E',
        popoverColor: '#2C2C2E',
        tableColor: '#1C1C1E',
        tableHeaderColor: '#1C1C1E',
        inputColor: '#1C1C1E',
        actionColor: '#1C1C1E',
        hoverColor: 'rgba(10, 132, 255, 0.1)',
        pressedColor: 'rgba(10, 132, 255, 0.16)',
        tagColor: 'rgba(10, 132, 255, 0.12)',
        // --- Typography ---
        fontFamily:
          '-apple-system, BlinkMacSystemFont, \'SF Pro Text\', \'SF Pro Display\', \'Helvetica Neue\', Arial, sans-serif',
        fontSize: '14px',
        // --- Sizing ---
        heightSmall: '28px',
        heightMedium: '34px',
        heightLarge: '40px',
        // --- Shadow ---
        boxShadow1:
          '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
        boxShadow2:
          '0 4px 14px 0 rgba(0, 0, 0, 0.35), 0 2px 6px 0 rgba(0, 0, 0, 0.25)',
        boxShadow3:
          '0 12px 28px 0 rgba(0, 0, 0, 0.4), 0 4px 10px 0 rgba(0, 0, 0, 0.25)'
      }
    }
  },
  // ═══════════════════════════════════════════════════
  // 4. Element Plus
  // https://element-plus.org
  // Source: packages/theme-chalk/src/common/var.scss
  // Primary: #409EFF, borderRadius: 4px
  // ═══════════════════════════════════════════════════
  {
    name: 'Element Plus',
    nameEn: 'Element Plus',
    author: 'Naive UI',
    description: '参考 Element Plus 的经典 Vue 组件库设计',
    descriptionEn: 'Inspired by Element Plus design system for Vue',
    overrides: {
      common: {
        // --- Colors ---
        primaryColor: '#409EFF',
        primaryColorHover: '#66b1ff',
        primaryColorPressed: '#3a8ee6',
        primaryColorSuppl: '#66b1ff',
        infoColor: '#909399',
        infoColorHover: '#a6a9ad',
        infoColorPressed: '#82848a',
        infoColorSuppl: '#a6a9ad',
        successColor: '#67C23A',
        successColorHover: '#85ce61',
        successColorPressed: '#5daf34',
        successColorSuppl: '#85ce61',
        warningColor: '#E6A23C',
        warningColorHover: '#ebb563',
        warningColorPressed: '#cf9236',
        warningColorSuppl: '#ebb563',
        errorColor: '#F56C6C',
        errorColorHover: '#f78989',
        errorColorPressed: '#dd6161',
        errorColorSuppl: '#f78989',
        // --- Text (Element Plus text-color) ---
        textColor1: '#303133',
        textColor2: '#606266',
        textColor3: '#909399',
        textColorDisabled: '#c0c4cc',
        placeholderColor: '#a8abb2',
        // --- Border & Divider ---
        borderColor: '#DCDFE6',
        dividerColor: '#EBEEF5',
        borderRadius: '4px',
        borderRadiusSmall: '2px',
        // --- Background ---
        bodyColor: '#FFFFFF',
        cardColor: '#FFFFFF',
        modalColor: '#FFFFFF',
        popoverColor: '#FFFFFF',
        tableColor: '#FFFFFF',
        tableHeaderColor: '#FFFFFF',
        inputColor: '#FFFFFF',
        actionColor: '#f5f7fa',
        hoverColor: '#f5f7fa',
        pressedColor: '#e6e8eb',
        tagColor: '#f0f2f5',
        // --- Typography ---
        fontFamily:
          '\'Helvetica Neue\', Helvetica, \'PingFang SC\', \'Hiragino Sans GB\', \'Microsoft YaHei\', \'微软雅黑\', Arial, sans-serif',
        fontSize: '14px',
        // --- Sizing ---
        heightTiny: '22px',
        heightSmall: '24px',
        heightMedium: '32px',
        heightLarge: '40px',
        // --- Shadow (Element Plus box-shadow-lighter / box-shadow-light / box-shadow) ---
        boxShadow1: '0 0 6px rgba(0, 0, 0, 0.12)',
        boxShadow2: '0 0 12px rgba(0, 0, 0, 0.12)',
        boxShadow3:
          '0 12px 32px 4px rgba(0, 0, 0, 0.04), 0 8px 20px rgba(0, 0, 0, 0.08)'
      }
    },
    darkOverrides: {
      common: {
        // --- Colors (same base hues, dark-adapted) ---
        primaryColor: '#409EFF',
        primaryColorHover: '#66b1ff',
        primaryColorPressed: '#3a8ee6',
        primaryColorSuppl: '#66b1ff',
        infoColor: '#909399',
        infoColorHover: '#a6a9ad',
        infoColorPressed: '#82848a',
        infoColorSuppl: '#a6a9ad',
        successColor: '#67C23A',
        successColorHover: '#85ce61',
        successColorPressed: '#5daf34',
        successColorSuppl: '#85ce61',
        warningColor: '#E6A23C',
        warningColorHover: '#ebb563',
        warningColorPressed: '#cf9236',
        warningColorSuppl: '#ebb563',
        errorColor: '#F56C6C',
        errorColorHover: '#f78989',
        errorColorPressed: '#dd6161',
        errorColorSuppl: '#f78989',
        // --- Text (Element Plus dark text-color) ---
        textColor1: '#e5eaf3',
        textColor2: '#cfd3dc',
        textColor3: '#a3a6ad',
        textColorDisabled: 'rgba(255, 255, 255, 0.4)',
        placeholderColor: 'rgba(255, 255, 255, 0.55)',
        // --- Border & Divider (Element Plus dark) ---
        borderColor: '#4c4d4f',
        dividerColor: '#363637',
        borderRadius: '4px',
        borderRadiusSmall: '2px',
        // --- Background (Element Plus dark: page=#0a0a0a, bg=#141414, overlay=#1d1e1f) ---
        bodyColor: '#0a0a0a',
        cardColor: '#1d1e1f',
        modalColor: '#1d1e1f',
        popoverColor: '#1d1e1f',
        tableColor: '#141414',
        tableHeaderColor: '#141414',
        inputColor: 'rgba(255, 255, 255, 0.04)',
        actionColor: '#141414',
        hoverColor: 'rgba(255, 255, 255, 0.08)',
        pressedColor: 'rgba(255, 255, 255, 0.04)',
        tagColor: 'rgba(255, 255, 255, 0.08)',
        // --- Typography ---
        fontFamily:
          '\'Helvetica Neue\', Helvetica, \'PingFang SC\', \'Hiragino Sans GB\', \'Microsoft YaHei\', \'微软雅黑\', Arial, sans-serif',
        fontSize: '14px',
        // --- Sizing ---
        heightTiny: '22px',
        heightSmall: '24px',
        heightMedium: '32px',
        heightLarge: '40px',
        // --- Shadow (Element Plus dark box-shadows with higher opacity) ---
        boxShadow1: '0 0 6px rgba(0, 0, 0, 0.72)',
        boxShadow2: '0 0 12px rgba(0, 0, 0, 0.72)',
        boxShadow3:
          '0 12px 32px 4px rgba(0, 0, 0, 0.36), 0 8px 20px rgba(0, 0, 0, 0.72)'
      }
    }
  },
  // ═══════════════════════════════════════════════════
  // 5. Arco Design (ByteDance)
  // https://arco.design
  // Source: components/style/theme/global.less, colors.less
  // Primary: #165DFF (arcoblue-6)
  // border-radius-small=2px, medium=4px
  // ═══════════════════════════════════════════════════
  {
    name: 'Arco Design',
    nameEn: 'Arco Design',
    author: 'Naive UI',
    description: '参考字节跳动 Arco Design 设计系统',
    descriptionEn: 'Inspired by ByteDance Arco Design system',
    overrides: {
      common: {
        // --- Colors (Arco palette light) ---
        primaryColor: '#165DFF',
        primaryColorHover: '#4080FF',
        primaryColorPressed: '#0E42D2',
        primaryColorSuppl: '#4080FF',
        infoColor: '#165DFF',
        infoColorHover: '#4080FF',
        infoColorPressed: '#0E42D2',
        infoColorSuppl: '#4080FF',
        successColor: '#00B42A',
        successColorHover: '#23C343',
        successColorPressed: '#009A29',
        successColorSuppl: '#23C343',
        warningColor: '#FF7D00',
        warningColorHover: '#FF9A2E',
        warningColorPressed: '#D25F00',
        warningColorSuppl: '#FF9A2E',
        errorColor: '#F53F3F',
        errorColorHover: '#F76560',
        errorColorPressed: '#CB2634',
        errorColorSuppl: '#F76560',
        // --- Text (Arco gray-10 / gray-8 / gray-6) ---
        textColor1: '#1D2129',
        textColor2: '#4E5969',
        textColor3: '#86909C',
        textColorDisabled: '#C9CDD4',
        placeholderColor: '#C9CDD4',
        // --- Border & Divider (Arco gray-3 / gray-2) ---
        borderColor: '#E5E6EB',
        dividerColor: '#F2F3F5',
        borderRadius: '4px',
        borderRadiusSmall: '2px',
        // --- Background (Arco gray-1 for page, white for card) ---
        bodyColor: '#F7F8FA',
        cardColor: '#FFFFFF',
        modalColor: '#FFFFFF',
        popoverColor: '#FFFFFF',
        tableColor: '#FFFFFF',
        tableHeaderColor: '#F7F8FA',
        inputColor: '#FFFFFF',
        actionColor: '#F7F8FA',
        hoverColor: '#F2F3F5',
        pressedColor: '#E5E6EB',
        tagColor: '#F2F3F5',
        // --- Typography ---
        fontSize: '14px',
        // --- Sizing ---
        heightTiny: '22px',
        heightSmall: '28px',
        heightMedium: '32px',
        heightLarge: '36px',
        // --- Shadow (Arco shadow1-down / shadow2-down / shadow3-down) ---
        boxShadow1: '0 2px 5px rgba(0, 0, 0, 0.1)',
        boxShadow2: '0 4px 10px rgba(0, 0, 0, 0.1)',
        boxShadow3: '0 8px 20px rgba(0, 0, 0, 0.1)'
      }
    },
    darkOverrides: {
      common: {
        // --- Colors (Arco dark palette) ---
        primaryColor: '#3C7EFF',
        primaryColorHover: '#5E9AFF',
        primaryColorPressed: '#1D5FD8',
        primaryColorSuppl: '#5E9AFF',
        infoColor: '#3C7EFF',
        infoColorHover: '#5E9AFF',
        infoColorPressed: '#1D5FD8',
        infoColorSuppl: '#5E9AFF',
        successColor: '#27C346',
        successColorHover: '#4CD263',
        successColorPressed: '#1CA338',
        successColorSuppl: '#4CD263',
        warningColor: '#FF9A2E',
        warningColorHover: '#FFB357',
        warningColorPressed: '#D67D1A',
        warningColorSuppl: '#FFB357',
        errorColor: '#F76560',
        errorColorHover: '#F98981',
        errorColorPressed: '#CB4446',
        errorColorSuppl: '#F98981',
        // --- Text (Arco dark text) ---
        textColor1: 'rgba(255, 255, 255, 0.9)',
        textColor2: 'rgba(255, 255, 255, 0.7)',
        textColor3: 'rgba(255, 255, 255, 0.5)',
        textColorDisabled: 'rgba(255, 255, 255, 0.3)',
        placeholderColor: 'rgba(255, 255, 255, 0.3)',
        // --- Border & Divider (Arco dark) ---
        borderColor: '#333335',
        dividerColor: '#2E2E30',
        borderRadius: '4px',
        borderRadiusSmall: '2px',
        // --- Background (Arco dark-color-bg) ---
        bodyColor: '#17171A',
        cardColor: '#232324',
        modalColor: '#2A2A2B',
        popoverColor: '#373739',
        tableColor: '#232324',
        tableHeaderColor: '#232324',
        inputColor: 'rgba(255, 255, 255, 0.08)',
        actionColor: '#232324',
        hoverColor: 'rgba(255, 255, 255, 0.04)',
        pressedColor: 'rgba(255, 255, 255, 0.08)',
        tagColor: 'rgba(255, 255, 255, 0.08)',
        // --- Typography ---
        fontSize: '14px',
        // --- Sizing ---
        heightTiny: '22px',
        heightSmall: '28px',
        heightMedium: '32px',
        heightLarge: '36px',
        // --- Shadow (Arco dark shadows - deeper opacity) ---
        boxShadow1: '0 2px 5px rgba(0, 0, 0, 0.3)',
        boxShadow2: '0 4px 10px rgba(0, 0, 0, 0.3)',
        boxShadow3: '0 8px 20px rgba(0, 0, 0, 0.3)'
      }
    }
  }
]
