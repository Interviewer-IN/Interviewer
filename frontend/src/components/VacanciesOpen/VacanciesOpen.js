import React, {Component} from 'react';
import './vacanciesOpen.css';
import Helmet from "react-helmet";
import {PanelGroup} from 'react-bootstrap';
import {connect} from "react-redux";

import PageTitle from './../../containers/PageTitle';
import Filters from './../../components/Filters';
import Panels from './../../components/Panels';
import {getVacancies} from "../../redux/actions/vacanciesActions";

class VacanciesOpen extends Component {

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(getVacancies());
        this.props.onCheckUserRole();
        console.log('Will mount', this);
    }


    render() {

        console.log('Render', this);

        let vacanciesList = this.props.vacancies.vacancies,
            projectsList = this.props.projects.projects,
            levelsList = this.props.levels.levels,
            positionsList = this.props.positions.positions,
            levelsTitleObj = {},
            positionsTitleObj = {},
            projectsTitleObj = {},
            vacanciesToDisplay = [];


        if (vacanciesList.length && projectsList.length && levelsList.length && positionsList.length) {

            projectsList.forEach((item) => {
                projectsTitleObj[item.id] = item.title;
            });


            levelsList.forEach((item) => {
                levelsTitleObj[item.id] = item.name;
            });

            positionsList.forEach((item) => {
                positionsTitleObj[item.id] = item.name;
            });

            vacanciesToDisplay = vacanciesList.map((item) => {
                    let vacancyId = item.id,
                        projectId = item.project_id,
                        levelId = item.level_id,
                        positionId = item.position_id;

                    const PAGE_TITLE = (
                        <div className="custom-panel-title panel-list-item">
                            <div className="custom-panel-title__right-side">
                                <div className="panel-collapse-btn">
                                    <span className="panel-collapse-btn__title btn-js">Expand</span>
                                    <span className="fa fa-angle-right panel-collapse-btn__arrow arrow-js"/>
                                </div>
                            </div>
                            <div className="custom-panel-title__left-side">
                                <div className="info-block">
                                    <div className="info-block__item">
                                        <span className="text-bold">{positionsTitleObj[positionId]}</span>
                                        <span> </span>
                                        <span className="text-bold">{levelsTitleObj[levelId]}</span>
                                        <span> for </span>
                                        <span className="text-bold">{projectsTitleObj[projectId]}</span>
                                        <span> project</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                    return (
                        <Panels
                            key={vacancyId}
                            id={vacancyId}
                            showActionBtn={true}
                            titleForActionBtn='Close vacancy'
                            titleConst={PAGE_TITLE}
                            showEditBtn={true}
                            showDuplicateBtn={true}
                            showDeleteBtn={true}
                            editBtnId={"edit-vacancy-" + vacancyId}
                            dublicateBtnId={"dublicate-vacancy-" + vacancyId}
                            deleteBtnId={"delete-vacancy-" + vacancyId}
                            description={item.description}
                        />
                    )
                }
            )
        } else {
            vacanciesToDisplay = 'No vacancies';
        }


        return (
            <div className="bcgr">
                <Helmet>
                    <title>Vacancy</title>
                </Helmet>
                <div className="row sameheight-container">
                    <div className="col-md-12">
                        <PageTitle
                            pageTitle='Open vacancies'
                            showBackBtn={false}
                            showButton={true}
                            titleForButton='Create vacancy'
                            linkForButton='/vacancies-open/create-vacancy'
                        />
                        <Filters
                            project={true}
                            position={true}
                            level={true}
                            date={false}
                        />

                        <PanelGroup bsClass='custom-panel-group'>
                            {vacanciesToDisplay}
                        </PanelGroup>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        vacancies: state.vacancies,
        projects: state.project,
        levels: state.levels,
        positions: state.positions
    }
}

export default connect(mapStateToProps)(VacanciesOpen);