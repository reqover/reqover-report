<template>
  <div v-if="build.report.result">
    <v-row class="mt-2">
      <v-col>
        <v-card>
          <v-card-title class="card-header">Operations coverage:</v-card-title>
          <v-card-text>
            <ProgressBar :build="build" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <TabPanel :build="build" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProgressBar from "./ProgressBar.vue";
import TabPanel from "./TabPanel.vue";

export default {
  components: {
    ProgressBar,
    TabPanel,
  },
  data() {
    return {
      build: { report: { result: null } },
    };
  },
  methods: {
    getData() {
      fetch("/data/coverage.json")
        .then((response) => response.json())
        .then((data) => (this.build.report.result = data));
    },
  },

  mounted() {
    this.getData();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
