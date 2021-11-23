export const state = () => ({
    content: {},
    photoNumber: 0
});

export const mutations = {
    setContent(state, content) {
        state.content = { ...content };
    },

    setPhotoNumber(state, photoNumber) {
        state.photoNumber = photoNumber;
    }
};
