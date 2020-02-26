import { KEY_CODE } from '../event/keyCode'

class KeyboardDelegate {
  constructor () {
    this.shiftPressed = false
    this.ctrlPressed = false
    this.commandPressed = false
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
      }
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
      }
    })
  }
  getKeyboardStatus () {
    return {
      shiftPressed: this.shiftPressed,
      ctrlPressed: this.ctrlPressed,
      commandPressed: this.commandPressed
    }
  }
}

export default new KeyboardDelegate()
