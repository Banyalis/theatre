<template>
    <div class="PosterCatalog">
        <PosterCatalogFilter :filter="filter" :popup="popup" />
        <template v-if="content.cards.length">
            <template v-for="(card, cardIndex) in cards">
                <PosterCatalogItem :key="cardIndex" :card="card" />
            </template>
            <!-- <NuxtLink
            to="/"
            class="PosterCatalog-button"
            v-text="`Загрузить еще`"
        /> -->
        </template>
        <div
            v-if="isShowAlert || !content.cards.length"
            class="PosterCatalog-alert"
            v-text="'Спектаклей нет'"
        ></div>
    </div>
</template>

<script>
import { DateTime } from 'luxon';
import { mapState } from 'vuex';
import PosterCatalogFilter from '~/components/poster/PosterCatalogFilter';
import PosterCatalogItem from '~/components/poster/PosterCatalogItem';

export default {
    name: 'PosterCatalog',

    components: {
        PosterCatalogFilter,
        PosterCatalogItem
    },

    props: {
        content: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            filter: [
                {
                    modifier: 'buy',
                    icon: 'arrow--sideways',
                    title: 'Как купить билет?',
                    url: '/'
                },
                {
                    modifier: 'calendar',
                    icon: 'square',
                    title: 'Все даты'
                },
                {
                    modifier: 'scene',
                    icon: 'chair',
                    title: 'Все сцены'
                },
                {
                    title: 'Доступные на сайте билеты',
                    isCheckbox: true
                }
            ],
            popup: {
                title: 'Фильтры',
                button: 'Применить фильтры'
            }
        };
    },

    computed: {
        cards() {
            return this.content.cards.map((card) => {
                const datetime = DateTime.fromISO(card.date, {
                    locale: this.currentLocaleCode
                });

                return {
                    ...card,
                    datetime,
                    date: datetime.toFormat('dd MMMM'),
                    day: datetime.toFormat('EEEE')
                };
            });
        },

        getTicketsData() {
            return this.content.cards.map((card) => {
                return (
                    !this.avaibleFilter ||
                    card.items.some(
                        (item) =>
                            this.programs[item.hash] &&
                            this.programs[item.hash].freeSeats
                    )
                );
            });
        },

        isShowAlert() {
            return !this.getTicketsData.some(
                (item) => !this.avaibleFilter || item
            );
        },

        ...mapState('performances', ['programs']),
        ...mapState('timetable', ['avaibleFilter']),
        ...mapState(['currentLocaleCode'])
    }
};
</script>

<style lang="scss" scoped>
.PosterCatalog {
    $component: &;

    &-button {
        display: block;
        padding: scaling(22);
        border-top: 1px solid $c-black;
        color: $c-black;
        font-size: scaling(14);
        line-height: $lh-140;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        text-align: center;
        transition: background-color $d-hover ease-in-out,
            color $d-hover ease-in-out;

        @include desktop--large {
            padding: scaling(36);
            font-size: scaling(20);
            line-height: $lh-120;
        }

        @include desktop {
            padding: scaling(24);
            font-size: scaling(20);
            line-height: $lh-120;
        }

        @include desktop--small {
            padding: scaling(20);
        }

        @include mobile {
            padding: scaling(14);
        }

        @include hover {
            &:hover {
                background-color: $c-black;
                color: $c-white;
            }
        }
    }

    &-alert {
        margin: scaling(60) auto;
        padding: scaling(24) 0;
        border-top: 1px solid rgba($c-black, 0.2);
        border-bottom: 1px solid rgba($c-black, 0.2);
        font-size: scaling(20);
        line-height: $lh-140;
        text-align: center;
        text-transform: uppercase;
        font-feature-settings: 'ss02' on;

        @include desktop--large {
            width: (700 * 100% / 1920);
            margin: scaling(100) auto;
            padding: scaling(32) 0;
            font-size: scaling(36);
            line-height: $lh-110;
        }

        @include desktop {
            width: (530 * 100% / 1440);
            margin: scaling(80) auto;
            padding: scaling(28) 0;
            font-size: scaling(28);
        }

        @include desktop--small {
            width: (440 * 100% / 1200);
            margin: scaling(68) auto;
            font-size: scaling(24);
        }

        @include laptop {
            width: (450 * 100% / 960);
            line-height: $lh-120;
            letter-spacing: 0.02em;
        }

        @include tablet {
            width: (350 * 100% / 768);
            padding: scaling(20) 0;
            letter-spacing: 0.02em;
        }

        @include mobile {
            margin: scaling(56) scaling(20);
            padding: scaling(20) 0;
            line-height: $lh-120;
            letter-spacing: 0.02em;
        }
    }
}
</style>
