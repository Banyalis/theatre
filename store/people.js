export const state = () => ({
    nav: {},
    content: {}
});

function mapRole(role) {
    return {
        ...role,
        // Sort members by Fullname
        members: (role.members || []).sort((a, b) => {
            const aFullName = a.second_name + a.first_name;
            const bFullName = b.second_name + b.first_name;
            if (aFullName > bFullName) return 1;
            if (aFullName < bFullName) return 1;
            return 0;
        })
    };
}

function mapGroup(group) {
    return {
        ...group,
        // Sort people by Fullname
        people: (group.people || []).sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return 1;
            return 0;
        }),
        // Map list for members inside roles sorting
        list: (group.list || []).map((item) => ({
            ...item,
            roles: item.roles.map(mapRole)
        }))
    };
}

export const mutations = {
    setNav(state, nav) {
        state.nav = { ...nav };
    },

    setContent(state, content) {
        state.content = {
            // Map sections for people sorting
            ...content,
            sections: (content.sections || []).map((section) => ({
                ...section,
                groups: section.groups.map((group) => mapGroup(group))
            }))
        };
    }
};
