<markdown>
# 延迟渲染模式
当你内容太多的时候, 拖拽频繁触发元素文字重排 / 样式重绘时, 会很卡顿，影响用户体验。
可以通过延迟渲染进行优化，直到拖拽结束才更新。
通过设置 `lazy` 为 `true` 来开启延迟渲染。
</markdown>

<script setup lang="ts">
import { NSplit } from 'naive-ui'
import { ref } from 'vue'

const split = ref<number>(0.8)
</script>

<template>
  <n-flex vertical>
    <NSplit v-model:size="split" lazy style="height: 200px">
      <template #1>
        <div style="height: 100%; overflow: auto">
          在前端开发中，MathJax
          是一个广泛使用的库，用于在网页中渲染数学公式。由于 MathJax
          渲染的数学公式通常是动态生成的，因此在实际使用中，容器的大小可能发生变化，进而触发浏览器的重绘过程。容器大小变化引起的
          CSS 重绘对性能有一定的影响，尤其是在页面频繁更新或者公式内容复杂时。
          MathJax 渲染过程包括解析 LaTeX 或 MathML
          格式的数学公式，将其转换为浏览器可渲染的格式（如 HTML、SVG 或
          MathML）。在这个过程中，MathJax
          会根据容器的大小来计算公式的最终显示效果。如果容器的大小发生变化（例如，浏览器窗口调整或某些
          DOM 元素改变了尺寸），MathJax
          会重新计算公式的布局，从而触发浏览器的重绘。 CSS
          重绘是指当元素的视觉表现（如尺寸、颜色或布局）发生变化时，浏览器需要重新计算并重新绘制该元素。这可能会导致性能下降，尤其是在处理大量公式或复杂页面时。为了减小性能损耗，可以通过以下方式优化：避免频繁改变容器的尺寸，使用合适的渲染模式（如
          SVG 渲染通常比 HTML 渲染更高效），并合理运用 CSS
          动画或过渡效果，减少重绘和重排的次数。 总之，前端开发者需要意识到
          MathJax
          渲染过程与容器大小变化之间的关系，合理优化代码，确保页面性能稳定。
        </div>
      </template>
      <template #2>
        公式渲染场景, 可能会需要用到这个
      </template>
    </NSplit>
  </n-flex>
</template>
