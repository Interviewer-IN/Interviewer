import React, {Component} from 'react';
import './vacanciesOpen.css';
import Helmet from "react-helmet";
import {PanelGroup} from 'react-bootstrap';

import PageTitle from './../../containers/PageTitle';
import Filters from './../../components/Filters';
import Panels from './../../components/Panels';

class VacanciesOpen extends Component {

    componentWillMount() {
        this.props.onCheckUserRole();
    }

    render() {

        const panelTitle = (
            <div className="custom-panel-title panel-list-item">
                <div className="custom-panel-title__right-side">
                    <div className="panel-collapse-btn">
                        <span className="panel-collapse-btn__title btn-js">Expand</span>
                        <span className="fa fa-angle-right panel-collapse-btn__arrow arrow-js"/>
                    </div>
                </div>
                <div className="custom-panel-title__left-side">
                    <div className="vacancy-info-block">
                        <div className="vacancy-info-block__item">Project</div>
                        <div className="vacancy-info-block__item">Position</div>
                        <div className="vacancy-info-block__item">Level</div>
                    </div>
                </div>
            </div>
        );

        let description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi atque beatae culpa enim necessitatibus nesciunt perferendis, quisquam quod reiciendis temporibus? Distinctio id praesentium quia ratione saepe. Asperiores natus similique ullam.';

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
                            <Panels
                                showActionBtn={true}
                                titleForActionBtn='Close vacancy'
                                titleConst={panelTitle}
                                showEditBtn={true}
                                showDuplicateBtn={true}
                                showDeleteBtn={true}
                                description={description}
                            />
                        </PanelGroup>
                    </div>
                </div>
            </div>
        );
    }
}

export default VacanciesOpen;