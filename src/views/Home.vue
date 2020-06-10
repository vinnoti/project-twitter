<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs12 sm12 md6>
        <v-card class="text-xs-center ma-3" max-width="600">
          <v-form v-model="valid" @submit.prevent="postTweet()" @keydown.prevent.enter>
            <v-card-title>
              <v-layout justify-center>
                <h2>Post Tweet</h2>
              </v-layout>
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="username"
                name="Username"
                label="Username"
                type="text"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="post"
                name="Post"
                label="Post"
                type="text"
                :rules="[rules.required]"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text type="submit" :loading="getIsLoading">Submit</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
        <v-card class="text-xs-center ma-3" max-width="600">
          <v-layout justify-center>
            <h2>Feed Tweet</h2>
          </v-layout>
          <template v-for="tweet in getTweetList">
            <v-list-item :key="tweet.id">
              <v-list-item-content>
                <div class="caption grey--text">Username</div>
                <v-list-item-title v-html="tweet.username" class="my-4"></v-list-item-title>
                <div class="caption grey--text">Body</div>
                <v-list-item-title v-html="tweet.post" class="my-4"></v-list-item-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-icon @click="deleteTweet(tweet.id)" justify="center">delete</v-icon>
                  <v-spacer></v-spacer>
                  <EditTweet :tweet="tweet" />
                </v-card-actions>
                <v-divider></v-divider>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EditTweet from "@/components/EditTweet";
import { mapGetters } from "vuex";
// @ is an alias to /src
export default {
  name: "Home",
  components: { EditTweet },
  data: () => ({
    drawer: false,
    username: "",
    post: "",
    rules: {
      required: value => !!value || "Required"
    }
  }),
  computed: {
    ...mapGetters(["getTweetList"])
  },
  methods: {
    closealert() {
      this.error = false;
    },
    async deleteTweet(id) {
      this.$store.dispatch("DELETE_TWEET", id).then(data => {
        console.log(data)
      });
    },
    async postTweet() {
      this.$store
        .dispatch("CREATE_TWEET", {
          username: this.username,
          post: this.post
        })
        .then(data => {
          alert("Success Upload Data", data.result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.$store.dispatch("GET_LIST_TWEET");
  }
};
</script>