<template>
    <div ref="slider" class="ConcertSuggestions swiper-container">
        <div class="ConcertSuggestions-title">
            <div
                ref="sliderNavigationPrev"
                class="ConcertSuggestions-titlePrev"
            >
                <picture>
                    <img src="/images/concert/left.svg" alt="" />
                </picture>
            </div>
            <div class="ConcertSuggestions-titleText">Другие концерты</div>
            <div
                ref="sliderNavigationNext"
                class="ConcertSuggestions-titleNext"
            >
                <img src="/images/concert/right.svg" alt="" />
            </div>
        </div>
        <div class="ConcertSuggestions-items swiper-wrapper">
            <div
                v-for="(suggestion, index) in suggestions"
                :key="index"
                class="ConcertSuggestions-item swiper-slide"
            >
                <div class="ConcertSuggestions-itemInner">
                    <HiddenLink v-if="suggestion.url" :url="suggestion.url" />
                    <div
                        class="ConcertSuggestions-itemType"
                        v-text="suggestion.type"
                    ></div>
                    <div
                        class="ConcertSuggestions-itemTitle"
                        v-text="suggestion.title"
                    ></div>
                    <!-- eslint-disable -->
                    <div
                        v-if="suggestion.description"
                        class="ConcertSuggestions-itemDescription"
                        v-html="suggestion.description"
                    ></div>
                    <!-- eslint-enable -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, Navigation } from 'swiper';
import 'swiper/swiper.scss';
import HiddenLink from '~/components/common/HiddenLink';

Swiper.use([Navigation]);

export default {
    name: 'ConcertSuggestions',

    components: {
        HiddenLink
    },

    props: {
        suggestions: {
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
                direction: 'horizontal',
                slidesPerView: '4',
                spaceBetween: 0,
                autoHeight: true,
                loop: false,
                allowTouchMove: false,
                navigation: {
                    nextEl: this.$refs.sliderNavigationNext,
                    prevEl: this.$refs.sliderNavigationPrev
                },
                breakpoints: {
                    320: {
                        slidesPerView: '1',
                        allowTouchMove: true
                    },
                    768: {
                        slidesPerView: '3'
                    },
                    1200: {
                        slidesPerView: '4'
                    }
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.ConcertSuggestions {
    $component: &;

    &-title {
        border-bottom: 1px solid $c-black;

        @include mobile {
            display: flex;
            width: 100%;
            justify-content: center;
        }

        &Prev,
        &Next {
            display: none;
            align-items: center;
            justify-content: center;
            width: scaling(48);
            height: scaling(48);

            @include mobile {
                display: flex;
            }
        }

        &Text {
            @include text--button;

            flex: 1;
            padding: scaling(32) 0 scaling(16);
            text-align: center;
            background-color: $c-gray-95;

            @include desktop--large {
                padding: scaling(64) 0 scaling(32);
            }

            @include desktop {
                padding: scaling(48) 0 scaling(24);
            }

            @include desktop--small {
                padding: scaling(40) 0 scaling(20);
            }

            @include mobile {
                padding: scaling(14) 0;
                border-left: 1px solid $c-black;
                border-right: 1px solid $c-black;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: $c-white;
            }
        }
    }

    &-items {
        display: flex;
    }

    &-item {
        width: (100% / 4);
        box-shadow: 0 0 0 0.5px $c-black;

        @include laptop {
            width: (100% / 3);
        }

        @include tablet {
            width: (100% / 3);

            &:last-child {
                display: none;
            }
        }

        @include mobile {
            width: 100%;
        }

        &Inner {
            box-shadow: 0 0 0 0.5px $c-black;
            border-top-left-radius: scaling(240);
            border-top-right-radius: scaling(240);
            padding: scaling(320) scaling(32) scaling(32);
            min-height: scaling(960);
            position: relative;

            @include desktop {
                padding: scaling(240) scaling(24) scaling(24);
                min-height: scaling(720);
                border-top-left-radius: scaling(180);
                border-top-right-radius: scaling(180);
            }

            @include desktop--small {
                padding: scaling(200) scaling(20) scaling(20);
                min-height: scaling(600);
                border-top-left-radius: scaling(150);
                border-top-right-radius: scaling(150);
            }

            @include laptop {
                padding: scaling(230) scaling(32) scaling(32);
                min-height: scaling(640);
                border-top-left-radius: scaling(160);
                border-top-right-radius: scaling(160);
            }

            @include tablet {
                padding: scaling(160) scaling(24) scaling(24);
                min-height: scaling(512);
                border-top-left-radius: scaling(128);
                border-top-right-radius: scaling(128);
            }

            @include mobile {
                padding: scaling(196) scaling(32) scaling(32);
                min-height: scaling(560);
                border-top-left-radius: scaling(160);
                border-top-right-radius: scaling(160);
            }

            @include hover {
                &:hover {
                    #{$component}-itemTitle {
                        color: $c-red;
                    }
                }
            }
        }

        &Type {
            @include text;

            text-align: center;
            color: #9f9f9f;
            margin-bottom: scaling(8);

            @include desktop--large {
                margin-bottom: scaling(20);
            }

            @include desktop {
                margin-bottom: scaling(16);
            }

            @include desktop--small {
                margin-bottom: scaling(12);
            }

            @include mobile {
                margin-bottom: scaling(12);
            }
        }

        &Title {
            @include title;

            text-align: center;
            margin-bottom: scaling(8);
            color: $c-black;
            transition: color $d-hover ease-in-out;

            @include desktop--large {
                margin-bottom: scaling(20);
            }

            @include desktop {
                margin-bottom: scaling(16);
            }

            @include desktop--small {
                margin-bottom: scaling(12);
            }

            @include mobile {
                margin-bottom: scaling(12);
            }

            &:last-child {
                margin-bottom: 0;
            }
        }

        &Description {
            @include text;

            text-align: center;
            color: #7f7f7f;

            &::v-deep a {
                position: relative;
                z-index: 10;
                color: $c-red;
                transition: color $d-hover ease-in-out;

                @include hover {
                    &:hover {
                        color: $c-black;
                    }
                }
            }
        }
    }
}
</style>
