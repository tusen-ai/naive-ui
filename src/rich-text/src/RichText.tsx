import { h, defineComponent } from "vue";
import { useConfig } from "../../_mixins";
import DOMPurify from 'dompurify';
import type { PropType } from 'vue'
import { DompurifyConfig } from "./public-types";

export const richTextProps = {
    content: {
        type: String,
        default: ''
    },
    options: {
        type: Object as PropType<DompurifyConfig>,
        default: {}
    }
}

export default defineComponent({
    name: 'RichText',
    props: richTextProps,
    setup(props) {
        const { mergedClsPrefixRef }
            = useConfig(props)
        const { content, options } = props
        const html = DOMPurify.sanitize(content, options) as string

        return {
            mergedClsPrefix: mergedClsPrefixRef,
            html
        }
    },
    render() {
        const { 
            mergedClsPrefix,
            html
        } = this
        return (
            <div
                class={[
                    `${mergedClsPrefix}-rich-text`
                ]}
                role="article"
                innerHTML={html}
            >
            </div>
        )
    }
})