<template>
    <div class="AboutYouthTour">
        <div ref="slider" class="swiper-container">
            <div class="AboutYouthTour-navigation">
                <div ref="buttonPrev" class="AboutYouthTour-navigationButton">
                    <svg-icon name="icon-arrow" />
                </div>
                <div
                    class="AboutYouthTour-navigationTitle"
                    v-text="`Гастроли`"
                ></div>
                <div ref="buttonNext" class="AboutYouthTour-navigationButton">
                    <svg-icon name="icon-arrow" />
                </div>
            </div>
            <div class="AboutYouthTour-inner swiper-wrapper">
                <div
                    v-for="(item, index) in tour"
                    :key="index"
                    class="AboutYouthTour-item swiper-slide"
                >
                    <div
                        class="AboutYouthTour-itemCountry"
                        v-text="item.country"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, Navigation } from 'swiper';
import 'swiper/swiper.scss';

Swiper.use([Navigation]);

export default {
    name: 'AboutYouthTour',

    props: {
        tour: {
            type: Array,
            required: true
        }
    },

    mounted() {
        this.initSwiper();
    },

    methods: {
        initSwiper() {
            this.swiper = new Swiper(this.$refs.slider, {
                navigation: {
                    nextEl: this.$refs.buttonNext,
                    prevEl: this.$refs.buttonPrev
                },
                breakpoints: {
                    320: {
                        slidesPerColumn: 2,
                        slidesPerView: 1
                    },
                    768: {
                        slidesPerColumn: 1,
                        slidesPerView: 4
                    },
                    960: {
                        slidesPerColumn: 1,
                        slidesPerView: 4
                    },
                    1200: {
                        slidesPerColumn: 1,
                        slidesPerView: 4
                    },
                    1440: {
                        slidesPerColumn: 1,
                        slidesPerView: 4
                    }
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutYouthTour {
    $component: &;

    margin-top: scaling(72);
    border-bottom: 1px solid $c-black;

    @include desktop--large {
        margin-top: scaling(120);
    }

    @include desktop {
        margin-top: scaling(100);
    }

    @include desktop--small {
        margin-top: scaling(80);
    }

    @include mobile {
        margin-top: scaling(64);
        border-bottom: none;
    }

    &-navigation {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid $c-black;
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
            font-size: scaling(14);
            line-height: $lh-140;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            text-align: center;
            font-weight: $fw-bold;
            font-feature-settings: 'ss02' on;

            @include desktop--large {
                font-size: scaling(20);
                line-height: $lh-120;
            }

            @include desktop {
                font-size: scaling(18);
                line-height: $lh-120;
            }

            @include mobile {
                font-size: scaling(13);
                line-height: $lh-130;
                letter-spacing: 0.04em;
            }
        }
    }

    &-inner {
        @include mobile {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            grid-auto-flow: column;
        }
    }

    &-item {
        padding: scaling(180) scaling(32) scaling(36);
        border-right: 1px solid $c-black;

        @include desktop {
            padding: scaling(149) scaling(24) scaling(28);
        }

        @include desktop--small {
            padding: scaling(130) scaling(20) scaling(24);
        }

        @include laptop {
            padding: scaling(176) scaling(16) scaling(20);
        }

        @include tablet {
            padding: scaling(132) scaling(16) scaling(20);
        }

        @include mobile {
            padding: scaling(85) scaling(16) scaling(20);
            border-right: none;
            border-bottom: 1px solid $c-black;
        }

        &Country {
            font-size: scaling(18);
            line-height: $lh-120;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            font-feature-settings: 'ss02' on;

            @include desktop--large {
                font-size: scaling(25);
                line-height: $lh-110;
                letter-spacing: 0;
            }

            @include desktop {
                font-size: scaling(21);
                line-height: $lh-110;
                letter-spacing: 0;
            }

            @include desktop--small {
                font-size: scaling(20);
                line-height: $lh-110;
                letter-spacing: 0;
            }

            @include mobile {
                font-size: scaling(20);
                line-height: $lh-110;
            }
        }
    }
}
</style>
