<template>
    <div class="Footer" :class="{ isDark }">
        <div class="Footer-wrapper">
            <div class="Footer-logo">
                <div class="Footer-logoIcon">
                    <svg-icon name="icon-logo-footer" />
                </div>
            </div>
            <div class="Footer-menu">
                <div class="Footer-menuSidebar Footer-menuSidebar--left">
                    <div class="Footer-menuSidebarLinks">
                        <NuxtLink
                            v-for="(link, index) in menu.left"
                            :key="index"
                            :to="link.url"
                            class="Footer-menuSidebarLink"
                            v-text="link.title"
                        ></NuxtLink>
                        <div
                            v-if="!!getFirstVisitUrl"
                            class="Footer-menuSidebarLink"
                            :class="{ isActive: isActiveVisit }"
                            @click="redirectToVisit"
                            v-text="$t('Common.header.menu.visit')"
                        ></div>
                        <template v-for="(link, index) in menu.right">
                            <NuxtLink
                                v-if="!link.external"
                                :key="`right_${index}`"
                                :to="link.url"
                                class="
                                    Footer-menuSidebarLink
                                    Footer-menuSidebarLink--mobile
                                "
                                v-text="link.title"
                            ></NuxtLink>
                            <a
                                v-else
                                :key="`right_${index}`"
                                :href="link.url"
                                target="_blank"
                                class="
                                    Footer-menuSidebarLink
                                    Footer-menuSidebarLink--mobile
                                "
                                v-text="link.title"
                            ></a>
                        </template>
                    </div>
                    <div class="Footer-menuSidebarNotes">
                        <a
                            href="http://2011.bolshoi.ru/en"
                            class="Footer-menuSidebarLink"
                            v-text="`In English`"
                        ></a>
                    </div>
                </div>
                <div class="Footer-menuContacts">
                    <div
                        v-for="(link, index) in links"
                        :key="index"
                        class="Footer-menuContactsItem"
                    >
                        <div
                            v-if="link.caption"
                            class="Footer-menuContactsItemCaption"
                            v-text="link.caption"
                        ></div>
                        <component
                            :is="value.url ? 'a' : 'div'"
                            v-for="(value, indexValue) in link.items"
                            :key="indexValue"
                            :href="value.url ? value.url : undefined"
                            class="Footer-menuContactsItemValue"
                            v-text="value.title"
                        ></component>
                    </div>
                    <NuxtLink
                        to="/about/contacts"
                        class="Footer-menuContactsItem"
                        v-text="`Все контакты`"
                    ></NuxtLink>
                    <div class="Footer-logoIcon Footer-logoIcon--tablet">
                        <svg-icon name="icon-logo-footer" />
                    </div>
                </div>
                <div class="Footer-menuSidebar Footer-menuSidebar--right">
                    <div class="Footer-menuSidebarLinks">
                        <template v-for="(link, index) in menu.right">
                            <NuxtLink
                                v-if="!link.external"
                                :key="index"
                                :to="link.url"
                                class="Footer-menuSidebarLink"
                                v-text="link.title"
                            ></NuxtLink>
                            <a
                                v-else
                                :key="index"
                                :href="link.url"
                                target="_blank"
                                class="Footer-menuSidebarLink"
                                v-text="link.title"
                            ></a>
                        </template>
                    </div>
                    <div class="Footer-menuSidebarNotes">
                        <a
                            href="http://quality.mkrf.ru/mark/?orgid=0373100000258"
                            target="_blank"
                            class="Footer-menuSidebarNotesLink"
                        >
                            <span
                                v-text="
                                    `Оценка качества услуг учреждений культуры`
                                "
                            ></span>
                            <svg-icon name="icon-quality" />
                        </a>
                    </div>
                </div>
            </div>
            <div class="Footer-menuContacts Footer-menuContacts--tablet">
                <div
                    v-for="(link, index) in links"
                    :key="index"
                    class="Footer-menuContactsItem"
                >
                    <div
                        v-if="link.caption"
                        class="Footer-menuContactsItemCaption"
                        v-text="link.caption"
                    ></div>
                    <component
                        :is="value.url ? 'a' : 'div'"
                        v-for="(value, indexValue) in link.items"
                        :key="indexValue"
                        :href="value.url ? value.url : undefined"
                        class="Footer-menuContactsItemValue"
                        v-text="value.title"
                    ></component>
                </div>
                <NuxtLink
                    to="/about/contacts"
                    class="Footer-menuContactsItem"
                    v-text="`Все контакты`"
                ></NuxtLink>
            </div>
            <div class="Footer-socials">
                <a
                    v-for="(social, index) in socials"
                    :key="index"
                    :href="social.url"
                    target="_blank"
                    class="Footer-social"
                    v-text="social.title"
                ></a>
            </div>
            <a
                href="http://quality.mkrf.ru/mark/?orgid=0373100000258"
                target="_blank"
                class="
                    Footer-menuSidebarNotesLink
                    Footer-menuSidebarNotesLink--mobile
                "
            >
                <span
                    v-text="`Оценка качества услуг учреждений культуры`"
                ></span>
                <svg-icon name="icon-quality" />
            </a>
            <div class="Footer-copyrights">
                <div class="Footer-copyrightsWrapper b-paddings">
                    <!-- eslint-disable -->
                    <div
                        class="Footer-copyrightsBlock"
                        v-html="'&#169;' + year + ', Большой театр'"
                    ></div>
                    <!-- eslint-disable -->
                    <div class="Footer-copyrightsBlock">
                        <div class="Footer-copyrightsBlockLink">
                            <span
                                class="Footer-copyrightsBlockLinkText"
                                v-text="`Дизайн`"
                            ></span>
                            <span
                                class="Footer-copyrightsBlockLinkText"
                                v-text="`—`"
                            ></span>
                            <a
                                href="http://sulliwan.com/"
                                target="_blank"
                                class="Footer-copyrightsBlockLinkText"
                                v-text="`Салливан`"
                            ></a>
                        </div>
                        <div class="Footer-copyrightsBlockLink">
                            <span
                                class="Footer-copyrightsBlockLinkText"
                                v-text="`Разработка`"
                            ></span>
                            <span
                                class="Footer-copyrightsBlockLinkText"
                                v-text="`—`"
                            ></span>
                            <a
                                href="http://astroshock.ru/"
                                target="_blank"
                                class="Footer-copyrightsBlockLinkText"
                                v-text="`Астрошок`"
                            ></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Footer',

    props: {
        isDark: {
            type: Boolean,
            required: true
        },
        isActiveVisit: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            year: '2021',
            menu: {
                left: [
                    {
                        title: 'Сезон 2021—2022',
                        url: '/season'
                    },
                    {
                        title: 'Афиша и билеты',
                        url: '/timetable/all'
                    },
                    {
                        title: 'Люди театра',
                        url: '/people/operatic/soloists'
                    }
                ],
                right: [
                    {
                        title: 'Новости',
                        url: '/news'
                    },
                    {
                        title: 'О театре',
                        url: '/about'
                    },
                    {
                        external: true,
                        title: 'Магазин',
                        url: 'https://shop.bolshoi.ru/'
                    },
                    {
                        title: 'Музей',
                        url: '/museum'
                    },
                    {
                        title: 'Партнеры',
                        url: '/partners'
                    }
                ]
            },
            links: [
                {
                    caption: 'Адрес',
                    items: [
                        {
                            title: 'Театральная площадь, 1'
                        }
                    ]
                },
                {
                    caption: 'Пресс-служба',
                    items: [
                        { url: 'mailto:pr@bolshoi.ru', title: 'pr@bolshoi.ru' }
                    ]
                },
                {
                    caption: 'Кассы',
                    items: [
                        {
                            url: 'tel:+7 495 455-55-55',
                            title: '+7 495 455-55-55'
                        },
                        {
                            url: 'mailto:sales@bolshoi.ru',
                            title: 'sales@bolshoi.ru'
                        }
                    ]
                }
            ],
            socials: [
                {
                    url: 'https://www.youtube.com/user/bolshoi',
                    title: 'YouTube'
                },
                {
                    url: 'https://vk.com/bolshoitheatre',
                    title: 'ВКонтакте'
                },
                {
                    url: 'https://www.facebook.com/bolshoitheatre',
                    title: 'Facebook'
                },
                {
                    url: 'https://twitter.com/BolshoiOfficial',
                    title: 'Twitter'
                },
                {
                    url: 'https://www.instagram.com/bolshoi_theatre/',
                    title: 'Instagram'
                }
            ]
        };
    },

    computed: {
        getFirstVisitUrl() {
            return this.categories[0]?.items[0]?.slug;
        },

        ...mapState('visit', ['categories'])
    },

    methods: {
        redirectToVisit() {
            this.$router.push(
                this.localePath(`/visit/${this.getFirstVisitUrl}`)
            );
        }
    }
};
</script>

