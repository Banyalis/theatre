<template>
    <div
        class="Header"
        :class="[
            `Header--${mod}`,
            { 'Header--white': isWhite, isCollapsed, isOpenPopupMenu }
        ]"
    >
        <NuxtLink
            v-if="$route.path !== '/'"
            :to="localePath('/')"
            class="Header-logo"
        >
            <div class="Header-logoIcon">
                <svg-icon name="icon-logo" />
            </div>
        </NuxtLink>
        <div v-else class="Header-logo">
            <div class="Header-logoIcon">
                <svg-icon name="icon-logo" />
            </div>
        </div>
        <div class="Header-menu">
            <NuxtLink
                v-for="(item, index) in nav"
                :key="index"
                :to="localePath(item.url)"
                class="Header-menuItem"
                v-text="item.text"
            ></NuxtLink>
            <div
                v-if="!!getFirstVisitUrl"
                class="Header-menuItem"
                :class="{ isActive: isActiveVisit }"
                @click="redirectToVisit"
                v-text="$t('Common.header.menu.visit')"
            ></div>
        </div>
        <!-- <nuxt-link
            class="Header-language"
            :data-locale="alternateLocaleCode"
            :to="switchLocalePath(alternateLocaleCode)"
            @click.native="nuxtRefresh(alternateLocaleCode)"
            v-text="$t('Common.lang')"
        ></nuxt-link> -->
        <a
            href="http://2011.bolshoi.ru/en"
            class="Header-language"
            v-text="$t('Common.lang')"
        ></a>
        <!-- <div class="Header-icon">
            <div class="Header-iconInner">
                <svg-icon name="header-main" />
            </div>
        </div> -->
        <div
            class="Header-burger"
            :class="{ isActive: isActiveBurger }"
            @click="openPopupMenu"
            v-text="$t('Common.header.menu.menu')"
        ></div>
        <HeaderPopup
            :first-visit-url="getFirstVisitUrl"
            :is-active-visit="isActiveVisit"
            @toggle-burger="toggleBurgerClass"
        />
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import HeaderPopup from '@/components/other/HeaderPopup';
import { HEADER_THEMES, NAMES_BREAKPOINTS } from '~/utils/constants';
import { getCurrentMediaSize } from '~/utils/utils';

export default {
    name: 'Header',

    components: {
        HeaderPopup
    },

    props: {
        mod: {
            type: String,
            required: true
        },
        isWhite: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            headerHeight: 0,
            isActiveVisit: false,
            isCollapsed: false,
            isSmallScreen: false,
            isActiveBurger: false,
            nav: [
                {
                    url: '/season',
                    text: this.$t('Common.header.menu.seasons')
                },
                {
                    url: '/timetable',
                    text: this.$t('Common.header.menu.timetable')
                },
                {
                    url: '/people',
                    text: this.$t('Common.header.menu.people')
                }
            ]
        };
    },

    computed: {
        getFirstVisitUrl() {
            return this.categories[0]?.items[0]?.slug;
        },

        ...mapState(['isOpenPopupMenu']),
        ...mapState('visit', ['categories']),
        ...mapGetters(['alternateLocaleCode'])
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.$nextTick(this.onResize);
        window.addEventListener('scroll', this.onScroll);
    },

    updated() {
        this.$nextTick(this.onResize);
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('scroll', this.onScroll);
    },

    beforeUpdate() {
        this.isActiveVisit = this.$route.name.slice(0, 10) === 'visit-slug';
        this.$emit('check-visit-page', this.isActiveVisit);
    },

    methods: {
        nuxtRefresh(lang) {
            // Data is not updated when the language is changed for the first time
            // Updating data from API by language
            // but only once!
            window.updatedLangs = window.updatedLangs || {};
            if (!window.updatedLangs[lang]) {
                this.$nuxt.refresh();
                window.updatedLangs[lang] = true;
            }
        },

        toggleBurgerClass(value) {
            this.isActiveBurger = value;
        },

        openPopupMenu() {
            this.togglePopupMenu(true);
            this.blockScroll();
        },

        redirectToVisit() {
            this.$router.push(
                this.localePath(`/visit/${this.getFirstVisitUrl}`)
            );
        },

        onResize() {
            this.headerHeight = this.$el.clientHeight;

            this.updateHeaderHeight(this.$el.offsetHeight);

            if (this.mod !== HEADER_THEMES.home) {
                if (this.isCollapsed) this.isCollapsed = false;
                if (this.isSmallScreen) this.isSmallScreen = false;

                return;
            }

            this.isSmallScreen = [
                NAMES_BREAKPOINTS.laptop,
                NAMES_BREAKPOINTS.tablet,
                NAMES_BREAKPOINTS.mobile
            ].includes(getCurrentMediaSize());

            this.homeLogoHeight =
                document.querySelector('.Hero-logo')?.clientHeight;

            this.onScroll();
        },

        onScroll() {
            if (this.mod !== HEADER_THEMES.home || this.isSmallScreen) {
                if (this.isCollapsed) this.isCollapsed = false;
                if (this.isSmallScreen) this.isSmallScreen = false;

                return;
            }

            const scrollTop = window.pageYOffset;

            this.isCollapsed =
                scrollTop + this.headerHeight <= this.homeLogoHeight;
        },

        ...mapMutations([
            'updateHeaderHeight',
            'togglePopupMenu',
            'blockScroll'
        ])
    }
};
</script>

