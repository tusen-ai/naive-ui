import { defineComponent, h, inject } from 'vue'
import { upperFirst } from 'lodash-es'
import { configProviderInjectionKey } from '../../config-provider/src/context'

const name = 'warning'
export default defineComponent({
  name: upperFirst(name),
  setup() {
    const mergedIconsRef = inject(
      configProviderInjectionKey,
      null
    )?.mergedIconsRef
    return () => {
      const iconOverride = mergedIconsRef?.value?.[name]
      return iconOverride ? (
        iconOverride()
      ) : (
        <svg
          viewBox="0 0 24 24"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="none" stroke-width="1" fill-rule="evenodd">
            <g fill-rule="nonzero">
              <path d="M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12.0018002,15.0037242 C11.450254,15.0037242 11.0031376,15.4508407 11.0031376,16.0023869 C11.0031376,16.553933 11.450254,17.0010495 12.0018002,17.0010495 C12.5533463,17.0010495 13.0004628,16.553933 13.0004628,16.0023869 C13.0004628,15.4508407 12.5533463,15.0037242 12.0018002,15.0037242 Z M11.99964,7 C11.4868042,7.00018474 11.0642719,7.38637706 11.0066858,7.8837365 L11,8.00036004 L11.0018003,13.0012393 L11.00857,13.117858 C11.0665141,13.6151758 11.4893244,14.0010638 12.0021602,14.0008793 C12.514996,14.0006946 12.9375283,13.6145023 12.9951144,13.1171428 L13.0018002,13.0005193 L13,7.99964009 L12.9932303,7.8830214 C12.9352861,7.38570354 12.5124758,6.99981552 11.99964,7 Z" />
            </g>
          </g>
        </svg>
      )
    }
  }
})
