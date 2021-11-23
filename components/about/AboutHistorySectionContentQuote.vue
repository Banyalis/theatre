<template>
    <div class="AboutHistorySectionContentQuote">
        <p class="AboutHistorySectionContentQuote-text" v-text="quote.text"></p>
        <div
            class="AboutHistorySectionContentQuote-caption"
            v-text="quote.caption"
        ></div>
    </div>
</template>

<script>
export default {
    name: 'AboutHistorySectionContentQuote',

    props: {
        quote: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutHistorySectionContentQuote {
    $component: &;

    padding: scaling(28) 0 scaling(36);
    border-top: 1px solid $c-gold;
    border-bottom: 1px solid $c-gold;

    @include desktop--large {
        padding: scaling(56) 0 scaling(64);
    }

    @include desktop {
        padding: scaling(40) 0 scaling(48);
    }

    @include desktop--small {
        padding: scaling(32) 0 scaling(40);
    }

    @include mobile {
        padding: scaling(32) 0 scaling(36);
    }

    &-text {
        font-size: scaling(24);
        line-height: $lh-150;
        letter-spacing: 0.02em;
        font-feature-settings: 'cpsp' on;

        @include desktop--large {
            font-size: scaling(40);
            letter-spacing: 0;
        }

        @include desktop {
            font-size: scaling(32);
        }

        @include desktop--small {
            font-size: scaling(28);
        }

        @include mobile {
            font-size: scaling(20);
            letter-spacing: 0;
        }
    }

    &-caption {
        margin-top: scaling(16);
        color: $c-gray;
        font-size: scaling(12);
        line-height: $lh-150;
        font-family: $family-graphic;

        @include desktop--large {
            margin-top: scaling(32);
            font-size: scaling(16);
        }

        @include desktop {
            margin-top: scaling(24);
            font-size: scaling(14);
        }

        @include desktop--small {
            margin-top: scaling(20);
        }

        @include laptop {
            line-height: $lh-140;
        }

        @include tablet {
            line-height: $lh-130;
        }
    }
}
</style>
