<template>
    <div class="SeasonHorizontalCard b-paddings" :class="{ isLink: url }">
        <HiddenLink v-if="url" :url="url" />
        <div class="SeasonHorizontalCard-date">
            <div v-if="day" class="SeasonHorizontalCard-day" v-text="day"></div>
            <div
                v-if="time"
                class="SeasonHorizontalCard-time"
                v-text="time"
            ></div>
        </div>
        <div class="SeasonHorizontalCard-content">
            <div
                v-if="caption"
                class="SeasonHorizontalCard-caption"
                v-text="caption"
            ></div>
            <div
                v-if="title"
                class="SeasonHorizontalCard-title"
                v-text="title"
            ></div>
            <!-- eslint-disable -->
            <div
                v-if="musician"
                class="SeasonHorizontalCard-musician"
                v-html="musician"
            ></div>
            <!-- eslint-enable -->
            <div
                v-if="info"
                class="SeasonHorizontalCard-info"
                v-text="info"
            ></div>
        </div>
        <div
            v-if="restriction"
            class="SeasonHorizontalCard-restriction"
            v-text="restriction"
        ></div>
    </div>
</template>

<script>
import HiddenLink from '@/components/common/HiddenLink';

export default {
    name: 'SeasonHorizontalCard',

    components: {
        HiddenLink
    },

    props: {
        day: {
            type: String,
            default: ''
        },
        time: {
            type: String,
            default: ''
        },
        caption: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        musician: {
            type: String,
            default: ''
        },
        info: {
            type: String,
            default: ''
        },
        restriction: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss">
.SeasonHorizontalCard {
    $component: &;

    width: 100%;
    display: flex;
    box-shadow: 0 1px 0 $c-black;
    position: relative;

    @include desktop--large {
        padding-top: scaling(40);
        padding-bottom: scaling(44);
    }

    @include desktop {
        padding-top: scaling(32);
        padding-bottom: scaling(36);
    }

    @include desktop--small {
        padding-top: scaling(28);
        padding-bottom: scaling(32);
    }

    @include laptop {
        padding-top: scaling(40);
        padding-bottom: scaling(44);
    }

    @include tablet {
        padding-top: scaling(32);
        padding-bottom: scaling(36);
    }

    @include mobile {
        flex-direction: column;
        padding-top: scaling(28);
        padding-bottom: scaling(28);
    }

    &.isLink {
        @include hover {
            &:hover #{$component}-title {
                color: $c-red;
            }
        }
    }

    &-date {
        margin-right: scaling(134);
        width: (250 * 100% / 1536);
        display: flex;
        flex-direction: column;

        @include desktop {
            margin-right: scaling(49);
            width: (191 * 100% / 1200);
        }

        @include desktop--small {
            margin-right: scaling(40);
            width: (200 * 100% / 960);
        }

        @include laptop {
            margin-right: scaling(64);
            width: (176 * 100% / 960);
        }

        @include tablet {
            margin-right: scaling(32);
            width: (160 * 100% / 768);
        }

        @include mobile {
            width: 100%;
            margin-right: 0;
            margin-bottom: scaling(40);
        }
    }

    &-content {
        width: (992 * 100% / 1536);
        display: flex;
        flex-direction: column;

        @include desktop {
            width: (840 * 100% / 1200);
        }

        @include desktop--small {
            width: (620 * 100% / 960);
        }

        @include laptop {
            width: (624 * 100% / 960);
        }

        @include tablet {
            width: (480 * 100% / 768);
        }

        @include mobile {
            width: 100%;
        }
    }

    &-day {
        @include text;

        color: $c-red;
        margin-bottom: scaling(4);
        white-space: nowrap;

        @include desktop--large {
            margin-bottom: scaling(8);
        }
    }

    &-time {
        @include text;

        color: $c-gray;
    }

    &-caption {
        @include text;

        color: $c-gray;
        margin-bottom: scaling(12);

        @include desktop--large {
            margin-bottom: scaling(20);
        }

        @include desktop {
            margin-bottom: scaling(16);
        }

        @include mobile {
            margin-bottom: scaling(8);
        }
    }

    &-title {
        @include title;

        color: $c-black--header;
        transition: color $d-hover ease;
        letter-spacing: 0.03em;
        line-height: 1.3;

        @include laptop {
            letter-spacing: 0.03em;
            line-height: 1.3;
        }

        @include tablet {
            letter-spacing: 0.03em;
            line-height: 1.3;
        }

        @include mobile {
            font-size: scaling(20);
            max-width: scaling(500);
            letter-spacing: 0.03em;
            line-height: 1.3;
        }
    }

    &-musician {
        @include text;

        margin-top: scaling(12);
        color: $c-gray;

        @include desktop--large {
            margin-top: scaling(20);
        }

        @include desktop {
            margin-top: scaling(16);
        }

        a {
            position: relative;
            z-index: 4;
            color: $c-red;
            transition: color $d-hover ease-in-out;

            @include hover {
                &:hover {
                    color: $c-black;
                }
            }
        }
    }

    &-info {
        @include text;

        color: $c-gray;
        border-top: 1px solid $c-gray-80;
        margin-top: scaling(24);
        padding-top: scaling(8);

        @include desktop--large {
            margin-top: scaling(40);
            padding-top: scaling(16);
        }

        @include desktop {
            margin-top: scaling(32);
            padding-top: scaling(12);
        }

        @include desktop--small {
            margin-top: scaling(28);
            padding-top: scaling(12);
        }

        @include laptop {
            margin-top: scaling(40);
            padding-top: scaling(9);
        }

        @include tablet {
            margin-top: scaling(32);
            padding-top: scaling(9);
        }

        @include tablet {
            margin-top: scaling(28);
            padding-top: scaling(8);
        }
    }

    &-restriction {
        @include text;

        width: (98 * 100% / 1536);
        text-align: right;
        color: $c-gray;
        margin-left: auto;

        @include desktop {
            width: (72 * 100% / 1200);
        }

        @include desktop--small {
            width: (60 * 100% / 960);
        }

        @include laptop {
            width: (64 * 100% / 960);
        }

        @include tablet {
            width: (64 * 100% / 768);
        }

        @include mobile {
            position: absolute;
            top: scaling(16);
            right: scaling(16);
        }
    }
}
</style>
