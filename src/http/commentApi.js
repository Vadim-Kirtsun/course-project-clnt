import {$authHost, $host} from "./index";

export const createComment = async (comment) => {
    const {data} = await $authHost.post('api/comment/create', comment);
    return data;
};

export const fetchComments = async () => {
    const {data} = await $host.get('api/comment');
    return data;
};

export const fetchCommentsByItem = async (itemId) => {
    const {data} = await $host.get('api/comment/item/' + itemId);
    return data;
};