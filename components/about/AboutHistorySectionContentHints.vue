<template>
    <div
        class="AboutHistorySectionContentHints"
        :class="[
            hints.stretched ? `isStretched` : '',
            hints.top ? `isTop` : 'isBottom',
            { isReverse }
        ]"
    >
        <div
            v-for="(item, index) in hints.items"
            :key="index"
            class="AboutHistorySectionContentHints-item"
            :class="[
                !item.small && !item.member && !item.picture
                    ? 'isStandart'
                    : '',
                item.small ? `isSmall` : '',
                item.member ? `isMember` : '',
                item.picture ? `isPicture` : ''
            ]"
        >
            <div
                v-if="item.image"
                class="AboutHistorySectionContentHints-itemImage"
            >
                <picture>
                    <source
                        :srcset="item.image + ' 1x, ' + item.image2x + ' 2x'"
                    />
                    <img :src="item.image" alt="" />
                </picture>
            </div>
            <div
                v-if="item.title"
                class="AboutHistorySectionContentHints-itemTitle"
                v-text="item.title"
            ></div>
            <p
                v-if="item.description"
                class="AboutHistorySectionContentHints-itemDescription"
                v-text="item.description"
            ></p>
            <div
                v-if="item.icon"
                class="AboutHistorySectionContentHints-itemIcon"
            >
                <svg-icon :name="'icon-' + item.icon" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutHistorySectionContentHints',

    props: {
        hints: {
            type: Object,
            required: true
        },
        isReverse: {
            type: Boolean,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutHistorySectionContentHints {
    $component: &;

    position: absolute;
    left: scaling(32);
    display: none;
    width: (416 * 100% / 1600);

    @include desktop--large {
        display: block;
    }

    @include desktop {
        left: scaling(24);
        display: block;
        width: (312 * 100% / 1200);
    }

    @include desktop--small {
        left: scaling(20);
        display: block;
        width: (260 * 100% / 980);
    }

    &.isReverse {
        left: inherit;
        right: scaling(32);

        @include desktop {
            right: scaling(24);
        }

        @include desktop--small {
            right: scaling(20);
        }
    }

    &.isTop {
        top: 0;
    }

    &.isBottom {
        bottom: 0;
    }

    &.isStretched {
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @include laptop {
            display: none;
        }

        @include tablet {
            display: none;
        }

        @include mobile {
            display: none;
        }
    }

    &-item {
        padding-bottom: scaling(40);
        border-bottom: 1px solid $c-gray-80;
        position: relative;

        @include desktop {
            padding-bottom: scaling(32);
        }

        @include desktop--small {
            padding-bottom: scaling(28);
        }

        &.isStandart,
        &.isMember,
        &.isPicture {
            text-align: center;
        }

        &.isMember {
            &:not(:last-child) {
                margin-bottom: scaling(120);

                @include desktop {
                    margin-bottom: scaling(100);
                }

                @include desktop--small {
                    margin-bottom: scaling(80);
                }
            }
        }

        &.isPicture {
            display: flex;
            flex-direction: column;
        }

        &Image {
            #{$component}-item.isMember & {
                width: scaling(160);
                height: scaling(160);
                margin: 0 auto scaling(40);
                padding: scaling(8);
                border: 1px solid $c-gray--header;
                border-radius: 100%;
                overflow: hidden;

                @include desktop {
                    width: scaling(128);
                    height: scaling(128);
                    padding: scaling(6);
                }

                @include desktop--small {
                    width: scaling(112);
                    height: scaling(112);
                    margin: 0 auto scaling(36);
                    padding: scaling(5);
                }

                img {
                    border-radius: 100%;
                }
            }

            #{$component}-item.isPicture & {
                order: 2;
                width: scaling(220);
                height: scaling(320);
                margin: 0 auto scaling(32);

                @include desktop {
                    width: scaling(170);
                    height: scaling(240);
                    margin: 0 auto scaling(24);
                }

                @include desktop--small {
                    width: scaling(140);
                    height: scaling(200);
                    margin: 0 auto scaling(20);
                }
            }

            img {
                @include m-objectFit;

                width: 100%;
                height: 100%;
            }
        }

        &Title {
            #{$component}-item.isStandart &,
            #{$component}-item.isSmall &,
            #{$component}-item.isPicture & {
                margin-bottom: scaling(20);
                font-size: scaling(20);
                line-height: $lh-160;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                font-weight: $fw-medium;
                font-family: $family-graphic;

                @include desktop {
                    font-size: scaling(18);
                    line-height: $lh-140;
                }

                @include desktop--small {
                    margin-bottom: scaling(16);
                    font-size: scaling(14);
                }
            }

            #{$component}-item.isMember & {
                margin-bottom: scaling(31);
                font-size: scaling(40);
                line-height: $lh-120;
                letter-spacing: 0.02em;
                font-feature-settings: 'cpsp' on;

                @include desktop {
                    margin-bottom: scaling(28);
                    font-size: scaling(32);
                }

                @include desktop--small {
                    margin-bottom: scaling(24);
                    font-size: scaling(28);
                }
            }

            #{$component}-item.isPicture & {
                order: 1;
            }
        }

        &Description {
            #{$component}-item.isStandart &,
            #{$component}-item.isSmall &,
            #{$component}-item.isMember &,
            #{$component}-item.isPicture & {
                color: $c-gray;
            }

            #{$component}-item.isStandart & {
                font-size: scaling(32);
                line-height: $lh-130;
                font-feature-settings: 'cpsp' on;

                @include desktop {
                    font-size: scaling(26);
                }

                @include desktop--small {
                    font-size: scaling(20);
                }
            }

            #{$component}-item.isSmall &,
            #{$component}-item.isMember &,
            #{$component}-item.isPicture & {
                font-size: scaling(18);
                line-height: $lh-160;
                font-family: $family-graphic;

                @include desktop--large {
                    font-size: scaling(20);
                    line-height: $lh-150;
                }

                @include desktop--small {
                    font-size: scaling(14);
                }
            }

            #{$component}-item.isPicture & {
                order: 3;
            }
        }

        &Icon {
            position: absolute;
            right: 0;
            bottom: 0;
            width: scaling(210);
            height: scaling(230);
            z-index: -1;

            @include desktop {
                width: scaling(170);
                height: scaling(190);
            }

            @include desktop--small {
                width: scaling(140);
                height: scaling(160);
            }

            svg {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
