<template>
    <div class="GastroliCard">
        <div class="GastroliCard-date b-paddings">
            <div
                v-if="program.days"
                class="GastroliCard-days"
                v-text="program.days"
            ></div>
            <div
                v-if="program.place"
                class="GastroliCard-place"
                v-text="program.place"
            ></div>
        </div>
        <div class="GastroliCard-content">
            <div
                class="GastroliCard-contentInner"
                :class="{ isLink: program.url }"
            >
                <HiddenLink v-if="program.url" :url="program.url" />
                <div
                    class="GastroliCard-row b-paddings"
                    :class="{ noImage: !program.picture }"
                >
                    <div
                        v-if="program.caption"
                        class="GastroliCard-mobileCaption"
                        v-text="program.caption"
                    ></div>
                    <div class="GastroliCard-imageOuter">
                        <div class="GastroliCard-imageInner">
                            <picture v-if="program.picture">
                                <source
                                    :srcset="
                                        program.picture +
                                        ' 1x, ' +
                                        program.picture2x +
                                        ' 2x'
                                    "
                                />
                                <img
                                    class="GastroliCard-image"
                                    :src="program.picture"
                                    alt=""
                                />
                            </picture>
                            <div v-else class="GastroliCard-imageStub">
                                <svg-icon name="icon-stub-arch" />
                            </div>
                        </div>
                    </div>
                    <div class="GastroliCard-info">
                        <div
                            v-if="program.caption"
                            class="GastroliCard-caption"
                            v-text="program.caption"
                        ></div>
                        <div
                            v-if="program.title"
                            class="GastroliCard-title"
                            v-text="program.title"
                        ></div>
                        <div
                            v-if="program.author"
                            class="GastroliCard-author"
                            v-text="program.author"
                        ></div>
                    </div>
                </div>
                <div
                    v-if="program.slides"
                    ref="slider"
                    class="GastroliCard-slider swiper-container"
                >
                    <div class="GastroliCard-controls">
                        <div
                            v-if="program.slides.length > 2"
                            ref="sliderNavigationPrev"
                            class="GastroliCard-controlPrev"
                        >
                            <picture>
                                <img
                                    class="GastroliCard-controlIcon"
                                    src="/images/gastroli/left.svg"
                                    alt=""
                                />
                            </picture>
                        </div>
                        <div
                            v-if="program.slides.length > 2"
                            ref="sliderNavigationNext"
                            class="GastroliCard-controlNext"
                        >
                            <img
                                class="GastroliCard-controlIcon"
                                src="/images/gastroli/right.svg"
                                alt=""
                            />
                        </div>
                    </div>

                    <div class="GastroliCard-aside">
                        <div class="GastroliCard-asideDivider">divider</div>
                        <div
                            v-if="program.roles"
                            class="GastroliCard-asideRoles"
                        >
                            <div
                                v-for="(role, roleIndex) in program.roles"
                                ref="role"
                                :key="roleIndex"
                                class="GastroliCard-asideRole"
                                v-text="role"
                            ></div>
                        </div>
                    </div>

                    <div
                        v-if="program.slides"
                        class="GastroliCard-slides swiper-wrapper"
                    >
                        <div
                            v-for="(slide, slideIndex) in program.slides"
                            ref="slide"
                            :key="slideIndex"
                            class="GastroliCard-slide swiper-slide"
                        >
                            <div
                                class="GastroliCard-slideDay"
                                v-text="slide.day"
                            ></div>
                            <div
                                v-if="slide.actorGroups"
                                class="GastroliCard-slideActors"
                            >
                                <div
                                    v-for="(
                                        group, groupIndex
                                    ) in slide.actorGroups"
                                    ref="actorGroup"
                                    :key="groupIndex"
                                    class="GastroliCard-slideActorsGroup"
                                >
                                    <div
                                        v-for="(
                                            actor, actorIndex
                                        ) in group.actors"
                                        :key="actorIndex"
                                        class="GastroliCard-slideActor"
                                    >
                                        <HiddenLink
                                            v-if="actor.url"
                                            :url="actor.url"
                                        />
                                        {{ actor.name }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="program.table" class="GastroliCard-table b-paddings">
                    <div
                        v-if="program.table.message"
                        class="GastroliCard-message"
                    >
                        <div class="GastroliCard-messageIcon">
                            <svg-icon name="icon-alert" />
                        </div>
                        {{ program.table.message }}
                    </div>
                    <div
                        v-if="program.table.districts"
                        class="GastroliCard-districts"
                    >
                        <div
                            v-for="(district, districtIndex) in program.table
                                .districts"
                            :key="districtIndex"
                            class="GastroliCard-district"
                        >
                            <div
                                v-if="district.number"
                                class="GastroliCard-districtNumber"
                                v-text="district.number"
                            ></div>
                            <div
                                v-if="district.items"
                                class="GastroliCard-districtItems"
                            >
                                <div
                                    v-for="(item, itemIndex) in district.items"
                                    :key="itemIndex"
                                    class="GastroliCard-districtItem"
                                >
                                    <div
                                        v-if="item.title"
                                        class="GastroliCard-districtTitle"
                                        :class="{ isLarge: item.important }"
                                        v-text="item.title"
                                    ></div>
                                    <div
                                        v-if="item.composer"
                                        class="GastroliCard-districtComposer"
                                        v-text="item.composer"
                                    ></div>
                                    <div
                                        v-if="item.artists"
                                        class="GastroliCard-districtArtists"
                                    >
                                        <div
                                            v-for="(
                                                artist, artistIndex
                                            ) in item.artists"
                                            :key="artistIndex"
                                            class="GastroliCard-districtArtist"
                                            v-text="artist"
                                        ></div>
                                    </div>
                                    <div
                                        v-if="item.hint"
                                        class="GastroliCard-districtHint"
                                        v-text="item.hint"
                                    ></div>
                                    <div
                                        v-if="item.groups"
                                        class="GastroliCard-groups"
                                    >
                                        <div
                                            v-for="(
                                                groupItem, groupIndex
                                            ) in item.groups"
                                            :key="groupIndex"
                                            class="GastroliCard-groupsItem"
                                        >
                                            <div
                                                class="
                                                    GastroliCard-groupsItemPosition
                                                "
                                                v-text="
                                                    groupItem.position + ':'
                                                "
                                            ></div>
                                            <div
                                                class="
                                                    GastroliCard-groupsItemList
                                                "
                                            >
                                                <div
                                                    v-for="(
                                                        listItem, listItemIndex
                                                    ) in groupItem.list"
                                                    :key="listItemIndex"
                                                    class="
                                                        GastroliCard-groupsItemListItem
                                                    "
                                                    v-text="listItem.name"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="GastroliCard-participants">
                            <div
                                v-for="(
                                    participant, participantIndex
                                ) in program.table.participants"
                                :key="participantIndex"
                                class="GastroliCard-participantsItem"
                            >
                                <div
                                    class="
                                        GastroliCard-participantsItemPosition
                                    "
                                    v-text="participant.position + ':'"
                                ></div>
                                <div class="GastroliCard-participantsItemList">
                                    <div
                                        v-for="(
                                            listItem, listItemIndex
                                        ) in participant.list"
                                        :key="listItemIndex"
                                        class="
                                            GastroliCard-participantsItemListItem
                                        "
                                        :class="{ isLink: listItem.url }"
                                    >
                                        <HiddenLink
                                            v-if="listItem.url"
                                            :url="listItem.url"
                                        />
                                        <div
                                            v-if="!listItem.hideImage"
                                            class="
                                                GastroliCard-participantsItemListItemImage
                                            "
                                        >
                                            <picture v-if="listItem.image">
                                                <source
                                                    :srcset="
                                                        listItem.image +
                                                        ' 1x, ' +
                                                        listItem.image2x +
                                                        ' 2x'
                                                    "
                                                />
                                                <img
                                                    :src="listItem.image"
                                                    :alt="listItem.name"
                                                />
                                            </picture>
                                            <div
                                                v-else
                                                class="
                                                    GastroliCard-participantsItemListItemImageStub
                                                "
                                            >
                                                <svg-icon
                                                    name="icon-stub-people-mobile"
                                                />
                                            </div>
                                        </div>
                                        <div
                                            class="
                                                GastroliCard-participantsItemListItemInner
                                            "
                                        >
                                            <div
                                                class="
                                                    GastroliCard-participantsItemListItemName
                                                "
                                                v-text="listItem.name"
                                            ></div>
                                            <div
                                                class="
                                                    GastroliCard-participantsItemListItemPosition
                                                "
                                                v-text="listItem.position"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TourPartners
                v-if="program.partners"
                :partners="program.partners"
            />
        </div>
    </div>
