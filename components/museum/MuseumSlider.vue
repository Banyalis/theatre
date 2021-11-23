<template>
    <div ref="slider" class="MuseumSlider swiper-container">
        <div class="swiper-wrapper">
            <div
                v-for="(slide, index) in slider.slides"
                ref="sliderItem"
                :key="index"
                class="MuseumSlider-item swiper-slide"
            >
                <div class="MuseumSlider-itemImage">
                    <picture>
                        <source
                            :srcset="slide.image + ', ' + slide.image2x + ' 2x'"
                        />
                        <img :src="slide.image" alt="" />
                    </picture>
                </div>
                <div class="MuseumSlider-itemContent">
                    <div class="MuseumSlider-itemContentInner">
                        <div
                            class="MuseumSlider-itemTitle"
                            v-text="slide.title"
                        ></div>
                        <div class="MuseumSlider-itemIcon">
                            <svg-icon name="icon-increase" />
                        </div>
                    </div>
                    <div
                        class="MuseumSlider-itemCaption"
                        v-text="slide.caption"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper } from 'swiper';
import 'swiper/swiper.scss';

export default {
    name: 'MuseumSlider',

    props: {
        slider: {
            type: Object,
            required: true
        }
    },

    mounted() {
        this.initSwiper();
    },

    methods: {
        initSwiper() {
            this.swiper = new Swiper(this.$refs.slider, {
                initialSlide: 1,
                slidesPerView: 1.6,
                centeredSlides: true,
                slideToClickedSlide: true,
                breakpoints: {
                    320: {
                        spaceBetween: 32
                    },
                    768: {
                        spaceBetween: 32
                    },
                    960: {
                        spaceBetween: 32
                    },
                    1200: {
                        spaceBetween: 40
                    },
                    1440: {
                        spaceBetween: 48
                    },
                    1920: {
                        spaceBetween: 64
                    }
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.MuseumSlider {
    $component: &;

    background-color: $c-black--header;

    @include desktop--large {
        padding: scaling(80) 0;
    }

    @include desktop {
        padding: scaling(60) 0;
    }

    @include desktop--small {
        padding: scaling(50) 0;
    }

    @include laptop {
        padding: scaling(50) 0;
    }

    @include tablet {
        padding: scaling(40) 0;
    }

    @include mobile {
        padding: scaling(40) 0;
    }

    &-item {
        &.swiper-slide-prev,
        &.swiper-slide-next {
            cursor: pointer;
        }

        &Description,
        &Title {
            font-size: scaling(14);
            line-height: $lh-130;
            font-family: $family-graphic;

            @include desktop--large {
                font-size: scaling(20);
            }

            @include desktop {
                font-size: scaling(18);
            }
        }

        &Description {
            margin-bottom: scaling(50);
            opacity: 0;
            color: $c-gray;
            transition: opacity $d-hover ease-in-out;

            @include desktop--large {
                margin-bottom: scaling(80);
                line-height: $lh-150;
            }

            @include desktop {
                margin-bottom: scaling(60);
            }

            @include tablet {
                margin-bottom: scaling(40);
            }

            @include mobile {
                margin-bottom: scaling(40);
            }

            #{$component}-item.swiper-slide-active & {
                opacity: 1;
            }
        }

        &Image {
            @include desktop--large {
                height: scaling(800);
            }

            @include desktop {
                height: scaling(600);
            }

            @include desktop--small {
                height: scaling(500);
            }

            @include laptop {
                height: scaling(500);
            }

            @include tablet {
                height: scaling(400);
            }

            @include mobile {
                height: scaling(200);
            }

            img {
                @include m-objectFit;

                width: 100%;
                height: 100%;
            }
        }

        &Content {
            margin-top: scaling(50);
            padding-top: scaling(20);
            border-top: 1px solid $c-gray--header;
            position: relative;
            z-index: 10;
            opacity: 0;
            visibility: hidden;
            transition: opacity $d-hover ease-in-out,
                visibility $d-hover ease-in-out;

            @include desktop--large {
                margin-top: scaling(80);
                padding-top: scaling(32);
            }

            @include desktop {
                margin-top: scaling(60);
                padding-top: scaling(24);
            }

            @include laptop {
                padding-top: scaling(16);
            }

            @include tablet {
                margin-top: scaling(40);
                padding-top: scaling(16);
            }

            @include mobile {
                margin-top: scaling(40);
            }

            #{$component}-item.swiper-slide-active & {
                opacity: 1;
                visibility: visible;
            }

            &Inner {
                display: flex;
                justify-content: space-between;
            }
        }

        &Title {
            color: $c-white;

            @include mobile {
                line-height: $lh-160;
            }
        }

        &Icon {
            cursor: pointer;

            @include tablet {
                display: none;
            }

            @include mobile {
                display: none;
            }

            @include hover {
                &:hover svg {
                    stroke: $c-red;
                }
            }

            svg {
                width: scaling(20);
                height: scaling(20);
                stroke: $c-white;
                transition: stroke $d-hover ease-in-out;

                @include desktop--large {
                    width: scaling(26);
                    height: scaling(26);
                }

                @include desktop {
                    width: scaling(24);
                    height: scaling(24);
                }
            }
        }

        &Caption {
            margin-top: scaling(4);
            color: $c-gray;
            font-size: scaling(12);
            line-height: $lh-150;
            font-family: $family-graphic;

            @include desktop--large {
                margin-top: scaling(8);
                font-size: scaling(14);
            }

            @include desktop {
                margin-top: scaling(8);
                font-size: scaling(14);
            }

            @include laptop {
                line-height: $lh-140;
            }

            @include tablet {
                line-height: $lh-140;
            }

            @include mobile {
                line-height: $lh-130;
            }
        }
    }
}
</style>
