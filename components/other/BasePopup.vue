<template>
    <div class="BasePopup" :class="[{ isOpen: popupStatus }, type]">
        <div class="BasePopup-inner">
            <CommonPopupHead
                v-if="title"
                :title="title"
                :title-mobile="titleMobile"
                :has-back-button="hasBackButton"
            />
            <div class="BasePopup-wrapper">
                <component :is="type" @close="closePopup" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';
import { CONFIG_POPUPS } from '@/utils/constants';

import CommonPopupHead from '@/components/common/CommonPopupHead';
import SceneSelectPopup from '@/components/scene/SceneSelectPopup';
import CalendarPopup from '@/components/popups/calendar/CalendarPopup';
import CharactersPopup from '@/components/popups/characters/CharactersPopup';
import CategoriesNewsPopup from '@/components/popups/categoriesNews/CategoriesNewsPopup';
import YearsNewsPopup from '@/components/popups/yearsNews/YearsNewsPopup';
import PerformancePopup from '@/components/popups/performance/PerformancePopup';
import DatesPopup from '@/components/popups/dates/DatesPopup';

export default {
    name: 'BasePopup',

    components: {
        CommonPopupHead,
        SceneSelectPopup,
        CalendarPopup,
        CharactersPopup,
        CategoriesNewsPopup,
        YearsNewsPopup,
        PerformancePopup,
        DatesPopup
    },

    computed: {
        ...mapState('popup', [
            'isOpen',
            'isPage',
            'currentApi',
            'type',
            'rootUrl',
            'nextFunction',
            'title',
            'titleMobile',
            'hasBackButton'
        ]),
        ...mapState(['savedScrollPosition']),
        ...mapGetters({
            popupStatus: 'popup/getStatus'
        })
    },

    watch: {
        currentApi(newValue) {
            if (newValue) {
                this.getData(newValue);
            }
        }
    },

    mounted() {
        this.setScrollBarWidth();
    },

    methods: {
        getData(currentApi) {
            this.$axios
                .get(`${this.$config.baseURL}${currentApi}`)
                .then(this.processResponse)
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error);
                });
        },

        processResponse(response) {
            const typedPopup = this.getTypedPopup(response.data?.type);
            this.nextFunction && this.nextFunction();
            this.resetOpeningPopup();
            this.updateType(typedPopup);
            this.updateData(response.data);
            this.openPopup();
        },

        closePopup() {
            // If Popup is Page, it's necessary to route to previous Page
            if (this.isPage) {
                if (window.history.length <= 2 && !!this.rootUrl) {
                    this.$router.push({ path: this.rootUrl });
                } else {
                    window.history.go(-1);
                }
            } else this.closePopupAction();
        },

        getTypedPopup(type) {
            return CONFIG_POPUPS[type]?.componentName;
        },

        // Calculate scrollbar width and save it in css variables
        setScrollBarWidth() {
            const outer = document.createElement('div');
            outer.style.visibility = 'hidden';
            outer.style.width = '100px';
            outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

            document.body.appendChild(outer);

            const widthNoScroll = outer.offsetWidth;
            // Force scrollbars
            outer.style.overflow = 'scroll';

            const inner = document.createElement('div');
            inner.style.width = '100%';
            outer.appendChild(inner);

            const widthWithScroll = inner.offsetWidth;
            outer.parentNode.removeChild(outer);

            document.documentElement.style.setProperty(
                '--scrollbar-width',
                widthNoScroll - widthWithScroll + 'px'
            );
        },

        ...mapMutations({
            updateType: 'popup/updateType',
            updateData: 'popup/updateData',
            resetOpeningPopup: 'popup/resetOpeningPopup'
        }),

        ...mapActions({
            openPopup: 'popup/open',
            closePopupAction: 'popup/close'
        })
    }
};
</script>

<style lang="scss" scoped>
.BasePopup {
    $component: &;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    overflow-scrolling: touch;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    z-index: $z-popup;
    transition: $d-hover opacity, 0s visibility $d-hover;

    &.isOpen {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
        transition: $d-hover opacity;
    }

    &.CalendarPopup,
    &.SceneSelectPopup {
        height: 100vh;
        min-height: auto;
        overflow-y: auto;
    }

    &-inner {
        display: flex;
        flex-flow: column;
        min-height: 100%;
    }

    &-wrapper {
        display: flex;
        flex: 1;
        width: 100%;
        position: relative;
    }
}
</style>
