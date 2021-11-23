export const state = () => ({
    content: {}
});

export const mutations = {
    setContent(state, { content, category }) {
        const currentContent = { ...state.content };

        currentContent[category] = { ...content };
        state.content[category] = { ...currentContent };
    }
};
