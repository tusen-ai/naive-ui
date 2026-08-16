import type { PropType } from 'vue'
import type { GlobalThemeOverrides } from '../../config-provider'
import type { ThemePreset } from './themePresets'
import { computed, defineComponent, Fragment, h, inject, ref } from 'vue'
import { useLocale } from '../../_mixins'
import { NButton } from '../../button'
import { NCard } from '../../card'
import { useThemeVars } from '../../composables'
import { configProviderInjectionKey } from '../../config-provider/src/context'
import { NModal } from '../../modal'
import { NPagination } from '../../pagination'
import { themePresets } from './themePresets'

const PAGE_SIZE = 6

function isOverridesEqual(
  a: GlobalThemeOverrides,
  b: GlobalThemeOverrides
): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

function getPresetOverrides(
  preset: ThemePreset,
  isDark: boolean
): GlobalThemeOverrides {
  if (isDark && preset.darkOverrides) {
    return preset.darkOverrides
  }
  return preset.overrides
}

export default defineComponent({
  name: 'ThemeStore',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    currentOverrides: {
      type: Object as PropType<GlobalThemeOverrides>,
      default: () => ({})
    }
  },
  emits: ['update:show', 'apply', 'reset'],
  setup(props, { emit }) {
    const currentPageRef = ref(1)
    const { localeRef } = useLocale('ThemeEditor')
    const themeVarsRef = useThemeVars()
    const NConfigProvider = inject(configProviderInjectionKey, null)
    const isDarkRef = computed(
      () => NConfigProvider?.mergedThemeRef.value?.name === 'dark'
    )

    const pagedPresets = computed(() => {
      const start = (currentPageRef.value - 1) * PAGE_SIZE
      return themePresets.slice(start, start + PAGE_SIZE)
    })

    function isCurrentTheme(preset: ThemePreset): boolean {
      const overrides = getPresetOverrides(preset, isDarkRef.value)
      return isOverridesEqual(overrides, props.currentOverrides)
    }

    function handleApply(preset: ThemePreset): void {
      emit('apply', preset.overrides, preset.darkOverrides)
    }

    function handleClose(): void {
      emit('update:show', false)
    }

    function handlePageChange(page: number): void {
      currentPageRef.value = page
    }

    function handleReset(): void {
      emit('reset')
    }

    return {
      locale: localeRef,
      themeVars: themeVarsRef,
      currentPage: currentPageRef,
      pagedPresets,
      totalCount: themePresets.length,
      isCurrentTheme,
      handleApply,
      handleClose,
      handlePageChange,
      handleReset
    }
  },
  render() {
    const {
      locale,
      show,
      handleClose,
      pagedPresets,
      isCurrentTheme,
      themeVars,
      totalCount,
      handleApply,
      currentPage,
      handlePageChange,
      handleReset
    } = this
    return (
      <NModal
        draggable
        show={show}
        onUpdateShow={(val: boolean) => {
          if (!val) {
            handleClose()
          }
        }}
        style={{ width: '50%' }}
        preset="card"
        title={locale.themeStore}
        closable
        onClose={handleClose}
      >
        {{
          default: () => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '520px',
                gap: '16px'
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gridTemplateRows: '1fr 1fr',
                  gap: '16px'
                }}
              >
                {pagedPresets.map((preset: ThemePreset) => {
                  const isCurrent = isCurrentTheme(preset)
                  return (
                    <NCard hoverable size="small">
                      {{
                        default: () => (
                          <>
                            <div
                              style={{
                                fontSize: '18px'
                              }}
                            >
                              {preset.name}
                            </div>
                            <p
                              style={{
                                fontSize: '16px',
                                color: themeVars.textColor3
                              }}
                            >
                              {preset.description}
                            </p>
                            <div
                              style={{
                                fontSize: '14px',
                                color: themeVars.textColor3
                              }}
                            >
                              {preset.author}
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                              }}
                            >
                              <NButton
                                style={{
                                  marginTop: '22px'
                                }}
                                type="primary"
                                disabled={isCurrent}
                                onClick={() => handleApply(preset)}
                              >
                                {{
                                  default: () =>
                                    isCurrent
                                      ? locale.currentTheme
                                      : locale.apply
                                }}
                              </NButton>
                            </div>
                          </>
                        )
                      }}
                    </NCard>
                  )
                })}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <NButton secondary onClick={handleReset}>
                  {{
                    default: () => locale.resetTheme
                  }}
                </NButton>
                <NPagination
                  page={currentPage}
                  pageSize={PAGE_SIZE}
                  itemCount={totalCount}
                  onUpdatePage={handlePageChange}
                />
              </div>
            </div>
          )
        }}
      </NModal>
    )
  }
})
