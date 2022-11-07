<template>
  <div class="mb-2" v-for="(result, name, index) in results" :key="index">
    <div class="text-subtitle-2 mb-2">
      <v-chip class="text-capitalize" color="primary" label>{{ name }}</v-chip>
    </div>

    <v-expansion-panels multiple>
      <v-expansion-panel
        v-for="item in result"
        :key="item.path"
        class="exp"
        :class="{ deprecated_path: item.deprecated }"
      >
        <v-expansion-panel-title>
          <v-row>
            <v-col
              class="d-flex justify-start text-body-1 font-weight-medium item-path-name"
            >
              {{ item.method }} {{ item.path }}
            </v-col>
            <v-col cols="3" class="font-weight-medium">
              {{ item.requests }} calls</v-col
            >
            <v-col cols="3" class="d-flex justify-end mr-2">
              <v-progress-linear
                v-if="item.coverage > 0"
                rounded
                v-model="item.coverage"
                :color="item.status"
                height="15"
                :class="item.status"
              >
                <div class="progress-bar-text">
                  {{ Math.ceil(item.coverage) }}%
                </div>
              </v-progress-linear>
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-list density="compact" class="status-code-list">
            <v-list-subheader>Status codes:</v-list-subheader>
            <v-list-item
              v-for="(missedStatusCode, i) in item.responses.missed"
              :key="i"
              :value="missedStatusCode"
              class="missing missing-status-code"
              :data-index="i"
            >
              <template v-slot:prepend>
                <v-icon class="icon" icon="mdi-bug"></v-icon>
              </template>
              <v-list-item-title class="text-body-1"
                >HTTP status {{ missedStatusCode.code }}
              </v-list-item-title>
              <v-list-item-subtitle class="status-code-description">{{
                missedStatusCode.description
              }}</v-list-item-subtitle>
            </v-list-item>
            <div
              v-for="(coveredStatusCode, i) in item.responses.covered"
              :key="i"
            >
              <v-list-item
                v-if="coveredStatusCode.declared"
                :key="i"
                :value="coveredStatusCode.code"
                class="covered covered-status-code"
              >
                <template v-slot:prepend>
                  <v-icon class="icon" icon="mdi-check"></v-icon>
                </template>

                <v-list-item-title class="text-body-1"
                  >HTTP status {{ coveredStatusCode.code }}</v-list-item-title
                >
                <v-list-item-subtitle class="status-code-description">{{
                  coveredStatusCode.description
                }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item
                lines="two"
                v-if="!coveredStatusCode.declared"
                :key="i"
                :value="coveredStatusCode.code"
                class="non-declared non-declared-status-code"
              >
                <template v-slot:prepend>
                  <v-icon
                    class="icon"
                    icon="mdi-alert-circle-check-outline"
                  ></v-icon>
                </template>

                <v-list-item-title class="text-body-1"
                  >HTTP status {{ coveredStatusCode.code }}</v-list-item-title
                >
                <v-list-item-subtitle
                  >This status code is not declared in swagger
                  specification</v-list-item-subtitle
                >
              </v-list-item>
            </div>
          </v-list>

          <v-list
            density="compact"
            class="parameters-list"
            v-if="
              item.parameters.missed.length > 0 ||
              item.parameters.covered.length > 0
            "
          >
            <v-list-subheader>Parameters:</v-list-subheader>
            <v-list-item
              v-for="(missedParameter, i) in item.parameters.missed"
              :key="i"
              :value="missedParameter"
              class="missing missing-parameter"
            >
              <template v-slot:prepend>
                <v-icon class="icon" icon="mdi-bug"></v-icon>
              </template>

              <v-list-item-title class="text-body-1"
                >In {{ missedParameter.in }} parameter {
                {{ missedParameter.name }} }</v-list-item-title
              >
              <v-list-item-subtitle>{{
                missedParameter.description
              }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item
              v-for="(coveredParameter, i) in item.parameters.covered"
              :key="i"
              :value="coveredParameter"
              class="parameter covered-parameter"
            >
              <v-expansion-panels class="covered-parameter-panel" multiple>
                <v-expansion-panel>
                  <v-expansion-panel-title
                    expand-icon="mdi-menu-down"
                    class="covered covered-parameter-title"
                  >
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon class="icon" icon="mdi-check"></v-icon>
                      </template>

                      <v-list-item-title class="text-body-1"
                        >In {{ coveredParameter.in }} parameter {
                        {{ coveredParameter.name }} }</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        coveredParameter.description
                      }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text class="covered-parameter-text">
                    <div v-if="coveredParameter.in != 'body'">
                      <div
                        v-for="param in coveredParameter.covered"
                        :key="param.name"
                        class="parameter-value text-body-1"
                      >
                        Covered {{ param.name }}: {{ param.value }} ({{
                          param.statusCode
                        }})
                      </div>
                    </div>
                    <div v-if="coveredParameter.in == 'body'">
                      <div
                        v-for="param in coveredParameter.covered"
                        :key="param.name"
                        class="parameter-value"
                      >
                        Covered {{ param.name }} ({{ param.statusCode }})

                        <json-viewer
                          :value="param.value"
                          copyable
                        ></json-viewer>
                      </div>
                    </div>
                    <v-divider сlass="separator"></v-divider>
                    <div>
                      <div
                        class="parameter-value"
                        v-if="coveredParameter.required"
                      >
                        Required: {{ coveredParameter.required }}
                      </div>
                      <div
                        class="parameter-value"
                        v-if="coveredParameter.items.enum"
                      >
                        Enum: {{ coveredParameter.items?.enum?.join(", ") }}
                      </div>
                      <div class="parameter-value" v-if="coveredParameter.type">
                        Type: {{ coveredParameter.type }}
                      </div>
                      <div
                        class="parameter-value"
                        v-if="coveredParameter.items.default"
                      >
                        default: {{ coveredParameter.items.default }}
                      </div>
                    </div>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import JsonViewer from "vue-json-viewer";

export default {
  name: "ExpandPanel",
  props: ["results"],
  components: { JsonViewer },
  data() {
    return {};
  },
};
</script>

<style scoped>
.exp {
  --v-theme-overlay-multiplier: 0.3;
}

.v-list-item-title {
  width: 100%;
}

.progress-bar-text {
  font-size: 0.75rem;
  font-weight: 500;
}

.missing {
  color: #842029;
  background-color: #f8d7da;
}

.missing-parameter {
  margin-left: 15px;
  margin-right: 15px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-radius: 3px;
  margin-top: 4px;
}

.covered-parameter {
  padding-bottom: 2px !important;
  color: white;
}

.covered-parameter-title {
  padding: 8px 24px 8px 0px;
}

.missing-status-code,
.covered-status-code,
.non-declared-status-code {
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 4px;
  padding-top: 13px;
  padding-bottom: 13px;
}

.bug {
  color: #842029;
}

.checked {
  color: #28a745;
}

.icon {
  opacity: 100;
}

.expand-icon {
  margin-right: 10px;
}

.parameter {
  padding-top: 5px;
  padding-bottom: 10px;
}

.parameter-value {
  padding: 5px 5px 0px 5px;
  word-break: break-all;
}

.covered {
  color: #0f5132;
  background-color: #d1e7dd;
}

.non-declared {
  color: #055160;
  background-color: #cff4fc;
}

.status-code-list {
  padding: 0;
  padding-bottom: 10px;
}

.v-progress-linear.success .progress-bar-text {
  color: white;
}

div.status-code-list .v-list-item {
  border-radius: 3px;
}

.v-divider {
  padding-bottom: 5px;
  margin-top: 10px;
}

.v-list-item:hover > .v-list-item__overlay {
  display: none;
}

.v-list-item--variant-text .v-list-item__overlay {
  background: white;
}

.status-code-description {
  text-transform: capitalize;
}

.parameter-description {
  margin-left: 2.32em;
}

.parameter-title,
.parameter-title-container {
  text-align: left;
}

.deprecated_path {
  opacity: 0.45;
}

.deprecated_path .item-path-name {
  text-decoration: line-through;
}

.covered-parameter-panel {
  padding-bottom: 15px;
}

.covered-parameter-text {
  border-left: 0.1px solid #d3d3d3 !important;
  border-right: 0.1px solid #d3d3d3 !important;
}
</style>

<style>
span.bg-warning {
  color: white !important;
}
</style>
