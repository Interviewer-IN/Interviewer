import React, {Component} from 'react';
import './filters.css';
import PropTypes from 'prop-types';
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


    render() {

        let projectFilter = this.props.project,
            positionFilter = this.props.position,
            levelFilter = this.props.level,
            dateFilter = this.props.date,
            projectFilterId = this.props.projectId,
            positionFilterId = this.props.positionId,
            levelFilterId = this.props.levelId,
            dateFromFilterId = this.props.dateFromId,
            dateToFilterId = this.props.dateToId;


        let showProjectFilter = (project) => {
            if (project) {

                let projectList = this.props.newProject.projects,
                    options = [];

                if (projectList.length) {
                    options = projectList.map((item, index) => <option key={index}>{item.title}</option>);
                }

                return (
                    <div className="form-group">
                        <select className="form-control form-control-sm custom-mode"
                                id={projectFilterId}>
                            <option>All Projects</option>
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
                        <select className="form-control form-control-sm custom-mode"
                                id={positionFilterId}>
                            <option>All Positions</option>
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
                        <select className="form-control form-control-sm custom-mode"
                                id={levelFilterId}>
                            <option>All Levels</option>
                            {options}
                        </select>
                    </div>
                );
            }

        };

        let showDateFilter = (date) => {
            if (date) {
                return (
                    <div className="filter-block filter-block--right">
                        <div className="filter-block__title">Date:</div>
                        <div className="filter-block__selects">
                            <div className="form-group">
                                <select className="form-control form-control-sm custom-mode"
                                        id={dateFromFilterId}>
                                    <option>Option one</option>
                                    <option>Option two</option>
                                    <option>Option three</option>
                                    <option>Option four</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <select className="form-control form-control-sm custom-mode"
                                        id={dateToFilterId}>
                                    <option>Option one</option>
                                    <option>Option two</option>
                                    <option>Option three</option>
                                    <option>Option four</option>
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
                    <div className="filter-block__title">Filters:</div>
                    <div className="filter-block__selects">
                        {showPositionFilter(positionFilter)}
                        {showLevelFilter(levelFilter)}
                        {showProjectFilter(projectFilter)}
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
    date: PropTypes.bool,
    projectFilterId: PropTypes.string,
    positionFilterId: PropTypes.string,
    levelFilterId: PropTypes.string,
    dateFromFilterId: PropTypes.string,
    dateToFilterId: PropTypes.string,

};


function mapStateToProps(state) {
    console.log(state);
    return {
        newProject: state.project,
        levels: state.levels,
        positions: state.positions
    }
}

export default connect(mapStateToProps)(Filters);