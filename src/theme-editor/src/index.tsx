import type { GlobalThemeOverrides } from '../../config-provider'
import { computed, defineComponent, Fragment, h, inject, ref, watch } from 'vue'
import { NConfigProvider } from '../../config-provider'
import { configProviderInjectionKey } from '../../config-provider/src/context'
import { NFloatButton } from '../../float-button'
import { NIcon } from '../../icon'
import ThemeEditor from './ThemeEditor'
import ThemeStore from './ThemeStore'

function renderColorWandIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '1em', height: '1em', color: 'currentColor' }}
    >
      <path
        d="M13.5 1C13.7761 1 14 1.22386 14 1.5V2H14.5C14.7761 2 15 2.22386 15 2.5C15 2.77614 14.7761 3 14.5 3H14V3.5C14 3.77614 13.7761 4 13.5 4C13.2239 4 13 3.77614 13 3.5V3H12.5C12.2239 3 12 2.77614 12 2.5C12 2.22386 12.2239 2 12.5 2H13V1.5C13 1.22386 13.2239 1 13.5 1Z"
        fill="currentColor"
      />
      <path
        d="M3.5 3C3.77615 3 4 3.22386 4 3.5V4H4.5C4.77615 4 5 4.22386 5 4.5C5 4.77614 4.77615 5 4.5 5H4V5.5C4 5.77614 3.77615 6 3.5 6C3.22386 6 3 5.77614 3 5.5V5H2.5C2.22386 5 2 4.77614 2 4.5C2 4.22386 2.22386 4 2.5 4H3V3.5C3 3.22386 3.22386 3 3.5 3Z"
        fill="currentColor"
      />
      <path
        d="M12.5 12C12.7761 12 13 11.7761 13 11.5C13 11.2239 12.7761 11 12.5 11H12V10.5C12 10.2239 11.7761 10 11.5 10C11.2239 10 11 10.2239 11 10.5V11H10.5C10.2239 11 10 11.2239 10 11.5C10 11.7761 10.2239 12 10.5 12H11V12.5C11 12.7761 11.2239 13 11.5 13C11.7761 13 12 12.7761 12 12.5V12H12.5Z"
        fill="currentColor"
      />
      <path
        d="M8.72956 4.56346C9.4771 3.81592 10.6891 3.81592 11.4367 4.56347C12.1842 5.31102 12.1842 6.52303 11.4367 7.27058L4.26679 14.4404C3.51924 15.1879 2.30723 15.1879 1.55968 14.4404C0.812134 13.6928 0.812138 12.4808 1.55969 11.7333L8.72956 4.56346ZM8.25002 6.4572L2.26679 12.4404C1.90977 12.7974 1.90977 13.3763 2.26679 13.7333C2.62381 14.0903 3.20266 14.0903 3.55968 13.7333L9.54292 7.75009L8.25002 6.4572ZM10.25 7.04299L10.7295 6.56347C11.0866 6.20645 11.0866 5.6276 10.7296 5.27057C10.3725 4.91355 9.79368 4.91355 9.43666 5.27057L8.95713 5.7501L10.25 7.04299Z"
        fill="currentColor"
      />
    </svg>
  )
}

function renderPaletteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '1em', height: '1em', color: 'currentColor' }}
    >
      <path
        d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.2-.64-1.67a.528.528 0 01-.13-.33c0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
        fill="currentColor"
      />
    </svg>
  )
}

function renderStoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '1em', height: '1em', color: 'currentColor' }}
    >
      <path
        d="M18.36 9l.6 3H5.04l.6-3h12.72M20 4H4v2h16V4zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5zM6 18v-4h6v4H6z"
        fill="currentColor"
      />
    </svg>
  )
}

