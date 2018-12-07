<template>
    <div>
        <div class="failure" v-if="failureMessage">{{failureMessage}}</div>
        <div class="success" v-if="registrationSuccess && verificationSuccess">
            Account Verification Complete. You may <span class="clickable" @click="navToLogin()">login</span> with your username.
        </div>
        <div class="success" v-if="registrationSuccess && !verificationSuccess">
            Thank You for creating a Rundeck Spark Account.
            Please watch your email for a verification code to complete
            the sign up process.

            <div class="form">
                <div class="form-elements">
                    <div>
                        <div><label>Username *</label></div>
                        <div><input type="text" v-model.trim="username" placeholder="Username" v-bind:class="{ 'missing': emptyUsername }"></div>
                    </div>
                    <div><label>Verification Code</label></div>
                    <div><input type="text" v-model.trim="vCode" placeholder="Verification Code" v-bind:class="{ 'missing': emptyCode }"></div>
                </div>
                <div><span class="button" @click="submitVerification()">Verify</span></div>
            </div>

        </div>
        <div class="form" v-if="!registrationSuccess">
            <div class="form-hdr">Spark Account Registration</div>
            <div class="form-elements">
            <div><label>Username *</label></div>
            <div><input type="text" v-model.trim="username" placeholder="Username" v-bind:class="{ 'missing': emptyUsername }"></div>
            <div><label>Password *</label></div>
            <div><input type="password" v-model.trim="password" placeholder="Password" v-bind:class="{ 'missing': emptyPassword }"></div>
            <div><label>Email *</label></div>
            <div><input type="text" v-model.trim="email" placeholder="Email" v-bind:class="{ 'missing': emptyEmail }"></div>
            <!--<div><label>Phone *</label></div>
            <div class="phn-ctr" v-bind:class="{ 'missing': emptyPhone }"><PhoneNumber v-model="phoneGrp" /></div>-->
            </div>
            <div><span class="button" @click="register()">Register</span></div>
            <div class="pad"><span class="clickable" @click="setVerificationState()">Enter Verification Code</span></div>
        </div>
    </div>
</template>

<script>
    import { SparkLogin } from "../utilities/LoginServices";
    import { Events } from '../utilities/vueEventBus.js';
    import PhoneNumber from "./PhoneNumber";

    export default {
        name: "SignUpForm",
        components: {PhoneNumber},
        props: ['eventBus'],
        data() {
            return {
                username:null,
                password:null,
                email:null,
                phoneGrp:{prefix:null,phone:null},
                vCode:null,
                registrationSuccess:false,
                verificationSuccess:false,
                failureMessage:null,
                emptyUsername : false,
                emptyPassword : false,
                emptyEmail : false,
                emptyPhone : false,
                emptyCode : false
            }
        },
        methods: {
            register() {
                this.emptyUsername = this.nullOrEmpty(this.username)
                this.emptyPassword = this.nullOrEmpty(this.password)
                this.emptyEmail = this.nullOrEmpty(this.email)
               // let phoneVal = (this.phoneGrp.prefix + this.phoneGrp.phone+"").replace(/-/g,"")
               // this.emptyPhone = this.nullOrEmpty(phoneVal) || phoneVal.length < 11
                if(this.emptyUsername || this.emptyPassword || this.emptyEmail || this.emptyPhone) {
                    return
                }

                SparkLogin.register(this.username,this.password,this.email,this.phone)
            },
            submitVerification() {
                this.emptyUsername = this.nullOrEmpty(this.username)
                this.emptyCode = this.nullOrEmpty(this.vCode)
                if(this.emptyUsername  || this.emptyCode) return;

                SparkLogin.verify(this.username,this.vCode)
            },
            nullOrEmpty(value) {
                return !value || value.length === 0
            },
            setVerificationState() {
                this.registrationSuccess = true;
            },
            navToLogin() {
                this.eventBus.$emit(Events.NAV,"login")
            }
        },
        mounted() {
          this.eventBus.$on(Events.REGISTRATION_COMPLETE, () => { this.registrationSuccess = true })
          this.eventBus.$on(Events.VERIFICATION_COMPLETE, () => { this.verificationSuccess = true })
          this.eventBus.$on(Events.REGISTRATION_FAILURE, (msg) => { this.failureMessage = msg })
        }
    }
</script>

<style scoped>
    .form {
        width: 275px;
        margin: 20px auto 0;
        text-align: center;
    }
    .form-hdr {
        font-weight: bold;
        font-size: 1.25em;
    }
    .form-elements {
        margin: 10px 0;
        text-align: left;
    }
    .form-elements div {
        margin: 4px 0;
    }
    .form-elements input {
        font-size: 1.125em;
        padding: 2px;
        width: 100%;
        border: 1px solid #ddd;
    }
    .missing {
        border: 1px solid #ff9999 !important;
    }
    .failure {
        margin: 3px auto;
        padding: 3px;
        width: 800px;
        border: 1px solid #fff8dc;
        background-color: #f0e68c;
    }
    .success {
        text-align: center;
    }
    .pad {
        margin: 30px 0;
    }
    .phn-ctr {
        width: 280px;
    }
</style>