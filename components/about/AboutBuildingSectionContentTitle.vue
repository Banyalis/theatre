<template>
    <div class="AboutBuildingSectionContentTitle" v-text="content"></div>
</template>

<script>
export default {
    name: 'AboutBuildingSectionContentTitle',

    props: {
        content: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutBuildingSectionContentTitle {
    $component: &;

    font-size: scaling(24);
    line-height: $lh-150;
    letter-spacing: 0.02em;
    font-feature-settings: 'cpsp' on;

    @include desktop--large {
        font-size: scaling(40);
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
</style>
