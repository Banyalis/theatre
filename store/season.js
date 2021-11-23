export const state = () => ({
    content: {},
    categories: {}
});

function mapPerformances(payload) {
    const performances = {};

    for (const performance of payload) {
        const sceneType = performance.scene && performance.scene.type_scene;
        if (!performances[sceneType]) {
            performances[sceneType] = {
                scene: {
                    type: sceneType,
                    name: performance.scene && performance.scene.name,
                    // If there are no scene specified, set maximum order
                    // to position this performances at the end of the page
                    order: performance.scene?.order || Number.MAX_SAFE_INTEGER
                },
                cards: []
            };
        }

        performances[sceneType].cards.push(performance);
    }

    const scenesPerformances = Object.values(performances);

    scenesPerformances.sort((a, b) => {
        if (a.scene.order > b.scene.order) return 1;
        if (a.scene.order < b.scene.order) return -1;
        return 0;
    });

    return scenesPerformances;
}

export const mutations = {
    setContent(state, payload) {
        state.content = mapPerformances(payload);
    },

    setStaticContent(state, payload) {
        state.content = payload;
    },

    checkingCategories(state, payload) {
        state.categories = payload;
    }
};
