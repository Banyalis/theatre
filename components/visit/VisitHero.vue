<template>
    <div class="VisitHero">
        <div v-lazy-container="{ selector: 'img' }" class="VisitHero-image">
            <img
                :data-src="require('~/assets/images/visit/visit-hero.png')"
                :data-loading="
                    require('~/assets/images/visit/visit-hero-poor.png')
                "
                :data-srcset="
                    require('~/assets/images/visit/visit-hero.png') +
                    ' 1x, ' +
                    require('~/assets/images/visit/visit-hero@2x.png') +
                    ' 2x'
                "
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'VisitHero'
};
</script>

<style lang="scss" scoped>
.VisitHero {
    $component: &;

    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 100%;

    &-image {
        position: absolute;
        bottom: scaling(-10);
        display: flex;
        align-items: flex-end;

        @include desktop--large {
            width: scaling(1920);
            height: scaling(567);
        }

        @include desktop {
            width: scaling(1440);
            height: scaling(424);
        }

        @include desktop--small {
            width: scaling(1200);
            height: scaling(337);
        }

        @include laptop {
            width: scaling(960);
            height: scaling(294);
        }

        @include tablet {
            width: scaling(768);
            height: scaling(361);
        }

        @include mobile {
            width: scaling(420);
            height: scaling(198);
        }

        img {
            width: 100%;
        }
    }
}
</style>
