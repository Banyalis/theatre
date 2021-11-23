<template>
    <div class="TourPartners">
        <div
            v-for="(item, index) in partners"
            :key="index"
            class="TourPartners-item"
        >
            <div class="TourPartners-itemTitle" v-text="item.title"></div>
            <div class="TourPartners-itemImage">
                <picture>
                    <source
                        :srcset="item.image + ' 1x, ' + item.image2x + ' 2x'"
                    />
                    <img :src="item.image" :alt="item.title" />
                </picture>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TourPartners',

    props: {
        partners: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.TourPartners {
    $component: &;

    display: flex;
    flex-wrap: wrap;
    margin: -1px -1px 0 0;
    border-top: 1px solid $c-black;

    &-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        width: calc(100% / 3);
        height: scaling(150);
        padding: scaling(20);
        border-right: 1px solid $c-black;

        @include desktop--large {
            height: scaling(220);
            padding: scaling(32);
        }

        @include desktop {
            height: scaling(200);
            padding: scaling(28);
        }

        @include desktop--small {
            height: scaling(180);
            padding: scaling(24);
        }

        @include mobile {
            width: 100%;

            &:not(:last-child) {
                border-bottom: 1px solid $c-black;
            }
        }

        &Title {
            color: $c-gray;
            font-size: scaling(14);
            line-height: $lh-150;
            font-family: $family-graphic;
        }

        &Image {
            max-height: scaling(42);

            img {
                @include m-objectFit(contain, left);

                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
