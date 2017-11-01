<template>
    <div class="container" id="vue-app-container">
        <div class="mail-box" id="main-wrapper">
            <app-sidebar :messages="messages"></app-sidebar>
            <app-content :messages="messages"></app-content>
        </div>
    </div>
</template>

<script>
import messages from "./data/messages";
import Content from "./components/shell/Content.vue";
import Sidebar from "./components/shell/Sidebar.vue";
import randomMessages from "./data/random-messages";
import { eventBus } from "./main";

export default {
  created() {
    eventBus.$on("sentMessage", data => {
      let temp = [data.message];
      this.messages = temp.concat(this.messages.slice(0));
    });

    eventBus.$on("refreshMessages", () => {
      let randomIndex = Math.floor(Math.random() * randomMessages.length);
      let temp = [randomMessages[randomIndex]];
      this.messages = temp.concat(this.messages.slice(0));
    });
  },
  data() {
    return {
      messages: messages
    };
  },
  computed: {},
  components: {
    appSidebar: Sidebar,
    appContent: Content
  }
};
</script>

<style>
#vue-app-container {
  height: 100%;
  width: 100%;
  padding: 0;
}
#main-wrapper {
  height: 100vh;
}
</style>
