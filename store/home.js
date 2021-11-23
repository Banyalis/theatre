export const state = () => ({
    blocks: [],
    events: []
});

const typeMapping = {
    p: 'performance',
    t: 'preview',
    m: 'model',
    a: 'notice'
};

export const mutations = {
    setContent(state, blocks) {
        let persons;
        const resultBlocks = [];

        blocks.forEach((block) => {
            // eslint-disable-line
            if (block.size === 'pl') {
                persons = block.persons;
                return;
            }

            if (block.type === 'events') {
                if (state.events.length) {
                    resultBlocks.push({
                        ...block,
                        events: state.events
                    });
                }
                return;
            }

            if (block.type === 'news') {
                resultBlocks.push({
                    ...block
                });
                return;
            }

            if (block.type === 'partners') {
                resultBlocks.push({
                    ...block,
                    partners: [
                        {
                            url: 'https://www.ingos.ru/',
                            image: '/images/index/blocks/partners/1.png',
                            image2x: '/images/index/blocks/partners/1@2x.png',
                            type: 'Генеральный спонсор Большого театра'
                        },
                        {
                            url: 'https://www.credit-suisse.com/ru/ru.html',
                            image: '/images/index/blocks/partners/2.png',
                            image2x: '/images/index/blocks/partners/2@2x.png',
                            type: 'Привилегированный спонсор Большого театра'
                        },
                        {
                            url: 'https://gum.ru/',
                            image: '/images/index/blocks/partners/3.png',
                            image2x: '/images/index/blocks/partners/3@2x.png',
                            type: 'Привилегированный партнер Большого театра'
                        }
                    ]
                });
                return;
            }

            resultBlocks.push({
                ...block,
                type: block.type === 'group-any' ? 'group' : block.type,
                items: block.items?.map((item, index) => {
                    let kind = item.kind;

                    if (block.type === 'group') {
                        if (index === 0) {
                            kind = 't';
                        } else {
                            // kind = 'p';
                        }
                    } else if (item.kind === 'a' && !item.label) {
                        kind = 'm';
                    }

                    const buttons =
                        item.kind === 'p' && item.link && item.link.url
                            ? [
                                  {
                                      isPrimary: true,
                                      theme: item.theme_button_accent,
                                      text: 'Билеты',
                                      url: item.link.url + '#anchor-5'
                                  }
                              ]
                            : [];

                    return {
                        ...item,
                        type: typeMapping[kind],
                        image: item.image || {
                            full: item.image_desktop,
                            small: item.image_mobile
                        },
                        titles: [item.title],
                        sizeTitle: item.size_title,
                        themeText: item.theme_text,
                        themePagination: item.theme_navigation,
                        isWithLabel: item.is_with_label,
                        buttons: buttons.concat(
                            item.buttons?.map((button, index) => ({
                                ...button,
                                isPrimary: !buttons.length && index === 0,
                                theme:
                                    !buttons.length && index === 0
                                        ? item.theme_button_accent
                                        : item.theme_button_additional
                            }))
                        )
                    };
                })
            });

            if (block.size === 'pr') {
                const items = resultBlocks[resultBlocks.length - 1].items;
                const personIndex = Math.floor(
                    Math.random() * block.persons.length
                );
                items[items.length - 1].person = {
                    ...block.persons[personIndex],
                    align: 'right',
                    image: block.persons[personIndex].image
                };
            }

            if (persons) {
                const items = resultBlocks[resultBlocks.length - 1].items;
                const personIndex = Math.floor(Math.random() * persons.length);
                items[items.length - 1].person = {
                    ...persons[personIndex],
                    align: 'left',
                    image: persons[personIndex].image
                };
                persons = undefined;
            }
        });

        state.blocks = resultBlocks;
    },
    setTimetable(state, timetable) {
        state.events = timetable;
    }
};
