<template>
    <div
        class="IndexItemGroup"
        :class="{
            isWithPreview: isWithPreview(),
            isAutoplay,
            isSmallOnlyMobile
        }"
    >
        <div class="IndexItemGroup-wrapper">
            <div ref="slider" class="IndexItemGroup-slider swiper-container">
                <div
                    v-if="isWithPreview()"
                    class="IndexItemGroup-sliderTitleGroup"
                    :class="[
                        items[currentIndexTheme].themeText,
                        { isFirstSlideActive: currentIndexTheme === 0 },
                        items[0].sizeTitle
                    ]"
                    v-text="items[0].titles.join(' ')"
                ></div>
                <div class="IndexItemGroup-sliderInner swiper-wrapper">
                    <div
                        v-for="(slide, index) in items"
                        :key="index"
                        class="IndexItemGroup-slide swiper-slide"
                        :data-index="index"
                    >
                        <IndexItem
                            :items="slide"
                            :is-small-only-mobile="isSmallOnlyMobile"
                        />
                    </div>
                </div>
                <div
                    v-if="items.length > 1"
                    ref="sliderPagination"
                    class="
                        IndexItemGroup-sliderPagination
                        swiper-pagination swiper-no-swiping
                    "
                    :class="[items[currentIndexTheme].themePagination]"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper.scss';
import IndexItem from '~/components/index/IndexItem';
import { HOME_ITEM_TYPES } from '~/utils/constants';

Swiper.use([Pagination, Autoplay]);

