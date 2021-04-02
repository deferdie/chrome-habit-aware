<template>
  <div id="home">
    <h1>Hello {{ domains }}</h1>

    <div v-for="(options, name) in domains" :key="name">
      <domain-setting :options="options" :domain="name"></domain-setting>
    </div>
  </div>
</template>

<script>
import DomainSetting from "./DomainSetting.vue";
export default {
  components: {
    DomainSetting,
  },

  created() {
    chrome.storage.sync.get(["domains"], (result) => {
      this.domains = result.domains;
    });
  },

  data: () => {
    return {
      domains: {},
    };
  },
};
</script>
