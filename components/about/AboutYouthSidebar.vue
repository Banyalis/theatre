<template>
    <div class="AboutYouthSidebar">
        <div class="AboutYouthSidebar-image">
            <picture>
                <source
                    :srcset="sidebar.image + ' 1x, ' + sidebar.image2x + ' 2x'"
                />
                <img :src="sidebar.image" alt="" />
            </picture>
        </div>
        <div class="AboutYouthSidebar-inner">
            <div
                class="AboutYouthSidebar-title"
                v-text="`Как стать участником?`"
            ></div>
            <div
                class="AboutYouthSidebar-steps"
                :class="{ isEven: sidebar.steps.length % 2 === 0 }"
            >
                <div class="AboutYouthSidebar-stepsInner">
                    <div
                        v-for="(item, index) in sidebar.steps"
                        :key="index"
                        class="AboutYouthSidebar-stepsItem"
                    >
                        <div
                            class="AboutYouthSidebar-stepsItemNumber"
                            v-text="index + 1"
                        ></div>
                        <!-- eslint-disable -->
                        <div
                            class="AboutYouthSidebar-stepsItemTitle"
                            v-html="item.title"
                        ></div>
                        <!-- eslint-enable -->
                    </div>
                </div>
                <RoundedButton
                    v-if="sidebar.button.title"
                    :link="{
                        url: sidebar.button.url ? sidebar.button.url : '/',
                        title: sidebar.button.title
                    }"
                    type="isRed"
                    class="AboutYouthSidebar-button"
                />
            </div>
            <div class="AboutYouthSidebar-demand">
                <div
                    v-for="(item, index) in sidebar.demand"
                    :key="index"
                    class="AboutYouthSidebar-demandItem"
                >
                    <div
                        class="AboutYouthSidebar-demandItemTitle"
                        v-text="item.title"
                    ></div>
                    <!-- eslint-disable -->
                    <div
                        v-if="item.content"
                        class="AboutYouthSidebar-demandItemText"
                        v-html="item.content"
                    ></div>
                    <ul
                        v-if="item.listening"
                        class="AboutYouthSidebar-demandItemListening"
                        :class="{ isEven: item.listening.length % 2 === 0 }"
                    >
                        <li
                            v-for="(
                                listeningItem, listeningIndex
                            ) in item.listening"
                            :key="listeningIndex"
                            class="AboutYouthSidebar-demandItemListeningItem"
                        >
                            <div
                                class="
                                    AboutYouthSidebar-demandItemListeningItemTitle
                                "
                                v-text="listeningItem.title"
                            ></div>
                            <div
                                class="
                                    AboutYouthSidebar-demandItemListeningItemText
                                "
                                v-html="listeningItem.content"
                            ></div>
                            <div
                                v-if="listeningItem.hint"
                                class="
                                    AboutYouthSidebar-demandItemListeningItemHint
                                "
                            >
                                <div
                                    class="
                                        AboutYouthSidebar-demandItemListeningItemHintIcon
                                    "
                                >
                                    <svg-icon name="icon-hint" />
                                </div>
                                <div
                                    class="
                                        AboutYouthSidebar-demandItemListeningItemHintText
                                    "
                                    v-html="sidebar.hint"
                                ></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="sidebar.hint" class="AboutYouthSidebar-hint">
                <div class="AboutYouthSidebar-hintIcon">
                    <svg-icon name="icon-hint" />
                </div>
                <div
                    class="AboutYouthSidebar-hintText"
                    v-html="sidebar.hint"
                ></div>
            </div>
            <!-- eslint-enable -->
        </div>
    </div>
</template>

<script>
import RoundedButton from '@/components/other/RoundedButton';

