import React, {Component} from 'react';
import './createCandidate.css';

import PageTitle from '../../containers/PageTitle';

class CreateCandidate extends Component{
    render(){
        return (
            <div className="bcgr">
                <div className="row sameheight-container">
                    <div className="col-md-12">
                        <PageTitle
                            pageTitle="Create candidate"
                            showBackBtn={true}
                            showButton={false}
                            titleForButton=""
                            linkForButton=""/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateCandidate;