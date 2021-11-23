<template>
    <div class="AboutListeningContent">
        <div class="AboutListeningContent-head b-scaled-paddings">
            <div
                v-if="content.title"
                class="AboutListeningContent-headTitle"
                v-text="content.title"
            ></div>
            <div class="AboutListeningContent-headButton">
                <RoundedButton :title="`Подать заявку`" type="isBlack" />
            </div>
        </div>
        <div class="AboutListeningContent-wrapper">
            <div class="AboutListeningContent-main">
                <div
                    v-if="content.main"
                    class="AboutListeningContent-items b-scaled-paddings"
                >
                    <div
                        v-for="(item, itemIndex) in content.main"
                        :key="itemIndex"
                        class="AboutListeningContent-item"
                        :class="`
                            AboutListeningContent-item--${item.type}`"
                    >
                        <div
                            v-if="item.type === 'h3'"
                            class="AboutListeningContent-h3"
                            v-text="item.text"
                        ></div>
                        <ol
                            v-else-if="item.type === 'olist'"
                            class="AboutListeningContent-olist"
                        >
                            <li
                                v-for="(listItem, listIndex) in item.items"
                                :key="listIndex"
                                class="AboutListeningContent-olistItem"
                                v-text="listItem"
                            ></li>
                        </ol>
                        <div
                            v-if="item.type === 'paragraph'"
                            class="AboutListeningContent-paragraph"
                            v-text="item.text"
                        ></div>
                    </div>
                </div>
                <div
                    v-if="content.results"
                    class="AboutListeningContent-results"
                >
                    <div
                        v-if="content.results.head"
                        class="AboutListeningContent-resultsHead"
                        v-text="content.results.head"
                    ></div>
                    <div
                        class="
                            AboutListeningContent-resultsBody
                            b-scaled-paddings
                        "
                    >
                        <div
                            v-if="content.results.message"
                            class="AboutListeningContent-resultsMessage"
                            v-text="content.results.message"
                        ></div>
                        <div
                            v-if="content.results.winners"
                            class="AboutListeningContent-resultsWinners"
                        >
                            <div
                                v-for="(winner, winnerIndex) in content.results
                                    .winners"
                                :key="winnerIndex"
                                class="AboutListeningContent-resultsWinner"
                                v-text="winner"
                            ></div>
                        </div>
                        <div
                            v-if="content.results.caption"
                            class="AboutListeningContent-resultsCaption"
                            v-text="content.results.caption"
                        ></div>
                    </div>
                </div>
            </div>
            <div v-if="content.cards" class="AboutListeningContent-aside">
                <div class="AboutListeningContent-cards">
                    <div
                        v-for="(card, cardIndex) in content.cards"
                        :key="cardIndex"
                        class="AboutListeningContent-card b-scaled-paddings"
                    >
                        <div
                            v-if="card.head"
                            class="AboutListeningContent-cardHead"
                            v-text="card.head"
                        ></div>
                        <div class="AboutListeningContent-cardBody">
                            <div
                                v-for="(bodyItem, bodyIndex) in card.body"
                                :key="bodyIndex"
                                class="AboutListeningContent-cardBodyItem"
                            >
                                <div
                                    v-if="bodyItem.type === 'text'"
                                    class="AboutListeningContent-cardText"
                                    v-text="bodyItem.text"
                                ></div>
                                <a
                                    v-else-if="bodyItem.type === 'link'"
                                    :href="bodyItem.link"
                                    class="AboutListeningContent-cardLink"
                                    v-text="bodyItem.text"
                                >
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RoundedButton from '@/components/other/RoundedButton';
export default {
    name: 'AboutListeningContent',

    components: { RoundedButton },

    props: {
        content: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutListeningContent {
    display: flex;
    flex-direction: column;

    &-head {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        border-bottom: 1px solid $c-black;

        @include desktop--large {
            padding-top: scaling(120);
            padding-bottom: scaling(48);
        }

        @include desktop {
            padding-top: scaling(100);
            padding-bottom: scaling(36);
        }

        @include desktop--small {
            padding-top: scaling(80);
            padding-bottom: scaling(28);
        }

        @include laptop {
            padding-top: scaling(20);
            padding-bottom: scaling(20);
            display: block;
        }

        @include tablet {
            padding-top: scaling(60);
            padding-bottom: scaling(28);
        }

        @include mobile {
            padding-top: scaling(28);
            padding-bottom: scaling(24);
            display: block;
        }

        &Title {
            @include heading-2;

            @include desktop--large {
                width: (992 * 100%) / 1440;
            }

            @include desktop {
                width: (760 * 100%) / 1080;
            }

            @include desktop--small {
                width: (680 * 100%) / 900;
            }

            @include laptop {
                margin-bottom: scaling(56);
            }

            @include tablet {
                width: (570 * 100%) / 768;
            }

            @include mobile {
                margin-bottom: scaling(36);
            }
        }
    }

    &-wrapper {
        display: flex;
        height: 100%;

        @include mobile {
            flex-direction: column-reverse;
        }
    }

    &-main {
        width: 100%;
        border-right: 1px solid $c-black;

        @include desktop--large {
            width: (960 * 100%) / 1440;
        }

        @include desktop {
            width: (720 * 100%) / 1080;
        }

        @include desktop--small {
            width: (600 * 100%) / 900;
        }

        @include laptop {
            width: (480 * 100%) / 720;
        }

        @include tablet {
            width: (512 * 100%) / 768;
        }

        @include mobile {
            border-right: none;
        }
    }

    &-aside {
        width: 100%;

        @include desktop--large {
            width: (480 * 100%) / 1440;
        }

        @include desktop {
            width: (360 * 100%) / 1080;
        }

        @include desktop--small {
            width: (300 * 100%) / 900;
        }

        @include laptop {
            width: (240 * 100%) / 720;
        }

        @include tablet {
            width: (256 * 100%) / 768;
        }
    }

    &-items {
        padding-top: scaling(24);
        padding-bottom: scaling(60);

        @include desktop--large {
            padding-top: scaling(40);
            padding-bottom: scaling(120);
        }

        @include desktop {
            padding-top: scaling(32);
            padding-bottom: scaling(100);
        }

        @include desktop--small {
            padding-top: scaling(28);
            padding-bottom: scaling(72);
        }

        @include mobile {
            padding-top: scaling(28);
            padding-bottom: scaling(56);
        }
    }

    &-item {
        &--h3 {
            margin: scaling(40) 0 scaling(20);

            &:first-child {
                margin-top: 0;
            }
        }

        &--olist {
            margin: scaling(20) 0;

            &:first-child {
                margin-top: 0;
            }
        }

        &--paragraph {
            margin: scaling(20) 0;

            &:first-child {
                margin-top: 0;
            }
        }
    }

    &-h3 {
        @include heading-3;
    }

    &-olist {
        padding-left: scaling(18);

        &Item {
            @include text;

            padding-left: scaling(23);
            margin-bottom: scaling(8);

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    &-paragraph {
        @include text;
    }

    &-card {
        padding-top: scaling(28);
        padding-bottom: scaling(28);
        border-bottom: 1px solid $c-black;

        &Head {
            @include text;

            color: $c-gray;
            margin-bottom: scaling(40);
        }

        &Body {
            &Item {
                margin-bottom: scaling(8);

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

        &Text {
            @include text;
        }

        &Link {
            @include text;

            color: $c-black;
            display: block;
        }
    }

    &-results {
        background-color: $c-black;

        &Head {
            @include heading-label;

            color: $c-gold--lighten;
            text-align: center;
            border-bottom: 1px solid $c-gray--header;
            margin-bottom: scaling(24);

            @include desktop--large {
                padding: scaling(64) scaling(280) scaling(32);
                margin-bottom: scaling(40);
            }

            @include desktop {
                padding: scaling(48) scaling(210) scaling(24);
                margin-bottom: scaling(36);
            }

            @include desktop--small {
                padding: scaling(40) scaling(150) scaling(20);
                margin-bottom: scaling(28);
            }

            @include laptop {
                padding: scaling(32) scaling(90) scaling(16);
            }

            @include tablet {
                padding: scaling(32) scaling(106) scaling(16);
            }

            @include mobile {
                padding: scaling(32) scaling(10) scaling(16);
            }
        }

        &Body {
            padding-bottom: scaling(24);

            @include desktop--large {
                padding-bottom: scaling(40);
            }

            @include desktop {
                padding-bottom: scaling(36);
            }

            @include desktop--small {
                padding-bottom: scaling(28);
            }
        }

        &Message {
            @include text;

            color: $c-white;
            margin-bottom: scaling(28);
        }

        &Winners {
            display: flex;
            flex-wrap: wrap;

            @include laptop {
                flex-direction: column;
            }

            @include mobile {
                flex-direction: column;
            }
        }

        &Winner {
            color: $c-white;
            line-height: $lh-110;
            font-feature-settings: 'cpsp' on;
            border-bottom: 1px solid $c-gray--header;
            width: 100%;
            margin-bottom: scaling(16);
            padding-bottom: scaling(20);

            &:nth-child(even) {
                margin-right: 0;
            }

            @include desktop--large {
                width: (432 * 100%) / 960;
                margin-right: scaling(32);
                font-size: scaling(32);
                padding-bottom: scaling(24);
                margin-bottom: scaling(20);
            }

            @include desktop {
                width: (324 * 100%) / 720;
                margin-right: scaling(24);
                font-size: scaling(32);
                padding-bottom: scaling(20);
            }

            @include desktop--small {
                width: (270 * 100%) / 600;
                margin-right: scaling(20);
                font-size: scaling(28);
                padding-bottom: scaling(16);
                margin-bottom: scaling(12);
            }

            @include laptop {
                font-size: scaling(24);
            }

            @include tablet {
                width: (232 * 100%) / 512;
                font-size: scaling(24);
                margin-right: scaling(16);
            }

            @include mobile {
                font-size: scaling(20);
                padding-bottom: scaling(16);
            }
        }

        &Caption {
            @include text--caption;

            color: $c-gray;
            width: 100%;
            margin-top: scaling(8);

            @include desktop--large {
                width: (432 * 100%) / 960;
                margin-top: scaling(20);
            }

            @include desktop {
                width: (456 * 100%) / 720;
                margin-top: scaling(20);
            }

            @include desktop--small {
                width: (380 * 100%) / 600;
                margin-top: scaling(26);
            }
        }
    }
}
</style>
