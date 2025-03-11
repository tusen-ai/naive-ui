<markdown>
# Delay rendering mode
When you have too much content, dragging and dropping frequently triggers element text re-arrangement/style re-painting, it will be very stuttering and affecting the user experience.
It can be optimized by delayed rendering and not updated until the drag and drop is finished.
Turn on delayed rendering by setting `lazy` to `true`.
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
          In front-end development, MathJax is a widely used library for
          rendering mathematical formulas in web pages. because MathJax Rendered
          mathematical formulas are usually generated dynamically, so in actual
          use, the size of the container may change, which triggers the
          browser's redraw process. Caused by changes in container size CSS
          redrawing has a certain impact on performance, especially when pages
          are updated frequently or formula content is complex. The MathJax
          rendering process includes parsing LaTeX or MathML Mathematical
          formulas of formats that convert to a browser renderable format (such
          as HTML, SVG or MathML). In this process, MathJax The final display
          effect of the formula will be calculated based on the size of the
          container. If the size of the container changes (e.g., browser window
          resize or some DOM element changed size), MathJax The layout of the
          formula is recalculated, triggering the browser's repaint. CSS Repaint
          is when an element's visual representation (such as size, color, or
          layout) changes, the browser needs to recalculate and repaint the
          element. This can lead to performance degradation, especially when
          dealing with large numbers of formulas or complex pages. To reduce
          performance losses, it can be optimized by avoiding frequent changes
          in container size and using appropriate rendering modes (e.g. SVG
          rendering is usually more efficient than HTML rendering) and uses CSS
          reasonably Animation or transition effects, reducing the number of
          redrawing and rearrangement. In short, front-end developers need to be
          aware of MathJax The relationship between the rendering process and
          the changes in container size, reasonably optimize the code, and
          ensure stable page performance.
        </div>
      </template>
      <template #2>
        Formula rendering scenes, this may be required
      </template>
    </NSplit>
  </n-flex>
</template>
