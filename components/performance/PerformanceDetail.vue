<template>
    <div ref="detail" class="PerformanceDetail">
        <div class="PerformanceDetail-content">
            <div class="PerformanceDetail-about">
                <div
                    class="PerformanceDetail-aboutTitle"
                    v-text="`О спектакле`"
                ></div>
                <!-- eslint-disable -->
                <div
                    class="PerformanceDetail-aboutContent"
                    v-html="detail.about.text"
                ></div>
                <!-- eslint-enable -->
                <RoundedButton
                    v-if="detail.about.textFull"
                    title="Подробнее"
                    type="isTransparentWhite"
                    class="PerformanceDetail-aboutButton"
                    @click="openPopup"
                />
                <!-- eslint-disable -->
                <div
                    class="PerformanceDetail-aboutHint"
                    v-html="detail.about.hint"
                ></div>
                <!-- eslint-enable -->
            </div>
            <div
                v-if="detail.directors.items.length"
                class="PerformanceDetail-directors"
            >
                <!-- eslint-disable -->
                <div
                    v-if="detail.directors.beforeText"
                    class="PerformanceDetail-directorsText"
                    v-html="detail.directors.beforeText"
                ></div>
                <div class="PerformanceDetail-directorsInner">
                    <div
                        v-if="item.roles.length >= 1"
                        v-for="(item, index) in detail.directors.items"
                        :key="index"
                        class="PerformanceDetail-directorsSection"
                        :class="{ isSplit: item.separator }"
                    >
                        <div
                            v-if="item.title && item.roles.length >= 1"
                            class="PerformanceDetail-directorsSectionTitle"
                            :class="{
                                addedAdditionalText: item.additionalText
                            }"
                            v-text="item.title"
                        ></div>
                        <div
                            v-if="item.additionalText && item.roles.length >= 1"
                            class="PerformanceDetail-directorsSectionText"
                            v-html="item.additionalText"
                        ></div>
                        <!-- eslint-enable -->
                        <template v-for="(role, roleIndex) in item.roles">
                            <span
                                v-if="role.title && role.members.length >= 1"
                                :key="roleIndex"
                                class="
                                    PerformanceDetail-directorsSectionPosition
                                "
                                :class="{
                                    isGroupPosition:
                                        role.title && item.roles.length >= 1
                                }"
                                v-text="role.title"
                            ></span>
                            <div
                                v-for="(member, memberIndex) in role.members"
                                :key="memberIndex"
                                class="PerformanceDetail-directorsMember"
                                :class="{
                                    samePosition:
                                        role.title && role.members.length >= 1,
                                    isLink: member.url
                                }"
                            >
                                <HiddenLink
                                    v-if="member.url"
                                    :url="member.url"
                                />
                                <div
                                    class="
                                        PerformanceDetail-directorsMemberImage
                                    "
                                >
                                    <picture v-if="member.image">
                                        <source
                                            :srcset="
                                                member.image +
                                                ' 1x, ' +
                                                member.image2x +
                                                ' 2x'
                                            "
                                        />
                                        <img :src="member.image" alt="" />
                                    </picture>
                                    <div
                                        v-else
                                        class="
                                            PerformanceDetail-directorsMemberImageStub
                                        "
                                    >
                                        <svg-icon
                                            name="icon-stub-performance-desktop"
                                        />
                                        <svg-icon
                                            name="icon-stub-performance-mobile"
                                        />
                                    </div>
                                </div>
                                <div
                                    class="
                                        PerformanceDetail-directorsMemberInner
                                    "
                                >
                                    <div
                                        v-if="member.role"
                                        class="
                                            PerformanceDetail-directorsMemberPosition
                                        "
                                        v-text="member.role"
                                    ></div>
                                    <div
                                        class="
                                            PerformanceDetail-directorsMemberName
                                        "
                                        v-text="member.name"
                                    ></div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <!-- eslint-disable -->
                <div
                    v-if="detail.directors.afterText"
                    class="PerformanceDetail-directorsText"
                    v-html="detail.directors.afterText"
                ></div>
                <!-- eslint-enable -->
            </div>
        </div>
        <div class="PerformanceDetail-sidebar">
            <div class="PerformanceDetail-information">
                <div
                    v-for="(item, index) in detail.information"
                    :key="index"
                    class="PerformanceDetail-informationItem"
                >
                    <div
                        class="PerformanceDetail-informationItemSubtitle"
                        v-text="`${type[item.type]}:`"
                    ></div>
                    <div class="PerformanceDetail-informationItemInner">
                        <div
                            v-if="item.title"
                            class="PerformanceDetail-informationItemTitle"
                            v-text="item.title"
                        ></div>
                        <RoundedButton
                            v-if="
                                item.scene === 'historical' ||
                                item.scene === 'new'
                            "
                            type="isTransparentWhite"
                            class="PerformanceDetail-informationItemButton"
                            :link="{
                                title: 'Панорама зала',
                                url:
                                    item.scene === 'historical'
                                        ? 'https://artsandculture.google.com/streetview/%D0%BC%D1%83%D0%B7%D0%B5%D0%B9-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B3%D0%BE-%D1%82%D0%B5%D0%B0%D1%82%D1%80%D0%B0/uQElUd0jgV2jeg?hl=ru&sv_h=0&sv_p=0&sv_pid=VSPchmG6Wvl-iKEwIDK1HA&sv_z=0.3758120518244181&sv_lid=16955738186725308799&sv_lng=37.61872004780949&sv_lat=55.76007699152807'
                                        : 'https://artsandculture.google.com/streetview/%D0%BC%D1%83%D0%B7%D0%B5%D0%B9-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B3%D0%BE-%D1%82%D0%B5%D0%B0%D1%82%D1%80%D0%B0/uQElUd0jgV2jeg?hl=ru&sv_h=112.57541035088909&sv_p=0.8918107716397117&sv_pid=bQu9QnMM3yygL8RQLobUCA&sv_z=0.3758120518244191&sv_lid=717199304534066318&sv_lng=37.61685545711225&sv_lat=55.75987480164098',
                                isExternal: true
                            }"
                        />
                        <p
                            v-if="item.text"
                            class="PerformanceDetail-informationItemText"
                            v-text="item.text"
                        ></p>
                        <div
                            v-if="item.time"
                            class="PerformanceDetail-informationItemTime"
                        >
                            <template v-for="(act, actIndex) in item.time">
                                <div
                                    :key="actIndex"
                                    ref="act"
                                    class="
                                        PerformanceDetail-informationItemTimeAct
                                    "
                                >
                                    <div
                                        class="
                                            PerformanceDetail-informationItemTimeActTitle
                                        "
                                        v-text="act.title"
                                    ></div>
                                    <div
                                        class="
                                            PerformanceDetail-informationItemTimeActDuration
                                        "
                                        v-text="act.duration"
                                    ></div>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div
                        v-if="item.scene"
                        class="PerformanceDetail-informationItemScene"
                        :class="[
                            item.scene === 'beethoven'
                                ? `isBeethovenScene`
                                : '',
                            item.scene === 'new' ? `isNewScene` : '',
                            item.scene === 'chamber' ? `isChamberScene` : '',
                            item.scene === 'historical'
                                ? `isHistoricalScene`
                                : ''
                        ]"
                    ></div>
                    <div
                        v-if="item.image"
                        class="PerformanceDetail-informationItemImage"
                    >
                        <div
                            class="PerformanceDetail-informationItemImageInner"
                        >
                            <picture>
                                <source
                                    :srcset="
                                        item.image +
                                        ' 1x, ' +
                                        item.image2x +
                                        ' 2x'
                                    "
                                />
                                <img :src="item.image" alt="" />
                            </picture>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-if="detail.sponsors.length"
                ref="sponsors"
                class="PerformanceDetail-sponsors"
            >
                <div
                    v-for="(item, index) in detail.sponsors"
                    :key="index"
                    class="PerformanceDetail-sponsorsItem"
                >
                    <div
                        class="PerformanceDetail-sponsorsItemTitle"
                        v-text="item.title"
                    ></div>
                    <div
                        v-if="item.list"
                        class="PerformanceDetail-sponsorsItemList"
                        :class="[
                            item.type === 'images' ? `isImagesType` : '',
                            item.type === 'text' ? `isTextType` : ''
                        ]"
                    >
                        <div
                            v-for="(listItem, listItemIndex) in item.list"
                            :key="listItemIndex"
                            class="PerformanceDetail-sponsorsItemListItem"
                            :class="{ isWide: listItem.isWide }"
                        >
                            <a
                                :href="listItem.link"
                                target="_blank"
                                :class="{ isDisabled: !listItem.link }"
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
                                    <img :src="listItem.image" alt="" />
                                </picture>
                            </a>
                            <p
                                v-if="listItem.text"
                                class="
                                    PerformanceDetail-sponsorsItemListItemText
                                "
                                v-text="listItem.text"
                            ></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { CONFIG_POPUPS } from '@/utils/constants';
