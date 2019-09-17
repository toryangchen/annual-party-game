<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd kind="all" keyword="景点">全部</dd>
      <dd kind="part" keyword="美食">约会聚餐</dd>
      <dd kind="spa" keyword="丽人">丽人SPA</dd>
      <dd kind="movie" keyword="电影">电影演出</dd>
      <dd kind="travel" keyword="旅游">品质出游</dd>
    </dl>
    <ul class="ibody">
      <li v-for="(item, index) in cur" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.img" class="image" />
          <ul class="ubody">
            <li class="title">{{ item.title }}</li>
            <li class="pos">
              <span>{{ item.pos }}</span>
            </li>
            <li class="price">
              ¥<em>{{ item.price }}</em
              ><span>/起</span>
            </li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data: () => {
    return {
      kind: "",
      list: {
        all: [],
        part: [],
        spa: [],
        movie: [],
        travel: []
      }
    };
  },
  computed: {
    cur: function() {
      return this.list[this.kind];
    }
  },
  methods: {
    over: function(e) {}
  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/artistic.scss";
</style>
