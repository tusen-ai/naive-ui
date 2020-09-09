import Upload from './src/Upload.vue'
import UploadDragger from './src/UploadDragger.vue'

Upload.install = function (Vue, naive) {
  Vue.component(naive.componentPrefix + Upload.name, Upload)
  Vue.component(naive.componentPrefix + UploadDragger.name, UploadDragger)
}

export default Upload
