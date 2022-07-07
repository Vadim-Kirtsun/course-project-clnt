import {$host} from "./index";

export const createLike = async (userId, itemId) => {
    const {data} = await $host.post('api/like/', {userId, itemId});
    return data;
};