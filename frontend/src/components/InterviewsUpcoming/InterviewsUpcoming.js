import React, {Component} from 'react';
import './interviewsUpcoming.css';

class interviewsUpcoming extends Component{

    render(){
        console.log('Intervie', this);

        return (
            <div className="bcgr">
                <div className="row sameheight-container">
                    <div className="col-md-12">
                        <div className="title-block">
                            <h3 className="title">Upcoming interviews</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default interviewsUpcoming;

