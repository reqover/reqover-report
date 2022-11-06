<template>
  <v-card>
    <v-tabs v-model="tab" start>
      <v-tab :value="1"
        >All
        <v-badge :content="all.size" text-color="white" inline></v-badge>
      </v-tab>
      <v-tab :value="2" color="red">
        Missing
        <v-badge color="error" :content="missing.size" inline></v-badge>
      </v-tab>
      <v-tab :value="3" color="warning">
        Partial
        <v-badge
          style="color: #ffc107"
          color="warning"
          :content="partial.size"
          inline
        ></v-badge>
      </v-tab>
      <v-tab :value="4" color="blue">
        Conditional
        <v-badge color="info" :content="conditional.size" inline></v-badge>
      </v-tab>
      <v-tab :value="5" color="success">
        Full
        <v-badge color="success" :content="full.size" inline></v-badge>
      </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item :key="1" :value="1">
        <v-container fluid>
          <expand-panel-vue :results="all.items"></expand-panel-vue>
        </v-container>
      </v-window-item>
      <v-window-item :key="2" :value="2">
        <v-container fluid>
          <expand-panel-vue :results="missing.items"></expand-panel-vue>
        </v-container>
      </v-window-item>
      <v-window-item :key="3" :value="3">
        <v-container fluid>
          <expand-panel-vue :results="partial.items"></expand-panel-vue>
        </v-container>
      </v-window-item>
      <v-window-item :key="4" :value="4">
        <v-container fluid>
          <expand-panel-vue :results="conditional.items"></expand-panel-vue>
        </v-container>
      </v-window-item>
      <v-window-item :key="5" :value="5">
        <v-container fluid>
          <expand-panel-vue :results="full.items"></expand-panel-vue>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import ExpandPanelVue from "./ExpandPanel.vue";

export default {
  props: ["build"],
  data: () => ({
    tab: null,
  }),
  computed: {
    all() {
      return this.build.report.result.all;
    },
    missing() {
      return this.build.report.result.missing;
    },
    partial() {
      return this.build.report.result.partial;
    },
    conditional() {
      return this.build.report.result.hasSkipCodes;
    },
    full() {
      return this.build.report.result.full;
    },
  },
  components: { ExpandPanelVue },
};
</script>

<style>
.bg-warning {
  color: white !important;
}
</style>
