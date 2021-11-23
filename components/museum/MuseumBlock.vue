<template>
    <div class="MuseumBlock">
        <div class="MuseumBlock-aside b-scaled-paddings">
            <div v-if="block.date" class="MuseumBlock-date">
                <div
                    v-if="block.date.title"
                    class="MuseumBlock-dateTitle"
                    v-text="block.date.title"
                ></div>
                <div
                    v-if="block.date.caption"
                    class="MuseumBlock-dateCaption"
                    v-text="block.date.caption"
                ></div>
            </div>
            <div v-if="block.persons" class="MuseumBlock-persons">
                <div
                    v-for="(person, personIndex) in block.persons"
                    :key="personIndex"
                    class="MuseumBlock-person"
                >
                    <div
                        v-if="person.image || person.image2x"
                        class="MuseumBlock-personPicture"
                    >
                        <picture>
                            <source
                                :srcset="
                                    person.image +
                                    ' 1x, ' +
                                    person.image2x +
                                    ' 2x'
                                "
                            />
                            <img
                                class="MuseumBlock-personImage"
                                :src="person.image"
                                alt=""
                            />
                        </picture>
                    </div>
                    <div
                        v-if="person.name"
                        class="MuseumBlock-personName"
                        v-text="person.name"
                    ></div>
                    <div
                        v-if="person.caption"
                        class="MuseumBlock-personCaption"
                        v-text="person.caption"
                    ></div>
                </div>
            </div>
        </div>
        <div class="MuseumBlock-main">
            <div
                v-if="block.title"
                class="MuseumBlock-title b-scaled-paddings"
                v-text="block.title"
            ></div>
            <div
                v-if="block.description"
                class="MuseumBlock-description b-scaled-paddings"
                v-text="block.description"
            ></div>
            <div class="MuseumBlock-content">
                <div
                    v-for="(item, index) in block.items"
                    :key="index"
                    class="MuseumBlock-item"
                >
                    <div
                        v-if="item.title"
                        class="MuseumBlock-itemTitle MuseumBlock-container"
                        v-text="item.title"
                    ></div>
                    <div
                        v-if="item.paragraphs"
                        class="MuseumBlock-itemParagraphs MuseumBlock-container"
                    >
                        <div
                            v-for="(
                                paragraph, paragraphIndex
                            ) in item.paragraphs"
                            :key="paragraphIndex"
                            class="MuseumBlock-paragraph"
                        >
                            <div
                                class="MuseumBlock-paragraphText"
                                v-text="paragraph.text"
                            ></div>
                            <div
                                v-if="paragraph.insertions"
                                class="MuseumBlock-paragraphInsertions"
                            >
                                <div
                                    v-for="(
                                        insertion, insertionIndex
                                    ) in paragraph.insertions"
                                    :key="insertionIndex"
                                    class="MuseumBlock-insertion"
                                >
                                    <div class="MuseumBlock-insertionHead">
                                        <div
                                            v-if="
                                                insertion.image ||
                                                insertion.image2x
                                            "
                                            class="MuseumBlock-insertionPicture"
                                        >
                                            <picture>
                                                <source
                                                    :srcset="
                                                        insertion.image +
                                                        ' 1x, ' +
                                                        insertion.image2x +
                                                        ' 2x'
                                                    "
                                                />
                                                <img
                                                    class="
                                                        MuseumBlock-insertionImage
                                                    "
                                                    :src="insertion.image"
                                                    alt=""
                                                />
                                            </picture>
                                        </div>
                                        <div
                                            class="MuseumBlock-insertionTitle"
                                            v-text="insertion.title"
                                        ></div>
                                    </div>
                                    <div
                                        class="MuseumBlock-insertionDescription"
                                        v-text="insertion.caption"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="item.gallery"
                        class="MuseumBlock-itemPictureWrapper"
                    >
                        <div
                            class="MuseumBlock-itemPicture"
                            :class="{ isSmall: item.gallery.small }"
                        >
                            <picture>
                                <source
                                    :srcset="
                                        item.gallery.image +
                                        ' 1x, ' +
                                        item.gallery.image2x +
                                        ' 2x'
                                    "
                                />
                                <img
                                    class="MuseumBlock-itemImage"
                                    :src="item.gallery.image"
                                    alt=""
                                />
                            </picture>
                        </div>
                        <div
                            v-if="
                                item.gallery.captionTitle ||
                                item.gallery.captionDescription
                            "
                            class="
                                MuseumBlock-itemCaption MuseumBlock-container
                            "
                        >
                            <div
                                v-if="item.gallery.captionTitle"
                                class="MuseumBlock-itemCaptionTitle"
                                v-text="item.gallery.captionTitle"
                            ></div>
                            <div
                                v-if="item.gallery.captionDescription"
                                class="MuseumBlock-itemCaptionDescription"
                                v-text="item.gallery.captionDescription"
                            ></div>
                        </div>
                    </div>
                    <div v-if="item.slider" class="MuseumBlock-itemSlider">
                        <CommonGallery
                            :gallery="item.slider.slides"
                            :theme="'isBlack'"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommonGallery from '~/components/common/CommonGallery';

