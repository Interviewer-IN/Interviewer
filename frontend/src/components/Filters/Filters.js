import React, {Component} from "react";
import "./filters.css";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {showProjects} from "../../redux/actions/projectActions";

class Filters extends Component{

    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(showProjects());
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

                if (projectList !== undefined) {
                    options = projectList.map((value, index) => {

                        let title =  value.title.length < 20 ? value.title : value.title.slice(0, 10) + "...";

                        return (
                            <option key={index}>{title}</option>
                        )
                    });
                }

                return (
                    <div className="form-group">
                        <select className="form-control form-control-sm filter-select"
                                id={projectFilterId}
                        >
                            <option>Project</option>
                            {options}
                        </select>
                    </div>
                );
            }
        };

        let showPositionFilter = (position) => {
            if (position){
                return (
                    <div className="form-group">
                        <select className="form-control form-control-sm filter-select"
                                id={positionFilterId}
                        >
                            <option>Position</option>
                            <option>QA</option>
                            <option>Frontend</option>
                            <option>Backend</option>
                        </select>
                    </div>
                );
            }
        };

        let showLevelFilter = (level) => {
            if (level){
                return (
                    <div className="form-group">
                        <select className="form-control form-control-sm filter-select"
                                id={levelFilterId}
                        >
                            <option>Level</option>
                            <option>Junior</option>
                            <option>Middle</option>
                            <option>Senior</option>
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
                                <select className="form-control form-control-sm filter-select"
                                        id={dateFromFilterId}>
                                    <option>01-10-2017</option>
                                    <option>02-10-2017</option>
                                    <option>03-10-2017</option>
                                    <option>04-10-2017</option>
                                </select>
                            </div>
                            <div className="form-group float-left">
                                <select className="form-control form-control-sm filter-select"
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


function mapStateToProps (state) {
    return {
        newProject: state.project
    }
}

export default connect(mapStateToProps)(Filters);