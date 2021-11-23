<template>
    <nuxt-link :to="url" class="SeasonsTextCard b-paddings" :class="{ isBig }">
        <div
            ref="head"
            class="SeasonsTextCard-head"
            :style="{ height: headHeight }"
        >
            <div class="SeasonsTextCard-row">
                <div
                    v-if="date"
                    class="SeasonsTextCard-date"
                    v-text="date"
                ></div>
                <div
                    v-if="restriction"
                    class="SeasonsTextCard-restriction"
                    v-text="restriction"
                ></div>
            </div>
            <div
                v-if="event"
                class="SeasonsTextCard-event"
                v-text="event"
            ></div>
        </div>
        <div class="SeasonsTextCard-body">
            <div
                v-if="caption"
                class="SeasonsTextCard-caption"
                v-text="caption"
            ></div>
            <div
                v-if="title"
                class="SeasonsTextCard-title"
                v-text="title"
            ></div>
            <div
                v-if="description"
                class="SeasonsTextCard-description"
                v-text="description"
            ></div>
        </div>
    </nuxt-link>
</template>

<script>
import { EVENTS } from '@/utils/constants';

export default {
    name: 'SeasonsTextCard',

    model: {
        prop: 'on-update-height',
        event: EVENTS.onUpdateHeight
    },

    props: {
        date: {
            type: String,
            required: true
        },
        restriction: {
            type: String,
            default: ''
        },
        event: {
            type: String,
            default: ''
        },
        caption: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ''
        },
        isBig: {
            type: Boolean,
            default: false
        },
        url: {
            type: String,
            required: true
        },
        headHeight: {
            type: String,
            default: 'auto'
        }
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        onResize() {
            this.getHeightHead();
        },

        getHeightHead() {
            this.$emit(EVENTS.onUpdateHeight, this.$refs.head.scrollHeight);
        }
    }
};
</script>

<style lang="scss">
.SeasonsTextCard {
    $component: &;

    box-shadow: 1px 1px 0 $c-black;
    padding-top: scaling(36);
    padding-bottom: scaling(36);
    color: $c-black;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    width: (100% / 4);

    @include desktop {
        padding-top: scaling(28);
        padding-bottom: scaling(28);
    }

    @include desktop--small {
        padding-top: scaling(24);
        padding-bottom: scaling(24);
    }

    @include laptop {
        padding-top: scaling(20);
        padding-bottom: scaling(20);
    }

    @include tablet {
        padding-top: scaling(20);
        padding-bottom: scaling(20);
        width: (100% / 2);
    }

    @include mobile {
        padding-top: scaling(20);
        padding-bottom: scaling(20);
        width: 100%;
    }

    @include hover {
        &:hover #{$component}-title {
            color: $c-red;
        }
    }

    &-head {
        margin-bottom: scaling(140);

        @include desktop {
            margin-bottom: scaling(120);
        }

        @include desktop--small {
            margin-bottom: scaling(96);
        }

        @include laptop {
            margin-bottom: scaling(64);
        }

        @include tablet {
            margin-bottom: scaling(64);
        }

        @include mobile {
            margin-bottom: scaling(72);
        }
    }

    &-row {
        display: flex;
        justify-content: space-between;
    }

    &-event {
        @include text;

        color: $c-gray;
        max-width: scaling(400);
        margin-top: scaling(12);

        @include desktop {
            max-width: scaling(360);
        }

        @include desktop--small {
            max-width: scaling(300);
        }

        @include laptop {
            max-width: scaling(230);
        }

        @include tablet {
            max-width: scaling(260);
        }

        @include mobile {
            max-width: scaling(230);
        }
    }

    &-date {
        @include text;

        color: $c-red;

        @include desktop--small {
            font-size: scaling(20);
        }
    }

    &-restriction {
        @include text;

        color: $c-gray;
    }

    &-body {
        display: flex;
        flex-direction: column;
    }

    &-caption {
        @include text;

        color: $c-gray;
        margin-bottom: scaling(16);

        @include desktop--small {
            margin-bottom: scaling(8);
        }

        @include laptop {
            margin-bottom: scaling(8);
        }

        @include tablet {
            margin-bottom: scaling(8);
        }

        @include mobile {
            margin-bottom: scaling(8);
        }
    }

    &-title {
        @include title;

        transition: color $d-hover ease-in-out;
    }

    &-description {
        @include text;

        margin-top: scaling(12);
        color: $c-gray;

        @include desktop {
            margin-top: scaling(12);
        }

        @include desktop--small {
            margin-top: scaling(8);
        }

        @include laptop {
            margin-top: scaling(8);
        }

        @include tablet {
            margin-top: scaling(8);
        }

        @include mobile {
            margin-top: scaling(8);
        }
    }

    &.isBig {
        width: (100% / 3);

        @include tablet {
            width: calc(100% / 2);
        }

        @include mobile {
            width: 100%;
        }
    }
}
</style>
