import React, {Component} from "react";
import "./interviewers.css";

import Helmet from 'react-helmet';
import {PanelGroup, Modal, Button} from 'react-bootstrap';
import Filters from '../../components/Filters';
import Panels from '../../components/Panels';

import {connect} from 'react-redux';
import {getPositions} from '../../redux/actions/positionActions';
import {getLevels} from '../../redux/actions/levelsActions';
import {getValueFromArr} from '../../utils/index';
import {GET_EMPTY_DATA, DELETE_INTERVIEWER} from '../../config';

import PageTitle from '../../containers/PageTitle';

class Interviewers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModalConfirm: false,
            deleteInterviewerText: DELETE_INTERVIEWER,
            currentInterviewerId: '',
            positionsFilterID: '',
            levelsFilterID: '',

        }

    }

    componentWillMount() {

        this.props.onCheckUserRole();
        const {dispatch} = this.props;

        if (!this.props.levels.length) {
            dispatch(getLevels());
        }

        if (!this.props.positions.length) {
            dispatch(getPositions());
        }
    }

    openModalConfirm(currentID) {
        this.setState({
            currentCandidateId: currentID,
            showModalConfirm: true
        });
    }

    closeModalConfirm() {
        this.setState({
            showModalConfirm: false
        })
    }

    switchToEditMode(currentID) {
        this.props.history.push("/interviewers/edit");
    }

    getPositionFilterVal(positionFilterVal) {
        let positionsList = this.props.positions,
            positionFilterId = 0;

        positionFilterId = getValueFromArr(positionsList, positionFilterVal, 'name');

        this.setState({
            positionsFilterID: positionFilterId
        })
    }

    getLevelFilterVal(levelFilterVal) {

        let levelsList = this.props.levels,
            levelFilterId = 0;

        levelFilterId = getValueFromArr(levelsList, levelFilterVal, 'name');

        this.setState({
            levelsFilterID: levelFilterId
        })
    }

    render() {


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
                            <div className="info-block__project">Anton Burkun</div>
                            <div className="info-block__position separate-line">
                                <span className="info-block__position-name">Middle QA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        const DESCRIPTION = (
            <form className="custom-form">
                <div className="col-md-6 no-padding">
                    <div className="form-group">
                        <label className="control-label form-label text-green">Email:</label>
                        <p className="form-control-static">
                            mail@mail.ru
                        </p>
                    </div>
                </div>
                <div className="col-md-12 no-padding">
                    <div className="form-group">
                        <label className="control-label form-label text-green">Description:</label>
                        <div className="form-control-static">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis perferendis quaerat qui
                            quis reprehenderit, unde vel. Aliquam aspernatur dolorum expedita id iusto minima, non
                            praesentium quibusdam sint vitae. Nam, voluptatibus.
                        </div>
                    </div>
                </div>
            </form>

        );

        return (
            <div>
                <Helmet>
                    <title>Interviewers</title>
                </Helmet>
                <div className="bcgr">
                    <div className="row sameheight-container">
                        <div className="col-md-12">
                            <PageTitle pageTitle="Interviewers"
                                       showBackBtn={false}
                                       showButton={true}
                                       titleForButton="Create interviewer"
                                       linkForButton="/interviewers/create-interviewer"
                                       buttonId='create-interviwers'
                            />
                            <Filters
                                level={true}
                                position={true}
                                positionFilterVal={(event) => this.getPositionFilterVal(event)}
                                levelFilterVal={(event) => this.getLevelFilterVal(event)}
                            />

                            <PanelGroup bsClass="custom-panel-group">
                                <Panels
                                    // key={}
                                    // id={}
                                    titleConst={PANEL_TITLE}
                                    description={DESCRIPTION}
                                    showEditBtn={true}
                                    editBtnId={"edit-candidate-"}
                                    showDeleteBtn={true}
                                    deleteBtnId={"delete-candidate-"}
                                    callDelete={() => {
                                        this.openModalConfirm()
                                    }}
                                    callEdit={() => this.switchToEditMode()}
                                />
                            </PanelGroup>
                            <Modal show={this.state.showModalConfirm}
                                   onHide={() => this.closeModalConfirm()}
                                   className="custom-btn-group">
                                <Modal.Header closeButton>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>{this.state.deleteInterviewerText}</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        id={"btn-modal-yes-" + this.state.currentInterviewerId}
                                        className="btn btn-primary"
                                        onClick={() => this.deleteProject()}
                                    >Yes
                                    </Button>
                                    <Button
                                        id={"btn-modal-no-" + this.state.currentInterviewerId}
                                        className="btn btn-danger"
                                        onClick={() => this.closeModalConfirm()}
                                        bsStyle="primary"
                                    >No
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        levels: state.levels.levels,
        positions: state.positions.positions
    }
}

export default connect(mapStateToProps)(Interviewers);