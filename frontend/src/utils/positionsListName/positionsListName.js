export function positionsListName(positionsList) {
    let positionsTitleObj = {};
    positionsList.forEach((item) => {
        positionsTitleObj[item.id] = item.name;
    });

    return positionsTitleObj;
}