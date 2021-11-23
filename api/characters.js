import fs from 'fs';

// we can get data from any DB
async function getDataFromDB({ id }) {
    return await JSON.parse(
        fs.readFileSync(`api/data/performance-characters-${id}.json`, 'UTF-8')
    );
}

export async function get({ id }) {
    return await getDataFromDB({ id });
}
