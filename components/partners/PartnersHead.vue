<template>
    <div class="PartnersHead">
        <div class="PartnersHead-title" v-text="head.title"></div>
        <p class="PartnersHead-text" v-text="head.text"></p>
    </div>
</template>

<script>
export default {
    name: 'PartnersHead',

    props: {
        head: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.PartnersHead {
    $component: &;

    padding: scaling(32) scaling(16) scaling(20);
    border-bottom: 1px solid $c-black;

    @include desktop--large {
        padding: scaling(48) scaling(32) scaling(36);
    }

    @include desktop {
        padding: scaling(40) scaling(24) scaling(28);
    }

    @include desktop--small {
        padding: scaling(36) scaling(20) scaling(24);
    }

    &-title {
        margin-bottom: scaling(100);
        line-height: $lh-110;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        font-feature-settings: 'ss02' on;

        @include desktop--large {
            width: scaling(1090);
            margin-bottom: scaling(136);
            font-size: scaling(60);
        }

        @include desktop {
            width: scaling(904);
            margin-bottom: scaling(134);
            font-size: scaling(48);
            letter-spacing: 0;
        }

        @include desktop--small {
            width: scaling(760);
            margin-bottom: scaling(108);
            font-size: scaling(42);
            letter-spacing: 0;
        }

        @include laptop {
            width: scaling(608);
            font-size: scaling(36);
        }

        @include tablet {
            width: scaling(736);
            font-size: scaling(32);
        }

        @include mobile {
            margin-bottom: scaling(102);
            font-size: scaling(30);
        }
    }

    &-text {
        font-size: scaling(18);
        line-height: $lh-170;
        font-family: $family-graphic;

        @include desktop--large {
            font-size: scaling(28);
        }

        @include desktop {
            font-size: scaling(22);
        }

        @include laptop {
            line-height: $lh-160;
        }

        @include tablet {
            font-size: scaling(16);
            line-height: $lh-160;
        }

        @include mobile {
            font-size: scaling(16);
            line-height: $lh-140;
        }
    }
}
</style>
