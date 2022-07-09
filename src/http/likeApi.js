import {$host} from "./index";

export const updateLike = async (userId, itemId) => {
    const {data} = await $host.put('api/like/', {userId, itemId});
    return data;
};