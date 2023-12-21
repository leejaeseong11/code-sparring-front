<template>
  <div class="monaco-editor-vue3" :style="style">
    <div id="resuet">결과창</div>
    <div id="outputDiv">
      <span v-html="replaceNewlines(this.output)"></span>
    </div>
    <button @click="_setValue(this.value)" class="button">리셋하기</button>
    <button :disabled="isButtonDisabled" @click="execution()" class="button">코드 실행하기</button>
    <button :disabled="isButtonDisabled" @click="submit()" class="button" id="submit">
      코드 제출하기
    </button>
    <div style="display: inline">🚨주의! Main클래스를 변경하지 마세요!</div>
    <br />
  </div>
</template>

<script>
import { apiClient } from '@/util/axios-interceptor'
import { defineComponent, computed, toRefs } from 'vue'
import * as monaco from 'monaco-editor'

export default defineComponent({
  name: 'MonacoEditor',
  data() {
    return {
      value:
        'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n      \n    }\n}',
      quizNo: '',
      memberNo: '',
      output: '',
      gameResult: '',
      buttonValue: '',
      isButtonDisabled: false
    }
  },
  props: {
    diffEditor: { type: Boolean, default: false },
    width: { type: [String, Number], default: '95%' },
    height: { type: [String, Number], default: '98%' },
    original: String,
    value: {
      type: String,
      default:
        'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n      \n    }\n}'
    },
    language: { type: String, default: 'java' },
    theme: { type: String, default: 'vs-dark' }, //vs, vs-dark, hc-black
    options: {
      type: Object,
      default() {
        return {
          minimap: { enabled: false }
        }
      }
    },
    parentButtonValue: {
      type: String,
      default: ''
    }
  },

  emits: ['editorWillMount', 'editorDidMount', 'change', 'update:value'],
  setup(props) {
    const { width, height } = toRefs(props)
    const style = computed(() => {
      const fixedWidth = width.value.toString().includes('%') ? width.value : `${width.value}px`
      const fixedHeight = height.value.toString().includes('%') ? height.value : `${height.value}px`
      return {
        width: fixedWidth,
        height: fixedHeight,
        'text-align': 'left',
        'align-items': 'center',
        'margin-left': '15px'
      }
    })
    return {
      style
    }
  },
  created() {
    // roomNo에 해당하는 quizNo 가져오기
    const url = `${this.backURL}/room/${this.$router.currentRoute.value.params.roomNo}`

    apiClient
      .get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        this.quizNo = response.data.quizNo
      })

    //memberNo
    const url2 = `${this.backURL}/member/memberNo`
    apiClient
      .get(url2, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        this.memberNo = response.data
      })
  },
  mounted() {
    // 모나코에디터 시작
    this.initMonaco()

    // 붙여넣기 막기
    this.editor.getDomNode().addEventListener(
      'paste',
      (event) => {
        event.stopPropagation()
        event.preventDefault()
      },
      true
    )
  },
  beforeUnmount() {
    this.editor && this.editor.dispose()
  },
  methods: {
    initMonaco() {
      this.$emit('editorWillMount', monaco)
      const { value, language, theme, options } = this
      this.editor = monaco.editor[this.diffEditor ? 'createDiffEditor' : 'create'](this.$el, {
        value: value,
        language: language,
        theme: theme,
        ...options
      })
      this.diffEditor && this._setModel(this.value, this.original)

      // @event `change`
      const editor = this._getEditor()
      editor &&
        editor.onDidChangeModelContent((event) => {
          const value = editor.getValue()
          if (this.value !== value) {
            this.$emit('change', value, event)
            this.$emit('update:value', value)
          }
        })

      this.$emit('editorDidMount', this.editor)
    },
    _setModel(value, original) {
      const { language } = this
      const originalModel = monaco.editor.createModel(original, language)
      const modifiedModel = monaco.editor.createModel(value, language)
      this.editor.setModel({
        original: originalModel,
        modified: modifiedModel
      })
    },
    _setValue(value) {
      let editor = this._getEditor()
      if (editor) return editor.setValue(value)
    },
    _getValue() {
      let editor = this._getEditor()
      if (!editor) return ''
      return editor.getValue()
    },
    _getEditor() {
      if (!this.editor) return null
      return this.diffEditor ? this.editor.modifiedEditor : this.editor
    },
    _setOriginal() {
      const { original } = this.editor.getModel()
      original.setValue(this.original)
    },
    // /n을 <br> 태그로 대체하는 메서드
    replaceNewlines(text) {
      return text.replace(/\n/g, '<br>')
    },
    execution() {
      this.buttonValue = '코드 실행!'
      this.$emit('monacoRunEvent', this.buttonValue)

      const quizNo = this.quizNo // 퀴즈번호
      const fileContent = this._getValue() // 실행할 코드 내용을 지정해야 합니다.

      // FormData 객체 생성
      const formData = new FormData()

      // 텍스트 데이터 추가
      formData.append('quizNo', quizNo)

      // 파일 데이터 추가
      const mainFile = new Blob([fileContent], { type: 'text/plain' })
      formData.append('Main', mainFile, 'hello.txt')

      const url = `${this.backURL}/code/executeCode`
      apiClient
        .post(url, formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          this.output = response.data
        })
        //네트워크에 의한 요청 실패일 경우
        .catch((error) => {
          console.log(error)
          alert(error.message)
        })
    },
    submit() {
      this.buttonValue = '코드 제출!'
      this.$emit('monacoSubmitEvent', this.buttonValue)

      const quizNo = this.quizNo // 퀴즈번호
      const memberNo = this.memberNo // 멤버번호
      const fileContent = this._getValue() // 실행할 코드 내용을 지정해야 합니다.

      // FormData 객체 생성
      const formData = new FormData()

      // dto 객체 생성 및 JSON 문자열로 변환 후 formData에 추가
      const dto = { memberNo, quizNo }
      formData.append(
        'dto',
        new Blob([JSON.stringify(dto)], { type: 'application/json' }),
        'dto.json'
      )

      // 파일 데이터 추가
      const mainFile = new Blob([fileContent], { type: 'text/plain' })
      formData.append('Main', mainFile, 'Code.txt')

      const url = `${this.backURL}/submit/normalMode`
      apiClient
        .post(url, formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          this.output = response.data.result
          this.gameResult = response.data.gameResult

          if (this.gameResult == '1') {
            this.$emit('monacoWinMemberNo', this.memberNo)
          }
        })
        //네트워크에 의한 요청 실패일 경우
        .catch((error) => {
          console.log(error)
          alert(error.message)
        })
    }
  },
  watch: {
    options: {
      deep: true,
      handler(options) {
        this.editor.updateOptions(options)
      }
    },
    value() {
      this.value !== this._getValue() && this._setValue(this.value)
    },
    original() {
      this._setOriginal()
    },
    language() {
      if (!this.editor) return
      if (this.diffEditor) {
        const { original, modified } = this.editor.getModel()
        monaco.editor.setModelLanguage(original, this.language)
        monaco.editor.setModelLanguage(modified, this.language)
      } else monaco.editor.setModelLanguage(this.editor.getModel(), this.language)
    },
    theme() {
      monaco.editor.setTheme(this.theme)
    },
    parentButtonValue(newValue) {
      const rawData = newValue
      const colonIndex = rawData.indexOf(':')
      var msgMemberButtonValue = ''

      if (colonIndex !== -1) {
        msgMemberButtonValue = rawData.substring(colonIndex + 1).trim()
      }

      if (msgMemberButtonValue === '코드 실행!') {
        this.isButtonDisabled = true
        setTimeout(() => {
          this.isButtonDisabled = false
        }, 5000)
      } else if (msgMemberButtonValue === '코드 제출!') {
        this.isButtonDisabled = true
        setTimeout(() => {
          this.isButtonDisabled = false
        }, 10000)
      }
    }
  }
})
</script>

<style>
.monaco-editor-vue3 {
  overflow: hidden;
  margin-top: 5px;
}

#outputDiv {
  background-color: var(--white-color);
  height: 200px;

  border: 3px solid var(--main5-color);
  border-radius: 10px;

  padding: 8px;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.button {
  padding: 8px;
  margin: 5px;
  font-size: 1rem;

  color: var(--main1-color);
  background-color: var(--main4-color);
  border: none;
  border-radius: 6px;

  &:hover {
    background-color: var(--main4-hover-color);
  }
}

#submit {
  color: var(--main1-color);
  background-color: var(--red-color);
  border: none;
  border-radius: 6px;

  &:hover {
    background-color: var(--red-hover-color);
  }
}
</style>
