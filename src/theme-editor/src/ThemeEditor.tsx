import {
  h,
  computed,
  defineComponent,
  renderSlot,
  ref,
  Fragment,
  toRaw
} from 'vue'
import { cloneDeep } from 'lodash-es'
import { rgba } from 'seemly'
import {
  GlobalTheme,
  GlobalThemeOverrides,
  NConfigProvider
} from '../../config-provider'
import { NPopover } from '../../popover'
import { NScrollbar } from '../../scrollbar'
import { NCollapse, NCollapseItem } from '../../collapse'
import { NInput } from '../../input'
import { NSpace } from '../../space'
import { lightTheme } from '../../themes/light'
import { useConfig } from '../../_mixins'
import { NEmpty } from '../../empty'
import { NElement } from '../../element'
import { NDivider } from '../../divider'
import { NButton } from '../../button'

const ColorWandIcon = (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '1em', height: '1em', color: 'currentColor' }}
  >
    <path
      d="M13.5 1C13.7761 1 14 1.22386 14 1.5V2H14.5C14.7761 2 15 2.22386 15 2.5C15 2.77614 14.7761 3 14.5 3H14V3.5C14 3.77614 13.7761 4 13.5 4C13.2239 4 13 3.77614 13 3.5V3H12.5C12.2239 3 12 2.77614 12 2.5C12 2.22386 12.2239 2 12.5 2H13V1.5C13 1.22386 13.2239 1 13.5 1Z"
      fill="currentColor"
    ></path>
    <path
      d="M3.5 3C3.77615 3 4 3.22386 4 3.5V4H4.5C4.77615 4 5 4.22386 5 4.5C5 4.77614 4.77615 5 4.5 5H4V5.5C4 5.77614 3.77615 6 3.5 6C3.22386 6 3 5.77614 3 5.5V5H2.5C2.22386 5 2 4.77614 2 4.5C2 4.22386 2.22386 4 2.5 4H3V3.5C3 3.22386 3.22386 3 3.5 3Z"
      fill="currentColor"
    ></path>
    <path
      d="M12.5 12C12.7761 12 13 11.7761 13 11.5C13 11.2239 12.7761 11 12.5 11H12V10.5C12 10.2239 11.7761 10 11.5 10C11.2239 10 11 10.2239 11 10.5V11H10.5C10.2239 11 10 11.2239 10 11.5C10 11.7761 10.2239 12 10.5 12H11V12.5C11 12.7761 11.2239 13 11.5 13C11.7761 13 12 12.7761 12 12.5V12H12.5Z"
      fill="currentColor"
    ></path>
    <path
      d="M8.72956 4.56346C9.4771 3.81592 10.6891 3.81592 11.4367 4.56347C12.1842 5.31102 12.1842 6.52303 11.4367 7.27058L4.26679 14.4404C3.51924 15.1879 2.30723 15.1879 1.55968 14.4404C0.812134 13.6928 0.812138 12.4808 1.55969 11.7333L8.72956 4.56346ZM8.25002 6.4572L2.26679 12.4404C1.90977 12.7974 1.90977 13.3763 2.26679 13.7333C2.62381 14.0903 3.20266 14.0903 3.55968 13.7333L9.54292 7.75009L8.25002 6.4572ZM10.25 7.04299L10.7295 6.56347C11.0866 6.20645 11.0866 5.6276 10.7296 5.27057C10.3725 4.91355 9.79368 4.91355 9.43666 5.27057L8.95713 5.7501L10.25 7.04299Z"
      fill="currentColor"
    ></path>
  </svg>
)

