<template>
    <div class="HeaderPopup" :class="{ isOpen: isOpenPopupMenu }">
        <div class="HeaderPopup-panel">
            <NuxtLink
                v-if="$route.path !== '/'"
                :to="localePath('/')"
                class="HeaderPopup-panelLogo"
            >
                <div class="HeaderPopup-panelLogoIcon">
                    <svg-icon name="icon-logo" />
                </div>
            </NuxtLink>
            <div v-else class="HeaderPopup-panelLogo">
                <div class="HeaderPopup-panelLogoIcon">
                    <svg-icon name="icon-logo" />
                </div>
            </div>
            <!-- <NuxtLink
                class="HeaderPopup-panelLanguage"
                :data-locale="alternateLocaleCode"
                :to="switchLocalePath(alternateLocaleCode)"
                @click.native="nuxtRefresh(alternateLocaleCode)"
                v-text="$t('Common.lang')"
            ></NuxtLink> -->
            <a
                href="http://2011.bolshoi.ru/en"
                class="HeaderPopup-panelLanguage"
                v-text="$t('Common.lang')"
            ></a>
            <div class="HeaderPopup-panelClose" @click="closePopupMenu">
                Закрыть
                <div class="HeaderPopup-panelCloseIcon">
                    <svg-icon name="icon-cross" />
                </div>
            </div>
        </div>
        <div class="HeaderPopup-nav">
            <a
                href="https://2011.bolshoi.ru/"
                target="_blank"
                class="HeaderPopup-oldSite"
            >
                Прошлая версия сайта
            </a>
            <NuxtLink
                v-for="(item, index) in nav"
                :key="index"
                :to="localePath(item.url)"
                class="HeaderPopup-navItem"
                v-text="item.text"
            ></NuxtLink>
            <div
                v-if="!!firstVisitUrl"
                class="HeaderPopup-navItem"
                :class="{ isActive: isActiveVisit }"
                @click="redirectToVisit"
                v-text="`Визит в театр`"
            ></div>
        </div>
        <a
            href="https://www.audemarspiguet.com/com/ru/home.html"
            target="_blank"
            class="HeaderPopup-ad"
        >
            <div class="HeaderPopup-adImage">
                <img
                    :src="require('~/assets/images/ad.png')"
                    :srcset="
                        require('~/assets/images/ad.png') +
                        ' 1x, ' +
                        require('~/assets/images/ad@2x.png') +
                        ' 2x'
                    "
                />
            </div>
        </a>
        <a
            href="https://ticket.bolshoi.ru/shows"
            target="_blank"
            class="HeaderPopup-cabinet"
            v-text="`Личный кабинет`"
        ></a>
        <div
            v-for="(item, index) in menu"
            :key="index"
            class="HeaderPopup-menuItem"
        >
            <NuxtLink
                v-if="!item.external"
                ref="menuItem"
                :to="localePath(item.url)"
                class="HeaderPopup-menuItemInner"
                v-text="item.text"
            ></NuxtLink>
            <a
                v-else
                :href="item.url"
                target="_blank"
                class="HeaderPopup-menuItemInner"
                v-text="item.text"
            ></a>
        </div>
        <div class="HeaderPopup-contacts">
            <div
                v-for="(item, index) in contacts"
                :key="index"
                class="HeaderPopup-contactsItem"
            >
                <div
                    class="HeaderPopup-contactsItemTitle"
                    v-text="item.title + ':'"
                ></div>
                <div
                    v-if="item.text"
                    class="HeaderPopup-contactsItemText"
                    v-text="item.text"
                ></div>
                <a
                    v-if="item.phone"
                    :href="`tel: ${item.phone}`"
                    class="HeaderPopup-contactsItemPhone"
                    v-text="item.phone"
                ></a>
                <a
                    v-if="item.email"
                    :href="`mailto: ${item.email}`"
                    class="HeaderPopup-contactsItemEmail"
                    v-text="item.email"
                ></a>
            </div>
        </div>
        <div class="HeaderPopup-social">
            <template v-for="(item, index) in social">
                <NuxtLink
                    v-if="!item.external"
                    :key="index"
                    :to="localePath(item.url)"
                    class="HeaderPopup-socialItem"
                    v-text="item.text"
                ></NuxtLink>
                <a
                    v-else
                    :key="index"
                    :href="item.url"
                    target="_blank"
                    class="HeaderPopup-socialItem"
                    v-text="item.text"
                ></a>
            </template>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
    name: 'HeaderPopup',

    props: {
        firstVisitUrl: {
            type: String,
            default: ''
        },
        isActiveVisit: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            nav: [
                {
                    url: '/season/premieres',
                    text: 'Сезон 2021—2022'
                },
                {
                    url: '/timetable',
                    text: 'Афиша и билеты'
                },
                {
                    url: '/people',
                    text: 'Люди театра'
                }
            ],
            menu: [
                {
                    url: '/about',
                    text: 'О театре'
                },
                {
                    url: '/news',
                    text: 'Новости'
                },
                {
                    url: '/museum',
                    text: 'Музей'
                },
                {
                    url: '/partners',
                    text: 'Партнеры'
                },
                {
                    external: true,
                    url: 'https://shop.bolshoi.ru/',
                    text: 'Магазин'
                }
            ],
            contacts: [
                {
                    title: 'Адрес',
                    text: 'Театральная площадь, 1'
                },
                {
                    title: 'Пресс-служба',
                    email: 'pr@bolshoi.ru'
                },
                {
                    title: 'Кассы',
                    phone: '+7 495 455-55-55',
                    email: 'sales@bolshoi.ru'
                }
            ],
            social: [
                {
                    url: '/about/contacts',
                    text: 'Все контакты'
                },
                {
                    external: true,
                    url: 'https://www.youtube.com/user/bolshoi',
                    text: 'YouTube'
                },
                {
                    external: true,
                    url: 'https://vk.com/bolshoitheatre',
                    text: 'ВКонтакте'
                },
                {
                    external: true,
                    url: 'https://www.facebook.com/bolshoitheatre',
                    text: 'Facebook'
                },
                {
                    external: true,
                    url: 'https://twitter.com/BolshoiOfficial',
                    text: 'Twitter'
                },
                {
                    external: true,
                    url: 'https://www.instagram.com/bolshoi_theatre/',
                    text: 'Instagram'
                }
            ]
        };
    },

    computed: {
        ...mapState(['isOpenPopupMenu']),
        ...mapGetters(['alternateLocaleCode'])
    },

    watch: {
        $route(to, from) {
            setTimeout(() => {
                this.togglePopupMenu(false);
                this.unblockScroll();
            }, 250);
        }
    },

    mounted() {
        this.checkActive();
    },

    updated() {
        this.checkActive();
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

        checkActive() {
            const getActive =
                this.$refs.menuItem.filter((item) =>
                    item.$el.classList.contains('nuxt-link-active')
                ).length >= 1;

            this.$emit('toggle-burger', getActive);
        },

        closePopupMenu() {
            this.togglePopupMenu(false);
            this.unblockScroll();
        },

        redirectToVisit() {
            this.$router.push(this.localePath(`/visit/${this.firstVisitUrl}`));
        },

        ...mapMutations(['togglePopupMenu', 'unblockScroll'])
    }
};
</script>

