import React, {Component} from "react";
import {Alert} from "reactstrap";
import "./Notifications.css";
import {connect} from "react-redux";
import {hideNote} from "../../redux/actions/notificationActions";


class Notifications extends Component {

    onDismiss(currentID) {
        const {dispatch} = this.props;
        dispatch(hideNote({id: currentID}))
    }

    render() {
        let notesArray = this.props.notifications.notifications;

        const notifications = notesArray.map((value, index) =>
            <div key={index}>
                <Alert
                    id={value.id}
                    color={value.status}
                    className="notification"
                    isOpen={value.show}
                    toggle={(event) => this.onDismiss(value.id)}
                >
                    {value.text}
                </Alert>
            </div>
        );

        return (
            <div className="notification-container">
                {notifications}
            </div>
        )
    }

}

function mapStateToProps (state) {
    return {
        notifications: state.notifications
    }
}

export default connect(mapStateToProps)(Notifications);
