export const objectsToArray = (values: any) => {
    const array: Array<object> = [];

    for (let key in values) {
        array.push({
            id: key,
            ...values[key]
        })
    }

    return array;
};