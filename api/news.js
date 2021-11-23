import fs from 'fs';

// we can get data from any DB
async function getDataFromDB({ currentPage }) {
    return await JSON.parse(fs.readFileSync(`api/data/news.json`, 'UTF-8'));
}

export async function get({ currentPage }) {
    return await getDataFromDB({ currentPage });
}
