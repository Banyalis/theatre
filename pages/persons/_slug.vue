<template>
    <div class="Person">
        <PersonHero ref="hero" :hero="content.hero" />
        <div
            v-if="content.performances.length"
            class="Person-button"
            @click="scrollToAnchor(`#performances`)"
            v-text="`Ближайшие спектакли`"
        ></div>
        <div
            v-if="content.nav.length || content.performances.length"
            ref="nav"
            class="Person-nav"
            :style="{ top: `${headerHeight}px` }"
        >
            <div
                v-if="content.nav.length"
                class="Person-navList"
                :class="{ isShowMember: showMember }"
            >
                <!-- eslint-disable -->
                <div
                    v-for="(item, index) in content.nav"
                    :key="index"
                    v-if="item.show"
                    :data-section="item.anchor"
                    class="Person-navListItem"
                    @click="scrollToAnchor(`#${item.anchor}`)"
                    v-text="item.title"
                ></div>
                <!-- eslint-enable -->
            </div>
            <div class="Person-navMember" :class="{ isShow: showMember }">
                <div v-if="content.hero.image" class="Person-navMemberImage">
                    <img :src="content.hero.image" alt="" />
                </div>
                <div
                    class="Person-navMemberName"
                    v-text="content.hero.name"
                ></div>
            </div>
            <RoundedButton
                v-if="content.performances.length"
                title="Ближайшие спектакли"
                type="isBlackGold"
                class="Person-navButton"
                @click="scrollToAnchor(`#performances`)"
            />
        </div>
        <div class="Person-inner">
            <div class="Person-content" :class="{ isSticky }">
                <div ref="contentInner" class="Person-contentInner">
                    <div ref="biography" class="Person-biography">
                        <PersonAbout
                            v-if="
                                content.about.contentMain ||
                                content.about.contentAddiontal
                            "
                            id="about"
                            ref="about"
                            :class="{ isWhite: !content.gallery.length }"
                            :about="content.about"
                        />
                        <PersonGallery
                            v-if="content.gallery.length"
                            id="gallery"
                            :gallery="content.gallery"
                        />
                    </div>
                    <PersonAwards
                        v-if="content.awards.length"
                        id="awards"
                        :awards="content.awards"
                    />
                    <!-- <PersonNews
                        v-if="content.news.length"
                        id="news"
                        :news="content.news"
                    /> -->
                </div>
            </div>
            <div
                ref="sidebar"
                class="Person-sidebar"
                :class="{ isBlack: content.dates.length, isSticky: !isSticky }"
            >
                <div ref="sidebarInner" class="Person-sidebarInner">
                    <PersonRepertoire
                        v-if="content.repertoire.length"
                        :repertoire="content.repertoire"
                    />
                    <PersonAlso
                        v-if="content.also.length"
                        :also="content.also"
                    />
                    <PersonDiscography
                        v-if="content.discography.title"
                        :discography="content.discography"
                    />
                    <PersonTour v-if="content.tour" :tour="content.tour" />
                    <PersonDates
                        v-if="content.dates.length"
                        :dates="content.dates"
                    />
                </div>
            </div>
        </div>
        <PersonPerformances
            v-if="content.performances.length"
            id="performances"
            :performances="content.performances"
        />
        <!-- <CommonSliderCards
            :title="content.members.title"
            :list="content.members.list"
            :breakpoints="breakpoints"
            component-item="CommonPeopleCard"
        /> -->
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import VueScrollTo from 'vue-scrollto';
import { isDesktopSmall } from '@/utils/utils';
import { HEADER_THEMES } from '../../utils/constants';
import RoundedButton from '@/components/other/RoundedButton';
import PersonHero from '~/components/person/PersonHero';
import PersonAbout from '~/components/person/PersonAbout';
import PersonGallery from '~/components/person/PersonGallery';
import PersonAwards from '~/components/person/PersonAwards';
// import PersonNews from '~/components/person/PersonNews';
import PersonRepertoire from '~/components/person/PersonRepertoire';
import PersonAlso from '~/components/person/PersonAlso';
import PersonDiscography from '~/components/person/PersonDiscography';
import PersonTour from '~/components/person/PersonTour';
import PersonDates from '~/components/person/PersonDates';
import PersonPerformances from '~/components/person/PersonPerformances';
// import CommonSliderCards from '~/components/common/CommonSliderCards';

