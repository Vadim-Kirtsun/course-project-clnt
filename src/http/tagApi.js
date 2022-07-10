import {$authHost, $host} from "./index";

export const fetchTags = async () => {
    const {data} = await $host.get('api/tag/');
    return data;
};

export const getTagsWithItemCount = async () => {
    const {data} = await $host.get('api/tag/withItems');
    return data;
};

export const createTags = async (tags) => {
    const {data} = await $authHost.post('api/tag/', tags);
    return data;
};