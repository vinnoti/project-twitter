import axios from "axios";

export default {
    state: {
        tweetList: [],
        tweetDetail: '',
        isLoading: false,
        isError: false,
        errorMessage: '',
    },
    getters: {
        getIsLoading(state) {
            return state.isLoading
        },
        getErrorStatus(state) {
            return state.isError
        },
        getErrorMessage(state) {
            return state.errorMessage
        },
        getTweetList(state) {
            return state.tweetList
        },
        getTweetDetail(state) {
            return state.tweetDetail
        }
    },
    mutations: {
        loading(state, payload){
            state.isLoading = payload
        },
        errorStatus(state, payload){
            state.isError = payload
        },
        errorMessage(state, payload){
            state.errorMessage = payload
        },
        setTweetList(state, payload) {
            state.tweetList = payload
        },
        addTweetList(state, payload) {
            state.tweetList.push(payload)
        },
        update_tweet: (state, payload) => {
            const index = state.tweetList.findIndex(tweetList => tweetList.id === payload.id);
            if (index !== -1) {
                state.tweetList.splice(index, 1, payload);
            }
        },
        deleteTweetList(state, payload) {
            const index = state.tweetList.findIndex(tweetList => tweetList.id === payload);
            state.tweetList.splice(index);
        },
        setTweetDetail(state, payload) {
            state.ttweetDetail = payload
        },
    },
    actions: {
        GET_LIST_TWEET:  async (context) => {
            let { data } = await axios.get('twitter/list')
            context.commit("setTweetList", data.result)
        },
        GET_DETAIL_TWEET:  async (context,params) => {
            let { data } = await axios.get('twitter/detail?id='+params)
            context.commit("setTweetDetail", data.result)
        },
        CREATE_TWEET: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                commit('loading', true);
                axios
                    .post('twitter/create', payload)
                    .then(({data}) => {
                        if (data.success === true) {
                            commit('loading', false);
                            commit('addTweetList', data.result)
                            resolve(data);
                        }
                    })
                    .catch(error => {
                        commit('loading', false);
                        commit('errorStatus', !error.response.data.success)
                        commit('errorMessage', error.response.data.errorMessage)
                        reject(error);
                    });
            });
        },
        UPDATE_TWEET: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                commit('loading', true);
                axios
                    .patch('twitter/update?id='+payload.id, payload)
                    .then(({data}) => {
                        if (data.success === true) {
                            commit('loading', false);
                            commit('update_tweet', payload)
                            resolve(data);
                        }
                    })
                    .catch(error => {
                        commit('loading', false);
                        commit('errorStatus', !error.response.data.success)
                        commit('errorMessage', error.response.data.errorMessage)
                        reject(error);
                    });
            });
        },
        DELETE_TWEET: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                commit('loading', true);
                axios
                    .delete('twitter/delete?id='+payload)
                    .then((res) => {
                        if (res.data.success === true) {
                            commit('loading', false);
                            commit('deleteTweetList', res.data.result)
                            console.log(res.data)
                            resolve(res.data.result);
                        }
                    })
                    .catch(error => {
                        commit('loading', false);
                        // commit('errorStatus', !error.response.data.success)
                        // commit('errorMessage', error.response.data.errorMessage)
                        reject(error)
                    })
            })
        },
    }
}