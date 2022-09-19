<template>
    <section class="header flex space-between">
        <div>
            <h1>Trello</h1>
        </div>
        <div class="drop-down">
            <h3>WorkSpace</h3>
            <h3>Recent</h3>
            <h3>Starred</h3>
            <h3>Templates</h3>
            <h3>Create</h3>
        </div>
        <div>
            <input type="text" placeholder="Search">
        </div>
    </section>
</template>
  
<script>
export default {
    name: "app-header",
    props: [],
    components: {
    },
    async created() {
    },
    computed: {
    },
};
</script>
  
<style>

</style>
  