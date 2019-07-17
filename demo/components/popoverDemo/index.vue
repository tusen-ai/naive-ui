<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Popover
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <debug />
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          <n-popover>
            <template v-slot:activator>
              <n-button style="margin:0;">
                hover
              </n-button>
            </template>
            <span>Light My Fire</span>
          </n-popover>
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre><n-popover>
  <template v-slot:activator>
    <n-button style="margin:0;">
      hover
    </n-button>
  </template>
  <span>Light My Fire</span>
</n-popover></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          No Arrow
        </div>
        <div class="n-doc-section__view">
          <n-popover :arrow="false">
            <template v-slot:activator>
              <n-button
                style="margin:0;"
              >
                hover
              </n-button>
            </template>
            <span>Light My Fire</span>
          </n-popover>
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre><n-popover :arrow="false">
  <template v-slot:activator>
    <n-button
      style="margin:0;"
    >
      hover
    </n-button>
  </template>
  <span>Light My Fire</span>
</n-popover></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          trigger
        </div>
        <div class="n-doc-section__view">
          <n-popover
            placement="bottom"
            :width="200"
            trigger="hover"
            style="margin-right: 12px;"
          >
            <template v-slot:activator>
              <n-button style="margin: 0;">
                California Girls(Hover)
              </n-button>
            </template>
            <span>
              I wish they all could be California girls
            </span>
          </n-popover>
          <n-popover
            placement="bottom"
            :width="200"
            trigger="click"
            style="margin-right: 12px;"
          >
            <template v-slot:activator>
              <n-button
                style="margin: 0;"
              >
                California Girls(Click)
              </n-button>
            </template>
            <span>
              I wish they all could be California girls
            </span>
          </n-popover>
          <n-popover
            v-model="showPopover"
            placement="bottom"
            :width="200"
            trigger="manual"
          >
            <template v-slot:activator>
              <n-button
                style="margin: 0;"
                @click="showPopover = !showPopover"
              >
                California Girls(Manual)
              </n-button>
            </template>
            <span>
              I wish they all could be California girls
            </span>
          </n-popover>
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre><n-popover
  placement="bottom"
  :width="200"
  trigger="hover"
  style="margin-right: 12px;"
>
  <template v-slot:activator>
    <n-button style="margin: 0;">
      California Girls(Hover)
    </n-button>
  </template>
  <span>
    I wish they all could be California girls
  </span>
</n-popover>
<n-popover
  placement="bottom"
  :width="200"
  trigger="click"
  style="margin-right: 12px;"
>
  <template v-slot:activator>
    <n-button
      style="margin: 0;"
    >
      California Girls(Click)
    </n-button>
  </template>
  <span>
    I wish they all could be California girls
  </span>
</n-popover>
<n-popover
  v-model="showPopover"
  placement="bottom"
  :width="200"
  trigger="manual"
>
  <template v-slot:activator>
    <n-button
      style="margin: 0;"
      @click="showPopover = !showPopover"
    >
      California Girls(Manual)
    </n-button>
  </template>
  <span>
    I wish they all could be California girls
  </span>
