function getTitle(vm) {
  const { title } = vm.$options;

  if (title) {
    return typeof title === 'function' ? title.call(vm) : title;
  }
}

/**
 * 在SSR中，mounted()钩子函数不执行，
 * 于是在server的 Mixin 中，将created 换成 mounted
 */
const serverTitleMixin = {
  created() {
    const title = getTitle(this);
    if (title) {
      this.$ssrContext.title = `Vue HN 2.0 | ${title}`;
    }
  },
};

const clientTitleMixin = {
  mounted() {
    const title = getTitle(this);
    if (title) {
      document.title = `Vue HN 2.0 | ${title}`;
    }
  },
};

export default process.env.VUE_ENV === 'server'
  ? serverTitleMixin
  : clientTitleMixin;
