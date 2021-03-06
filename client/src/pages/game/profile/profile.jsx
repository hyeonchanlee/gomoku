import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { compose } from 'recompose';

import Alert from '../../../components/alert/alert.jsx';
import PopUp from '../../../components/popup/popup.jsx';
import { withAuth } from '../../../contexts/auth.jsx';
import { withAlert } from '../../../contexts/alert.jsx';
import './profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleteAcc: false
        };
    }

    render() {
        const { deleteAcc } = this.state;
        const { user, deleteUser } = this.props.auth;

        return (
            <div className='_profile'>
                <div className='wrapper'>
                    <PopUp 
                        when={deleteAcc}
                        message='Do you really want to delete your account?'
                        acceptText='Delete'
                        onAccept={() => { 
                            deleteUser(); 
                            this.setState({ deleteAcc: false }); 
                        }}
                        rejectText='Cancel'
                        onReject={() => this.setState({ deleteAcc: false })}
                    />
                    <h1>Your Profile</h1>
                    <div className='body'>
                        <i className='fas fa-user-circle icon'></i>
                        <div className='column'>
                            <h2>{user.username}</h2>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                            <Alert 
                                type={this.props.alert.type}
                                message={this.props.alert.message}
                            />
                            <button 
                                className='delete'
                                onClick={() => this.setState({ deleteAcc: true })}
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(withRouter, withAuth, withAlert)(Profile);