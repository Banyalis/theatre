<template>
    <div class="VisitSidebar" :class="{ isScroll, isCloseAd }">
        <div
            v-for="(category, categoryIndex) in categories"
            :key="categoryIndex"
            class="VisitSidebar-category"
        >
            <span
                class="VisitSidebar-categoryTitle"
                v-text="category.title"
            ></span>
            <div
                v-for="(item, index) in category.items"
                :key="index"
                class="VisitSidebar-categoryItem"
                @click="openPopup"
            >
                <NuxtLink
                    :to="`/visit/${item.slug}`"
                    class="VisitSidebar-categoryItemLink"
                >
                    <div
                        class="VisitSidebar-categoryItemText"
                        v-text="item.h1"
                    ></div>
                    <div
                        class="VisitSidebar-categoryItemNumber"
                        v-text="getIndex(categoryIndex, index)"
                    ></div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
import { isLaptop } from '@/utils/utils';
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'VisitSidebar',

    props: {
        categories: {
            type: Array,
            required: true
        },
        currentSlug: {
            type: String,
            required: true
        },
        isCloseAd: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            isScroll: false
        };
    },

    computed: {
        ...mapState(['headerHeight']),
        ...mapState('visit', ['isShowContent'])
    },

    mounted() {
        this.categories.forEach((category, categoryIndex) => {
            category.items.forEach((item, index) => {
                if (item.slug === this.currentSlug)
                    this.changeSection(categoryIndex, index);
            });
        });

        window.addEventListener('resize', this.onResize);
        this.$nextTick(this.onResize);
        this.scrollTo();
    },

    updated() {
        if (this.$el.classList.contains('isCloseAd')) {
            setTimeout(() => {
                this.$el.classList.remove('isCloseAd');
            }, 100);
        }
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        getIndex(categoryIndex, index) {
            let result = 0;

            for (let i = 0; i < categoryIndex; i++) {
                result += this.categories[i].items.length;
            }

            return result + index + 1;
        },

        changeSection(categoryIndex, index) {
            const currentIndex = this.getIndex(categoryIndex, index);

            this.$emit('change-section', currentIndex);
        },

        onResize() {
            this.checkScroll();
            this.setSidebarStyles();
        },

        checkScroll() {
            this.isScroll = this.$el.scrollHeight + 5 > this.$el.clientHeight;
        },

        setSidebarStyles() {
            if (!isLaptop()) {
                this.$el.style.top = `${this.headerHeight}px`;
                this.$el.style.height = `${
                    window.innerHeight - this.headerHeight
                }px`;
            } else {
                this.$el.removeAttribute('style');
            }
        },

        scrollTo() {
            if (!isLaptop()) {
                const activeElement =
                    this.$el.querySelector('.nuxt-link-active');

                const offsetScroll =
                    activeElement.offsetTop > this.$el.scrollHeight
                        ? this.$el.scrollHeight
                        : activeElement.offsetTop;

                this.$el.scrollTop = offsetScroll;
            }
        },

        openPopup(event) {
            if (
                event.currentTarget.children[0].classList.contains(
                    'nuxt-link-active'
                )
            ) {
                this.$emit('toggle-close-popup', false);

                event.stopPropagation();
            } else {
                this.toggleShowContent(false);
            }
        },

        ...mapMutations({
            toggleShowContent: 'visit/toggleShowContent'
        })
    }
};
</script>

