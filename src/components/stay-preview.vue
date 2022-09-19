<template>
    <section @click="moveToDetails" class="stay-preview">
        <div class="img-container block text-center">
            <span class="demonstration"></span>
            <el-carousel trigger="click" :autoplay="false">
                <el-carousel-item v-for="image, idx in stay.imgUrls" :key="idx">
                    <img class="small justify-center stay-img" :src="imgUrl(image)">
                </el-carousel-item>
            </el-carousel>
        </div>
        <button class="like-btn" @click.stop="addStayToLike" :style="changeHeartColor">
            <i class="fas fa-heart"></i>
        </button>
        <p v-if="stay.host.isSuperhost" class="super-host-title">SuperHost</p>
        <div class="stay-info">
            <div class="stay-header flex space-between">
                <h1 class="stay-address">{{ stay.name }} ,<span>{{ stay.address.country }}</span></h1>
                <h1 class="stay-rating"> <i class="fa-solid fa-star star-rating"></i> {{
                        getRatingAvg.toFixed(2) 
                }} ({{((stay.numOfReviews))}}) </h1>
            </div>
            <h1 class="stay-description">{{stay.summary.substring(0,35)}}...</h1>
            <h1 v-if="stay.stayDate" class="stay-date">{{fomratStayDate}}</h1>
            <h1 class="stay-price">${{ stay.price }}<span class="stay-night"> night</span></h1>
        </div>
    </section>
</template>

<script>
import { start } from '@popperjs/core'
import { stay } from '../store/modules/stay'



export default {
    name: 'stay-preview',
    props:
    {
        stay: {
            stay: Object,
            required: true,
        },
    },
    data() {
        return {
            isLike: null,
        }
    },
    created(){
        this.isLike = this.stay.isLiked
    },
    components: {
    },
    methods: {
        moveToDetails() {
            this.$router.push(`/stay/details/${this.stay._id}`)
        },
        imgUrl(image) {
            return new URL(`../images/stay-images/${image}`, import.meta.url).href
        },
        async addStayToLike() {
            this.isLike = !this.isLike
            this.$store.dispatch({type:"updateStay", stay:{...this.stay}})
        }
    },
    computed: {
        fomratStayDate() {
            const startMilliseconds = +this.stay.stayDate.startDate * 1000
            const startDateObject = new Date(startMilliseconds)
            const endMilliseconds = +this.stay.stayDate.endDate * 1000
            const endDateObject = new Date(endMilliseconds)
            var startMonth = startDateObject.toLocaleString("en-US", { month: "short" })
            var startDay = startDateObject.toLocaleString("en-US", { day: "numeric" })
            var endMonth = endDateObject.toLocaleString("en-US", { month: "short" })
            var endDay = endDateObject.toLocaleString("en-US", { day: "numeric" })

            // console.log(startMonth, startDay, endMonth, endDay);
            return (startMonth === endMonth) ? ` ${startMonth} ${startDay} - ${endDay}` : `${startMonth} ${startDay} - ${endMonth} ${endDay}`


        },
        changeHeartColor() {
            if (this.isLike) return { color: 'red' }
            else return { color: 'rgba(0,0,0,.5019607843137255)' }
        },
        getRatingAvg(){
            var sum = 0
            for (var el in this.stay.reviewScores){
                if(el !== 'rating') sum += this.stay.reviewScores[el]
            }
            return (sum / (Object.keys(this.stay.reviewScores).length -1))/2
        }
    }
}
</script>

<style>
</style>