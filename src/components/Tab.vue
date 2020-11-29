<template>
  <router-link tag="div" class="tab" active-class="active" v-bind="$attrs">
    <input
      ref="input"
      type="text"
      class="tab-label"
      :value="tab.title"
      :disabled="!active"
      :size="Math.max(tab.title.length, 4)"
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
  font-family: inherit;
  color: inherit;
  line-height: 1;
}

.tab * {
  cursor: pointer;
  user-select: none;
}

.tab {
  position: relative;
  display: flex;

  padding: 0.375em 0;
  padding-left: 1em;

  border-right: 1px solid var(--border);

  font-size: 0.815em;
}

.tab:hover .tab-close {
  opacity: 1;
}

.tab.active .tab-label {
  cursor: text;
}

.tab.active .bottom-border {
  background: var(--border-active);
}

.tab.active .tab-label {
  color: var(--text);
}

.tab-label {
  color: var(--text-inactive);
  padding-right: 1em;
}

.tab-close,
.tab-unsaved {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em 1em;
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
