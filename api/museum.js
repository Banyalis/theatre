import fs from 'fs';

// we can get data from any DB
async function getDataFromDB() {
    return await JSON.parse(fs.readFileSync(`api/data/museum.json`, 'UTF-8'));
}

export async function get() {
    return await getDataFromDB();
}
