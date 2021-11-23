<template>
    <div class="PartnersFundRequisites">
        <CommonTitle title="Реквизиты" theme="isWhite" />
        <div class="PartnersFundRequisites-inner">
            <div class="PartnersFundRequisites-content">
                <div class="PartnersFundRequisites-list">
                    <div
                        v-for="(item, index) in requisites.mainList"
                        :key="index"
                        class="PartnersFundRequisites-listItem"
                    >
                        <div
                            class="PartnersFundRequisites-listItemTitle"
                            v-text="item.title"
                        ></div>
                        <p
                            class="PartnersFundRequisites-listItemText"
                            v-text="item.text"
                        ></p>
                    </div>
                </div>
            </div>
            <div class="PartnersFundRequisites-sidebar">
                <div class="PartnersFundRequisites-list">
                    <div
                        v-for="(item, index) in requisites.additionalList"
                        :key="index"
                        class="PartnersFundRequisites-listItem"
                    >
                        <div
                            class="PartnersFundRequisites-listItemTitle"
                            v-text="item.title"
                        ></div>
                        <p
                            class="PartnersFundRequisites-listItemText"
                            v-text="item.text"
                        ></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommonTitle from '~/components/common/CommonTitle';

export default {
    name: 'PartnersFundRequisites',

    components: {
        CommonTitle
    },

    props: {
        requisites: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.PartnersFundRequisites {
    $component: &;

    &-inner {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        height: scaling(208);

        @include desktop--large {
            height: scaling(336);
        }

        @include desktop {
            height: scaling(274);
        }

        @include desktop--small {
            height: scaling(216);
        }

        @include mobile {
            grid-template-columns: repeat(1, 1fr);
            height: auto;
        }
    }

    &-content,
    &-sidebar {
        padding: scaling(16) scaling(16) scaling(20);

        @include desktop--large {
            padding: scaling(32) scaling(32) scaling(36);
        }

        @include desktop {
            padding: scaling(24) scaling(24) scaling(28);
        }

        @include desktop--small {
            padding: scaling(20) scaling(20) scaling(24);
        }

        @include mobile {
            padding: scaling(24) scaling(16);
        }
    }

    &-content {
        grid-column: span 2;
        border-right: 1px solid $c-black;

        @include mobile {
            grid-column: span 1;
            border-right: none;
            border-bottom: 1px solid $c-black;
        }
    }

    &-sidebar {
        grid-column: span 1;
    }

    &-list {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;

        @include mobile {
            #{$component}-sidebar & {
                flex-direction: row;
                justify-content: flex-start;
            }
        }

        &Item {
            @include mobile {
                #{$component}-content & {
                    &:not(:last-child) {
                        margin-bottom: scaling(16);
                    }
                }

                #{$component}-sidebar & {
                    &:not(:last-child) {
                        width: scaling(80);
                        margin-right: scaling(16);
                    }
                }
            }

            &Title,
            &Text {
                font-size: scaling(14);
                line-height: $lh-130;
                font-family: $family-graphic;

                @include desktop--large {
                    font-size: scaling(20);
                    line-height: $lh-140;
                }

                @include desktop {
                    font-size: scaling(18);
                }

                @include mobile {
                    font-size: scaling(12);
                    line-height: $lh-150;
                }
            }

            &Title {
                margin-bottom: scaling(8);
                color: $c-gray;

                @include desktop--large {
                    margin-bottom: scaling(12);
                }

                @include desktop {
                    margin-bottom: scaling(12);
                }

                @include mobile {
                    margin-bottom: scaling(4);
                }
            }
        }
    }
}
</style>
