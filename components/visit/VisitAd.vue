<template>
    <div class="VisitAd" :class="{ isClose }">
        <div class="VisitAd-title" v-text="`Объявление:`"></div>
        <NuxtLink
            v-if="announcement.link"
            :to="announcement.link"
            class="VisitAd-text"
            v-text="announcement.text"
        ></NuxtLink>
        <p v-else class="VisitAd-text" v-text="announcement.text"></p>
        <div class="VisitAd-close" @click="close">
            <svg-icon name="icon-cross" />
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'VisitAd',

    props: {
        announcement: {
            type: Object,
            required: true
        }
    },

    computed: {
        ...mapState('visit', ['isClose'])
    },

    methods: {
        close() {
            this.checkClose();
            this.closeAd();
        },

        checkClose() {
            const isClose = true;

            this.$emit('close-ad', isClose);
        },

        ...mapMutations({
            closeAd: 'visit/closeAd'
        })
    }
};
</script>

<style lang="scss" scoped>
.VisitAd {
    $component: &;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: $c-black;
    will-change: transform;

    &.isClose {
        display: none;
    }

    &-title {
        @include heading-3;

        margin-right: scaling(5);
        padding-left: scaling(16);
        color: $c-white;

        @include desktop--large {
            padding-left: scaling(32);
        }

        @include desktop {
            padding-left: scaling(24);
        }

        @include desktop--small {
            padding-left: scaling(20);
        }

        @include mobile {
            flex: 1;
            margin-right: 0;
            line-height: $lh-130;
        }
    }

    &-text {
        @include heading-3;

        flex: 1;
        color: $c-white;
        transition: color $d-hover ease-in-out;

        @include mobile {
            flex: auto;
            order: 3;
            width: 100%;
            padding: scaling(20) scaling(16);
            border-top: 1px solid $c-gray--header;
        }

        @include hover {
            &:is(a):hover {
                color: $c-red;
            }
        }
    }

    &-close {
        display: flex;
        padding: scaling(15);
        border-left: 1px solid $c-gray--header;
        cursor: pointer;

        @include desktop--large {
            padding: scaling(21);
        }

        @include desktop {
            padding: scaling(18);
        }

        @include mobile {
            padding: scaling(16);
        }

        svg {
            width: scaling(18);
            height: scaling(18);
            fill: $c-white;
            transition: fill $d-hover ease-in-out;

            @include desktop--large {
                width: scaling(22);
                height: scaling(22);
            }

            @include desktop {
                width: scaling(20);
                height: scaling(20);
            }

            @include mobile {
                width: scaling(16);
                height: scaling(16);
            }
        }

        @include hover {
            &:hover svg {
                fill: $c-red;
            }
        }
    }
}
</style>
