<template>
  <div class="mention-wrap">
    <div
      class="mention-input"
      ref="mentionInputRef"
      contenteditable
      @mousedown="mousedownHandler"
      @mousemove="mousemoveHandler"
      @mouseup="mouseupHandler"
      @keydown="keydownHandler"
      @keyup="keyupHandler"
    >
      123
      <span contenteditable="false">
        2222
      </span>
      <br />
    </div>
    {{ isShift }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      move: false,
      selecedText: '',
      isShift: false,
    }
  },
  methods: {
    mousedownHandler() {
      this.move = true
    },
    mousemoveHandler() {
      if (this.move) {
        const mentionInputRef = this.$refs.mentionInputRef
        const innerText = mentionInputRef.innerText
        const seletion = window.getSelection()
        const range = seletion.getRangeAt(0)
        const startOffset = range.startOffset
        const endOffset = range.endOffset
        const selecedText = innerText.slice(startOffset, endOffset)
        this.selecedText = selecedText
        // console.log(innerText.slice(startOffset, endOffset))
      }
    },
    mouseupHandler() {
      this.move = false
    },
    keydownHandler(e) {
      if (e.code === 'ShiftLeft') {
        this.isShift = true
      }
    },
    keyupHandler(e) {
      this.isAt(e)
    },
    // 是否为@
    isAt(e) {
      const keyCode = e.keyCode
      if (keyCode === 50 && this.isShift) {
        const selection = window.getSelection() // 获取选区对象
        const range = selection.getRangeAt(0) // 获取当前选取
        const startOffset = range.startOffset // 获取当前光标位置
        const offset = 2 // 偏移量  (' '@|)  (|:光标、' ':空格) 当前位置(|) - 2 判断@前是否空格
        const anchorNode = selection.anchorNode // 当前选区所在的节点
        const nodeType = anchorNode.nodeType // 3 文本节点 1元素节点
        let innerText = '' // 定义内容
        // 文本节点
        if (nodeType === 3) {
          innerText = anchorNode.nodeValue
          // 元素节点
        } else if (nodeType === 1) {
          innerText = anchorNode.innerText
        }
        const preAt = innerText[startOffset - offset] // @之前的内容
        const keyCode = preAt && preAt.charCodeAt() // 装换Unicode
        const blacks = [160, 32] // 部分浏览器第一个空格Unicode码为160 之后为32
        // 如果@之前有空格 生效
        if (blacks.includes(keyCode)) {
          console.log('是@')
        }
      }
      // shift状态改变
      if (e.code !== 'ShiftLeft') {
        this.isShift = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.mention-wrap {
  width: 500px;
  min-height: 300px;
  .mention-input {
    width: 100%;
    height: 100%;
    border: 1px solid gray;
  }
}
</style>
