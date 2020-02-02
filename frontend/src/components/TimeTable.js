import React, { Component } from 'react'
import axios from 'axios'

export default class TimeTable extends Component {

    state = {

    }

    async componentDidUpdate(prevProps) {
        // Cumplir condicion if() sino error bucle
        if (this.props.project_id !== prevProps.project_id) {

        }
    }

    async componentDidMount() {
    }

    render() {

        return (
            <div className="">
                <h1>Hello</h1>
            </div>
        )
    }
}
