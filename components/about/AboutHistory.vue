<template>
    <div class="AboutHistory">
        <AboutHistoryNav />
        <div class="AboutHistory-content">
            <AboutHistorySection
                v-for="(item, index) in content.history"
                :key="index"
                :section="item"
                :anchor="'section-' + (index + 1)"
                :is-even="(index + 1) % 2 === 0"
            />
        </div>
    </div>
</template>

<script>
import AboutHistoryNav from '~/components/about/AboutHistoryNav';
import AboutHistorySection from '~/components/about/AboutHistorySection';

export default {
    name: 'AboutHistory',

    components: {
        AboutHistoryNav,
        AboutHistorySection
    },

    props: {
        content: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutHistory {
    $component: &;

    display: flex;
    flex-wrap: wrap;

    &-content {
        width: (1600 * 100% / 1920);
        border-left: 1px solid $c-gray--header;

        @include desktop {
            width: (1200 * 100% / 1440);
        }

        @include desktop--small {
            width: (980 * 100% / 1200);
        }

        @include laptop {
            width: (768 * 100% / 960);
        }

        @include tablet {
            width: (576 * 100% / 768);
        }

        @include mobile {
            width: 100%;
            border-left: none;
        }
    }
}
</style>
