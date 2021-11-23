<template>
    <div class="AboutHistorySectionContentTextLarge" v-text="content"></div>
</template>

<script>
export default {
    name: 'AboutHistorySectionContentTextLarge',

    props: {
        content: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutHistorySectionContentTextLarge {
    $component: &;

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
        line-height: $lh-150;
    }
}
</style>
