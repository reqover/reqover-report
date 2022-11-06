<template>
  <v-app>
    <v-main>
      <v-container>
        <CoverageReport />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import CoverageReport from "./components/CoverageReport.vue";

export default {
  name: "App",

  components: {
    CoverageReport,
  },

  data: () => ({
    //
  }),
};
</script>
