<template>
    <div class="PartnersAdviceStructure">
        <CommonTitle title="Состав попечительского совета" theme="isWhite" />
        <div class="PartnersAdviceStructure-main">
            <div class="PartnersAdviceStructure-mainImage">
                <picture v-if="structure.main.image">
                    <source
                        :srcset="
                            structure.main.image +
                            ' 1x, ' +
                            structure.main.image2x +
                            ' 2x'
                        "
                    />
                    <img :src="structure.main.image" alt="" />
                </picture>
            </div>
            <div
                class="PartnersAdviceStructure-mainName"
                v-text="structure.main.name"
            ></div>
            <div
                class="PartnersAdviceStructure-mainPosition"
                v-text="structure.main.position"
            ></div>
        </div>
        <div class="PartnersAdviceStructure-list">
            <div
                v-for="(item, index) in structure.items"
                :key="index"
                class="PartnersAdviceStructure-listItem"
            >
                <CommonPeopleCard :item="item" :partners="true" />
            </div>
        </div>
    </div>
</template>

<script>
import CommonTitle from '~/components/common/CommonTitle';
import CommonPeopleCard from '~/components/common/CommonPeopleCard';

export default {
    name: 'PartnersAdviceStructure',

    components: {
        CommonTitle,
        CommonPeopleCard
    },

    props: {
        structure: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.PartnersAdviceStructure {
    $component: &;

    &-main {
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid $c-black;

        @include laptop {
            display: flex;
            padding: scaling(80) scaling(80) scaling(76);
        }

        @include tablet {
            display: flex;
            padding: scaling(82) scaling(82) scaling(73);
        }

        @include mobile {
            display: flex;
            padding: scaling(40) scaling(16) scaling(32);
        }

        &Image {
            padding: scaling(4);
            border: 1px solid $c-black;
            border-radius: 100%;

            @include laptop {
                width: scaling(96);
                height: scaling(96);
            }

            @include tablet {
                width: scaling(88);
                height: scaling(88);
            }

            @include mobile {
                width: scaling(64);
                height: scaling(64);
            }

            img {
                @include m-objectFit;

                width: 100%;
                height: 100%;
                border-radius: 100%;
            }
        }

        &Name {
            color: $c-black--header;
            font-size: scaling(20);
            line-height: $lh-130;
            font-family: $family-graphic;

            @include laptop {
                margin-top: scaling(28);
            }

            @include tablet {
                margin-top: scaling(24);
                font-size: scaling(18);
            }

            @include mobile {
                margin-top: scaling(20);
                font-size: scaling(14);
                line-height: $lh-140;
            }
        }

        &Position {
            max-width: scaling(384);
            margin-top: scaling(12);
            color: $c-gray;
            font-size: scaling(12);
            line-height: $lh-140;
            text-align: center;
            font-family: $family-graphic;

            @include mobile {
                margin-top: scaling(6);
                line-height: $lh-130;
            }
        }
    }

    &-list {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -1px -1px 0;

        @include mobile {
            margin: 0;
            padding: scaling(20) scaling(16) scaling(44);
        }

        &Item {
            width: calc(100% / 6);
            border-right: 1px solid $c-black;
            border-bottom: 1px solid $c-black;

            @include desktop--small {
                width: calc(100% / 5);
            }

            @include laptop {
                width: calc(100% / 4);
            }

            @include tablet {
                width: calc(100% / 3);
            }

            @include mobile {
                width: 100%;
                border-right: none;
                border-bottom-color: $c-gray-80;

                &:last-child {
                    border-bottom: none;
                }
            }
        }
    }
}
</style>
