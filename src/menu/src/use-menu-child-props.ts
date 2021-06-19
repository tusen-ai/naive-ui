import { PropType, VNodeChild } from 'vue'
import { Key } from 'treemate'

export const useMenuChildProps = {
  internalKey: {
    type: [String, Number] as PropType<Key>,
    required: true
  },
  root: Boolean,
  isGroup: Boolean,
  level: {
    type: Number,
    required: true
  },
  title: [String, Function] as PropType<string | (() => VNodeChild)>,
  extra: [String, Function] as PropType<string | (() => VNodeChild)>
} as const
