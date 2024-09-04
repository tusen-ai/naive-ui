import { defineComponent, h, inject } from 'vue'
import { upperFirst } from 'lodash-es'
import { configProviderInjectionKey } from '../../config-provider/src/context'

const name = 'time'
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M256,64C150,64,64,150,64,256s86,192,192,192,192-86,192-192S362,64,256,64Z"
            style="
              fill: none;
              stroke: currentColor;
              stroke-miterlimit: 10;
              stroke-width: 32px;
            "
          />
          <polyline
            points="256 128 256 272 352 272"
            style="
              fill: none;
              stroke: currentColor;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-width: 32px;
            "
          />
        </svg>
      )
    }
  }
})
