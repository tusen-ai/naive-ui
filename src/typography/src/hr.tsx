import { h, defineComponent, computed, CSSProperties } from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import style from './styles/hr.cssr'

export default defineComponent({
  name: 'Hr',
  props: {
    ...(useTheme.props as ThemeProps<TypographyTheme>)
  },
  setup (props) {
    const themeRef = useTheme('Typography', 'Hr', style, typographyLight, props)
    return {
      cssVars: computed(() => {
        return {
          '--color': themeRef.value.self.hrColor
        }
      })
    }
  },
  render () {
    return <hr class="n-hr" style={this.cssVars as CSSProperties} />
  }
})
