import type { GlobalTheme, GlobalThemeOverrides } from '../../config-provider'
import { cloneDeep, merge } from 'lodash-es'
import { computed, defineComponent, Fragment, h, inject, ref, toRaw } from 'vue'
import { useLocale } from '../../_mixins'
import { download } from '../../_utils'
import { NButton } from '../../button'
import { NCollapse, NCollapseItem } from '../../collapse'
import { NColorPicker } from '../../color-picker'
import { configProviderInjectionKey } from '../../config-provider/src/context'
import { NDivider } from '../../divider'
import { NEmpty } from '../../empty'
import { NGi, NGrid } from '../../grid'
import { NIcon } from '../../icon'
import { NInput } from '../../input'
import { NPopover } from '../../popover'
import { NSpace } from '../../space'
import { lightTheme } from '../../themes/light'
import { MaximizeIcon } from './MaximizeIcon'
import { MinimizeIcon } from './MinimizeIcon'

// button colorOpacitySecondary var is not color
function showColorPicker(key: string): boolean {
  if (key.includes('pacity'))
    return false
  if (key.includes('color') || key.includes('Color'))
    return true
  return false
}

export default defineComponent({
  name: 'ThemeEditor',
  inheritAttrs: false,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    overrides: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:overrides'],
  setup(props, { emit }) {
    const isMaximized = ref<boolean>(false)
    const fileInputRef = ref<HTMLInputElement | null>(null)
    const NConfigProvider = inject(configProviderInjectionKey, null)
    const theme = computed(() => {
      const mergedTheme: GlobalTheme
        = NConfigProvider?.mergedThemeRef.value || lightTheme
      const mergedThemeOverrides
        = NConfigProvider?.mergedThemeOverridesRef.value
      const common = merge(
        {},
        mergedTheme.common || lightTheme.common,
        mergedThemeOverrides?.common,
        (props.overrides as any)?.common || {}
      ) as NonNullable<GlobalTheme['common']>
      const overrides: GlobalThemeOverrides = {
        common
      }
      for (const key of Object.keys(lightTheme) as Array<
        Exclude<keyof typeof lightTheme, 'name'>
      >) {
        if (key === 'common') {
          continue
        }
        ;(overrides as any)[key] = (mergedTheme[key]?.self?.(common)
          || lightTheme[key].self?.(common)) as any
        // There (last line) we must use as any, nor ts 2590 will be raised since the union
        // is too complex
        if (mergedThemeOverrides && (overrides as any)[key]) {
          merge((overrides as any)[key], mergedThemeOverrides[key])
        }
      }
      return overrides
    })
    const themeCommonDefaultRef = computed(() => {
      return NConfigProvider?.mergedThemeRef.value?.common || lightTheme.common
    })
    const tempOverridesRef = ref<any>(
      JSON.parse((localStorage['naive-ui-theme-overrides'] as string) || '{}')
    )
    const varNamePatternRef = ref('')
    const compNamePatternRef = ref('')
    const tempVarNamePatternRef = ref('')
    const tempCompNamePatternRef = ref('')
    function applyTempOverrides(): void {
      emit('update:overrides', cloneDeep(toRaw(tempOverridesRef.value)))
    }
    function setTempOverrides(
      compName: string,
      varName: string,
      value: string
    ): void {
      const { value: tempOverrides } = tempOverridesRef
      if (!(compName in tempOverrides))
        tempOverrides[compName] = {}
      const compOverrides = tempOverrides[compName]
      if (value) {
        compOverrides[varName] = value
      }
      else {
        delete compOverrides[varName]
      }
    }
    function handleClearAllClick(): void {
      tempOverridesRef.value = {}
      emit('update:overrides', {})
    }
    function handleImportClick(): void {
      const { value: fileInput } = fileInputRef
      if (!fileInput)
        return
      fileInput.click()
    }
    function toggleMaximized(): void {
      isMaximized.value = !isMaximized.value
    }
    function handleInputFileChange(): void {
      const { value: fileInput } = fileInputRef
      if (!fileInput)
        return
      const fileList = fileInput.files
      const file = fileList?.[0]
      if (!file)
        return
      file
        .text()
        .then((value) => {
          const parsed = JSON.parse(value)
          emit('update:overrides', parsed)
          tempOverridesRef.value = parsed
        })
        .catch((e) => {
          // eslint-disable-next-line no-alert
          alert('Imported File is Invalid')
          console.error(e)
        })
        .finally(() => {
          fileInput.value = ''
        })
    }
    function handleExportClick(): void {
      const url = URL.createObjectURL(
        new Blob([JSON.stringify(props.overrides, undefined, 2)])
      )
      download(url, 'naive-ui-theme-overrides.json')
      URL.revokeObjectURL(url)
    }
    return {
      locale: useLocale('ThemeEditor').localeRef,
      themeCommonDefault: themeCommonDefaultRef,
      theme,
      tempOverrides: tempOverridesRef,
      compNamePattern: compNamePatternRef,
      tempCompNamePattern: tempCompNamePatternRef,
      varNamePattern: varNamePatternRef,
      tempVarNamePattern: tempVarNamePatternRef,
      fileInputRef,
      applyTempOverrides,
      setTempOverrides,
      handleClearAllClick,
      handleExportClick,
      handleImportClick,
      handleInputFileChange,
      toggleMaximized,
      isMaximized
    }
  },
  render() {
    return (
      <NPopover
        scrollable
        arrowPointToCenter
        trigger="manual"
        show={this.show}
        displayDirective="show"
        placement="left-start"
        style={{
          width: this.isMaximized ? 'calc(100vw - 80px)' : '288px',
          height: 'calc(100vh - 200px)',
          padding: 0
        }}
      >
        {{
          trigger: () => (
            <div
              style={{
                position: 'fixed',
                bottom: '150px',
                right: '40px',
                width: '44px',
                height: '44px',
                pointerEvents: 'none',
                opacity: 0
              }}
            />
          ),
          default: () => (
            <>
              <input
                type="file"
                ref="fileInputRef"
                style={{
                  display: 'block',
                  width: 0,
                  height: 0,
                  visibility: 'hidden'
                }}
                onChange={this.handleInputFileChange}
              />
              <NSpace vertical>
                {{
                  default: () => [
                    <NSpace
                      align="center"
                      justify="space-between"
                      style={{
                        marginBottom: '8px',
                        fontSize: '18px',
                        fontWeight: 500
                      }}
                    >
                      {{
                        default: () => (
                          <>
                            <span>{this.locale.title}</span>
                            <NButton
                              onClick={this.toggleMaximized}
                              secondary
                              circle
                              size="tiny"
                            >
                              {{
                                icon: () => (
                                  <NIcon
                                    component={
                                      this.isMaximized
                                        ? MinimizeIcon
                                        : MaximizeIcon
                                    }
                                  />
                                )
                              }}
                            </NButton>
                          </>
                        )
                      }}
                    </NSpace>,
                    this.locale.filterCompName,
                    <NInput
                      onChange={() => {
                        this.compNamePattern = this.tempCompNamePattern
                      }}
                      onInput={(value: string) => {
                        this.tempCompNamePattern = value
                      }}
                      value={this.tempCompNamePattern}
                      placeholder={this.locale.filterCompName}
                    />,
                    this.locale.filterVarName,
                    <NInput
                      onChange={(value: string) => {
                        this.varNamePattern = value
                      }}
                      onInput={(value: string) => {
                        this.tempVarNamePattern = value
                      }}
                      value={this.tempVarNamePattern}
                      placeholder={this.locale.filterVarName}
                    />,
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
                      {{ default: () => this.locale.clearSearch }}
                    </NButton>,
                    <NButton
                      size="small"
                      onClick={this.handleClearAllClick}
                      block
                    >
                      {{
                        default: () => this.locale.clearAllVars
                      }}
                    </NButton>,
                    <NSpace itemStyle={{ flex: 1 }}>
                      {{
                        default: () => (
                          <>
                            <NButton
                              block
                              size="small"
                              onClick={this.handleImportClick}
                            >
                              {{
                                default: () => this.locale.import
                              }}
                            </NButton>
                            <NButton
                              block
                              size="small"
                              onClick={this.handleExportClick}
                            >
                              {{
                                default: () => this.locale.export
                              }}
                            </NButton>
                          </>
                        )
                      }}
                    </NSpace>
                  ]
                }}
              </NSpace>
              <NDivider />
              <NCollapse>
                {{
                  default: () => {
                    const { theme, compNamePattern, varNamePattern } = this
                    const themeKeys = Object.keys(theme)
                    const compNamePatternLower = compNamePattern.toLowerCase()
                    const varNamePatternLower = varNamePattern.toLowerCase()
                    let filteredItemsCount = 0
                    const collapsedItems = themeKeys
                      .filter((themeKey) => {
                        return themeKey
                          .toLowerCase()
                          .includes(compNamePatternLower)
                      })
                      .map((themeKey) => {
                        const componentTheme:
                          | Record<string, string>
                          | undefined
                            = themeKey === 'common'
                              ? this.themeCommonDefault
                              : (theme as any)[themeKey]
                        if (componentTheme === undefined) {
                          return null
                        }
                        const varKeys = Object.keys(componentTheme).filter(
                          (key) => {
                            return (
                              key !== 'name'
                              && key.toLowerCase().includes(varNamePatternLower)
                            )
                          }
                        )
                        if (!varKeys.length) {
                          return null
                        }
                        filteredItemsCount += 1
                        return (
                          <NCollapseItem title={themeKey} name={themeKey}>
                            {{
                              default: () => (
                                <NGrid
                                  xGap={32}
                                  yGap={16}
                                  responsive="screen"
                                  cols={
                                    this.isMaximized ? '1 xs:1 s:2 m:3 l:4' : 1
                                  }
                                >
                                  {{
                                    default: () =>
                                      varKeys.map(varKey => (
                                        <NGi>
                                          {{
                                            default: () => (
                                              <>
                                                <div
                                                  key={`${varKey}Label`}
                                                  style={{
                                                    wordBreak: 'break-word'
                                                  }}
                                                >
                                                  {varKey}
                                                </div>
                                                {showColorPicker(varKey) ? (
                                                  <NColorPicker
                                                    key={varKey}
                                                    modes={['rgb', 'hex']}
                                                    value={
                                                      this.tempOverrides?.[
                                                        themeKey
                                                      ]?.[varKey]
                                                      || componentTheme[varKey]
                                                    }
                                                    onComplete={
                                                      this.applyTempOverrides
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
                                                  >
                                                    {{
                                                      action: () => (
                                                        <NButton
                                                          size="small"
                                                          disabled={
                                                            componentTheme[
                                                              varKey
                                                            ]
                                                            === this
                                                              .tempOverrides?.[
                                                                themeKey
                                                              ]?.[varKey]
                                                          }
                                                          onClick={() => {
                                                            this.setTempOverrides(
                                                              themeKey,
                                                              varKey,
                                                              componentTheme[
                                                                varKey
                                                              ]
                                                            )
                                                            this.applyTempOverrides()
                                                          }}
                                                        >
                                                          {{
                                                            default: () =>
                                                              this.locale
                                                                .restore
                                                          }}
                                                        </NButton>
                                                      )
                                                    }}
                                                  </NColorPicker>
                                                ) : (
                                                  <NInput
                                                    key={varKey}
                                                    onChange={
                                                      this.applyTempOverrides
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
                                                      this.tempOverrides?.[
                                                        themeKey
                                                      ]?.[varKey] || ''
                                                    }
                                                    placeholder={
                                                      componentTheme[varKey]
                                                    }
                                                  />
                                                )}
                                              </>
                                            )
                                          }}
                                        </NGi>
                                      ))
                                  }}
                                </NGrid>
                              )
                            }}
                          </NCollapseItem>
                        )
                      })
                    if (!filteredItemsCount)
                      return <NEmpty />
                    return collapsedItems
                  }
                }}
              </NCollapse>
            </>
          )
        }}
      </NPopover>
    )
  }
})
