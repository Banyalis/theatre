import fs from 'fs';

// we can get data from any DB
async function getListFromDB() {
    return await JSON.parse(
        fs.readFileSync(`api/data/performances-list.json`, 'UTF-8')
    );
}

async function getDataFromDB({ id }) {
    return await JSON.parse(
        fs.readFileSync(`api/data/performances-${id}.json`, 'UTF-8')
    );
}

export async function list() {
    return await getListFromDB();
}

export async function get({ id }) {
    return await getDataFromDB({ id });
}