<style lang="scss" scoped>
.VisitSidebar {
    $component: &;

    position: sticky;
    left: 0;
    width: 100%;
    border-right: 1px solid $c-black;
    background-color: $c-white;
    overflow-y: auto;
    scrollbar-width: none;

    @include desktop--large {
        width: (480 * 100% / 1920);
    }

    @include desktop {
        width: (360 * 100% / 1440);
    }

    @include desktop--small {
        width: (300 * 100% / 1200);
    }

    @include laptop {
        width: (240 * 100% / 960);
    }

    @include tablet {
        position: relative;
        height: auto;
        margin-bottom: -1px;
        border-right: none;
    }

    @include mobile {
        position: relative;
        height: auto;
        margin-bottom: -1px;
        border-right: none;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    &.isScroll
        #{$component}-category:last-child
        #{$component}-categoryItem:last-child {
        border-bottom: none;
    }

    &.isCloseAd {
        overflow-y: hidden;
    }

    &-category {
        display: flex;
        flex-wrap: wrap;

        &Title {
            @include heading-label;

            width: 100%;
            padding: scaling(32) scaling(30) scaling(16);
            border-bottom: 1px solid $c-black;
            background-color: $c-white;
            text-align: center;

            @include desktop--large {
                padding: scaling(64) scaling(90) scaling(32);
            }

            @include desktop {
                padding: scaling(48) scaling(30) scaling(24);
            }

            @include desktop--small {
                padding: scaling(40) scaling(20) scaling(20);
            }

            @include tablet {
                margin-top: -1px;
                border-top: 1px solid $c-black;
            }

            @include mobile {
                margin-top: -1px;
                border-top: 1px solid $c-black;
            }
        }

        &Item {
            width: 100%;
            border-bottom: 1px solid $c-black;

            @include tablet {
                width: (100% / 3);
                min-height: scaling(175);

                &:not(:nth-of-type(3n)) {
                    border-right: 1px solid $c-black;
                }
            }

            @include mobile {
                width: (100% / 2);
                min-height: scaling(145);

                &:not(:nth-of-type(2n)) {
                    border-right: 1px solid $c-black;
                }
            }

            &Link {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 100%;
                padding: scaling(20) scaling(16);
                background-color: $c-white;
                color: $c-black;
                transition: background-color $d-hover ease-in-out,
                    color $d-hover ease-in-out;

                @include desktop--large {
                    padding: scaling(29) scaling(32);
                }

                @include desktop {
                    padding: scaling(21) scaling(24);
                }

                @include desktop--small {
                    padding: scaling(18) scaling(20);
                }

                @include laptop {
                    padding: scaling(16);
                }

                @include tablet {
                    flex-direction: column;
                    align-items: flex-end;
                }

                @include mobile {
                    flex-direction: column;
                    align-items: flex-end;
                }

                @include hover {
                    &:hover {
                        background-color: $c-red;
                        color: $c-white;

                        #{$component}-categoryItemNumber {
                            border-color: $c-white;
                            color: $c-red;
                        }
                    }
                }

                &.nuxt-link-active {
                    @include desktop--large {
                        background-color: $c-red;
                        pointer-events: none;
                        color: $c-white;

                        #{$component}-categoryItemNumber {
                            border-color: $c-white;
                            color: $c-red;
                        }
                    }

                    @include desktop {
                        background-color: $c-red;
                        pointer-events: none;
                        color: $c-white;

                        #{$component}-categoryItemNumber {
                            border-color: $c-white;
                            color: $c-red;
                        }
                    }

                    @include desktop--small {
                        background-color: $c-red;
                        pointer-events: none;
                        color: $c-white;

                        #{$component}-categoryItemNumber {
                            border-color: $c-white;
                            color: $c-red;
                        }
                    }

                    @include laptop {
                        background-color: $c-red;
                        pointer-events: none;
                        color: $c-white;

                        #{$component}-categoryItemNumber {
                            border-color: $c-white;
                            color: $c-red;
                        }
                    }
                }
            }

            &Text {
                width: 100%;
                font-size: scaling(18);
                line-height: $lh-140;
                font-family: $family-graphic;

                @include desktop--large {
                    font-size: scaling(24);
                }

                @include desktop {
                    font-size: scaling(20);
                }

                @include laptop {
                    font-size: scaling(14);
                    line-height: $lh-130;
                }

                @include mobile {
                    font-size: scaling(14);
                    line-height: $lh-130;
                }
            }

            &Number {
                @include button-text;

                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                width: scaling(29);
                height: scaling(29);
                margin-left: scaling(5);
                border: 1px solid $c-gray;
                background-color: $c-white;
                border-radius: 100%;
                color: $c-gray;
                transition: border-color $d-hover ease-in-out,
                    color $d-hover ease-in-out;

                @include desktop--large {
                    width: scaling(40);
                    height: scaling(40);
                }

                @include desktop {
                    width: scaling(34);
                    height: scaling(34);
                }
            }
        }
    }
}
</style>
