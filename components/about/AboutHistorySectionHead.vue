<template>
    <div class="AboutHistorySectionHead" :class="{ isReverse }">
        <div class="AboutHistorySectionHead-image">
            <picture>
                <source :srcset="head.image + ' 1x, ' + head.image2x + ' 2x'" />
                <img :src="head.image" alt="" />
            </picture>
        </div>
        <div class="AboutHistorySectionHead-content">
            <div
                class="AboutHistorySectionHead-title"
                v-text="head.title"
            ></div>
            <div class="AboutHistorySectionHead-contentInner">
                <div class="AboutHistorySectionHead-duration">
                    <div
                        class="AboutHistorySectionHead-durationStart"
                        v-text="head.duration.start"
                    ></div>
                    <div
                        class="AboutHistorySectionHead-durationEnd"
                        v-text="head.duration.end"
                    ></div>
                </div>
                <p class="AboutHistorySectionHead-text" v-text="head.text"></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutHistorySectionHead',

    props: {
        head: {
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
.AboutHistorySectionHead {
    $component: &;

    border-bottom: 1px solid $c-gray--header;

    &-image {
        height: scaling(400);

        @include desktop--large {
            height: scaling(736);
        }

        @include desktop {
            height: scaling(552);
        }

        @include desktop--small {
            height: scaling(460);
        }

        @include mobile {
            height: scaling(320);
        }

        img {
            @include m-objectFit;

            width: 100%;
            height: 100%;
        }
    }

    &-content {
        border-top: 1px solid $c-gray--header;
        background-color: $c-black--header;

        &Inner {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-end;

            #{$component}.isReverse & {
                @include desktop--large {
                    flex-direction: row-reverse;
                }

                @include desktop {
                    flex-direction: row-reverse;
                }

                @include desktop--small {
                    flex-direction: row-reverse;
                }
            }
        }
    }

    &-title {
        padding: scaling(32) scaling(16) scaling(120);
        color: $c-gold;
        font-size: scaling(60);
        line-height: $lh-110;
        letter-spacing: 0.02em;
        font-feature-settings: 'ss02' on;

        @include desktop--large {
            padding: scaling(64) scaling(32) scaling(160);
            font-size: scaling(120);
        }

        @include desktop {
            padding: scaling(48) scaling(24) scaling(120);
            font-size: scaling(100);
            letter-spacing: 0;
        }

        @include desktop--small {
            padding: scaling(40) scaling(20) scaling(100);
            font-size: scaling(80);
            letter-spacing: 0;
        }

        @include mobile {
            padding: scaling(32) scaling(16) scaling(80);
            font-size: scaling(36);
        }
    }

    &-duration,
    &-text {
        width: 100%;
        padding: 0 scaling(16) scaling(20);

        @include desktop--large {
            padding: 0 scaling(32) scaling(36);
        }

        @include desktop {
            padding: 0 scaling(24) scaling(28);
        }

        @include desktop--small {
            padding: 0 scaling(20) scaling(24);
        }
    }

    &-duration {
        display: flex;
        align-items: center;

        @include desktop--large {
            width: (480 * 100% / 1600);
        }

        @include desktop {
            width: (360 * 100% / 1200);
        }

        @include desktop--small {
            width: (300 * 100% / 980);
        }

        @include laptop {
            margin-bottom: scaling(8);
        }

        @include tablet {
            margin-bottom: scaling(8);
        }

        &:before {
            content: '';
            order: 2;
            flex-shrink: 0;
            width: scaling(112);
            height: 1px;
            margin: 0 scaling(16);
            background-color: $c-gold;

            @include desktop--large {
                flex: 1;
                margin: 0 scaling(35);
            }

            @include desktop {
                flex: 1;
                margin: 0 scaling(25);
            }

            @include desktop--small {
                flex: 1;
                margin: 0 scaling(20);
            }
        }

        &Start,
        &End {
            color: $c-gold;
            font-size: scaling(12);
            line-height: $lh-160;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-weight: $fw-medium;
            font-family: $family-graphic;

            @include desktop--large {
                font-size: scaling(20);
            }

            @include desktop {
                font-size: scaling(18);
                line-height: $lh-140;
            }

            @include desktop--small {
                font-size: scaling(14);
            }
        }

        &Start {
            order: 1;
        }

        &End {
            order: 3;
        }
    }

    &-text {
        color: $c-white;
        font-size: scaling(18);
        line-height: $lh-170;
        font-family: $family-graphic;

        @include desktop--large {
            width: (1120 * 100% / 1600);
            font-size: scaling(28);
        }

        @include desktop {
            width: (840 * 100% / 1200);
            font-size: scaling(22);
        }

        @include desktop--small {
            width: (680 * 100% / 980);
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
    }
}
</style>
