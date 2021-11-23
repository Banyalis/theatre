<template>
    <div
        class="CommonGallery swiper-container"
        :class="[theme ? theme : '', performance ? 'isPerformanceGallery' : '']"
    >
        <div class="CommonGallery-navigation">
            <div ref="galleryButtonPrev" class="CommonGallery-navigationButton">
                <svg-icon name="icon-arrow" />
            </div>
            <div ref="galleryCount" class="CommonGallery-navigationCount"></div>
            <div ref="galleryButtonNext" class="CommonGallery-navigationButton">
                <svg-icon name="icon-arrow" />
            </div>
        </div>
        <div class="swiper-wrapper">
            <template v-for="(item, index) in gallery">
                <div
                    v-if="item.image"
                    :key="index"
                    ref="galleryItem"
                    class="CommonGallery-item swiper-slide"
                    :class="{ noContent: !item.title && !item.text }"
                >
                    <div ref="galleryItemInner" class="CommonGallery-itemInner">
                        <div class="CommonGallery-itemImage">
                            <div class="CommonGallery-itemImageInner">
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
                        <div class="CommonGallery-itemContent">
                            <div
                                v-if="item.title || item.text"
                                class="CommonGallery-itemContentInner"
                            >
                                <div
                                    v-if="item.title"
                                    class="CommonGallery-itemHeader"
                                >
                                    <div
                                        class="CommonGallery-itemTitle"
                                        v-text="item.title"
                                    ></div>
                                    <!-- <div class="CommonGallery-itemIcon">
                                        <svg-icon name="icon-increase" />
                                    </div> -->
                                </div>
                                <p
                                    v-if="item.text"
                                    class="CommonGallery-itemText"
                                    v-text="item.text"
                                ></p>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { isMobile } from '@/utils/utils';
import { Swiper, Pagination, Navigation } from 'swiper';
import 'swiper/swiper.scss';

Swiper.use([Pagination, Navigation]);

const COMMON_GALLERY_ITEM_IMAGE_CLASS = '.CommonGallery-itemImage';
const COMMON_GALLERY_ITEM_CONTENT_CLASS = '.CommonGallery-itemContent';