export default {
    name: 'MuseumBlock',
    components: { CommonGallery },
    props: {
        block: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.MuseumBlock {
    $component: &;

    display: flex;

    &-container {
        width: 100%;
        margin-left: auto;
        margin-right: auto;

        @include desktop--large {
            max-width: scaling(928);
        }

        @include desktop {
            max-width: scaling(744);
        }

        @include desktop--small {
            max-width: scaling(620);
        }

        @include laptop {
            max-width: scaling(576);
        }

        @include tablet {
            max-width: scaling(544);
        }

        @include mobile {
            padding: 0 scaling(16);
        }
    }

    &-aside {
        background-color: $c-gold--lighten;
        border-right: 1px solid $c-black;
        padding-top: scaling(80);
        display: none;

        @include desktop--large {
            width: (480 * 100%) / 1920;
            display: block;
        }

        @include desktop {
            width: (360 * 100%) / 1440;
            display: block;
        }

        @include desktop--small {
            width: (300 * 100%) / 1200;
            display: block;
        }
    }

    &-main {
        padding-top: scaling(32);
        padding-bottom: scaling(72);
        width: 100%;
        box-shadow: 0 1px 0 $c-black;

        @include desktop--large {
            padding-top: scaling(48);
            padding-bottom: scaling(120);
            width: (1440 * 100%) / 1920;
        }

        @include desktop {
            padding-top: scaling(40);
            padding-bottom: scaling(100);
            width: (1080 * 100%) / 1440;
        }

        @include desktop--small {
            padding-top: scaling(36);
            padding-bottom: scaling(80);
            width: (900 * 100%) / 1200;
        }

        @include mobile {
            padding-top: scaling(40);
            padding-bottom: scaling(64);
        }
    }

    &-date {
        padding-bottom: scaling(40);
        border-bottom: 1px solid rgba(90, 74, 50, 0.5);
        margin-bottom: scaling(200);

        @include desktop {
            padding-bottom: scaling(32);
            margin-bottom: scaling(180);
        }

        @include desktop--small {
            padding-bottom: scaling(28);
            margin-bottom: scaling(160);
        }

        &Title {
            @include text;

            text-align: center;
            margin-bottom: scaling(20);
            letter-spacing: 0.05em;

            @include desktop {
                margin-bottom: scaling(24);
            }
        }

        &Caption {
            text-align: center;
            font-size: scaling(32);
            color: $c-white;

            @include desktop {
                font-size: scaling(26);
            }

            @include desktop--small {
                font-size: scaling(20);
            }
        }
    }

    &-person {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: scaling(40);
        border-bottom: 1px solid rgba(90, 74, 50, 0.5);

        @include desktop {
            padding-bottom: scaling(32);
        }

        @include desktop--small {
            padding-bottom: scaling(28);
        }

        &Picture {
            width: scaling(160);
            height: scaling(160);
            border-radius: 50%;
            overflow: hidden;
            padding: scaling(6);
            border: 1px solid $c-black;
            display: flex;
            margin-bottom: scaling(44);

            @include desktop {
                width: scaling(128);
                height: scaling(128);
                margin-bottom: scaling(40);
            }

            @include desktop--small {
                width: scaling(112);
                height: scaling(112);
                margin-bottom: scaling(36);
            }
        }

        &Image {
            @include m-objectFit(cover, center);

            width: 100%;
            height: 100%;
            border-radius: 50%;
        }

        &Name {
            margin-bottom: scaling(32);
            text-align: center;
            font-size: scaling(40);
            color: $c-white;
            word-spacing: scaling(999);

            @include desktop {
                font-size: scaling(32);
                margin-bottom: scaling(28);
            }

            @include desktop--small {
                font-size: scaling(28);
                margin-bottom: scaling(28);
            }
        }

        &Caption {
            @include text;

            text-align: center;
            line-height: $lh-150;
            max-width: scaling(384);
            color: #5a4a32;

            @include desktop {
                max-width: scaling(312);
            }

            @include desktop--small {
                max-width: scaling(260);
            }
        }
    }

    &-title {
        @include title;

        margin-bottom: scaling(24);

        @include desktop {
            margin-bottom: scaling(20);
        }

        @include desktop--small {
            margin-bottom: scaling(20);
        }

        @include laptop {
            margin-bottom: scaling(16);
        }

        @include tablet {
            margin-bottom: scaling(16);
        }

        @include mobile {
            margin-bottom: scaling(36);
            font-size: scaling(20);
        }
    }

    &-description {
        @include body-1;

        margin-bottom: scaling(80);

        @include desktop {
            margin-bottom: scaling(72);
        }

        @include desktop--small {
            margin-bottom: scaling(64);
        }

        @include laptop {
            margin-bottom: scaling(52);
        }

        @include tablet {
            margin-bottom: scaling(52);
        }

        @include mobile {
            margin-bottom: scaling(32);
        }
    }

    &-item {
        margin-bottom: scaling(80);
        display: flex;
        flex-direction: column;

        &:last-child {
            margin-bottom: 0;
        }

        @include desktop {
            margin-bottom: scaling(72);
        }

        @include desktop--small {
            margin-bottom: scaling(64);
        }

        @include laptop {
            margin-bottom: scaling(52);
        }

        @include tablet {
            margin-bottom: scaling(52);
        }

        @include mobile {
            margin-bottom: scaling(40);
        }

        &Title {
            @include body-4;

            margin-bottom: scaling(16);

            @include desktop--large {
                margin-bottom: scaling(32);
            }

            @include desktop {
                margin-bottom: scaling(24);
            }

            @include desktop--small {
                margin-bottom: scaling(20);
            }
        }

        &Picture {
            margin-top: scaling(120);
            width: 100%;
            height: scaling(610);

            @include desktop {
                margin-top: scaling(100);
                height: scaling(456);
            }

            @include desktop--small {
                margin-top: scaling(80);
                height: scaling(380);
            }

            @include laptop {
                margin-top: scaling(72);
                height: scaling(400);
            }

            @include tablet {
                margin-top: scaling(72);
                height: scaling(320);
            }

            @include mobile {
                margin-top: scaling(64);
                height: scaling(148);
            }

            &.isSmall {
                height: scaling(654);
                margin-top: scaling(64);
                width: 100%;
                margin-left: auto;
                margin-right: auto;

                @include desktop--large {
                    max-width: scaling(928);
                }

                @include desktop {
                    margin-top: scaling(52);
                    height: scaling(538);
                    max-width: scaling(744);
                }

                @include desktop--small {
                    margin-top: scaling(48);
                    height: scaling(460);
                    max-width: scaling(620);
                }

                @include laptop {
                    margin-top: scaling(32);
                    height: scaling(415);
                    max-width: scaling(576);
                }

                @include tablet {
                    margin-top: scaling(32);
                    height: scaling(384);
                    max-width: scaling(544);
                }

                @include mobile {
                    margin-top: scaling(32);
                    height: scaling(202);
                    padding: 0 scaling(16);
                }
            }
        }

        &Image {
            @include m-objectFit(cover, center);

            width: 100%;
            height: 100%;
        }

        &Caption {
            margin-top: scaling(20);

            @include desktop--large {
                margin-top: scaling(32);
            }

            @include desktop {
                margin-top: scaling(24);
            }

            @include mobile {
                margin-top: scaling(16);
            }

            &Title {
                @include text;
            }

            &Description {
                @include text--caption;

                margin-top: scaling(4);
                color: $c-gray--header;
                opacity: 0.4;

                @include desktop--large {
                    margin-top: scaling(8);
                }
            }
        }

        &Slider {
            margin-top: scaling(120);

            @include desktop {
                margin-top: scaling(100);
            }

            @include desktop--small {
                margin-top: scaling(80);
            }

            @include laptop {
                margin-top: scaling(72);
            }

            @include tablet {
                margin-top: scaling(72);
            }

            @include mobile {
                margin-top: scaling(64);
            }
        }
    }

    &-paragraph {
        &:last-child {
            #{$component}-paragraphText {
                margin-bottom: 0;
            }
        }

        &Text {
            @include text;

            line-height: 1.6;
            margin-bottom: scaling(16);
            color: $c-gray--header;

            &:empty {
                margin-bottom: 0;
            }

            @include desktop--large {
                margin-bottom: scaling(20);
                line-height: 1.7;
            }

            @include desktop {
                margin-bottom: scaling(20);
            }
        }

        &Insertions {
            margin: scaling(32) 0;
            padding: scaling(20) 0;
            border-top: 1px solid $c-gray-80;
            border-bottom: 1px solid $c-gray-80;
            display: none;

            @include laptop {
                display: block;
            }

            @include tablet {
                display: block;
            }

            @include mobile {
                display: block;
            }
        }
    }

    &-insertion {
        margin-bottom: scaling(20);
        border-bottom: 1px solid $c-gray-80;
        padding-bottom: scaling(20);

        &:last-child {
            margin-bottom: 0;
            border-bottom: none;
            padding-bottom: 0;
        }

        &Head {
            display: flex;
            align-items: center;
            margin-bottom: scaling(8);

            @include laptop {
                margin-bottom: scaling(12);
            }
        }

        &Picture {
            width: scaling(32);
            height: scaling(32);
            margin-right: scaling(16);
            overflow: hidden;
            border-radius: 50%;

            @include mobile {
                margin-right: scaling(12);
            }
        }

        &Image {
            @include m-objectFit();

            width: 100%;
            height: 100%;
        }

        &Title {
            @include heading-3;

            color: $c-gold;
        }

        &Description {
            @include text;

            color: $c-gray;
        }
    }
}
</style>
