<template>
  <div class="mt-2">
    <div v-for="(options, name) in domains" :key="name" class="mb-2">
      <domain-setting
        @removed="fetchDomains"
        @updated="fetchDomains"
        :options="options"
        :domain="name"
      ></domain-setting>
    </div>
  </div>
</template>

<script>
import DomainSetting from "../components/DomainSetting";
export default {
  components: {
    DomainSetting,
  },

  created() {
    this.fetchDomains();
  },

  data: () => {
    return {
      domains: {},
    };
  },

  methods: {
    fetchDomains() {
      chrome.storage.sync.get(["domains"], (result) => {
        this.domains = result.domains;
      });
    },
  },
};
</script>
