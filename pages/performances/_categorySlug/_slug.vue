<template>
    <div class="Performances">
        <PerformancesList :performances="getContent" :is-white="whiteTheme" />
        <div class="Performances-content">
            <PerformanceIntro
                :intro="content.intro"
                :schedule-length="content.schedule.length"
                @scroll-to="(anchor) => scrollToAnchor(anchor)"
            />
            <div
                ref="nav"
                class="Performance-nav b-needFixOnPopupOpen"
                :class="{ isWhite: whiteTheme }"
            >
                <!-- eslint-disable -->
                <div
                    v-for="(item, index) in nav"
                    :key="index"
                    v-if="item.show"
                    :data-section="item.anchor"
                    class="Performance-navItem"
                    @click="scrollToAnchor(`#${item.anchor}`)"
                    v-text="item.title"
                ></div>
                <!-- eslint-enable -->
            </div>
            <PerformanceDetail id="anchor-1" :detail="content.detail" />
            <CommonGallery
                v-if="content.gallery.length"
                id="anchor-2"
                :gallery="content.gallery"
                :theme="'isBlack'"
                :performance="true"
            />
            <PerformanceTeam
                v-if="content.team.length"
                id="anchor-3"
                ref="team"
                :team="content.team"
                :all="content.all"
                @updated-team="getTeamProperties"
            />
            <div v-if="content.summary" id="anchor-4">
                <div
                    class="Performance-title"
                    v-text="`Краткое содержание`"
                ></div>
                <PerformanceSummary
                    :summary="content.summary"
                    :summary-full="content.summaryFull"
                />
            </div>
            <div v-if="content.schedule.length" id="anchor-5">
                <div
                    class="Performance-title"
                    v-text="`Расписание и билеты`"
                ></div>
                <PerformanceSchedule
                    :schedule="content.schedule"
                    :performance-id="content.id"
                />
            </div>
            <PerformanceSponsors
                v-if="content.sponsors.length"
                :sponsors="content.sponsors"
            />
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import VueScrollTo from 'vue-scrollto';
import { HEADER_THEMES } from '../../../utils/constants';
import PerformancesList from '~/components/performance/PerformancesList';
import PerformanceIntro from '~/components/performance/PerformanceIntro';
import PerformanceDetail from '~/components/performance/PerformanceDetail';
import PerformanceTeam from '~/components/performance/PerformanceTeam';
import PerformanceSummary from '~/components/performance/PerformanceSummary';
import PerformanceSchedule from '~/components/performance/PerformanceSchedule';
import PerformanceSponsors from '~/components/performance/PerformanceSponsors';
import CommonGallery from '~/components/common/CommonGallery';