export default {
    components: {
        RoundedButton,
        PersonHero,
        PersonAbout,
        PersonGallery,
        PersonAwards,
        // PersonNews,
        PersonRepertoire,
        PersonAlso,
        PersonDiscography,
        PersonTour,
        PersonDates,
        PersonPerformances
        // CommonSliderCards
    },

    data() {
        return {
            showMember: false,
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    slidesPerColumn: 2
                },
                768: {
                    slidesPerView: 3,
                    slidesPerColumn: 1
                },
                960: {
                    slidesPerView: 4,
                    slidesPerColumn: 1
                },
                1200: {
                    slidesPerView: 5,
                    slidesPerColumn: 1
                },
                1440: {
                    slidesPerView: 6,
                    slidesPerColumn: 1
                }
            },
            isSticky: false
        };
    },

    async fetch({ $config: { baseURL }, $axios, params, store }) {
        const resData = await $axios.get(
            `${baseURL}/cms/api/pagemembers/person/${params.slug}`
        );

        if (resData) store.commit('persons/setContent', resData.data);
    },

    head() {
        return {
            title: 'Большой театр • ' + this.content.hero.name
        };
    },

    computed: {
        ...mapState(['headerHeight']),
        ...mapState('persons', ['content'])
    },

    mounted() {
        this.sections = document.querySelectorAll('.Person-content div[id]');
        this.isSticky =
            this.$refs.contentInner.offsetHeight <
            this.$refs.sidebarInner.offsetHeight;

        this.setTheme();
        window.addEventListener('resize', this.onResize);
        this.$nextTick(this.onResize);
        window.addEventListener('scroll', this.onScroll);

        this.content.nav.forEach((navItem) => {
            this.sections.forEach((sectionsItem) => {
                if (navItem.anchor === sectionsItem.getAttribute('id')) {
                    navItem.show = true;
                }
            });
        });
    },

    deactivated() {
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('scroll', this.onScroll);

        this.$destroy();
    },

    updated() {
        this.setTheme();
    },

    methods: {
        setTheme() {
            this.changeTheme({
                headerMod: HEADER_THEMES.gold,
                isFooterDark: false
            });
        },

        onResize() {
            const stickyElement = this.$el.querySelector('.isSticky');
            const navHeight = this.$refs.nav ? this.$refs.nav.offsetHeight : 0;
            const biographyHeight = this.$refs.biography.offsetHeight;
            this.getIndent = this.headerHeight + navHeight - 1;
            this.heroHeight = this.$refs.hero.$el.offsetHeight;

            if (isDesktopSmall()) {
                stickyElement.style.top = `${this.getIndent}px`;
                stickyElement.style.height = `${
                    window.innerHeight - this.getIndent
                }px`;
                this.$refs.biography.removeAttribute('style');
            } else {
                stickyElement.removeAttribute('style');
                this.$refs.sidebar.style.top = `${biographyHeight}px`;
                this.$refs.biography.style.marginBottom = `${this.$refs.sidebar.offsetHeight}px`;
            }
        },

        onScroll() {
            const scrollY = window.pageYOffset;

            this.showMember = scrollY >= this.heroHeight;

            if (this.$refs.nav)
                this.sections.forEach((current) => {
                    const sectionTop =
                        current.getBoundingClientRect().top +
                        scrollY -
                        this.getIndent;
                    const sectionHeight = current.offsetHeight;
                    const sectionId = current.getAttribute('id');
                    const navItem = document.querySelector(
                        '.Person-navListItem[data-section=' + sectionId + ']'
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
                offset: -this.getIndent + 1
            };

            VueScrollTo.scrollTo(anchor, 800, options);
        },

        ...mapMutations({
            changeTheme: 'changeTheme'
        })
    }
};
</script>

<style lang="scss" scoped>
.Person {
    $component: &;

    &-button {
        display: none;
        padding: scaling(13) 0 scaling(15);
        background-color: $c-gold--lighten;
        cursor: pointer;
        color: #2a2a2a;
        font-size: scaling(14);
        line-height: $lh-140;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        text-align: center;
        font-weight: $fw-bold;

        @include mobile {
            display: block;
        }
    }

    &-nav {
        position: sticky;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: scaling(8) scaling(16);
        border-bottom: 1px solid $c-black;
        background-color: $c-gold--lighten;
        scrollbar-width: none;
        z-index: 10;
        white-space: nowrap;

        @include desktop--large {
            padding: scaling(16) scaling(28);
        }

        @include desktop {
            padding: scaling(10) scaling(24);
        }

        @include desktop--small {
            padding: scaling(8) scaling(20);
        }

        @include mobile {
            display: block;
            padding: scaling(15) scaling(16);
            overflow-y: scroll;
            border-color: $c-gray--header;
            background-color: $c-black;
        }

        &::-webkit-scrollbar {
            display: none;
        }

        &List {
            white-space: nowrap;

            @include mobile {
                display: inline-block;
                transition: margin-left $d-hover ease-in-out;

                &.isShowMember {
                    margin-left: scaling(52);
                }
            }

            &Item {
                display: inline-block;
                cursor: pointer;
                color: $c-black--header;
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
                    color: rgba(#e5e5e5, 0.5);
                }

                &:not(:last-child) {
                    margin-right: scaling(16);

                    @include desktop--large {
                        margin-right: scaling(24);
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

        &Member {
            position: absolute;
            left: 50%;
            display: flex;
            align-items: center;
            opacity: 0;
            transform: translateX(-50%);
            transition: opacity $d-hover ease-in-out;

            @include mobile {
                top: 50%;
                left: scaling(16);
                transform: translate(0, scaling(-18));
            }

            &.isShow {
                opacity: 1;

                @include mobile {
                    transition-delay: 0.2s;
                }
            }

            &Image {
                width: scaling(29);
                height: scaling(29);
                border-radius: 50%;
                overflow: hidden;

                @include desktop--large {
                    width: scaling(44);
                    height: scaling(44);
                    margin-right: scaling(20);
                }

                @include desktop {
                    width: scaling(36);
                    height: scaling(36);
                    margin-right: scaling(16);
                }

                @include desktop--small {
                    margin-right: scaling(12);
                }

                @include mobile {
                    width: scaling(36);
                    height: scaling(36);
                }

                img {
                    @include m-objectFit;

                    width: 100%;
                    height: 100%;
                }
            }

            &Name {
                font-size: scaling(14);
                line-height: $lh-160;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                font-weight: $fw-medium;
                font-family: $family-graphic;

                @include desktop--large {
                    font-size: scaling(20);
                }

                @include desktop {
                    font-size: scaling(18);
                    line-height: $lh-140;
                }

                @include laptop {
                    display: none;
                }

                @include tablet {
                    display: none;
                }

                @include mobile {
                    display: none;
                }
            }
        }

        &Button {
            @include mobile {
                display: none !important;
            }
        }
    }

    &-inner {
        display: grid;
        grid-template-columns: 100%;
        position: relative;

        @include desktop--large {
            grid-template-columns: (1152 * 100% / 1920) (768 * 100% / 1920);
        }

        @include desktop {
            grid-template-columns: (864 * 100% / 1440) (576 * 100% / 1440);
        }

        @include desktop--small {
            grid-template-columns: (720 * 100% / 1200) (480 * 100% / 1200);
        }
    }

    &-content {
        margin-top: -1px;

        @include desktop--large {
            border-right: 1px solid $c-black;
            border-bottom: 1px solid $c-black;
        }

        @include desktop {
            border-right: 1px solid $c-black;
            border-bottom: 1px solid $c-black;
        }

        @include desktop--small {
            border-right: 1px solid $c-black;
            border-bottom: 1px solid $c-black;
        }
    }

    &-sidebar {
        top: 0;
        left: 0;
        right: 0;
        margin-top: -1px;

        @include laptop {
            position: absolute !important;
            margin-top: 0;
        }

        @include tablet {
            position: absolute !important;
            margin-top: 0;
        }

        @include mobile {
            position: absolute !important;
            margin-top: 0;
        }

        &.isBlack {
            background-color: $c-black--header;
        }
    }

    .isSticky {
        @include desktop--large {
            position: sticky;
            overflow-y: auto;
            scrollbar-width: none;

            &::-webkit-scrollbar {
                display: none;
            }
        }

        @include desktop {
            position: sticky;
            overflow-y: auto;
            scrollbar-width: none;

            &::-webkit-scrollbar {
                display: none;
            }
        }

        @include desktop--small {
            position: sticky;
            overflow-y: auto;
            scrollbar-width: none;

            &::-webkit-scrollbar {
                display: none;
            }
        }
    }
}
</style>
