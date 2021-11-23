export const state = () => ({
    activePage: 1,
    countPages: 1,
    news: [],
    categories: [],
    activeCategory: 'all',
    years: [],
    activeYear: 'all'
});

export const mutations = {
    setNews(state, data) {
        state.news = [...data.news];
        state.countPages = Number(data.countPages);
        // state.categories = [...data.categories];
        // state.years = [...data.years];
    },

    setActivePage(state, activePage) {
        state.activePage = activePage;
    },

    setActiveCategory(state, activeCategory) {
        state.activeCategory = activeCategory;
    },

    setActiveYear(state, activeYear) {
        state.activeYear = activeYear;
    }
};
