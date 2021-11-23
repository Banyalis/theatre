<template>
    <div class="CommonSliderCards">
        <div class="CommonSliderCards-navigation">
            <div
                ref="sliderButtonPrev"
                class="CommonSliderCards-navigationButton"
            >
                <svg-icon name="icon-arrow" />
            </div>
            <div class="CommonSliderCards-navigationTitle" v-text="title"></div>
            <div
                ref="sliderButtonNext"
                class="CommonSliderCards-navigationButton"
            >
                <svg-icon name="icon-arrow" />
            </div>
        </div>
        <div ref="slider" class="CommonSliderCards-slider swiper-container">
            <div class="swiper-wrapper">
                <div
                    v-for="(item, index) in list"
                    :key="index"
                    class="CommonSliderCards-item swiper-slide"
                >
                    <component :is="componentItem" :item="item" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, Navigation } from 'swiper';
import 'swiper/swiper.scss';
import IndexEventCard from '~/components/index/IndexEventCard';
import CommonPeopleCard from '~/components/common/CommonPeopleCard';
import NewsChangesItem from '~/components/news/NewsChangesItem';

Swiper.use([Navigation]);

export default {
    name: 'CommonSliderCards',

    components: { IndexEventCard, CommonPeopleCard, NewsChangesItem },

    props: {
        title: {
            type: String,
            required: true
        },
        list: {
            type: Array,
            required: true
        },
        componentItem: {
            type: String,
            required: true
        },
        breakpoints: {
            type: Object,
            required: true
        }
    },

    mounted() {
        this.$nextTick(this.initSwiper);
    },

    methods: {
        initSwiper() {
            this.swiper = new Swiper(this.$refs.slider, {
                slidesPerColumnFill: 'row',
                breakpoints: this.breakpoints,
                navigation: {
                    nextEl: this.$refs.sliderButtonNext,
                    prevEl: this.$refs.sliderButtonPrev
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonSliderCards {
    $component: &;

    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: -1px;
    border-top: 1px solid $c-black;

    @include mobile {
        margin-bottom: -1px;
    }

    &-slider {
        width: 100%;
        height: 100%;
        margin-right: -1px;
    }

    &-navigation {
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid $c-black;

        &Button {
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
                border-left: 1px solid $c-black;

                svg {
                    transform: rotate(180deg);
                }
            }

            &.swiper-button-disabled {
                border-color: $c-gray;
                pointer-events: none;

                svg {
                    stroke: $c-gray;
                    fill: $c-gray;
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

        &Title {
            @include heading-label;

            text-align: center;
        }
    }

    &-item {
        border-right: 1px solid $c-black;
        height: auto;

        @include mobile {
            border-bottom: 1px solid $c-black;
        }
    }
}
</style>
