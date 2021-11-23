<template>
    <div class="AboutHistoryNav">
        <div
            v-for="(item, index) in nav"
            :key="index"
            :data-section="'section-' + (index + 1)"
            class="AboutHistoryNav-item"
            @click="scrollToAnchor(`#${'section-' + (index + 1)}`)"
        >
            <div class="AboutHistoryNav-itemTitle" v-text="item.title"></div>
            <div class="AboutHistoryNav-itemYear" v-text="item.year"></div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import VueScrollTo from 'vue-scrollto';

export default {
    name: 'AboutHistoryNav',

    data() {
        return {
            nav: [
                {
                    title: 'Петровский театр',
                    year: '1776–1819'
                },
                {
                    title: 'Большой Петровский театр',
                    year: '1825–1853'
                },
                {
                    title: 'Большой театр, Императорский',
                    year: '1855–1917'
                },
                {
                    title: 'Большой театр, Государственный. Театр Союза ССР',
                    year: '1917–1991'
                },
                {
                    title: 'Большой театр россии',
                    year: '1991–настоящее время'
                }
            ]
        };
    },

    computed: {
        ...mapState(['headerHeight'])
    },

    mounted() {
        this.sections = document.querySelectorAll(
            '.AboutHistory-content div[id]'
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
            this.$el.style.top = `${this.headerHeight}px`;
            this.$el.style.height = `${
                window.innerHeight - this.headerHeight
            }px`;
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
                    '.AboutHistoryNav-item[data-section=' + sectionId + ']'
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
.AboutHistoryNav {
    $component: &;

    position: sticky;
    width: (320 * 100% / 1920);
    background-color: $c-black--header;
    z-index: 10;
    overflow: auto;
    scrollbar-width: none;

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
        width: (192 * 100% / 768);
    }

    @include mobile {
        width: 100%;
        height: auto !important;
        white-space: nowrap;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    &-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: scaling(16);
        position: relative;
        cursor: pointer;
        transition: background-color $d-hover ease-in-out;

        @include desktop--large {
            height: scaling(216);
            padding: scaling(32);
        }

        @include desktop {
            height: scaling(180);
            padding: scaling(24);
        }

        @include desktop--small {
            height: scaling(160);
            padding: scaling(20);
        }

        @include laptop {
            height: scaling(153);
        }

        @include tablet {
            height: scaling(192);
        }

        @include mobile {
            display: inline-block;
            padding: scaling(13) scaling(14);
        }

        &:not(:last-child) {
            border-bottom: 1px solid $c-gray--header;
        }

        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-size: cover;
            background-repeat: no-repeat;
            opacity: 0;
            transition: opacity $d-hover ease-in-out;

            @include mobile {
                display: none;
            }
        }

        @for $i from 1 to 6 {
            &:nth-child(#{$i}):before {
                background-image: url('~assets/images/about/history/nav/#{$i}.jpg');

                @media (-webkit-min-device-pixel-ratio: 2),
                    (min-resolution: 192dpi) {
                    background-image: url('~assets/images/about/history/nav/#{$i}@2x.jpg');
                }
            }
        }

        @include hover {
            &:hover {
                @include mobile {
                    background-color: $c-gold--lighten;
                }

                &:before {
                    opacity: 1;
                }

                #{$component}-item {
                    &Title,
                    &Year {
                        color: $c-black;
                    }
                }
            }
        }

        &.isActive {
            @include mobile {
                background-color: $c-gold--lighten;
            }

            &:before {
                opacity: 1;
            }

            #{$component}-item {
                &Title,
                &Year {
                    color: $c-black;
                }
            }
        }

        &Title,
        &Year {
            position: relative;
            z-index: 10;
        }

        &Title {
            color: $c-white;
            font-size: scaling(12);
            line-height: $lh-160;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-weight: $fw-medium;
            font-family: $family-graphic;
            transition: color $d-hover ease-in-out;

            @include desktop--large {
                font-size: scaling(20);
            }

            @include desktop {
                font-size: scaling(14);
            }

            @include desktop--small {
                font-size: scaling(14);
            }
        }

        &Year {
            color: $c-gray;
            font-size: scaling(14);
            line-height: $lh-130;
            font-family: $family-graphic;
            transition: color $d-hover ease-in-out;

            @include desktop--large {
                font-size: scaling(20);
            }

            @include desktop {
                font-size: scaling(18);
            }

            @include mobile {
                display: none;
            }
        }
    }
}
</style>
