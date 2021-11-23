<template>
    <div class="PosterCatalogFilter">
        <CommonSearchInput search-id="timetable" @input="handleSearch" />
        <CommonFilterButton
            v-for="(item, index) in filter"
            :key="index"
            :item="item"
        />
        <MobileFilter :popup="popup">
            <CommonFilterButton
                v-for="(item, index) in filter.slice(1, filter.length)"
                :key="index"
                :item="item"
                :mobile-filter="true"
            />
        </MobileFilter>
    </div>
</template>

<script>
import { debounce } from 'debounce';
import { mapMutations, mapActions } from 'vuex';
import CommonSearchInput from '~/components/common/CommonSearchInput';
import CommonFilterButton from '~/components/common/CommonFilterButton';
import MobileFilter from '~/components/other/MobileFilter';

export default {
    name: 'PosterCatalogFilter',

    components: {
        CommonSearchInput,
        CommonFilterButton,
        MobileFilter
    },

    props: {
        filter: {
            type: Array,
            required: true
        },
        popup: {
            type: Object,
            default: undefined
        }
    },

    mounted() {
        this.getSearchResultsDebounce = debounce(this.getTimetableAction, 300);
    },

    methods: {
        async handleSearch(val) {
            this.setSearchFilter(val);

            await this.getSearchResultsDebounce(this.$route.params.slug);
        },

        ...mapMutations({
            setSearchFilter: 'timetable/setSearchFilter'
        }),

        ...mapActions({
            getTimetableAction: 'timetable/getTimetableAction'
        })
    }
};
</script>

<style lang="scss" scoped>
.PosterCatalogFilter {
    $component: &;

    display: flex;
    flex-wrap: wrap;
    background-color: $c-black--header;

    .CommonSearchInput {
        width: 100%;

        @include desktop--large {
            width: (1440 * 100% / 1920);
        }

        @include desktop {
            width: (960 * 100% / 1440);
        }

        @include desktop--small {
            width: (800 * 100% / 1200);
        }
    }

    > .CommonFilterButton {
        @include mobile {
            display: none;
        }

        &:nth-child(2),
        &:nth-child(5) {
            @include desktop--large {
                width: (480 * 100% / 1920);
            }

            @include desktop {
                width: (480 * 100% / 1440);
            }

            @include desktop--small {
                width: (400 * 100% / 1200);
            }
        }

        &:nth-child(2) {
            @include laptop {
                display: none;
            }

            @include tablet {
                display: none;
            }
        }

        &:nth-child(3),
        &:nth-child(4),
        &:nth-child(5) {
            @include laptop {
                width: (320 * 100% / 960);
            }

            @include tablet {
                width: (256 * 100% / 768);
            }
        }

        &:nth-child(3) {
            @include desktop--large {
                width: (480 * 100% / 1920);
            }

            @include desktop {
                width: (288 * 100% / 1440);
            }

            @include desktop--small {
                width: (240 * 100% / 1200);
            }
        }

        &:nth-child(4) {
            @include desktop--large {
                width: (960 * 100% / 1920);
            }

            @include desktop {
                width: (672 * 100% / 1440);
            }

            @include desktop--small {
                width: (560 * 100% / 1200);
            }
        }
    }
}
</style>