<style lang="scss" scoped>
.Header {
    $component: &;

    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: stretch;
    border-bottom: 1px solid $c-black;
    background-color: $c-red;
    z-index: $z-header;
    transition: border-bottom-color $d-hover ease-in-out,
        background-color $d-hover ease-in-out;

    &--dark {
        border-bottom-color: $c-gray--header;
        background-color: $c-black--header;
    }

    &--gold {
        background-color: $c-gold--lighten;
    }

    &--white {
        border-bottom-color: $c-black;
        background-color: $c-white;
    }

    &--home {
        border-bottom-color: $c-black;
        background-color: $c-white;
    }

    &.isCollapsed {
        z-index: ($z-header - 2);

        &.isOpenPopupMenu {
            z-index: $z-header;
        }
    }

    &-logo {
        display: flex;
        justify-content: center;
        width: 480 * 100% / 1920;
        padding: scaling(18) scaling(109) scaling(21);
        border-right: 1px solid $c-black;
        transition: border-right-color $d-hover ease-in-out;

        @include desktop {
            padding: scaling(14) scaling(84) scaling(17);
        }

        @include desktop--small {
            padding: scaling(13) scaling(72) scaling(15);
        }

        @include laptop {
            flex: 1;
            order: 2;
            padding: scaling(15) 0;
        }

        @include tablet {
            flex: 1;
            width: auto;
            order: 2;
            padding: scaling(15) 0 scaling(17);
        }

        @include mobile {
            flex: 1;
            width: auto;
            order: 2;
            padding: scaling(10) 0 scaling(11);
        }

        @include hover {
            &:is(a):hover svg {
                fill: $c-white;
            }
        }

        #{$component}--dark & {
            border-right-color: $c-gray--header;

            @include hover {
                &:is(a):hover svg {
                    fill: $c-gray;
                }
            }
        }

        #{$component}--white & {
            border-right-color: $c-black;

            @include hover {
                &:is(a):hover svg {
                    fill: $c-red;
                }
            }
        }

        #{$component}--home & {
            border-right-color: $c-black;

            @include hover {
                &:is(a):hover svg {
                    fill: $c-red;
                }
            }
        }

        #{$component}.isCollapsed & {
            display: none;
        }

        &Icon {
            width: scaling(56);
            height: scaling(32);

            @include desktop--large {
                width: scaling(102);
                height: scaling(57);
            }

            @include desktop {
                width: scaling(72);
                height: scaling(41);
            }

            @include laptop {
                width: scaling(60);
                height: scaling(34);
            }

            @include mobile {
                width: scaling(48);
                height: scaling(27);
            }

            svg {
                width: 100%;
                height: 100%;
                fill: $c-black;
                transition: fill $d-hover ease-in-out;

                #{$component}--dark & {
                    fill: $c-white;
                }

                #{$component}--white & {
                    fill: $c-black;
                }

                #{$component}--home & {
                    fill: $c-black;
                }
            }
        }
    }

    &-menu {
        display: none;
        align-items: center;
        flex: 1;
        border-right: 1px solid $c-black;
        transition: border-right-color $d-hover ease-in-out;

        @include desktop--large {
            display: flex;
            padding: scaling(18) scaling(32) scaling(21);
        }

        @include desktop {
            display: flex;
            padding: scaling(14) scaling(24) scaling(17);
        }

        @include desktop--small {
            display: flex;
            padding: scaling(13) scaling(20) scaling(15);
        }

        #{$component}--dark & {
            border-right-color: $c-gray--header;
        }

        #{$component}--white & {
            border-right-color: $c-black;
        }

        #{$component}--home & {
            border-right-color: $c-black;
        }

        #{$component}.isCollapsed & {
            margin-left: (480 * 100% / 1920);
        }

        &Item {
            @include text--button;

            cursor: pointer;
            color: $c-black;
            transition: color $d-hover ease-in-out;
            height: scaling(32);
            display: flex;
            align-items: center;

            @include desktop--large {
                height: scaling(57);
            }

            @include desktop {
                height: scaling(41);
            }

            @include laptop {
                height: scaling(34);
            }

            @include mobile {
                height: scaling(27);
            }

            &:not(:last-child) {
                margin-right: scaling(28);

                @include desktop {
                    margin-right: scaling(20);
                }

                @include desktop--small {
                    margin-right: scaling(16);
                }
            }

            @include hover {
                &:hover {
                    color: $c-white !important;
                }
            }

            &.nuxt-link-active,
            &.isActive {
                pointer-events: none;
                color: $c-white !important;
            }

            #{$component}--dark & {
                color: $c-gray;
            }

            #{$component}--white & {
                @include hover {
                    &:hover {
                        color: $c-red !important;
                    }
                }
            }

            #{$component}--home & {
                @include hover {
                    &:hover {
                        color: $c-red !important;
                    }
                }
            }
        }
    }

    &-icon {
        flex: 1;
        display: none;
        align-items: center;
        justify-content: center;
        border-right: 1px solid $c-black;

        @include laptop {
            display: flex;
        }

        @include tablet {
            display: flex;
        }

        @include mobile {
            display: flex;
        }

        #{$component}.Header--dark & {
            border-right-color: $c-gray--header;
        }

        &Inner {
            width: scaling(90);
            height: scaling(45);

            @include mobile {
                width: scaling(60);
                height: scaling(30);
            }

            svg {
                width: 100%;
                height: 100%;
                fill: $c-black;

                #{$component}.Header--dark & {
                    fill: $c-white;
                }
            }
        }
    }

    &-language,
    &-burger {
        @include text--button;

        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: $c-black;

        @include laptop {
            width: (192 * 100% / 960);
        }

        @include tablet {
            width: (144 * 100% / 768);
        }

        @include mobile {
            width: (80 * 100% / 320);
        }

        @include hover {
            &:hover {
                color: $c-white;
            }
        }

        #{$component}--dark & {
            color: $c-white;

            @include hover {
                &:hover {
                    color: $c-gray;
                }
            }
        }

        #{$component}--white & {
            color: $c-black;

            @include hover {
                &:hover {
                    color: $c-red;
                }
            }
        }

        #{$component}--home & {
            color: $c-black;

            @include hover {
                &:hover {
                    color: $c-red;
                }
            }
        }
    }

    &-language {
        order: 1;
        border-right: 1px solid $c-black;
        transition: border-right-color $d-hover ease-in-out,
            color $d-hover ease-in-out;

        @include desktop--large {
            order: inherit;
            width: (96 * 100% / 1920);
        }

        @include desktop {
            order: inherit;
            width: (72 * 100% / 1440);
        }

        @include desktop--small {
            order: inherit;
            width: (60 * 100% / 1200);
        }

        #{$component}--dark & {
            border-right-color: $c-gray--header;
        }

        #{$component}--white & {
            border-right-color: $c-black;
        }

        #{$component}--home & {
            border-right-color: $c-black;
        }
    }

    &-burger {
        order: 3;
        transition: color $d-hover ease-in-out;

        @include desktop--large {
            order: inherit;
            width: (144 * 100% / 1920);
        }

        @include desktop {
            order: inherit;
            width: (144 * 100% / 1440);
        }

        @include desktop--small {
            order: inherit;
            width: (120 * 100% / 1200);
        }

        &.isActive {
            color: $c-white;

            @include hover {
                &:hover {
                    color: $c-black;
                }
            }

            #{$component}.Header--dark & {
                color: $c-red;

                @include hover {
                    &:hover {
                        color: $c-white;
                    }
                }
            }
        }
    }
}
</style>
