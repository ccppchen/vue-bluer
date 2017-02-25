/* eslint-disable */
import Vue from 'vue'

const ModalConstructor = Vue.extend(require('./modal.vue'))

ModalConstructor.prototype.close = function() {
  this.visible = false;
};

let Modal = (options = {}) => {
  let instance = new ModalConstructor({
    el: document.createElement('div')
  })

  let buttons = [
    { text: '确定', onClick: function() {} }
  ]

  instance.title = options.title || ''
  instance.content = options.content || ''
  instance.className = options.className || ''
  instance.effect = options.effect || 'zoomIn'
  instance.buttons = options.buttons || buttons

  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.visible = true
    instance.halfHeight = -(instance.$refs.modal.offsetHeight/2) + 'px'
  })

  return instance
}

export default Modal
