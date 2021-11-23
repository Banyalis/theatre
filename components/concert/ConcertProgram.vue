<template>
    <div class="ConcertProgram">
        <div class="ConcertProgram-head">
            <ConcertTitle :title="`Программа концерта`" />
        </div>
        <div class="ConcertProgram-districts b-paddings">
            <div
                v-for="(item, index) in program"
                :key="index"
                class="ConcertProgram-district"
            >
                <ConcertDistrict :item="item" />
            </div>
        </div>
        <div
            class="ConcertProgram-message b-paddings"
            :class="{ noStructure: !structure.length }"
        >
            <div class="ConcertProgram-messageText">
                В программе возможны изменения
            </div>
        </div>
        <div v-if="structure.length" class="ConcertProgram-structure">
            <ConcertStructure :structure="structure" />
        </div>
    </div>
</template>

<script>
import ConcertTitle from '@/components/concert/ConcertTitle';
import ConcertDistrict from '@/components/concert/ConcertDistrict';
import ConcertStructure from '@/components/concert/ConcertStructure';

export default {
    name: 'ConcertProgram',

    components: {
        ConcertStructure,
        ConcertTitle,
        ConcertDistrict
    },

    props: {
        program: {
            type: Array,
            required: true
        },
        structure: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style lang="scss">
.ConcertProgram {
    $component: &;

    &-head {
        position: sticky;
        top: scaling(91);
        z-index: $z-two;

        @include desktop {
            top: scaling(72);
        }

        @include desktop--small {
            top: scaling(60);
        }

        @include laptop {
            top: scaling(64);
        }

        @include tablet {
            top: scaling(64);
        }

        @include mobile {
            top: scaling(48);
        }
    }
    &-districts {
        display: flex;
        padding-top: scaling(96);
        padding-bottom: scaling(64);

        @include desktop {
            padding-top: scaling(72);
            padding-bottom: scaling(48);
        }

        @include desktop--small {
            padding-top: scaling(64);
            padding-bottom: scaling(44);
        }

        @include laptop {
            padding-top: scaling(56);
            padding-bottom: scaling(40);
        }

        @include tablet {
            padding-top: scaling(56);
            padding-bottom: scaling(40);
        }

        @include mobile {
            flex-direction: column;
            padding-top: scaling(64);
            padding-bottom: scaling(48);
        }
    }

    &-district {
        padding-right: scaling(32);
        border-right: 1px solid $c-gray-80;
        width: 50%;

        @include mobile {
            width: 100%;
            border-right: none;
            padding-right: 0;
            margin-bottom: scaling(64);
        }

        &:last-child {
            padding-right: 0;
            padding-left: scaling(32);
            border-right: none;

            @include mobile {
                padding-left: 0;
                margin-bottom: 0;
            }
        }
    }

    &-message {
        margin-bottom: scaling(32);

        &.noStructure {
            margin-bottom: 0;
            border-bottom: 1px solid $c-black;
        }

        &Text {
            @include text--caption;

            text-align: center;
            color: $c-gray;
            border-bottom: 1px solid $c-gray-80;
            padding-bottom: scaling(40);

            @include desktop--large {
                padding-bottom: scaling(64);
            }

            @include desktop {
                padding-bottom: scaling(48);
            }

            @include desktop--small {
                padding-bottom: scaling(44);
            }

            @include mobile {
                padding-bottom: scaling(48);
            }

            #{$component}-message.noStructure & {
                border-bottom: none;
            }
        }
    }

    &-structure {
        border-bottom: 1px solid $c-black;
    }
}
</style>
