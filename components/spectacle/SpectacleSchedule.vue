<template>
    <div class="SpectacleSchedule b-paddings">
        <div v-if="date" class="SpectacleSchedule-date" v-text="date"></div>
        <div v-if="time" class="SpectacleSchedule-time" v-text="time"></div>
    </div>
</template>

<script>
export default {
    name: 'SpectacleSchedule',

    props: {
        date: {
            type: String,
            default: ''
        },
        time: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" scoped>
.SpectacleSchedule {
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

    &-date {
        @include title--sans;

        color: $c-red;
        margin-bottom: scaling(4);
    }

    &-time {
        @include text;

        color: $c-gray;

        @include mobile {
            font-size: scaling(12);
            max-width: scaling(172);
        }
    }
}
</style>
