<template>
    <div v-if="isShow" class="PosterCatalogItem">
        <div ref="sidebar" class="PosterCatalogItem-sidebar">
            <div
                ref="sidebarInner"
                class="PosterCatalogItem-sidebarInner b-needFixOnPopupOpen"
            >
                <div class="PosterCatalogItem-date" v-text="card.date"></div>
                <div class="PosterCatalogItem-day" v-text="card.day"></div>
            </div>
        </div>
        <div class="PosterCatalogItem-content">
            <template v-for="item in card.items">
                <div
                    v-if="
                        !avaibleFilter ||
                        (programs[item.hash] && programs[item.hash].freeSeats)
                    "
                    :key="item.hash"
                    class="PosterCatalogItem-card"
                >
                    <PosterCard v-if="!item.oneAct" :item="item" />
                    <PosterList v-else :item="item" />
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { isDesktopSmall } from '@/utils/utils';
import PosterCard from '~/components/poster/PosterCard';
import PosterList from '~/components/poster/PosterList';

export default {
    name: 'PosterCatalogItem',

    components: {
        PosterCard,
        PosterList
    },

    props: {
        card: {
            type: Object,
            required: true
        }
    },

    computed: {
        isShow() {
            return (
                !this.avaibleFilter ||
                this.card.items.some(
                    (item) =>
                        this.programs[item.hash] &&
                        this.programs[item.hash].freeSeats
                )
            );
        },

        ...mapState(['headerHeight']),
        ...mapState('performances', ['programs']),
        ...mapState('timetable', ['avaibleFilter'])
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.$nextTick(this.onResize);
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        onResize() {
            if (this.$refs.sidebarInner) {
                if (isDesktopSmall()) {
                    this.$refs.sidebarInner.style.top = `${
                        this.headerHeight +
                        document.querySelector('.CommonHero-tabsOutter')
                            .offsetHeight
                    }px`;
                    this.$refs.sidebarInner.style.marginBottom = 0;
                } else {
                    this.$refs.sidebar.style.top = `${
                        this.headerHeight +
                        document.querySelector('.CommonHero-tabsOutter')
                            .offsetHeight
                    }px`;
                    this.$refs.sidebar.style.marginBottom = `${-1}px`;
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@mixin l-sidebar-desktop {
    position: sticky;
    z-index: 10;
}

@mixin l-sidebar-mobile {
    position: sticky;
    padding: scaling(32) scaling(16) scaling(16);
    border-right: none;
    border-bottom: 1px solid $c-black;
    background-color: #f2f2f2;
    z-index: 10;
    text-align: center;
}

@mixin l-date-desktop {
    color: $c-red;
    letter-spacing: -0.01em;
    text-transform: none;
    font-weight: $fw-normal;
    font-family: $family-graphic;
}

.PosterCatalogItem {
    $component: &;

    display: flex;
    flex-wrap: wrap;

    &:not(:last-of-type) {
        border-bottom: 1px solid $c-black;
    }

    &-sidebar {
        width: 100%;
        border-right: 1px solid $c-black;

        @include desktop--large {
            width: (480 * 100% / 1920);
        }

        @include desktop {
            width: (288 * 100% / 1440);
        }

        @include desktop--small {
            width: (240 * 100% / 1200);
        }

        @include laptop {
            @include l-sidebar-mobile;
        }

        @include tablet {
            @include l-sidebar-mobile;
        }

        @include mobile {
            @include l-sidebar-mobile;
        }

        &Inner {
            @include desktop--large {
                @include l-sidebar-desktop;

                padding: scaling(36) scaling(32);
            }

            @include desktop {
                @include l-sidebar-desktop;

                padding: scaling(28) scaling(24);
            }

            @include desktop--small {
                @include l-sidebar-desktop;

                padding: scaling(24) scaling(20);
            }
        }
    }

    &-date {
        margin-bottom: scaling(4);
        font-size: scaling(14);
        line-height: $lh-140;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        font-weight: $fw-bold;

        @include desktop--large {
            @include l-date-desktop;

            font-size: scaling(36);
            line-height: $lh-130;
        }

        @include desktop {
            @include l-date-desktop;

            font-size: scaling(28);
            line-height: $lh-130;
        }

        @include desktop--small {
            @include l-date-desktop;

            font-size: scaling(24);
            line-height: $lh-130;
            letter-spacing: 0;
        }
    }

    &-day {
        color: $c-gray;
        font-size: scaling(12);
        line-height: $lh-150;
        font-family: $family-graphic;
        text-transform: capitalize;

        @include desktop--large {
            font-size: scaling(20);
            line-height: $lh-130;
        }

        @include desktop {
            font-size: scaling(18);
            line-height: $lh-130;
        }

        @include desktop--small {
            font-size: scaling(14);
            line-height: $lh-130;
        }
    }

    &-content {
        width: 100%;

        @include desktop--large {
            width: (1440 * 100% / 1920);
        }

        @include desktop {
            width: (1152 * 100% / 1440);
        }

        @include desktop--small {
            width: (960 * 100% / 1200);
        }
    }

    &-card {
        @include desktop--large {
            padding: scaling(36) scaling(32) scaling(36) scaling(96);
        }

        @include desktop {
            padding: scaling(28) scaling(24) scaling(28) scaling(72);
        }

        @include desktop--small {
            padding: scaling(24) scaling(20) scaling(24) scaling(60);
        }

        @include laptop {
            padding: scaling(20) scaling(16) scaling(20) scaling(80);
        }

        @include tablet {
            padding: scaling(20) scaling(16) scaling(20) scaling(72);
        }

        @include mobile {
            padding: scaling(24) scaling(16);
        }

        &:not(:last-child) {
            border-bottom: 1px solid $c-black;
        }
    }
}
</style>
