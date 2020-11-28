<template>
  <div class="tab-bar" :style="style">
    <div class="scrollable-container">
      <div class="tabs">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="tab"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <input
            type="text"
            class="tab-label"
            :value="tab.title + `.jsx`"
            :disabled="activeTab !== tab.id"
          />
          <button class="tab-close">×</button>
          <div class="bottom-border"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar",

  props: {
    options: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    activeTab: 1,
    tabs: [
      {
        id: 1,
        title: "sayHi",
        path: "",
        code: `const sayHi = () => alert("hi");\nsayHi();`,
      },
      {
        id: 2,
        title: "untitled",
        path: "",
        code: ``,
      },
      {
        id: 3,
        title: "sayHi",
        path: "",
        code: `const sayHi = () => alert("hi");\nsayHi();`,
      },
      {
        id: 4,
        title: "untitled",
        path: "",
        code: ``,
      },
      {
        id: 5,
        title: "sayHi",
        path: "",
        code: `const sayHi = () => alert("hi");\nsayHi();`,
      },
      {
        id: 6,
        title: "untitled",
        path: "",
        code: ``,
      },
      {
        id: 7,
        title: "sayHi",
        path: "",
        code: `const sayHi = () => alert("hi");\nsayHi();`,
      },
      {
        id: 8,
        title: "untitled",
        path: "",
        code: ``,
      },
      {
        id: 9,
        title: "sayHi",
        path: "",
        code: `const sayHi = () => alert("hi");\nsayHi();`,
      },
      {
        id: 10,
        title: "untitled",
        path: "",
        code: ``,
      },
    ],
  }),

  computed: {
    style() {
      return `font-size: ${this.options.fontSize};`;
    },
  },
};
</script>

<style>
:root {
  --text: #fff;
  --text-inactive: #848484;

  --bg: rgb(21, 21, 21);

  --border: rgb(36, 36, 36);
  --border-active: #6cc7f6;

  color: var(--text);
  background: var(--bg);
}

.panel {
  padding: 0 !important;
}

.tab-bar + * {
  margin-top: calc(3 * 16px + 1px);
}
</style>

<style lang="scss" scoped>
.tab-bar {
  background-color: var(--bg);
  border-bottom: 1px solid var(--border);
  position: fixed;
  z-index: 1000;

  height: 3em;
}

.scrollable-container {
  position: relative;
  overflow: scroll;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.tabs {
  display: flex;
}

.bottom-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
}

.tab {
  display: flex;
  position: relative;

  min-width: 120px;
  padding: 0.5rem 0;
  padding-left: 1rem;
  border-right: 1px solid var(--border);

  &.active .bottom-border {
    background: var(--border-active);
  }
  &.active .tab-label {
    color: var(--text);
  }
  &:hover .tab-close {
    opacity: 1;
  }
}

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

.tab-close {
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
</style>
