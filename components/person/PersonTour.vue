<template>
    <div class="PersonTour">
        <CommonTitle :title="tour.title" theme="isGray" />
        <div class="PersonTour-inner">
            <!-- eslint-disable-next-line -->
            <div class="PersonTour-content" v-html="tour.content"></div>
        </div>
    </div>
</template>

<script>
import CommonTitle from '~/components/common/CommonTitle';

export default {
    name: 'PersonTour',

    components: {
        CommonTitle
    },

    props: {
        tour: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.PersonTour {
    $component: &;

    @include desktop--large {
        margin-top: -1px;
        border-bottom: 1px solid $c-black;
    }

    @include desktop {
        margin-top: -1px;
        border-bottom: 1px solid $c-black;
    }

    @include desktop--small {
        margin-top: -1px;
        border-bottom: 1px solid $c-black;
    }

    &-inner {
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
    }

    &-content {
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
