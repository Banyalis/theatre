import fs from 'fs';

async function getDataFromDB({ slug }) {
    return await JSON.parse(
        fs.readFileSync(`api/data/partners-${slug}.json`, 'UTF-8')
    );
}

export async function get({ slug }) {
    return await getDataFromDB({ slug });
}
