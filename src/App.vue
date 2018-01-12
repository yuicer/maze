<template>
  <div id="app">
      <section v-show="text">{{text}}</section>
    <canvas tabindex="0" id="canvas"></canvas>
  </div>
</template>

<script>
  import text_ from './game/text.js'
  import game from './game'
  export default {
    data() {
      return {
        text: '',
        drama: {}
      }
    },
    mounted: function () {
      game(this)
    },
    methods: {
      kaiwa(name) {
        this.drama = text_[name]
        this.Even(1)
        this[name] = true
      },
      Even(index) {
        var me = this
        var word = me.drama['a' + index]
        me.text = ''
        //一个even只负责一句话
        var timer = setInterval(function () {
          if (word) {
            me.text += word.slice(0, 1)
            word = word.slice(1)
          } else if (me.drama['a' + (index + 1)]) {
            clearInterval(timer)
            setTimeout(() => {
              me.Even(index + 1)
            }, 1000)
          } else {
            clearInterval(timer)
            setTimeout(() => {
              me.text = ''
            }, 1000)
          }
        }, 100)
      }
    }
  }
</script>

<style>
  #canvas {
    display: block;
  }

  section {
    position: fixed;
    top: 40px;
    left: 20%;
    width: 60%;
    min-height: 80px;
    padding: 20px;
    border: 2px solid white;
    text-indent: 2em;
    font-size: 24px;
    color: white;
    overflow: auto;
    word-break: break-all;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  html {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-user-select: none;
    -moz-user-focus: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
