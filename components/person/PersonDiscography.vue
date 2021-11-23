<template>
    <div class="PersonDiscography">
        <CommonTitle :title="discography.title" theme="isGray" />
        <div v-if="discography.list" class="PersonDiscography-list">
            <div
                v-for="(item, index) in discography.list"
                :key="index"
                class="PersonDiscography-listItem"
            >
                <div
                    class="PersonDiscography-listItemYear"
                    v-text="item.year"
                ></div>
                <div class="PersonDiscography-listItemContent">
                    <div
                        class="PersonDiscography-listItemTitle"
                        v-text="item.title"
                    ></div>
                    <p
                        class="PersonDiscography-listItemDescription"
                        v-text="item.description"
                    ></p>
                </div>
            </div>
        </div>
        <!-- eslint-disable -->
        <div
            v-if="discography.content"
            class="PersonDiscography-content"
            v-html="discography.content"
        ></div>
        <!-- eslint-enable -->
    </div>
</template>

<script>
import CommonTitle from '~/components/common/CommonTitle';

export default {
    name: 'PersonDiscography',

    components: {
        CommonTitle
    },

    props: {
        discography: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.PersonDiscography {
    $component: &;

    &-list {
        &Item {
            display: flex;
            justify-content: space-between;
            padding: scaling(20);

            @include desktop--large {
                padding: scaling(32);
            }

            @include desktop {
                padding: scaling(24) scaling(24) scaling(28);
            }

            @include desktop--small {
                padding: scaling(20) scaling(20) scaling(24);
            }

            @include mobile {
                flex-direction: column;
                padding: scaling(20) scaling(16);
            }

            &:not(:last-child) {
                border-bottom: 1px solid $c-black;
            }

            &Year {
                font-size: scaling(14);
                line-height: $lh-130;
                font-family: $family-graphic;

                @include desktop--large {
                    font-size: scaling(20);
                }

                @include desktop {
                    font-size: scaling(18);
                }

                @include laptop {
                    width: (208 * 100% / 960);
                    margin-right: scaling(32);
                    line-height: $lh-140;
                }

                @include tablet {
                    width: (160 * 100% / 768);
                    margin-right: scaling(32);
                }

                @include mobile {
                    margin-bottom: scaling(32);
                    line-height: $lh-150;
                    letter-spacing: -0.01em;
                }
            }

            &Content {
                width: 100%;

                @include desktop--large {
                    width: (384 * 100% / 768);
                }

                @include desktop {
                    width: (332 * 100% / 576);
                }

                @include desktop--small {
                    width: (288 * 100% / 480);
                }
            }

            &Title {
                font-size: scaling(14);
                line-height: $lh-140;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                font-feature-settings: 'ss02' on;

                @include desktop--large {
                    font-size: scaling(20);
                    line-height: $lh-120;
                }

                @include desktop {
                    font-size: scaling(18);
                    line-height: $lh-120;
                }

                @include mobile {
                    font-size: scaling(20);
                    line-height: $lh-120;
                    letter-spacing: 0.02em;
                }
            }

            &Description {
                margin-top: scaling(8);
                color: $c-gray;
                font-size: scaling(12);
                line-height: $lh-130;
                font-family: $family-graphic;

                @include desktop--large {
                    font-size: scaling(14);
                    line-height: $lh-150;
                }

                @include desktop {
                    font-size: scaling(14);
                }

                @include desktop--small {
                    margin-top: scaling(6);
                }

                @include laptop {
                    font-size: scaling(14);
                }

                @include mobile {
                    line-height: $lh-140;
                }
            }
        }
    }

    &-content {
        margin-top: -1px;
        border-top: 1px solid $c-black;

        @include desktop--large {
            padding: scaling(36) scaling(32) scaling(72);
        }

        @include desktop {
            padding: scaling(28) scaling(24) scaling(56);
        }

        @include desktop--small {
            padding: scaling(24) scaling(20) scaling(48);
        }

        @include laptop {
            padding: scaling(40) scaling(112);
        }

        @include tablet {
            padding: scaling(40) scaling(72);
        }

        @include mobile {
            padding: scaling(20) scaling(16) scaling(40);
        }

        &::v-deep p {
            font-size: scaling(14);
            line-height: $lh-150;
            font-family: $family-graphic;

            @include desktop--large {
                font-size: scaling(20);
            }

            @include desktop {
                font-size: scaling(18);
            }

            @include mobile {
                line-height: $lh-160;
            }

            &:not(:first-child) {
                margin-top: scaling(16);

                @include desktop--large {
                    margin-top: scaling(20);
                }
            }

            a {
                display: inline-block;
                color: $c-red;
                transition: color $d-hover ease-in-out;

                @include hover {
                    &:hover {
                        color: $c-gold;
                    }
                }
            }

            b {
                font-weight: $fw-medium;
            }
        }
    }
}
</style>
