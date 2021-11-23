<template>
    <div class="CommonHeadPage" :class="[theme ? theme : '']">
        <div class="CommonHeadPage-title" v-text="title"></div>
    </div>
</template>

<script>
export default {
    name: 'CommonHeadPage',

    props: {
        title: {
            type: String,
            default: ''
        },
        theme: {
            type: String,
            default: 'isWhite'
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonHeadPage {
    $component: &;

    display: flex;
    justify-content: center;

    @include desktop--large {
        padding: scaling(128) 0 scaling(124);
    }

    @include desktop {
        padding: scaling(109) 0 scaling(105);
    }

    @include desktop--small {
        padding: scaling(102) 0 scaling(98);
    }

    @include laptop {
        padding: scaling(114) 0 scaling(108);
    }

    @include tablet {
        padding: scaling(92) 0 scaling(82);
    }

    @include mobile {
        padding: scaling(90) 0 scaling(82);
    }

    &.isDark {
        background-color: $c-black--header;
    }

    &.isGold {
        background-color: $c-gold--lighten;
    }

    &-title {
        font-size: scaling(60);
        line-height: $lh-110;
        text-transform: uppercase;
        font-weight: $fw-light;
        font-feature-settings: 'ss02' on, 'ss01' on;

        @include desktop--large {
            font-size: scaling(120);
            letter-spacing: 0.02em;
        }

        @include desktop {
            font-size: scaling(100);
        }

        @include desktop--small {
            font-size: scaling(80);
        }

        @include mobile {
            font-size: scaling(44);
            letter-spacing: 0.02em;
        }

        #{$component}.isDark & {
            color: $c-white;
        }

        #{$component}.isGold & {
            color: $c-white;
        }
    }
}
</style>
