<template>
    <div>
        <WelcomeMessage :user="username" />
        <ActiveFeatureList />
    </div>
</template>

<script>
    import WelcomeMessage from "./WelcomeMessage";
    import ActiveFeatureList from "./ActiveFeatureList";

    export default {
        name: "MySpark",
        props: ["username"],
        components: {
            WelcomeMessage,
            ActiveFeatureList,
        }
    }
</script>

<style scoped>

</style>