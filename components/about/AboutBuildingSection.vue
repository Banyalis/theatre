<template>
    <div :id="anchor" class="AboutBuildingSection">
        <AboutBuildingSectionHead :head="section.head" />
        <AboutBuildingSectionContent :content="section.content" />
    </div>
</template>

<script>
import AboutBuildingSectionHead from '~/components/about/AboutBuildingSectionHead';
import AboutBuildingSectionContent from '~/components/about/AboutBuildingSectionContent';

export default {
    name: 'AboutBuildingSection',

    components: {
        AboutBuildingSectionHead,
        AboutBuildingSectionContent
    },

    props: {
        section: {
            type: Object,
            required: true
        },
        anchor: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutBuildingSection {
    $component: &;

    &:not(:last-child) {
        border-bottom: 1px solid $c-black;
    }
}
</style>
