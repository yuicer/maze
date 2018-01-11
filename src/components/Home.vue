<template>
    <div id="box">
     	 <div id="kaiwa_box">
        <section>
          <div>{{text}}</div>
        </section>
      </div>
       <canvas tabindex="0" id="canvas"></canvas>
    </div>
</template>

<script>
  import text_ from '../game/text.js'
  export default {
    name: 'game',
    data() {
      return {
        text: text
      }
    },
    mounted: function () {

      require('../game')
    }
  }

</script>

<style>
  #canvas {
    display: block;
  }
  #box {
    width: 100%;
    height: 100%;
  }
  #kaiwa_box {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 16vh;
    background: translate;
    padding: 2vh;
  }

  section {
    width: 60vw;
    min-height: 80%;
    margin: auto;
    padding: 1.5vh;
    text-align: left;
    border: 2px solid white;
    text-indent: 48px;
    font-size: 24px;
    color: white;
    overflow: auto;
  }

  section > div {
    word-break: break-all;
  }
</style>
