import React, {Component} from "react";
import Helmet from "react-helmet";
import "./interviewers.css";

class Interviewers extends Component{

    // componentWillMount() {
    //     this.props.onCheckUserRole();
    // }

    render(){
        return (
            <div>
                <Helmet>
                    <title>Interviewers</title>
                </Helmet>
                <div className="bcgr">
                    <div className="row sameheight-container">
                        <div className="col-md-12">
                            <div className="title-block">
                                <h3 className="title">Interviewers</h3>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Interviewers;