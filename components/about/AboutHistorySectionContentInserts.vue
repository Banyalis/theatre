<template>
    <div class="AboutHistorySectionContentInserts">
        <div
            v-for="(item, index) in inserts.items"
            :key="index"
            class="AboutHistorySectionContentInserts-item"
            :class="{ isPicture: item.picture }"
        >
            <div class="AboutHistorySectionContentInserts-itemHeader">
                <div
                    v-if="item.image"
                    class="AboutHistorySectionContentInserts-itemImage"
                >
                    <img :src="item.image" alt="" />
                </div>
                <div
                    v-if="item.title"
                    class="AboutHistorySectionContentInserts-itemTitle"
                    v-text="item.title"
                ></div>
            </div>
            <p
                v-if="item.description"
                class="AboutHistorySectionContentInserts-itemDescription"
                v-text="item.description"
            ></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutHistorySectionContentInserts',

    props: {
        inserts: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutHistorySectionContentInserts {
    $component: &;

    display: none;
    width: 100%;
    padding: 0 scaling(112);

    @include laptop {
        display: block;
    }

    @include tablet {
        display: block;
        padding: 0 scaling(56);
    }

    @include mobile {
        display: block;
        padding: 0 scaling(16);
    }

    &:last-child {
        margin-bottom: scaling(32);
    }

    &-item {
        margin-top: -1px;
        padding: scaling(20) 0;
        border-top: 1px solid $c-gray-80;
        border-bottom: 1px solid $c-gray-80;
        font-family: $family-graphic;

        &Header {
            display: flex;
            align-items: center;
            margin-bottom: scaling(8);

            #{$component}-item.isPicture & {
                flex-direction: column-reverse;
                margin-bottom: 0;
            }
        }

        &Image {
            width: scaling(32);
            height: scaling(32);
            margin-right: scaling(16);
            border-radius: 100%;

            @include mobile {
                margin-right: scaling(12);
            }

            #{$component}-item.isPicture & {
                width: scaling(130);
                height: scaling(180);
                margin: scaling(20) 0;

                @include laptop {
                    width: scaling(180);
                    height: scaling(250);
                    margin: scaling(16) 0 scaling(26);
                }

                @include mobile {
                    width: scaling(100);
                    height: scaling(120);
                }
            }

            img {
                @include m-objectFit;

                width: 100%;
                height: 100%;
            }
        }

        &Title {
            color: $c-gold;
            font-size: scaling(12);
            line-height: $lh-160;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-weight: $fw-medium;
        }

        &Description {
            color: $c-gray;
            font-size: scaling(14);
            line-height: $lh-160;
        }
    }
}
</style>
