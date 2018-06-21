import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Radium from 'radium';

class UserList extends Component {

    // Now with Radium styles: Pseudo selectors and Media Queries possible
    // Initial inline style (will overwrite classes and ids, as usual)
    // Styles are in camelCase, e.g. fontStyle
    // The inline style is used below: <div className="card card-block" style={UserList.style}>
    // We need to set it as static variable to be accessible from both renderUser and render function
    // see https://medium.freecodecamp.org/where-do-i-belong-a-guide-to-saving-react-component-data-in-state-store-static-and-this-c49b335e2a00
    static style = {
        color: 'red',
        fontStyle: 'italic',
        // Pseudo selector possible through Radium
        ':hover': {
            color: 'orange'
        },
        // Media Queries possible through Radium
        '@media (min-width: 500px)': {
            color: 'blue',
            fontStyle: 'normal'
        }
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

        // Radium style can also be overwritten dynamically:
        if(this.props.users.length > 5){
            UserList.style.color = 'green';
            // Radium style
            UserList.style[':hover'] = {
                color: 'brown'
            };
        }

        // Setting class name(s) dynamically
        // Initial class name
        const classes = ['user-list'];

        // this statement will dynamically add class name 'green-bg' if we have more than 5 users listed.
        // else background color stays 'red'
        if(this.props.users.length > 5) {
            classes.push('green-bg'); // classes = ['user-list', 'green-bg']
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

export default connect(mapStateToProps, actions)(Radium(UserList));

