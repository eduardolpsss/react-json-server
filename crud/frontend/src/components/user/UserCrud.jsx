import React, { Component } from "react";
import Main from "../template/Main";

const headerProps = {
    icon: 'users',
    title: 'Users',
    subtitle: 'User registration: create, read, update, and delete.'
}

export default class UserCrud extends Component {
    render() {
        return (
            <Main {...headerProps}>
                User registration
            </Main>
        )
    }
}