<style lang="scss" scoped>
.HeaderPopup {
    $component: &;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(12, 1fr);
    height: 100%;
    border-left: 1px solid $c-black;
    border-right: 1px solid $c-black;
    background-color: $c-white;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none;
    opacity: 0;
    visibility: hidden;
    transition: opacity $d-hover ease-in-out, visibility $d-hover ease-in-out;

    @include tablet {
        grid-template-columns: repeat(12, 1fr);
    }

    @include mobile {
        display: flex;
        flex-direction: column;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    &.isOpen {
        opacity: 1;
        visibility: visible;
    }

    &-panel {
        display: flex;
        justify-content: flex-end;
        grid-column: span 10;
        grid-row: span 1;
        height: scaling(66);
        border-top: 1px solid $c-black;
        border-bottom: 1px solid $c-black;
        position: relative;

        @include desktop--large {
            height: scaling(98);
        }

        @include desktop {
            height: scaling(74);
        }

        @include desktop--small {
            height: scaling(62);
        }

        @include tablet {
            order: 1;
            grid-column: span 12;
        }

        @include mobile {
            order: 1;
            flex-shrink: 0;
            height: scaling(49);
        }

        &Logo,
        &Language,
        &Close {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20%;
        }

        &Logo {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            border-right: 1px solid $c-black;

            @include laptop {
                order: 2;
                flex: 1;
                border-left: 1px solid $c-black;
                border-right: none;
                position: relative;
            }

            @include tablet {
                order: 2;
                flex: 1;
                border-left: 1px solid $c-black;
                border-right: none;
                position: relative;
            }

            @include mobile {
                order: 2;
                flex: 1;
                border-left: 1px solid $c-black;
                border-right: none;
                position: relative;
            }

            @include hover {
                &:is(a):hover svg {
                    fill: $c-gold;
                }
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
                    transition: fill $d-hover ease-in-out;
                }
            }
        }

        &Language,
        &Close {
            cursor: pointer;
            font-size: scaling(14);
            line-height: $lh-140;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-weight: $fw-bold;
            transition: color $d-hover ease-in-out;

            @include desktop--large {
                font-size: scaling(22);
                line-height: $lh-120;
                letter-spacing: 0.08em;
            }

            @include desktop {
                font-size: scaling(18);
                line-height: $lh-120;
            }

            @include laptop {
                width: scaling(192);
            }

            @include tablet {
                width: scaling(144);
            }

            @include mobile {
                width: scaling(80);
            }

            @include hover {
                &:hover {
                    color: $c-gold;
                }
            }
        }

        &Language {
            border-left: 1px solid $c-black;
            color: $c-black;

            @include laptop {
                order: 1;
                border-left: none;
            }

            @include tablet {
                order: 1;
                border-left: none;
            }

            @include mobile {
                order: 1;
                border-left: none;
            }
        }

        &Close {
            border-left: 1px solid $c-black;

            @include laptop {
                order: 3;
            }

            @include tablet {
                order: 3;
                font-size: 0;
            }

            @include mobile {
                order: 3;
                font-size: 0;
            }

            &Icon {
                display: none;
                width: scaling(16);
                height: scaling(16);

                @include tablet {
                    display: block;
                }

                @include mobile {
                    display: block;
                }

                svg {
                    width: 100%;
                    height: 100%;
                    fill: currentColor;
                }
            }
        }
    }

    &-nav {
        display: flex;
        flex-direction: column;
        grid-column: span 6;
        grid-row: span 7;

        @include tablet {
            order: 2;
            grid-column: span 8;
            grid-row: span 5;
        }

        @include mobile {
            order: 2;
            flex-shrink: 0;
            border-bottom: 1px solid $c-black;
        }

        &Item {
            display: flex;
            align-items: center;
            height: calc(100% / 4);
            padding: 0 scaling(16);
            cursor: pointer;
            color: $c-black;
            font-size: scaling(60);
            line-height: $lh-110;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            font-feature-settings: 'ss02' on;
            transition: color $d-hover ease-in-out;

            @include desktop--large {
                padding: 0 scaling(32);
            }

            @include desktop {
                padding: 0 scaling(24);
                font-size: scaling(48);
                letter-spacing: 0;
            }

            @include desktop--small {
                padding: 0 scaling(20);
                font-size: scaling(42);
                letter-spacing: 0;
            }

            @include laptop {
                font-size: scaling(36);
            }

            @include tablet {
                font-size: scaling(32);
            }

            @include mobile {
                justify-content: center;
                height: auto;
                padding: scaling(28) scaling(16);
                font-size: scaling(24);
                letter-spacing: 0.05em;
            }

            &:not(:last-child) {
                border-bottom: 1px solid $c-black;
            }

            &.nuxt-link-active,
            &.isActive {
                pointer-events: none;
                color: $c-gold;
            }

            @include hover {
                &:hover {
                    color: $c-gold !important;
                }
            }
        }
    }

    &-ad {
        display: flex;
        align-items: center;
        justify-content: center;
        grid-column: span 2;
        grid-row: span 7;
        border-left: 1px solid $c-black;

        @include desktop--large {
            padding: scaling(45) scaling(70);
        }

        @include desktop {
            padding: scaling(40) scaling(50);
        }

        @include desktop--small {
            padding: scaling(35) scaling(40);
        }

        @include laptop {
            padding: scaling(55) scaling(25);
        }

        @include tablet {
            order: 6;
            grid-column: span 4;
            grid-row: span 3;
            padding: scaling(20) scaling(45);
            border-top: 1px solid $c-black;
        }

        @include mobile {
            order: 9;
            flex-shrink: 0;
            padding: scaling(20) scaling(70);
            border-top: 1px solid $c-black;
            border-left: none;
        }

        &Image {
            width: 100%;
            height: 100%;

            img {
                @include m-objectFit(contain);

                width: 100%;
                height: 100%;
            }
        }
    }

    &-cabinet {
        display: flex;
        align-items: center;
        justify-content: center;
        grid-column: span 2;
        grid-row: span 7;
        padding: scaling(16);
        border-left: 1px solid $c-black;
        color: $c-black;
        font-size: scaling(20);
        line-height: $lh-120;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        text-align: center;
        font-feature-settings: 'ss02' on;
        transition: color $d-hover ease-in-out;

        @include desktop--large {
            font-size: scaling(36);
            line-height: $lh-110;
            letter-spacing: 0.04em;
        }

        @include desktop {
            font-size: scaling(28);
            line-height: $lh-110;
            letter-spacing: 0;
        }

        @include desktop--small {
            font-size: scaling(24);
            line-height: $lh-110;
            letter-spacing: 0;
        }

        @include tablet {
            order: 3;
            grid-column: span 4;
            grid-row: span 5;
        }

        @include mobile {
            order: 8;
            flex-shrink: 0;
            padding: scaling(16) 0 scaling(15);
            border-top: 1px solid $c-black;
            border-left: none;
            font-size: scaling(14);
            letter-spacing: 0.05em;
            font-weight: $fw-bold;
        }

        &.nuxt-link-active {
            pointer-events: none;
            color: $c-gold;
        }

        @include hover {
            &:hover {
                color: $c-gold !important;
            }
        }
    }

    &-oldSite {
        display: none;
        align-items: center;
        justify-content: center;
        grid-column: span 2;
        color: $c-black;
        line-height: $lh-120;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        font-feature-settings: 'ss02' on;
        transition: color $d-hover ease-in-out;
        border-bottom: 1px solid $c-black;
        background: $c-gold--lighten;

        @include mobile {
            display: flex;
            flex-shrink: 0;
            padding: scaling(16) 0 scaling(15);
            font-size: scaling(14);
            letter-spacing: 0.05em;
            font-weight: $fw-bold;
        }
    }

    &-menuItem {
        grid-column: span 2;
        grid-row: span 4;
        border-top: 1px solid $c-black;
        border-left: 1px solid $c-black;

        @include tablet {
            grid-column: span 4;
            grid-row: span 3;
        }

        @include mobile {
            flex-shrink: 0;
            border-top: none;
            border-left: none;
        }

        @for $i from 5 to 10 {
            &:nth-child(#{$i}) {
                @include tablet {
                    @if $i < 7 {
                        order: #{$i - 1};
                    } @else {
                        order: #{$i};
                    }
                }

                @include mobile {
                    order: #{$i - 2};
                }
            }
        }

        &:nth-child(5) {
            border-left: none;

            @include mobile {
                margin-top: scaling(24);
            }
        }

        &:nth-child(7) {
            @include tablet {
                border-left: none;
            }
        }

        &:nth-child(9) {
            @include mobile {
                margin-bottom: scaling(24);
            }
        }

        &:not(:nth-child(5)) {
            @include mobile {
                margin-top: scaling(16);
            }
        }

        &Inner {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: $c-black;
            font-size: scaling(20);
            line-height: $lh-120;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            font-feature-settings: 'ss02' on;
            transition: color $d-hover ease-in-out;

            @include desktop--large {
                font-size: scaling(36);
                line-height: $lh-110;
                letter-spacing: 0.04em;
            }

            @include desktop {
                font-size: scaling(28);
                line-height: $lh-110;
                letter-spacing: 0;
            }

            @include desktop--small {
                font-size: scaling(24);
                line-height: $lh-110;
                letter-spacing: 0;
            }

            @include mobile {
                font-size: scaling(14);
                letter-spacing: 0.05em;
            }

            &.nuxt-link-active {
                pointer-events: none;
                color: $c-gold;
            }

            @include hover {
                &:hover {
                    color: $c-gold !important;
                }
            }
        }
    }

    &-contacts {
        display: none;

        @include mobile {
            order: 10;
            flex-shrink: 0;
            display: block;
        }

        &Item {
            display: flex;
            flex-direction: column;
            padding: scaling(24) scaling(40) scaling(32);
            border-top: 1px solid $c-black;
            text-align: center;

            &Title {
                margin-bottom: scaling(12);
                color: $c-gray;
                font-size: scaling(12);
                line-height: $lh-110;
                font-family: $family-graphic;
            }

            &Text,
            &Email,
            &Phone {
                font-size: scaling(20);
                line-height: $lh-120;
                letter-spacing: 0.02em;
                text-transform: uppercase;
            }

            &Email,
            &Phone {
                color: $c-black;
                transition: color $d-hover ease-in-out;

                @include hover {
                    &:hover {
                        color: $c-red !important;
                    }
                }
            }

            &Phone {
                margin-bottom: scaling(12);
            }
        }
    }

    &-social {
        display: none;
        flex-wrap: wrap;
        margin-right: -1px;
        border-bottom: 1px solid $c-black;

        @include mobile {
            order: 11;
            display: flex;
            flex-shrink: 0;
        }

        &Item {
            width: 50%;
            padding: scaling(16) 0 scaling(15);
            border-top: 1px solid $c-black;
            border-right: 1px solid $c-black;
            color: $c-black;
            font-size: scaling(14);
            line-height: $lh-120;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            text-align: center;
            transition: color $d-hover ease-in-out;

            &:first-child,
            &:last-child {
                width: 100%;
            }

            @include hover {
                &:hover {
                    color: $c-red !important;
                }
            }
        }
    }
}
</style>
