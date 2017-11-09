import React, {Component} from "react";
import "./filters.css";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {showProjects} from "../../redux/actions/projectActions";
import {getLevels} from "../../redux/actions/levelsActions";
import {getPositions} from "../../redux/actions/positionActions";
import {getRatings} from "../../redux/actions/ratingActions";
import {getInterviewers} from "../../redux/actions/interviewersActions";

class Filters extends Component {


    constructor(props) {
        super(props);
        this.state = {
            startDate: "",
            endDate: "",
            dateFilterToHideId: "filterDatePicker",
            allFilterToHideID: "allFiltersContainer"
        }
    }

    componentWillMount() {
        const {dispatch} = this.props;

        if (!this.props.newProject.projects.length) {
            dispatch(showProjects());
        }

        if (!this.props.positions.length) {
            dispatch(getPositions());
        }

        if (!this.props.levels.length) {
            dispatch(getLevels());
        }

        if (!this.props.ratings.length) {
            dispatch(getRatings());
        }

        if (!this.props.interviewers.length) {
            dispatch(getInterviewers());
        }

    }

    getDateFromFilterVal(date) {
        this.setState({
            startDate: date
        });
        this.props.dateFromFilterVal(date);
    }

    getDateToFilterVal(date) {
        this.setState({
            endDate: date
        });
        this.props.dateToFilterVal(date);

    }

    getPositionFilterVal(event) {
        let positionFilterVal = event.target.value;
        this.props.positionFilterVal(positionFilterVal);
    }

    getLevelFilterVal(event) {
        let levelFilterVal = event.target.value;
        this.props.levelFilterVal(levelFilterVal);
    }

    getRatingFilterVal(event) {
        let ratingFilterVal = event.target.value;
        this.props.ratingFilterVal(ratingFilterVal);
    }

    getProjectFilterVal(event) {
        let projectFilterVal = event.target.value;
        this.props.projectFilterVal(projectFilterVal);
    }

    getInterviewerFilterVal(event) {
        let interviewerFilterVal = event.target.value;
        this.props.interviewerFilterVal(interviewerFilterVal);
    }


    handleDateClick() {
        let dateFields = document.querySelector("#filterDatePicker").classList;
        if (dateFields.contains('hide')) {
            dateFields.remove('hide');
        }else {
            dateFields.add('hide');
        }
    }

    handleFilterClick() {
        let filterField = document.querySelector("#allFiltersContainer");
            if(filterField.style.display === "block") {
                filterField.style.display = "none";
            }else {
                filterField.style.display = "block";
            }
        }

