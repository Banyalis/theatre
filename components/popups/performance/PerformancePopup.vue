<template>
    <div class="PerformancePopup">
        <CommonPopupSidebar>
            <CommonPopupPoster
                v-if="data.sidebar.intro"
                :poster="data.sidebar.intro"
                :theme="'performance'"
            />
            <PerformancePopupMember
                v-else
                :member="data.sidebar"
                :age="data.age"
            />
        </CommonPopupSidebar>
        <CommonPopupMain :theme="'performance'">
            <PerformancePopupContent :content="data.main" />
            <div
                v-if="data.sidebar.intro && data.sidebar.schedule.length"
                class="PerformancePopup-button"
            >
                <RoundedButton
                    title="Расписание и билеты"
                    type="isRed"
                    @click="scrollToSchedule"
                />
            </div>
        </CommonPopupMain>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CommonPopupSidebar from '@/components/common/CommonPopupSidebar';
import CommonPopupPoster from '@/components/common/CommonPopupPoster';
import PerformancePopupMember from '@/components/popups/performance/PerformancePopupMember';
import CommonPopupMain from '@/components/common/CommonPopupMain';
import PerformancePopupContent from '@/components/popups/performance/PerformancePopupContent';
import RoundedButton from '@/components/other/RoundedButton';

export default {
    name: 'PerformancePopup',

    components: {
        CommonPopupSidebar,
        CommonPopupPoster,
        PerformancePopupMember,
        CommonPopupMain,
        PerformancePopupContent,
        RoundedButton
    },

    computed: {
        ...mapState(['headerHeight']),
        ...mapState('popup', ['data'])
    },

    methods: {
        scrollToSchedule() {
            const options = {
                offset:
                    -this.headerHeight -
                    document.querySelector('.Performance-nav').offsetHeight +
                    1
            };

            this.closePopup();
            this.$scrollTo(document.getElementById('anchor-5'), 500, options);
        },

        ...mapActions({
            closePopup: 'popup/close'
        })
    }
};
</script>

<style lang="scss" scoped>
.PerformancePopup {
    $component: &;

    display: flex;
    width: 100%;

    @include tablet {
        flex-direction: column;
        background-color: $c-white;
    }

    @include mobile {
        flex-direction: column;
        background-color: $c-white;
    }

    .CommonPopupSidebar,
    .CommonPopupMain {
        width: 50%;

        @include tablet {
            width: 100%;
        }

        @include mobile {
            width: 100%;
        }
    }

    .CommonPopupSidebar {
        @include laptop {
            width: (320 * 100% / 960);
        }
    }

    .CommonPopupMain {
        @include laptop {
            width: (640 * 100% / 960);
        }
    }

    &-button {
        display: flex;
        justify-content: center;
        margin-top: scaling(32);

        @include desktop--large {
            margin-top: scaling(40);
        }

        @include laptop {
            margin-top: scaling(24);
        }

        @include tablet {
            justify-content: flex-start;
        }

        @include mobile {
            justify-content: flex-start;
            margin-top: scaling(24);
        }
    }
}
</style>
