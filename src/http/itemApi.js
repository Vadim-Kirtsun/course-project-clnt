import {$authHost, $host} from "./index";

export const createItem = async (item) => {
    const {data} = await $authHost.post('api/item/create', item);
    return data;
};

export const removeItem = async (id) => {
    const {data} = await $authHost.delete('api/item/'+ id);
    return data;
};

export const fetchItemById = async (id) => {
    const {data} = await $host.get('api/item/' + id);
    return data;
};

export const latestNewItems = async () => {
    const {data} = await $host.get('api/item/latest');
    return data;
};

export const fetchTags = async () => {
    const {data} = await $host.get('api/tag/');
    return data;
};

export const createTags = async (tags) => {
    const {data} = await $authHost.post('api/tag/', tags);
    return data;
};

