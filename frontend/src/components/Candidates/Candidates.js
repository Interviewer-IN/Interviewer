import React, {Component} from 'react';
import './candidates.css';
import PageTitle from '../../containers/PageTitle';
import Filters from '../../components/Filters';
import {PanelGroup} from 'react-bootstrap';
import Panels from '../../components/Panels';

class Candidates extends Component {
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
                    <div className="info-block">
                        <div className="info-block__item">
                           <div className="info-block__project">Project</div>
                           <div className="info-block__position separate-line">
                               <span className="info-block__position-capture">
                                   Desired position:
                               </span>
                               <span className="info-block__position-name">Junior Cook</span>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        let description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem maxime quisquam quod soluta vero. Accusantium adipisci consectetur illum officiis perferendis totam vel voluptatem? Distinctio dolorum excepturi optio, repellat sapiente sint.';

        return (
            <div className="bcgr">
                <div className="row sameheight-container">
                    <div className="col-md-12">
                        <PageTitle pageTitle="Candidates"
                                   showBackBtn={false}
                                   showButton={true}
                                   titleForButton="Add candidate"
                                   linkForButton="/candidates/create-candidate"
                        />
                        <Filters level={true} position={true}/>
                        <PanelGroup bsClass='custom-panel-group'>
                            <Panels
                                titleConst={panelTitle}
                                description={description}
                                showEditBtn={true}
                                showDeleteBtn={true}

                            />
                        </PanelGroup>
                    </div>
                </div>
            </div>
        );
    }
}

export default Candidates;