<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Tab / n-tab
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          <n-tab
            type="card"
          >
            <n-tab-panel label="Select">
              <n-form
                inline
                :label-width="80"
              >
                <n-form-item label="name">
                  <n-input placeholder="Input your name" />
                </n-form-item>
                <n-form-item label="age">
                  <n-input placeholder="Input your age" />
                </n-form-item>
                <n-form-item label="phone">
                  <n-input placeholder="Input your phone number" />
                </n-form-item>
              </n-form>
            </n-tab-panel>
            <n-tab-panel
              label="Hover"
            >
              haha: <n-input />
            </n-tab-panel>
            <n-tab-panel label="Normal">
              lala: <n-icon />
            </n-tab-panel>
            <n-tab-panel
              disabled
              label="Disable"
            >
              hehe: <n-button />
            </n-tab-panel>
            <n-tab-panel
              v-for="(item, i) in panels"
              :key="i"
              :label="item.label"
            >
              {{ item.content }}
            </n-tab-panel>
          </n-tab>
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
          <n-tab>
            <n-tab-panel label="form">
              <n-form
                inline
                :label-width="80"
              >
                <n-form-item label="name">
                  <n-input placeholder="Input your name" />
                </n-form-item>
                <n-form-item label="age">
                  <n-input placeholder="Input your age" />
                </n-form-item>
                <n-form-item label="phone">
                  <n-input placeholder="Input your phone number" />
                </n-form-item>
              </n-form>
            </n-tab-panel>
            <n-tab-panel
              disabled
              label="input"
            >
              haha: <n-input />
            </n-tab-panel>
            <n-tab-panel label="icon">
              lala: <n-icon />
            </n-tab-panel>
            <n-tab-panel label="button">
              hehe: <n-button />
            </n-tab-panel>
            <n-tab-panel
              v-for="(item, i) in panels"
              :key="i"
              :label="item.label"
            >
              {{ item.content }}
            </n-tab-panel>
          </n-tab>
          </textarea>
        </div>
      </div>

      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage / name attribute
        </div>
        <div class="n-doc-section__view">
          <n-button @click="updateName">
            Change Name
          </n-button>
          <n-tab
            :name="toggleName"
          >
            <n-tab-panel
              name="a"
              label="a"
            >
              Name: a. <br>
              We can control the element display by setting the tab's name attribute.<br>
              Also we can use tab-panel's active attribute to init the display.
              And tab-panels's active attribute is the first priority.
            </n-tab-panel>
            <n-tab-panel
              name="b"
              label="b"
            >
              Name: b. <br>
            </n-tab-panel>
          </n-tab>
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
          <n-button @click="updateName">
            Change Name
          </n-button>
          <n-tab
            :name="toggleName"
          >
            <n-tab-panel
              name="a"
              label="a"
            >
              Name: a. <br>
            </n-tab-panel>
            <n-tab-panel
              name="b"
              label="b"
            >
              Name: b. <br>
              We can control the element display by setting the tab's name attribute.<br>
              Also we can use tab-panel's active attribute to init the display.
              And tab-panels's active attribute is the first priority.
            </n-tab-panel>
          </n-tab>
          <script>
          export default {
            data () {
              return {
                toggleName: 'b'
              }
            },
            methods: {
              updateName () {
                this.toggleName = this.toggleName === 'a' ? 'b' : 'a'
              }
            }
          }
          </script>
          </textarea>
        </div>
      </div>

      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage / name attribute
        </div>
        <div class="n-doc-section__view">
          <n-tab
            type="card"
            closable
            addable
            :add-panel="addPanelItem"
            :tab-remove="tabRemove"
            :before-leave="beforeLeave"
          >
            <n-tab-panel label="closable">
              I am a input <n-input placeholder="lalala" />
            </n-tab-panel>
            <n-tab-panel
              active
              label="card mode"
            >
              I am an active button <n-button> hahaha </n-button>
              <br>Two mode supported now: normal and card.
              closable only can use in card mode.
              <br>
              Configure addable and add-panel attributes to dynamically add panels.
              <br>
              before-leave attribute: callback before tab-panel changed
              <br>
              tab-remove attribute: callback after tab removed, param is the instance of the panel.
              <br>
            </n-tab-panel>
            <n-tab-panel label="addable">
              I am a button <n-button> hahaha </n-button>
            </n-tab-panel>
            <n-tab-panel
              v-for="(i, j) in panels"
              :key="j"
              :label="i.label"
            >
              {{ i.content }}
            </n-tab-panel>
          </n-tab>
        </div>
        <div class="n-doc-section__source">
          <textarea v-pre>
             <n-tab
            type="card"
            closable
            addable
            :add-panel="addPanelItem"
            :tab-remove="tabRemove"
            :before-leave="beforeLeave"
          >
            <n-tab-panel label="closable">
              I am a input <n-input placeholder="lalala" />
            </n-tab-panel>
            <n-tab-panel
              active
              label="card mode"
            >
              I am an active button <n-button> hahaha </n-button>
              <br>Two mode supported now: normal and card.
              closable only can use in card mode.
              <br>
              Configure addable and add-panel attributes to dynamically add panels.
              <br>
              before-leave attribute: callback before tab-panel changed
              <br>
              tab-remove attribute: callback after tab removed, param is the instance of the panel.
              <br>
            </n-tab-panel>
            <n-tab-panel label="addable">
              I am a button <n-button> hahaha </n-button>
            </n-tab-panel>
            <n-tab-panel
              v-for="(i, j) in panels"
              :key="j"
              :label="i.label"
            >
              {{ i.content }}
            </n-tab-panel>
          </n-tab>
          <script>
            export {
              data () {
                return {

                }
              },
              methods: {
                addPanelItem () {
                  this.panels.push({
                    label: this.panels.length,
                    content: 'i am number' + this.panels.length
                  })
                },
                tabRemove (i) {
                  console.log('callback tab-remove', i)
                },
                beforeLeave (n, o) {
                  return new Promise((resolve, reject) => {
                    setTimeout(() => {
                      resolve('e')
                    }, 500)
                  })
                }
              }
            }
          </script>
          </textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import docCodeEditorMixin from './docCodeEditorMixin'

export default {
  mixins: [docCodeEditorMixin],
  data () {
    return {
      panels: [],
      toggleName: 'b'
    }
  },
  methods: {
    addPanelItem () {
      this.panels.push({
        label: this.panels.length,
        content: 'i am number' + this.panels.length
      })
    },
    tabRemove (i) {
      console.log('callback tab-remove', i)
    },
    updateName () {
      this.toggleName = this.toggleName === 'a' ? 'b' : 'a'
    },
    beforeLeave (n, o) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('e')
        }, 500)
      })
    }
  }
}
</script>
