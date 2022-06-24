import {$authHost, $host} from "./index";

export const createCollection = async (collection) => {
    const {data} = await $authHost.post('api/collection/create', collection);
    return data;
};

export const fetchCollections = async () => {
    const {data} = await $host.get('api/collection');
    return data;
};

export const removeCollection = async (id) => {
    debugger
    const {data} = await $host.put('api/collection/delete', {id:id});
    return data;
};