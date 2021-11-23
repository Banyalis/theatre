<template>
    <div class="PartnersMembers">
        <div
            v-for="(item, index) in members"
            :key="index"
            class="PartnersMembers-item"
        >
            <div class="PartnersMembers-itemImage">
                <picture v-if="item.image">
                    <source
                        :srcset="item.image + ' 1x, ' + item.image2x + ' 2x'"
                    />
                    <img :src="item.image" alt="" />
                </picture>
            </div>
            <div class="PartnersMembers-itemInner">
                <div class="PartnersMembers-itemName" v-text="item.name"></div>
                <div
                    class="PartnersMembers-itemPosition"
                    v-text="item.position"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PartnersMembers',

    props: {
        members: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.PartnersMembers {
    $component: &;

    display: flex;
    flex-wrap: wrap;

    @include laptop {
        border-top: 1px solid $c-black;
    }

    @include tablet {
        border-top: 1px solid $c-black;
    }

    &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        @include laptop {
            width: 50%;
            padding: scaling(80) scaling(104) scaling(76);
        }

        @include tablet {
            width: 50%;
            padding: scaling(82) scaling(48) scaling(73);
        }

        @include mobile {
            flex-direction: row;
        }

        &:not(:last-child) {
            @include desktop--large {
                margin-bottom: scaling(64);
                padding-bottom: scaling(40);
                border-bottom: 1px solid $c-gray-80;
            }

            @include desktop {
                margin-bottom: scaling(84);
                padding-bottom: scaling(32);
                border-bottom: 1px solid $c-gray-80;
            }

            @include desktop--small {
                margin-bottom: scaling(60);
                padding-bottom: scaling(28);
                border-bottom: 1px solid $c-gray-80;
            }

            @include mobile {
                margin-bottom: scaling(24);
                padding-bottom: scaling(24);
                border-bottom: 1px solid $c-gray-80;
            }
        }

        &:not(:nth-child(2n + 2)) {
            @include laptop {
                border-right: 1px solid $c-black;
            }

            @include tablet {
                border-right: 1px solid $c-black;
            }
        }

        &Image {
            padding: scaling(4);
            border: 1px solid $c-black;
            border-radius: 100%;
            overflow: hidden;

            @include desktop--large {
                width: scaling(160);
                height: scaling(160);
                padding: scaling(8);
            }

            @include desktop {
                width: scaling(128);
                height: scaling(128);
                padding: scaling(6);
            }

            @include desktop--small {
                width: scaling(112);
                height: scaling(112);
                padding: scaling(5);
            }

            @include laptop {
                width: scaling(96);
                height: scaling(96);
            }

            @include tablet {
                width: scaling(88);
                height: scaling(88);
            }

            @include mobile {
                flex-shrink: 0;
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

        &Inner {
            text-align: center;

            @include desktop--large {
                margin-top: scaling(44);
            }

            @include desktop {
                margin-top: scaling(40);
            }

            @include desktop--small {
                margin-top: scaling(36);
            }

            @include laptop {
                margin-top: scaling(28);
            }

            @include tablet {
                margin-top: scaling(24);
            }

            @include mobile {
                margin-left: scaling(20);
                text-align: left;
            }
        }

        &Name {
            margin-bottom: scaling(12);
            line-height: $lh-120;
            letter-spacing: 0.02em;
            font-feature-settings: 'ss02' on;

            @include desktop--large {
                margin-bottom: scaling(32);
                font-size: scaling(40);
            }

            @include desktop {
                margin-bottom: scaling(28);
                font-size: scaling(32);
            }

            @include desktop--small {
                margin-bottom: scaling(24);
                font-size: scaling(28);
            }

            @include laptop {
                font-size: scaling(20);
                line-height: $lh-130;
                letter-spacing: 0;
            }

            @include tablet {
                font-size: scaling(18);
                line-height: $lh-130;
                letter-spacing: 0;
            }

            @include mobile {
                margin-bottom: scaling(6);
                font-size: scaling(14);
                line-height: $lh-140;
                letter-spacing: 0;
            }
        }

        &Position {
            color: $c-gray;
            font-size: scaling(12);
            line-height: $lh-140;
            font-family: $family-graphic;

            @include desktop--large {
                font-size: scaling(20);
                line-height: $lh-150;
            }

            @include desktop {
                font-size: scaling(18);
                line-height: $lh-160;
            }

            @include desktop--small {
                font-size: scaling(14);
                line-height: $lh-160;
            }

            @include mobile {
                line-height: $lh-130;
            }
        }
    }
}
</style>
