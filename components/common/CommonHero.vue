<template>
    <div class="CommonHero" :class="{ isDark, isFixed, isSticky }">
        <div class="CommonHero-wrapper">
            <div class="CommonHero-titleWrapper" :class="{ isTitleBottom }">
                <!-- eslint-disable-next-line -->
                <div class="CommonHero-title" v-html="title"></div>
            </div>
            <div class="CommonHero-figure">
                <component :is="mappedComponents[type]" />
            </div>
            <div
                v-if="tabs.length"
                ref="tabsOutter"
                class="CommonHero-tabsOutter"
            >
                <div class="CommonHero-tabs">
                    <div v-if="!isDark" class="CommonHero-tabsBg"></div>
                    <div ref="tabs" class="CommonHero-tabsInner">
                        <div ref="tabsInner" class="CommonHero-tabsWrapper">
                            <nuxt-link
                                v-for="(tab, index) in tabs"
                                :key="index"
                                :to="tab.link"
                                class="CommonHero-tab"
                                v-text="tab.title"
                            ></nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import SeasonHero from '~/components/season/SeasonHero';
import VisitHero from '~/components/visit/VisitHero';
import PosterHero from '~/components/poster/PosterHero';
import PeopleHero from '~/components/people/PeopleHero';

export default {
    name: 'CommonHero',
    components: { SeasonHero, VisitHero, PosterHero, PeopleHero },
    props: {
        type: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        isTitleBottom: {
            type: Boolean,
            default: false
        },
        isDark: {
            type: Boolean,
            default: false
        },
        isFixed: {
            type: Boolean,
            default: false
        },
        tabs: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            mappedComponents: {
                season: 'SeasonHero',
                visit: 'VisitHero',
                poster: 'PosterHero',
                people: 'PeopleHero'
            },
            idTimeout: null,
            isSticky: false
        };
    },

    computed: {
        ...mapState(['headerHeight'])
    },

    mounted() {
        window.addEventListener('scroll', this.onScroll);
        this.onScroll();
        window.addEventListener('resize', this.onResize);
        this.onResize();
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        onScroll() {
            if (this.$el.offsetHeight && !this.isFixed) {
                const currentScrollPosition = window.pageYOffset;
                const heroHeight =
                    this.$el.offsetHeight - this.$refs.tabsOutter.offsetHeight;

                if (currentScrollPosition >= heroHeight) {
                    this.isSticky = true;

                    this.$el.style.top = `-${
                        this.$el.offsetHeight -
                        this.$refs.tabsOutter.offsetHeight -
                        this.headerHeight
                    }px`;
                } else {
                    this.isSticky = false;

                    this.$el.removeAttribute('style');
                }
            }
        },

        onResize() {
            clearTimeout(this.idTimeout);

            if (this.$refs.tabsInner) {
                this.getTabsPadding =
                    parseInt(
                        window
                            .getComputedStyle(this.$refs.tabsInner, null)
                            .getPropertyValue('padding-left'),
                        10
                    ) + 1;

                this.idTimeout = setTimeout(this.setTabsShift, 100);
            }
        },

        setTabsShift() {
            const x =
                this.$refs.tabs
                    .querySelector('.nuxt-link-active')
                    .getBoundingClientRect().x - this.getTabsPadding;

            this.$refs.tabs.scrollBy(x, 0);
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonHero {
    $component: &;

    width: 100%;
    display: flex;
    border-bottom: 1px solid $c-black;
    overflow: hidden;

    &.isDark {
        border-color: $c-gray--header;
    }

    &.isFixed {
        position: fixed;

        @include tablet {
            position: static;
        }

        @include mobile {
            position: static;
        }
    }

    &.isSticky {
        position: sticky;
        z-index: 20;

        #{$component} {
            &-titleWrapper,
            &-figure {
                display: none;
            }
        }
    }

    &-wrapper {
        @include m-aspectRatio(1920, 704);

        width: 100%;
        background: $c-red;

        @include tablet {
            @include m-aspectRatio(768, 480);
        }

        @include mobile {
            @include m-aspectRatio(320, 240);
        }

        #{$component}.isDark & {
            background: $c-black--header;
        }
    }

    &-title {
        @include title--big;

        color: $c-white;
        text-align: center;
        width: 100%;

        @include tablet {
            width: 70%;
        }

        @include mobile {
            width: 88%;
        }

        &Wrapper {
            position: absolute;
            top: scaling(32);
            left: 0;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            @include desktop {
                top: scaling(24);
            }

            @include desktop--small {
                top: scaling(20);
            }

            @include laptop {
                top: scaling(16);
            }

            @include tablet {
                top: scaling(16);
            }

            @include mobile {
                top: scaling(20);
            }

            &.isTitleBottom {
                top: auto;
                bottom: scaling(104);

                @include desktop {
                    bottom: scaling(80);
                }

                @include desktop--small {
                    bottom: scaling(66);
                }

                @include laptop {
                    bottom: scaling(54);
                }

                @include tablet {
                    bottom: scaling(70);
                }

                @include mobile {
                    bottom: scaling(54);
                }
            }
        }
    }

    &-figure {
        @include m-absolute100;

        pointer-events: none;
    }

    &-tabs {
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        position: relative;
        justify-content: center;
        align-items: flex-end;

        &Outter {
            position: absolute;
            bottom: 0;
            width: 100%;
            display: flex;
            justify-content: center;
        }

        &Bg {
            @include m-absolute100;

            z-index: $z-one;
            background: linear-gradient(
                180deg,
                rgba($c-red, 0) 0,
                rgba($c-red, 0.5) 100%
            );
        }

        &Inner {
            display: flex;
            overflow-y: hidden;
            overflow-x: auto;
            z-index: $z-two;

            @include tablet {
                height: scaling(54);
            }

            @include mobile {
                height: scaling(54);
            }

            &::-webkit-scrollbar {
                width: 0;
                height: 0;
            }

            &::-webkit-scrollbar-track {
                background-color: transparent;
            }

            &::-webkit-scrollbar-thumb {
                background-color: transparent;
            }

            &::-webkit-scrollbar-button {
                background-color: transparent;
            }

            &::-webkit-scrollbar-corner {
                background-color: transparent;
            }
        }

        &Wrapper {
            display: flex;
            flex-wrap: nowrap;
            width: auto;
            padding: scaling(16);

            @include desktop--large {
                padding: scaling(32);
            }

            @include desktop {
                padding: scaling(24);
            }

            @include desktop--small {
                padding: scaling(20);
            }
        }
    }

    &-tab {
        @include title--sans;

        white-space: nowrap;
        color: $c-black;
        margin-left: scaling(28);
        transition: $d-hover color;

        @include desktop {
            margin-left: scaling(20);
        }

        @include desktop--small {
            margin-left: scaling(16);
        }

        @include laptop {
            margin-left: scaling(16);
        }

        @include tablet {
            margin-left: scaling(16);
        }

        @include mobile {
            margin-left: scaling(12);
        }

        &:first-child {
            margin-left: 0;
        }

        @include hover {
            &:hover {
                color: $c-white;
            }
        }

        &.nuxt-link-active {
            color: $c-white;
            pointer-events: none;
            cursor: default;
        }
    }
}
</style>
