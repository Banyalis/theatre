<template>
    <div
        ref="list"
        class="PerformancesList b-needFixOnPopupOpen"
        :class="{ isWhite }"
    >
        <NuxtLink
            v-for="(item, index) in performances"
            :key="index"
            :to="item.url"
            class="PerformancesList-item"
            :class="{ noPicture: !item.image }"
        >
            <div
                class="PerformancesList-itemSubtitle"
                v-text="item.subtitle"
            ></div>
            <div class="PerformancesList-itemImage">
                <div class="PerformancesList-itemImageInner">
                    <picture v-if="item.image">
                        <source
                            :srcset="
                                item.image + ' 1x, ' + item.image2x + ' 2x'
                            "
                        />
                        <img :src="item.image" alt="" />
                    </picture>
                </div>
            </div>
            <div class="PerformancesList-itemTitle" v-text="item.title"></div>
            <p
                class="PerformancesList-itemDescription"
                v-text="item.description"
            ></p>
        </NuxtLink>
    </div>
</template>

<script>
import { isDesktop } from '@/utils/utils';

export default {
    name: 'PerformancesList',

    props: {
        performances: {
            type: Array,
            required: true
        },
        isWhite: {
            type: Boolean,
            required: true
        }
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
        this.scrollToActiveView();
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        onResize() {
            this.headerHeight = document.querySelector('.Header').offsetHeight;

            this.setListStyles();
        },

        setListStyles() {
            if (isDesktop()) {
                this.$refs.list.style.top = `${this.headerHeight}px`;
                this.$refs.list.style.height =
                    window.innerHeight - this.headerHeight + 'px';
            } else {
                this.$refs.list.removeAttribute('style');
            }
        },

        scrollToActiveView() {
            const activeView = this.$el.querySelector('.nuxt-link-active');
            const offsetScroll =
                activeView.offsetTop > this.$el.scrollHeight
                    ? this.$el.scrollHeight
                    : activeView.offsetTop;

            this.$el.scrollTop = offsetScroll;
        }
    }
};
</script>

<style lang="scss" scoped>
.PerformancesList {
    $component: &;

    position: sticky;
    display: none;
    flex-shrink: 0;
    border-right: 1px solid $c-gray--header;
    overflow-y: auto;
    scrollbar-width: none;
    transition: border-right-color $d-hover ease-in-out,
        background-color $d-hover ease-in-out;

    @include desktop--large {
        display: block;
        width: (480 * 100% / 1920);
    }

    @include desktop {
        display: block;
        width: (360 * 100% / 1440);
    }

    @include desktop--small {
        display: block;
        width: (300 * 100% / 1200);
    }

    &::-webkit-scrollbar {
        display: none;
    }

    &.isWhite {
        border-right-color: $c-black;
        background-color: $c-white;
    }

    &-item {
        display: block;
        text-align: center;

        @include desktop--large {
            padding: scaling(36) scaling(60) scaling(112);
        }

        @include desktop {
            padding: scaling(28) scaling(60) scaling(96);
        }

        @include desktop--small {
            padding: scaling(24) scaling(40) scaling(72);
        }

        &:not(:last-child) {
            border-bottom: 1px solid $c-gray--header;
            transition: border-bottom-color $d-hover ease-in-out;

            #{$component}.isWhite & {
                border-bottom-color: $c-black;
            }
        }

        @include hover {
            &:hover #{$component}-item {
                &Image {
                    border-color: $c-red;
                    background-color: $c-red;
                }

                &Title {
                    color: $c-red !important;
                }
            }
        }

        &.nuxt-link-active {
            pointer-events: none;

            #{$component}-item {
                &Image {
                    border-color: $c-red;
                    background-color: $c-red;
                }

                &Title {
                    color: $c-red !important;
                }
            }
        }

        &.noPicture #{$component}-itemImageInner {
            background-color: $c-red;
        }

        &Image {
            border: 1px solid $c-gray--header;
            border-top-left-radius: scaling(220);
            border-top-right-radius: scaling(220);
            transition: border-color $d-hover ease-in-out,
                background-color $d-hover ease-in-out;

            @include desktop--large {
                width: scaling(128);
                height: scaling(256);
                margin: scaling(40) auto;
                padding: scaling(8);
            }

            @include desktop {
                width: scaling(96);
                height: scaling(192);
                margin: scaling(32) auto;
                padding: scaling(6);
            }

            @include desktop--small {
                width: scaling(80);
                height: scaling(160);
                margin: scaling(28) auto;
                padding: scaling(4);
            }

            &Inner {
                height: 100%;
                border-top-left-radius: scaling(220);
                border-top-right-radius: scaling(220);
                overflow: hidden;
            }

            img {
                @include m-objectFit;

                width: 100%;
                height: 100%;
            }
        }

        &Subtitle,
        &Description {
            color: $c-gray;
            font-size: scaling(20);
            line-height: $lh-130;
            font-family: $family-graphic;

            @include desktop {
                font-size: scaling(18);
            }

            @include desktop--small {
                font-size: scaling(14);
            }
        }

        &Title {
            margin-bottom: scaling(16);
            color: $c-white;
            font-size: scaling(36);
            line-height: $lh-110;
            text-transform: uppercase;
            font-feature-settings: 'ss02' on;
            transition: color $d-hover ease-in-out;

            @include desktop {
                font-size: scaling(28);
            }

            @include desktop--small {
                margin-bottom: scaling(12);
                font-size: scaling(24);
            }

            #{$component}.isWhite & {
                color: $c-black;
            }
        }
    }
}
</style>
