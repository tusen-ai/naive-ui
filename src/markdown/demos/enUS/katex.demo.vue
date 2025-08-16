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
The following is a LaTeX mathematical formula in Markdown format:

I am an inline formula: $E=mc^2$

I am an independent Fourier formula:
$$
f(x) = a_0 + \\sum_{n=1}^{\\infty} \\left( a_n \\cos(nx) + b_n \\sin(nx) \\right)
$$

Among them, the terms with integral symbols:
$$
a_0 = \\frac{1}{2\\pi} \\int_{-\\pi}^{\\pi} f(x) \\, dx
$$

$$
a_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\cos(nx) \\, dx \\quad \\text{for} \\quad n \\geq 1
$$

$$
b_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\sin(nx) \\, dx \\quad \\text{for} \\quad n \\geq 1
$$

I am a Taylor formula with fractions and an extremely long test length:

$
f(x) = f(a) + f'(a)(x - a) + \\frac{f''(a)}{2!}(x - a)^2 + \\frac{f'''(a)}{3!}(x - a)^3 + \\cdots + \\frac{f^{(n)}(a)}{n!}(x - a)^n + R_n(x)
$

I am a formula with superscripts and subscripts:
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
