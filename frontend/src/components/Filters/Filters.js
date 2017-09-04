import React, {Component} from 'react';
import './filters.css';
import PropTypes from 'prop-types';
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
            dateFilter = this.props.date;




        let showProjectFilter = (project) => {
            if (project) {

                let projectList = this.props.newProject.projects;

                 let options =  projectList.map((value, index) =>
                     <option key={index}>{value.title}</option>
                );

                return (
                    <div className="form-group">
                        <select className="form-control form-control-sm" id="project-filter">
                            <option>All Projects</option>
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
                        <select className="form-control form-control-sm" id="position-filter">
                            <option>All Positions</option>
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
                        <select className="form-control form-control-sm" id="level-filter">
                            <option>All Levels</option>
                            <option>Junior</option>
                            <option>Moddle</option>
                            <option>Senior</option>
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
                                <select className="form-control form-control-sm" id="date-from-filter">
                                    <option>Option one</option>
                                    <option>Option two</option>
                                    <option>Option three</option>
                                    <option>Option four</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <select className="form-control form-control-sm" id="date-to-filter">
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
            <section className="filters-section">
                <div className="filter-block">
                    <div className="filter-block__title">Filters:</div>
                    <div className="filter-block__selects">
                        {showProjectFilter(projectFilter)}
                        {showPositionFilter(positionFilter)}
                        {showLevelFilter(levelFilter)}
                    </div>
                    {showDateFilter(dateFilter)}
                </div>
            </section>
        );
    }

}

Filters.propTypes = {
    project: PropTypes.bool,
    position: PropTypes.bool,
    level: PropTypes.bool,
    date: PropTypes.bool
};


function mapStateToProps (state) {
    return {
        newProject: state.project
    }
}

export default connect(mapStateToProps)(Filters);