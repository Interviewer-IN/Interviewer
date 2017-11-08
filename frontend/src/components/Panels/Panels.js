import React, {Component} from "react";
import {Panel} from "react-bootstrap";
import {PropTypes} from "prop-types";
import "./panels.css";

class Panels extends Component {

    handlePanelCollapseClick(event) {


        let clickTarget = event.target;


        while (!clickTarget.classList.contains('custom-panel-title') && !clickTarget.classList.contains('panel-collapse')) {
            clickTarget = clickTarget.parentNode;

        }

        if (clickTarget.classList.contains('custom-panel-title')) {
            let collapseBtn = clickTarget.querySelector('.btn-js'),
                arrowIco = clickTarget.querySelector('.arrow-js'),
                collapsed = clickTarget.firstChild.classList.contains('collapsed');

            collapsed ? collapseBtn.innerHTML = 'Collapse' : collapseBtn.innerHTML = 'Expand';
            collapsed ? arrowIco.classList.add('rotate-plus-90') : arrowIco.classList.remove('rotate-plus-90');
        }

    }

    onDelete() {
        this.props.callDelete();
    }

    onEdit() {
        this.props.callEdit();
    }

    onAction() {
        this.props.callAction();
    }

    onDouble() {
        this.props.callDublicate();
    }

    render() {

        let showActionBtn = this.props.showActionBtn,
            titleForActionBtn = this.props.titleForActionBtn,
            panelTitle = this.props.titleConst,
            showEditBtn = this.props.showEditBtn,
            showDuplicateBtn = this.props.showDuplicateBtn,
            showDeleteBtn = this.props.showDeleteBtn,
            editBtnId = this.props.editBtnId,
            dublicateBtnId = this.props.dublicateBtnId,
            deleteBtnId = this.props.deleteBtnId,
            description = this.props.description,
            id = this.props.id,
            addInactiveBtnClass = this.props.addInactiveBtnClass,
            inactiveBtnClass = false;

        if (addInactiveBtnClass) {
            inactiveBtnClass = true;
        }

        let toShowActionBtn = (showActionBtn, titleBtn) => {
            if (showActionBtn){
              return (
                  <button type="button"
                          className="btn btn-primary"
                          onClick={(event) => this.onAction(event)}
                          disabled={inactiveBtnClass}
                  >
                      {titleBtn}
                  </button>
              );
            }
        };

        let toShowEditBtn = (showEditBtn) => {
            if (showEditBtn) {
                return (
                    <div className="btn btn-primary"
                         id = {editBtnId}
                         onClick={()=>this.onEdit()}>
                        Edit
                    </div>
                )
            }
        };

        let toShowDuplicateBtn = (showDuplicateBtn) => {
            if (showDuplicateBtn) {
                return (
                    <div className="btn btn-info"
                         id = {dublicateBtnId}
                        onClick={() => this.onDouble()}
                    >
                        Duplicate
                    </div>
                )
            }
        };

        let toShowDeleteBtn = (showDeleteBtn) => {
            if (showDeleteBtn) {
                return (
                    <div className="btn btn-danger"
                         id = {deleteBtnId}
                         onClick={()=>this.onDelete()}
                    >
                        Delete
                    </div>
                )
            }
        };

        let panelBodyClass  = '';
        if (showActionBtn){
            panelBodyClass = 'custom-panel-body';
        } else {
            panelBodyClass = 'custom-panel-body full-width';
        }

        return (
            <Panel collapsible
                   id={id}
                   header={panelTitle}
                   defaultExpanded={this.props.defaultExpanded}
                   onClick={(event) => this.handlePanelCollapseClick(event)}
            >
                <div className={panelBodyClass}>
                    <div className="custom-panel-body__left">
                        <div className="vacancy-description">
                            {description}
                        </div>
                    </div>
                    <div className="custom-panel-body__right">
                        {toShowActionBtn(showActionBtn, titleForActionBtn)}
                    </div>
                    <div className="custom-panel-body__vacancy-controls btn-group custom-btn-group">
                        {toShowEditBtn(showEditBtn)}
                        {toShowDuplicateBtn(showDuplicateBtn)}
                        {toShowDeleteBtn(showDeleteBtn)}
                    </div>
                </div>
            </Panel>
        );
    }
}

Panels.defaultProps = {
    id : 0,
    showActionBtn : false,
    titleForActionBtn: 'action btn',
    titleConst:
        <div className="custom-panel-title">
            <div className="custom-panel-title__right-side">
                <div className="panel-collapse-btn">
                    <span className="panel-collapse-btn__title btn-js">Expand</span>
                    <span className="fa fa-angle-right panel-collapse-btn__arrow arrow-js"/>
                </div>
            </div>
            <div className="custom-panel-title__left-side">
            </div>
        </div>

};

Panels.propTypes = {
   // id: PropTypes.number,
    showActionBtn: PropTypes.bool,
    showEditBtn: PropTypes.bool,
    showDuplicateBtn: PropTypes.bool,
    showDeleteBtn: PropTypes.bool,
    titleForActionBtn: PropTypes.string,
    editBtnId: PropTypes.string,
    dublicateBtnId: PropTypes.string,
    deleteBtnId: PropTypes.string,
    addInactiveBtnClass: PropTypes.bool

};

export default Panels;