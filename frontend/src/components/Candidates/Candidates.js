import React, {Component} from 'react';
import './candidates.css';

import PageTitle from '../../containers/PageTitle';
import Filters from '../../components/Filters';
import {PanelGroup, Modal, Button} from 'react-bootstrap';
import Panels from '../../components/Panels';
import Helmet from 'react-helmet';

import {connect} from 'react-redux';
import {getCandidates, deleteCandidate} from '../../redux/actions/candidatesActions'
import {levelsListName, positionsListName, getValueFromArr} from '../../utils/index';
import {GET_EMPTY_DATA, DELETE_CANDIDATE} from '../../config';
import fetch from "isomorphic-fetch";

class Candidates extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModalConfirm: false,
            deleteCandidateText: DELETE_CANDIDATE,
            currentCandidateId: '',
            positionsFilterID: '',
            levelsFilterID: '',
            levelsFilterVal: '',
            projectFilterVal: ''
        }

    }

    componentWillMount() {
        this.props.onCheckUserRole();

        const {dispatch} = this.props;
        dispatch(getCandidates());
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

    deleteProject() {
        this.closeModalConfirm();
        const {dispatch} = this.props;
        dispatch(deleteCandidate(this.state.currentCandidateId));
    }

    switchToEditMode(currentID) {
        this.props.history.push("/candidates/candidate/" + currentID + "/edit");
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

        let candidatesList = this.props.candidates,
            levelsList = this.props.levels,
            positionsList = this.props.positions,
            levelsTitleObj = levelsListName(levelsList),
            positionsTitleObj = positionsListName(positionsList),
            candidatesToDisplay = [];

        if (candidatesList.length && levelsList.length && positionsList.length) {


            //-- FILTER BY POSITION  --------------------------
            let positionFilterID = this.state.positionsFilterID;

            if (positionFilterID) {
                candidatesList = candidatesList.filter((current) => {
                    return (current.position_id === positionFilterID);
                });
            }
            //-- END FILTER BY LEVEL -----------------------

            //-- FILTER BY LEVEL  --------------------------
            let levelFilterID = this.state.levelsFilterID;

            if (levelFilterID) {
                candidatesList = candidatesList.filter((current) => {
                    return (current.level_id === levelFilterID);
                });
            }
            //-- END FILTER BY LEVEL  -----------------------

            candidatesToDisplay = candidatesList.map((item) => {

                let candidateId = item.id,
                    candidateName = item.name,
                    candidateSurname = item.surname,
                    candidateAge = item.age,
                    candidateExperience = item.experience,
                    candidateContacts = item.contacts,
                    candidateNotes = item.notes,
                    candidatePositionId = item.position_id,
                    candidatePosition = positionsTitleObj[candidatePositionId],
                    candidateLevelId = item.level_id,
                    candidateLevel = levelsTitleObj[candidateLevelId],
                    candidateCV = item.cv.url;

                let checkCandidateCV = () => {
                    if (candidateCV) {
                        return (
                            <a href={candidateCV} className="download-block form-group text-green text-green--hover" download>
                                <span className="download-block__icon fa fa-download"/>
                                <span className="download-block__title">Download CV</span>
                            </a>
                        )
                    } else {
                        return (
                            <a className="download-block form-group download-block--disabled text-muted">
                                <span className="download-block__icon fa fa-download"/>
                                <span className="download-block__title text-bold--100">Download CV</span>
                            </a>
                        )
                    }
                };

                let checkCandidateAge = () => {
                    if (candidateAge) {
                        return (
                            <p className="form-control-static">
                                {candidateAge}
                            </p>
                        )
                    } else {
                        return (
                            <p className="form-control-static text-muted text-bold--100">
                                {GET_EMPTY_DATA}
                            </p>
                        )
                    }
                };

                let checkCandidateExperience = () => {
                    if (candidateExperience) {
                        return (
                            <p className="form-control-static">
                                {candidateExperience}
                            </p>
                        )

                    } else {
                        return (
                            <p className="form-control-static text-muted text-bold--100">
                                {GET_EMPTY_DATA}
                            </p>

                        )
                    }
                };

                let checkCandidateContacts = () => {
                    if (candidateContacts) {
                        return (
                            <p className="form-control-static">
                                {candidateContacts}
                            </p>
                        )

                    } else {
                        return (
                            <p className="form-control-static text-muted text-bold--100">
                                {GET_EMPTY_DATA}
                            </p>

                        )
                    }
                };

                let checkCandidateNotes = () => {
                    if (candidateNotes) {
                        return (
                            <p className="form-control-static">
                                {candidateNotes}
                            </p>
                        )

                    } else {
                        return (
                            <p className="form-control-static text-muted text-bold--100">
                                {GET_EMPTY_DATA}
                            </p>

                        )
                    }
                };


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
                                    <div className="info-block__project">{candidateName + ' ' + candidateSurname}</div>
                                    <div className="info-block__position separate-line">
                               <span className="info-block__position-capture">
                                   Desired position:
                               </span>
                                        <span
                                            className="info-block__position-name">{candidatePosition + ' ' + candidateLevel}</span>
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
                                <label className="control-label form-label text-green">Name:</label>
                                <p className="form-control-static">
                                    {candidateName + ' ' + candidateSurname}
                                </p>
                            </div>

                            <div className="form-group">
                                <label className="control-label form-label text-green">Desired position:</label>
                                <p className="form-control-static">
                                    {candidatePosition + ' ' + candidateLevel}
                                </p>
                            </div>

                            <div className="form-group">
                                <label className="control-label form-label text-green">Age:</label>
                                {checkCandidateAge()}
                            </div>
                        </div>
                        <div className="col-md-6">
                            {checkCandidateCV()}
                        </div>
                        <div className="col-md-12">

                            <div className="form-group">
                                <label className="control-label form-label text-green">Contact info:</label>
                                {checkCandidateContacts()}
                            </div>

                            <div className="form-group">
                                <label className="control-label form-label text-green">Work experience:</label>
                                {checkCandidateExperience()}
                            </div>

                            <div className="form-group">
                                <label className="control-label form-label text-green">Additional notes:</label>
                                {checkCandidateNotes()}
                            </div>


                        </div>
                    </form>

                );
                return (
                    <Panels
                        key={candidateId}
                        id={candidateId}
                        titleConst={PANEL_TITLE}
                        description={DESCRIPTION}
                        showEditBtn={true}
                        editBtnId={"edit-candidate-" + candidateId}
                        showDeleteBtn={true}
                        deleteBtnId={"delete-candidate-" + candidateId}
                        callDelete={() => {
                            this.openModalConfirm(candidateId)
                        }}
                        callEdit={() => this.switchToEditMode(candidateId)}
                    />
                )

            });

        }


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
                                   buttonId='add-candidate'
                        />
                        <Filters
                            level={true}
                            position={true}
                            positionFilterVal={(event) => this.getPositionFilterVal(event)}
                            levelFilterVal={(event) => this.getLevelFilterVal(event)}
                        />
                        <PanelGroup bsClass='custom-panel-group'>
                            {candidatesToDisplay}
                        </PanelGroup>
                        <Modal show={this.state.showModalConfirm}
                               onHide={() => this.closeModalConfirm()}
                               className="custom-btn-group">
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <Modal.Body>
                                <p>{this.state.deleteCandidateText}</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    id={"btn-modal-yes-" + this.state.currentCandidateId}
                                    className="btn btn-primary"
                                    onClick={() => this.deleteProject()}
                                >Yes
                                </Button>
                                <Button
                                    id={"btn-modal-no-" + this.state.currentCandidateId}
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
        );
    }
}

function mapStateToProps(state) {
    return {
        candidates: state.candidates.candidates,
        levels: state.levels.levels,
        positions: state.positions.positions,
    }
}

export default connect(mapStateToProps)(Candidates);