export default defineComponent({
  name: 'ThemeEditor',
  inheritAttrs: false,
  setup() {
    const showThemeEditorRef = ref(false)
    const showThemeStoreRef = ref(false)
    const showMenuRef = ref(false)
    const configProviderInjection = inject(configProviderInjectionKey, null)
    const isDarkRef = computed(
      () => configProviderInjection?.mergedThemeRef.value?.name === 'dark'
    )
    const overridesRef = ref<any>(
      JSON.parse((localStorage['naive-ui-theme-overrides'] as string) || '{}')
    )
    const darkOverridesRef = ref<any>(
      JSON.parse(
        (localStorage['naive-ui-dark-theme-overrides'] as string) || '{}'
      )
    )
    const mergedOverridesRef = computed(() => {
      return isDarkRef.value ? darkOverridesRef.value : overridesRef.value
    })
    watch(overridesRef, (value) => {
      localStorage['naive-ui-theme-overrides'] = JSON.stringify(value)
    })
    watch(darkOverridesRef, (value) => {
      localStorage['naive-ui-dark-theme-overrides'] = JSON.stringify(value)
    })
    function handleApplyTheme(
      overrides: GlobalThemeOverrides,
      darkOverrides?: GlobalThemeOverrides
    ): void {
      overridesRef.value = overrides
      darkOverridesRef.value = darkOverrides || {}
    }
    function handleResetTheme(): void {
      overridesRef.value = {}
      darkOverridesRef.value = {}
    }
    return {
      showThemeEditor: showThemeEditorRef,
      showThemeStore: showThemeStoreRef,
      showMenu: showMenuRef,
      isDark: isDarkRef,
      overrides: overridesRef,
      darkOverrides: darkOverridesRef,
      mergedOverrides: mergedOverridesRef,
      handleApplyTheme,
      handleResetTheme
    }
  },
  render() {
    return (
      <>
        <ThemeEditor
          show={this.showThemeEditor}
          overrides={this.mergedOverrides}
          {...{
            'onUpdate:overrides': (v: any) => {
              if (this.isDark) {
                this.darkOverrides = v
              }
              else {
                this.overrides = v
              }
            }
          }}
        />
        <NConfigProvider themeOverrides={this.mergedOverrides}>
          {{
            default: () => [
              <ThemeStore
                show={this.showThemeStore}
                currentOverrides={this.mergedOverrides}
                {...{
                  'onUpdate:show': (v: boolean) => {
                    this.showThemeStore = v
                  },
                  onApply: this.handleApplyTheme,
                  onReset: this.handleResetTheme
                }}
              />,
              this.$slots.default?.(),
              <NFloatButton
                right={40}
                bottom={40}
                width={44}
                height={44}
                menuTrigger="click"
                showMenu={this.showMenu}
                {...{
                  'onUpdate:showMenu': (v: boolean) => {
                    this.showMenu = v
                  },
                  onClick: () => {
                    this.showThemeEditor = false
                  }
                }}
              >
                {{
                  default: () => (
                    <NIcon size={20}>{{ default: renderColorWandIcon }}</NIcon>
                  ),
                  menu: () => [
                    <NFloatButton
                      shape="circle"
                      right={0}
                      bottom={0}
                      width={44}
                      height={44}
                      {...{
                        onClick: () => {
                          this.showThemeEditor = !this.showThemeEditor
                        }
                      }}
                    >
                      {{
                        default: () => (
                          <NIcon size={20}>
                            {{ default: renderPaletteIcon }}
                          </NIcon>
                        )
                      }}
                    </NFloatButton>,
                    <NFloatButton
                      shape="circle"
                      width={44}
                      height={44}
                      {...{
                        onClick: () => {
                          this.showThemeStore = !this.showThemeStore
                          if (this.showThemeStore) {
                            this.showThemeEditor = false
                          }
                          this.showMenu = false
                        }
                      }}
                    >
                      {{
                        default: () => (
                          <NIcon size={20}>
                            {{ default: renderStoreIcon }}
                          </NIcon>
                        )
                      }}
                    </NFloatButton>
                  ]
                }}
              </NFloatButton>
            ]
          }}
        </NConfigProvider>
      </>
    )
  }
})
