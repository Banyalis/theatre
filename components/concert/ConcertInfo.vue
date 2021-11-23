<template>
    <div class="ConcertInfo" :class="{ noDuration: !concert.duration }">
        <SpectacleSchedule :date="concert.date" :time="concert.time" />
        <div class="ConcertInfo-row">
            <div class="ConcertInfo-scene b-paddings">
                <div class="ConcertInfo-subtitle">Сцена:</div>
                <div
                    class="ConcertInfo-title isScene"
                    v-text="concert.scene"
                ></div>
                <div class="ConcertInfo-button">
                    <RoundedButton
                        :class="`ConcertInfo-buttonItem`"
                        type="isTransparentBlack"
                        :link="{
                            title: 'Панорама зала',
                            url: 'https://artsandculture.google.com/streetview/%D0%BC%D1%83%D0%B7%D0%B5%D0%B9-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B3%D0%BE-%D1%82%D0%B5%D0%B0%D1%82%D1%80%D0%B0/uQElUd0jgV2jeg?hl=ru&sv_h=222.98986378819015&sv_p=0.0000026131341286372844&sv_pid=ct3HG2PEX5LE2nlG7cDIwQ&sv_z=1.1102230246251565e-16&sv_lid=16955738186725308799&sv_lng=37.61877500669189&sv_lat=55.76002287132002   ',
                            isExternal: true
                        }"
                    />
                </div>
                <div v-if="concert.sceneImage" class="ConcertInfo-imageWrapper">
                    <picture>
                        <source
                            :srcset="
                                concert.sceneImage +
                                ' 1x, ' +
                                concert.sceneImage2x +
                                ' 2x'
                            "
                        />
                        <img
                            class="ConcertInfo-image"
                            :src="concert.sceneImage"
                            alt=""
                        />
                    </picture>
                </div>
            </div>
            <div
                v-if="concert.duration"
                class="ConcertInfo-duration b-paddings"
            >
                <div class="ConcertInfo-subtitle">Продолжительность:</div>
                <div class="ConcertInfo-title" v-text="concert.duration"></div>
                <div class="ConcertInfo-description">
                    Продолжительность концерта может отличаться от заявленного
                    времени.
                </div>
            </div>
        </div>
        <div v-if="concert.about" class="ConcertInfo-about b-paddings">
            <!-- eslint-disable -->
            <div
                v-if="concert.about.content"
                class="ConcertInfo-aboutContent"
                v-html="concert.about.content"
            ></div>
            <!-- eslint-enable -->
            <div v-if="concert.about.info" class="ConcertInfo-textWrapper">
                <div class="ConcertInfo-text" v-text="concert.about.info"></div>
            </div>
            <div v-if="concert.about.roles" class="ConcertInfo-roles">
                <div
                    v-for="(role, index) in concert.about.roles"
                    :key="index"
                    class="ConcertInfo-role"
                >
                    <div
                        v-if="role.title"
                        class="ConcertInfo-roleName"
                        v-text="role.title"
                    ></div>
                    <div class="ConcertInfo-roleArtists">
                        <div
                            v-for="(artist, artistIndex) in role.artists"
                            :key="artistIndex"
                            class="ConcertInfo-artist"
                        >
                            <div class="ConcertInfo-artistImageWrapper">
                                <picture>
                                    <img
                                        class="ConcertInfo-artistImage"
                                        :src="artist.image"
                                        alt=""
                                    />
                                </picture>
                            </div>
                            <div
                                class="ConcertInfo-artistName"
                                v-text="artist.name"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RoundedButton from '@/components/other/RoundedButton';
import SpectacleSchedule from '@/components/spectacle/SpectacleSchedule';

