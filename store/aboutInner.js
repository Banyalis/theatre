import Vue from 'vue';

export const state = () => ({
    content: {}
});

export const mutations = {
    setContent(state, { subCategoryContent, category, subCategory }) {
        const updatedContent = {
            ...this.content
        };
        updatedContent[category] = {
            ...updatedContent[category],
            [subCategory]: subCategoryContent
        };

        Vue.set(state, 'content', updatedContent);
    }
};