</template>

<script>
import { Swiper, Navigation } from 'swiper';
import 'swiper/swiper.scss';
import { isMobile } from '@/utils/utils';
import HiddenLink from '@/components/common/HiddenLink';
import TourPartners from '@/components/gastroli/TourPartners';

Swiper.use(Navigation);

export default {
    name: 'GastroliCard',

    components: {
        HiddenLink,
        TourPartners
    },

    props: {
        program: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            swiper: undefined,
            actorGroups: [],
            actorGroupsLength: 0,
            roles: [],
            rolesLength: 0
        };
    },

    mounted() {
        if (this.$refs.slider) {
            this.initSlider();
        }

        window.addEventListener('resize', this.onResize);
        this.onResize();
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        initSlider() {
            this.swiper = new Swiper(this.$refs.slider, {
                direction: 'horizontal',
                slidesPerView: 4,
                spaceBetween: 32,
                loop: false,
                navigation: {
                    nextEl: this.$refs.sliderNavigationNext,
                    prevEl: this.$refs.sliderNavigationPrev
                },
                breakpoints: {
                    1920: {
                        slidesPerView: 4
                    },
                    960: {
                        slidesPerView: 3
                    },
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 16
                    }
                }
            });

            this.actorGroups = this.$refs.actorGroup;
            this.actorGroupsLength = this.$refs.actorGroup.length;
            this.roles = this.$refs.role;
            this.rolesLength = this.roles.length;
        },

        onResize() {
            this.setRowHeight();
        },

        setRowHeight() {
            for (let i = 0; i < this.rolesLength; i++) {
                const currentRole = this.roles[i];
                currentRole.style.height = '';
                const roleHeight = currentRole.clientHeight;
                let maxHeight = 0;
                const currentRowItems = [];

                for (
                    let j = i;
                    j < this.actorGroupsLength;
                    j += this.rolesLength
                ) {
                    const currentGroup = this.actorGroups[j];

                    currentGroup.style.height = '';
                    const currentHeight = currentGroup.clientHeight;

                    if (maxHeight < currentHeight) maxHeight = currentHeight;

                    currentRowItems.push(currentGroup);
                }

                const heightWithOffset = !isMobile()
                    ? maxHeight
                    : maxHeight + roleHeight;

                currentRole.style.height = `${heightWithOffset}px`;

                currentRowItems.forEach((itemRow) => {
                    itemRow.style.height = `${heightWithOffset}px`;
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.GastroliCard {
    $component: &;

    display: flex;
    border-bottom: 1px solid $c-black;

    &:last-child {
        border-bottom: none;
    }

    @include mobile {
        flex-direction: column;
    }

    &-date {
        width: 100%;
        border-right: 1px solid $c-black;
        padding-top: scaling(20);

        @include desktop--large {
            width: (384 * 100%) / 1920;
            padding-top: scaling(36);
        }

        @include desktop {
            width: (288 * 100%) / 1440;
            padding-top: scaling(28);
        }

        @include desktop--small {
            width: (240 * 100%) / 1200;
            padding-top: scaling(24);
        }

        @include laptop {
            width: (192 * 100%) / 960;
        }

        @include tablet {
            width: (192 * 100%) / 768;
        }

        @include mobile {
            border-right: none;
            border-bottom: 1px solid $c-black;
            padding-bottom: scaling(20);
        }
    }

    &-content {
        width: 100%;
        margin-bottom: -1px;

        @include desktop--large {
            width: (1536 * 100%) / 1920;
        }

        @include desktop {
            width: (1152 * 100%) / 1440;
        }

        @include desktop--small {
            width: (960 * 100%) / 1200;
        }

        @include laptop {
            width: (769 * 100%) / 960;
        }

        @include tablet {
            width: (576 * 100%) / 768;
        }

        &Inner {
            position: relative;

            @include hover {
                &.isLink:hover {
                    #{$component} {
                        &-imageOuter {
                            border-color: $c-red;
                            background-color: $c-red;
                        }
                        &-title {
                            color: $c-red;
                        }
                    }
                }
            }
        }
    }

    &-days {
        @include body-2;

        color: $c-red;
        margin-bottom: scaling(4);
    }

    &-place {
        @include text--caption;

        color: $c-gray;
    }

    &-row {
        display: flex;
        padding-top: scaling(24);
        padding-bottom: scaling(28);
        border-bottom: 1px solid $c-black;

        @include desktop--large {
            padding-top: scaling(32);
            padding-bottom: scaling(36);
        }

        @include desktop--small {
            padding-top: scaling(20);
            padding-bottom: scaling(24);
        }

        @include mobile {
            padding-top: scaling(32);
            padding-bottom: scaling(32);
            flex-direction: column;
            align-items: center;
        }

        &.noImage {
            @include mobile {
                min-height: scaling(560);
                padding-top: scaling(196);
                box-shadow: 0 0 0 0.5px #000;
                border-top-left-radius: scaling(160);
                border-top-right-radius: scaling(160);
                border-bottom: none;

                #{$component}-imageOuter {
                    display: none;
                }

                #{$component}-mobileCaption {
                    margin-bottom: scaling(12);
                }
            }
        }
    }

    &-image {
        &Outer {
            display: flex;
            padding: scaling(4);
            border: 1px solid $c-black;
            border-top-left-radius: scaling(220);
            border-top-right-radius: scaling(220);
            overflow: hidden;
            margin-right: scaling(20);
            transition: border-color $d-hover ease-in-out,
                background-color $d-hover ease-in-out;

            @include desktop--large {
                margin-right: scaling(32);
            }

            @include desktop {
                margin-right: scaling(24);
            }

            @include mobile {
                margin-right: 0;
                margin-bottom: scaling(20);
            }
        }

        &Inner {
            width: scaling(56);
            height: scaling(120);
            border-top-left-radius: scaling(220);
            border-top-right-radius: scaling(220);
            overflow: hidden;
            position: relative;

            @include mobile {
                width: scaling(72);
                height: scaling(152);
            }

            img {
                @include m-absoluteObjectFit();
            }
        }

        &Stub {
            width: 100%;
            height: 100%;

            svg {
                width: 100%;
                height: 100%;
            }
        }
    }

    &-info {
        display: flex;
        flex-direction: column;
        width: 100%;

        @include mobile {
            align-items: center;
        }
    }

    &-caption {
        @include caption-1;

        color: $c-gray;
        margin-bottom: scaling(8);

        @include mobile {
            display: none;
        }
    }

    &-mobileCaption {
        @include caption-1;

        display: none;
        color: $c-gray;
        text-align: center;
        margin-bottom: scaling(57);

        @include mobile {
            display: block;
        }
    }

    &-title {
        @include title;

        transition: color $d-hover ease-in-out;

        @include desktop--large {
            width: (599 * 100%) / 1536;
        }

        @include desktop {
            width: (456 * 100%) / 1152;
        }

        @include desktop--small {
            width: (356 * 100%) / 960;
        }

        @include laptop {
            width: (356 * 100%) / 768;
        }

        @include tablet {
            width: (352 * 100%) / 576;
        }

        @include mobile {
            width: 100%;
            text-align: center;
        }
    }

    &-author {
        @include caption-1;

        color: $c-gray;
        margin-top: auto;

        @include mobile {
            margin-top: scaling(57);
        }
    }

    &-slider {
        position: relative;
        display: flex;
        padding-bottom: scaling(32);
        z-index: 4;

        @include desktop--large {
            padding-bottom: scaling(64);
            padding-left: ((384 + 32) * 100%) / 1536;
        }

        @include desktop {
            padding-bottom: scaling(48);
            padding-left: ((288 + 24) * 100%) / 1152;
        }

        @include desktop--small {
            padding-bottom: scaling(44);
            padding-left: ((240 + 20) * 100%) / 960;
        }

        @include laptop {
            padding-left: ((188 + 20) * 100%) / 768;
        }

        @include tablet {
            padding-left: ((188 + 20) * 100%) / 576;
        }

        @include mobile {
            padding: 0 scaling(16) scaling(40);
        }
    }

    &-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        border-bottom: 1px solid $c-black;
        z-index: $z-hiddenLink;
        min-height: scaling(48);

        @include desktop--large {
            min-height: scaling(64);
        }

        @include desktop--small {
            min-height: scaling(40);
        }
    }

    &-aside {
        z-index: $z-two;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        padding: 0 scaling(16) 0 scaling(20);

        @include desktop--large {
            width: ((384) * 100%) / 1536;
            padding: 0 scaling(64) 0 scaling(32);
        }

        @include desktop {
            width: ((288) * 100%) / 1152;
            padding: 0 scaling(48) 0 scaling(24);
        }

        @include desktop--small {
            width: ((240) * 100%) / 960;
            padding: 0 scaling(40) 0 scaling(20);
        }

        @include laptop {
            width: ((188) * 100%) / 768;
        }

        @include tablet {
            width: ((188) * 100%) / 576;
        }

        @include mobile {
            background-color: transparent;
            width: 100%;
            padding: 0 scaling(16) scaling(20);
        }

        &Divider {
            @include text--caption;

            padding: scaling(18) 0 scaling(14);
            text-transform: uppercase;
            margin-bottom: scaling(20);
            font-weight: 500;
            opacity: 0;

            @include desktop--large {
                padding: scaling(22) 0 scaling(20);
                margin-bottom: scaling(36);
            }

            @include desktop {
                padding: scaling(16) 0 scaling(13);
                margin-bottom: scaling(28);
            }

            @include desktop--small {
                padding: scaling(13) 0 scaling(11);
                margin-bottom: scaling(24);
            }

            @include tablet {
                padding: scaling(16) 0 scaling(16);
            }
        }

        &Role {
            @include text;

            color: $c-gray;
            margin-bottom: scaling(20);

            &:last-child {
                margin-bottom: 0;
            }

            @include mobile {
                margin-bottom: scaling(30);
                white-space: nowrap;
                text-overflow: ellipsis;
                width: 100%;
                overflow: hidden;
                position: relative;

                &:after {
                    content: '';
                    width: 100%;
                    height: 1px;
                    background-color: #efefef;
                    position: absolute;
                    top: scaling(24);
                    left: 0;
                }
            }
        }
    }

    &-control {
        &Prev,
        &Next {
            width: scaling(48);
            height: scaling(48);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 0 1px $c-black;
            cursor: pointer;
            background-color: $c-white;
            position: relative;

            &.swiper-button-disabled {
                pointer-events: none;

                #{$component}-controlIcon {
                    opacity: 0.5;
                }

                @include mobile {
                    visibility: hidden;
                    opacity: 0;
                }
            }

            @include desktop--large {
                width: scaling(64);
                height: scaling(64);
            }

            @include desktop--small {
                width: scaling(40);
                height: scaling(40);
            }
        }
    }

    &-slide {
        &Day {
            @include text--caption;

            padding: scaling(18) 0 scaling(14);
            text-transform: uppercase;
            margin-bottom: scaling(20);
            font-weight: 500;

            @include desktop--large {
                padding: scaling(22) 0 scaling(20);
                margin-bottom: scaling(36);
            }

            @include desktop {
                padding: scaling(16) 0 scaling(13);
                margin-bottom: scaling(28);
            }

            @include desktop--small {
                padding: scaling(13) 0 scaling(11);
                margin-bottom: scaling(24);
            }

            @include tablet {
                padding: scaling(16) 0 scaling(16);
            }

            @include mobile {
                padding: scaling(18) 0 scaling(64);
                margin-bottom: 0;
            }
        }

        &Actors {
            padding-right: scaling(10);

            @include mobile {
                padding-top: scaling(4);
            }
        }

        &ActorsGroup {
            margin-bottom: scaling(20);

            &:last-child {
                margin-bottom: 0;
            }

            @include mobile {
                margin-bottom: scaling(30);
            }
        }

        &Actor {
            @include text;

            margin-bottom: scaling(8);
            position: relative;
            transition: color $d-hover ease-in-out;

            &:last-child {
                margin-bottom: 0;
            }

            @include hover {
                &:hover {
                    color: $c-red;
                }
            }
        }
    }

    &-table {
        display: flex;
        padding-top: scaling(64);
        padding-bottom: scaling(120);

        @include desktop {
            padding-top: scaling(48);
            padding-bottom: scaling(100);
        }

        @include desktop--small {
            padding-top: scaling(44);
            padding-bottom: scaling(80);
        }

        @include laptop {
            padding-top: scaling(40);
            padding-bottom: scaling(64);
        }

        @include tablet {
            padding-top: scaling(40);
            padding-bottom: scaling(64);
        }

        @include mobile {
            flex-direction: column-reverse;
            padding-top: scaling(44);
            padding-bottom: scaling(48);
        }
    }

    &-message {
        @include text;

        color: $c-gray;

        @include desktop--large {
            width: (319 * 100%) / 1536;
            margin-right: scaling(65);
        }

        @include desktop {
            width: (240 * 100%) / 1152;
            margin-right: scaling(48);
        }

        @include desktop--small {
            width: (200 * 100%) / 960;
            margin-right: scaling(40);
        }

        @include laptop {
            width: (160 * 100%) / 768;
            margin-right: scaling(32);
        }

        @include tablet {
            display: none;
        }

        @include mobile {
            padding-top: scaling(48);
        }

        &Icon {
            width: scaling(14);
            height: scaling(14);
            margin-bottom: scaling(10);

            @include desktop--large {
                width: scaling(18);
                height: scaling(18);
                margin-bottom: scaling(15);
            }

            @include desktop {
                width: scaling(18);
                height: scaling(18);
                margin-bottom: scaling(15);
            }

            svg {
                width: 100%;
                height: 100%;
            }
        }
    }

    &-districts {
        display: flex;
        flex-wrap: wrap;

        @include desktop--large {
            width: (896 * 100%) / 1536;
        }

        @include desktop {
            width: (672 * 100%) / 1152;
        }

        @include desktop--small {
            width: (560 * 100%) / 960;
        }

        @include laptop {
            width: (481 * 100%) / 768;
        }

        @include tablet {
            width: 100%;
        }

        @include mobile {
            width: 100%;
            flex-direction: column;
        }
    }

    &-district {
        padding: 0 scaling(32) 0 0;
        border-right: 1px solid $c-gray-80;
        flex: 1;

        &:nth-child(even) {
            padding: 0 0 0 scaling(32);
            border-right: none;
        }

        &:last-child {
            padding-right: 0;
            border-right: none;
        }

        @include mobile {
            width: 100%;
            padding: 0;
            border: none;
            margin-bottom: scaling(64);

            &:nth-child(even) {
                padding: 0;
            }

            &:last-child {
                margin-bottom: 0;
            }
        }

        &Number {
            @include text--caption;

            text-transform: uppercase;
            font-weight: $fw-medium;
            border-bottom: 1px solid $c-gray-80;
            padding-bottom: scaling(8);
            margin-bottom: scaling(40);

            @include desktop--large {
                padding-bottom: scaling(20);
                margin-bottom: scaling(64);
            }

            @include desktop {
                padding-bottom: scaling(20);
                margin-bottom: scaling(48);
            }

            @include desktop--small {
                padding-bottom: scaling(11);
                margin-bottom: scaling(44);
            }
        }

        &Item {
            margin-bottom: scaling(28);

            &:last-child {
                margin-bottom: 0;
            }
        }

        &Title {
            @include body-3;

            margin-bottom: scaling(4);
            font-size: scaling(14);

            &.isLarge {
                margin-bottom: scaling(8);
                font-size: scaling(18);
                line-height: $lh-110;
                text-transform: uppercase;
                font-family: $family-apoc;
                font-feature-settings: 'ss02' on;

                @include desktop--large {
                    font-size: scaling(36);
                }

                @include desktop {
                    font-size: scaling(30);
                }

                @include desktop--small {
                    font-size: scaling(25);
                }
            }
        }

        &Composer {
            @include text--caption;

            margin-bottom: scaling(12);
        }

        &Artist {
            @include caption-1;

            color: $c-gray;
            margin-bottom: scaling(4);

            &:last-child {
                margin-bottom: 0;
            }
        }

        &Hint {
            @include caption-1;

            margin-top: scaling(10);

            @include desktop--large {
                margin-top: scaling(12);
            }

            @include desktop {
                margin-top: scaling(12);
            }
        }
    }

    &-groups {
        margin-top: scaling(20);

        @include desktop--large {
            margin-top: scaling(32);
        }

        @include desktop {
            margin-top: scaling(25);
        }

        &Item {
            @include caption-1;

            color: $c-gray;

            &:not(:last-child) {
                margin-bottom: scaling(10);

                @include desktop--large {
                    margin-bottom: scaling(20);
                }

                @include desktop {
                    margin-bottom: scaling(15);
                }
            }

            &ListItem {
                margin-top: scaling(4);

                @include mobile {
                    margin-top: scaling(2);
                }
            }
        }
    }

    &-participants {
        width: 100%;
        margin-top: scaling(44);
        padding-top: scaling(22);
        border-top: 1px solid $c-gray-80;

        @include desktop--large {
            margin-top: scaling(64);
            padding-top: scaling(32);
        }

        @include desktop {
            margin-top: scaling(54);
            padding-top: scaling(27);
        }

        @include mobile {
            margin-top: 0;
        }

        &Item {
            display: flex;

            @include mobile {
                flex-direction: column;
            }

            &:not(:last-child) {
                margin-bottom: scaling(20);

                @include desktop--large {
                    margin-bottom: scaling(37);
                }

                @include desktop {
                    margin-bottom: scaling(29);
                }
            }

            &Position {
                @include body-3;
            }

            &Position,
            &List {
                flex: 1;
            }

            &Position {
                padding-right: scaling(32);

                @include mobile {
                    margin-bottom: scaling(10);
                    padding-right: 0;
                }
            }

            &List {
                padding-left: scaling(32);

                @include mobile {
                    padding-left: 0;
                }

                &Item {
                    display: flex;
                    align-items: center;
                    position: relative;

                    &:not(:last-child) {
                        margin-bottom: scaling(8);
                    }

                    @include hover {
                        &.isLink:hover {
                            #{$component}-participantsItemListItemName {
                                color: $c-red;
                            }
                        }
                    }

                    &Image {
                        flex-shrink: 0;
                        width: scaling(28);
                        height: scaling(28);
                        margin-right: scaling(10);
                        border-radius: 100%;
                        overflow: hidden;

                        @include desktop--large {
                            width: scaling(44);
                            height: scaling(44);
                            margin-right: scaling(24);
                        }

                        @include desktop {
                            width: scaling(36);
                            height: scaling(36);
                            margin-right: scaling(20);
                        }

                        &Stub {
                            width: 100%;
                            height: 100%;

                            svg {
                                width: 100%;
                                height: 100%;
                                stroke: $c-black;
                            }
                        }

                        img {
                            @include m-objectFit;

                            width: 100%;
                            height: 100%;
                        }
                    }

                    &Name {
                        @include body-3;

                        transition: color $d-hover ease-in-out;
                    }

                    &Position {
                        @include caption-1;

                        margin-top: scaling(4);
                        color: $c-gray;

                        @include mobile {
                            margin-top: scaling(2);
                        }
                    }
                }
            }
        }
    }
}
</style>
