<template>
    <div class="YearsNewsPopup">
        <div class="YearsNewsPopup-overley" @click="closePopup"></div>
        <div class="YearsNewsPopup-popup">
            <CommonPopupHead title="Года" :theme="'white'" />
            <div class="YearsNewsPopup-content">
                <div class="YearsNewsPopup-list">
                    <div
                        class="YearsNewsPopup-listItem"
                        :class="{ isActive: activeYear === 'all' }"
                        @click="setYear('all')"
                        v-text="`Все года`"
                    ></div>
                    <div
                        v-for="(item, index) in years"
                        :key="index"
                        class="YearsNewsPopup-listItem"
                        :class="{ isActive: activeYear === item.value }"
                        @click="setYear(item.value)"
                        v-text="item.title"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import CommonPopupHead from '@/components/common/CommonPopupHead';

export default {
    name: 'CharactersPopup',

    components: { CommonPopupHead },

    computed: {
        ...mapState('news', ['years', 'activeYear'])
    },

    methods: {
        setYear(id) {
            this.setActiveYear(id);
            this.closePopup();
        },

        ...mapMutations({
            setActiveYear: 'news/setActiveYear'
        }),

        ...mapActions({
            closePopup: 'popup/close'
        })
    }
};
</script>

<style scoped lang="scss">
.YearsNewsPopup {
    $component: &;

    display: flex;
    width: 100%;
    min-height: 100%;
    justify-content: flex-start;
    position: relative;

    &-overley {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        cursor: pointer;
        background: rgba($c-black--header, 0.8);
    }

    &-popup {
        width: (768 * 100% / 1920);
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;

        @include desktop {
            width: (576 * 100% / 1440);
        }

        @include desktop--small {
            width: (480 * 100% / 1200);
        }

        @include laptop {
            width: 50%;
        }

        @include tablet {
            width: 50%;
        }

        @include mobile {
            width: 100%;
        }
    }

    &-content {
        background: $c-white;
        flex: 1;
    }

    &-list {
        width: 100%;

        &Item {
            @include title;

            width: 100%;
            cursor: pointer;
            color: $c-black;
            transition: $d-hover background;

            @include desktop--large {
                letter-spacing: 0.04em;
                padding: scaling(32);
            }

            @include desktop {
                letter-spacing: 0.04em;
                padding: scaling(28) scaling(24);
            }

            @include desktop--small {
                padding: scaling(24) scaling(20);
            }

            @include laptop {
                padding: scaling(32) scaling(16);
            }

            @include tablet {
                padding: scaling(28) scaling(16);
            }

            @include mobile {
                padding: scaling(24) scaling(16);
            }

            &:not(:first-child) {
                border-top: 1px solid $c-black;
            }

            @include hover {
                &:hover {
                    background: $c-gold--lighten;
                }
            }

            &.isActive {
                cursor: default;
                pointer-events: none;
                background: $c-gold--lighten;
            }
        }
    }
}
</style>
