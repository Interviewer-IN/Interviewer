import React, {Component} from "react";
import Helmet from "react-helmet";
import "./interviewsCompleted.css";


class InterviewsCompleted extends Component{

    render() {
        return (
            <div>
                <Helmet>
                    <title>Completed Interviews</title>
                </Helmet>
                <div className="bcgr">
                    <div className="row sameheight-container">
                        <div className="col-md-12">
                            <div className="title-block">
                                <h3 className="title">Completed interviews</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default InterviewsCompleted;

