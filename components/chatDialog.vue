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
        <v-flex xs12 ml-3 mr-3 class="dialog-box">
          <v-layout row wrap></v-layout>
        </v-flex>
        <v-flex xs12 class="user-type-layout">
          <v-layout row>
            <v-flex grow pl-3>
              <v-textarea
                v-model="input.typedChat"
                :disabled="loading"
                class="user-textarea"
                placeholder="Type here..."
                row-height="10"
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
      <v-snackbar v-model="popHint" :timeout="2000">
        {{ text }}
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
  },
  data() {
    return {
      hintText: '',
      popHint: false,
      loading: false,
      input: {
        typedChat: '',
      },
    }
  },
  methods: {
    sendMessage() {
      this.loading = true
      axios
        .post('/api/v1/message/send', {
          user_id: this.$store.state.authToken,
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
.user-textarea {
  margin: 0;
  padding: 0;
}
.send-icon {
  background-color: #a0d6c2;
}
</style>
