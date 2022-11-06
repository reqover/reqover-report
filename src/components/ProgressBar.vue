<template>
  <div>
    <v-row>
      <v-col>
        <div
          v-if="missing > 0"
          class="progress-linear"
          :style="{ width: `${missing}%` }"
          :data-lenght="missing"
        >
          <v-progress-linear
            :model-value="100"
            background-color="error lighten-3"
            color="error lighten-1"
            height="15"
          >
            <span v-if="missing > 3" class="text-white font-weight-medium"
              >{{ missing }}%</span
            >
          </v-progress-linear>
        </div>
        <div
          v-if="partial > 0"
          class="progress-linear"
          :style="{ width: `${partial}%` }"
          :data-lenght="partial"
        >
          <v-progress-linear
            :model-value="100"
            background-color="warning lighten-3"
            color="warning lighten-1"
            height="15"
          >
            <span v-if="partial > 3" class="text-white font-weight-medium"
              >{{ partial }}%</span
            >
          </v-progress-linear>
        </div>
        <div
          v-if="conditional > 0"
          class="progress-linear"
          :style="{ width: `${conditional}%` }"
          :data-lenght="conditional"
        >
          <v-progress-linear
            :model-value="100"
            background-color="info lighten-3"
            color="info lighten-1"
            height="15"
          >
            <span v-if="conditional > 3" class="text-white font-weight-medium"
              >{{ conditional }}%</span
            >
          </v-progress-linear>
        </div>
        <div
          v-if="full > 0"
          class="progress-linear"
          :style="{ width: `${full}%` }"
          :data-lenght="full"
        >
          <v-progress-linear
            :model-value="100"
            background-color="success lighten-3"
            color="success lighten-1"
            height="15"
          >
            <span v-if="full > 3" class="text-white font-weight-medium"
              >{{ full }}%</span
            ></v-progress-linear
          >
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: ["build"],

  data() {
    return {};
  },

  computed: {
    missing() {
      return Math.round(this.build.report.result.summary.operations.missing);
    },
    partial() {
      return Math.round(this.build.report.result.summary.operations.partial);
    },
    conditional() {
      return Math.round(this.build.report.result.summary.operations.skipped);
    },
    full() {
      return Math.round(this.build.report.result.summary.operations.full);
    },
  },
};
</script>

<style scoped>
.progress-linear {
  display: inline-block;
}
</style>

<style>
.v-col .progress-linear:first-child .v-progress-linear {
  border-radius: 5px 0 0 5px;
}

.v-col .progress-linear:last-child .v-progress-linear {
  border-radius: 0 5px 5px 0;
}

.v-col .progress-linear[data-lenght="100"] .v-progress-linear {
  border-radius: 5px 5px 5px 5px;
}
</style>
