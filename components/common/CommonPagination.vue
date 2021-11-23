<template>
    <div v-if="pageCount > 0" class="CommonPagination">
        <div
            ref="sliderButtonPrev"
            class="CommonPagination-navigationButton"
            @click="onPrevClick"
        >
            <svg-icon name="icon-arrow" />
        </div>
        <div ref="slider" class="CommonPagination-slider swiper-container">
            <div class="CommonPagination-sliderWrapper swiper-wrapper">
                <div
                    v-for="(item, index) in pageCount"
                    :key="index"
                    class="CommonPagination-item swiper-slide"
                    :class="{ isCurrentPage: activePageNumber === item }"
                    @click="onPageNumberClick(item)"
                    v-text="item"
                ></div>
            </div>
        </div>
        <div
            ref="sliderButtonNext"
            class="CommonPagination-navigationButton"
            @click="onNextClick"
        >
            <svg-icon name="icon-arrow" />
        </div>
    </div>
</template>

<script>
import { Swiper, Navigation } from 'swiper';
import 'swiper/swiper.scss';
import VueScrollTo from 'vue-scrollto';

Swiper.use([Navigation]);

export default {
    name: 'CommonPagination',

    props: {
        pageCount: {
            type: Number,
            required: true,
            default: 0
        },
        activePageNumber: {
            type: Number,
            default: 1
        }
    },

    watch: {
        activePageNumber(activePage) {
            this.swiper.slideTo(activePage - 1);
        }
    },

    mounted() {
        this.$nextTick(this.initSwiper);
    },

    methods: {
        initSwiper() {
            this.swiper = new Swiper(this.$refs.slider, {
                slidesPerView: 4,
                slidesPerGroup: 4,
                breakpoints: {
                    768: {
                        slidesPerView: 10
                    },
                    960: {
                        slidesPerView: 12
                    },
                    1200: {
                        slidesPerView: 18
                    }
                },
                navigation: {
                    nextEl: this.$refs.sliderButtonNext,
                    prevEl: this.$refs.sliderButtonPrev
                }
            });

            this.swiper.slideTo(this.activePageNumber - 1);
        },

        onPageNumberClick(activePage) {
            const options = {
                offset: 0
            };

            VueScrollTo.scrollTo('#layout', 800, options);

            this.$router.push({
                path: this.$route.path,
                query: { page: activePage }
            });
        },

        onPrevClick() {
            if (this.activePageNumber === 1) {
                return;
            }

            this.onPageNumberClick(this.activePageNumber - 1);
        },

        onNextClick() {
            if (this.activePageNumber === this.pageCount) {
                return;
            }

            this.onPageNumberClick(this.activePageNumber + 1);
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonPagination {
    $component: &;

    display: flex;
    width: 100%;
    margin-top: -1px;
    margin-bottom: -1px;
    border-top: 1px solid $c-black;

    &-navigation {
        &Button {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            width: scaling(64);
            height: scaling(64);
            cursor: pointer;
            transition: background-color $d-hover ease-in-out;

            @include desktop--large {
                width: scaling(96);
                height: scaling(96);
            }

            @include desktop {
                width: scaling(72);
                height: scaling(72);
            }

            @include desktop--small {
                width: scaling(60);
                height: scaling(60);
            }

            @include mobile {
                width: scaling(48);
                height: scaling(48);
            }

            @include hover {
                &:hover {
                    background-color: $c-black;

                    svg {
                        stroke: $c-white;
                    }
                }
            }

            &:first-child {
                border-right: 1px solid $c-black;
            }

            &:last-child {
                margin-left: -1px;
                border-left: 1px solid $c-black;
                position: relative;

                svg {
                    transform: rotate(180deg);
                }
            }

            svg {
                width: scaling(24);
                height: scaling(9);
                stroke: $c-black;
                transition: stroke $d-hover ease-in-out;

                @include desktop--large {
                    width: scaling(42);
                    height: scaling(16);
                }

                @include desktop {
                    width: scaling(32);
                    height: scaling(16);
                }
            }
        }
    }

    &-slider {
        width: 100%;

        &Wrapper {
            width: 100%;
            height: 100%;
        }
    }

    &-item {
        cursor: pointer;
        border-right: 1px solid $c-black;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: $c-black;
        transition: $d-hover color, $d-hover background;

        &.isCurrentPage {
            background: $c-black--header;
            color: $c-white;
            pointer-events: none;
            cursor: default;
        }

        @include hover {
            &:hover {
                background: $c-black--header;
                color: $c-white;
            }
        }
    }
}
</style>
