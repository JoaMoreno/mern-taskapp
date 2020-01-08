import React, { Component } from 'react'
import axios from 'axios'

export default class CreateNote extends Component {

    state = {
        users: [],
        userSelected: ""
    }

    async componentDidMount() {
        const res = await axios.get("http://localhost:4200/api/users");
        this.setState({users: res.data.map(e => e.username)})
    }

    onSubmit = (e) => {
        e.preventDefault();

    }

    onInputChange = e =>{
        this.setState({
            userSelected: e.target.value
        })
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h5>Create a Note</h5>

                    {/** SELECT USER */}
                    <div className="form-group">
                        <select 
                            className="form-control"
                            name="userSelected"
                            onChange={this.onInputChange}
                            >
                            {
                                this.state.users.map(user =>
                                <option key={user}>
                                    {user}
                                </option>)
                            }
                        </select>
                    </div>

                    <form onSubmit={this.onSubmit}>

                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
