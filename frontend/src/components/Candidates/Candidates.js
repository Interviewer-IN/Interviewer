import React, {Component} from 'react';
import './candidates.css';
import PageTitle from '../../containers/PageTitle';
import Filters from '../../components/Filters';
import {PanelGroup} from 'react-bootstrap';
import Panels from '../../components/Panels';
import Helmet from 'react-helmet';

class Candidates extends Component {
    render() {

        console.log(this);

        const PANEL_TITLE = (
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

        const DESCRIPTION = (
            <form>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="control-label form-label">Name:</label>
                        <p className="form-control-static">
                            Candidate name
                        </p>
                    </div>

                    <div className="form-group">
                        <label className="control-label form-label">Desired position:</label>
                        <p className="form-control-static">
                            Frontend
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <a href="#" className="download-block form-group" download>
                        <span className="download-block__icon fa fa-download"/>
                        <span className="download-block__title">Download CV</span>
                    </a>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <label className="control-label form-label">Work experience:</label>
                        <p className="form-control-static">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium amet aspernatur
                            deserunt distinctio eum illo ipsam magnam minima necessitatibus obcaecati officia quae
                            quidem quis quos rerum sed temporibus, voluptates.
                        </p>
                    </div>

                    <div className="form-group">
                        <label className="control-label form-label">Contact info:</label>
                        <p className="form-control-static">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam corporis culpa,
                            debitis eaque eligendi esse ex facere id illo, ipsa iusto, natus pariatur quidem
                            reprehenderit saepe similique temporibus tenetur?
                        </p>
                    </div>

                    <div className="form-group">
                        <label className="control-label form-label">Additional notes:</label>
                        <p className="form-control-static">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, aperiam asperiores
                            ducimus enim error et fugit in ipsam magni necessitatibus numquam odio optio perspiciatis
                            quas quasi recusandae reiciendis sint vel.
                        </p>
                    </div>
                </div>
            </form>

        );

        return (
            <div className="bcgr">
                <Helmet>
                    <title>Candidates</title>
                </Helmet>
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
                                titleConst={PANEL_TITLE}
                                description={DESCRIPTION}
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