</n-popover></textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Placement
        </div>
        <div class="n-doc-section__view">
          <div class="popover-grid">
            <n-popover
              placement="top-start"
              trigger="click"
              style="grid-area: 1 / 2 / 2 / 3;"
            >
              <template v-slot:activator>
                <n-button
                  style="margin: 0;"
                >
                  Top Start
                </n-button>
              </template>
              <div class="large-text">
                Oops!
              </div>
            </n-popover>
            <n-popover
              placement="top"
              trigger="click"
              style="grid-area: 1 / 3 / 2 / 4;"
            >
              <template v-slot:activator>
                <n-button
                  style="margin: 0;"
                >
                  Top
                </n-button>
              </template>
              <div class="large-text">
                Oops!
              </div>
            </n-popover>
            <n-popover
              placement="top-end"
              trigger="click"
              style="grid-area: 1 / 4/ 2 / 5;"
            >
              <template v-slot:activator>
                <n-button
                  style="margin: 0;"
                >
                  Top End
                </n-button>
              </template>
              <div class="large-text">
                Oops!
              </div>
            </n-popover>
            <n-popover
              placement="left-start"
              trigger="click"
              style="grid-area: 2 / 1 / 3 / 2;"
            >
              <template v-slot:activator>
                <n-button
                  style="margin: 0;"
                >
                  Left Start
                </n-button>
              </template>
              <div class="large-text">
                Oops!
              </div>
            </n-popover>
            <n-popover
              placement="left"
              trigger="click"
              style="grid-area: 3 / 1 / 4 / 2;"
            >
              <template v-slot:activator>
                <n-button
                  style="margin: 0;"
                >
                  Left
                </n-button>
              </template>
              <div class="large-text">
                Oops!
              </div>
            </n-popover>
            <n-popover
              placement="left-end"
              trigger="click"
              style="grid-area: 4 / 1 / 5 / 2;"
            >
              <template v-slot:activator>
                <n-button
                  style="margin: 0;"
                >
                  Left End
                </n-button>
              </template>
              <div class="large-text">
                Oops!
              </div>
            </n-popover>
            <n-popover
              placement="right-start"
              trigger="click"
              style="grid-area: 2 / 5 / 3 / 6;"
            >
              <template v-slot:activator>
                <n-button
                  style="margin: 0;"
                >
                  Right Start
                </n-button>
              </template>
              <div class="large-text">
                Oops!
              </div>
            </n-popover>
            <n-popover
              placement="right"
              trigger="click"
              style="grid-area: 3 / 5 / 4 / 6;"
            >
              <template v-slot:activator>
                <n-button
                  style="margin: 0;"
                >
                  Right
                </n-button>
              </template>
              <div class="large-text">
                Oops!
              </div>
            </n-popover>
            <n-popover
              placement="right-end"
              trigger="click"
              style="grid-area: 4 / 5 / 5 / 6;"
            >
              <template v-slot:activator>
                <n-button
                  style="margin: 0;"
                >
                  Right End
                </n-button>
              </template>
              <div class="large-text">
                Oops!
              </div>
            </n-popover>
            <n-popover
              placement="bottom-start"
              trigger="click"
              style="grid-area: 5 / 2 / 6 / 3;"
            >
              <template v-slot:activator>
                <n-button
                  style="margin: 0;"
                >
                  Bottom Start
                </n-button>
              </template>
              <div class="large-text">
                Oops!
              </div>
            </n-popover>
            <n-popover
              placement="bottom"
              trigger="click"
              style="grid-area: 5 / 3 / 6 / 4;"
            >
              <template v-slot:activator>
                <n-button
                  style="margin: 0;"
                >
                  Bottom
                </n-button>
              </template>
              <div class="large-text">
                Oops!
              </div>
            </n-popover>
            <n-popover
              placement="bottom-end"
              trigger="click"
              style="grid-area: 5 / 4 / 6 / 5;"
            >
              <template v-slot:activator>
                <n-button
                  style="margin: 0;"
                >
                  Bottom End
                </n-button>
              </template>
              <div class="large-text">
                Oops!
              </div>
            </n-popover>
          </div>
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre><div class="popover-grid">
  <n-popover
    placement="top-start"
    trigger="click"
    style="grid-area: 1 / 2 / 2 / 3;"
  >
    <template v-slot:activator>
      <n-button
        style="margin: 0;"
      >
        Top Start
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover
    placement="top"
    trigger="click"
    style="grid-area: 1 / 3 / 2 / 4;"
  >
    <template v-slot:activator>
      <n-button
        style="margin: 0;"
      >
        Top
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover
    placement="top-end"
    trigger="click"
    style="grid-area: 1 / 4/ 2 / 5;"
  >
    <template v-slot:activator>
      <n-button
        style="margin: 0;"
      >
        Top End
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover
    placement="left-start"
    trigger="click"
    style="grid-area: 2 / 1 / 3 / 2;"
  >
    <template v-slot:activator>
      <n-button
        style="margin: 0;"
      >
        Left Start
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover
    placement="left"
    trigger="click"
    style="grid-area: 3 / 1 / 4 / 2;"
  >
    <template v-slot:activator>
      <n-button
        style="margin: 0;"
      >
        Left
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover
    placement="left-end"
    trigger="click"
    style="grid-area: 4 / 1 / 5 / 2;"
  >
    <template v-slot:activator>
      <n-button
        style="margin: 0;"
      >
        Left End
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover
    placement="right-start"
    trigger="click"
    style="grid-area: 2 / 5 / 3 / 6;"
  >
    <template v-slot:activator>
      <n-button
        style="margin: 0;"
      >
        Right Start
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover
    placement="right"
    trigger="click"
    style="grid-area: 3 / 5 / 4 / 6;"
  >
    <template v-slot:activator>
      <n-button
        style="margin: 0;"
      >
        Right
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover
    placement="right-end"
    trigger="click"
    style="grid-area: 4 / 5 / 5 / 6;"
  >
    <template v-slot:activator>
      <n-button
        style="margin: 0;"
      >
        Right End
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover
    placement="bottom-start"
    trigger="click"
    style="grid-area: 5 / 2 / 6 / 3;"
  >
    <template v-slot:activator>
      <n-button
        style="margin: 0;"
      >
        Bottom Start
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover
    placement="bottom"
    trigger="click"
    style="grid-area: 5 / 3 / 6 / 4;"
  >
    <template v-slot:activator>
      <n-button
        style="margin: 0;"
      >
        Bottom
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover
    placement="bottom-end"
    trigger="click"
    style="grid-area: 5 / 4 / 6 / 5;"
  >
    <template v-slot:activator>
      <n-button
        style="margin: 0;"
      >
        Bottom End
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
</div></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import docCodeEditorMixin from '../docCodeEditorMixin'
import debug from './debug.demo.vue'

export default {
  components: {
    debug
  },
  mixins: [docCodeEditorMixin],
  data () {
    return { content: 'hello', visible: false, showPopover: false, active1: false }
  }
}
</script>

<style scoped lang="scss">
.n-doc {
  width: 1020px;
  margin: auto;
}

.popover-grid {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-gap: 18px;
  justify-content: center;
  align-items: center;
  .n-button {
    width: 120px;
  }
}

.large-text {
  font-size: 72px;
}
</style>