export default {
    components: {
        PerformancesList,
        PerformanceIntro,
        PerformanceDetail,
        PerformanceTeam,
        PerformanceSummary,
        PerformanceSchedule,
        PerformanceSponsors,
        CommonGallery
    },

    data() {
        return {
            nav: [
                {
                    anchor: 'anchor-1',
                    title: 'О спектакле',
                    show: false
                },
                {
                    anchor: 'anchor-2',
                    title: 'Галерея',
                    show: false
                },
                {
                    anchor: 'anchor-3',
                    title: 'Действующие лица',
                    show: false
                },
                {
                    anchor: 'anchor-4',
                    title: 'Краткое содержание',
                    show: false
                },
                {
                    anchor: 'anchor-5',
                    title: 'Расписание и билеты',
                    show: false
                }
            ]
        };
    },

    async fetch({ $config: { baseURL }, $axios, params, store }) {
        if (!store.state.performances[params.categorySlug]) {
            const resList = await $axios.get(
                `${baseURL}/cms/api/performances/${params.categorySlug}`
            );

            if (resList)
                store.commit('performances/setList', {
                    list: resList.data,
                    categoryName: params.categorySlug
                });
        }

        const res = await $axios.get(
            `${baseURL}/cms/api/performances/${params.categorySlug}/${params.slug}`
        );

        if (res) store.commit('performances/setContent', res.data);

        // await store.dispatch('performances/getPrograms');
    },

    head() {
        return {
            title: 'Большой театр • ' + this.content.intro.title
        };
    },

    computed: {
        getContent() {
            return this.list[this.$route.params.categorySlug]
                ? this.list[this.$route.params.categorySlug]
                : [];
        },

        ...mapState(['footerDarkTheme', 'whiteTheme']),
        ...mapState('performances', ['list', 'content'])
    },

    mounted() {
        try {
            this.$store.dispatch('performances/getPrograms').then(() => {
                setTimeout(() => {
                    this.onResize();
                }, 150);
            });
        } catch (error) {
            console.log(error);
        }
        this.sections = document.querySelectorAll(
            '.Performances-content div[id]'
        );

        this.setTheme();
        window.addEventListener('resize', this.onResize);
        setTimeout(() => {
            this.onResize();
        }, 150);
        window.addEventListener('scroll', this.onScroll);

        this.nav.forEach((navItem) => {
            this.sections.forEach((sectionsItem) => {
                if (navItem.anchor === sectionsItem.getAttribute('id')) {
                    navItem.show = true;
                }
            });
        });
    },

    updated() {
        this.setTheme();
    },

    deactivated() {
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('scroll', this.onScroll);
        this.setWhiteTheme(false);

        this.$destroy();
    },

    methods: {
        setTheme() {
            this.changeTheme({
                headerMod: HEADER_THEMES.dark,
                isFooterDark: true
            });
        },

        scrollToAnchor(anchor) {
            const options = {
                offset: -this.extraMargin + 1
            };

            VueScrollTo.scrollTo(anchor, 800, options);
        },

        onResize() {
            this.headerHeight = document.querySelector('.Header').offsetHeight;
            this.extraMargin = this.headerHeight + this.$refs.nav.offsetHeight;

            this.getTeamProperties();
            this.setNavStyles();
        },

        getTeamProperties() {
            if (this.$refs.team) {
                this.teamHeight = this.$refs.team.$el.offsetHeight;
                this.teamOffset =
                    this.$refs.team.$el.getBoundingClientRect().top +
                    window.pageYOffset;
            }
        },

        onScroll() {
            const scrollY = window.pageYOffset;
            const scrollTop = scrollY + this.extraMargin;

            if (
                scrollTop > this.teamOffset &&
                scrollTop < this.teamOffset + this.teamHeight
            ) {
                this.setWhiteTheme(true);
            } else {
                this.setWhiteTheme(false);
            }

            this.sections.forEach((current) => {
                const sectionTop =
                    current.getBoundingClientRect().top +
                    scrollY -
                    this.extraMargin;
                const sectionHeight = current.offsetHeight;
                const sectionId = current.getAttribute('id');
                const navItem = document.querySelector(
                    '.Performance-navItem[data-section=' + sectionId + ']'
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

        setNavStyles() {
            this.$refs.nav.style.top = `${this.headerHeight}px`;
        },

        ...mapMutations({
            changeTheme: 'changeTheme',
            setWhiteTheme: 'setWhiteTheme'
        })
    }
};
</script>

<style lang="scss" scoped>
.Performances {
    $component: &;

    display: flex;

    &-content {
        width: 100%;

        @include desktop--large {
            width: (1440 * 100% / 1920);
        }

        @include desktop {
            width: (1080 * 100% / 1440);
        }

        @include desktop--small {
            width: (900 * 100% / 1200);
        }
    }

    .Performance {
        &-nav {
            position: sticky;
            padding: scaling(15) scaling(16);
            border-bottom: 1px solid $c-gray--header;
            background-color: $c-black--header;
            scrollbar-width: none;
            z-index: 10;
            white-space: nowrap;
            transition: border-bottom-color $d-hover ease-in-out,
                background-color $d-hover ease-in-out;

            @include desktop--large {
                padding: scaling(19) scaling(32);
            }

            @include desktop {
                padding: scaling(13) scaling(24);
            }

            @include desktop--small {
                padding: scaling(11) scaling(20);
            }

            @include mobile {
                overflow-y: scroll;
            }

            &::-webkit-scrollbar {
                display: none;
            }

            &.isWhite {
                border-bottom-color: $c-black;
                background-color: $c-white;

                .Performance-navItem {
                    @include hover {
                        &:hover {
                            color: $c-black;
                        }
                    }

                    &.isActive {
                        color: $c-black;
                    }
                }
            }

            &Item {
                display: inline-block;
                cursor: pointer;
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

                &:not(:last-child) {
                    margin-right: scaling(16);

                    @include desktop--large {
                        margin-right: scaling(28);
                    }

                    @include desktop {
                        margin-right: scaling(20);
                    }

                    @include desktop--small {
                        margin-right: scaling(20);
                    }
                }

                @include hover {
                    &:hover {
                        color: $c-white;
                    }
                }

                &.isActive {
                    color: $c-white;
                }
            }
        }

        &-title {
            padding: scaling(28) 0;
            border-top: 1px solid $c-gray--header;
            border-bottom: 1px solid $c-gray--header;
            color: $c-white;
            font-size: scaling(14);
            line-height: $lh-120;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            text-align: center;
            font-weight: $fw-bold;
            font-feature-settings: 'ss02' on;

            @include desktop--large {
                padding: scaling(52) 0;
                font-size: scaling(20);
            }

            @include desktop {
                padding: scaling(37) 0;
                font-size: scaling(18);
            }

            @include desktop--small {
                padding: scaling(32) 0;
            }

            @include mobile {
                padding: scaling(23) scaling(70);
            }
        }
    }
}
</style>
