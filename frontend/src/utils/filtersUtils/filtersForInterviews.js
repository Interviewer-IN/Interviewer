export function filterByPosition(positionFilterID, interviews, vacancies) {

        let newInterviews = [];
        interviews.filter((current) => {
            let currentInterview = current;
            vacancies.filter((item) => {
                if (item.position_id === positionFilterID && currentInterview.vacancy_id === item.id) {
                    newInterviews.push(currentInterview);
                }
            });
        });
        return newInterviews;

}

export function filterByLevel(levelFilterID, interviews, vacancies) {

        let newInterviews = [];
        interviews.filter((current) => {
            let currentInterview = current;
            vacancies.filter((item) => {
                if (item.level_id === levelFilterID && currentInterview.vacancy_id === item.id) {
                    newInterviews.push(currentInterview);
                }
            });
        });
        return newInterviews;
}

export function filterByProject(projectFilterID, interviews, vacancies) {

        let newInterviews = [];
        interviews.filter((current) => {
            let currentInterview = current;
            vacancies.filter((item) => {
                if (item.project_id === projectFilterID && currentInterview.vacancy_id === item.id) {
                    newInterviews.push(currentInterview);
                }
            });
        });
        return newInterviews;
}

export function filterByRating(ratingFilterID, interviews) {

    let newInterviews = interviews.filter((current) => {
            return (current.rating_id === ratingFilterID);
        });

    return newInterviews

}
