import {$authHost, $host} from "./index";

export const saveAdditionalFields = async (collectionId, additionalFields) => {
    let dataLog;
    const temp = additionalFields;
    for (const additionalField of temp) {
        const {data} = await $authHost.post('api/add_field/create', {collectionId, additionalField})
    }
    return  dataLog;
};

export const getAdditionalFields = async () => {
    const {data} = await $host.get('api/add_field_set');
    console.log(data)
    return data;
};

export const removeCollection = async () => {

};