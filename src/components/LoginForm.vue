<template>
    <div>
        <div class="login">
            <div>Login</div>
            <hr />
            <div class="login-form">
                <div><label>Username</label><input v-model="lun" type="text" id="un"></div>
                <div><label>Password</label><input v-model="lpw" type="password" id="pwd"></div>
                <div class="tac"><span @click="login()" class="button clickable">Login</span></div>
                <div v-if="loginError" class="err">
                    <div>{{loginError}}</div>
                </div>
            </div>
        </div>
        <div class="tac">
            Not a Spark member? <span v-if="!username" class="clickable register" @click="register()">Register</span>
        </div>
    </div>
</template>

<script>
    import { SparkLogin } from "../utilities/LoginServices";
    import { Events } from '../utilities/vueEventBus.js';

    export default {
        name: "LoginForm",
        props: ['eventBus'],
        data() {
            return {
                lun: null,
                lpw: null,
                loginError: null,
                username: null,
                showingLoginForm: false,
                showingLogoutForm: false
            }
        },
        methods: {
            login() {
                SparkLogin.login(this.lun,this.lpw)
                this.showingLoginForm = false;
            },
            register() {
                this.eventBus.$emit(Events.NAV,"register")
            }
        },
        mounted() {
            this.eventBus.$on(Events.LOGIN_FAILURE,(msg) => { this.loginError = msg })
            this.eventBus.$on(Events.CURRENT_USER, (user) => {
                this.username = user ? user.username : null
                if(this.username) {
                    this.eventBus.$emit(Events.NAV,"myspark")
                }
            })
        }
    }
</script>

<style scoped>
    .login {
        width: 250px;
        padding: 20px;
        margin: 10px auto;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 2px;
        text-align: center;
    }
    .login-form {
        text-align: left;
    }
    .login-form div {
        margin: 10px 0;
        display: flex;
    }
    .login-form div * {
        flex: auto;
    }
    .login-form div input {
        flex: 0 0 160px;
    }
    .err {
        background-color: #ff9999;
    }
    .register {
        padding: 0px 5px;
    }
    .tac {
        text-align: center;
    }
    .reg-lnk {
        margin-top: 50px;
    }
</style>