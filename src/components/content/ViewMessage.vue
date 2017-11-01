<template>
  <div class="inbox-body">
      <div class="mail-option">
        <button ref="messageBackButton" class="btn btn-primary btn-jonas" @click="navigateBack()">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>&nbsp; Back 
        </button>


        <button class="btn btn-jonas" :class="[{'btn-danger': !data.message.isDeleted},{'btn-success': data.message.isDeleted}]" @click="data.message.isDeleted = !data.message.isDeleted; navigateBack()">
            <i class="fa" :class="[{'fa-trash-o': !data.message.isDeleted},{'fa-recycle': data.message.isDeleted}]"></i>&nbsp; {{ data.message.isDeleted ? 'Restore' : 'Delete' }}
        </button>

        <button v-if="(!hideReadUnreadBtn)" class="btn btn-info btn-jonas" @click="data.message.isRead= !data.message.isRead">
            <i class="fa" :class="[{'fa-envelope-open': !data.message.isRead},{'fa-envelope': data.message.isRead}]" aria-hidden="true"></i>&nbsp; Mark as {{data.message.isRead ? 'unread' : 'read' }}
        </button>
    </div>

    <p><strong>Date: </strong> {{ data.message.date.fromNow() }} </p>
    <p><strong>From: </strong> {{ data.message.from.name }} &lt;{{ data.message.from.email }}&gt; </p>
    <hr>
    <div v-html="data.message.content" class="message"></div>

    <div v-if="data.message.attachments.length > 0"class="attachments">
        <h4>Attachments</h4>
        <ul>
            <li v-for="(attachment, i) in data.message.attachments" :key="i">
                <i class="fa fa-paperclip"></i> {{ attachment.fileName }} ({{ attachment.size | formatBytes }})
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../main";
export default {
  activated() {
    if (typeof this.data.message.isRead !== "undefined") {
      this.data.message.isRead = true;
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    navigateBack() {
      let previousView = this.$parent.previousView;
      eventBus.$emit("changeView", {
        tag: previousView.tag,
        title: previousView.title,
        data: previousView.data
      });
    }
  },
  computed: {
    hideReadUnreadBtn() {
      let view = this.$parent.previousView.title;
      return view === "Trash" || view === "Sent";
    }
  },
  filters: {
    formatBytes(bytes) {
      if (bytes == 0) {
        return "0 Bytes";
      }
      let decimals = 2;
      let k = 1000;
      let dm = decimals + 1 || 3;
      let sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      let i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }
  }
};
</script>

<style scoped>
.btn-jonas {
  margin-bottom: 0.5em;
}
</style>
