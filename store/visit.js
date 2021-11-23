export const state = () => ({
    announcement: {},
    categories: [],
    content: {},
    isClose: false,
    isShowContent: false
});

export const mutations = {
    setAnnouncement(state, announcement) {
        state.announcement = { ...announcement };
    },

    setCategories(state, categories) {
        state.categories = [...categories];
    },

    setContent(state, content) {
        state.content = { ...content };
    },

    closeAd(state) {
        state.isClose = true;
    },

    toggleShowContent(state, isShow) {
        state.isShowContent = isShow;
    }
};
