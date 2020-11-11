// index.js
import { createApp } from 'vue'
import {
  create,
  enUS,
  Button,
  Input,
  buttonLight,
  inputLight
} from '../../es'

const app = createApp()
const naive = create({
  // install components globally or import it in other component are both ok
  components: [
    Button,
    Input
  ],
  styles: [
    buttonLight,
    inputLight
  ],
  locales: [
    enUS
  ]
})

app.use(naive)
