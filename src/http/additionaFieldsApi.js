import {$authHost, $host} from "./index";

export const saveAdditionalFields = async (collectionId, additionalFields) => {

    for (const additionalField of additionalFields) {
        await $authHost.post('api/add_field/create', {collectionId, additionalField})
    }
};

export const getAdditionalFields = async () => {
    const {data} = await $host.get('api/add_field_set');
    return data;
};

export const deleteAdditionalFields = async (id) => {
    const {data} = await $host.put('api/add_field/delete', {id: id});
    return data;
};