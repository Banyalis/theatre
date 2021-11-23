<template>
    <div ref="slider" class="PerformanceGallery swiper-container">
        <div class="PerformanceGallery-navigation">
            <div
                ref="sliderButtonPrev"
                class="PerformanceGallery-navigationButton"
            >
                <svg-icon name="icon-arrow" />
            </div>
            <div
                ref="sliderCount"
                class="PerformanceGallery-navigationCount"
            ></div>
            <div
                ref="sliderButtonNext"
                class="PerformanceGallery-navigationButton"
            >
                <svg-icon name="icon-arrow" />
            </div>
        </div>
        <div class="swiper-wrapper">
            <div
                v-for="(item, index) in gallery"
                :key="index"
                ref="sliderItem"
                class="PerformanceGallery-item swiper-slide"
                :class="{ isVertical: item.vertical }"
            >
                <div ref="sliderItemInner" class="PerformanceGallery-itemInner">
                    <div class="PerformanceGallery-itemImage">
                        <div class="PerformanceGallery-itemImageInner">
                            <picture>
                                <source
                                    :srcset="
                                        item.image +
                                        ' 1x, ' +
                                        item.image2x +
                                        ' 2x'
                                    "
                                />
                                <img
                                    :src="item.image"
                                    alt=""
                                    @load="onImageLoaded"
                                />
                            </picture>
                        </div>
                    </div>
                    <div class="PerformanceGallery-itemContent">
                        <div class="PerformanceGallery-itemHeader">
                            <div
                                class="PerformanceGallery-itemTitle"
                                v-text="item.title"
                            ></div>
                            <div class="PerformanceGallery-itemIcon">
                                <svg-icon name="icon-increase" />
                            </div>
                        </div>
                        <p
                            class="PerformanceGallery-itemText"
                            v-text="item.text"
                        ></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { isMobile } from '@/utils/utils';
import { Swiper, Pagination, Navigation } from 'swiper';
import 'swiper/swiper.scss';

Swiper.use([Pagination, Navigation]);

const PERFORMANCE_GALLERY_ITEM_IMAGE_CLASS = '.PerformanceGallery-itemImage';

