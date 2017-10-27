export function filterByDates(dateFromFilter, dateToFilter, interviews) {

    let dateDay = new Date(dateToFilter).toLocaleString('en-GB', {day: 'numeric'}),
        dateMonth = new Date(dateToFilter).toLocaleString('en-GB', {month: 'long'}),
        dateYear = new Date(dateToFilter).toLocaleString('en-GB', {year: 'numeric'}),

        isDateFilterValid = dateFromFilter < dateToFilter ||
            (dateFromFilter && !dateToFilter) ||
            (!dateFromFilter && dateToFilter) ||
            (!dateFromFilter && !dateToFilter),

        equalFilterDates = (dateFromFilter && dateToFilter) ?
            (dateFromFilter._d.getTime() === dateToFilter._d.getTime()) : "";


    if (dateFromFilter && isDateFilterValid) {
        interviews = interviews.filter((current) => {
            let currentDate = new Date(current.date_time).getTime();
            return (currentDate > dateFromFilter);
        });
    }

    if (dateToFilter && isDateFilterValid) {
        interviews = interviews.filter((current) => {
            let currentDate = new Date(current.date_time).getTime();
            return (currentDate < dateToFilter);
        });
    }

    // if (!isDateFilterValid && !equalFilterDates) {
    //     filterErrorMessage = "Invalid date range"
    // }

    if (dateToFilter && dateToFilter && equalFilterDates) {
        interviews = interviews.filter((current) => {
            let currentDateDay = new Date(current.date_time).toLocaleString('en-GB', {
                day: 'numeric'
            });
            let currentDateMonth = new Date(current.date_time).toLocaleString('en-GB', {
                month: 'long'
            });
            let currentDateYear = new Date(current.date_time).toLocaleString('en-GB', {
                year: 'numeric'
            });
            return (currentDateDay === dateDay && currentDateMonth === dateMonth &&
            currentDateYear === dateYear);
        });
    }

    return interviews;
}

export function setErrorDateMessage(dateFromFilter, dateToFilter) {
    let filterErrorMessage;

    let isDateFilterValid = dateFromFilter < dateToFilter ||
            (dateFromFilter && !dateToFilter) ||
            (!dateFromFilter && dateToFilter) ||
            (!dateFromFilter && !dateToFilter),

        equalFilterDates = (dateFromFilter && dateToFilter) ?
            (dateFromFilter._d.getTime() === dateToFilter._d.getTime()) : "";

    if (!isDateFilterValid && !equalFilterDates) {
        filterErrorMessage = "Invalid date range"
    }

    return filterErrorMessage;
}


