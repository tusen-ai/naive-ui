<markdown>
# Draggable

Set `draggable` to `true` to make modal draggable. If you want it to be dragged out of the window, you can set `draggable` to `{ bounds: 'none' }`.

If you want to completely customize the content of the modal, you can use the `draggableClass` in the `default` slot to set it on the element you want to trigger the drag.
</markdown>

<script lang="ts" setup>
import { useModal } from 'naive-ui'
import { ref } from 'vue'

const modal = useModal()

const showModal1 = ref(false)
const showModal2 = ref(false)
const showModal3 = ref(false)
const showModal4 = ref(false)

function showDialogPreset() {
  modal.create({
    title: 'Dialog preset',
    draggable: true,
    preset: 'dialog',
    content: 'Placeholder....'
  })
}

function showCardPreset() {
  modal.create({
    title: 'Card preset',
    draggable: true,
    preset: 'card',
    content: 'Placeholder....'
  })
}
</script>

<template>
  <n-flex>
    <n-button @click="showModal1 = !showModal1">
      Card preset
    </n-button>
    <n-button @click="showModal2 = !showModal2">
      Dialog preset
    </n-button>
    <n-button @click="showModal3 = !showModal3">
      No preset
    </n-button>
    <n-button @click="showDialogPreset">
      Imperative dialog preset
    </n-button>
    <n-button @click="showCardPreset">
      Imperative card preset
    </n-button>
    <n-button @click="showModal4 = !showModal4">
      Nested draggable
    </n-button>
  </n-flex>
  <n-modal
    v-model:show="showModal1"
    title="Card preset draggable"
    preset="card"
    draggable
    :style="{ width: '800px' }"
  >
    <div>Placeholder...</div>
    <div>Placeholder...</div>
    <div>Placeholder...</div>
    <div>Placeholder...</div>
    <div>Placeholder...</div>
    <div>Placeholder...</div>
    <div>Placeholder...</div>
    <div>Placeholder...</div>
    <div>Placeholder...</div>
    <div>Placeholder...</div>
  </n-modal>
  <n-modal
    v-model:show="showModal2"
    title="Dialog preset draggable"
    preset="dialog"
    draggable
    :style="{ width: '800px' }"
  >
    <div>Placeholder...</div>
    <div>Placeholder...</div>
    <div>Placeholder...</div>
    <div>Placeholder...</div>
    <div>Placeholder...</div>
    <div>Placeholder...</div>
    <div>Placeholder...</div>
    <div>Placeholder...</div>
    <div>Placeholder...</div>
    <div>Placeholder...</div>
  </n-modal>
  <n-modal
    v-model:show="showModal3"
    title="No preset draggable"
    draggable
    :style="{ width: '800px' }"
  >
    <template #default="{ draggableClass }">
      <n-card>
        <div :class="draggableClass">
          Mouse down here to drag
        </div>
      </n-card>
    </template>
  </n-modal>
  <n-modal
    v-model:show="showModal4"
    title="Nested draggable"
    preset="card"
    :draggable="{ bounds: 'none' }"
    :style="{ width: '800px' }"
  >
    <n-button @click="showDialogPreset">
      Create a new modal
    </n-button>
  </n-modal>
</template>