    render() {

        let projectFilter = this.props.project,
            positionFilter = this.props.position,
            levelFilter = this.props.level,
            interviewerFilter = this.props.interviewer,
            ratingFilter = this.props.rating,
            dateFilter = this.props.date,
            dateIcon = this.props.dateIcon,
            searchBoxFilter = this.props.searchBoxFilter,
            projectFilterId = this.props.projectId,
            positionFilterId = this.props.positionId,
            levelFilterId = this.props.levelId,
            interviewerFilterId = this.props.interviewerId,
            ratingFilterId = this.props.ratingId,
            dateFromFilterId = this.props.dateFromId,
            dateToFilterId = this.props.dateToId,
            dateFilterErrorMessage = this.props.dateErrorMessage;

        let showProjectFilter = (project) => {
            if (project) {

                let projectList = this.props.newProject.projects,
                    options = [];

                if (projectList.length) {
                    let compareTitle = (a, b) => {
                            if (a.title > b.title) return 1;
                            if (a.title < b.title) return -1;
                        },
                        sortedProjects = projectList.sort(compareTitle) || {};

                    options = sortedProjects.map((item, index) => {

                        let title = item.title.length < 10 ? item.title : item.title.slice(0, 10) + "...";

                        return (
                            <option key={index}>{title}</option>
                        )
                    });
                }

                return (
                    <div className="form-group fields-group can-hide">
                        <select className="form-control form-control-sm filter-select custom-mode"
                                id={projectFilterId}
                                onChange={(event) => this.getProjectFilterVal(event)}
                        >
                            <option>Project</option>
                            {options}
                        </select>
                    </div>
                );
            }
        };

        let showPositionFilter = (position) => {

            let positionsList = this.props.positions,
                options = [];


            if (positionsList.length) {
                let compareName = (a, b) => {
                        if (a.name > b.name) return 1;
                        if (a.name < b.name) return -1;
                    },
                    sortedPositions = positionsList.sort(compareName) || {};
                options = sortedPositions.map((item, index) => {

                    let name = item.name.length < 10 ? item.name : item.name.slice(0, 10) + "...";

                    return (
                        <option key={index}>{name}</option>
                    )
                });
            }

            if (position) {
                return (
                    <div className="form-group fields-group can-hide">
                        <select className="form-control form-control-sm filter-select custom-mode"
                                id={positionFilterId}
                                onChange={(event) => this.getPositionFilterVal(event)}
                        >
                            <option>Position</option>
                            {options}
                        </select>
                    </div>
                );
            }
        };

        let showLevelFilter = (level) => {

            let levelsList = this.props.levels,
                options = [];

            if (levelsList.length) {
                let compareName = (a, b) => {
                        if (a.name > b.name) return 1;
                        if (a.name < b.name) return -1;
                    },
                    sortedLevels = levelsList.sort(compareName) || {};
                options = sortedLevels.map((item, index) => {
                    let name = item.name.length < 10 ? item.name : item.name.slice(0, 10) + "...";

                    return (
                        <option key={index}>{name}</option>
                    )
                });
            }

            if (level) {
                return (
                    <div className="form-group fields-group can-hide">
                        <select className="form-control form-control-sm filter-select custom-mode"
                                id={levelFilterId}
                                onChange={(event) => this.getLevelFilterVal(event)}
                        >
                            <option>Level</option>
                            {options}
                        </select>
                    </div>
                );
            }
        };

        let showRatingFilter = (rating) => {

            let ratingsList = this.props.ratings,
                options = [];

            if (ratingsList.length) {
                let compareGrade = (a, b) => {
                        let first = +a.grade;
                        let second = +b.grade;

                        if (first > second) return 1;
                        if (first < second) return -1;
                    },
                    sortedRatings = ratingsList.sort(compareGrade) || {};
                options = sortedRatings.map((item, index) => <option key={index}>{item.grade}</option>);
            }

            if (rating) {
                return (
                    <div className="form-group fields-group can-hide">
                        <select className="form-control form-control-sm filter-select custom-mode"
                                id={ratingFilterId}
                                onChange={(event) => this.getRatingFilterVal(event)}
                        >
                            <option>Rating</option>
                            {options}
                        </select>
                    </div>
                );
            }
        };

        let showInterviewersFilter = (interviewer) => {

            let interviewerList = this.props.interviewers,
                options = [];

            if (interviewerList.length) {
                let compareSurname = (a, b) => {
                        if (a.nickname > b.nickname) return 1;
                        if (a.nickname < b.nickname) return -1;
                    },
                    sortedInterviewers = interviewerList.sort(compareSurname) || {};
                options = sortedInterviewers.map((item, index) =>
                    <option key={index}>{item.nickname}</option>);
            }

            if (interviewer) {
                return (
                    <div className="form-group fields-group can-hide">
                        <select className="form-control form-control-sm filter-select "
                                id={interviewerFilterId}
                                onChange={(event) => this.getInterviewerFilterVal(event)}
                        >
                            <option>Interviewer</option>
                            {options}
                        </select>
                    </div>
                );
            }
        };

        let showDateIcon = (dateIcon) => {
            if (dateIcon) {
                return (
                    <div className="filter-block__title float-left clearfix">
                        <i className="fa fa-calendar fa-2x custom-icon"
                           onClick={() => this.handleDateClick()}
                        >
                        </i>
                    </div>
                )
            }
        };


        let showFilterIcon = () => {
            return (
                <div className="float-left clearfix">
                    <i className="fa fa-filter fa-2x custom-icon filter-icon"
                       onClick={() => this.handleFilterClick()}
                    >

                    </i>
                </div>
            )
        };

        let showDateFilter = (date) => {
            if (date) {
                return (
                    <div className="filter-block filter-block--date clearfix float-left hide"
                         id="filterDatePicker">
                        <div className="filter-block__selects">
                            <div className="form-group fields-group date-fields clearfix">
                                <DatePicker
                                    id={dateFromFilterId}
                                    className="form-control form-control-sm filter-select"
                                    placeholderText="From"
                                    dateFormat="DD/MM/YYYY"
                                    isClearable={true}
                                    selected={this.state.startDate}
                                    onChange={(event) => this.getDateFromFilterVal(event)}
                                />
                            </div>
                            <div className="form-group fields-group date-fields  float-left">
                                <DatePicker
                                    id={dateToFilterId}
                                    className="form-control form-control-sm filter-select"
                                    placeholderText="To"
                                    dateFormat="DD/MM/YYYY"
                                    isClearable={true}
                                    selected={this.state.endDate}
                                    onChange={(event) => this.getDateToFilterVal(event)}
                                />
                            </div>
                        </div>
                        <p className="error-message">{dateFilterErrorMessage}</p>
                    </div>
                );
            }
        };

        let showSearchBoxFilter = (searchBoxFilter) => {
            if (searchBoxFilter) {
                return (
                    <div className="form-group fields-group cant-hide">
                        <input className="form-control form-control-sm filter-select search-box"
                               id="filterSearchBox"
                               placeholder="Search..."/>
                    </div>
                )
            }
        };

        return (
            <div className="filters-section clearfix">
                <div className="filter-block clearfix">
                    <div className="filter-block__selects float-left">
                        {showDateIcon(dateIcon)}
                        {showFilterIcon()}
                        <div className="float-left clearfix"
                             id="allFiltersContainer">
                            {showProjectFilter(projectFilter)}
                            {showPositionFilter(positionFilter)}
                            {showLevelFilter(levelFilter)}
                            {showInterviewersFilter(interviewerFilter)}
                            {showRatingFilter(ratingFilter)}
                        </div>
                        {showSearchBoxFilter(searchBoxFilter)}
                    </div>
                    <div className="filter-block float-left">
                        {showDateFilter(dateFilter)}
                    </div>
                </div>
            </div>
        );
    }
}

Filters.propTypes = {
    project: PropTypes.bool,
    position: PropTypes.bool,
    level: PropTypes.bool,
    interviewer: PropTypes.bool,
    rating: PropTypes.bool,
    date: PropTypes.bool,
    dateIcon: PropTypes.bool,
    searchBoxFilter: PropTypes.bool,
    projectFilterId: PropTypes.string,
    positionFilterId: PropTypes.string,
    levelFilterId: PropTypes.string,
    interviewerFilterId: PropTypes.string,
    ratingFilterId: PropTypes.string,
    dateFromFilterId: PropTypes.string,
    dateToFilterId: PropTypes.string,
    dateFilterErrorMessage: PropTypes.string

};


function mapStateToProps(state) {
    return {
        newProject: state.project,
        levels: state.levels.levels,
        positions: state.positions.positions,
        ratings: state.ratings.ratings,
        interviewers: state.interviewers.interviewers,
    }
}

export default connect(mapStateToProps)(Filters);