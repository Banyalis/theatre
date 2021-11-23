<template>
    <div class="AboutBuilding">
        <AboutBuildingNav />
        <div class="AboutBuilding-content">
            <AboutBuildingSection
                v-for="(item, index) in content.building"
                :key="index"
                :section="item"
                :anchor="'section-' + (index + 1)"
            />
        </div>
        <AboutBuildingSidebar />
    </div>
</template>

<script>
import AboutBuildingNav from '~/components/about/AboutBuildingNav';
import AboutBuildingSection from '~/components/about/AboutBuildingSection';
import AboutBuildingSidebar from '~/components/about/AboutBuildingSidebar';

export default {
    name: 'AboutBuilding',

    components: {
        AboutBuildingNav,
        AboutBuildingSection,
        AboutBuildingSidebar
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
.AboutBuilding {
    $component: &;

    display: flex;
    position: relative;

    @include tablet {
        flex-direction: column;
    }

    @include mobile {
        flex-direction: column;
    }

    &-content {
        @include desktop--large {
            padding-right: (480 * 100% / 1920);
        }

        @include desktop {
            padding-right: (360 * 100% / 1440);
        }

        @include desktop--small {
            padding-right: (300 * 100% / 1200);
        }
    }
}
</style>
