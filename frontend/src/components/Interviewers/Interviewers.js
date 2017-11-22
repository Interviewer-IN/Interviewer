import React, {Component} from "react";
import "./interviewers.css";

import Helmet from 'react-helmet';
import {PanelGroup, Modal, Button} from 'react-bootstrap';
import Filters from '../../components/Filters';
import Panels from '../../components/Panels';

import {connect} from 'react-redux';
import {getPositions} from '../../redux/actions/positionActions';
import {getLevels} from '../../redux/actions/levelsActions';
import {getInterviewers, deleteInterviewer} from '../../redux/actions/interviewersActions';
import {levelsListName, positionsListName, getValueFromArr} from '../../utils/index';
import {GET_EMPTY_DATA, FILTER_EMPTY_DATA, DELETE_INTERVIEWER} from '../../config';

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
            interviewersListExist: true

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

        if (!this.props.interviewers.length) {
            dispatch(getInterviewers()).then(
                (data) => {
                    if (!data.length){
                        this.setState({
                            interviewersListExist: false
                        });
                    } else {
                        this.setState({
                            interviewersListExist: true
                        });
                    }
                }
            );
        }
    }

    openModalConfirm(currentID) {
        this.setState({
            currentInterviewerId: currentID,
            showModalConfirm: true
        });
    }

    closeModalConfirm() {
        this.setState({
            showModalConfirm: false
        })
    }

    deleteInterviewer() {
        this.closeModalConfirm();
        const {dispatch} = this.props;
        dispatch(deleteInterviewer(this.state.currentInterviewerId));
    }

    switchToEditMode(currentID) {
        this.props.history.push("/interviewers/" + currentID + "/edit");
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

        let interviewersList = this.props.interviewers,
            levelsList = this.props.levels,
            positionsList = this.props.positions,
            levelsTitleObj = levelsListName(levelsList),
            positionsTitleObj = positionsListName(positionsList),
            interviewersToDisplay = [];

        if (this.state.interviewersListExist){
            if (interviewersList.length && levelsList.length && positionsList.length) {

                //-- FILTER BY POSITION  --------------------------
                let positionFilterID = this.state.positionsFilterID;

                if (positionFilterID) {
                    interviewersList = interviewersList.filter((current) => {
                        return (current.position_id === positionFilterID);
                    });
                }
                //-- END FILTER BY LEVEL -----------------------

                //-- FILTER BY LEVEL  --------------------------
                let levelFilterID = this.state.levelsFilterID;

                if (levelFilterID) {
                    interviewersList = interviewersList.filter((current) => {
                        return (current.level_id === levelFilterID);
                    });
                }
                //-- END FILTER BY LEVEL  -----------------------

                if (interviewersList.length) {
                    interviewersToDisplay = interviewersList.map(item => {
                        let interviewerId = item.id,
                            interviewerName = item.name,
                            interviewerSurname = item.surname,
                            interviewerEmail = item.email,
                            interviewerPositionId = item.position_id,
                            interviewerPosition = positionsTitleObj[interviewerPositionId],
                            interviewerLevelId = item.level_id,
                            interviewerLevel = levelsTitleObj[interviewerLevelId],
                            interviewerRole = '';

                        (item.is_hr) ? interviewerRole = 'HR' : interviewerRole = 'User';



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
                                            <div className="info-block__project">{interviewerName  + ' ' +  interviewerSurname }</div>
                                            <div className="info-block__position separate-line">
                                                <span className="info-block__position-name">{interviewerLevel + ' ' + interviewerPosition}</span>
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
                                        <label className="control-label form-label">Email: <span className="form-control-static">
                                            {interviewerEmail}
                                        </span></label>
                                    </div>

                                    <div className="form-group">
                                        <label className="control-label form-label">Role: <span className="form-control-static">
                                            {interviewerRole}
                                        </span></label>
                                    </div>


                                </div>
                            </form>

                        );

                        return (
                            <Panels
                                key={interviewerId}
                                id={interviewerId}
                                titleConst={PANEL_TITLE}
                                description={DESCRIPTION}
                                showEditBtn={true}
                                editBtnId={"edit-candidate-" + interviewerId}
                                showDeleteBtn={true}
                                deleteBtnId={"delete-candidate-" + interviewerId}
                                callDelete={() => {
                                    this.openModalConfirm(interviewerId)
                                }}
                                callEdit={() => this.switchToEditMode(interviewerId)}
                            />
                        )


                    });
                } else {
                    interviewersToDisplay = (<h5 className="noData"> {FILTER_EMPTY_DATA} </h5>);
                }


            }
        } else {
            interviewersToDisplay = (<h5 className="noData"> {GET_EMPTY_DATA} </h5>);
        }






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
                                       titleForButton="Create interviewers"
                                       linkForButton="/interviewers/create-interviewers"
                                       buttonId='create-interviwers'
                            />
                            <Filters
                                level={true}
                                position={true}
                                positionFilterVal={(event) => this.getPositionFilterVal(event)}
                                levelFilterVal={(event) => this.getLevelFilterVal(event)}
                            />

                            <PanelGroup bsClass="custom-panel-group">
                                {interviewersToDisplay}
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
                                        onClick={() => this.deleteInterviewer()}
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
        positions: state.positions.positions,
        interviewers: state.interviewers.interviewers
    }
}

export default connect(mapStateToProps)(Interviewers);