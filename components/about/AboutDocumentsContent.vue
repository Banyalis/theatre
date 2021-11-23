<template>
    <div class="AboutDocumentsContent b-scaled-paddings">
        <div class="AboutDocumentsContent-titleWrapper">
            <div
                v-if="content.title"
                class="AboutDocumentsContent-title"
                v-text="content.title"
            ></div>
        </div>

        <div class="AboutDocumentsContent-inner">
            <div
                v-for="(item, index) in content.items"
                :key="index"
                class="AboutDocumentsContent-item"
                :class="`AboutDocumentsContent-item--${item.type}`"
            >
                <div
                    v-if="item.type === 'h2'"
                    class="AboutDocumentsContent-h2"
                    v-text="item.text"
                ></div>
                <div
                    v-else-if="item.type === 'h3'"
                    class="AboutDocumentsContent-h3"
                    v-text="item.text"
                ></div>
                <!-- eslint-disable -->
                <div
                    v-else-if="item.type === 'paragraph'"
                    class="AboutDocumentsContent-paragraph"
                    v-html="item.text"
                ></div>
                <!-- eslint-enable -->
                <div
                    v-else-if="item.type === 'list'"
                    class="AboutDocumentsContent-list"
                >
                    <div
                        v-if="item.text"
                        class="AboutDocumentsContent-listText"
                        v-text="item.text"
                    ></div>
                    <ul
                        v-if="item.items"
                        class="AboutDocumentsContent-listItems"
                    >
                        <li
                            v-for="(listItem, listIndex) in item.items"
                            :key="listIndex"
                            class="AboutDocumentsContent-listItem"
                        >
                            <!-- eslint-disable -->
                            <div
                                v-if="listItem.type === 'text'"
                                class="AboutDocumentsContent-listItemText"
                                v-html="listItem.text"
                            ></div>
                            <!-- eslint-enable -->
                            <a
                                v-else-if="listItem.type === 'iconLink'"
                                :href="listItem.href"
                                target="_blank"
                                class="AboutDocumentsContent-iconLink"
                            >
                                <div
                                    v-if="listItem.text"
                                    class="AboutDocumentsContent-iconLinkText"
                                    v-text="listItem.text"
                                ></div>
                                <div class="AboutDocumentsContent-iconLinkPic">
                                    <picture>
                                        <img
                                            :src="
                                                '/images/about/documents/icon-' +
                                                listItem.format +
                                                '.svg'
                                            "
                                        />
                                    </picture>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div
                    v-else-if="item.type === 'accordeon'"
                    class="AboutDocumentsContent-accordeon"
                >
                    <div
                        v-for="(accordeonItem, accordeonIndex) in item.items"
                        :key="accordeonIndex"
                        class="AboutDocumentsContent-accordeonItem"
                    >
                        <div
                            class="AboutDocumentsContent-accordeonToggle"
                            @click="toggle(accordeonIndex)"
                        >
                            <div
                                v-if="accordeonItem.head"
                                class="AboutDocumentsContent-accordeonTitle"
                                v-text="accordeonItem.head"
                            ></div>
                            <div
                                class="AboutDocumentsContent-accordeonIcon"
                                :class="{ isActive: active === accordeonIndex }"
                            >
                                <svg
                                    width="14"
                                    height="9"
                                    viewBox="0 0 14 9"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1 1C4 2 7 7 7 7C7 7 10 2 13 1"
                                        stroke-width="1.5"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div
                            v-show="active === accordeonIndex"
                            class="AboutDocumentsContent-accordeonContent"
                        >
                            <div
                                v-for="(
                                    contentItem, contentIndex
                                ) in accordeonItem.body"
                                :key="contentIndex"
                                class="
                                    AboutDocumentsContent-accordeonContentItem
                                "
                            >
                                <div
                                    v-if="contentItem.type === 'text'"
                                    class="AboutDocumentsContent-accordeonText"
                                    v-text="contentItem.text"
                                ></div>
                                <div
                                    v-else-if="
                                        contentItem.type === 'externalLink'
                                    "
                                    class="AboutDocumentsContent-externalLink"
                                >
                                    <a
                                        :href="contentItem.href"
                                        target="_blank"
                                        class="
                                            AboutDocumentsContent-externalLinkHead
                                        "
                                    >
                                        <div
                                            class="
                                                AboutDocumentsContent-externalLinkTitle
                                            "
                                            v-text="contentItem.title"
                                        ></div>
                                        <div
                                            class="
                                                AboutDocumentsContent-externalLinkIcon
                                            "
                                        >
                                            <svg
                                                width="21"
                                                height="20"
                                                viewBox="0 0 21 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M15.6763 4.3645C15.9537 4.64317 15.9537 5.09499 15.6763 5.37366L4.31387 16.791C4.03654 17.0697 3.58689 17.0697 3.30956 16.791C3.03223 16.5123 3.03223 16.0605 3.30956 15.7818L14.672 4.3645C14.9494 4.08583 15.399 4.08583 15.6763 4.3645Z"
                                                    fill="#B11632"
                                                />
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M16.6525 4.35382L17.1016 3L15.7542 3.45127L15.7512 3.45229L15.7397 3.4561L15.6921 3.47168C15.6498 3.48545 15.5866 3.50575 15.5054 3.53127C15.3427 3.58234 15.1077 3.65421 14.8212 3.73649C14.2467 3.90142 13.4712 4.10631 12.6591 4.26951C11.841 4.43393 11.0147 4.55 10.3295 4.55C9.98713 4.55 9.70437 4.5208 9.48694 4.46618C9.26521 4.41048 9.15985 4.34059 9.11593 4.29647L8.11163 5.30563C8.40248 5.59789 8.77835 5.75927 9.14247 5.85074C9.51088 5.94328 9.91858 5.97716 10.3295 5.97716C11.1507 5.97716 12.0819 5.84094 12.9377 5.66897C13.6672 5.52237 14.3629 5.34537 14.9216 5.19049C14.7675 5.75185 14.5913 6.451 14.4454 7.184C14.2743 8.04388 14.1387 8.97959 14.1387 9.8048C14.1387 10.2177 14.1724 10.6273 14.2645 10.9975C14.3556 11.3634 14.5162 11.7411 14.807 12.0334L15.8113 11.0242C15.7674 10.9801 15.6979 10.8742 15.6424 10.6514C15.5881 10.4329 15.559 10.1488 15.559 9.8048C15.559 9.11627 15.6745 8.28595 15.8381 7.46389C16.0006 6.64787 16.2045 5.8687 16.3686 5.29142C16.4505 5.00347 16.522 4.76734 16.5728 4.60392C16.5982 4.52224 16.6185 4.45882 16.6322 4.41626L16.6477 4.36843L16.6514 4.35689L16.6525 4.35382Z"
                                                    fill="#B11632"
                                                />
                                            </svg>
                                        </div>
                                    </a>
                                    <div
                                        class="
                                            AboutDocumentsContent-externalLinkBody
                                        "
                                        v-text="contentItem.body"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-else-if="item.type === 'externalLinks'"
                    class="AboutDocumentsContent-externalLinks"
                >
                    <div
                        v-for="(link, linkIndex) in item.items"
                        :key="linkIndex"
                        class="AboutDocumentsContent-externalLink"
                    >
                        <a
                            :href="link.href"
                            target="_blank"
                            class="AboutDocumentsContent-externalLinkHead"
                        >
                            <div
                                class="AboutDocumentsContent-externalLinkTitle"
                                v-text="link.title"
                            ></div>
                            <div class="AboutDocumentsContent-externalLinkIcon">
                                <svg
                                    width="21"
                                    height="20"
                                    viewBox="0 0 21 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M15.6763 4.3645C15.9537 4.64317 15.9537 5.09499 15.6763 5.37366L4.31387 16.791C4.03654 17.0697 3.58689 17.0697 3.30956 16.791C3.03223 16.5123 3.03223 16.0605 3.30956 15.7818L14.672 4.3645C14.9494 4.08583 15.399 4.08583 15.6763 4.3645Z"
                                        fill="#B11632"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M16.6525 4.35382L17.1016 3L15.7542 3.45127L15.7512 3.45229L15.7397 3.4561L15.6921 3.47168C15.6498 3.48545 15.5866 3.50575 15.5054 3.53127C15.3427 3.58234 15.1077 3.65421 14.8212 3.73649C14.2467 3.90142 13.4712 4.10631 12.6591 4.26951C11.841 4.43393 11.0147 4.55 10.3295 4.55C9.98713 4.55 9.70437 4.5208 9.48694 4.46618C9.26521 4.41048 9.15985 4.34059 9.11593 4.29647L8.11163 5.30563C8.40248 5.59789 8.77835 5.75927 9.14247 5.85074C9.51088 5.94328 9.91858 5.97716 10.3295 5.97716C11.1507 5.97716 12.0819 5.84094 12.9377 5.66897C13.6672 5.52237 14.3629 5.34537 14.9216 5.19049C14.7675 5.75185 14.5913 6.451 14.4454 7.184C14.2743 8.04388 14.1387 8.97959 14.1387 9.8048C14.1387 10.2177 14.1724 10.6273 14.2645 10.9975C14.3556 11.3634 14.5162 11.7411 14.807 12.0334L15.8113 11.0242C15.7674 10.9801 15.6979 10.8742 15.6424 10.6514C15.5881 10.4329 15.559 10.1488 15.559 9.8048C15.559 9.11627 15.6745 8.28595 15.8381 7.46389C16.0006 6.64787 16.2045 5.8687 16.3686 5.29142C16.4505 5.00347 16.522 4.76734 16.5728 4.60392C16.5982 4.52224 16.6185 4.45882 16.6322 4.41626L16.6477 4.36843L16.6514 4.35689L16.6525 4.35382Z"
                                        fill="#B11632"
                                    />
                                </svg>
                            </div>
                        </a>
                        <div
                            class="AboutDocumentsContent-externalLinkBody"
                            v-text="link.body"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutDocumentsContent',

    props: {
        content: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            active: 0
        };
    },

    methods: {
        toggle(itemIndex) {
            this.active === itemIndex
                ? (this.active = null)
                : (this.active = itemIndex);
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutDocumentsContent {
    $component: &;

    width: 100%;
    padding-bottom: scaling(72);

    @include desktop--large {
        padding-bottom: scaling(120);
    }

    @include desktop {
        padding-bottom: scaling(100);
    }

    @include desktop--small {
        padding-bottom: scaling(80);
    }

    @include tablet {
        padding-bottom: scaling(100);
    }

    &-title {
        @include heading-2;

        width: 100%;

        @include desktop--large {
            width: (992 * 100%) / 1440;
        }

        @include desktop {
            width: (744 * 100%) / 1080;
        }

        @include desktop--small {
            width: (620 * 100%) / 900;
        }

        @include laptop {
            width: (496 * 100%) / 720;
        }

        @include tablet {
            width: (544 * 100%) / 768;
        }

        &Wrapper {
            padding: scaling(48) 0;
            border-bottom: 1px solid $c-gray-80;
            margin-bottom: scaling(80);

            @include desktop {
                padding: scaling(36) 0;
                margin-bottom: scaling(72);
            }

            @include desktop--small {
                padding: scaling(32) 0;
                margin-bottom: scaling(68);
            }

            @include laptop {
                padding: scaling(28) 0;
                margin-bottom: scaling(56);
            }

            @include tablet {
                padding: scaling(36) 0;
                margin-bottom: scaling(48);
            }

            @include mobile {
                padding: scaling(28) 0;
                margin-bottom: scaling(44);
            }
        }
    }

    &-inner {
        @include desktop--large {
            padding: 0 scaling(224) scaling(120);
        }

        @include desktop {
            padding: 0 scaling(168) scaling(100);
        }

        @include desktop--small {
            padding: 0 scaling(140) scaling(80);
        }

        @include laptop {
            padding: 0 scaling(64) scaling(72);
        }
    }

    &-item {
        &--h2 {
            margin: scaling(80) 0 scaling(48);

            &:first-of-type {
                margin: scaling(80) 0 scaling(32);
            }

            @include desktop {
                margin: scaling(72) 0 scaling(40);

                &:first-of-type {
                    margin: scaling(72) 0 scaling(28);
                }
            }

            @include desktop--small {
                margin: scaling(64) 0 scaling(24);

                &:first-of-type {
                    margin: scaling(72) 0 scaling(28);
                }
            }

            @include laptop {
                margin: scaling(56) 0 scaling(32);

                &:first-of-type {
                    margin: scaling(56) 0 scaling(24);
                }
            }

            @include tablet {
                margin: scaling(48) 0 scaling(24);

                &:first-of-type {
                    margin: scaling(48) 0 scaling(24);
                }
            }

            @include mobile {
                margin: scaling(44) 0 scaling(32);

                &:first-of-type {
                    margin: scaling(44) 0 scaling(20);
                }
            }
        }

        &--h3 {
            margin: scaling(34) 0 scaling(12);

            @include desktop--large {
                margin: scaling(48) 0 scaling(20);
            }

            @include desktop {
                margin: scaling(40) 0 scaling(16);
            }

            @include desktop--small {
                margin: scaling(36) 0 scaling(12);
            }
        }

        &--paragraph {
            margin: scaling(16) 0;

            @include desktop--large {
                margin: scaling(20) 0;
            }
        }
    }

    &-h2 {
        @include body-4;

        line-height: $lh-130;
    }

    &-h3 {
        @include body-3;

        font-weight: $fw-medium;
    }

    &-paragraph {
        @include text;

        line-height: $lh-170;

        &::v-deep a {
            color: $c-red;
            transition: color $d-hover ease-in-out;

            @include hover {
                &:hover {
                    color: $c-gold;
                }
            }
        }
    }

    &-list {
        &Items {
            list-style: none;
        }

        &Text {
            @include text;

            margin: scaling(32) 0 scaling(16);

            @include desktop--large {
                margin: scaling(48) 0 scaling(20);
            }

            @include desktop {
                margin: scaling(40) 0 scaling(16);
            }

            @include desktop--small {
                margin: scaling(36) 0 scaling(16);
            }
        }

        &Item {
            @include text;

            margin-bottom: scaling(8);
            padding-left: scaling(28);
            position: relative;
            line-height: $lh-140;

            &:last-child {
                margin-bottom: 0;
            }

            @include desktop--large {
                margin-bottom: scaling(12);
                padding-left: scaling(40);
            }

            @include desktop {
                margin-bottom: scaling(10);
                padding-left: scaling(38);
            }

            @include desktop--small {
                margin-bottom: scaling(10);
                padding-left: scaling(38);
            }

            @include mobile {
                margin-bottom: scaling(12);
            }

            &:before {
                content: '';
                position: absolute;
                top: scaling(10);
                left: 0;
                width: scaling(12);
                height: 1px;
                background-color: $c-black;

                @include desktop--large {
                    width: scaling(16);
                }

                @include desktop {
                    width: scaling(16);
                }
            }

            &::v-deep a {
                color: $c-red;
                transition: color $d-hover ease-in-out;

                @include hover {
                    &:hover {
                        color: $c-gold;
                    }
                }
            }
        }
    }

    &-accordeon {
        &Item {
            margin: scaling(32) 0;

            &:last-child {
                margin: 0;
            }

            @include desktop--large {
                margin: scaling(48) 0;
            }

            @include desktop {
                margin: scaling(40) 0;
            }

            @include desktop--small {
                margin: scaling(36) 0;
            }
        }

        &Toggle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: scaling(16);
            border-bottom: 1px solid $c-gray-80;
            cursor: pointer;

            @include desktop--small {
                padding-bottom: scaling(12);
            }

            @include laptop {
                padding-bottom: scaling(8);
            }

            @include tablet {
                padding-bottom: scaling(8);
            }

            @include mobile {
                padding-bottom: scaling(12);
            }
        }

        &Title {
            font-family: 'Graphik LC';
            font-weight: $fw-medium;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: scaling(12);

            @include desktop--large {
                font-size: scaling(20);
            }

            @include desktop {
                font-size: scaling(18);
            }

            @include desktop--small {
                font-size: scaling(16);
            }

            @include laptop {
                font-size: scaling(14);
            }
        }

        &Icon {
            transition: transform 0.2s;

            svg {
                stroke: $c-black;
                width: scaling(20);
                height: scaling(20);
            }

            &.isActive {
                transform: rotate(180deg);
            }
        }

        &Content {
            margin-top: scaling(20);

            &:last-child {
                margin-bottom: 0;
            }

            @include desktop--large {
                margin-top: scaling(28);
            }

            @include desktop {
                margin-top: scaling(24);
            }

            &Item {
                margin-bottom: scaling(24);

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

        &Text {
            @include text;
        }
    }

    &-externalLink {
        margin-bottom: scaling(24);

        &:last-child {
            margin-bottom: 0;
        }

        @include desktop--small {
            margin-bottom: scaling(16);
        }

        @include laptop {
            margin-bottom: scaling(12);
        }

        @include tablet {
            margin-bottom: scaling(12);
        }

        @include mobile {
            margin-bottom: scaling(16);
        }

        &Head {
            display: flex;
            align-items: center;
        }

        &Title {
            @include body-3;

            color: $c-red;
            line-height: $lh-170;
            font-size: scaling(14);
        }

        &Icon {
            margin-left: scaling(8);

            svg {
                width: scaling(20);
                height: scaling(20);
            }
        }

        &Body {
            @include text;

            line-height: $lh-170;
        }
    }

    &-iconLink {
        display: flex;
        margin-bottom: scaling(12);

        @include hover {
            &:hover {
                #{$component}-iconLinkText {
                    color: $c-red;
                }
            }
        }

        &:last-child {
            margin-bottom: 0;
        }

        @include desktop--large {
            margin-bottom: scaling(20);
        }

        @include desktop {
            margin-bottom: scaling(16);
        }

        @include desktop--small {
            margin-bottom: scaling(16);
        }

        &Text {
            @include text;

            line-height: $lh-140;
            color: $c-black;
            flex: 1;
            transition: color $d-hover ease-in-out;
        }

        &Pic {
            margin-left: scaling(9);

            @include desktop--large {
                margin-left: scaling(20);
            }

            @include desktop {
                margin-left: scaling(27);
            }

            @include desktop--small {
                margin-left: scaling(20);
            }

            @include mobile {
                margin-left: scaling(16);
            }

            svg {
                width: scaling(39);
                height: scaling(16);

                @include desktop--large {
                    width: scaling(45);
                    height: scaling(19);
                }

                @include desktop {
                    width: scaling(45);
                    height: scaling(19);
                }
            }

            &.isLink {
                svg {
                    width: scaling(20);
                    height: scaling(20);
                }
            }
        }
    }
}
</style>
