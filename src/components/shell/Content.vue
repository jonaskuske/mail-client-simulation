<template>
  <aside class="lg-side" id="mail-content-area">
      <div class="inbox-head">
          <h3> {{currentView.title}} </h3>
      </div>

        <keep-alive>
              <component :is="currentView.tag" :data="currentView.data"></component>
        </keep-alive>
  </aside>
</template>

<script>
import { eventBus } from "../../main";
import Inbox from "../content/Inbox.vue";
import Sent from "../content/Sent.vue";
import Important from "../content/Important.vue";
import Trash from "../content/Trash.vue";
import ViewMessage from "../content/ViewMessage.vue";
export default {
  props: {
    messages: {
      type: Array,
      required: true
    }
  },
  created() {
    eventBus.$on("changeView", data => {
      let temp = [
        {
          tag: data.tag,
          title: data.title,
          data: data.data || {}
        }
      ];
      this.history = temp.concat(this.history.splice(0));
    });
  },
  data() {
    return {
      history: [
        {
          tag: "app-inbox",
          title: "Inbox",
          data: {
            messages: null
          }
        }
      ]
    };
  },
  computed: {
    currentView() {
      let current = this.history[0];
      this.$set(current.data, "messages", this.messages);
      return current;
    },
    previousView() {
      return typeof this.history[1] !== "undefined" ? this.history[1] : null;
    }
  },
  components: {
    appInbox: Inbox,
    appSent: Sent,
    appImportant: Important,
    appTrash: Trash,
    appViewMessage: ViewMessage
  }
};
</script>

<style>
#mail-content-area {
  background-color: aliceblue;
}
</style>
