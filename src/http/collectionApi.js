import {$authHost, $host} from "./index";

export const createCollection = async (collection) => {
    const {data} = await $authHost.post('api/collection/create', collection);
    return data;
};

export const fetchCollections = async () => {
    const {data} = await $host.get('api/collection');
    return data;
};

export const fetchCollectionsUser = async (id) => {
    const {data} = await $host.get('api/collection/user/' + id);
    return data;
};

export const removeCollection = async (id) => {
    const {data} = await $host.delete('api/collection/' + id);
    return data;
};

export const fetchItemsById = async (id) => {
    const {data} = await $host.get('api/collection/' + id);
    return data;
};