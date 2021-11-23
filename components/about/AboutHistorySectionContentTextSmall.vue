<template>
    <!-- eslint-disable-next-line -->
    <div class="AboutHistorySectionContentTextSmall" v-html="content"></div>
</template>

<script>
export default {
    name: 'AboutHistorySectionContentTextSmall',

    props: {
        content: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutHistorySectionContentTextSmall {
    $component: &;

    &::v-deep p {
        color: $c-gray--header;
        font-size: scaling(14);
        line-height: $lh-160;
        font-family: $family-graphic;

        @include desktop--large {
            font-size: scaling(20);
        }

        @include desktop {
            font-size: scaling(18);
        }

        &:not(:last-child) {
            margin-bottom: scaling(16);

            @include desktop--large {
                margin-bottom: scaling(20);
            }

            @include desktop {
                margin-bottom: scaling(20);
            }
        }
    }
}
</style>
