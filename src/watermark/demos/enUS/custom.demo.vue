<markdown>
# Custom Watermark

Preview watermark effects by configuring custom parameters.
</markdown>

<script setup>
import { ref } from 'vue'

const content = ref('Watermark\nCustom Watermark')
const fontSize = ref(16)
const rotate = ref(-15)
const fontColor = ref('rgba(128, 128, 128, .3)')
const cross = ref(true)
const fontStyle = ref('normal')
const fontWeight = ref(400)
const globalRotate = ref(0)
const lineHeight = ref(16)
const height = ref(128)
const width = ref(192)
const xGap = ref(0)
const yGap = ref(0)
const xOffset = ref(12)
const yOffset = ref(28)
const zIndex = ref(10)
const textAlign = ref('left')
</script>

<template>
  <n-flex :size="30">
    <n-watermark
      style="flex: 1"
      :content="content"
      :cross="cross"
      selectable
      :font-size="fontSize"
      :line-height="lineHeight"
      :width="width"
      :height="height"
      :x-offset="xOffset"
      :y-offset="yOffset"
      :rotate="rotate"
      :font-color="fontColor"
      :font-style="fontStyle"
      :font-weight="fontWeight"
      :global-rotate="globalRotate"
      :x-gap="xGap"
      :y-gap="yGap"
      :z-index="zIndex"
      :text-align="textAlign"
    >
      <n-flex vertical>
        <n-h4 prefix="bar">
          The underlying logic is to break through information barriers and
          create a new industry ecosystem. The top-level design focuses on user
          perception tracks, reaching a tipping point through differentiation
          and granularity. Delivering value is to achieve lasting benefits by
          reusing major developments in vertical fields.
        </n-h4>
        <n-table :bordered="false" :single-line="false">
          <thead>
            <tr>
              <th>Review</th>
              <th>Empower</th>
              <th>Collaborate</th>
              <th>...</th>
              <th>Connect</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Align</td>
              <td>Breakthrough</td>
              <td>Establish</td>
              <td>...</td>
              <td>Fulfill</td>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          </tbody>
        </n-table>
        <img
          width="100%"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
        >
      </n-flex>
    </n-watermark>
    <div style="width: 360px">
      <n-form-item label="Watermark Content">
        <n-input
          v-model:value="content"
          placeholder="Please enter watermark content"
        />
      </n-form-item>
      <n-grid :cols="2" :x-gap="12">
        <n-grid-item>
          <n-form-item label="Font Size">
            <n-input-number v-model:value="fontSize" :min="8" :max="32" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="Font Color">
            <n-color-picker v-model:value="fontColor" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="Font Style">
            <n-select
              v-model:value="fontStyle"
              :options="[
                { label: 'Normal', value: 'normal' },
                { label: 'Italic', value: 'italic' },
                { label: 'Oblique', value: 'oblique' },
              ]"
            />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="Font Weight">
            <n-input-number
              v-model:value="fontWeight"
              :min="100"
              :max="900"
              :step="100"
            />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="Cross Boundary">
            <n-switch v-model:value="cross" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="Rotation Angle">
            <n-slider v-model:value="rotate" :min="-90" :max="90" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="Global Rotation">
            <n-slider v-model:value="globalRotate" :min="-180" :max="180" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="Line Height">
            <n-input-number v-model:value="lineHeight" :min="1" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="Height">
            <n-input-number v-model:value="height" :min="1" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="Width">
            <n-input-number v-model:value="width" :min="1" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="X-axis Gap">
            <n-input-number v-model:value="xGap" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="Y-axis Gap">
            <n-input-number v-model:value="yGap" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="X-axis Offset">
            <n-input-number v-model:value="xOffset" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="Y-axis Offset">
            <n-input-number v-model:value="yOffset" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="Z-index">
            <n-input-number v-model:value="zIndex" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="Text Align">
            <n-select
              v-model:value="textAlign"
              :options="[
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
              ]"
            />
          </n-form-item>
        </n-grid-item>
      </n-grid>
    </div>
  </n-flex>
</template>
