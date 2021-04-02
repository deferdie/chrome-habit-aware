<template>
  <div class="domain-setting">
    <div class="d-flex justify-space-between">
      <div
        class="domain-title cursor-pointer flex-grow-1"
        @click="show = !show"
      >
        {{ domain }}
      </div>
      <div class="cursor-pointer" @click="show = !show">
        <button class="btn btn-danger" @click="removeSite">X</button>
      </div>
    </div>
    <div class="domain-setting-body" v-show="show">
      <p>Total visits: {{ options.visits.length }}</p>
      {{ options.enabled ? "Active" : "Disabled" }}
      <input
        type="checkbox"
        v-model="options.enabled"
        @click="toggleActive()"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["domain", "options"],

  data() {
    return {
      show: true,
    };
  },

  methods: {
    removeSite() {
      chrome.storage.sync.get(["domains"], (result) => {
        var domains = result.domains;

        delete domains[this.domain];

        this.updateDomains(domains);
      });
    },

    toggleActive() {
      chrome.storage.sync.get(["domains"], (result) => {
        var domains = { ...result.domains };

        domains[this.domain].enabled = this.options.enabled;

        this.updateDomains(domains);
      });
    },

    updateDomains(domains) {
      chrome.storage.sync.set({
        domains,
      });

      this.$emit("updated", this.domain);
    },
  },
};
</script>
