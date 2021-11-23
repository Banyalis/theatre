<template>
    <div class="ConcertTitle" v-text="title"></div>
</template>

<script>
export default {
    name: 'ConcertTitle',

    props: {
        title: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.ConcertTitle {
    @include text--button;

    padding: scaling(32) 0 scaling(16);
    text-align: center;
    border-bottom: 1px solid $c-black;
    background-color: $c-gray-95;

    @include desktop--large {
        padding: scaling(64) 0 scaling(32);
    }

    @include desktop {
        padding: scaling(48) 0 scaling(24);
    }

    @include desktop--small {
        padding: scaling(40) 0 scaling(20);
    }
}
</style>
