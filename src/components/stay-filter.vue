<template>
    <!-- <el-button text @click="dialogFormVisible = true">Filter</el-button> -->
    <div class="filter-box" :class="{
        'main-layout': showList, 'explore-page': isExplorePage
    }">
        <div>{{ IsOpenModalFilter }}</div>
        <div v-if="isScrolled" class="left-scroll-container left-unit-main-layout-margin ">
            <button class="left-scroll btn-scroll" @click="swipeLeft">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                    focusable="false"
                    style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;">
                    <g fill="none">
                        <path
                            d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932">
                        </path>
                    </g>
                </svg>
            </button>
        </div>
        <section ref="elScroll"
            :class="showList ? 'filter-container flex space-between ' : 'filter-container  flex space-between'">
            <div class="labels flex ">
                <button v-if="showList" @click="onSetFilter(opt.label)" class="clean-button" v-for="opt in filterOpts">
                    <div :class="{ 'clicked-btn': type === opt.label }" @click="changedType(opt.label)"
                        class="image-and-txt flex column btn-label">
                        <img class="label-image" :src="imgUrl(opt.src)" alt="">
                        <p class="label-txt circular">{{ opt.label }}</p>
                        <div></div>
                    </div>
                </button>
                <div v-else class="stays-">
                    {{ stayLength }} stays
                </div>
            </div>
            <div v-if="!showList" class="btn-filter-stays-container">
                <button :class="{ 'btn-filter-top': !showList }" class="btn btn-filter" text
                    @click="dialogFormVisible = true">
                    <div class="filter-img">
                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                            style="display:block;height:14px;width:14px;fill:currentColor" aria-hidden="true"
                            role="presentation" focusable="false">
                            <path
                                d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z">
                            </path>
                        </svg>
                    </div>
                    <!-- <img src="../images/filtetr-image/filter-icon.png"> -->
                    <span class="btn-filter-txt ">Filters</span>
                </button>
            </div>
        </section>
        <div v-if="showList" class="btn-filter-container main-layout-margin">
            <button v-if="!isEndScrolled" class="right-scroll btn-scroll" @click="swipeRight">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                    focusable="false"
                    style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;">
                    <g fill="none">
                        <path
                            d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932">
                        </path>
                    </g>
                </svg>
            </button>
            <button :class="{ 'btn-filter-top': !showList }" class="btn btn-filter" text
                @click="dialogFormVisible = true">
                <div class="filter-img">
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                        style="display:block;height:14px;width:14px;fill:currentColor" aria-hidden="true"
                        role="presentation" focusable="false">
                        <path
                            d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z">
                        </path>
                    </svg>
                </div>
                <span class="btn-filter-txt ">Filters</span>
            </button>
        </div>
    </div>
    <div class="filter">
        <el-dialog v-model="dialogFormVisible" title="Filters" center>
            <el-form :model="form" class="filter-form-layout">

                <div class="price-range">
                    <el-form-item>
                        <h1>Price Range<br><span>The average nightly price is</span></h1>
                        <el-slider v-model="form.priceRange" range :max="1500" />
                        <div class="filter-input-price flex">
                            <div>
                                <el-input v-model.number="form.priceRange[0]" />
                            </div>
                            <span>-</span>
                            <el-input v-model.number="form.priceRange[1]" />
                        </div>
                    </el-form-item>
                </div>
                <hr>

                <el-form-item>
                    <h1>Type of place</h1>
                    <div class="filter-type-place flex column">
                        <el-checkbox-group v-model="form.roomType">
                            <div class="type-place">
                                <el-checkbox v-for="t, idx in placeType" :key="t" :label="t">{{ t }}
                                    <br>
                                    <span>{{ placeTypeValues[idx] }}</span>
                                </el-checkbox>
                            </div>
                        </el-checkbox-group>

                    </div>
                </el-form-item>
                <hr>
                <h1>Rooms and beds</h1>
                <el-form-item label="Bedrooms">
                    <el-checkbox-group @change="sliceBedrooms" v-model="form.bedrooms">
                        <div class="beds-type">
                            <el-checkbox-button v-for="num in 8" :key="num" :label="num" />
                        </div>
                    </el-checkbox-group>
                </el-form-item>


                <el-form-item label="Beds">
                    <el-checkbox-group @change="sliceBeds" v-model="form.beds">
                        <div class="beds-type">
                            <el-checkbox-button v-for="num in 8" :key="num" :label="num" />
                        </div>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item label="Bathrooms">
                    <el-checkbox-group @change="sliceBathrooms" v-model="form.bathrooms">
                        <div class="beds-type">
                            <el-checkbox-button v-for="num in 8" :key="num" :label="num" />
                        </div>
                    </el-checkbox-group>
                </el-form-item>

                <hr>
                <div class="house-type-container">
                    <el-form-item label="Property type">
                        <el-checkbox-group v-model="form.propertyType">
                            <el-checkbox-button label="House"><img
                                    src="https://a0.muscache.com/pictures/4d7580e1-4ab2-4d26-a3d6-97f9555ba8f9.jpg"><span
                                    class="txt">House</span>
                            </el-checkbox-button>

                            <el-checkbox-button label="Apartment"><img
                                    src="https://a0.muscache.com/pictures/21cfc7c9-5457-494d-9779-7b0c21d81a25.jpg"><span
                                    class="txt">Apartment</span>
                            </el-checkbox-button>

                            <el-checkbox-button label="Geusthouse"><img
                                    src="https://a0.muscache.com/pictures/6f261426-2e47-4c91-8b1a-7a847da2b21b.jpg"><span
                                    class="txt">Geusthouse</span>
                            </el-checkbox-button>

                            <el-checkbox-button label="Hotel"><img
                                    src="https://a0.muscache.com/pictures/64b27fed-56a1-4f03-950a-d8da08efb428.jpg"><span
                                    class="txt">Hotel</span>
                            </el-checkbox-button>

                        </el-checkbox-group>
                    </el-form-item>
                </div>

                <hr>

                <el-form-item label="Amenities">
                    <el-checkbox-group v-model="form.amenities">
                        <el-checkbox v-for="amn in amenitiesOpts" :key="amn" :label="amn" />
                    </el-checkbox-group>
                </el-form-item>

                <hr>
                <div class="super-host-container">
                    <h1>Superhost</h1>
                    <el-form-item>
                        <p> Stay with recognized Hosts</p>
                        <el-switch v-model="form.superHost" />
                    </el-form-item>
                </div>
            </el-form>
            <template #footer>
                <span class="dialog-footer flex space-between">
                    <el-button @click="dialogFormVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="onSetFilter">Show Stays</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import { requiredNumber } from 'element-plus/es/components/table-v2/src/common'
