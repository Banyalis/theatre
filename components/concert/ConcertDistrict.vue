<template>
    <div class="ConcertDistrict">
        <div class="ConcertDistrict-number" v-text="item.district"></div>
        <div
            class="ConcertDistrict-row"
            :class="{ isTwoColumns: item.blocks.length > 1 }"
        >
            <div
                v-for="(block, index) in item.blocks"
                :key="index"
                :class="{ isInline: item.blocks.length > 1 }"
                class="ConcertDistrict-block"
            >
                <div class="ConcertDistrict-title" v-text="block.name"></div>
                <div
                    v-if="block.description"
                    class="ConcertDistrict-description"
                    v-text="block.description"
                ></div>
                <div
                    v-if="block.list"
                    class="ConcertDistrict-list"
                    :class="{
                        isTwoColumns:
                            item.blocks.length === 1 && block.list.length > 5
                    }"
                >
                    <div
                        v-for="(listItem, listIndex) in block.list"
                        :key="listIndex"
                        class="ConcertDistrict-item"
                        :class="{
                            noOffset: block.offset,
                            noInline: block.list.length < 6,
                            noNumbers: !listItem.number
                        }"
                    >
                        <div
                            v-if="listItem.number"
                            class="ConcertDistrict-itemNumber"
                            v-text="listItem.number"
                        ></div>
                        <div
                            v-if="listItem.title"
                            class="ConcertDistrict-itemTitle"
                            v-text="listItem.title"
                        ></div>
                        <!-- eslint-disable -->
                        <div
                            v-if="listItem.description"
                            class="ConcertDistrict-itemDescription"
                            v-html="listItem.description"
                        ></div>
                        <!-- eslint-enable -->
                        <div
                            v-for="(
                                artistGroup, groupIndex
                            ) in listItem.artistGroups"
                            :key="groupIndex"
                            class="ConcertDistrict-itemArtistsGroup"
                        >
                            <div
                                v-for="(
                                    artist, artistIndex
                                ) in artistGroup.artists"
                                :key="artistIndex"
                                class="ConcertDistrict-itemArtist"
                            >
                                <div
                                    class="ConcertDistrict-itemArtistName"
                                    v-text="artist.name"
                                ></div>
                                <div
                                    v-if="artist.date"
                                    class="ConcertDistrict-itemArtistDate"
                                    v-text="artist.date"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-if="block.roles"
                    class="ConcertDistrict-roles"
                    :class="{ isTwoColumns: item.blocks.length === 1 }"
                >
                    <div
                        v-for="(role, roleIndex) in block.roles"
                        :key="roleIndex"
                        class="ConcertDistrict-role"
                    >
                        <div
                            class="ConcertDistrict-roleDescription"
                            v-text="role.description"
                        ></div>
                        <div class="ConcertDistrict-roleArtists">
                            <div
                                v-for="(artist, artistIndex) in role.artists"
                                :key="artistIndex"
                                class="ConcertDistrict-roleArtist"
                                v-text="artist"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ConcertDistrict',

    props: {
        item: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.ConcertDistrict {
    $component: &;

    &-number {
        @include text--caption;

        text-transform: uppercase;
        border-bottom: 1px solid $c-gray-80;
        padding-bottom: scaling(8);
        margin-bottom: scaling(40);
        font-weight: $fw-medium;

        @include desktop--large {
            padding-bottom: scaling(20);
            margin-bottom: scaling(64);
        }

        @include desktop {
            padding-bottom: scaling(16);
            margin-bottom: scaling(48);
        }

        @include desktop--small {
            padding-bottom: scaling(12);
            margin-bottom: scaling(44);
        }
    }

    &-title {
        @include title;

        margin-bottom: scaling(8);

        @include mobile {
            font-size: scaling(20);
        }
    }

    &-description {
        @include text--caption;

        margin-bottom: scaling(28);

        @include desktop--large {
            margin-bottom: scaling(40);
        }

        @include desktop {
            margin-bottom: scaling(36);
        }

        @include desktop--small {
            margin-bottom: scaling(32);
            max-width: scaling(440);
        }
    }

    &-row {
        @include desktop--small {
            &.isTwoColumns {
                column-count: 2;
            }
        }

        @include laptop {
            &.isTwoColumns {
                column-count: 2;
            }
        }
    }

    &-block {
        margin-bottom: scaling(40);

        &:last-child {
            margin-bottom: 0;
        }

        &.isInline {
            @include desktop--small {
                display: inline-block;
            }

            @include laptop {
                display: inline-block;
            }
        }

        @include desktop--large {
            margin-bottom: scaling(64);
        }

        @include desktop {
            margin-bottom: scaling(48);
        }

        @include desktop--small {
            margin-bottom: scaling(44);
        }
    }

    &-list {
        &.isTwoColumns {
            @include desktop--small {
                column-count: 2;
            }

            @include laptop {
                column-count: 2;
            }
        }
    }

    &-item {
        position: relative;
        margin-bottom: scaling(28);
        padding-left: scaling(64);

        &:last-child {
            margin-bottom: 0;
        }

        &.noInline {
            display: block;
        }

        &.noNumbers {
            padding-left: 0;
        }

        @include desktop--small {
            margin-bottom: scaling(24);
            padding-left: scaling(40);
            width: 100%;
            display: inline-block;
        }

        @include laptop {
            margin-bottom: scaling(24);
            padding-left: scaling(32);
            display: inline-block;
        }

        @include tablet {
            margin-bottom: scaling(14);
            padding-left: scaling(36);
        }

        @include mobile {
            padding-left: scaling(32);
        }

        &Number {
            @include text;

            position: absolute;
            top: 0;
            left: 0;
        }

        &Title {
            @include text;
        }

        &Description {
            @include text--caption;

            margin: scaling(4) 0 scaling(12);
        }

        &ArtistsGroup {
            margin: scaling(12) 0;

            @include mobile {
                margin-bottom: scaling(8);
            }

            &:last-child {
                margin-bottom: 0;
            }
        }

        &Artist {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            margin-bottom: scaling(4);

            &:last-child {
                margin-bottom: 0;
            }

            @include desktop--small {
                flex-direction: column;
                align-items: flex-start;
            }

            @include mobile {
                flex-direction: column;
                align-items: flex-start;
            }

            &Name {
                @include text--caption;

                margin-right: scaling(12);
                color: $c-gray;
                font-size: scaling(14);

                @include desktop--large {
                    font-size: scaling(16);
                }

                @include desktop--small {
                    margin-right: 0;
                }

                @include tablet {
                    margin-right: scaling(8);
                }

                @include mobile {
                    margin-right: 0;
                }

                &:nth-child(4n) {
                }
            }

            &Date {
                @include caption-1;

                color: $c-red;
            }
        }

        &.noOffset {
            padding-left: 0;
        }
    }

    &-roles {
        margin-top: scaling(28);

        &.isTwoColumns {
            @include desktop--small {
                column-count: 2;
            }

            @include laptop {
                column-count: 2;
            }
        }

        @include desktop--large {
            margin-top: scaling(32);
        }
    }

    &-role {
        margin-bottom: scaling(12);

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
            display: inline-block;
            width: 100%;
        }

        @include laptop {
            display: inline-block;
            width: 100%;
        }

        &Description {
            @include text--caption;

            color: $c-gray;
            margin-bottom: scaling(4);
            max-width: scaling(308);

            @include desktop {
                max-width: scaling(312);
            }

            @include desktop--small {
                max-width: scaling(480);
            }

            @include laptop {
                max-width: scaling(354);
            }

            @include tablet {
                max-width: scaling(256);
            }

            @include mobile {
                max-width: scaling(256);
            }
        }

        &Artist {
            @include text;

            color: $c-gray;
            margin-bottom: scaling(4);

            &:last-child {
                margin-bottom: 0;
            }

            @include desktop--large {
                font-size: scaling(16);
            }

            @include desktop {
                font-size: scaling(16);
            }
        }
    }
}
</style>
