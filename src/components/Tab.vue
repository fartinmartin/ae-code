<template>
  <router-link tag="div" class="tab" active-class="active" v-bind="$attrs">
    <input
      ref="input"
      type="text"
      class="tab-label"
      :value="tab.title"
      :disabled="!isActive"
      :size="Math.max(tab.title.length, 4)"
      spellcheck="false"
    />
    <div class="tab-actions">
      <button v-if="!isSaved" class="tab-unsaved">•</button>
      <button v-else class="tab-close" @click="closeTab">×</button>
    </div>
    <div class="bottom-border"></div>
  </router-link>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "Tab",

  props: {
    tab: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState("tabs", { tabs: "list" }),
    ...mapGetters("tabs", { activeTab: "activeTab" }),

    isActive() {
      return this.tab.path === this.$route.params.path;
    },

    isLastTabOpen() {
      return this.tabs.length === 1;
    },

    isSaved() {
      return true; // diff current value to saved value?
    },
  },

  methods: {
    closeTab() {
      if (this.isActive && !this.isLastTabOpen) this.$router.go(-1);
      this.$store.dispatch("tabs/closeTab", this.tab);
    },
  },
};
</script>

<style>
button,
input {
  border: none;
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  line-height: 1;
  cursor: pointer;
}

button:focus,
input:focus {
  outline: none;
}

.tab * {
  cursor: pointer;
  user-select: none;
}

.tab {
  position: relative;
  display: flex;

  font-size: 0.815em;
  height: 100%;
  padding-left: 1em;

  background: var(--tab-background);
  border-right: 1px solid var(--tab-border);
}

.tab:hover {
  background: var(--tab-background-hover);
}

.tab:hover .tab-close {
  opacity: 1;
}

.tab:hover .tab-label {
  color: var(--tab-text-hover);
}

.tab.active {
  background: var(--tab-background-active);
}

.tab.active .tab-label {
  cursor: text;
}

.tab.active .bottom-border {
  background: var(--tab-border-active);
}

.tab.active .tab-label {
  color: var(--tab-text-active);
}

.tab-label {
  color: var(--tab-text);
  padding-right: 1em;
}

.tab-close,
.tab-unsaved {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 1em;
  opacity: 0;
}

.bottom-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
}
</style>