import { isMobile } from '@/utils/utils';
import HiddenLink from '~/components/common/HiddenLink';
import RoundedButton from '@/components/other/RoundedButton';

export default {
    name: 'PerformanceDetail',

    components: {
        HiddenLink,
        RoundedButton
    },

    props: {
        detail: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            type: {
                scene: 'Сцена',
                together: 'Идет вместе с',
                time: 'Время',
                language: 'Язык'
            }
        };
    },

    computed: {
        ...mapState('performances', ['content'])
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.onResize();

        if (this.$refs.act) {
            const actLength = this.$refs.act.length % 3;
            const numberDisabled = actLength === 0 ? 3 : actLength;

            this.$refs.act.slice(-numberDisabled).forEach((item) => {
                item.classList.add('isDisabled');
            });
        }
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        onResize() {
            if (this.$refs.sponsors) {
                this.sponsorsHeight = this.$refs.sponsors.offsetHeight;
            }

            this.setDetailPadding();
        },

        setDetailPadding() {
            if (isMobile()) {
                this.$refs.detail.style.paddingBottom = `${this.sponsorsHeight}px`;
            } else {
                this.$refs.detail.removeAttribute('style');
            }
        },

        openPopup() {
            this.setPopupType(CONFIG_POPUPS.performance.componentName);
            this.setCustomTitle({
                titleDesktop: 'О спектакле'
            });
            this.updateData({
                sidebar: this.content,
                main: this.content.detail.about.textFull
            });
            this.openPopupAction();
        },

        ...mapMutations({
            setPopupType: 'popup/updateType',
            setCustomTitle: 'popup/setCustomTitle',
            updateData: 'popup/updateData'
        }),

        ...mapActions({
            openPopupAction: 'popup/open'
        })
    }
};
</script>