export default {
    name: 'AboutYouthSidebar',

    components: {
        RoundedButton
    },

    props: {
        sidebar: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
@mixin text {
    font-size: scaling(14);
    line-height: $lh-160;
    font-family: $family-graphic;

    @include desktop--large {
        font-size: scaling(24);
        line-height: $lh-170;
    }

    @include desktop {
        font-size: scaling(18);
    }
}

.AboutYouthSidebar {
    $component: &;

    width: 100%;
    background-color: $c-black--header;
    color: $c-white;

    @include desktop--large {
        width: (640 * 100% / 1920);
    }

    @include desktop {
        width: (480 * 100% / 1440);
    }

    @include desktop--small {
        width: (400 * 100% / 1200);
    }

    @include laptop {
        position: absolute;
        left: 0;
    }

    @include tablet {
        position: absolute;
        left: 0;
    }

    @include mobile {
        position: absolute;
        left: 0;
    }

    &-image {
        @include desktop--large {
            @include m-aspectRatio(640, 1080);
        }

        @include desktop {
            @include m-aspectRatio(480, 900);
        }

        @include desktop--small {
            @include m-aspectRatio(400, 800);
        }

        @include laptop {
            @include m-aspectRatio(960, 400);
        }

        @include tablet {
            @include m-aspectRatio(768, 320);
        }

        @include mobile {
            @include m-aspectRatio(320, 224);
        }

        img {
            @include m-absoluteObjectFit();
        }
    }

    &-inner {
        padding: scaling(40) scaling(16) scaling(64);

        @include desktop--large {
            padding: scaling(64);
        }

        @include desktop {
            padding: scaling(48);
        }

        @include desktop--small {
            padding: scaling(40);
        }

        @include mobile {
            padding: scaling(32) scaling(16) scaling(64);
        }
    }

    &-title {
        font-size: scaling(20);
        line-height: $lh-120;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        text-align: center;
        font-feature-settings: 'ss02' on;

        @include desktop--large {
            font-size: scaling(36);
            line-height: $lh-130;
            letter-spacing: 0;
        }

        @include desktop {
            font-size: scaling(28);
            line-height: $lh-130;
            letter-spacing: 0;
        }

        @include desktop--small {
            font-size: scaling(24);
            line-height: $lh-130;
            letter-spacing: 0;
        }

        @include mobile {
            font-size: scaling(22);
        }
    }

    &-steps {
        display: flex;
        flex-direction: column;
        align-items: center;

        @include desktop--large {
            margin: scaling(80) 0 scaling(120);
        }

        @include desktop {
            margin: scaling(72) 0 scaling(100);
        }

        @include desktop--small {
            margin: scaling(64) 0 scaling(80);
        }

        @include laptop {
            margin: scaling(52) 0 scaling(40);
        }

        @include tablet {
            margin: scaling(48) 0 scaling(40);
        }

        @include mobile {
            margin: scaling(40) 0 scaling(64);
        }

        &Inner {
            width: 100%;

            @include laptop {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-gap: scaling(32);

                #{$component}-steps.isEven & {
                    grid-template-columns: repeat(2, 1fr);
                }
            }

            @include tablet {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-gap: scaling(32);

                #{$component}-steps.isEven & {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
        }

        &Item {
            display: flex;
            align-items: center;

            @include desktop--large {
                flex-direction: column;
            }

            @include desktop {
                flex-direction: column;
            }

            @include desktop--small {
                flex-direction: column;
            }

            &:not(:last-of-type) {
                @include desktop--large {
                    margin-bottom: scaling(32);
                }

                @include desktop {
                    margin-bottom: scaling(24);
                }

                @include desktop--small {
                    margin-bottom: scaling(20);
                }

                @include mobile {
                    margin-bottom: scaling(28);
                }
            }

            &Number {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                width: scaling(29);
                height: scaling(29);
                margin-right: scaling(16);
                border-radius: 100%;
                background-color: $c-gold;
                color: $c-black;
                font-size: scaling(14);
                line-height: $lh-120;
                letter-spacing: 0.05em;
                font-weight: $fw-bold;
                font-feature-settings: 'ss02' on;

                @include desktop--large {
                    width: scaling(40);
                    height: scaling(40);
                    margin: 0 0 scaling(20);
                    font-size: scaling(20);
                }

                @include desktop {
                    width: scaling(34);
                    height: scaling(34);
                    margin: 0 0 scaling(16);
                    font-size: scaling(18);
                }

                @include desktop--small {
                    margin: 0 0 scaling(16);
                }
            }

            &Title {
                @include text;

                @include desktop--large {
                    text-align: center;
                }

                @include desktop {
                    text-align: center;
                }

                @include desktop--small {
                    text-align: center;
                }

                &::v-deep a {
                    color: $c-white;
                    transition: color $d-hover ease-in-out;

                    @include hover {
                        &:hover {
                            color: $c-red;
                        }
                    }
                }
            }
        }
    }

    &-button {
        margin-top: scaling(40);

        @include desktop--large {
            margin-top: scaling(72);
        }

        @include desktop {
            margin-top: scaling(48);
        }

        @include mobile {
            margin-top: scaling(36);
        }

        @include hover {
            &:hover {
                background-color: $c-white !important;
                color: $c-black !important;
            }
        }
    }

    &-demand {
        @include laptop {
            padding-top: scaling(20);
            border-top: 1px solid $c-gray--header;
        }

        @include tablet {
            padding-top: scaling(20);
            border-top: 1px solid $c-gray--header;
        }

        &Item {
            &:not(:last-child) {
                margin-bottom: scaling(52);

                @include desktop--large {
                    margin-bottom: scaling(100);
                }

                @include desktop {
                    margin-bottom: scaling(80);
                }

                @include desktop--small {
                    margin-bottom: scaling(72);
                }

                @include mobile {
                    margin-bottom: scaling(40);
                }
            }

            &Title,
            &ListeningItemTitle {
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

            &Title {
                margin-bottom: scaling(20);

                @include desktop--large {
                    margin-bottom: scaling(32);
                }

                @include desktop {
                    margin-bottom: scaling(24);
                }

                @include laptop {
                    margin-bottom: scaling(16);
                }

                @include tablet {
                    margin-bottom: scaling(16);
                }
            }

            &Text,
            &ListeningItemText,
            &ListeningItemHintText {
                &::v-deep p:not(:first-of-type) {
                    margin-top: scaling(12);

                    @include desktop--large {
                        margin-top: scaling(16);
                    }

                    @include desktop {
                        margin-top: scaling(16);
                    }
                }
            }

            &Text {
                @include text;
            }

            &Listening {
                list-style: none;
                counter-reset: section;

                @include laptop {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-gap: scaling(32);

                    &.isEven {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @include tablet {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-gap: scaling(32);

                    &.isEven {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                &Item {
                    counter-reset: number;

                    &:not(:last-child) {
                        @include desktop--large {
                            margin-bottom: scaling(64);
                        }

                        @include desktop {
                            margin-bottom: scaling(48);
                        }

                        @include desktop--small {
                            margin-bottom: scaling(40);
                        }

                        @include mobile {
                            margin-bottom: scaling(32);
                        }
                    }

                    &Title {
                        margin-bottom: scaling(20);
                        padding-bottom: scaling(8);
                        border-bottom: 1px solid $c-gray--header;
                        color: $c-gold;

                        @include desktop--small {
                            margin-bottom: scaling(16);
                        }

                        @include laptop {
                            margin-bottom: scaling(16);
                        }

                        @include tablet {
                            margin-bottom: scaling(16);
                        }

                        &:before {
                            counter-increment: section;
                            content: counter(section, upper-roman) ' ';
                        }
                    }

                    &Text {
                        @include text;
                    }

                    &Hint {
                        margin-top: scaling(40);
                        padding-top: scaling(16);
                        border-top: 1px solid $c-gray--header;

                        @include desktop--large {
                            margin-top: scaling(64);
                            padding-top: scaling(28);
                        }

                        @include desktop {
                            margin-top: scaling(48);
                            padding-top: scaling(24);
                        }

                        @include laptop {
                            display: none;
                        }

                        @include tablet {
                            display: none;
                        }

                        @include mobile {
                            margin-top: scaling(32);
                        }

                        &Icon {
                            width: scaling(16);
                            height: scaling(16);
                            margin-bottom: scaling(16);

                            @include desktop--large {
                                width: scaling(20);
                                height: scaling(20);
                            }

                            @include desktop {
                                width: scaling(18);
                                height: scaling(18);
                            }

                            @include desktop--small {
                                margin-bottom: scaling(12);
                            }

                            @include laptop {
                                margin-right: scaling(8);
                                margin-bottom: 0;
                            }

                            @include tablet {
                                margin-right: scaling(8);
                                margin-bottom: 0;
                            }

                            @include mobile {
                                margin-bottom: scaling(12);
                            }

                            svg {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        &Text {
                            @include text;
                        }
                    }
                }
            }
        }
    }

    &-hint {
        display: none;
        align-items: center;
        margin-top: scaling(40);
        padding-top: scaling(16);
        border-top: 1px solid $c-gray--header;

        @include laptop {
            display: flex;
        }

        @include tablet {
            display: flex;
        }

        &Icon {
            width: scaling(16);
            height: scaling(16);
            margin-right: scaling(8);

            svg {
                width: 100%;
                height: 100%;
            }
        }

        &Text {
            &::v-deep p {
                @include text;

                &:not(:first-of-type) {
                    margin-top: scaling(12);
                }
            }
        }
    }
}
</style>
