import Upload from './src/Upload.vue'
import UploadDragger from './src/UploadDragger.vue'

Upload.install = function (Vue) {
  Vue.component(Upload.name, Upload)
  Vue.component(UploadDragger.name, UploadDragger)
}

export default Upload
