<template>
    <div class="DatesPopup">
        <CommonPopupSidebar>
            <CommonPopupPoster :poster="data.sidebar.intro" :theme="'dates'" />
        </CommonPopupSidebar>
        <CommonPopupMain>
            <DatesPopupCalendar :calendar="data.main" />
        </CommonPopupMain>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import CommonPopupSidebar from '@/components/common/CommonPopupSidebar';
import CommonPopupPoster from '@/components/common/CommonPopupPoster';
import CommonPopupMain from '@/components/common/CommonPopupMain';
import DatesPopupCalendar from '@/components/popups/dates/DatesPopupCalendar';

export default {
    name: 'DatesPopup',

    components: {
        CommonPopupSidebar,
        CommonPopupPoster,
        CommonPopupMain,
        DatesPopupCalendar
    },

    computed: {
        ...mapState('popup', ['data'])
    }
};
</script>

<style lang="scss" scoped>
.DatesPopup {
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

    .CommonPopupSidebar {
        width: 100%;

        @include desktop--large {
            width: (480 * 100% / 1920);
        }

        @include desktop {
            width: (360 * 100% / 1440);
        }

        @include desktop--small {
            width: (300 * 100% / 1200);
        }

        @include laptop {
            width: (240 * 100% / 960);
        }
    }

    .CommonPopupMain {
        width: 100%;

        @include desktop--large {
            width: (1440 * 100% / 1920);
        }

        @include desktop {
            width: (1080 * 100% / 1440);
        }

        @include desktop--small {
            width: (900 * 100% / 1200);
        }

        @include laptop {
            width: (720 * 100% / 960);
        }
    }
}
</style>
