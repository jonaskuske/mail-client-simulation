<template>
    <div class="inbox-body">
        <app-messages :messages="trashedMessages"></app-messages>
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
    trashedMessages() {
      return this.data.messages.filter(message => message.isDeleted === true);
    }
  }
};
</script>