<style lang="scss" scoped>
@mixin text--large {
    font-size: scaling(14);
    line-height: $lh-130;
    font-family: $family-graphic;

    @include desktop--large {
        font-size: scaling(20);
    }

    @include desktop {
        font-size: scaling(18);
    }
}

@mixin text--medium {
    font-size: scaling(12);
    line-height: $lh-150;
    font-family: $family-graphic;

    @include desktop--large {
        font-size: scaling(16);
    }

    @include desktop {
        font-size: scaling(14);
    }

    @include laptop {
        line-height: $lh-140;
    }

    @include tablet {
        line-height: $lh-130;
    }

    @include mobile {
        line-height: $lh-130;
    }
}

@mixin text--small {
    font-size: scaling(12);
    line-height: $lh-150;
    font-family: $family-graphic;

    @include desktop--large {
        font-size: scaling(14);
    }

    @include desktop {
        font-size: scaling(14);
    }

    @include tablet {
        line-height: $lh-130;
    }

    @include mobile {
        line-height: $lh-130;
    }
}

.PerformanceDetail {
    $component: &;

    display: flex;
    flex-wrap: wrap;

    @include mobile {
        position: relative;
    }

    &-content {
        width: (960 * 100% / 1440);
        padding: scaling(64) scaling(32);

        @include desktop {
            width: (720 * 100% / 1080);
            padding: scaling(48) scaling(24);
        }

        @include desktop--small {
            width: (600 * 100% / 900);
            padding: scaling(48) scaling(20);
        }

        @include laptop {
            width: (640 * 100% / 960);
            padding: scaling(40) scaling(32);
        }

        @include tablet {
            width: (512 * 100% / 768);
            padding: scaling(28) scaling(32);
        }

        @include mobile {
            order: 2;
            width: 100%;
            padding: scaling(32) scaling(16);
            border-top: 1px solid $c-gray--header;
            border-bottom: 1px solid $c-gray--header;
        }

        &::v-deep a {
            display: inline-block;
            color: $c-red;
            transition: color $d-hover ease-in-out;

            @include hover {
                &:hover {
                    color: $c-white;
                }
            }
        }

        &::v-deep b {
            font-weight: $fw-semiBold;
        }
    }

    &-about {
        color: $c-white;

        &Title {
            margin-bottom: scaling(12);
            font-size: scaling(24);
            line-height: $lh-160;
            font-weight: $fw-bold;

            @include desktop--large {
                margin-bottom: scaling(20);
                font-size: scaling(40);
            }

            @include desktop {
                margin-bottom: scaling(16);
                font-size: scaling(32);
            }

            @include desktop--small {
                font-size: scaling(28);
            }
        }

        &Content {
            &::v-deep h3 {
                margin-top: scaling(32);
                font-size: scaling(18);
                line-height: $lh-160;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                font-weight: $fw-medium;
                font-family: $family-graphic;

                @include desktop--large {
                    font-size: scaling(28);
                    line-height: $lh-170;
                }

                @include desktop {
                    font-size: scaling(22);
                    line-height: $lh-170;
                }

                @include desktop--small {
                    margin-top: scaling(26);
                    line-height: $lh-170;
                }

                @include laptop {
                    margin-top: scaling(22);
                }

                @include tablet {
                    margin-top: scaling(22);
                }

                @include mobile {
                    margin-top: scaling(17);
                    font-size: scaling(14);
                }
            }

            &::v-deep p {
                font-size: scaling(18);
                line-height: $lh-170;
                font-family: $family-graphic;

                @include desktop--large {
                    font-size: scaling(28);
                }

                @include desktop {
                    font-size: scaling(22);
                }

                @include laptop {
                    line-height: $lh-160;
                }

                @include tablet {
                    font-size: scaling(16);
                    line-height: $lh-160;
                }

                @include mobile {
                    font-size: scaling(14);
                    line-height: $lh-160;
                }

                &:not(:first-child) {
                    margin-top: scaling(12);

                    @include desktop--large {
                        margin-top: scaling(25);
                    }

                    @include desktop {
                        margin-top: scaling(20);
                    }
                }
            }
        }

        &Button {
            margin: scaling(24) 0 scaling(32);

            @include desktop--large {
                margin: scaling(52) 0 scaling(40);
            }

            @include desktop--small {
                margin: scaling(20) 0 scaling(28);
            }

            @include laptop {
                margin: scaling(20) 0 scaling(24);
            }

            @include tablet {
                margin: scaling(28) 0 scaling(20);
            }
        }

        &Hint {
            &::v-deep p {
                @include text--large;

                color: $c-gray;
                margin-top: scaling(32);

                @include desktop--large {
                    margin-top: scaling(40);
                }

                @include desktop--small {
                    margin-top: scaling(32);
                }

                @include laptop {
                    margin-top: scaling(28);
                }

                @include tablet {
                    margin-top: scaling(24);
                }

                @include mobile {
                    font-size: scaling(12);
                    line-height: $lh-150;
                }

                &:not(:first-child) {
                    @include desktop--large {
                        margin-top: scaling(28);
                    }

                    @include desktop {
                        margin-top: scaling(22);
                    }

                    @include desktop--small {
                        margin-top: scaling(20);
                    }

                    @include laptop {
                        margin-top: scaling(18);
                    }

                    @include tablet {
                        margin-top: scaling(16);
                    }

                    @include mobile {
                        margin-top: scaling(14);
                    }
                }
            }
        }
    }

    &-directors {
        margin-top: scaling(48);
        padding-top: scaling(48);
        border-top: 1px solid $c-gray--header;

        @include desktop--large {
            margin-top: scaling(64);
            padding-top: scaling(64);
        }

        @include laptop {
            margin-top: scaling(40);
            padding-top: scaling(40);
        }

        @include tablet {
            margin-top: scaling(40);
            padding-top: scaling(40);
        }

        @include mobile {
            margin-top: scaling(32);
            padding-top: scaling(32);
        }

        &Text {
            &:first-child {
                margin-bottom: scaling(38);
            }

            &:last-child {
                margin-top: scaling(38);
            }

            &::v-deep p {
                @include text--large;

                color: $c-gray;

                @include mobile {
                    font-size: scaling(12);
                    line-height: $lh-150;
                }

                &:not(:first-child) {
                    @include desktop--large {
                        margin-top: scaling(28);
                    }

                    @include desktop {
                        margin-top: scaling(22);
                    }

                    @include desktop--small {
                        margin-top: scaling(20);
                    }

                    @include laptop {
                        margin-top: scaling(18);
                    }

                    @include tablet {
                        margin-top: scaling(16);
                    }

                    @include mobile {
                        margin-top: scaling(14);
                    }
                }
            }
        }

        &Inner {
            columns: 2;

            @include mobile {
                columns: 1;
            }
        }

        &Section {
            width: 100%;
            margin-bottom: scaling(24);
            break-inside: avoid;

            @include desktop--large {
                width: scaling(416);
                margin-bottom: scaling(32);
            }

            @include desktop {
                width: scaling(312);
                margin-bottom: scaling(28);
            }

            @include desktop--small {
                width: scaling(260);
            }

            @include laptop {
                width: scaling(270);
                margin-bottom: scaling(20);
            }

            @include tablet {
                width: scaling(208);
                margin-bottom: scaling(20);
            }

            @include mobile {
                &:last-child {
                    margin-bottom: 0;
                }
            }

            &.isSplit {
                padding-bottom: scaling(24);
                border-bottom: 1px solid $c-gray--header;

                @include desktop--large {
                    padding-bottom: scaling(32);
                }

                @include desktop {
                    padding-bottom: scaling(28);
                }

                @include laptop {
                    padding-bottom: scaling(20);
                }

                @include tablet {
                    padding-bottom: scaling(20);
                }
            }

            &Title {
                @include text--large;

                color: $c-white;

                @include desktop--large {
                    margin-bottom: scaling(32);
                }

                @include desktop {
                    margin-bottom: scaling(28);
                }

                @include desktop--small {
                    margin-bottom: scaling(24);
                }

                @include laptop {
                    margin-bottom: scaling(20);
                }

                @include tablet {
                    display: none;
                }

                @include mobile {
                    display: none;
                }

                &.addedAdditionalText {
                    margin-bottom: scaling(8);
                }
            }

            &Text {
                @include text--medium;

                color: $c-gray;
            }

            &Position {
                @include text--medium;

                display: block;
                margin-bottom: scaling(8);
                color: $c-gray;

                @include desktop--large {
                    margin-bottom: scaling(16);
                }

                @include desktop {
                    margin-bottom: scaling(12);
                }

                @include mobile {
                    margin-left: scaling(56);
                }

                &.isGroupPosition {
                    &:not(:first-child) {
                        margin-top: scaling(20);

                        @include desktop--large {
                            margin-top: scaling(32);
                        }

                        @include desktop {
                            margin-top: scaling(28);
                        }

                        @include desktop--small {
                            margin-top: scaling(24);
                        }

                        @include mobile {
                            margin: scaling(24) 0 0 scaling(56);
                        }
                    }
                }
            }
        }

        &Member {
            display: flex;
            align-items: center;
            position: relative;

            &:not(:first-of-type) {
                margin-top: scaling(16);

                @include desktop--large {
                    margin-top: scaling(28);
                }

                @include desktop {
                    margin-top: scaling(24);
                }

                @include desktop--small {
                    margin-top: scaling(20);
                }

                @include mobile {
                    margin-top: scaling(12);
                }
            }

            &.samePosition {
                margin-top: scaling(8);

                @include desktop--large {
                    margin-top: scaling(12);
                }

                @include tablet {
                    margin-top: scaling(4);
                }

                @include mobile {
                    margin-top: scaling(4);
                }
            }

            @include hover {
                &.isLink:hover {
                    #{$component}-directorsMemberName {
                        color: $c-red;
                    }
                }
            }

            &Image {
                flex-shrink: 0;
                width: scaling(36);
                height: scaling(36);
                border-radius: 100%;
                overflow: hidden;

                @include desktop--large {
                    width: scaling(44);
                    height: scaling(44);
                }

                @include desktop--small {
                    width: scaling(32);
                    height: scaling(32);
                }

                @include laptop {
                    width: scaling(28);
                    height: scaling(28);
                }

                @include tablet {
                    width: scaling(28);
                    height: scaling(28);
                }

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                &Stub {
                    width: 100%;
                    height: 100%;

                    svg {
                        width: 100%;
                        height: 100%;
                        stroke: $c-gray;

                        &:first-child {
                            @include mobile {
                                display: none;
                            }
                        }

                        &:last-child {
                            display: none;

                            @include mobile {
                                display: block;
                            }
                        }
                    }
                }
            }

            &Inner {
                margin-left: scaling(20);

                @include desktop--large {
                    margin-left: scaling(24);
                }

                @include desktop--small {
                    margin-left: scaling(16);
                }

                @include laptop {
                    margin-left: scaling(12);
                }

                @include tablet {
                    margin-left: scaling(12);
                }
            }

            &Position {
                @include text--medium;

                margin-bottom: scaling(4);
                color: $c-gray;

                @include desktop--large {
                    margin-bottom: scaling(8);
                }

                @include mobile {
                    margin-bottom: scaling(8);
                }
            }

            &Name {
                @include text--large;

                color: $c-white;
                transition: color $d-hover ease-in-out;
            }
        }
    }

    &-sidebar {
        width: (480 * 100% / 1440);
        border-left: 1px solid $c-gray--header;

        @include desktop {
            width: (360 * 100% / 1080);
        }

        @include desktop--small {
            width: (300 * 100% / 900);
        }

        @include laptop {
            width: (320 * 100% / 960);
        }

        @include tablet {
            width: (256 * 100% / 768);
            padding: scaling(28) scaling(16);
        }

        @include mobile {
            order: 1;
            width: 100%;
            border-left: none;
        }
    }

    &-information {
        @include mobile {
            padding: scaling(28) scaling(16);
        }

        &Item {
            display: flex;
            flex-wrap: wrap;
            padding: scaling(16) 0;
            border-bottom: 1px solid $c-gray--header;
            position: relative;
            color: $c-white;

            @include desktop--large {
                padding: scaling(36) scaling(32);
            }

            @include desktop {
                padding: scaling(28) scaling(24);
            }

            @include desktop--small {
                padding: scaling(24) scaling(20);
            }

            @include laptop {
                padding: scaling(20) scaling(16);
            }

            @include tablet {
                &:first-child {
                    padding-top: 0;
                }
            }

            @include mobile {
                display: flex;

                &:first-child {
                    padding-top: 0;
                }

                &:last-child {
                    padding-bottom: 0;
                    border-bottom: none;
                }
            }

            &Subtitle {
                @include text--large;

                width: 100%;
                margin-bottom: scaling(48);

                @include desktop--large {
                    margin-bottom: scaling(64);
                }

                @include desktop {
                    margin-bottom: scaling(56);
                }

                @include tablet {
                    margin-bottom: scaling(8);
                    color: $c-gray;
                }

                @include mobile {
                    flex-shrink: 0;
                    width: scaling(112);
                    margin: 0 scaling(16) 0 0;
                    color: $c-gray;
                }
            }

            &Inner {
                flex: 1;

                @include mobile {
                    width: 100%;
                }
            }

            &Title {
                line-height: $lh-110;
                text-transform: uppercase;
                font-feature-settings: 'ss02' on;

                @include desktop--large {
                    font-size: scaling(36);
                }

                @include desktop {
                    font-size: scaling(28);
                }

                @include desktop--small {
                    font-size: scaling(24);
                }

                @include laptop {
                    font-size: scaling(20);
                    line-height: $lh-120;
                    letter-spacing: 0.02em;
                }

                @include tablet {
                    font-size: scaling(14);
                    line-height: $lh-130;
                    text-transform: inherit;
                    font-family: $family-graphic;
                }

                @include mobile {
                    font-size: scaling(14);
                    line-height: $lh-130;
                    text-transform: inherit;
                    font-family: $family-graphic;
                }
            }

            &Button,
            &Text {
                @include desktop--large {
                    margin-top: scaling(20);
                }

                @include desktop {
                    margin-top: scaling(16);
                }

                @include desktop--small {
                    margin-top: scaling(12);
                }

                @include laptop {
                    margin-top: scaling(12);
                }
            }

            &Button {
                display: inline-block;

                @include tablet {
                    display: none;
                }

                @include mobile {
                    display: none;
                }
            }

            &Text {
                @include text--small;

                color: $c-gray;

                @include tablet {
                    margin-top: scaling(8);
                }

                @include mobile {
                    margin-top: scaling(8);
                }
            }

            &Time {
                display: flex;
                flex-wrap: wrap;
                margin-top: scaling(14);

                @include desktop--large {
                    margin-top: scaling(20);
                }

                @include desktop {
                    margin-top: scaling(16);
                }

                @include tablet {
                    margin-top: scaling(24);
                }

                @include mobile {
                    margin-top: scaling(12);
                }

                &Act {
                    width: calc(100% / 3);
                    margin-bottom: scaling(8);
                    padding-bottom: scaling(8);
                    border-bottom: 1px solid $c-gray--header;

                    @include desktop--large {
                        margin-bottom: scaling(12);
                        padding-bottom: scaling(12);
                    }

                    @include tablet {
                        border-bottom: none;
                    }

                    @include mobile {
                        width: 50%;
                        margin-bottom: 0;
                        padding-bottom: 0;
                        border-bottom: none;
                    }

                    &:not(:nth-child(-n + 3)) {
                        @include tablet {
                            margin-top: scaling(12);
                        }
                    }

                    &:not(:nth-child(-n + 2)) {
                        @include mobile {
                            margin-top: scaling(12);
                        }
                    }

                    &.isDisabled {
                        margin-bottom: 0;
                        padding-bottom: 0;
                        border-bottom: none;
                    }

                    &Title,
                    &Duration {
                        @include text--small;

                        @include mobile {
                            line-height: $lh-140;
                        }
                    }

                    &Title {
                        color: $c-gray;
                    }
                }
            }

            &Scene {
                position: absolute;
                bottom: 0;
                right: 0;
                background-size: cover;
                background-repeat: no-repeat;

                @include tablet {
                    display: none;
                }

                @include mobile {
                    display: none;
                }

                &.isHistoricalScene {
                    background-image: url('~assets/images/scene/scene-1.png');

                    @include desktop--large {
                        width: scaling(140);
                        height: scaling(130);
                    }

                    @include desktop {
                        width: scaling(105);
                        height: scaling(97);
                    }

                    @include desktop--small {
                        width: scaling(93);
                        height: scaling(86);
                    }

                    @include laptop {
                        right: scaling(6);
                        width: scaling(116);
                        height: scaling(108);
                    }

                    @media (-webkit-min-device-pixel-ratio: 2),
                        (min-resolution: 192dpi) {
                        background-image: url('~assets/images/scene/scene-1.png');
                    }
                }

                &.isNewScene {
                    width: scaling(130);
                    height: scaling(100);
                    background-image: url('~assets/images/scene/scene-2.png');

                    @include desktop--large {
                        width: scaling(200);
                        height: scaling(150);
                    }

                    @include desktop--small {
                        width: scaling(120);
                        height: scaling(90);
                    }

                    @media (-webkit-min-device-pixel-ratio: 2),
                        (min-resolution: 192dpi) {
                        background-image: url('~assets/images/scene/scene-2@2x.png');
                    }
                }
            }

            &Image {
                width: scaling(64);
                height: scaling(128);
                margin-left: scaling(16);
                padding: scaling(4);
                border: 1px solid $c-gray--header;
                border-top-left-radius: scaling(220);
                border-top-right-radius: scaling(220);
                transition: border-color $d-hover ease-in-out,
                    background-color $d-hover ease-in-out;

                @include desktop--large {
                    width: scaling(81);
                    height: scaling(162);
                    margin-left: scaling(43);
                    padding: scaling(5);
                }

                @include desktop {
                    width: scaling(72);
                    height: scaling(144);
                    margin-left: scaling(24);
                }

                @include tablet {
                    display: none;
                }

                @include mobile {
                    display: none;
                }

                &Inner {
                    height: 100%;
                    border-top-left-radius: scaling(220);
                    border-top-right-radius: scaling(220);
                    overflow: hidden;
                }

                img {
                    @include m-objectFit;

                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    &-sponsors {
        @include desktop--large {
            padding: scaling(36) scaling(32);
        }

        @include desktop {
            padding: scaling(28) scaling(24);
        }

        @include desktop--small {
            padding: scaling(24) scaling(20);
        }

        @include laptop {
            padding: scaling(20) scaling(16);
        }

        @include mobile {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            padding: scaling(28) scaling(16);
            border-bottom: 1px solid $c-gray--header;
        }

        &Item {
            padding: scaling(24) 0 scaling(12);
            color: $c-white;

            @include desktop--large {
                padding: scaling(32) 0 scaling(20);
            }

            @include desktop {
                padding: scaling(28) 0 scaling(16);
            }

            @include tablet {
                padding: scaling(16) 0;
            }

            @include mobile {
                padding: scaling(24) 0;
            }

            &:first-child {
                padding-top: 0;

                @include tablet {
                    padding-top: scaling(16);
                }
            }

            &:last-child {
                padding-bottom: 0;
            }

            &:not(:last-child) {
                border-bottom: 1px solid $c-gray--header;
            }

            &Title {
                @include text--large;

                @include tablet {
                    color: $c-gray;
                }

                @include mobile {
                    color: $c-gray;
                }
            }

            &List {
                &.isImagesType {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }

                &Item {
                    #{$component}-sponsorsItemList.isImagesType & {
                        width: calc(50% - 16px);
                        height: scaling(52);
                        margin-top: scaling(16);

                        @include desktop--large {
                            width: calc(50% - 24px);
                            height: scaling(64);
                            margin-top: scaling(24);
                        }

                        @include desktop {
                            height: scaling(60);
                        }

                        @include laptop {
                            width: calc(50% - 12px);
                            height: scaling(56);
                            margin-top: scaling(12);
                        }

                        @include tablet {
                            width: calc(50% - 12px);
                            height: scaling(48);
                            margin-top: scaling(12);
                        }

                        &.isWide {
                            @include desktop--large {
                                width: scaling(347);
                            }

                            @include desktop {
                                width: scaling(260);
                            }

                            @include desktop--small {
                                width: scaling(216);
                            }

                            @include laptop {
                                width: scaling(240);
                            }

                            @include tablet {
                                width: scaling(188);
                            }

                            @include mobile {
                                width: scaling(238);
                            }
                        }
                    }

                    #{$component}-sponsorsItemList.isTextType & {
                        margin-top: scaling(8);

                        @include desktop--large {
                            margin-top: scaling(12);
                        }

                        @include desktop {
                            margin-top: scaling(12);
                        }
                    }

                    a {
                        display: block;
                        width: 100%;
                        height: 100%;

                        &.isDisabled {
                            pointer-events: none;
                        }
                    }

                    img {
                        @include m-objectFit(contain, 0 50%);

                        width: 100%;
                        height: 100%;
                    }

                    &Text {
                        @include text--large;
                    }
                }
            }
        }
    }
}
</style>
