let cbs = []

function flushCb () {
  cbs.forEach(cb => cb())
  cbs = []
}

export default function nextFrame (cb) {
  cbs.push(cb) === 1 && requestAnimationFrame(flushCb)
}
