<template>
    <div class="PeopleHero">
        <div v-lazy-container="{ selector: 'img' }" class="PeopleHero-image">
            <img
                :data-src="require('~/assets/images/people/people-hero.png')"
                :data-loading="
                    require('~/assets/images/people/people-hero-poor.png')
                "
                :data-srcset="
                    require('~/assets/images/people/people-hero.png') +
                    ' 1x, ' +
                    require('~/assets/images/people/people-hero@2x.png') +
                    ' 2x'
                "
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'PeopleHero'
};
</script>

<style lang="scss" scoped>
.PeopleHero {
    $component: &;

    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 100%;

    &-image {
        position: absolute;
        display: flex;
        align-items: flex-end;
        margin-bottom: scaling(-5);

        @include desktop--large {
            width: scaling(1920);
            height: scaling(704);
        }

        @include desktop {
            width: scaling(1420);
            height: scaling(462);
        }

        @include desktop--small {
            width: scaling(1113);
            height: scaling(375);
        }

        @include laptop {
            width: scaling(920);
            height: scaling(303);
        }

        @include tablet {
            width: scaling(718);
            height: scaling(383);
        }

        @include mobile {
            width: scaling(500);
            height: scaling(208);
        }

        img {
            width: 100%;
        }
    }
}
</style>
