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
      <div>
        <p>Total visits: {{ options.visits.length }}</p>
      </div>

      <div class="form-group">
        <label>
          {{ options.enabled ? "Active" : "Disabled" }}
        </label>
        <input
          type="checkbox"
          v-model="options.enabled"
          @click="toggleActive()"
        />
      </div>

      <div class="form-group">
        <label>Minutes to wait</label>
        <input
          class="w-100"
          type="number"
          v-model="options.options.delay"
          @keyup="updateDelay"
        />
      </div>

      <div class="form-group">
        <label>Message to yourself</label>
        <textarea
          class="w-100"
          v-model="options.options.message"
          @keyup="updateMessage"
        ></textarea>
      </div>

      <visit-report-chart
        :domain="domain"
        :domain-props="options"
      ></visit-report-chart>
    </div>
  </div>
</template>

<script>
import VisitReportChart from "./VisitReportChart.vue";
export default {
  components: {
    VisitReportChart,
  },

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

    updateDelay() {
      chrome.storage.sync.get(["domains"], (result) => {
        var domains = { ...result.domains };
        domains[this.domain].options.delay = this.options.options.delay;
        this.updateDomains(domains);
      });
    },

    updateMessage() {
      chrome.storage.sync.get(["domains"], (result) => {
        var domains = { ...result.domains };
        domains[this.domain].options.message = this.options.options.message;
        this.updateDomains(result.domains);
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
