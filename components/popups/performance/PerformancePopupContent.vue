<template>
    <div class="PerformancePopupContent">
        <!-- eslint-disable-next-line -->
        <div class="PerformancePopupContent-inner" v-html="content"></div>
    </div>
</template>

<script>
export default {
    name: 'PerformancePopupContent',

    props: {
        content: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.PerformancePopupContent {
    $component: &;

    &-inner {
        &::v-deep h2 {
            font-size: scaling(24);
            line-height: $lh-160;
            font-weight: $fw-bold;

            @include desktop--large {
                font-size: scaling(40);
            }

            @include desktop {
                font-size: scaling(32);
            }

            @include desktop--small {
                font-size: scaling(28);
            }

            &:not(:first-child) {
                margin-top: scaling(32);

                @include desktop--large {
                    margin-top: scaling(60);
                }

                @include desktop {
                    margin-top: scaling(40);
                }

                @include tablet {
                    margin-top: scaling(40);
                }
            }
        }

        &::v-deep h3 {
            font-size: scaling(18);
            line-height: $lh-160;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            font-weight: $fw-medium;
            font-family: $family-graphic;

            @include desktop--large {
                font-size: scaling(28);
                line-height: $lh-170;
            }

            @include desktop {
                font-size: scaling(22);
                line-height: $lh-170;
            }

            @include desktop--small {
                line-height: $lh-170;
            }

            @include mobile {
                font-size: scaling(14);
            }

            &:not(:first-child) {
                margin-top: scaling(32);

                @include desktop--small {
                    margin-top: scaling(26);
                }

                @include laptop {
                    margin-top: scaling(22);
                }

                @include tablet {
                    margin-top: scaling(22);
                }

                @include mobile {
                    margin-top: scaling(17);
                }
            }
        }

        &::v-deep p {
            font-size: scaling(18);
            line-height: $lh-160;
            font-family: $family-graphic;

            @include desktop--large {
                font-size: scaling(28);
                line-height: $lh-170;
            }

            @include desktop {
                font-size: scaling(22);
                line-height: $lh-170;
            }

            @include desktop--small {
                line-height: $lh-170;
            }

            @include mobile {
                font-size: scaling(14);
            }

            &:not(:first-child) {
                margin-top: scaling(20);

                @include desktop--small {
                    margin-top: scaling(16);
                }

                @include laptop {
                    margin-top: scaling(12);
                }

                @include tablet {
                    margin-top: scaling(12);
                }

                @include mobile {
                    margin-top: scaling(8);
                }
            }
        }

        &::v-deep a {
            display: inline-flex;
            color: $c-red;
            transition: color $d-hover ease-in-out;

            @include hover {
                &:hover {
                    color: $c-black;
                }
            }
        }

        &::v-deep b {
            font-weight: $fw-semiBold;
        }
    }
}
</style>
