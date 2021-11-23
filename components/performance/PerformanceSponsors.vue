<template>
    <div class="PerformanceSponsors">
        <div
            v-for="(item, index) in sponsors"
            :key="index"
            class="PerformanceSponsors-item"
        >
            <div
                class="PerformanceSponsors-itemTitle"
                v-text="type[item.type]"
            ></div>
            <div class="PerformanceSponsors-itemImage">
                <picture>
                    <source
                        :srcset="item.image + ' 1x, ' + item.image2x + ' 2x'"
                    />
                    <img :src="item.image" alt="" />
                </picture>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PerformanceSponsors',

    props: {
        sponsors: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            type: {
                privilegedSponsor: 'Привилегированный спонсор',
                generalSponsor: 'Генеральный спонсор',
                privilegedPartner: 'Привилегированный партнер'
            }
        };
    }
};
</script>

<style lang="scss" scoped>
.PerformanceSponsors {
    $component: &;

    display: flex;
    border-top: 1px solid $c-gray--header;

    @include mobile {
        display: none;
    }

    &-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: calc(100% / 3);
        padding: scaling(20) scaling(16);

        @include desktop--large {
            height: scaling(224);
            padding: scaling(32);
        }

        @include desktop {
            height: scaling(180);
            padding: scaling(28) scaling(24);
        }

        @include desktop--small {
            height: scaling(160);
            padding: scaling(24) scaling(20);
        }

        @include laptop {
            height: scaling(152);
        }

        @include tablet {
            height: scaling(157);
        }

        &:not(:last-child) {
            border-right: 1px solid $c-gray--header;
        }

        &Title {
            color: $c-white;
            font-size: scaling(12);
            line-height: $lh-150;
            font-family: $family-graphic;

            @include desktop--large {
                font-size: scaling(14);
            }

            @include desktop {
                font-size: scaling(14);
            }

            @include tablet {
                max-width: scaling(160);
            }
        }

        &Image {
            display: flex;
            align-items: flex-end;
            width: scaling(188);
            height: scaling(57);

            img {
                @include m-objectFit(contain);

                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
