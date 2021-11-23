export const state = () => ({
    data: {},
    isOpen: false,
    // True for popups, which has own URL
    isPage: false,
    type: null,
    isProcessing: false,
    // API URL for getting popup data
    currentApi: '',
    // URL to route after popup close if open it by direct link
    rootUrl: '',
    // Next function in nuxt router events (to, from, next)
    nextFunction: null,
    title: '',
    titleMobile: '',
    headerHeight: 0,
    hasBackButton: false,
    customTitleDesktop: '',
    customTitleMobile: ''
});

export const mutations = {
    updateType(state, type) {
        state.type = type;
    },

    openPopup(state) {
        state.isOpen = true;
    },

    setCustomTitle(state, { titleDesktop, titleMobile }) {
        state.customTitleDesktop = titleDesktop;
        state.customTitleMobile = titleMobile;
    },

    closePopup(state) {
        state.isOpen = false;
        state.currentApi = '';
        state.isProcessing = false;
        state.type = undefined;
        state.data = {};
        // Clear header title when close popup, because otherwise it will shown for new popup, which has no title
        state.title = '';
        state.titleMobile = '';
        state.customTitle = '';
    },

    // Set isOpen false if open popup from another popup
    resetOpeningPopup(state) {
        state.isOpen = false;
    },

    updateData(state, data) {
        state.data = data;
    },

    updateApi(state, path) {
        state.currentApi = path;
    },

    updateRootUrl(state, rootUrl) {
        state.rootUrl = rootUrl;
    },

    updateProcessing(state, processing) {
        state.isProcessing = processing;
    },

    updateNextFunction(state, next) {
        state.nextFunction = next;
    },

    updateHeader(state, { title, titleMobile, hasBackButton = false }) {
        state.title = title;
        state.titleMobile = titleMobile;
        state.hasBackButton = hasBackButton;
    },

    updateHeaderHeight(state, height) {
        state.headerHeight = height;
    },

    updateIsPage(state, isPage) {
        state.isPage = isPage;
    }
};

export const getters = {
    getStatus(state) {
        return state.isOpen;
    }
};

export const actions = {
    open({ commit }, payload) {
        commit('blockScroll', null, { root: true });
        commit('openPopup', payload);
    },

    close({ commit }, payload) {
        commit('closePopup', payload);
        commit('unblockScroll', null, { root: true });
    },

    setType({ commit }, payload) {
        commit('updateType', payload);
    }
};
