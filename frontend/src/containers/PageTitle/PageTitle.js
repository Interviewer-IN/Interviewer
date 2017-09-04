import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './pageTitle.css'
import PropTypes from 'prop-types';
import {createBrowserHistory} from 'history';


const history = createBrowserHistory();
class PageTitle extends Component{


    render(){

        let pageTitle = this.props.pageTitle,
            showBackBtn = this.props.showBackBtn,
            showButton = this.props.showButton,
            titleForButton = this.props.titleForButton,
            linkForButton = this.props.linkForButton;


        let showBackButton = (showBackBtn) => {
            if (showBackBtn) {
                return (
                    <span onClick={()=>history.goBack()} className="back-btn" id="back-btn"> « Back to list </span>
                )
            }
        };

        let showAdditionBtn = (showButton, linkForButton, titleForButton) => {
          if (showButton){
              return (
                  <Link to={linkForButton}>
                      <button type="button" className="btn btn-primary" id="create-btn"> {titleForButton} </button>
                  </Link>

              )
          }
        };

        return (
            <div className="title-block custom-title-block">
                <div className="custom-title-block__left-side">
                    {showBackButton(showBackBtn)}
                    <h3 className="title"> {pageTitle} </h3>

                </div>
                <div className="custom-title-block__right-side">
                    {showAdditionBtn(showButton, linkForButton, titleForButton)}
                </div>
            </div>
        );
    }
}

PageTitle.propTypes = {
    pageTitle: PropTypes.string.isRequired,
    showBackBtn: PropTypes.bool.isRequired,
    showButton: PropTypes.bool.isRequired,
    titleForButton: PropTypes.string.isRequired,
    linkForButton: PropTypes.string.isRequired



};

export default PageTitle;