export default {
    name: 'ConcertInfo',

    components: {
        SpectacleSchedule,
        RoundedButton
    },

    props: {
        concert: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.ConcertInfo {
    $component: &;

    width: 100%;

    &.noDuration {
        display: flex;
        flex-wrap: wrap;

        ::v-deep .SpectacleSchedule {
            width: 100%;

            @include desktop--small {
                width: 50%;
                border-right: 1px solid $c-black;
            }

            @include laptop {
                width: 50%;
                border-right: 1px solid $c-black;
            }

            @include tablet {
                width: 50%;
                border-right: 1px solid $c-black;
            }
        }
    }

    &-schedule {
        border-bottom: 1px solid $c-black;
        padding-top: scaling(20);
        padding-bottom: scaling(20);

        @include desktop--large {
            padding-top: scaling(36);
            padding-bottom: scaling(36);
        }

        @include desktop {
            padding-top: scaling(28);
            padding-bottom: scaling(28);
        }

        @include desktop {
            padding-top: scaling(24);
            padding-bottom: scaling(24);
        }
    }

    &-date {
        @include title--sans;

        color: $c-red;
        margin-bottom: scaling(4);
    }

    &-time {
        @include text;

        color: $c-gray;
    }

    &-row {
        display: flex;
        border-bottom: 1px solid $c-black;

        @include mobile {
            flex-direction: column;
        }

        #{$component}.noDuration & {
            width: 100%;

            @include desktop--small {
                width: 50%;
            }

            @include laptop {
                width: 50%;
            }

            @include tablet {
                width: 50%;
            }
        }
    }

    &-scene {
        width: 50%;
        padding-top: scaling(20);
        padding-bottom: scaling(20);
        box-shadow: 1px 0 0 $c-black;
        position: relative;
        overflow: hidden;

        @include desktop--large {
            padding-top: scaling(36);
            padding-bottom: scaling(36);
        }

        @include desktop {
            padding-top: scaling(28);
            padding-bottom: scaling(28);
        }

        @include desktop {
            padding-top: scaling(24);
            padding-bottom: scaling(24);
        }

        @include mobile {
            width: 100%;
            box-shadow: unset;
            border-bottom: 1px solid $c-black;
        }

        #{$component}.noDuration & {
            width: 100%;
            box-shadow: none;

            @include mobile {
                border-bottom: none;
            }
        }
    }

    &-imageWrapper {
        position: absolute;
        bottom: 0;
        right: scaling(-20);
        width: scaling(200);
        height: scaling(209);

        @include desktop {
            width: scaling(130);
            height: scaling(137);
        }

        @include desktop--small {
            width: scaling(250);
            height: scaling(185);
        }

        @include laptop {
            width: scaling(210);
            height: scaling(166);
        }

        @include tablet {
            width: scaling(140);
            height: scaling(141);
        }

        @include mobile {
            width: scaling(120);
            height: scaling(128);
        }
    }

    &-image {
        width: 100%;
        height: 100%;

        @include m-objectFit(cover, left);

        @include desktop--small {
            @include m-objectFit(contain, bottom);
        }

        @include laptop {
            @include m-objectFit(contain, bottom);
        }

        @include tablet {
            @include m-objectFit(cover, left);
        }

        @include mobile {
            @include m-objectFit(cover, left);
        }
    }

    &-duration {
        width: 50%;
        padding-top: scaling(20);
        padding-bottom: scaling(20);

        @include desktop--large {
            padding-top: scaling(36);
            padding-bottom: scaling(36);
        }

        @include desktop {
            padding-top: scaling(28);
            padding-bottom: scaling(28);
        }

        @include desktop {
            padding-top: scaling(24);
            padding-bottom: scaling(24);
        }

        @include mobile {
            width: 100%;
        }
    }

    &-subtitle {
        @include text;

        color: $c-black;
        margin-bottom: scaling(48);

        @include desktop--large {
            margin-bottom: scaling(64);
        }

        @include desktop {
            margin-bottom: scaling(56);
        }

        @include desktop {
            margin-bottom: scaling(44);
        }
    }

    &-title {
        @include title;

        position: relative;
        z-index: $z-two;

        &.isScene {
            max-width: scaling(360);

            @include desktop {
                max-width: scaling(240);
            }

            @include desktop--small {
                max-width: scaling(260);
            }

            @include mobile {
                max-width: scaling(180);
            }
        }

        @include mobile {
            font-size: scaling(20);
        }
    }

    &-description {
        @include text--caption;

        color: $c-gray;
        margin-top: scaling(20);
        font-size: scaling(12);
    }

    &-button {
        margin-top: scaling(16);

        &Item {
            display: inline-block;
        }
    }

    &-about {
        border-bottom: 1px solid $c-black;
        padding-bottom: scaling(48);
        padding-top: scaling(36);
        width: 100%;

        @include desktop--large {
            padding-top: scaling(48);
            padding-bottom: scaling(64);
        }

        @include desktop {
            padding-top: scaling(40);
        }

        @include desktop--small {
            padding-top: scaling(40);
            padding-bottom: scaling(64);
        }

        @include mobile {
            padding-top: scaling(32);
        }

        &Content {
            &::v-deep h3 {
                margin-bottom: scaling(20);
                font-size: scaling(24);
                line-height: $lh-160;
                font-weight: $fw-bold;

                @include desktop--large {
                    margin-bottom: scaling(32);
                    font-size: scaling(40);
                }

                @include desktop {
                    margin-bottom: scaling(26);
                    font-size: scaling(32);
                }

                @include desktop--small {
                    margin-bottom: scaling(22);
                    font-size: scaling(28);
                }

                @include mobile {
                    margin-bottom: scaling(16);
                    font-size: scaling(20);
                }
            }

            &::v-deep p {
                color: $c-gray--header;
                font-size: scaling(16);
                line-height: $lh-160;
                font-family: $family-graphic;

                @include desktop--large {
                    font-size: scaling(24);
                }

                @include desktop {
                    font-size: scaling(20);
                }

                @include tablet {
                    font-size: scaling(14);
                }

                @include mobile {
                    font-size: scaling(14);
                }

                &:not(:first-child) {
                    margin-top: scaling(16);

                    @include desktop--large {
                        margin-top: scaling(20);
                    }

                    @include desktop {
                        margin-top: scaling(20);
                    }
                }
            }

            &::v-deep b {
                font-weight: $fw-semiBold;
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

    &-textWrapper {
        border-bottom: 1px solid $c-gray-80;
        padding-bottom: scaling(36);
        margin-bottom: scaling(20);

        @include desktop--large {
            padding-bottom: scaling(48);
            margin-bottom: scaling(32);
        }

        @include desktop {
            padding-bottom: scaling(40);
            margin-bottom: scaling(28);
        }

        @include desktop--small {
            padding-bottom: scaling(40);
            margin-bottom: scaling(24);
        }

        @include mobile {
            padding-bottom: scaling(32);
            margin-bottom: scaling(24);
        }
    }

    &-text {
        @include text--big;

        @include desktop--large() {
            max-width: 800px;
            font-size: scaling(28);
            line-height: 1.5;
        }

        @include desktop() {
            font-size: scaling(22);
            line-height: 1.5;
        }

        @include desktop--small() {
            font-size: scaling(24);
            line-height: 1.6;
            max-width: scaling(858);
        }

        @include laptop() {
            font-size: scaling(20);
            line-height: 1.6;
            max-width: scaling(686);
        }

        @include tablet() {
            font-size: scaling(16);
            line-height: 1.6;
            max-width: scaling(544);
        }

        @include mobile() {
            font-size: scaling(16);
            line-height: 1.6;
        }
    }

    &-role {
        display: flex;

        @include tablet {
            flex-direction: column;
        }

        @include mobile {
            flex-direction: column;
        }

        &Name {
            @include text;

            color: $c-black--header;

            @include desktop--large {
                max-width: scaling(416);
                margin-right: scaling(64);
            }

            @include desktop {
                max-width: scaling(312);
                margin-right: scaling(48);
            }

            @include desktop--small {
                max-width: scaling(220);
                margin-right: scaling(80);
            }

            @include laptop {
                max-width: scaling(207);
                margin-right: scaling(32);
            }

            @include tablet {
                max-width: scaling(256);
                margin-bottom: scaling(24);
            }

            @include mobile {
                max-width: scaling(256);
                margin-bottom: scaling(20);
            }
        }

        &Artists {
            @include desktop--small {
                display: flex;
                flex-wrap: wrap;
                max-width: scaling(760);
            }

            @include laptop {
                display: flex;
                flex-wrap: wrap;
                max-width: scaling(464);
            }

            @include tablet {
                display: flex;
                flex-wrap: wrap;
                max-width: scaling(544);
            }
        }
    }

    &-artist {
        display: flex;
        align-items: center;
        margin-bottom: scaling(8);

        &:last-child {
            margin-bottom: 0;
        }

        @include desktop--small {
            margin-right: scaling(40);
            margin-bottom: scaling(10);

            &:nth-child(even) {
                margin-right: 0;
            }
        }

        @include laptop {
            margin-right: scaling(16);
            margin-bottom: scaling(8);

            &:nth-child(even) {
                margin-right: 0;
            }
        }

        @include tablet {
            margin-right: scaling(32);
            margin-bottom: scaling(12);

            &:nth-child(even) {
                margin-right: 0;
            }
        }

        @include mobile {
            margin-bottom: scaling(12);
        }

        &ImageWrapper {
            background-color: $c-gray-80;
            border-radius: 50%;
            position: relative;
            overflow: hidden;
            min-width: scaling(36);
            max-width: scaling(36);
            height: scaling(36);
            margin-right: scaling(20);

            @include desktop--large {
                min-width: scaling(44);
                max-width: scaling(44);
                height: scaling(44);
                margin-right: scaling(24);
            }

            @include desktop--small {
                min-width: scaling(32);
                max-width: scaling(32);
                height: scaling(32);
                margin-right: scaling(16);
            }

            @include laptop {
                min-width: scaling(28);
                max-width: scaling(28);
                height: scaling(28);
                margin-right: scaling(12);
            }

            @include tablet {
                min-width: scaling(28);
                max-width: scaling(28);
                height: scaling(28);
                margin-right: scaling(12);
            }
        }

        &Image {
            @include m-absoluteObjectFit();
        }

        &Name {
            @include text;

            color: $c-black--header;

            @include desktop--small {
                width: scaling(212);
            }

            @include laptop {
                width: scaling(184);
            }

            @include tablet {
                width: scaling(216);
            }
        }
    }

    &::v-deep .SpectacleSchedule-date {
        text-transform: inherit;
    }
}
</style>
