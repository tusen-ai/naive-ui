export function isNullObj (obj: object): boolean {
  return Object.keys(obj).length === 0
}
export function judgePeersHasVarName (peers: Record<string, object>, varNamePattern: string): boolean {
  let flag = false
  if (isNullObj(peers)) return false
  const peerItems = Object.keys(peers)
  for (let i = 0; i < peerItems.length; i++) {
    const peerItem = peers[peerItems[i]]
    if (!peerItem) continue
    const peerItemKeys = Object.keys(peerItem)
    flag = peerItemKeys.filter(item => item.toLowerCase().includes(varNamePattern)).length > 0
    if (flag) return flag
  }
  return flag
}