export default {
    name: 'PerformanceGallery',

    props: {
        gallery: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            loadedImagesCount: 0
        };
    },

    mounted() {
        window.addEventListener('resize', this.setShiftSlider);
        this.setShiftSlider();
        this.initSwiper();
        window.addEventListener('resize', this.setShiftContentSlider);
        this.setShiftContentSlider();
    },

    destroyed() {
        window.removeEventListener('resize', this.setShiftSlider);
        window.removeEventListener('resize', this.setShiftContentSlider);
    },

    methods: {
        setShiftSlider() {
            const getWidthLastSliderItem =
                -this.$refs.sliderItem.slice(-1)[0].offsetWidth / 2;
            const getPaddingSliderItem = parseInt(
                window
                    .getComputedStyle(this.$refs.sliderItem[0], null)
                    .getPropertyValue('padding-right'),
                10
            );
            this.sliderShift =
                getWidthLastSliderItem - getPaddingSliderItem / 2;
        },

        initSwiper() {
            this.swiper = new Swiper(this.$refs.slider, {
                slidesPerView: 1.3,
                spaceBetween: 16,
                centeredSlides: true,
                breakpoints: {
                    767: {
                        slidesPerView: 'auto',
                        spaceBetween: 0,
                        centeredSlidesBounds: true,
                        slideToClickedSlide: true
                    }
                },
                on: {
                    beforeResize() {
                        if (!isMobile()) {
                            this.slides.forEach((item) => {
                                item.removeAttribute('style');
                                item.querySelector(
                                    PERFORMANCE_GALLERY_ITEM_IMAGE_CLASS
                                ).removeAttribute('style');
                            });
                        }
                    },

                    resize: this.calculateSwiperBottomPadding
                },
                pagination: {
                    el: this.$refs.sliderCount,
                    type: 'custom',
                    renderCustom(swiper, current, total) {
                        return current + ' из ' + total;
                    }
                },
                navigation: {
                    nextEl: this.$refs.sliderButtonNext,
                    prevEl: this.$refs.sliderButtonPrev
                }
            });
        },

        setShiftContentSlider() {
            this.$refs.sliderItem.forEach((item) => {
                const getWidth = window.innerWidth - item.offsetWidth;
                const itemContent = item.querySelector(
                    '.PerformanceGallery-itemContent'
                );

                if (isMobile()) {
                    itemContent.style.left = -getWidth / 2 + 'px';
                    itemContent.style.right = -getWidth / 2 + 'px';
                } else {
                    itemContent.removeAttribute('style');
                }
            });
        },

        onResize() {
            this.calculateSwiperBottomPadding();
            this.fixImagesHeights();
        },

        // Calculate max item content height and set it's height as item padding
        calculateSwiperBottomPadding() {
            let maxHeight = 0;
            for (const item of this.$refs.sliderItemInner) {
                const height = item.querySelector(
                    '.PerformanceGallery-itemContent'
                ).clientHeight;

                maxHeight = Math.max(height, maxHeight);
            }

            for (const item of this.$refs.sliderItemInner) {
                item.style.paddingBottom = maxHeight + 'px';
            }
        },

        // If there are images with height bigger then max-height of wrapper on mobile, we should force set height of wrapper
        fixImagesHeights() {
            if (!isMobile()) return;

            let maxHeight = 0;

            for (const item of this.$refs.sliderItemInner) {
                const height = item.querySelector(
                    PERFORMANCE_GALLERY_ITEM_IMAGE_CLASS
                ).clientHeight;

                maxHeight = Math.max(height, maxHeight);
            }

            for (const item of this.$refs.sliderItemInner) {
                item.querySelector(
                    PERFORMANCE_GALLERY_ITEM_IMAGE_CLASS
                ).style.height = maxHeight + 'px';
            }
        },

        onImageLoaded() {
            this.loadedImagesCount++;

            // Recalculate swiper bottom padding after all images is loaded, because it can be calculated wrong
            if (this.loadedImagesCount >= this.gallery.length) {
                this.onResize();
                this.swiper.update();
                // Fix bug when swiper set last slide as active after initialization
                this.swiper.slideTo(0);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.PerformanceGallery {
    $component: &;

    border-top: 1px solid $c-gray--header;

    @include mobile {
        padding-bottom: scaling(24);
    }

    &-navigation {
        display: none;
        align-items: center;
        justify-content: space-between;
        margin-bottom: scaling(20);
        border-bottom: 1px solid $c-gray--header;

        @include mobile {
            display: flex;
        }

        &Button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: scaling(48);
            height: scaling(48);

            &:first-child {
                border-right: 1px solid $c-gray--header;
            }

            &:last-child {
                border-left: 1px solid $c-gray--header;

                svg {
                    transform: rotate(180deg);
                }
            }

            svg {
                width: scaling(24);
                height: scaling(9);
                stroke: $c-white;
            }
        }

        &Count {
            color: $c-white;
            font-size: scaling(12);
            line-height: $lh-130;
            text-align: center;
            font-family: $family-graphic;
        }
    }

    &-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: auto;
        height: auto;
        padding: scaling(20);

        @include desktop--large {
            // width: scaling(960);
            padding: scaling(32);
        }

        @include desktop {
            // width: scaling(744);
            padding: scaling(24);
        }

        @include tablet {
            // width: scaling(496);
            padding: scaling(16);
        }

        @include mobile {
            padding: 0;
        }

        &.swiper-slide-prev,
        &.swiper-slide-next {
            cursor: pointer;
        }

        // &.isVertical {
        //     width: scaling(300);

        //     @include desktop--large {
        //         width: scaling(480);
        //     }

        //     @include desktop {
        //         width: scaling(360);
        //     }

        //     @include tablet {
        //         width: scaling(232);
        //     }
        // }

        &Inner {
            position: relative;
            height: 100%;
        }

        &Image {
            height: scaling(380);
            text-align: center;
            margin-bottom: scaling(40);

            @include desktop--large {
                margin-bottom: scaling(79);
            }

            @include desktop {
                margin-bottom: scaling(60);
            }

            @include tablet {
                margin-bottom: scaling(16);
            }

            @include desktop--large {
                height: scaling(597);
            }

            @include desktop {
                height: scaling(444);
            }

            @include tablet {
                height: scaling(312);
            }

            @include mobile {
                height: auto;
                max-height: scaling(320);
            }

            &Inner {
                height: 100%;

                @include mobile {
                    transition: max-height 0.5s ease-in-out;

                    #{$component}-item.swiper-slide-active & {
                        max-height: 100%;
                    }
                }
            }

            img {
                @include m-objectFit;

                height: 100%;

                @include mobile {
                    width: 100%;
                    height: auto;
                    max-height: 100%;
                }
            }
        }

        &Content {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;

            @include mobile {
                padding: 0 scaling(16);
                opacity: 0;
                transition: opacity 0.5s ease-in-out;

                #{$component}-item.swiper-slide-active & {
                    opacity: 1;
                    transition-delay: 0.2s;
                }
            }
        }

        &Header {
            display: flex;
            justify-content: space-between;

            @include mobile {
                padding-top: scaling(20);
                border-top: 1px solid $c-gray--header;
            }
        }

        &Title {
            color: $c-white;
            font-size: scaling(14);
            line-height: $lh-130;
            font-family: $family-graphic;
            margin-right: scaling(20);

            @include desktop--large {
                font-size: scaling(20);
            }

            @include desktop {
                font-size: scaling(18);
            }

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

        &Text {
            margin-top: scaling(4);
            color: $c-gray;
            font-size: scaling(12);
            line-height: $lh-140;
            font-family: $family-graphic;

            @include desktop--large {
                margin-top: scaling(8);
                font-size: scaling(14);
                line-height: $lh-150;
            }

            @include desktop {
                font-size: scaling(14);
                line-height: $lh-150;
            }

            @include desktop--small {
                line-height: $lh-150;
            }

            @include mobile {
                line-height: $lh-130;
            }
        }
    }
}
</style>
