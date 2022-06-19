export function isDocument (node: Node): node is Document {
  return node.nodeName === '#document'
}
