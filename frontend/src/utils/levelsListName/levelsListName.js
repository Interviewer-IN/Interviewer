export function levelsListName(levelsList) {
    let levelsTitleObj = {};
    levelsList.forEach((item) => {
        levelsTitleObj[item.id] = item.name;
    });

    return levelsTitleObj;
}