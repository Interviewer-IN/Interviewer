// arrForSearch - array which includes objects where we looking for the necessary value
// searchByField - can be [id] as number or [value] as string.
// nameField - name of property which we should get. Can be [title, name] as string.
// result = value which will be returned



export function getValueFromArr(arrForSearch, searchByField, nameField) {

    if (typeof searchByField === 'string') {
        let result = arrForSearch.find((currentElem) => {
            return currentElem[nameField] === searchByField

        });

        if (result === undefined) {
            return 0;
        } else {
            return result.id;
        }
    }

    if (typeof searchByField === 'number') {
        let result = arrForSearch.find((currentElem) => {
            return currentElem.id === searchByField
        });
        return result[nameField];
    }


}

