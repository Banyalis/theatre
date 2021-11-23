import fs from 'fs';

// we can get data from any DB
async function getCategoriesFromDB() {
    return await JSON.parse(
        fs.readFileSync(`api/data/visit-page-categories.json`, 'UTF-8')
    );
}

async function getDataFromDB({ id }) {
    return await JSON.parse(
        fs.readFileSync(`api/data/visit-page-${id}.json`, 'UTF-8')
    );
}

export async function get({ id }) {
    return await getDataFromDB({ id });
}

export async function categories() {
    return await getCategoriesFromDB();
}