import { stubFalse } from 'lodash';



export default {
    name: 'stay-filter',
    props: {
        showList: {
            type: Boolean,
            required: true,
        },
        stayLength: {
            type: Number
        }
    },
    data() {
        return {
            isScrolled: false,
            isEndScrolled: false,
            filterOpts: [
                {
                    label: "All",
                    src: "https://a0.muscache.com/pictures/33848f9e-8dd6-4777-b905-ed38342bacb9.jpg",
                },
                {
                    label: "Islands",
                    src: "https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg",
                },
                {
                    label: "Beach",
                    src: "https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg",
                },
                {
                    label: "Amazing pools",
                    src: "https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg",
                },
                {
                    label: "OMG!",
                    src: "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
                },
                {
                    label: "National parks",
                    src: "https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg",
                },
                {
                    label: "Cabins",
                    src: "https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg",
                },
                {
                    label: "Design",
                    src: "https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg",
                },
                {
                    label: "Camping",
                    src: "https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg",
                },
                {
                    label: "Amazing views",
                    src: "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
                },
                {
                    label: "Desert",
                    src: "https://a0.muscache.com/pictures/a6dd2bae-5fd0-4b28-b123-206783b5de1d.jpg",
                },
                {
                    label: "Arctic",
                    src: "https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg",
                },
                {
                    label: "Tiny homes",
                    src: "https://a0.muscache.com/pictures/35919456-df89-4024-ad50-5fcb7a472df9.jpg",
                },
                {
                    label: "Lakefront",
                    src: "https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg",
                },
                {
                    label: "Surfing",
                    src: "https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg",
                },
                {
                    label: "Shared homes",
                    src: "https://a0.muscache.com/pictures/52c8d856-33d0-445a-a040-a162374de100.jpg",
                },
                {
                    label: "Caves",
                    src: "https://a0.muscache.com/pictures/4221e293-4770-4ea8-a4fa-9972158d4004.jpg",
                },
                {
                    label: "Tropical",
                    src: "https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg",
                },
                {
                    label: "Bed & breakfasts",
                    src: "https://a0.muscache.com/pictures/5ed8f7c7-2e1f-43a8-9a39-4edfc81a3325.jpg",
                },
                {
                    label: "Earth homes",
                    src: "https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg",
                },
                {
                    label: "Iconic cities",
                    src: "https://a0.muscache.com/pictures/ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg",
                },
                {
                    label: "Countryside",
                    src: "https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg",
                },
                {
                    label: "Luke",
                    src: "https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg",
                },
                {
                    label: "A-frames",
                    src: "https://a0.muscache.com/pictures/1d477273-96d6-4819-9bda-9085f809dad3.jpg",
                },
                {
                    label: "Castles",
                    src: "https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg",
                },
                {
                    label: "Farms",
                    src: "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
                },
                {
                    label: "Historical homes",
                    src: "https://a0.muscache.com/pictures/33dd714a-7b4a-4654-aaf0-f58ea887a688.jpg",
                },
                {
                    label: "Mansions",
                    src: "https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg",
                },
                {
                    label: "Skiing",
                    src: "https://a0.muscache.com/pictures/c8bba3ed-34c0-464a-8e6e-27574d20e4d2.jpg",
                },
                {
                    label: "Cycladic homes",
                    src: "https://a0.muscache.com/pictures/e4b12c1b-409b-4cb6-a674-7c1284449f6e.jpg",
                },
                {
                    label: "Yurts",
                    src: "https://a0.muscache.com/pictures/4759a0a7-96a8-4dcd-9490-ed785af6df14.jpg",
                },
                {
                    label: "Golfing",
                    src: "https://a0.muscache.com/pictures/6b639c8d-cf9b-41fb-91a0-91af9d7677cc.jpg",
                },
                {
                    label: "Chef's kitchens",
                    src: "https://a0.muscache.com/pictures/ddd13204-a5ae-4532-898c-2e595b1bb15f.jpg",
                },
                {
                    label: "Domes",
                    src: "https://a0.muscache.com/pictures/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca.jpg",
                },
                {
                    label: "Campers",
                    src: "https://a0.muscache.com/pictures/31c1d523-cc46-45b3-957a-da76c30c85f9.jpg",
                },
                {
                    label: "Minsus",
                    src: "https://a0.muscache.com/pictures/48b55f09-f51c-4ff5-b2c6-7f6bd4d1e049.jpg",
                },
                {
                    label: "Beachfront",
                    src: "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
                },
                {
                    label: "Vineyards",
                    src: "https://a0.muscache.com/pictures/60ff02ae-d4a2-4d18-a120-0dd274a95925.jpg",
                },
                {
                    label: "Shepherd's huts",
                    src: "https://a0.muscache.com/pictures/747b326c-cb8f-41cf-a7f9-809ab646e10c.jpg",
                },
                {
                    label: "Off-the-grid",
                    src: "https://a0.muscache.com/pictures/9a2ca4df-ee90-4063-b15d-0de7e4ce210a.jpg",
                },
                {
                    label: "Kezhans",
                    src: "https://a0.muscache.com/pictures/8f7740f0-4854-4057-8082-e098649cf689.jpg",
                },
                {
                    label: "Windmills",
                    src: "https://a0.muscache.com/pictures/5cdb8451-8f75-4c5f-a17d-33ee228e3db8.jpg",
                },
                {
                    label: "Ryokans",
                    src: "https://a0.muscache.com/pictures/827c5623-d182-474a-823c-db3894490896.jpg",
                },
                {
                    label: "Boats",
                    src: "https://a0.muscache.com/pictures/687a8682-68b3-4f21-8d71-3c3aef6c1110.jpg",
                },
                {
                    label: "Casas particulares",
                    src: "https://a0.muscache.com/pictures/251c0635-cc91-4ef7-bb13-1084d5229446.jpg",
                },
                {
                    label: "Ski-in/out",
                    src: "https://a0.muscache.com/pictures/757deeaa-c78f-488f-992b-d3b1ecc06fc9.jpg",
                },
                {
                    label: "Treehouses",
                    src: "https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg",
                },
                {
                    label: "Barns",
                    src: "https://a0.muscache.com/pictures/f60700bc-8ab5-424c-912b-6ef17abc479a.jpg",
                },
                {
                    label: "Towers",
                    src: "https://a0.muscache.com/pictures/d721318f-4752-417d-b4fa-77da3cbc3269.jpg",
                },
                {
                    label: "Houseboats",
                    src: "https://a0.muscache.com/pictures/c027ff1a-b89c-4331-ae04-f8dee1cdc287.jpg",
                },
                {
                    label: "Containers",
                    src: "https://a0.muscache.com/pictures/0ff9740e-52a2-4cd5-ae5a-94e1bfb560d6.jpg",
                },
                {
                    label: "Grand pianos",
                    src: "https://a0.muscache.com/pictures/8eccb972-4bd6-43c5-ac83-27822c0d3dcd.jpg",
                },
                {
                    label: "Creative spaces",
                    src: "https://a0.muscache.com/pictures/8a43b8c6-7eb4-421c-b3a9-1bd9fcb26622.jpg",
                },
                {
                    label: "Riads",
                    src: "https://a0.muscache.com/pictures/7ff6e4a1-51b4-4671-bc9a-6f523f196c61.jpg",
                },
                {
                    label: "Dammusos",
                    src: "https://a0.muscache.com/pictures/c9157d0a-98fe-4516-af81-44022118fbc7.jpg",
                },
            ],

            type: 'All',
            dialogFormVisible: false,
            placeTypeValues: ["A place all to yourself", "Your own room in a home or a hotel , plus some shared common spaces", "A sleeping space and common areas that may be shared with others"],
            placeType: [
                "Entire home",
                "Private room",
                "Shared room"
            ],
            amenitiesOpts: ["Wifi", "Washer", "Air conditioning", "Kitchen", "Dryer"],
            form: {
                priceRange: [0, 1500],
                roomType: [],
                bedrooms: [],
                beds: [],
                bathrooms: [],
                propertyType: [],
                amenities: [],
                superHost: false,
            },
            isExplorePage: true
        }
    },
    components: {
    },
    mounted() {
        if (this.$route.name === 'explore') {
            this.isExplorePage = true
        } else {
            this.isExplorePage = false
        }

    },
    computed: {
        IsOpenModalFilter() {
        // ! ask ron how to close the filter
            // this.dialogFormVisible = this.$store.getters.getIsOpenModalFilter
            // return ""
            // console.log("aaa")
            // return this.$store.getters.getIsOpenModalFilter
        },
    },
    methods: {
        scrollTo(element, scrollPixels, duration) {
            const scrollPos = element.scrollLeft;
            // Condition to check if scrolling is required
            if (
                !(
                    (scrollPos === 0 || scrollPixels > 0) &&
                    (element.clientWidth + scrollPos === element.scrollWidth ||
                        scrollPixels < 0)
                )
            ) {
                // Get the start timestamp

                if (scrollPixels < 0 && (scrollPixels * -1) >= scrollPos) {
                    this.isScrolled = false
                } else {
                    this.isScrolled = true
                }

                if (scrollPos + scrollPixels >= element.scrollWidth - element.clientWidth) {
                    this.isEndScrolled = true
                } else {
                    this.isEndScrolled = false
                }
                // console.log("a", scrollPos + scrollPixels)
                // console.log("b", element.scrollWidth - element.clientWidth)
                const startTime =
                    "now" in window.performance
                        ? performance.now()
                        : new Date().getTime();

                function scroll(timestamp) {
                    //Calculate the timeelapsed
                    const timeElapsed = timestamp - startTime;
                    //Calculate progress
                    const progress = Math.min(timeElapsed / duration, 1);
                    //Set the scrolleft
                    element.scrollLeft = scrollPos + scrollPixels * progress;
                    //Check if elapsed time is less then duration then call the requestAnimation, otherwise exit
                    if (timeElapsed < duration) {
                        //Request for animation
                        window.requestAnimationFrame(scroll);
                    } else {
                        return;
                    }
                }
                //Call requestAnimationFrame on scroll function first time
                window.requestAnimationFrame(scroll);

            } else {
                // this.isScrolled = false
            }
        },
        swipeLeft() {
            const elScroll = this.$refs.elScroll;
            this.scrollTo(elScroll, -1000, 300);
        },
        swipeRight() {
            const elScroll = this.$refs.elScroll;
            this.scrollTo(elScroll, 1000, 300);
        },
        print() {
            // console.log(this.form)
        },
        sliceBedrooms() {
            this.form.bedrooms = this.form.bedrooms.slice(-1)
        },
        sliceBeds() {
            this.form.beds = this.form.beds.slice(-1)
        },
        sliceBathrooms() {
            this.form.bathrooms = this.form.bathrooms.slice(-1)
        },
        cleanForm() {
            this.dialogFormVisible = false
            this.form.priceRange = [0, 1500]
            this.form.roomType = []
            this.form.bedrooms = []
            this.form.bathrooms = []
            this.form.beds = []
            this.form.propertyType = []
            this.form.amenities = []
            this.form.superHost = false

        },
        onSetFilter(category = null) {
            var filter;
            if (typeof (category) === 'string') {
                filter = { category }
            } else {
                this.dialogFormVisible = false
                filter = JSON.parse(JSON.stringify(this.form));
            }
            this.$store.dispatch({ type: "setFilter", filterBy: { ...filter } })
        },
        imgUrl(image) {
            return new URL(image, import.meta.url).href
        },
        changedType(type) {
            this.type = type
        }

    },
}
</script>

<style >
.scrollbar-flex-content {
    display: flex;
}

.scrollbar-demo-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
}
</style>
