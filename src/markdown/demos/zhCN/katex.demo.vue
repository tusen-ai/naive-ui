<markdown>
# Katex
</markdown>

<script lang="ts" setup>
import katex from 'katex'
import { ref } from 'vue'

const options = {
  allowHtml: false,
  enableLatex: true
}

const markdownText = ref(`
以下是一段Markdown格式的LaTeX数学公式：

我是一个行内公式：$E=mc^2$

我是一个独立的傅里叶公式：
$$
f(x) = a_0 + \\sum_{n=1}^{\\infty} \\left( a_n \\cos(nx) + b_n \\sin(nx) \\right)
$$

其中，带有积分符号的项：
$$
a_0 = \\frac{1}{2\\pi} \\int_{-\\pi}^{\\pi} f(x) \\, dx
$$

$$
a_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\cos(nx) \\, dx \\quad \\text{for} \\quad n \\geq 1
$$

$$
b_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\sin(nx) \\, dx \\quad \\text{for} \\quad n \\geq 1
$$

我是一个带有分式、测试长度超长的泰勒公式：

$
f(x) = f(a) + f'(a)(x - a) + \\frac{f''(a)}{2!}(x - a)^2 + \\frac{f'''(a)}{3!}(x - a)^3 + \\cdots + \\frac{f^{(n)}(a)}{n!}(x - a)^n + R_n(x)
$

我是一个带有上下标的公式：
$$
q_1 q_2 = (w_1 w_2 - \\vec{v}_1^T \\vec{v}_2, \\, w_1 \\vec{v}_2 + w_2 \\vec{v}_1 + \\vec{v}_1 \\times \\vec{v}_2)
$$
`)
</script>

<template>
  <n-config-provider :katex="katex">
    <n-markdown :content="markdownText" v-bind="options" />
  </n-config-provider>
</template>
