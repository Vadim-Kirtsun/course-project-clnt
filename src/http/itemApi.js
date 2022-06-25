import {$authHost, $host} from "./index";

export const createItem = async (item) => {
    const {data} = await $authHost.post('api/item/create', item);
    return data;
};