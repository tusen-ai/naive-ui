import { Fragment, ref, h, reactive } from 'vue'
import { createId } from 'seemly'
import { omit } from '../../_utils'
import DialogEnvironment from './DialogEnvironment.vue'
import { useClicked, useClickPosition } from 'vooks'

export default {
  name: 'DialogProvider',
  props: {
    to: {
      type: [String, Object],
      default: undefined
    }
  },
  provide () {
    return {
      dialog: {
        create: this.create,
        success: this.success,
        warning: this.warning,
        error: this.error
      }
    }
  },
  setup () {
    const dialogListRef = ref([])
    return {
      dialogList: dialogListRef,
      clicked: useClicked(),
      clickPosition: useClickPosition()
    }
  },
  methods: {
    create (options = {}) {
      const key = createId()
      const dialogReactive = reactive({
        ...options,
        key,
        destroy: () => {
          this.$refs[`n-dialog-${key}`].hide()
        }
      })
      this.dialogList.push(dialogReactive)
      return dialogReactive
    },
    ...[
      'success',
      'warning',
      'error'
    ].reduce((api, type) => {
      api[type] = function (options) {
        return this.create({ ...options, type })
      }
      return api
    }, {}),
    handleAfterLeave (key) {
      const { dialogList } = this
      dialogList.splice(
        dialogList.findIndex(dialog => dialog.key === key),
        1
      )
    }
  },
  render () {
    return h(Fragment, null,
      [
        this.dialogList.map(dialog => h(DialogEnvironment, omit(
          dialog,
          ['destroy'],
          {
            clicked: this.clicked,
            clickPosition: this.clickPosition,
            to: dialog.to ?? this.to,
            ref: `n-dialog-${dialog.key}`,
            onInternalAfterLeave: this.handleAfterLeave
          }
        ))),
        this.$slots.default()
      ]
    )
  }
}
