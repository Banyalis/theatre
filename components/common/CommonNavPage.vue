<template>
    <div class="CommonNavPage" :class="[theme ? theme : '']">
        <NuxtLink
            v-for="(item, index) in nav"
            :key="index"
            :to="item.url"
            class="CommonNavPage-link"
            v-text="item.title"
        ></NuxtLink>
    </div>
</template>

<script>
export default {
    name: 'CommonNavPage',

    props: {
        nav: {
            type: Array,
            required: true
        },
        theme: {
            type: String,
            default: 'isWhite'
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonNavPage {
    $component: &;

    width: 100%;
    padding: scaling(15) scaling(16);
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    overflow-x: auto;
    scrollbar-width: none;
    white-space: nowrap;

    @include desktop--large {
        padding: scaling(19) scaling(32);
    }

    @include desktop {
        padding: scaling(13) scaling(24);
    }

    @include desktop--small {
        padding: scaling(11) scaling(20);
    }

    &::-webkit-scrollbar {
        display: none;
    }

    &.isDark {
        border-top-color: $c-gray--header;
        border-bottom-color: $c-gray--header;
        background-color: $c-black--header;
    }

    &.isGold,
    &.isRed {
        border-top-color: $c-black;
        border-bottom-color: $c-black;
    }

    &.isGold {
        background-color: $c-gold--lighten;
    }

    &.isRed {
        background-color: $c-red;
    }

    &-link {
        display: inline-block;
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

        #{$component}.isDark & {
            color: $c-gray;
        }

        #{$component}.isGold &,
        #{$component}.isRed & {
            color: $c-black--header;
        }

        @include hover {
            &:hover {
                #{$component}.isDark &,
                #{$component}.isGold &,
                #{$component}.isRed & {
                    color: $c-white;
                }
            }
        }

        &.nuxt-link-active {
            #{$component}.isDark &,
            #{$component}.isGold &,
            #{$component}.isRed & {
                color: $c-white;
            }
        }
    }
}
</style>
