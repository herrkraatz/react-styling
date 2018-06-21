import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import styles from './user_list.css';

class UserList extends Component {

    // Initial inline style (will overwrite classes and ids, as usual)
    // Styles are in camelCase, e.g. fontStyle
    // The inline style is used below: <div className="card card-block" style={UserList.style}>
    // We need to set it as static variable to be accessible from both renderUser and render function
    // see https://medium.freecodecamp.org/where-do-i-belong-a-guide-to-saving-react-component-data-in-state-store-static-and-this-c49b335e2a00
    static style = {
        color: 'red',
        fontStyle: 'italic'
    };

    componentWillMount() {
        this.props.fetchUsers();
    }

    renderUser(user) {
        return (
            <div key={user.email} className="card card-block" style={UserList.style}>
                <h4 className="card-title">{user.name}</h4>
                <p className="card-text">{user.company.name}</p>
                <a className="btn btn-primary">{user.email}</a>
            </div>
        );
    }

    render() {

        // A: Setting inline style dynamically
        // this statement will dynamically set new inline style color: 'green' if we have more than 5 users listed.
        // else color stays 'red'
        if(this.props.users.length > 5){
            UserList.style.color = 'green';
        }

        // B: Setting class name(s) dynamically
        // Initial class name
        const classes = [styles.userList];

        // this statement will dynamically add class name 'green_bg' if we have more than 5 users listed.
        // else background color stays 'red'
        if(this.props.users.length > 5) {
            classes.push(styles.greenBg); // classes = ['userList', 'greenBg']
        }

        // class must be called className in React, see https://reactjs.org/docs/dom-elements.html
        // classes.join(' ') makes string "user-list green-bg" or just "user-list" if this.props.users.length <= 5
        return (
            <div className={classes.join(' ')}>
                {this.props.users.map(this.renderUser)}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { users: state.users };
}

export default connect(mapStateToProps, actions)(UserList);

