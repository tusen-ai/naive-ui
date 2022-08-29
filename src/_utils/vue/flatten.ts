import { Fragment, VNodeChild, createTextVNode, VNode, Comment } from 'vue'

// o(n) flatten
export function flatten(vNodes: VNode[], result: VNode[] = [], key?: string) {
  vNodes.forEach((vNode) => {
    if (vNode === null) return;
    if (typeof vNode !== 'object') {
      if (typeof vNode === 'string' || typeof vNode === 'number') {
          result.push(createTextVNode(String(vNode)));
      }
      return;
    }
    if (Array.isArray(vNode)) {
      flatten(vNode, result);
      return;
    }
    if (vNode.type === Fragment) {
      if (vNode.children === null) return;
      const currentKey = key
        ? `${key}_${String(vNode.key)}`
        : String(vNode.key);
      if (Array.isArray(vNode.children)) {
        (vNode.children as VNode[]).forEach(
          (node: VNode, index: number) => {
            if (node.key === undefined || node.key === null) {
              node.key = `${currentKey}_${index}`;
            }
          },
        );
        flatten(vNode.children as VNode[], result, currentKey);
      }
      // rawSlot
    } else {
      result.push(vNode);
    }
  });
  return result;
}
