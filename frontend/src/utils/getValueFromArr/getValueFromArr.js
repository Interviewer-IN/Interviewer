export function getValueFromArr(arr, value, nameField) {
    // arr - array for filter
    // value - can be [id] as number or [value] as string
    // nameField - name of column from table. can be [title, name] as string

    if (typeof value === 'string') {
        let result = arr.find((currentElem) => {
            return currentElem[nameField] === value

        });

        if (result === undefined) {
            return 0;
        } else {
            return result.id;
        }
    }

    if (typeof value === 'number') {
        let result = arr.find((currentElem) => {
            return currentElem.id === value
        });
        return result[nameField];
    }


}

