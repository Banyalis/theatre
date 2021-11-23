<template>
    <div class="AboutContacts">
        <div class="AboutContacts-head b-scaled-paddings">
            <div class="AboutContacts-headTitle">Контакты</div>
            <div class="AboutContacts-headLink">
                <RoundedButton
                    type="isBlack"
                    class="PerformanceDetail-informationItemButton"
                    :link="{
                        url: '/visit/kak-dobratsya-v-teatr',
                        title: 'Как добраться?'
                    }"
                />
            </div>
        </div>
        <div class="AboutContacts-scenes">
            <AboutContactsScene
                v-for="(scene, index) in content.scenes"
                :key="index"
                :scene="scene"
            />
        </div>
        <div class="AboutContacts-map">
            <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A3dc30c5400cfd594ae5be3efd4ba1f1d98f1bd7f7edfe869ba7c90ccf4b4b546&amp;source=constructor"
                frameborder="0"
            ></iframe>
        </div>
        <div class="AboutContacts-cards">
            <div class="AboutContacts-card AboutContacts-card--selling">
                <AboutContactsImageCard :card="content.sellingCard" />
            </div>
            <div class="AboutContacts-card AboutContacts-card--store">
                <AboutContactsImageCard :card="content.storeCard" />
            </div>
            <div class="AboutContacts-card AboutContacts-card--press">
                <AboutContactsTextCard
                    :card="content.pressCard"
                    :mod="`gold`"
                />
            </div>
            <div class="AboutContacts-card AboutContacts-card--museum">
                <AboutContactsImageCard
                    :card="content.museumCard"
                    :mod="`black`"
                />
            </div>
            <div class="AboutContacts-card AboutContacts-card--sponsor">
                <AboutContactsTextCard :card="content.sponsorCard" />
            </div>
            <div class="AboutContacts-card AboutContacts-card--fond">
                <AboutContactsTextCard :card="content.fondCard" />
            </div>
            <div class="AboutContacts-card AboutContacts-card--requisite">
                <AboutContactsTextCard :card="content.requisiteCard" />
            </div>
        </div>
    </div>
</template>

<script>
import RoundedButton from '@/components/other/RoundedButton';
import AboutContactsScene from './AboutContactsScene';
import AboutContactsImageCard from './AboutContactsImageCard';
import AboutContactsTextCard from './AboutContactsTextCard';

