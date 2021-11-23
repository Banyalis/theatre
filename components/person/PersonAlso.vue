<template>
    <div class="PersonAlso">
        <template v-for="(item, index) in also">
            <CommonTitle :key="index" :title="item.title" theme="isGray" />
            <div :key="index" class="PersonAlso-inner">
                <!-- eslint-disable-next-line -->
                <div class="PersonAlso-content" v-html="item.content"></div>
            </div>
        </template>
    </div>
</template>

<script>
import CommonTitle from '~/components/common/CommonTitle';

export default {
    name: 'PersonAlso',

    components: {
        CommonTitle
    },

    props: {
        also: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.PersonAlso {
    $component: &;

    @include desktop--large {
        margin-top: -1px;
    }

    @include desktop {
        margin-top: -1px;
    }

    @include desktop--small {
        margin-top: -1px;
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
                line-height: $lh-130;
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