export default defineComponent({
  name: 'ThemeEditor',
  setup () {
    const { NConfigProvider } = useConfig()
    const theme = computed(() => {
      const mergedUnstableTheme: GlobalTheme =
        NConfigProvider?.mergedUnstableTheme || lightTheme
      const common = mergedUnstableTheme.common || lightTheme.common
      const overrides: GlobalThemeOverrides = {
        common
      }
      for (const key of Object.keys(lightTheme) as Array<
      keyof typeof lightTheme
      >) {
        if (key === 'common') continue
        ;(overrides as any)[key] = (mergedUnstableTheme[key]?.self?.(common) ||
          lightTheme[key].self?.(common)) as any
        // Here we must use as any, nor ts 2590 will be raised since the union is
        // too complex
      }
      return overrides
    })
    const overridesRef = ref<any>({})
    const tempOverridesRef = ref<any>({})
    const varNamePatternRef = ref('')
    const compNamePatternRef = ref('')
    const tempVarNamePatternRef = ref('')
    const tempCompNamePatternRef = ref('')
    function applyTempOverrides (
      compName: string,
      varName: string,
      value: string
    ): void {
      if (value && (varName.includes('color') || varName.includes('Color'))) {
        try {
          rgba(value)
        } catch {
          setTempOverrides(compName, varName, '')
          alert(
            `${compName}.${varName} '${value}' is invalid Color. Only #000[0], #000000[00], rgb(0, 0, 0), rgba(0, 0, 0, 0) formatted color is supported.`
          )
          return
        }
      }
      overridesRef.value = cloneDeep(toRaw(tempOverridesRef.value))
    }
    function setTempOverrides (
      compName: string,
      varName: string,
      value: string
    ): void {
      const { value: tempOverrides } = tempOverridesRef
      if (!(compName in tempOverrides)) tempOverrides[compName] = {}
      const compOverrides = tempOverrides[compName]
      if (value) {
        compOverrides[varName] = value
      } else {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete compOverrides[varName]
      }
    }
    function handleClearClick (): void {
      tempOverridesRef.value = {}
      overridesRef.value = {}
    }
    return {
      theme,
      showPanel: ref(false),
      tempOverrides: tempOverridesRef,
      overrides: overridesRef,
      compNamePattern: compNamePatternRef,
      tempCompNamePattern: tempCompNamePatternRef,
      varNamePattern: varNamePatternRef,
      tempVarNamePattern: tempVarNamePatternRef,
      applyTempOverrides,
      setTempOverrides,
      handleClearClick
    }
  },
  render () {
    return (
      <NConfigProvider themeOverrides={this.overrides}>
        {{
          default: () => [
            <NPopover
              trigger="manual"
              show={this.showPanel}
              displayDirective="show"
              placement="top-end"
              style={{
                width: '288px',
                height: 'calc(100vh - 200px)',
                padding: 0
              }}
            >
              {{
                trigger: () => (
                  <NElement
                    style={{
                      position: 'fixed',
                      zIndex: 10,
                      bottom: '40px',
                      right: '40px',
                      width: '44px',
                      height: '44px',
                      fontSize: '26px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: 'var(--popover-color)',
                      color: 'var(--text-color-2)',
                      transition: 'all .3s var(--cubic-bezier-ease-in-out)',
                      boxShadow: '0 2px 8px 0px rgba(0, 0, 0, .12)',
                      cursor: 'pointer'
                    }}
                    // @ts-expect-error
                    onClick={() => {
                      this.showPanel = !this.showPanel
                    }}
                  >
                    {{ default: () => ColorWandIcon }}
                  </NElement>
                ),
                default: () => (
                  <NScrollbar contentStyle={{ padding: '8px 14px' }}>
                    {{
                      default: () => (
                        <>
                          <NSpace vertical>
                            {{
                              default: () => (
                                <>
                                  Component Name
                                  <NInput
                                    onChange={() => {
                                      this.compNamePattern = this.tempCompNamePattern
                                    }}
                                    onInput={(value: string) => {
                                      this.tempCompNamePattern = value
                                    }}
                                    value={this.tempCompNamePattern}
                                  />
                                  Variable Name
                                  <NInput
                                    onChange={(value: string) => {
                                      this.varNamePattern = value
                                    }}
                                    onInput={(value: string) => {
                                      this.tempVarNamePattern = value
                                    }}
                                    value={this.tempVarNamePattern}
                                  />
                                  <NButton
                                    size="small"
                                    onClick={() => {
                                      this.compNamePattern = ''
                                      this.varNamePattern = ''
                                      this.tempCompNamePattern = ''
                                      this.tempVarNamePattern = ''
                                    }}
                                    block
                                  >
                                    {{ default: () => 'Clear Search' }}
                                  </NButton>
                                  <NButton
                                    size="small"
                                    onClick={this.handleClearClick}
                                    block
                                  >
                                    {{ default: () => 'Clear All Variables' }}
                                  </NButton>
                                </>
                              )
                            }}
                          </NSpace>
                          <NDivider />
                          <NCollapse displayDirective="show">
                            {{
                              default: () => {
                                const {
                                  theme,
                                  compNamePattern,
                                  varNamePattern
                                } = this
                                const themeKeys = Object.keys(theme)
                                const compNamePatternLower = compNamePattern.toLowerCase()
                                const varNamePatternLower = varNamePattern.toLowerCase()
                                return themeKeys
                                  .filter((themeKey) => {
                                    return themeKey
                                      .toLowerCase()
                                      .includes(compNamePatternLower)
                                  })
                                  .map((themeKey) => {
                                    return (
                                      <NCollapseItem
                                        title={themeKey}
                                        name={themeKey}
                                      >
                                        {{
                                          default: () => {
                                            const componentTheme:
                                            | Record<string, string>
                                            | undefined = (theme as any)[
                                              themeKey
                                            ]
                                            if (componentTheme === undefined) {
                                              return <NEmpty />
                                            }
                                            const varKeys = Object.keys(
                                              componentTheme
                                            ).filter((key) => {
                                              return (
                                                key !== 'name' &&
                                                key
                                                  .toLowerCase()
                                                  .includes(varNamePatternLower)
                                              )
                                            })
                                            if (!varKeys.length) {
                                              return <NEmpty />
                                            }
                                            return (
                                              <NSpace vertical>
                                                {{
                                                  default: () =>
                                                    varKeys.map((varKey) => {
                                                      return [
                                                        <div
                                                          key={`${varKey}Label`}
                                                        >
                                                          {varKey}
                                                        </div>,
                                                        <NInput
                                                          key={varKey}
                                                          onChange={(
                                                            value: string
                                                          ) =>
                                                            this.applyTempOverrides(
                                                              themeKey,
                                                              varKey,
                                                              value
                                                            )
                                                          }
                                                          onUpdateValue={(
                                                            value: string
                                                          ) => {
                                                            this.setTempOverrides(
                                                              themeKey,
                                                              varKey,
                                                              value
                                                            )
                                                          }}
                                                          value={
                                                            this
                                                              .tempOverrides?.[
                                                                themeKey
                                                              ]?.[varKey] || ''
                                                          }
                                                          placeholder={
                                                            componentTheme[
                                                              varKey
                                                            ]
                                                          }
                                                        />
                                                      ]
                                                    })
                                                }}
                                              </NSpace>
                                            )
                                          }
                                        }}
                                      </NCollapseItem>
                                    )
                                  })
                              }
                            }}
                          </NCollapse>
                        </>
                      )
                    }}
                  </NScrollbar>
                )
              }}
            </NPopover>,
            renderSlot(this.$slots, 'default')
          ]
        }}
      </NConfigProvider>
    )
  }
})
