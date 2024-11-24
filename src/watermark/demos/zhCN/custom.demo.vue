<markdown>
# 自定义水印

通过配置自定义参数来预览水印效果。
</markdown>

<script setup>
import { ref } from 'vue'

const content = ref('水印\n自定义水印')
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
          底层逻辑是打通信息屏障，创建行业新生态。顶层设计时聚焦用户感知赛道，通过差异化和颗粒度达到引爆点。交付价值是在垂直领域采取复用大发达成持久收益。抽离透传归因分析作为抓手为产品赋能，体验度量作为闭环的评判标准。亮点是载体，优势是链路。思考整个生命周期，完善逻辑考虑资源倾斜。方法论是组合拳达到平台化标准。
        </n-h4>
        <n-table :bordered="false" :single-line="false">
          <thead>
            <tr>
              <th>复盘</th>
              <th>赋能</th>
              <th>协同</th>
              <th>...</th>
              <th>串联</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>拉通</td>
              <td>打通</td>
              <td>树立</td>
              <td>...</td>
              <td>履约</td>
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
      <n-form-item label="水印内容">
        <n-input v-model:value="content" placeholder="请输入水印内容" />
      </n-form-item>
      <n-grid :cols="2" :x-gap="12">
        <n-grid-item>
          <n-form-item label="字体大小">
            <n-input-number v-model:value="fontSize" :min="8" :max="32" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="字体颜色">
            <n-color-picker v-model:value="fontColor" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="字体风格">
            <n-select
              v-model:value="fontStyle"
              :options="[
                { label: '正常', value: 'normal' },
                { label: '斜体', value: 'italic' },
                { label: '倾斜', value: 'oblique' },
              ]"
            />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="字重">
            <n-input-number
              v-model:value="fontWeight"
              :min="100"
              :max="900"
              :step="100"
            />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="是否跨越边界">
            <n-switch v-model:value="cross" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="旋转角度">
            <n-slider v-model:value="rotate" :min="-90" :max="90" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="整体旋转">
            <n-slider v-model:value="globalRotate" :min="-180" :max="180" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="行高">
            <n-input-number v-model:value="lineHeight" :min="1" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="高度">
            <n-input-number v-model:value="height" :min="1" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="宽度">
            <n-input-number v-model:value="width" :min="1" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="X轴间隔">
            <n-input-number v-model:value="xGap" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="Y轴间隔">
            <n-input-number v-model:value="yGap" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="X轴偏移">
            <n-input-number v-model:value="xOffset" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="Y轴偏移">
            <n-input-number v-model:value="yOffset" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="Z轴高度">
            <n-input-number v-model:value="zIndex" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item>
          <n-form-item label="文本对齐">
            <n-select
              v-model:value="textAlign"
              :options="[
                { label: '左对齐', value: 'left' },
                { label: '居中', value: 'center' },
                { label: '右对齐', value: 'right' },
              ]"
            />
          </n-form-item>
        </n-grid-item>
      </n-grid>
    </div>
  </n-flex>
</template>
