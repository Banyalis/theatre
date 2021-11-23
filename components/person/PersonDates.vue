<template>
    <div class="PersonDates">
        <div
            v-for="(item, index) in dates"
            :key="index"
            ref="date"
            class="PersonDates-item"
        >
            <div class="PersonDates-itemDate" v-text="item.date"></div>
            <p class="PersonDates-itemText" v-text="item.text"></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PersonDates',

    props: {
        dates: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.PersonDates {
    $component: &;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @include desktop--large {
        padding: scaling(64);
    }

    @include desktop {
        padding: scaling(36);
    }

    @include desktop--small {
        padding: scaling(60);
    }

    @include laptop {
        padding: scaling(60) scaling(112);
    }

    @include tablet {
        padding: scaling(60) scaling(72);
    }

    @include mobile {
        padding: scaling(32) scaling(16) scaling(64);
    }

    &-item {
        width: calc(50% - 32px);
        margin-top: scaling(28);
        padding-top: scaling(28);
        border-top: 1px solid rgba($c-gray, 0.5);

        @include desktop--large {
            margin-top: scaling(36);
            padding-top: scaling(36);
        }

        @include desktop {
            width: calc(50% - 24px);
            margin-top: scaling(32);
            padding-top: scaling(32);
        }

        @include desktop--small {
            width: 100%;
        }

        @include tablet {
            width: calc(50% - 24px);
        }

        @include mobile {
            width: 100%;
            margin-top: scaling(20);
            padding-top: scaling(20);
        }

        &:nth-child(1),
        &:nth-child(2) {
            margin-top: 0;
            padding-top: 0;
            border-top: none;
        }

        &:nth-child(2) {
            @include desktop--small {
                margin-top: scaling(28);
                padding-top: scaling(28);
                border-top: 1px solid rgba($c-gray, 0.5);
            }

            @include mobile {
                margin-top: scaling(20);
                padding-top: scaling(20);
                border-top: 1px solid rgba($c-gray, 0.5);
            }
        }

        &Date {
            margin-bottom: scaling(12);
            color: $c-gold--darken;
            font-size: scaling(14);
            line-height: $lh-160;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-weight: $fw-medium;
            font-family: $family-graphic;

            @include desktop--large {
                margin-bottom: scaling(20);
            }

            @include desktop {
                margin-bottom: scaling(16);
                font-size: scaling(12);
                line-height: $lh-140;
            }

            @include tablet {
                font-size: scaling(12);
            }

            @include mobile {
                margin-bottom: scaling(8);
                font-size: scaling(12);
            }
        }

        &Text {
            color: $c-white;
            font-size: scaling(14);
            line-height: $lh-160;
            font-family: $family-graphic;

            @include desktop--large {
                font-size: scaling(20);
                line-height: $lh-150;
            }

            @include tablet {
                line-height: $lh-150;
            }

            @include mobile {
                font-size: scaling(12);
            }
        }
    }
}
</style>
