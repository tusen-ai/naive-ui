import Vue from 'vue'
import '../styles/index.scss'
import Demo from './demo.vue'
import Card from 'packages/Card'
import Icon from 'packages/Icon'

Card.install(Vue)
Icon.install(Vue)

;(new Vue(Demo)).$mount('#app')