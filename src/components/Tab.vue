<template>
  <router-link tag="div" class="tab" active-class="active" v-bind="$attrs">
    <input
      ref="input"
      type="text"
      class="tab-label"
      :value="tab.title"
      :disabled="!active"
    />
    <div class="tab-actions">
      <button v-if="!saved" class="tab-unsaved">•</button>
      <button v-else class="tab-close">×</button>
    </div>
    <div class="bottom-border"></div>
  </router-link>
</template>

<script>
export default {
  name: "Tab",

  props: {
    tab: {
      type: Object,
      required: true,
    },
  },

  computed: {
    active() {
      return this.$route.params.title === this.tab.title;
    },

    saved() {
      return true; // diff current value to saved value, perhaps this is a computed value
    },
  },
};
</script>

<style scoped>
button,
input {
  border: none;
  background-image: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  font-size: inherit;
  color: inherit;
}

.tab * {
  cursor: pointer;
  user-select: none;
}

.tab {
  display: flex;
  position: relative;
  min-width: 120px;
  padding: 0.5rem 0;
  padding-left: 1rem;
  border-right: 1px solid var(--border);
}

.tab:hover .tab-close {
  opacity: 1;
}

.tab.active input {
  cursor: text;
}

.tab.active .bottom-border {
  background: var(--border-active);
}

.tab.active .tab-label {
  color: var(--text);
}

.tab-close,
.tab-unsaved {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  opacity: 0;
}

.tab-label {
  width: 100%;
  color: var(--text-inactive);
}

.bottom-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
}
</style>
