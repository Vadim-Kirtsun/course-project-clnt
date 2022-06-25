import {$authHost, $host} from "./index";

export const saveAdditionalFields = async (collectionId, additionalFields) => {
    let dataLog;
    for (const additionalField of additionalFields) {
        const {data} = await $authHost.post('api/add_field/create', {collectionId, additionalField})
    }
    return  dataLog;
};

export const getAdditionalFields = async () => {
    const {data} = await $host.get('api/add_field_set');
    console.log(data)
    return data;
};

export const deleteAdditionalFields = async (id) => {
    const {data} = await $host.put('api/add_field/delete', {id: id});
    return data;
};