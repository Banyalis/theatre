<template>
    <div :id="anchor" class="AboutHistorySection">
        <AboutHistorySectionHead :head="section.head" :is-reverse="isEven" />
        <AboutHistorySectionContent
            :content="section.content"
            :hints="section.hints"
            :section-id="section.id"
            :is-reverse="isEven"
        />
    </div>
</template>

<script>
import AboutHistorySectionHead from '~/components/about/AboutHistorySectionHead';
import AboutHistorySectionContent from '~/components/about/AboutHistorySectionContent';

export default {
    name: 'AboutHistorySection',

    components: {
        AboutHistorySectionHead,
        AboutHistorySectionContent
    },

    props: {
        section: {
            type: Object,
            required: true
        },
        anchor: {
            type: String,
            default: ''
        },
        isEven: {
            type: Boolean,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutHistorySection {
    $component: &;
}
</style>