export default {
    name: 'IndexItemGroup',

    components: { IndexItem },

    props: {
        items: {
            type: Array,
            required: true
        },
        isSmallOnlyMobile: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            bullets: [],
            swiper: undefined,
            currentIndexTheme: 0,
            currentIndexPagination: 0,
            isAutoplay: true
        };
    },

    mounted() {
        this.initSwiper();

        if (this.items.length > 1) {
            this.bullets = Array.from(
                this.$refs.slider.querySelectorAll(
                    '.IndexItemGroup-sliderPaginationItem'
                )
            );

            this.$nextTick(() => {
                this.bullets[0].classList.add('isPlaying');
            });
        }
    },

    methods: {
        isWithPreview() {
            return this.items[0]?.type === HOME_ITEM_TYPES.preview;
        },

        initSwiper() {
            const self = this;

            this.swiper = new Swiper(this.$refs.slider, {
                direction: 'horizontal',
                slidesPerView: '1',
                spaceBetween: 0,
                loop: false,
                allowTouchMove: true,
                autoplay: {
                    delay: 7000
                },
                pagination: {
                    el: this.$refs.sliderPagination,
                    type: 'bullets',
                    clickable: true,
                    renderBullet: (index, className) => {
                        return (
                            '<div class="IndexItemGroup-sliderPaginationItem ' +
                            className +
                            '">' +
                            '<svg viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg"><circle r="20" cx="21" cy="21" fill="none" stroke="1" /></svg>' +
                            '<div class="IndexItemGroup-sliderPaginationItemText">' +
                            (index + 1) +
                            '</div>' +
                            '<div class="IndexItemGroup-sliderPaginationItemLine"></div>' +
                            '</div>'
                        );
                    }
                },
                on: {
                    slideChange(swiper) {
                        self.currentIndexTheme = swiper.realIndex;

                        const currentPlaying = self.bullets.filter((b) =>
                            b.classList.contains('isPlaying')
                        );

                        if (currentPlaying.length)
                            currentPlaying[0].classList.remove('isPlaying');
                    },

                    slideChangeTransitionEnd(swiper) {
                        if (!swiper.autoplay.running) return;

                        self.bullets
                            .filter((b, i) => i === swiper.realIndex)[0]
                            .classList.add('isPlaying');
                    },

                    autoplayStop() {
                        self.isAutoplay = false;
                    }
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.IndexItemGroup {
    $component: &;

    width: 100%;
    height: 100%;
    position: relative;

    div:not(.Hero) & {
        @include mobile {
            height: scaling(590);
            border-bottom: 1px solid $c-black;
        }
    }

    &-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
    }

    &-slider {
        width: 100%;
        height: 100%;
        position: relative;

        &TitleGroup {
            width: 75%;
            position: absolute;
            z-index: 3;
            transition: $d-hover all;
            white-space: pre-line;
            left: scaling(16);

            @include desktop--large {
                top: scaling(32);
                left: scaling(32);
            }

            @include desktop {
                top: scaling(24);
                left: scaling(24);
            }

            @include desktop--small {
                top: scaling(24);
                left: scaling(20);
            }

            @include laptop {
                top: scaling(24);
                left: scaling(20);
            }

            @include tablet {
                top: scaling(24);
                left: scaling(20);
            }

            #{$component}:not(.isSmallOnlyMobile) & {
                @include laptop {
                    top: scaling(38);
                }

                @include tablet {
                    top: scaling(38);
                }
            }

            @include mobile {
                top: scaling(50);
            }

            &.big {
                @include home-heading-1;

                @include laptop {
                    @include heading-2;
                }

                @include tablet {
                    @include heading-2;
                }

                @include mobile {
                    @include heading-2;
                }
            }

            &.medium {
                @include heading-1;

                @include laptop {
                    @include heading-2;
                }

                @include tablet {
                    @include heading-2;
                }

                @include mobile {
                    @include heading-2;
                }
            }

            &.small {
                @include heading-2;

                @include laptop {
                    @include heading-2;
                }

                @include tablet {
                    @include heading-2;
                }

                @include mobile {
                    @include heading-2;
                }
            }

            &:not(.isFirstSlideActive) {
                @include heading-label;

                #{$component}:not(.isSmallOnlyMobile) & {
                    @include laptop {
                        width: 100%;
                        left: 0;
                        text-align: center;
                    }

                    @include tablet {
                        width: 100%;
                        left: 0;
                        text-align: center;
                    }
                }

                @include mobile {
                    width: 100%;
                    left: 0;
                    text-align: center;
                }
            }

            &.black {
                color: $c-black;
            }

            &.white {
                color: $c-white;
            }
        }

        &Pagination {
            position: absolute;
            right: scaling(16);
            display: flex;
            align-items: center;
            z-index: 3;

            @include desktop--large {
                bottom: scaling(36);
                right: scaling(32);
            }

            @include desktop {
                bottom: scaling(28);
                right: scaling(24);
            }

            @include desktop--small {
                bottom: scaling(24);
                right: scaling(20);
            }

            #{$component}:not(.isSmallOnlyMobile) & {
                @include laptop {
                    height: scaling(42);
                    top: 0;
                    left: scaling(16);
                }

                @include tablet {
                    height: scaling(42);
                    top: 0;
                    left: scaling(16);
                }
            }

            #{$component}.isSmallOnlyMobile & {
                @include laptop {
                    bottom: scaling(20);
                }

                @include tablet {
                    bottom: scaling(20);
                }
            }

            @include mobile {
                height: scaling(66);
                top: 0;
                left: scaling(16);
            }

            ::v-deep &Item {
                @include heading-label;

                width: scaling(40);
                height: scaling(40);
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                color: $c-black;
                cursor: pointer;
                transition: $d-hover color;

                #{$component}:not(.isSmallOnlyMobile) & {
                    @include laptop {
                        height: 2px;
                        width: 100%;
                        flex: 1 1 auto;
                        border-radius: 20px;
                        overflow: hidden;
                    }

                    @include tablet {
                        height: 2px;
                        width: 100%;
                        flex: 1 1 auto;
                        border-radius: 20px;
                        overflow: hidden;
                    }
                }

                @include mobile {
                    height: 2px;
                    width: 100%;
                    flex: 1 1 auto;
                    border-radius: 20px;
                    overflow: hidden;
                }

                &:not(:first-child) {
                    margin-left: scaling(12);
                }

                &.swiper-pagination-bullet-active {
                    color: $c-red !important;

                    #{$component}:not(.isAutoplay)
                        &
                        #{$component}-sliderPaginationItemLine {
                        @include laptop {
                            transform: translate3d(0, 0, 0);
                        }
                        @include tablet {
                            transform: translate3d(0, 0, 0);
                        }
                        @include mobile {
                            transform: translate3d(0, 0, 0);
                        }
                    }
                }

                &.isPlaying {
                    svg {
                        stroke-dashoffset: 125.66368;
                        transition: 7s stroke-dashoffset linear;
                    }

                    #{$component}-sliderPaginationItemLine {
                        @include laptop {
                            transform: translate3d(0, 0, 0);
                            transition: 7s transform linear;
                        }

                        @include tablet {
                            transform: translate3d(0, 0, 0);
                            transition: 7s transform linear;
                        }

                        @include mobile {
                            transform: translate3d(0, 0, 0);
                            transition: 7s transform linear;
                        }
                    }
                }

                .white & {
                    color: $c-white;

                    #{$component}:not(.isSmallOnlyMobile) & {
                        @include laptop {
                            background-color: rgba($c-white, 0.2);

                            &.swiper-pagination-bullet-active {
                                background-color: rgba($c-white, 0.56);
                            }
                        }

                        @include tablet {
                            background-color: rgba($c-white, 0.2);

                            &.swiper-pagination-bullet-active {
                                background-color: rgba($c-white, 0.56);
                            }
                        }
                    }

                    @include mobile {
                        background-color: rgba($c-white, 0.2);

                        &.swiper-pagination-bullet-active {
                            background-color: rgba($c-white, 0.56);
                        }
                    }
                }

                .black & {
                    color: $c-black;

                    #{$component}:not(.isSmallOnlyMobile) & {
                        @include laptop {
                            background-color: rgba($c-black, 0.2);
                        }

                        @include tablet {
                            background-color: rgba($c-black, 0.2);
                        }
                    }

                    @include mobile {
                        background-color: rgba($c-black, 0.2);
                    }
                }

                @include hover {
                    &:hover {
                        color: $c-red;
                    }
                }

                &Text {
                    #{$component}:not(.isSmallOnlyMobile) & {
                        @include laptop {
                            display: none;
                        }

                        @include tablet {
                            display: none;
                        }
                    }

                    @include mobile {
                        display: none;
                    }
                }

                &Line {
                    display: none;
                    width: 100%;
                    background: $c-red;
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    transform: translate3d(-100%, 0, 0);

                    #{$component}:not(.isSmallOnlyMobile) & {
                        @include laptop {
                            display: block;
                        }

                        @include tablet {
                            display: block;
                        }
                    }

                    @include mobile {
                        display: block;
                    }
                }

                svg {
                    @include m-absolute100;

                    stroke: currentColor;
                    overflow: visible;
                    stroke-dasharray: 125.66368 125.66368;
                    stroke-dashoffset: 0;
                    transform: rotate(-90deg);
                    transition: none;

                    #{$component}:not(.isSmallOnlyMobile) & {
                        @include laptop {
                            display: none;
                        }

                        @include tablet {
                            display: none;
                        }
                    }

                    @include mobile {
                        display: none;
                    }
                }
            }
        }
    }
}
</style>
