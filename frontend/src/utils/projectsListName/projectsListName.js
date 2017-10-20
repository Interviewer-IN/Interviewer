export function projectsListName(projectsList) {
    let projectsTitleObj = {};
    projectsList.forEach((item) => {
        projectsTitleObj[item.id] = item.title;
    });

    return projectsTitleObj;
}