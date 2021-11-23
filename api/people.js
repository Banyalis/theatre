import fs from 'fs';

// we can get data from any DB
async function getNavFromDB({ category }) {
    return await JSON.parse(
        fs.readFileSync(`api/data/people-${category}-nav.json`, 'UTF-8')
    );
}

async function getDataFromDB({ category, slug }) {
    const fileName = `people-${category}${slug ? '-' + slug : ''}`;

    return await JSON.parse(
        fs.readFileSync(`api/data/${fileName}.json`, 'UTF-8')
    );
}

export async function nav({ category }) {
    return await getNavFromDB({ category });
}

export async function get({ category, slug }) {
    return await getDataFromDB({ category, slug });
}
