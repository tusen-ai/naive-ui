<markdown>
# Code

<p>Import different theme styles of Prism syntax highlighting</p>
<p>Each file corresponds to an independent code highlighting theme style, which can be selected and enabled according to project requirements</p>
<strong>1. Coy theme（with a soft color scheme, suitable for reading and displaying code, the background color is usually light gray, and the code color has moderate contrast）</strong>
<p>import 'vue-markdown-unified/dist/themes/prism-coy.min.css'</p>
<strong>2. Dark theme（adopts a dark background, the code color is mainly bright tones, suitable for use in night or low-light environments to reduce eye fatigue）</strong>
<p>import 'vue-markdown-unified/dist/themes/prism-dark.min.css'</p>
<strong>3. Funky theme（with unique color combinations and styles, including some bright colors, making the code look more vivid and interesting）</strong>
<p>import 'vue-markdown-unified/dist/themes/prism-funky.min.css'</p>
<strong>4. Okaidia theme（dark theme, the code color is selected to provide good readability, and there is a clear distinction between different code elements）</strong>
<p>import 'vue-markdown-unified/dist/themes/prism-okaidia.min.css'</p>
<strong>5. Solarized Light theme （a light-toned version based on the Solarized color scheme, emphasizing soft colors and readability, with a light yellow background and harmonious code colors）</strong>
<p>import 'vue-markdown-unified/dist/themes/prism-solarizedlight.min.css'</p>
<strong>6. Tomorrow theme（provides a simple and modern appearance, with fresh colors, the background color is usually light blue or light gray, and the code colors are easy to distinguish）</strong>
<p>import 'vue-markdown-unified/dist/themes/prism-tomorrow.min.css'</p>
<strong>7. Twilight theme（with a twilight-like tone, the background color is dark gray, and the code color stands out against this background while giving a comfortable visual experience）</strong>
<p>import 'vue-markdown-unified/dist/themes/prism-twilight.min.css'</p>
<strong>8. Prism theme（must be imported, including the basic style and structure of syntax highlighting）</strong>
<p>import 'vue-markdown-unified/dist/themes/prism.min.css'</p>
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'
import 'vue-markdown-unified/dist/themes/prism.min.css'

const options = {
  allowHtml: true,
  animated: true
}

const markdownText = ref(`
\`\`\`javascript
$ pnpm install
\`\`\`


\`\`\`javascript
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { useDropNodeOnCanvas } from './useDropNodeOnCanvas';
\`\`\`
`)
</script>

<template>
  <n-markdown :content="markdownText" v-bind="options" />
</template>
