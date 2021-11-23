<template>
    <div class="AboutYouthText">
        <!-- eslint-disable-next-line -->
        <div class="AboutYouthText-content" v-html="text"></div>
    </div>
</template>

<script>
export default {
    name: 'AboutYouthText',

    props: {
        text: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutYouthText {
    $component: &;

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

    &-content {
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

            &:not(:first-of-type) {
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
            margin-top: scaling(16);
            color: $c-gray--header;
            font-size: scaling(14);
            line-height: $lh-160;
            font-family: $family-graphic;

            @include desktop--large {
                margin-top: scaling(20);
                font-size: scaling(20);
                line-height: $lh-170;
            }

            @include desktop {
                margin-top: scaling(20);
                font-size: scaling(18);
            }
        }
    }
}
</style>
