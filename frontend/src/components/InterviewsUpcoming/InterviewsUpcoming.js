import React, {Component} from 'react';
import Helmet from "react-helmet";
import './interviewsUpcoming.css';

class interviewsUpcoming extends Component{

    render() {
        return (
            <div>
                <Helmet>
                    <title>Upcoming Interviews</title>
                </Helmet>
                <div className="bcgr">
                    <div className="row sameheight-container">
                        <div className="col-md-12">
                            <div className="title-block">
                                <h3 className="title">Upcoming interviews</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default interviewsUpcoming;

