<template>
  <div id='app'>
    <div>this is vue example</div>
    <son-one></son-one>
    <son-two></son-two>
    <son-three></son-three>
  </div>
</template>

<script>
import SonOne from "./components/SonOne";
import SonTwo from "./components/SonTwo";
import SonThree from "./components/SonThree";

export default {
  name: "app",
  components: {
    SonOne,
    SonTwo,
    SonThree
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
