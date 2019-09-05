<template>
  <div>hello {{ world }} {{ text }}</div>
</template>

<script>
export default {
  data() {
    return {
      text: null
    };
  },
  asyncData({ store, route }) {
    console.log("toryang 1: " + route.params.id);
    return store.dispatch("api/fetchVal", route.params.id);
  },
  computed: {
    world() {
      return this.$store.state.api.text;
    }
  },
  created() {
    this.text = "SSR";
  }
};
</script>

<style>
</style>