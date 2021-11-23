export const state = () => ({
    content: {}
});

export const mutations = {
    setContent(state, content) {
        state.content = { ...content };
    }
};