<style lang="scss" scoped>
.Footer {
    $component: &;

    width: 100%;
    display: flex;
    background: $c-white;
    border-top: 1px solid $c-black;
    position: relative;

    &.isDark {
        background: $c-black--header;
        border-color: $c-gray--header;
    }

    &-wrapper {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    &-logo {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: scaling(96) 0 scaling(32);

        @include desktop {
            padding: scaling(60) 0 scaling(24);
        }

        @include desktop--small {
            padding: scaling(50) 0 scaling(20);
        }

        @include laptop {
            padding: scaling(48) 0 scaling(13);
        }

        @include tablet {
            display: none;
        }

        @include mobile {
            padding: scaling(48) 0 scaling(14);
        }

        &Icon {
            @include m-aspectRatio(154, 64);

            width: (154 * 100% / 1920);

            @include desktop {
                width: scaling(142);
            }

            @include desktop--small {
                width: scaling(120);
            }

            @include laptop {
                width: scaling(120);
            }

            @include tablet {
                display: none;
            }

            @include mobile {
                width: scaling(120);
            }

            &--tablet {
                display: none;

                @include tablet {
                    display: flex;
                    width: scaling(120);
                }
            }

            svg {
                @include m-absolute100;

                fill: #191919;

                #{$component}.isDark & {
                    fill: $c-white;
                }
            }
        }
    }

    &-menu {
        width: 100%;
        display: flex;
        align-items: stretch;
        border-top: 1px solid $c-black;
        flex-wrap: wrap;

        #{$component}.isDark & {
            border-color: $c-gray--header;
        }

        @include tablet {
            border-top: none !important;
        }

        &Sidebar {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            width: (480 * 100% / 1920);
            padding: scaling(32) scaling(29) scaling(32) scaling(32);

            @include desktop {
                padding: scaling(24) scaling(21) scaling(23) scaling(24);
            }

            @include desktop--small {
                padding: scaling(22) scaling(17) scaling(20) scaling(20);
            }

            @include laptop {
                padding: scaling(19) scaling(13) scaling(16) scaling(16);
            }

            @include tablet {
                padding: scaling(19) scaling(13) scaling(16) scaling(16);
                border: none !important;
                width: (100% / 3);
            }

            @include mobile {
                padding: scaling(26) scaling(24) scaling(23) scaling(24);
                width: 100%;
            }

            &--left {
                border-right: 1px solid $c-black;

                @include mobile {
                    border-right: none;
                    border-bottom: 1px solid $c-black;

                    #{$component}.isDark & {
                        border-color: $c-gray--header;
                    }
                }
            }

            &--right {
                border-left: 1px solid $c-black;

                @include mobile {
                    display: none;
                }
            }

            #{$component}.isDark & {
                border-color: $c-gray--header !important;
            }

            &Links {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                @include mobile {
                    align-items: center;
                }

                #{$component}-menuSidebar--right & {
                    align-items: flex-end;
                }
            }

            &Link {
                @include text--button;

                display: flex;
                color: $c-black;
                margin-top: scaling(12);
                cursor: pointer;
                transition: $d-hover color;

                #{$component}.isDark & {
                    color: $c-white;
                }

                @include desktop--large {
                    margin-top: scaling(16);
                }

                @include desktop {
                    margin-top: scaling(17);
                }

                @include desktop--small {
                    margin-top: scaling(16);
                }

                @include laptop {
                    margin-top: scaling(16);
                }

                @include hover {
                    &:hover {
                        color: $c-red !important;
                    }
                }

                &--mobile {
                    display: none;

                    @include mobile {
                        display: block;
                    }
                }

                #{$component}-menuSidebar--right & {
                    text-align: right;
                }

                &:first-child {
                    margin-top: 0 !important;
                }

                &.nuxt-link-active,
                &.isActive {
                    pointer-events: none;
                    color: $c-red;
                }
            }

            &Notes {
                width: 100%;
                display: flex;
                justify-content: flex-start;

                @include mobile {
                    margin-top: scaling(43);
                    justify-content: center;
                }

                #{$component}-menuSidebar--right & {
                    justify-content: flex-end;
                }

                @include hover {
                    & a:hover {
                        color: $c-red !important;
                    }
                }

                &Link {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    width: scaling(210);
                    color: $c-gray;
                    transition: $d-hover color;

                    @include desktop--small {
                        width: scaling(181);
                    }

                    @include laptop {
                        align-items: flex-end;
                        flex-direction: column-reverse;
                        width: scaling(134);
                    }

                    @include tablet {
                        align-items: flex-end;
                        flex-direction: column-reverse;
                        margin-top: scaling(42);
                        width: scaling(133);
                    }

                    @include mobile {
                        width: scaling(181);
                    }

                    #{$component}.isDark & {
                        color: $c-white;
                    }

                    &--mobile {
                        display: none;

                        @include mobile {
                            display: flex;
                            justify-content: space-between;
                            width: 100%;
                            padding: scaling(24) scaling(16);
                            border-top: 1px solid $c-black;

                            #{$component}.isDark & {
                                border-color: $c-gray--header;
                            }
                        }
                    }

                    span {
                        @include text--caption;

                        line-height: (17 / 14) !important;
                        text-align: center;

                        @include laptop {
                            text-align: right;
                            margin-top: scaling(8);
                        }

                        @include tablet {
                            text-align: right;
                            margin-top: scaling(8);
                        }

                        @include mobile {
                            text-align: left;
                            width: scaling(133);
                            line-height: $lh-140 !important;
                        }
                    }

                    svg {
                        width: scaling(30);
                        height: scaling(30);
                        flex: 0 0 auto;
                        fill: currentColor;
                        stroke: currentColor;

                        @include desktop--large {
                            margin-left: scaling(23);
                        }
                    }
                }
            }
        }

        &Contacts {
            width: (960 * 100% / 1920);

            @include tablet {
                width: (100% / 3);
                display: flex;
                align-items: flex-start;
                justify-content: center;
                padding-top: scaling(20);
                flex-wrap: wrap;
            }

            @include mobile {
                width: 100%;
            }

            &--tablet {
                display: none;

                @include tablet {
                    display: flex;
                    width: 100%;
                    padding-top: 0;
                    align-items: stretch;
                    border-top: 1px solid $c-black;

                    #{$component}.isDark & {
                        border-color: $c-gray--header;
                    }
                }
            }

            & > a {
                @include text--button;

                padding: scaling(36) 0;
                color: $c-black;

                #{$component}.isDark & {
                    color: $c-white;
                }

                @include desktop {
                    padding: scaling(25) 0;
                }

                @include desktop--small {
                    padding: scaling(21) 0;
                }

                @include laptop {
                    padding: scaling(23) 0;
                }

                @include tablet {
                    width: 100%;
                    padding: scaling(24) 0;
                    border-left: none !important;
                    border-top: 1px solid $c-black;

                    #{$component}.isDark & {
                        border-color: $c-gray--header;
                    }
                }

                @include mobile {
                    width: 100%;
                    padding: scaling(16) 0 scaling(15);
                }
            }

            @include hover {
                & a:hover {
                    color: $c-red !important;
                }
            }

            &Item {
                width: 100%;
                border-top: 1px solid $c-black;
                padding: scaling(30) scaling(40) scaling(37);
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                transition: $d-hover color;

                @include desktop {
                    padding: scaling(22) scaling(24) scaling(28);
                }

                @include desktop--small {
                    padding: scaling(18) scaling(5) scaling(27);
                }

                @include laptop {
                    padding: scaling(27) scaling(32) scaling(35);
                }

                @include tablet {
                    display: none;
                    padding: scaling(31) scaling(16) scaling(71);
                    border-top: none;
                    width: (100% / 3);
                }

                @include mobile {
                    padding: scaling(23) scaling(40) scaling(34);
                }

                &:nth-child(2) {
                    padding-bottom: scaling(31);
                }

                #{$component}-menuContacts--tablet & {
                    display: none;

                    @include tablet {
                        display: flex;
                        border-left: 1px solid $c-black;

                        #{$component}.isDark & {
                            border-color: $c-gray--header;
                        }

                        &:first-child {
                            border-left: none;
                        }
                    }
                }

                #{$component}.isDark & {
                    border-color: $c-gray--header;
                }

                &:first-child {
                    border-top: none !important;
                }

                &Caption {
                    @include text--caption;

                    width: 100%;
                    color: $c-gray;

                    #{$component}.isDark & {
                        color: $c-white;
                    }
                }

                &Value {
                    @include title;

                    color: $c-black;
                    margin-top: scaling(13);
                    transition: $d-hover color;

                    #{$component}.isDark & {
                        color: $c-white;
                    }

                    @include desktop {
                        margin-top: scaling(10);
                    }

                    @include desktop--small {
                        margin-top: scaling(8);
                    }

                    @include laptop {
                        margin-top: scaling(7);
                    }

                    @include tablet {
                        margin-top: scaling(10);
                    }

                    @include mobile {
                        font-size: scaling(20);
                    }

                    & + & {
                        margin-top: scaling(12);

                        @include desktop {
                            margin-top: scaling(8);
                        }

                        @include desktop--small {
                            margin-top: scaling(8);
                        }

                        @include laptop {
                            margin-top: scaling(4);
                        }

                        @include tablet {
                            margin-top: scaling(6);
                        }

                        @include mobile {
                            margin-top: scaling(14);
                        }
                    }
                }
            }
        }
    }

    &-socials {
        width: 100%;
        display: flex;
        align-items: stretch;
        border-top: 1px solid $c-black;

        @include tablet {
            flex-wrap: wrap;
        }

        @include mobile {
            flex-wrap: wrap;
        }

        #{$component}.isDark & {
            border-color: $c-gray--header;
        }
    }

    &-social {
        @include text--button;

        color: $c-black;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 1px solid $c-black;
        padding: scaling(36) 0 scaling(34);
        transition: $d-hover color;

        @include desktop {
            padding: scaling(25) 0;
        }

        @include desktop--small {
            padding: scaling(23) 0 scaling(21);
        }

        @include laptop {
            padding: scaling(25) 0 scaling(22);
        }

        @include tablet {
            padding: scaling(24) 0 scaling(23);
            width: (100% / 3);
            border-bottom: 1px solid $c-black;

            #{$component}.isDark & {
                border-color: $c-gray--header;
            }

            &:nth-child(n + 4) {
                border-bottom: none;
                width: 50%;
            }

            &:nth-child(3n + 1) {
                border-left: none;
            }
        }

        @include mobile {
            width: 50%;
            padding: scaling(16) 0 scaling(15);
            border-top: 1px solid $c-black;

            &:first-child {
                border-top: none;
            }

            &:last-child {
                border-bottom: none;
                width: 100%;
            }

            &:nth-child(2n + 1) {
                border-left: none;
            }

            &:nth-child(2) {
                border-top: none;
            }

            #{$component}.isDark & {
                border-color: $c-gray--header;
            }
        }

        #{$component}.isDark & {
            color: $c-white;
            border-color: $c-gray--header;
        }

        &:first-child {
            border-left: 0;
        }

        @include hover {
            &:hover {
                color: $c-red !important;
            }
        }
    }

    &-copyrights {
        width: 100%;
        padding: scaling(24) 0 scaling(19);
        border-top: 1px solid $c-black;

        @include desktop {
            padding: scaling(15) 0 scaling(12);
        }

        @include desktop--small {
            padding: scaling(10) 0 scaling(11);
        }

        @include laptop {
            padding: scaling(16) 0 scaling(13);
        }

        @include tablet {
            padding: scaling(15) 0 scaling(15);
        }

        @include mobile {
            padding: scaling(24) 0 scaling(22);
        }

        #{$component}.isDark & {
            border-color: $c-gray--header;
        }

        &Wrapper {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-right: scaling(30);

            @include desktop {
                padding-right: scaling(22);
            }

            @include desktop--small {
                padding-right: scaling(18);
            }

            @include laptop {
                padding-left: scaling(20);
                padding-right: scaling(14);
            }

            @include tablet {
                padding-right: scaling(22);
            }

            @include mobile {
                padding-right: scaling(22);
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
            }
        }

        &Block {
            @include text--caption;

            display: flex;
            align-items: center;
            justify-content: flex-start;

            @include desktop--small {
                font-size: scaling(14);
            }

            @include laptop {
                font-size: scaling(14);
            }

            @include tablet {
                font-size: scaling(14);
            }

            @include mobile {
                font-size: scaling(14);
                margin-top: scaling(28);
                flex-direction: column;
                align-items: flex-start;

                &:first-child {
                    margin-top: 0;
                }
            }

            #{$component}.isDark & {
                color: $c-white;
            }

            &Link {
                display: flex;
                margin-left: scaling(28);

                @include desktop {
                    margin-left: scaling(16);
                }

                @include desktop--small {
                    margin-left: scaling(16);
                }

                @include laptop {
                    margin-left: scaling(12);
                }

                @include tablet {
                    margin-left: scaling(16);
                }

                @include mobile {
                    margin-left: 0;
                    margin-top: scaling(12);
                }

                &:first-child {
                    margin-left: 0 !important;
                    margin-top: 0 !important;
                }

                @include hover {
                    & a:hover {
                        color: $c-red !important;
                    }
                }

                &Text {
                    @include text--caption;

                    line-height: (17 / 14) !important;
                    color: $c-black;
                    transition: $d-hover color;

                    @include desktop--small {
                        font-size: scaling(14);
                    }

                    @include laptop {
                        font-size: scaling(14);
                    }

                    @include tablet {
                        font-size: scaling(14);
                    }

                    @include mobile {
                        font-size: scaling(14);
                    }

                    #{$component}.isDark & {
                        color: $c-white;
                    }

                    &:nth-child(2) {
                        margin: 0 4px;

                        @include mobile {
                            margin: 0 3px;
                        }
                    }
                }
            }
        }
    }
}
</style>
