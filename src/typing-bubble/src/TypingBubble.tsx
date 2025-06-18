import { h, defineComponent, CSSProperties, computed, SlotsType } from "vue";
import { ThemeProps, useConfig, useTheme, useThemeClass } from "../../_mixins";
import style from './styles/index.cssr'
import bubbleLight, { TypingBubbleTheme } from "../styles/light";
import { BubbleProps, BubbleSlots } from "./public-types";

export const bubbleProps = {
    ...(useTheme.props as ThemeProps<TypingBubbleTheme>),
    ...BubbleProps
}

export default defineComponent({
    name: 'TypingBubble',
    props: bubbleProps,
    slots: Object as SlotsType<BubbleSlots>,
    setup(props, $slots) {
        const { inlineThemeDisabled, mergedClsPrefixRef }
            = useConfig(props)
        const themeRef = useTheme(
            'TypingBubble',
            '-typing-bubble',
            style,
            bubbleLight,
            props,
            mergedClsPrefixRef
        )
        const cssVarsRef = computed(() => {
            return {

            }
        })
        const themeClassHandle = inlineThemeDisabled
              ? useThemeClass('TypingBubble', undefined, cssVarsRef, props)
              : undefined

        return {
            mergedTheme: themeRef,
            mergedClsPrefix: mergedClsPrefixRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle?.themeClass,
        }
    },
    render() {
        const { 
            mergedClsPrefix,
            mergedTheme,
            $slots
        } = this
        return (
            <div
                class={[
                    `${mergedClsPrefix}-typing-bubble`,
                    this.themeClass,
                    this.placement === 'start' && `${mergedClsPrefix}-typing-bubble--start`,
                    this.placement === 'end' && `${mergedClsPrefix}-typing-bubble--end`
                ]}
                style={this.cssVars as CSSProperties}
            >
                234
            </div>
        )
    }
})