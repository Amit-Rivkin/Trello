<template>
    <section   :class="isWishList ? 'stay-list' : 'stay-list main-layout'">
        <li v-for="stay in stays" :key="stay._id">
            <stay-preview :stay="stay">
            </stay-preview>
        </li>
    </section>
</template>

<script>

// import { useStore } from 'vuex';
import stayPreview from './stay-preview.vue'
// import { ref, watch, onMounted, onUnmounted } from 'vue'
export default {
    name: 'stay-list',
    props: {
        stays: {
            type: Array,
            required: true,
        },
        isWishList: {
            type: Boolean,
            required: true,
        },
    },
    components: {
        stayPreview
    },
    mounted() {
        // console.log("this.stays", this.stays)
        // const scrolledStays = ref(this.stays)
    },
    methods: {
        // return this.$store.getters.staysForDisplay
    },
    // async setup() {
    // const counter = ref(0)
    // watch(counter, () => console.log(counter.value))
    // const startSlice = 0
    // const endSlice = 10;
    // let staysScrolled = $store.getters.staysForDisplay
    // const a = await useStore().getters.staysForDisplay
    // console.log(a)
    // console.log(useStore())
    // const staysScrolledMin = []
    // staysScrolledMin.push(staysScrolled.slice(startSlice, endSlice))
    // const minStays = ref(staysScrolledMin)
    // const scrollComponent = ref(null)
    // const loadMoreStays = () => {
    //     startSlice = startSlice + 10
    //     amount = amount + 10
    //     let newStays = staysScrolled.slice(startSlice, endSlice);
    //     minStays.value.push(newStays)
    // }

    // onMounted(() => {
    //     window.addEventListener("scroll", handleScroll)
    // })

    // onUnMounted(() => {
    //     window.removeEventListener("scroll", handleScroll)
    // })

    // const handleScroll = (e) => {
    //     let element = scrollComponent.value
    //     if (element.getBoundingClientRect().bottom < window.innerHeight) {
    //         loadMoreStays()
    //     }
    // }

    // return {
    //     minStays,
    //     scrollComponent
    // }
    // }
    // computed {

    // }
}
</script>

<style>
</style>