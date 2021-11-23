import fs from 'fs';

// we can get data from any DB
async function getDataFromDB({ slug }) {
    return await JSON.parse(
        fs.readFileSync(`api/data/person-${slug}.json`, 'UTF-8')
    );
}

export async function get({ slug }) {
    return await getDataFromDB({ slug });
}
