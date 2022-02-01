import { watchEffect } from 'vue'
import { warnOnce } from '../../_utils'
import type { MenuSetupProps } from './Menu'

export function useCheckDeprecated (props: MenuSetupProps): void {
  watchEffect(() => {
    if (props.items) {
      warnOnce('menu', '`items` is deprecated, please use `options` instead.')
    }
    if (props.onOpenNamesChange) {
      warnOnce(
        'menu',
        '`on-open-names-change` is deprecated, please use `on-update:expanded-keys` instead.'
      )
    }
    if (props.onSelect) {
      warnOnce(
        'menu',
        '`on-select` is deprecated, please use `on-update:value` instead.'
      )
    }
    if (props.onExpandedNamesChange) {
      warnOnce(
        'menu',
        '`on-expanded-names-change` is deprecated, please use `on-update:expanded-keys` instead.'
      )
    }
    if (props.expandedNames) {
      warnOnce(
        'menu',
        '`expanded-names` is deprecated, please use `expanded-keys` instead.'
      )
    }
    if (props.defaultExpandedNames) {
      warnOnce(
        'menu',
        '`default-expanded-names` is deprecated, please use `default-expanded-keys` instead.'
      )
    }
  })
}
