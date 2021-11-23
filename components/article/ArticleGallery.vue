<template>
    <div class="ArticleGallery">
        <div
            v-if="items.length > 1"
            ref="sliderPagination"
            class="ArticleGallery-pagination"
        ></div>
        <div ref="slider" class="ArticleGallery-slider swiper-container">
            <div class="ArticleGallery-sliderWrapper swiper-wrapper">
                <div
                    v-for="(item, index) in items"
                    :key="index"
                    class="ArticleGallery-item swiper-slide"
                >
                    <div class="ArticleGallery-itemImage">
                        <picture>
                            <source
                                :srcset="
                                    item.image + ' 1x, ' + item.image2x + ' 2x'
                                "
                            />
                            <img :src="item.image" :alt="item.caption" />
                        </picture>
                    </div>
                    <div
                        v-if="item.caption"
                        class="ArticleGallery-itemCaption"
                        v-text="item.caption"
                    ></div>
                </div>
            </div>
        </div>
        <div v-if="items.length > 1" class="ArticleGallery-navigation">
            <div ref="sliderButtonPrev" class="ArticleGallery-navigationButton">
                <svg-icon name="icon-arrow" />
            </div>
            <div ref="sliderButtonNext" class="ArticleGallery-navigationButton">
                <svg-icon name="icon-arrow" />
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, Pagination, Navigation } from 'swiper';
import 'swiper/swiper.scss';

Swiper.use([Pagination, Navigation]);

export default {
    name: 'ArticleGallery',

    props: {
        items: {
            type: Array,
            required: true
        }
    },

    mounted() {
        this.items.length > 1 && this.$nextTick(this.initSwiper);
    },

    methods: {
        initSwiper() {
            this.swiper = new Swiper(this.$refs.slider, {
                slidesPerView: 1,
                loop: true,
                navigation: {
                    nextEl: this.$refs.sliderButtonNext,
                    prevEl: this.$refs.sliderButtonPrev
                },
                pagination: {
                    el: this.$refs.sliderPagination,
                    clickable: true
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.ArticleGallery {
    $component: &;

    width: 100%;
    position: relative;

    &-navigation {
        width: (1728 * 100% / 1216);
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        left: -(((1728 - 1216) * 100% / 1216) / 2);
        top: 50%;
        transform: translate(0, -50%);
        z-index: 2;
        pointer-events: none;

        @include laptop {
            left: scaling(16);
            right: scaling(16);
            width: auto;
        }

        @include tablet {
            display: none;
        }

        @include mobile {
            display: none;
        }

        &Button {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            width: scaling(64);
            height: scaling(64);
            cursor: pointer;
            pointer-events: all;
            background: $c-white;
            border: 1px solid $c-black;
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

            &:last-child {
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
        width: 100%;

        &Image {
            width: 100%;

            @include desktop--large {
                @include m-aspectRatio(1216, 616);
            }

            @include desktop {
                @include m-aspectRatio(912, 480);
            }

            @include desktop--small {
                @include m-aspectRatio(760, 400);
            }

            @include laptop {
                @include m-aspectRatio(864, 464);
            }

            @include tablet {
                @include m-aspectRatio(704, 384);
            }

            @include mobile {
                @include m-aspectRatio(288, 160);
            }

            img {
                @include m-absoluteObjectFit(contain);
            }
        }

        &Caption {
            @include caption-1;

            margin-top: scaling(16);
            color: #6d6d6d;
            text-align: center;

            @include desktop--large {
                margin-top: scaling(20);
            }

            @include desktop--small {
                margin-top: scaling(12);
            }

            @include laptop {
                width: 50%;
            }
        }
    }

    &-pagination {
        position: absolute;
        right: 0;
        top: scaling(405);
        z-index: 2;
        display: none;

        @include tablet {
            display: flex;
        }

        @include mobile {
            display: flex;
            top: 0;
            right: auto;
            position: relative;
            margin-bottom: scaling(20);
            width: 100%;
            justify-content: center;
        }

        ::v-deep .swiper-pagination-bullet {
            width: 6px;
            height: 6px;
            cursor: pointer;
            background: #e5e5e5;
            border-radius: 100%;

            &:not(:first-child) {
                margin-left: scaling(16);
            }

            &-active {
                background: $c-red;
            }
        }
    }
}
</style>
