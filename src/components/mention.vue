<template>
  <div class="mention-wrap">
    <div
      class="mention-input"
      ref="mentionInputRef"
      contenteditable
      @mouseup="handlerMouseup"
      @keydown="handlerKeydown"
      @keyup="handlerKeyup"
      @blur="handlerBlur"
    >
      123
      <span data-id="123" class="mention-item" contenteditable="false">
        2222
      </span>
      <br />
    </div>
    <ul v-if="atActive">
      <li
        @click="mentionUserInsert(item)"
        v-for="item in mentions"
        :key="item.id"
      >
        {{ item.real_name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      move: false,
      selecedText: '',
      isShift: false,
      atActive: false, // at状态
      currentRang: null, // 当前选区对象
      searchVal: '',
      mentions: [
        {
          activated: 1,
          avatar:
            'https://movtile-dev.oss-cn-beijing.aliyuncs.com/project/image/1616483864608.png',
          email: '517034577@qq.com',
          id: 258,
          is_common_user: 1,
          is_company_super: 0,
          last_login_date: '2021-05-06 09:51:42',
          ownerd: 1,
          real_name: '罗京',
          role_id: 2,
          role_title: '项目所有者',
          role_type: 'fIOSuper',
          user_id: 142,
          vip_type: 2,
        },
        {
          activated: 1,
          avatar: '',
          email: '517034578@qq.com',
          id: 2041,
          is_common_user: 0,
          is_company_super: 0,
          last_login_date: '2021-04-29 11:53:07',
          ownerd: 0,
          real_name: '111',
          role_id: 4,
          role_title: '普通成员',
          role_type: 'fIOCooperate',
          user_id: 154,
          vip_type: 0,
        },
      ],
    }
  },
  watch: {
    searchVal: {
      handler(val) {
        if (val) {
          console.log('获取用户列表')
        } else {
          console.log('空值')
        }
      },
    },
  },
  methods: {
    handlerMouseup() {
      this.move = false
    },
    handlerKeydown(e) {
      if (e.code === 'ShiftLeft') {
        this.isShift = true
      }
    },
    handlerKeyup(e) {
      this.isAt(e)
    },
    handlerBlur() {},
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
          this.atActive = true
          this.saveCurrentSelection() // 保存当前选区对象
          this.handlerCreateAtEl()
        }
      }
      // shift状态改变
      if (e.code !== 'ShiftLeft') {
        this.isShift = false
      }
    },
    mentionUserInsert(data) {
      const el = this.createAtElement(data)
      this.currentRang.insertNode(el) // 插入提及人元素
    },
    handlerCreateAtEl() {
      const wrap = this.$refs.mentionInputRef // 可编辑父元素
      const searchEl = wrap.querySelector('.mention-search') // 查找可编辑父元素下的at状态元素
      // 如果之前有则转换为文本节点
      if (searchEl) {
        const text = document.createTextNode(searchEl.innerText)
        wrap.insertBefore(text, searchEl)
        wrap.removeChild(searchEl)
      }
      // 创建at状态元素
      this.createSearchElement()
    },
    // 创建@人元素
    createAtElement(data) {
      const span = document.createElement('span')
      span.innerText = data.real_name
      span.setAttribute('data-id', data.user_id)
      span.classList.add('mention-item')
      span.contentEditable = false
      return span
    },
    // 创建@人元素
    createSearchElement() {
      const span = document.createElement('span')
      span.innerText = ''
      span.classList.add('mention-search')
      span.contentEditable = true
      span.onkeyup = this.handlerSeatchEleInput
      this.currentRang.insertNode(span) // 插入到当前光标位置
      var range = document.createRange() // 创建新的选区对象
      range.setStart(span, 0) // 设置光标的位置
      var sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
      return span
    },
    // 保存当前选区对象
    saveCurrentSelection() {
      const selection = window.getSelection()
      const rang = selection.getRangeAt(0)
      this.currentRang = rang
    },
    handlerSeatchEleInput(e) {
      e.target.value = searchVal
      console.log(e.target.value)
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
  /deep/.mention-item {
    color: rgb(14, 214, 171);
  }
}
</style>