export default {
    name: 'AboutContacts',

    components: {
        AboutContactsScene,
        RoundedButton,
        AboutContactsImageCard,
        AboutContactsTextCard
    },

    props: {
        content: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss">
.AboutContacts {
    &-head {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        padding-top: scaling(100);
        padding-bottom: scaling(36);
        border-bottom: 1px solid $c-black;

        @include desktop {
            padding-top: scaling(88);
            padding-bottom: scaling(28);
        }

        @include desktop--small {
            padding-top: scaling(72);
            padding-bottom: scaling(24);
        }

        @include laptop {
            padding-top: scaling(48);
            padding-bottom: scaling(24);
        }

        @include tablet {
            padding-top: scaling(60);
            padding-bottom: scaling(18);
        }

        @include mobile {
            padding-top: scaling(40);
            padding-bottom: scaling(20);
        }

        &Title {
            @include heading-2;
        }

        &Link {
            @include mobile {
                display: none;
            }
        }
    }

    &-scenes {
        display: flex;
        flex-wrap: wrap;
    }

    &-map {
        width: 100%;
        height: scaling(704);
        border-bottom: 1px solid $c-black;

        @include desktop {
            height: scaling(510);
        }

        @include desktop--small {
            height: scaling(422);
        }

        @include laptop {
            height: scaling(352);
        }

        @include tablet {
            height: scaling(304);
        }

        @include mobile {
            height: scaling(255);
        }

        iframe {
            width: 100%;
            height: 100%;
        }
    }

    &-cards {
        display: flex;
        flex-wrap: wrap;

        @include mobile {
            flex-direction: column;
        }
    }

    &-card {
        &--selling {
            border-right: 1px solid $c-black;
            border-bottom: 1px solid $c-black;
            width: 100%;
            order: 1;

            @include desktop--large {
                width: (1440 * 100%) / 1920;
            }

            @include desktop {
                width: (1080 * 100%) / 1440;
            }

            @include desktop--small {
                width: (900 * 100%) / 1200;
            }

            @include laptop {
                width: (640 * 100%) / 960;
            }

            @include tablet {
                width: (512 * 100%) / 768;
            }

            @include mobile {
                border-right: none;
            }
        }

        &--store {
            border-bottom: 1px solid $c-black;
            width: 100%;
            order: 2;

            @include desktop--large {
                width: (480 * 100%) / 1920;
            }

            @include desktop {
                width: (360 * 100%) / 1440;
            }

            @include desktop--small {
                width: (300 * 100%) / 1200;
            }

            @include laptop {
                width: (320 * 100%) / 960;
            }

            @include tablet {
                width: (256 * 100%) / 768;
            }
        }

        &--press {
            border-right: 1px solid $c-black;
            border-bottom: 1px solid $c-black;
            width: 100%;
            order: 3;

            @include desktop--large {
                width: (768 * 100%) / 1920;
            }

            @include desktop {
                width: (576 * 100%) / 1440;
            }

            @include desktop--small {
                width: (480 * 100%) / 1200;
            }

            @include laptop {
                width: (480 * 100%) / 960;
            }

            @include tablet {
                width: (384 * 100%) / 768;
            }

            @include mobile {
                border-right: none;
            }
        }

        &--museum {
            border-bottom: 1px solid $c-black;
            width: 100%;
            order: 4;

            @include desktop--large {
                width: (1152 * 100%) / 1920;
            }

            @include desktop {
                width: (864 * 100%) / 1440;
            }

            @include desktop--small {
                width: (720 * 100%) / 1200;
                min-height: scaling(500);

                .AboutContactsImageCard-content {
                    width: (250 * 100%) / 720;
                }
            }

            @include laptop {
                width: (480 * 100%) / 960;
                min-height: scaling(352);

                .AboutContactsImageCard-content {
                    width: (216 * 100%) / 480;
                }
            }

            @include tablet {
                width: (384 * 100%) / 768;
                min-height: scaling(398);

                .AboutContactsImageCard-content {
                    width: (220 * 100%) / 384;
                }
            }
        }

        &--sponsor {
            border-right: 1px solid $c-black;
            width: 100%;
            order: 5;

            @include desktop--large {
                width: (480 * 100%) / 1920;
            }

            @include desktop {
                width: (360 * 100%) / 1440;
            }

            @include desktop--small {
                width: (300 * 100%) / 1200;
            }

            @include laptop {
                width: (240 * 100%) / 960;
            }

            @include tablet {
                width: (384 * 100%) / 768;
                order: 6;
            }

            @include mobile {
                border-bottom: 1px solid $c-black;
                border-right: none;
            }
        }

        &--fond {
            border-right: 1px solid $c-black;
            width: 100%;
            order: 6;

            @include desktop--large {
                width: (960 * 100%) / 1920;
            }

            @include desktop {
                width: (720 * 100%) / 1440;
            }

            @include desktop--small {
                width: (600 * 100%) / 1200;
            }

            @include laptop {
                width: (480 * 100%) / 960;
            }

            @include tablet {
                border-right: none;
                border-bottom: 1px solid $c-black;
                order: 5;
            }

            @include mobile {
                border-bottom: 1px solid $c-black;
                border-right: none;
            }
        }

        &--requisite {
            width: 100%;
            order: 7;

            @include desktop--large {
                width: (480 * 100%) / 1920;
            }

            @include desktop {
                width: (360 * 100%) / 1440;
            }

            @include desktop--small {
                width: (300 * 100%) / 1200;
            }

            @include laptop {
                width: (240 * 100%) / 960;
            }

            @include tablet {
                width: (384 * 100%) / 768;
                min-height: scaling(338);
            }
        }
    }
}
</style>
