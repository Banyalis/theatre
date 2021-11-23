<template>
    <div class="NewsFilter">
        <div class="NewsFilter-item">
            <CommonSearchInput placeholder="Поиск" />
        </div>
        <div
            v-for="(item, index) in filter"
            :key="index"
            class="NewsFilter-item"
        >
            <CommonFilterButton :item="item" />
        </div>
        <div class="NewsFilter-filter">
            <MobileFilter :popup="popup">
                <CommonFilterButton
                    v-for="(item, index) in filter"
                    :key="index"
                    :item="item"
                    :mobile-filter="true"
                />
            </MobileFilter>
        </div>
    </div>
</template>

<script>
import CommonSearchInput from '~/components/common/CommonSearchInput';
import CommonFilterButton from '~/components/common/CommonFilterButton';
import MobileFilter from '~/components/other/MobileFilter';

export default {
    name: 'NewsFilter',

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
    }
};
</script>

<style lang="scss" scoped>
.NewsFilter {
    $component: &;

    display: flex;
    flex-wrap: wrap;

    &-item {
        @include mobile {
            &:not(:first-child) {
                display: none;
            }
        }

        &:nth-child(1) {
            width: 100%;
            background-color: $c-black--header;

            @include desktop--large {
                width: (1440 * 100% / 1920);
            }

            @include desktop {
                width: (960 * 100% / 1440);
            }

            @include desktop--small {
                width: (800 * 100% / 1200);
            }

            @include laptop {
                width: (640 * 100% / 960);
            }
        }

        &:nth-child(2) {
            background-color: $c-black--header;

            @include desktop--large {
                width: (480 * 100% / 1920);
            }

            @include desktop {
                width: (480 * 100% / 1440);
            }

            @include desktop--small {
                width: (400 * 100% / 1200);
            }

            @include laptop {
                width: (320 * 100% / 960);
            }

            @include tablet {
                width: (100% / 3);
                order: 3;
                background-color: $c-white;
            }
        }

        &:nth-child(3),
        &:nth-child(4) {
            width: 50%;

            @include tablet {
                width: (100% / 3);
            }
        }
    }

    &-filter {
        display: none;
        width: 100%;

        @include mobile {
            display: block;
        }
    }

    ::v-deep .MobileFilter-button {
        &Text {
            color: $c-black;
        }

        &Icon svg {
            fill: $c-black;
        }
    }
}
</style>
