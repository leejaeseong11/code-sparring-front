<template>
    <div class="monaco-editor-vue3" :style="style">
        <div>결과창</div>
        <div id="outputDiv"></div>
        <button @click="_setValue(this.value)" class="button">리셋하기</button>
        <button @click="execution()" class="button">코드 실행하기</button>
        <button @click="submit()" class="button" id="submit">코드 제출하기</button>
        <br>
    </div>
    
  </template>
  
  

  <style>
  .monaco-editor-vue3{
    overflow: hidden;
    margin-top: 5px; 
  }
  #outputDiv{
    background-color: var(--white-color); 
    height: 200px; 

    border: 3px solid var(--main5-color);
    border-radius: 10px;
    
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }

  .button{
    padding: 8px;
    margin: 5px;
    font-size: 1.0rem;

    color: var(--main1-color);
    background-color: var(--main4-color);
    border: none;
    border-radius: 6px;

    &:hover {
        background-color: var(--main4-hover-color);
    }
  }

  #submit{
      color: var(--main1-color);
      background-color: var(--red-color);
      border: none;
      border-radius: 6px;

      &:hover {
          background-color: var(--red-hover-color);
      }
    }
  </style>
  
  <script>
  import axios from 'axios';
  import { defineComponent, computed, toRefs } from 'vue'
  import * as monaco from 'monaco-editor'
  
  export default defineComponent({
    name: 'MonacoEditor',
    data(){
        return{
            value: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n      \n    }\n}',
        };
    },
    props: {
      diffEditor: { type: Boolean, default: false },
      width: { type: [String, Number], default: '95%' },
      height: { type: [String, Number], default: '98%' },
      original: String,
      value: {type: String, 
        default: 'import java.io.*;\nimport java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n      \n    }\n}'},
      language: { type: String, default: 'java' },
      theme: { type: String, default: 'vs-dark' }, //vs, vs-dark, hc-black
      options: {
        type: Object,
        default() {
          return {
            minimap: { enabled: false,},
            // paste: { enabled: false, showPasteSelector: 'never'}
          }
        },
      },
    },

    emits: ['editorWillMount', 'editorDidMount', 'change', 'update:value'],
    setup(props) {
      const { width, height } = toRefs(props)
      const style = computed(() => {
        const fixedWidth = width.value.toString().includes('%')
          ? width.value
          : `${width.value}px`
        const fixedHeight = height.value.toString().includes('%')
          ? height.value
          : `${height.value}px`
        return {
          width: fixedWidth,
          height: fixedHeight,
          'text-align': 'left',
          'align-items': 'center',
          'margin-left': '15px',
          // 'background-color': 'black',
          // 'border': '3px solid var(--main5-color)',
          // 'border-radius': '10px'
        }
      })
      return {
        style,
      }
    },
    mounted() {
      this.initMonaco()

      // 붙여넣기 막기
      this.editor.getDomNode().addEventListener('paste', (event) => {
        event.stopPropagation();
        event.preventDefault();
      }, true);
    },
    beforeUnmount() {
      this.editor && this.editor.dispose()
    },
    methods: {
      initMonaco() {
        this.$emit('editorWillMount', monaco)
        const { value, language, theme, options } = this
        this.editor = monaco.editor[
          this.diffEditor ? 'createDiffEditor' : 'create'
        ](this.$el, {
          value: value,
          language: language,
          theme: theme,
          ...options,
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
          modified: modifiedModel,
        })
      },
      _setValue(value) {
        let editor = this._getEditor()
        if (editor) return editor.setValue(value)
      },
      _getValue() {
        let editor = this._getEditor()
        if (!editor) return ''
        console.log(editor.getValue())
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
      execution(){

        const quizNo = 100;  // 퀴즈번호
        const fileContent = this._getValue();  // 실행할 코드 내용을 지정해야 합니다.

        // FormData 객체 생성
        const formData = new FormData();

        // 텍스트 데이터 추가
        formData.append('quizNo', quizNo);

        // 파일 데이터 추가
        const mainFile = new Blob([fileContent], { type: 'text/plain' });
        formData.append('Main', mainFile, 'hello.txt');
        const url = "http://192.168.1.112:8080/code/executeCode"
        axios
        .post(url, formData, {
            withCredentials: true,
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        })
        .then(response=>{
            alert(response.data)
            // alert(response.data.msg)
            console.log(response.data)
            const outputDiv = document.getElementById('outputDiv');
            outputDiv.textContent = response.data;
            // id.div.setValue(response.data.msg);
        })
        //네트워크에 의한 요청 실패일 경우
        .catch(error=>{
            console.log(error)
            alert(error.message)
            // this.error = error.response.data.error
        })
      },
      submit(){
        
        const quizNo = 100;  // 퀴즈번호
        const fileContent = this._getValue();  // 실행할 코드 내용을 지정해야 합니다.

        // FormData 객체 생성
        const formData = new FormData();

        // dto 객체 생성 및 JSON 문자열로 변환 후 formData에 추가
        const dto = { memberNo: 2, quizNo: 100};
        formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }), 'dto.json');

        // 파일 데이터 추가
        const mainFile = new Blob([fileContent], { type: 'text/plain' });
        formData.append('Main', mainFile, 'hello.txt');
        
        const url = "http://192.168.1.112:8080/submit/normalMode"
        axios
        .post(url, formData, {
            withCredentials: true,
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        })
        .then(response=>{
            alert(response.data)
            const outputDiv = document.getElementById('outputDiv');
            outputDiv.textContent = response.data;
            // id.div.setValue(response.data.msg);
        })
        //네트워크에 의한 요청 실패일 경우
        .catch(error=>{
            console.log(error)
            alert(error.message)
            // this.error = error.response.data.error
        })
      }
    },
    watch: {  
      options: {
        deep: true,
        handler(options) {
          this.editor.updateOptions(options)
        },
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
        } else
          monaco.editor.setModelLanguage(this.editor.getModel(), this.language)
      },
      theme() {
        monaco.editor.setTheme(this.theme)
      },
    },
  })
  </script>