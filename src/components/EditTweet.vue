<template>
  <v-row>
    <v-icon @click.stop="dialog = true">edit</v-icon>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title>
          <h2>Edit Tweet</h2>
        </v-card-title>
        <v-form v-model="valid" @submit.prevent="editTweet()" @keydown.prevent.enter>
          <v-card-text>
            <v-text-field
              v-model="username"
              name="Username"
              label="Username"
              type="text"
              :rules="[rules.required]"
            ></v-text-field>
            <v-textarea
              v-model="post"
              name="Post"
              label="Post"
              type="text"
              :rules="[rules.required]"
            ></v-textarea>        
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text type="submit" :loading="getIsLoading">Submit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
import { mapGetters } from "vuex";
export default {
   props: ["tweet"],
     computed: {
    ...mapGetters(["getIsLoading"])
  },
  data() {
    return {
      dialog: false,
      valid: false,
      username: this.tweet.username,
      post: this.tweet.post,
      rules: {
        required: value => !!value || "Required"
      }
    };
  },
  methods: {
    async editTweet() {
            this.$store
                    .dispatch("UPDATE_TWEET", {
                        id: this.tweet.id,
                        username: this.username,
                        post: this.post
                })
                .then((data) => {
                alert('Success edit data',data.result)
                this.dialog=false
                })
                .catch((err) => {
                console.log(err)
                });
        }
    },
};
</script>