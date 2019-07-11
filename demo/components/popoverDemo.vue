/**
  有待解决一个bug，在nimbus新的layout下，不使用transfer 弹出的定位是不准的，所以这里默认使用了transfer,经过查询可能是 overflow:auto造成的影响但是还是没有解决
 */
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
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          <n-popover>
            <n-button style="margin:0">
              hover
            </n-button>
            <span slot="content">hello baby</span>
          </n-popover>
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
          <n-popover>
            <n-button>hover</n-button>
            <span slot="content">hello baby</span>
          </n-popover>
          </textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          word wrap
        </div>
        <div class="n-doc-section__view">
          <n-popover
            placement="bottom"
            :width="200"
          >
            <n-button style="margin:0">
              word wrap
            </n-button>
            <span slot="content">"Beautiful designs at up to 70% Off. Article offers stylish modern, mid-century and scandinavian furniture from world renowned designers at accessible prices."</span>
          </n-popover>
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
           <n-popover placement="left">
            <n-button style="margin:0">hover show left</n-button>
            <span slot="content">hello baby</span>
          </n-popover>
          </textarea>
        </div>
      </div>
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Change placement
        </div>
        <div class="n-doc-section__view">
          <n-popover placement="left-start">
            <n-button style="margin:0">
              hover show left-start
            </n-button>
            <span slot="content">hello baby</span>
          </n-popover>
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
            /*
            support:
            'top',
            'top-start',
            'top-end',
            'bottom',
            'bottom-start',
            'bottom-end',
            'left',
            'left-start',
            'left-end',
            'right',
            'right-start',
            'right-end'
          */
           <n-popover placement="left-start'">
            <n-button style="margin:0">hover show left-start</n-button>
            <span slot="content">hello baby</span>
          </n-popover>
          </textarea>
        </div>
      </div>

      <!-- <div class="n-doc-section">
        <div class="n-doc-section__header">
          Transfer dom to body
        </div>
        <div class="n-doc-section__view">
          <n-popover placement="top-end">
            <n-button style="margin:0">transfer to body</n-button>
            <span slot="content">hello baby</span>
          </n-popover>
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
          <n-popover placement="top-end">
            <n-button style="margin:0">transfer to body</n-button>
            <span slot="content">hello baby</span>
          </n-popover>
          </textarea>
        </div>
      </div> -->

      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Click to show
        </div>
        <div class="n-doc-section__view">
          <n-popover
            placement="left"
            trigger="click"
            transfer
          >
            <n-button style="margin:0">
              click to show
            </n-button>
            <span slot="content">click out side to hide</span>
          </n-popover>
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
          <n-popover placement="left" trigger="click" transfer>
            <n-button style="margin:0">click to show</n-button>
            <span slot="content">click out side to hide</span>
          </n-popover>
          </textarea>
        </div>
      </div>
    </div>

    <div class="n-doc-section">
      <div class="n-doc-section__header">
        No Arrow
      </div>
      <div class="n-doc-section__view">
        <n-popover
          placement="left"
          trigger="click"
          transfer
          :arrow="false"
        >
          <n-button style="margin:0">
            No Arrow
          </n-button>
          <span slot="content">click out side to hide</span>
        </n-popover>
      </div>
      <div class="n-doc-section__source">
        <textarea v-pre>
<n-popover placement="left" trigger="click" transfer :arrow="false">
  <n-button style="margin:0">No Arrow</n-button>
  <span slot="content">click out side to hide</span>
</n-popover></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import docCodeEditorMixin from './docCodeEditorMixin'

export default {
  mixins: [docCodeEditorMixin],
  data () {
    return { content: 'hello', visible: false }
  }
}
</script>

<style scoped lang="scss">
.doc {
  width: 780px;
  margin: 0 auto;
  .doc-header {
    display: flex;
    height: 60px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    align-items: center;
  }
  .doc-body {
    padding-top: 14px;
  }
  .section-header {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 12px;
  }
  .section {
    background: #5c657eff;
    padding: 18px;
    border-radius: 8px;
    justify-content: center;
    display: flex;
    margin-bottom: 12px;
  }
}
</style>
