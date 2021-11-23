<template>
    <nuxt-link
        :to="`/performances/${category}/${slug}`"
        class="SeasonPremierCard b-paddings"
    >
        <div class="SeasonPremierCard-head">
            <div class="SeasonPremierCard-date">
                <div class="SeasonPremierCard-day" v-text="day"></div>
                <div class="SeasonPremierCard-year" v-text="year"></div>
            </div>
            <div
                class="SeasonPremierCard-restrictions"
                v-text="restrictions"
            ></div>
        </div>
        <div class="SeasonPremierCard-body">
            <div class="SeasonPremierCard-caption" v-text="caption"></div>
            <div class="SeasonPremierCard-name" v-text="name"></div>
            <div
                v-if="author"
                class="SeasonPremierCard-author"
                v-text="author"
            ></div>
        </div>
    </nuxt-link>
</template>

<script>
import { DateTime } from 'luxon';

import { mapState } from 'vuex';

export default {
    name: 'SeasonPremierCard',

    props: {
        date: {
            type: String,
            default: ''
        },
        restrictions: {
            type: String,
            default: ''
        },
        caption: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        author: {
            type: String,
            default: ''
        },
        category: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        }
    },

    computed: {
        localeDate() {
            if (this.date) {
                return DateTime.fromISO(this.date, {
                    locale: this.currentLocaleCode
                });
            } else {
                return null;
            }
        },

        day() {
            return this.localeDate?.toFormat('d MMMM');
        },

        year() {
            return this.localeDate?.year;
        },

        ...mapState(['currentLocaleCode'])
    }
};
</script>

<style lang="scss" scoped>
.SeasonPremierCard {
    $component: &;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: scaling(36);
    padding-bottom: scaling(36);
    box-shadow: 0 1px 0 $c-black;

    @include desktop--large {
        @include m-absolute100();
    }

    @include desktop {
        @include m-absolute100();

        padding-top: scaling(32);
        padding-bottom: scaling(32);
    }

    @include desktop--small {
        @include m-absolute100();

        padding-top: scaling(24);
        padding-bottom: scaling(24);
    }

    @include laptop {
        @include m-absolute100();

        padding-top: scaling(20);
        padding-bottom: scaling(20);
    }

    @include tablet {
        flex-direction: row;
        padding-top: scaling(20);
        padding-bottom: scaling(40);
        justify-content: flex-start;
    }

    @include mobile {
        flex-direction: column;
        padding-top: scaling(20);
        padding-bottom: scaling(20);
    }

    @include hover {
        &:hover #{$component}-name {
            color: $c-red;
        }
    }

    &-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;

        @include desktop--large {
            margin-bottom: scaling(140);
        }

        @include desktop {
            margin-bottom: scaling(80);
        }

        @include desktop--small {
            margin-bottom: scaling(50);
        }

        @include laptop {
            margin-bottom: scaling(40);
        }

        @include tablet {
            width: 35%;
        }

        @include mobile {
            width: 100%;
            margin-bottom: scaling(98);
        }
    }

    &-body {
        display: flex;
        flex-direction: column;

        @include tablet {
            max-width: scaling(370);
            padding-right: scaling(20);
        }

        @include mobile {
            padding-right: 0;
            max-width: unset;
            width: 100%;
        }
    }

    &-date {
        display: flex;
        align-items: center;

        @include tablet {
            flex-direction: column;
            align-items: flex-start;
        }
    }

    &-day {
        @include text;

        line-height: 1;
        color: $c-red;
        margin-right: scaling(12);
        display: block;

        @include tablet {
            margin-bottom: scaling(8);
        }
    }

    &-year {
        @include text;

        color: $c-gray;
        line-height: 1;
    }

    &-restrictions {
        @include text;

        color: $c-gray;

        @include tablet {
            position: absolute;
            top: scaling(20);
            right: scaling(16);
        }
    }

    &-caption {
        @include text;

        color: $c-gray;
        margin-bottom: scaling(20);

        @include desktop {
            margin-bottom: scaling(16);
        }

        @include desktop--small {
            margin-bottom: scaling(12);
        }

        @include laptop {
            margin-bottom: scaling(12);
        }

        @include tablet {
            margin-bottom: scaling(12);
        }

        @include mobile {
            margin-bottom: scaling(8);
        }
    }

    &-name {
        @include title;

        color: $c-black;
        transition: color $d-hover ease-in-out;

        @include desktop--large {
            line-height: 1.3;
            letter-spacing: 0.03em;
        }

        @include desktop {
            line-height: 1.3;
            letter-spacing: 0.03em;
        }

        @include desktop--small {
            line-height: 1.3;
            letter-spacing: 0.03em;
        }
    }

    &-author {
        @include text;

        margin-top: scaling(20);
        color: $c-black;

        @include desktop {
            margin-top: scaling(16);
        }

        @include desktop--small {
            margin-top: scaling(12);
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
</style>
