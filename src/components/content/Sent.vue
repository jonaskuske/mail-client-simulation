<template>
  <div class="inbox-body">
      <app-messages :messages="sentMessages"></app-messages>
  </div>
</template>

<script>
import Messages from "./Messages.vue";
export default {
  components: {
    appMessages: Messages
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    sentMessages() {
      return this.data.messages.filter(
        message => message.type == "outgoing" && !message.isDeleted
      );
    }
  }
};
</script>