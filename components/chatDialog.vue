<template>
  <v-card>
    <v-container grid-list-md class="main-content">
      <v-layout row wrap>
        <v-flex grow />
        <v-flex shrink>
          <v-btn icon color="grey" @click="$emit('close-dialog')">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12 class="keeper-hint">
          <label>Last message at {{ lastTime }}</label>
        </v-flex>
        <v-flex xs12 ml-3 mr-3 class="dialog-box">
          <v-layout row wrap>
            <template v-for="(chat, index) in resource.chatHistory">
              <v-flex
                :key="'chat-' + chat.time + '-' + chat.user + '-' + index"
                xs12
              >
                <p
                  :class="[
                    { 'message-incoming': chat.role === 'receiver' },
                    { 'message-outgoing': chat.role === 'sender' },
                    'message',
                  ]"
                >
                  {{ chat.message }}
                  <br />
                  {{ chat.user }} - {{ chat.time }}
                </p>
              </v-flex>
            </template>
          </v-layout>
        </v-flex>
        <v-flex xs12 class="user-type-layout">
          <v-layout row>
            <v-flex grow pl-3>
              <v-textarea
                v-model="input.typedChat"
                :disabled="loading"
                class="user-textarea"
                placeholder="Type here..."
                row-height="7"
                auto-grow
                outlined
                hide-details
                rows="1"
                @keyup.enter="sendMessage()"
              ></v-textarea>
            </v-flex>
            <v-flex shrink align-self-center>
              <v-btn
                class="send-icon"
                icon
                color="white"
                dark
                :loading="loading"
                :disabled="loading"
                @click="sendMessage()"
              >
                <v-icon large>mdi-play</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-snackbar v-model="popHint" top :timeout="2000">
        {{ hintText }}
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" v-bind="attrs" @click="popHint = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </v-card>
</template>

<script>
const axios = require('axios')

export default {
  name: 'ChatDialog',
  props: {
    userId: {
      default: null,
      type: String,
    },
    sugarId: {
      default: null,
      type: String,
    },
  },
  data() {
    return {
      hintText: '',
      popHint: false,
      loading: false,
      time: null,
      resource: {
        chatHistory: [],
      },
      input: {
        typedChat: '',
      },
    }
  },
  computed: {
    lastTime() {
      if (this.resource.chatHistory.length === 0) {
        return ''
      }
      return this.resource.chatHistory[this.resource.chatHistory.length - 1]
        .time
    },
  },
  created() {
    this.time = setInterval(this.getMessage, 4000)
  },
  beforeDestroy() {
    clearInterval(this.time)
  },
  methods: {
    getMessage() {
      axios
        .get('/api/v1/message/'.concat(this.userId))
        .then((response) => {
          if (response.status === 200) {
            console.log(response)
            this.resource.chatHistory = response.data.data.chat.map((item) => {
              return {
                role: item.type,
                message: item.message,
                user:
                  item.type === 'sender'
                    ? item.user_sender.name
                    : item.user_receiver.name,
                time: new Date(item.created_at).toLocaleTimeString(),
              }
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    sendMessage() {
      this.loading = true
      axios
        .post('/api/v1/message/send', {
          user_id: this.userId,
          message: this.input.typedChat,
        })
        .then(() => {
          this.input.typedChat = ''
        })
        .catch((error) => {
          console.log(error)
          this.hintText = 'Pesan tidak terkirim'
          this.popHint = true
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style>
.main-content {
  font-family: sans-serif;
  font-weight: 100;
}
.dialog-box {
  background: #f5f5f5;
  height: 50vh;
  padding: 1em;
  overflow: auto;
  max-width: 350px;
  margin: 0 auto 0.8em auto;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-clip: content-box;
}
.keeper-hint {
  text-align: center;
  font-size: 0.8em;
  color: darkgrey;
}
.user-textarea {
  margin: 0;
  padding: 0;
}
.send-icon {
  background-color: #a0d6c2;
}
.message {
  font-family: sans-serif;
  font-weight: 100;
  width: 45%;
  border-radius: 10px;
  padding: 0.5em;
  font-size: 0.8em;
  margin-top: 12px;
}
.message-incoming {
  margin-left: 15px;
  background: #f1f0f0;
  color: black;
}
.message-outgoing {
  background: #407fff;
  color: white;
  margin-left: 52%;
  margin-right: 15px;
}
</style>
