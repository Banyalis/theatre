<template>
    <div ref="slider" class="PersonGallery swiper-container">
        <div class="swiper-wrapper">
            <div
                v-for="(item, index) in gallery"
                :key="index"
                ref="sliderItem"
                class="PersonGallery-item swiper-slide"
            >
                <div class="PersonGallery-itemImage">
                    <picture>
                        <source
                            :srcset="
                                item.image + ' 1x, ' + item.image2x + ' 2x'
                            "
                        />
                        <img :src="item.image" alt="" />
                    </picture>
                </div>
                <div class="PersonGallery-itemContent">
                    <div class="PersonGallery-itemContentInner">
                        <div
                            class="PersonGallery-itemTitle"
                            v-text="item.title"
                        ></div>
                        <div class="PersonGallery-itemIcon">
                            <svg-icon name="icon-increase" />
                        </div>
                    </div>
                    <div
                        class="PersonGallery-itemCaption"
                        v-text="item.caption"
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
    name: 'PersonGallery',

    props: {
        gallery: {
            type: Array,
            required: true
        }
    },

    mounted() {
        this.initSwiper();
        window.addEventListener('resize', this.setShiftContentSlider);
        this.setShiftContentSlider();
    },

    destroyed() {
        window.removeEventListener('resize', this.setShiftContentSlider);
    },

    methods: {
        initSwiper() {
            this.swiper = new Swiper(this.$refs.slider, {
                initialSlide: 2,
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
        },

        setShiftContentSlider() {
            this.$refs.sliderItem.forEach((item) => {
                const getWidth = this.$el.offsetWidth - item.offsetWidth;
                const itemContent = item.querySelector(
                    '.PersonGallery-itemContent'
                );

                itemContent.style.marginLeft = -getWidth / 4 + 'px';
                itemContent.style.marginRight = -getWidth / 4 + 'px';
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.PersonGallery {
    $component: &;

    padding-bottom: scaling(50);
    background-color: $c-black--header;

    @include desktop--large {
        padding-bottom: scaling(80);
    }

    @include desktop {
        padding-bottom: scaling(60);
    }

    @include tablet {
        padding-bottom: scaling(40);
    }

    @include mobile {
        padding-bottom: scaling(40);
    }

    &-item {
        &.swiper-slide-prev,
        &.swiper-slide-next {
            cursor: pointer;
        }

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

        &Image {
            @include desktop--large {
                height: scaling(800);
            }

            @include desktop {
                height: scaling(700);
            }

            @include desktop--small {
                height: scaling(600);
            }

            @include laptop {
                height: scaling(500);
            }

            @include tablet {
                height: scaling(400);
            }

            @include mobile {
                height: scaling(300);
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
