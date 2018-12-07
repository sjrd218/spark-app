<template>
    <div class="nav-bar">
        <span class="fright" v-if="username" @click="nav('myspark')">My Spark</span>
        <span @click="nav('home')">Spark Home</span>
        <span @click="nav('plugins')">Rundeck Plugins</span></div>
</template>

<script>
    import { Events } from '../utilities/vueEventBus.js';
    export default {
        name: "Nav",
        props: ['eventBus'],
        data() {
          return {
              username: null
          }
        },
        methods: {
            nav(dest) {
                this.eventBus.$emit(Events.NAV,dest)
            }
        },
        mounted() {
            this.eventBus.$on(Events.CURRENT_USER,(user) => { this.username = user ? user.username : null })
        }
    }
</script>

<style scoped>
.nav-bar {
    font-size: 1.125em;
    margin: 3px 0;
    padding: 3px 0;
    background-color: #fdfdfd;
    border: solid #eee;
    border-width: 1px 0 1px 0;
}
.nav-bar span {
    margin: 0 5px;
    text-decoration: underline;
    cursor: pointer;
}
    .fright {
        float: right;
    }
</style>