<template>
    <div class="MuseumHero">
        <div v-if="aside" class="MuseumHero-aside">
            <div class="MuseumHero-picture">
                <picture>
                    <source
                        :srcset="aside.image + ' 1x, ' + aside.image2x + ' 2x'"
                    />
                    <img
                        class="MuseumHero-pictureImage"
                        :src="aside.image"
                        alt=""
                    />
                </picture>
            </div>
            <div class="MuseumHero-caption b-scaled-paddings">
                <div
                    v-if="aside.name"
                    class="MuseumHero-captionTitle"
                    v-text="aside.name"
                ></div>
                <div
                    v-if="aside.character"
                    class="MuseumHero-captionCharacter"
                    v-text="aside.character"
                ></div>
                <div
                    v-if="aside.caption"
                    class="MuseumHero-captionText"
                    v-text="aside.caption"
                ></div>
            </div>
        </div>
        <div class="MuseumHero-main b-scaled-paddings">
            <div
                v-if="content.title"
                class="MuseumHero-mainTitle"
                v-text="content.title"
            ></div>
            <div
                v-if="content.description"
                class="MuseumHero-mainDescription"
                v-text="content.description"
            ></div>
        </div>
        <div v-if="content.contacts" class="MuseumHero-contacts">
            <div
                v-for="(contact, index) in content.contacts"
                :key="index"
                class="MuseumHero-contact"
            >
                <div
                    class="MuseumHero-contactDescription"
                    v-text="contact.name"
                ></div>
                <a
                    class="MuseumHero-contactLink"
                    :href="contact.link"
                    v-text="contact.text"
                ></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MuseumHero',

    props: {
        content: {
            type: Object,
            required: true
        },

        aside: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.MuseumHero {
    display: grid;
    border-bottom: 1px solid $c-black;

    @include desktop--large {
        height: calc(100vh - #{scaling(97)});
        grid-template-columns: (480 * 100%) / 1920 1fr;
        grid-template-rows: 1fr auto;
    }

    @include desktop {
        height: calc(100vh - #{scaling(73)});
        grid-template-columns: (360 * 100%) / 1440 1fr;
        grid-template-rows: 1fr auto;
    }

    @include desktop--small {
        height: calc(100vh - #{scaling(61)});
        grid-template-columns: (300 * 100%) / 1200 1fr;
        grid-template-rows: 1fr auto;
    }

    @include laptop {
        grid-template-columns: (240 * 100%) / 960 1fr;
        grid-template-rows: 1fr auto;
    }

    &-aside {
        border-right: 1px solid $c-black;
        position: relative;

        @include desktop--large {
            grid-row: 1 / 3;
        }

        @include desktop {
            grid-row: 1 / 3;
        }

        @include desktop--small {
            grid-row: 1 / 3;
        }

        @include tablet {
            display: none;
        }

        @include mobile {
            display: none;
        }
    }

    &-main {
        padding-top: scaling(20);
        padding-bottom: scaling(20);
        background-color: $c-black--header;
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;

        @include desktop--large {
            padding-top: scaling(36);
            padding-bottom: scaling(36);
        }

        @include desktop {
            padding-top: scaling(28);
            padding-bottom: scaling(28);
        }

        @include desktop--small {
            padding-top: scaling(24);
            padding-bottom: scaling(24);
        }

        &Title {
            @include title--big;

            color: $c-gold;
            margin-bottom: scaling(60);

            @include tablet {
                margin-bottom: scaling(170);
            }

            @include mobile {
                margin-bottom: scaling(128);
            }
        }

        &Description {
            @include body-1;

            color: $c-white;
        }
    }

    &-picture {
        height: 100%;
        width: 100%;

        &Image {
            @include m-objectFit(cover, center);

            width: 100%;
            height: 100%;
        }
    }

    &-caption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding-top: scaling(247);
        padding-bottom: scaling(36);
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);

        @include desktop {
            padding-top: scaling(155);
            padding-bottom: scaling(28);
        }

        @include desktop--small {
            padding-top: scaling(145);
            padding-bottom: scaling(24);
        }

        @include laptop {
            padding-top: scaling(133);
            padding-bottom: scaling(20);
        }

        &Title,
        &Character {
            @include text--button;

            color: $c-white;
            line-height: 1.4;
        }

        &Text {
            @include text;

            color: $c-white;
            padding-top: scaling(28);
            margin-top: scaling(20);
            border-top: 1px solid rgba(128, 128, 128, 0.5);
        }
    }

    &-contacts {
        display: flex;

        @include laptop {
            grid-column: 1 / 3;
        }

        @include tablet {
            flex-wrap: wrap;
        }

        @include mobile {
            flex-wrap: wrap;
        }
    }

    &-contact {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: scaling(16) scaling(10) scaling(20);
        width: 25%;
        overflow: hidden;

        @include desktop--large {
            padding: scaling(32) scaling(26) scaling(36);
            border-right: 1px solid $c-black;

            &:last-child {
                border-right: none;
            }
        }

        @include desktop {
            padding: scaling(24) scaling(18) scaling(28);
            border-right: 1px solid $c-black;

            &:last-child {
                border-right: none;
            }
        }

        @include desktop--small {
            padding: scaling(20) scaling(14) scaling(24);
            border-right: 1px solid $c-black;

            &:last-child {
                border-right: none;
            }
        }

        @include laptop {
            border-right: 1px solid $c-black;

            &:last-child {
                border-right: none;
            }
        }

        @include tablet {
            width: 50%;
            border-right: 1px solid $c-black;
            border-bottom: 1px solid $c-black;

            &:nth-child(even) {
                border-right: none;
            }
        }

        @include mobile {
            width: 100%;
            border-bottom: 1px solid $c-black;

            &:last-child {
                border-bottom: none;
            }
        }

        &Description {
            @include text;

            color: $c-gray--header;

            @include desktop--large {
                margin-bottom: scaling(168);
            }

            @include desktop {
                margin-bottom: scaling(80);
            }

            @include desktop--small {
                margin-bottom: scaling(133);
            }

            @include laptop {
                margin-bottom: scaling(127);
            }

            @include tablet {
                margin-bottom: scaling(42);
            }

            @include mobile {
                margin-bottom: scaling(42);
            }
        }

        &Link {
            font-family: 'Apoc LC';
            font-size: scaling(20);
            color: $c-black;
            line-height: $lh-130;
            // text-overflow: ellipsis;
            // overflow: hidden;

            &:hover {
                color: $c-red;
            }

            @include desktop--large {
                font-size: scaling(32);
            }

            @include desktop {
                font-size: scaling(26);
            }

            @include tablet {
                font-size: scaling(18);
            }
        }
    }
}
</style>
