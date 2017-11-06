import React, {Component} from "react";
import "./filters.css";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import {showProjects} from "../../redux/actions/projectActions";
import {getLevels} from "../../redux/actions/levelsActions";
import {getPositions} from "../../redux/actions/positionActions";
import {getRatings} from "../../redux/actions/ratingActions";

class Filters extends Component {


    constructor(props) {
        super(props);
        this.state = {
            startDate: "",
            endDate: ""
        }
    }

    componentWillMount() {
        const {dispatch} = this.props;

        if (!this.props.newProject.projects.length){
            dispatch(showProjects());
        }

        if (!this.props.positions.length){
            dispatch(getPositions());
        }

        if (!this.props.levels.length){
            dispatch(getLevels());
        }

        if (!this.props.ratings.length){
            dispatch(getRatings());
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

    getPositionFilterVal(event){
        let positionFilterVal = event.target.value;
        this.props.positionFilterVal(positionFilterVal);
    }

    getLevelFilterVal(event){
        let levelFilterVal = event.target.value;
        this.props.levelFilterVal(levelFilterVal);
    }

    getRatingFilterVal(event){
        let ratingFilterVal = event.target.value;
        this.props.ratingFilterVal(ratingFilterVal);
    }

    getProjectFilterVal(event){
        let projectFilterVal = event.target.value;
        this.props.projectFilterVal(projectFilterVal);
    }

    render() {

        let projectFilter = this.props.project,
            positionFilter = this.props.position,
            levelFilter = this.props.level,
            interviewerFilter = this.props.interviewer,
            ratingFilter = this.props.rating,
            dateFilter = this.props.date,
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


                        let title =  item.title.length < 20 ? item.title : item.title.slice(0, 10) + "...";

                        return (
                            <option key={index}>{title}</option>
                        )
                    });
                }

                return (
                    <div className="form-group">
                        <select className="form-control form-control-sm filter-select custom-mode"
                                id={projectFilterId}
                                onChange = {(event) => this.getProjectFilterVal(event)}
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
                options = sortedPositions.map((item, index) => <option key={index}>{item.name}</option>);
            }

            if (position) {
                return (
                    <div className="form-group">
                        <select className="form-control form-control-sm filter-select custom mode"
                                id={positionFilterId}
                                onChange = {(event) => this.getPositionFilterVal(event)}
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
                options = sortedLevels.map((item, index) => <option key={index}>{item.name}</option>);
            }

            if (level) {
                return (
                    <div className="form-group">
                        <select className="form-control form-control-sm filter-select custom-mode"
                                id={levelFilterId}
                                onChange = {(event) => this.getLevelFilterVal(event)}
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

                        if (first> second) return 1;
                        if (first < second) return -1;
                    },
                    sortedRatings = ratingsList.sort(compareGrade) || {};
                options = sortedRatings.map((item, index) => <option key={index}>{item.grade}</option>);
            }

            if (rating) {
                return (
                    <div className="form-group">
                        <select className="form-control form-control-sm filter-select custom-mode"
                                id={ratingFilterId}
                                onChange = {(event) => this.getRatingFilterVal(event)}
                        >
                            <option>Rating</option>
                            {options}
                        </select>
                    </div>
                );
            }
        };

        let showInterviewersFilter = (interviewer) => {
            if (interviewer){
                return (
                    <div className="form-group">
                        <select className="form-control form-control-sm filter-select"
                                id={interviewerFilterId}
                        >
                            <option>Interviewer</option>
                            <option>K. Makiy</option>
                            <option>A. Larin</option>
                            <option>T. Grabets</option>
                        </select>
                    </div>
                );
            }

        };

        let showDateFilter = (date) => {
            if (date) {
                return (
                    <div className="filter-block filter-block--date clearfix">
                        <div className="filter-block__title filter-date">Date:</div>
                        <div className="filter-block__selects">
                            <div className="form-group float-left">
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
                            <div className="form-group float-left">
                                <DatePicker
                                    id={dateToFilterId}
                                    className="form-control form-control-sm filter-select custom-mode"
                                    placeholderText="To"
                                    dateFormat="DD/MM/YYYY"
                                    isClearable={true}
                                    selected={this.state.endDate}
                                    onChange={(event) => this.getDateToFilterVal(event)}
                                />
                            </div>
                            <p className="error-message">{dateFilterErrorMessage}</p>
                        </div>
                    </div>
                );
            }
        };


        return (
            <div className="filters-section">
                <div className="filter-block">
                    <div className="clearfix">
                        <div className="filter-block__title">Filters:</div>
                        <div className="filter-block__selects">
                            {showProjectFilter(projectFilter)}
                            {showPositionFilter(positionFilter)}
                            {showLevelFilter(levelFilter)}
                            {showInterviewersFilter(interviewerFilter)}
                            {showRatingFilter(ratingFilter)}
                        </div>
                    </div>
                    {showDateFilter(dateFilter)}
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
    projectFilterId: PropTypes.string,
    positionFilterId: PropTypes.string,
    levelFilterId: PropTypes.string,
    interviewerFilterId:PropTypes.string,
    ratingFilterId:PropTypes.string,
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
    }
}

export default connect(mapStateToProps)(Filters);