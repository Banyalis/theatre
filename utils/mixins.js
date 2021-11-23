import { mapActions, mapMutations, mapState } from 'vuex';
import { CONFIG_POPUPS } from '@/utils/constants';

export const mixinOpenPopup = {
    beforeRouteLeave(to, from, next) {
        this.routePopup(to, next);
        this.updateProcessing(true);
    },

    beforeRouteUpdate(to, from, next) {
        this.routePopup(to, next);
        this.updateProcessing(true);
    },

    computed: {
        ...mapState('popup', ['isOpen', 'rootUrl', 'isProcessing'])
    },

    mounted() {
        if (this.$route.params.popupSlug && !this.isProcessing) {
            const to = {
                name: this.$route.name,
                path: this.$route.path
            };

            const rootUrl = this.getRootUrl(
                to.path,
                this.$route.params.popupSlug
            );

            const next = () => {};

            this.routePopup(to, next, rootUrl);
        }
    },

    methods: {
        routePopup(to, next, rootUrl) {
            const isPopup = this.isPopup(to);

            !isPopup && next();

            if (isPopup) {
                this.openPopup(to.path, rootUrl, next);
            } else if (this.isOpen) {
                this.closePopup();
            }

            this.updateProcessing(false);
        },

        isPopup(to) {
            const currentPopup = Object.values(CONFIG_POPUPS).filter(
                (popup) => popup.name === to.name
            );

            return !!currentPopup.length;
        },

        openPopup(path, rootUrl, next) {
            this.updateApi(path);
            this.updateNextFunction(next);

            rootUrl && this.updateRootUrl(rootUrl);
        },

        closePopup() {
            this.closePopupAction();

            this.clearRootUrl();
        },

        getRootUrl(path, slug) {
            const subStr = '/' + slug;

            return path.replace(subStr, '');
        },

        ...mapMutations({
            updateApi: 'popup/updateApi',
            updateRootUrl: 'popup/updateRootUrl',
            updateProcessing: 'popup/updateProcessing',
            clearRootUrl: 'popup/clearRootUrl',
            updateNextFunction: 'popup/updateNextFunction'
        }),

        ...mapActions({
            closePopupAction: 'popup/close'
        })
    }
};
