export const state = () => ({
    sceneInd: 0
});

export const mutations = {
    selectScene(state, sceneInd = 0) {
        state.sceneInd = sceneInd;
    }
};
