<template>
    <div class="AboutBuildingNav">
        <div
            v-for="(item, index) in nav"
            :key="index"
            :data-section="'section-' + (index + 1)"
            class="AboutBuildingNav-item"
            @click="scrollToAnchor(`#${'section-' + (index + 1)}`)"
            v-text="item.title"
        ></div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { isLaptop } from '@/utils/utils';
import VueScrollTo from 'vue-scrollto';

export default {
    name: 'AboutBuildingNav',

    data() {
        return {
            nav: [
                {
                    title: 'Историческое здание'
                },
                {
                    title: 'Бетховенский зал'
                },
                {
                    title: 'Новая сцена'
                },
                {
                    title: 'Камерная сцена'
                }
            ]
        };
    },

    computed: {
        ...mapState(['headerHeight'])
    },

    mounted() {
        this.sections = document.querySelectorAll(
            '.AboutBuilding-content div[id]'
        );

        window.addEventListener('resize', this.onResize);
        this.$nextTick(this.onResize);
        window.addEventListener('scroll', this.onScroll);
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('scroll', this.onScroll);
    },

    methods: {
        onResize() {
            if (!isLaptop()) {
                this.$el.style.top = `${this.headerHeight - 1}px`;
                this.$el.style.height = `${
                    window.innerHeight - this.headerHeight
                }px`;
            } else {
                this.$el.removeAttribute('style');
            }
        },

        onScroll() {
            const scrollY = window.pageYOffset;

            this.sections.forEach((current) => {
                const sectionTop =
                    current.getBoundingClientRect().top +
                    scrollY -
                    this.headerHeight;
                const sectionHeight = current.offsetHeight;
                const sectionId = current.getAttribute('id');
                const navItem = document.querySelector(
                    '.AboutBuildingNav-item[data-section=' + sectionId + ']'
                );

                if (
                    scrollY > sectionTop &&
                    scrollY < sectionTop + sectionHeight
                ) {
                    navItem.classList.add('isActive');
                } else {
                    navItem.classList.remove('isActive');
                }
            });
        },

        scrollToAnchor(anchor) {
            const options = {
                offset: -this.headerHeight + 1
            };

            VueScrollTo.scrollTo(anchor, 1500, options);
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutBuildingNav {
    $component: &;

    position: sticky;
    flex-shrink: 0;
    border-right: 1px solid $c-black;
    border-bottom: 1px solid $c-black;
    background-color: $c-white;
    overflow: auto;
    scrollbar-width: none;
    z-index: 10;

    @include desktop--large {
        width: (320 * 100% / 1920);
    }

    @include desktop {
        width: (240 * 100% / 1440);
    }

    @include desktop--small {
        width: (220 * 100% / 1200);
    }

    @include laptop {
        width: (192 * 100% / 960);
    }

    @include tablet {
        bottom: 0;
        order: 2;
        border-top: 1px solid $c-black;
        border-right: none;
        border-bottom: none;
        white-space: nowrap;
    }

    @include mobile {
        bottom: 0;
        order: 2;
        border-top: 1px solid $c-black;
        border-right: none;
        border-bottom: none;
        white-space: nowrap;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 25%;
        padding: 0 scaling(16);
        cursor: pointer;
        font-size: scaling(12);
        line-height: $lh-160;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        text-align: center;
        font-weight: $fw-medium;
        font-family: $family-graphic;
        transition: background-color $d-hover ease-in-out,
            color $d-hover ease-in-out;

        @include desktop--large {
            padding: 0 scaling(37);
            font-size: scaling(20);
        }

        @include desktop {
            padding: 0 scaling(24);
            font-size: scaling(18);
            line-height: $lh-140;
        }

        @include desktop--small {
            padding: 0 scaling(20);
            font-size: scaling(14);
        }

        @include tablet {
            display: inline-block;
            height: auto;
            padding: scaling(18) scaling(16);
            line-height: $lh-120;
        }

        @include mobile {
            display: inline-block;
            height: auto;
            padding: scaling(18) scaling(16);
            line-height: $lh-120;
        }

        &:not(:last-child) {
            border-bottom: 1px solid $c-black;

            @include tablet {
                border-bottom: none;
                border-right: 1px solid $c-black;
            }

            @include mobile {
                border-bottom: none;
                border-right: 1px solid $c-black;
            }
        }

        @include hover {
            &:hover {
                background-color: $c-black;
                color: $c-white;
            }
        }

        &.isActive {
            background-color: $c-black;
            color: $c-white;
        }
    }
}
</style>
