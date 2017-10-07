import React, {Component} from "react";
import "./filters.css";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {showProjects} from "../../redux/actions/projectActions";
import {getLevels} from "../../redux/actions/levelsActions";
import {getPositions} from "../../redux/actions/positionActions";

class Filters extends Component {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(showProjects());
        dispatch(getLevels());
        dispatch(getPositions());
    }


    getPositionFilterVal(event){
        let positionFilterVal = event.target.value;
        this.props.positionFilterVal(positionFilterVal);
    }

    getLevelFilterVal(event){
        let levelFilterVal = event.target.value;
        this.props.levelFilterVal(levelFilterVal);
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
            dateToFilterId = this.props.dateToId;


        let showProjectFilter = (project) => {
            if (project) {

                let projectList = this.props.newProject.projects,
                    options = [];

                if (projectList.length) {
                    options = projectList.map((item, index) => {

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

            let positionsList = this.props.positions.positions,
                options = [];


            if (positionsList.length) {
                options = positionsList.map((item, index) => <option key={index}>{item.name}</option>);
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

            let levelsList = this.props.levels.levels,
                options = [];

            if (levelsList.length) {
                options = levelsList.map((item, index) => <option key={index}>{item.name}</option>);
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

        let showRatingFilter = (rating) => {
            if (rating){
                return (
                    <div className="form-group">
                        <select className="form-control form-control-sm filter-select"
                                id={ratingFilterId}
                        >
                            <option>Rating</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                );
            }

        };


        let showDateFilter = (date) => {
            if (date) {
                return (
                    <div className="filter-block filter-block--date">
                        <div className="filter-block__title filter-date">Date:</div>
                        <div className="filter-block__selects">
                            <div className="form-group float-left">
                                <select className="form-control form-control-sm filter-select custom-mode"
                                        id={dateFromFilterId}>
                                    <option>01-10-2017</option>
                                    <option>02-10-2017</option>
                                    <option>03-10-2017</option>
                                    <option>04-10-2017</option>
                                </select>
                            </div>
                            <div className="form-group float-left">
                                <select className="form-control form-control-sm filter-select custom-mode"
                                        id={dateToFilterId}>
                                    <option>01-10-2017</option>
                                    <option>02-10-2017</option>
                                    <option>03-10-2017</option>
                                    <option>04-10-2017</option>
                                </select>
                            </div>
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
    dateToFilterId: PropTypes.string

};


function mapStateToProps(state) {
    return {
        newProject: state.project,
        levels: state.levels,
        positions: state.positions
    }
}

export default connect(mapStateToProps)(Filters);