/**
 * Type-only JSX checks for themeOverrides.
 * Asserted by `tsc -p tsconfig.test.json`; runtime test is a no-op.
 */
import { describe, it } from 'vitest'
import { Fragment, h } from 'vue'
import { NButton } from './button'
import { NDataTable } from './data-table'
import { NEllipsis } from './ellipsis'
import { NMessageProvider } from './message'
import { NTabs } from './tabs'
import { NText } from './typography'

describe('themeOverrides types', () => {
  it('accepts valid overrides and rejects invalid keys', () => {
    void (() => (
      <>
        {/* leaf theme, no peers */}
        <NButton
          themeOverrides={{
            heightTiny: '1px',
            common: { primaryColor: '#000' }
          }}
        />
        <NButton
          themeOverrides={{
            // @ts-expect-error invalid theme override key
            notARealThemeVar: '1px'
          }}
        />

        {/* theme with peers */}
        <NTabs
          themeOverrides={{
            colorSegment: '#fff',
            peers: {
              Button: { heightTiny: '1px' }
            }
          }}
        />
        <NTabs
          themeOverrides={{
            peers: {
              // @ts-expect-error invalid theme peer key
              NotARealThemePeer: {}
            }
          }}
        />

        {/* many peers */}
        <NDataTable
          themeOverrides={{
            actionDividerColor: '#eee',
            peers: {
              Button: {},
              Checkbox: {},
              Pagination: {}
            }
          }}
        />

        {/* empty self vars + peer */}
        <NEllipsis
          themeOverrides={{
            peers: {
              Tooltip: {}
            }
          }}
        />

        {/* shared typography theme */}
        <NText
          themeOverrides={{
            aTextColor: '#000'
          }}
        />

        {/* provider */}
        <NMessageProvider
          themeOverrides={{
            closeBorderRadius: '2px'
          }}
        />
      </>
    ))
  })
})
