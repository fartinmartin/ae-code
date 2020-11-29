<template>
  <div class="tab-bar" :style="style">
    <div class="scrollable-container">
      <div class="tabs">
        <router-link
          v-for="tab in tabs"
          :key="tab.id"
          :to="tab.title"
          tag="div"
          class="tab"
          active-class="active"
          @dblclick.native="editTab = tab.id"
        >
          <!-- :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id" -->
          <input
            type="text"
            class="tab-label"
            :value="tab.title + `.jsx`"
            :disabled="editTab !== tab.id"
            @blur="editTab = null"
          />
          <button class="tab-close">{{ isSaved ? `×` : `•` }}</button>
          <div class="bottom-border"></div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "TabBar",

  data: () => ({
    editTab: null,
    isSaved: true,
  }),

  computed: {
    ...mapState("tabs", { tabs: (state) => state.list }),
    ...mapGetters("settings", ["settings"]),
    style() {
      return `font-size: ${this.settings.fontSize};`;
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
</style>

<style lang="scss" scoped>
.tab-bar {
  background-color: var(--bg);
  border-bottom: 1px solid var(--border);
  position: fixed;
  z-index: 1000;

  height: 3em;

  * {
    font-size: inherit !important;
  }
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

  * {
    cursor: pointer;
    user-select: none;
  }

  min-width: 120px;
  padding: 0.5rem 0;
  padding-left: 1rem;
  border-right: 1px solid var(--border);

  &.active {
    input {
      cursor: text;
    }

    .bottom-border {
      background: var(--border-active);
    }

    .tab-label {
      color: var(--text);
    }
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
