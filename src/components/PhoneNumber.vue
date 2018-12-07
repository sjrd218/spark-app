<template>
    <div class="grid">
        <PhoneNumberCountryPrefix ref="pfx" v-model="prefix" @input="updatePhone()" class="pfx" /><input class="num" ref="phone" type="text" :value="value.phone" placeholder="Phone" @input="updatePhone()">
    </div>
</template>

<script>
    import PhoneNumberCountryPrefix from "./PhoneNumberCountryPrefix";
    export default {
        name: "PhoneNumber",
        props: ['value'],
        components: { PhoneNumberCountryPrefix },
        data() {
          return {
              prefix:null,
              phone:null,
          }
        },
        methods: {
            updatePhone() {
                this.$emit('input', {
                    prefix: this.prefix,
                    phone: this.$refs.phone.value
                })
            }
        }
    }
</script>

<style scoped>
    .grid {
        display: flex;
        flex-wrap: nowrap;
    }
    .pfx {
        flex: auto;
    }
    .num {
        flex: 0 0 199px;
        border: 1px solid #ddd;
    }
</style>