export default {
    name: 'CommonGallery',

    props: {
        gallery: {
            type: Array,
            required: true
        },
        theme: {
            type: String,
            default: ''
        },
        performance: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            loadedImagesCount: 0
        };
    },

    mounted() {
        this.initSwiper();
    },

    destroyed() {
        window.removeEventListener('resize', this.setShiftContentGallery);
    },

    methods: {
        initSwiper() {
            this.swiper = new Swiper(this.$el, {
                slidesPerView: 1.3,
                spaceBetween: 16,
                centeredSlides: true,
                breakpoints: {
                    767: {
                        slidesPerView: 'auto',
                        spaceBetween: 0
                    }
                },
                on: {
                    beforeResize() {
                        if (!isMobile()) {
                            this.slides.forEach((item) => {
                                item.removeAttribute('style');
                                item.querySelector(
                                    COMMON_GALLERY_ITEM_IMAGE_CLASS
                                ).removeAttribute('style');
                            });
                        }
                    },

                    resize: this.calculateSwiperBottomPadding
                },
                pagination: {
                    el: this.$refs.galleryCount,
                    type: 'custom',
                    renderCustom(swiper, current, total) {
                        return current + ' из ' + total;
                    }
                },
                navigation: {
                    nextEl: this.$refs.galleryButtonNext,
                    prevEl: this.$refs.galleryButtonPrev
                }
            });
        },

        setShiftContentGallery() {
            this.$refs.galleryItem.forEach((item) => {
                const getWidth = this.$el.offsetWidth - item.offsetWidth;
                const itemContent = item.querySelector(
                    '.CommonGallery-itemContent'
                );

                itemContent.style.left = -getWidth / 4 + 'px';
                itemContent.style.right = -getWidth / 4 + 'px';
            });
        },

        onResize() {
            window.addEventListener('resize', this.setShiftContentGallery);
            this.setShiftContentGallery();
            this.calculateSwiperBottomPadding();
            this.fixImagesHeights();
        },

        // Calculate max item content height and set it's height as item padding
        calculateSwiperBottomPadding() {
            let maxHeight = 0;

            for (const item of this.$refs.galleryItemInner) {
                const height = item.querySelector(
                    COMMON_GALLERY_ITEM_CONTENT_CLASS
                ).clientHeight;

                maxHeight = Math.max(height, maxHeight);
            }

            for (const item of this.$refs.galleryItemInner) {
                item.style.paddingBottom = `${maxHeight}px`;
                item.querySelector(
                    COMMON_GALLERY_ITEM_CONTENT_CLASS
                ).style.height = `${maxHeight}px`;
            }
        },

        // If there are images with height bigger then max-height of wrapper on mobile, we should force set height of wrapper
        fixImagesHeights() {
            if (!isMobile()) return;

            let maxHeight = 0;

            for (const item of this.$refs.galleryItemInner) {
                const height = item.querySelector(
                    COMMON_GALLERY_ITEM_IMAGE_CLASS
                ).clientHeight;

                maxHeight = Math.max(height, maxHeight);
            }

            for (const item of this.$refs.galleryItemInner) {
                item.querySelector(
                    COMMON_GALLERY_ITEM_IMAGE_CLASS
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
.CommonGallery {
    $component: &;

    padding: scaling(50) 0;
    border-top: 1px solid $c-gray--header;

    @include desktop--large {
        padding: scaling(80) 0;
    }

    @include desktop {
        padding: scaling(60) 0;
    }

    @include tablet {
        padding: scaling(40) 0;
    }

    @include mobile {
        padding: 0 0 scaling(40);
    }

    &.isBlack {
        border-top: none;
        background-color: $c-black--header;
    }

    &.isPerformanceGallery {
        margin-top: -1px;
        border-top: 1px solid $c-gray--header;

        @include mobile {
            margin-top: 0;
            border-top: none;
        }
    }

    &-navigation {
        @include mobile {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: scaling(20);
            border-bottom: 1px solid $c-gray--header;
        }

        &Button {
            position: absolute;
            top: scaling(50);
            width: 50%;
            height: scaling(340);
            cursor: pointer;
            z-index: 10;

            @include desktop--large {
                top: scaling(80);
                height: scaling(500);
            }

            @include desktop {
                top: scaling(60);
                height: scaling(400);
            }

            @include tablet {
                top: scaling(40);
                height: scaling(270);
            }

            @include mobile {
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                top: 0;
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
            }

            &:first-child {
                left: 0;
            }

            &:last-child {
                right: 0;
            }

            &.swiper-button-disabled {
                cursor: default;
            }

            svg {
                display: none;
                width: scaling(24);
                height: scaling(9);
                stroke: $c-white;

                @include mobile {
                    display: block;
                }
            }
        }

        &Count {
            display: none;
            color: $c-white;
            font-size: scaling(12);
            line-height: $lh-130;
            text-align: center;
            font-family: $family-graphic;

            @include mobile {
                display: block;
            }
        }
    }

    &-item {
        width: auto;
        max-width: 100%;
        padding: 0 scaling(20);

        @include desktop--large {
            padding: 0 scaling(32);
        }

        @include desktop {
            padding: 0 scaling(24);
        }

        @include tablet {
            padding: 0 scaling(16);
        }

        @include mobile {
            padding: 0;
        }

        &Inner {
            height: 100%;
            position: relative;
        }

        &Image {
            height: scaling(340);
            margin-bottom: scaling(50);

            @include desktop--large {
                height: scaling(500);
                margin-bottom: scaling(80);
            }

            @include desktop {
                height: scaling(400);
                margin-bottom: scaling(60);
            }

            @include tablet {
                height: scaling(270);
                margin-bottom: scaling(40);
            }

            @include mobile {
                height: scaling(140);
                margin-bottom: scaling(40);
            }

            #{$component}-item.noContent & {
                margin-bottom: 0;
            }

            &Inner {
                height: 100%;
                transition: max-height 0.5s ease-in-out;

                #{$component}-item.swiper-slide-active & {
                    max-height: 100%;
                }
            }

            img {
                @include m-objectFit;

                width: 100%;
                height: 100%;
            }
        }

        &Content {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            display: block;
            width: auto;
            padding: 0 scaling(16);
            opacity: 0;
            transition: opacity 0.5s ease-in-out;

            #{$component}-item.swiper-slide-active & {
                opacity: 1;
                transition-delay: 0.2s;
            }

            &Inner {
                width: 100%;
                padding-top: scaling(20);
                border-top: 1px solid #272727;

                @include desktop--large {
                    padding-top: scaling(32);
                }

                @include desktop {
                    padding-top: scaling(24);
                }
            }
        }

        &Header {
            display: flex;
            justify-content: space-between;
            margin-bottom: scaling(4);

            @include desktop--large {
                margin-bottom: scaling(8);
            }

            @include mobile {
                margin-bottom: scaling(8);
            }
        }

        &Title {
            margin-right: scaling(20);
            color: $c-white;
            font-size: scaling(14);
            line-height: $lh-130;
            font-family: $family-graphic;

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
            flex-shrink: 0;
            cursor: pointer;

            @include laptop {
                display: none;
            }

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
                width: scaling(26);
                height: scaling(26);
                stroke: $c-white;
                transition: stroke $d-hover ease-in-out;

                @include desktop {
                    width: scaling(24);
                    height: scaling(24);
                }

                @include desktop--small {
                    width: scaling(20);
                    height: scaling(20);
                }
            }
        }

        &Text {
            color: $c-gray;
            font-size: scaling(12);
            line-height: $lh-150;
            font-family: $family-graphic;

            @include desktop--large {
                font-size: scaling(14);
            }

            @include desktop {
                font-size: scaling(14);
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
