<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
  import Home from './components/Home'

  export default {
    name: 'app',
    components: {
      Home
    }
  }
</script>

<style>
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
