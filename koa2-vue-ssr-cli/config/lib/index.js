// https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-shared-utils/lib

['env', 'openBrowser'].forEach(m => {
  Object.assign(exports, require(`./${m}`));
});
