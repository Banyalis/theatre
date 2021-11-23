<template>
    <div
        class="PartnersContent"
        :class="[modifier ? `PartnersContent--${modifier}` : '']"
    >
        <!-- eslint-disable-next-line -->
        <div class="PartnersContent-inner" v-html="content"></div>
    </div>
</template>

<script>
export default {
    name: 'PartnersContent',

    props: {
        content: {
            type: String,
            required: true
        },
        modifier: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" scoped>
.PartnersContent {
    $component: &;

    @include desktop--large {
        padding: scaling(100) scaling(256) scaling(140);
    }

    @include desktop {
        padding: scaling(80) scaling(168) scaling(120);
    }

    @include desktop--small {
        padding: scaling(60) scaling(140) scaling(100);
    }

    @include laptop {
        padding: scaling(52) scaling(192) scaling(92);
    }

    @include tablet {
        padding: scaling(52) scaling(112) scaling(92);
    }

    @include mobile {
        padding: scaling(64) scaling(16) scaling(36);
    }

    &--sponsor {
        @include desktop--large {
            padding: scaling(100) scaling(192) scaling(140);
        }

        @include desktop {
            padding: scaling(80) scaling(120) scaling(120);
        }

        @include desktop--small {
            padding: scaling(60) scaling(100) scaling(100);
        }

        @include mobile {
            padding: scaling(40) scaling(16) scaling(64);
        }
    }

    &-inner {
        &::v-deep h3 {
            margin-bottom: scaling(16);
            font-size: scaling(24);
            line-height: $lh-150;
            letter-spacing: 0.02em;
            font-feature-settings: 'cpsp' on;

            @include desktop--large {
                margin-bottom: scaling(32);
                font-size: scaling(40);
            }

            @include desktop {
                margin-bottom: scaling(24);
                font-size: scaling(32);
            }

            @include desktop--small {
                margin-bottom: scaling(20);
                font-size: scaling(28);
            }

            @include mobile {
                font-size: scaling(20);
                letter-spacing: 0;
            }

            &:not(:first-child) {
                margin-top: scaling(52);

                @include desktop--large {
                    margin-top: scaling(80);
                }

                @include desktop {
                    margin-top: scaling(72);
                }

                @include desktop--small {
                    margin-top: scaling(64);
                }

                @include mobile {
                    margin-top: scaling(40);
                }
            }
        }

        &::v-deep p {
            color: $c-gray--header;
            font-size: scaling(14);
            line-height: $lh-160;
            font-family: $family-graphic;

            @include desktop--large {
                font-size: scaling(20);
                line-height: $lh-170;
            }

            @include desktop {
                font-size: scaling(18);
            }

            &:not(:last-child) {
                margin-bottom: scaling(16);

                @include desktop--large {
                    margin-bottom: scaling(20);
                }

                @include desktop {
                    margin-bottom: scaling(20);
                }
            }
        }

        &::v-deep ul {
            list-style: none;
            counter-reset: item;

            li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: scaling(16) 0;
                border-top: 1px solid $c-gray-80;
                color: $c-gray--header;
                font-size: scaling(14);
                line-height: $lh-160;
                font-family: $family-graphic;

                @include desktop--large {
                    padding: scaling(32) 0;
                    font-size: scaling(20);
                    line-height: $lh-150;
                }

                @include desktop {
                    padding: scaling(24) 0;
                    font-size: scaling(18);
                }

                @include mobile {
                    padding: scaling(12) 0;
                }

                &:after {
                    content: counter(item);
                    counter-increment: item;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    width: scaling(29);
                    height: scaling(29);
                    border: 1px solid $c-black;
                    border-radius: 100%;
                    color: $c-black;
                    font-size: scaling(14);
                    line-height: $lh-120;
                    letter-spacing: 0.05em;
                    font-weight: $fw-bold;
                    font-family: $family-apoc;
                    font-feature-settings: 'ss02' on;

                    @include desktop--large {
                        width: scaling(40);
                        height: scaling(40);
                        margin-left: scaling(344);
                        font-size: scaling(20);
                    }

                    @include desktop {
                        width: scaling(34);
                        height: scaling(34);
                        margin-left: scaling(206);
                        font-size: scaling(18);
                    }

                    @include desktop--small {
                        margin-left: scaling(211);
                    }

                    @include laptop {
                        margin-left: scaling(163);
                    }

                    @include tablet {
                        margin-left: scaling(131);
                    }

                    @include mobile {
                        margin-left: scaling(19);
                    }
                }

                &:last-child {
                    border-bottom: 1px solid $c-gray-80;

                    @include mobile {
                        padding-bottom: 0;
                        border-bottom: none;
                    }
                }
            }
        }
    }
}
</style>
