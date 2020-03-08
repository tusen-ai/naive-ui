import { KEY_CODE } from '../event/keyCode'

class KeyboardDelegate {
  constructor () {
    this.shiftPressed = false
    this.ctrlPressed = false
    this.commandPressed = false
    this.handlerInfoList = []
    window.addEventListener('keydown', e => {
      switch (e.keyCode) {
        case KEY_CODE.SHIFT:
          this.shiftPressed = true
          break
        case KEY_CODE.CTRL:
          this.ctrlPressed = true
          break
        case KEY_CODE.COMMAND:
          this.commandPressed = true
          break
        case KEY_CODE.TAB:
          this.tabPressed = true
          break
      }
      this.handlerInfoList.forEach(handlerInfo => {
        if (
          handlerInfo.keyCode === e.keyCode &&
          handlerInfo.type === 'keydown'
        ) {
          if (handlerInfo.preventDefault) e.preventDefault()
          if (handlerInfo.stopPropagation) e.stopPropagation()
          handlerInfo.handler()
        }
      })
    })
    window.addEventListener('keyup', e => {
      switch (e.keyCode) {
        case KEY_CODE.SHIFT:
          this.shiftPressed = false
          break
        case KEY_CODE.CTRL:
          this.ctrlPressed = false
          break
        case KEY_CODE.ALT:
          this.commandPressed = false
          break
        case KEY_CODE.TAB:
          this.tabPressed = false
          break
      }
      this.handlerInfoList.forEach(handlerInfo => {
        if (
          handlerInfo.keyCode === e.keyCode &&
          handlerInfo.type === 'keyup'
        ) {
          if (handlerInfo.preventDefault) e.preventDefault()
          if (handlerInfo.stopPropagation) e.stopPropagation()
          handlerInfo.handler()
        }
      })
    })
  }
  getKeyboardStatus () {
    return {
      shiftPressed: this.shiftPressed,
      ctrlPressed: this.ctrlPressed,
      commandPressed: this.commandPressed,
      tabPressed: this.c
    }
  }
  registerHandler (keyCode, type, handler, options = {}) {
    this.handlerInfoList.push({
      keyCode,
      handler,
      type,
      preventDefault: options.preventDefault,
      stopPropagation: options.stopPropagation,
      capture: options.capture
    })
  }
  unregisterHandler (handler) {
    this.handlerInfoList = this.handlerInfoList.filter(handlerInfo => {
      return handler !== handlerInfo.handler
    })
  }
}

export default new KeyboardDelegate()
