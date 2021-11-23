<template>
    <div class="PersonAbout">
        <!-- eslint-disable -->
        <div
            v-if="about.contentMain"
            class="PersonAbout-contentMain"
            v-html="about.contentMain"
        ></div>
        <div
            v-if="about.contentAddiontal"
            class="PersonAbout-contentAddiontal"
            v-html="about.contentAddiontal"
        ></div>
        <!-- esline-enable -->
    </div>
</template>

<script>
export default {
    name: 'PersonAbout',

    props: {
        about: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.PersonAbout {
    $component: &;

    padding: scaling(24) scaling(16) 0;
    background-color: $c-black--header;

    @include desktop--large {
        padding: scaling(36) scaling(32) 0;
    }

    @include desktop {
        padding: scaling(28) scaling(24) 0;
    }

    @include desktop--small {
        padding: scaling(24) scaling(20) 0;
    }

    @include mobile {
        padding: scaling(20) scaling(16) 0;
    }

    &.isWhite {
        background-color: $c-white;
    }

    &-content {
        &Main {
            &::v-deep p {
                color: $c-white;
                font-size: scaling(18);
                line-height: $lh-170;
                font-family: $family-graphic;

                @include desktop--large {
                    font-size: scaling(28);
                }

                @include desktop {
                    font-size: scaling(22);
                }

                @include laptop {
                    line-height: $lh-160;
                }

                @include tablet {
                    font-size: scaling(16);
                    line-height: $lh-160;
                }

                @include mobile {
                    font-size: scaling(16);
                    line-height: $lh-150;
                }

                #{$component}.isWhite & {
                    color: $c-black;
                }
            }
        }

        &Addiontal {
            @include desktop--large {
                padding: scaling(64) scaling(128) scaling(80);
            }

            @include desktop {
                padding: scaling(48) scaling(96) scaling(60);
            }

            @include desktop--small {
                padding: scaling(40) scaling(60) scaling(50);
            }

            @include laptop {
                padding: scaling(48) scaling(112) scaling(50);
            }

            @include tablet {
                padding: scaling(48) scaling(72) scaling(40);
            }

            @include mobile {
                padding: scaling(36) scaling(16) scaling(40);
            }

            &::v-deep h3 {
                color: $c-white;
                font-size: scaling(12);
                line-height: $lh-160;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                font-weight: $fw-semiBold;
                font-family: $family-graphic;

                &:not(:first-of-type) {
                    margin-top: scaling(48);

                    @include mobile {
                        margin-top: scaling(36);
                    }
                }

                @include desktop--large {
                    font-size: scaling(20);

                    &:not(:first-of-type) {
                        margin-top: scaling(64);
                    }
                }

                @include desktop {
                    font-size: scaling(18);
                    line-height: $lh-140;
                }

                @include desktop--small {
                    font-size: scaling(14);

                    &:not(:first-child) {
                        margin-top: scaling(40);
                    }
                }

                #{$component}.isWhite & {
                    color: $c-black;
                }
            }

            &::v-deep p {
                color: $c-gray;
                font-size: scaling(14);
                line-height: $lh-160;
                font-weight: $fw-normal;
                font-family: $family-graphic;

                @include desktop--large {
                    font-size: scaling(20);
                    line-height: $lh-170;
                }

                @include desktop {
                    font-size: scaling(18);
                }

                #{$component}.isWhite & {
                    color: $c-gray--header;
                }
            }
        }
    }

    &::v-deep p {
        &:not(:first-child) {
            margin-top: scaling(16);

            @include desktop--large {
                margin-top: scaling(20);
            }
        }
    }

    &::v-deep a {
        display: inline-block;
        color: $c-gold--lighten;
        transition: color $d-hover ease-in-out;

        @include hover {
            &:hover {
                color: $c-red;
            }
        }
    }

    &::v-deep b {
        font-weight: $fw-semiBold;
    }
}
</style>
