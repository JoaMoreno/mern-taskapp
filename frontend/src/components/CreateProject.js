import React, { Component } from 'react'
import axios from 'axios'
import TaskList from './TaskList'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import TimeTable from "./TimeTable"

const swal = withReactContent(Swal)

/**!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * 
 * !!Optimizar!!
 * onChangeProjectName esta actualizando tambien TasksList
 * 
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
export default class CreateProject extends Component {

    state = {
        projects: [],
        project: "",
        projectId: "",
        projectTitle: ""
    }

    async componentDidMount() {
        await this.getProjects();
    }

    getProjects = async () => {
        const res = await axios.get("http://localhost:4200/api/project");
        this.setState({ projects: res.data });
        //console.log("This Project>",this.state.projects[0]._id)
        //console.log(this.state.projectId)
        //this.setState({ projectId: this.state.projects[0]._id })
        //console.log("this ID>",this.state.projectId)
    }

    onChangeProjectName = (e) => {
        this.setState({
            project: e.target.value
        });
    }

    onSubmit = async e => {
        e.preventDefault();
        await axios.post("http://localhost:4200/api/project", {
            project: this.state.project
        });
        this.getProjects();
        this.setState({ project: "" });
    }

    deleteConfirm = (id) => {
        swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this project!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your Project has been deleted!", {
                        icon: "success",
                    })
                    this.deleteProject(id)
                }
            });
    }

    deleteProject = async (id) => {
        this.setState({ projectId: this.state.projects[0]._id });// (fixed > bug no tasks)
        await axios.delete("http://localhost:4200/api/project/" + id);
        this.getProjects();
    }

    loadTasks = async (id, title) => {
        this.setState({ projectId: id, projectTitle: title })
    }

    thanksYou = () => {
        swal.fire(
            <div className="p-2 text-sm">
                <h1 className="text-xl">Thank you!</h1>
                <p>This is my first App</p>
                <i className="pt-2 fas fa-heart text-red-400"></i>
            </div>, { buttons: false, timer: 3000 }
        )
    }

    timeTable = () => {
        swal.fire(
            <div><TimeTable/></div>
            ,{
                width: 400,
            buttons: false,
            });
    }

    render() {
        return (

            <div className="md:flex scrollbar">
                <div className="md:w-1/3 lg:w-1/4 min-h-screen bg-gray-300">

                    <div className="flex ml-10 pt-5  text-gray-800">
                        <h1 className="text-2xl">Projects</h1>
                    </div>

                    <div className="m-5">
                        <div className="mb-4 py-2 px-3 rounded bg-gray-100 shadow-md">
                            <form onSubmit={this.onSubmit}>
                                <div className="md:flex md:mx-0 mx-10 mt-2 md:justify-between items-center">

                                    <input
                                        required
                                        placeholder="Project Name"
                                        className="w-full md:text-left py-1 text-center bg-transparent text-gray-700 border-b outline-none"
                                        value={this.state.project}
                                        onChange={this.onChangeProjectName}
                                    />

                                    <div className="flex items-center justify-center md:w-24 w-full h-10">
                                        <p className="text-xs font-semibold text-gray-500">06/12/2020</p>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button className="w-48 my-1 mt-3 py-1 rounded bg-teal-500 hover:shadow text-white">Create</button>
                                </div>
                            </form>
                        </div>


                        <ul>
                            {
                                this.state.projects.map(project => (
                                    <li
                                        key={project._id}
                                        onDoubleClick={() => this.deleteConfirm(project._id)}
                                        onClick={() => this.loadTasks(project._id, project.project)}
                                    >
                                        <div
                                            className="no-seleccionable md:flex justify-between items-center mb-4 py-2 px-3 rounded bg-gray-100 shadow-md hover:bg-white hover:shadow-lg cursor-pointer">
                                            <p className="text-gray-700 py-2">{project.project}</p>
                                            <div className="flex items-center justify-center md:w-24 w-full">
                                                <p className="text-xs text-gray-500">06/12/2020</p>
                                            </div>
                                        </div>
                                    </li>)

                                )
                            }
                        </ul>

                        <div>
                            <button onClick={() => this.timeTable()} className="bg-teal-500 rounded px-2 py-1 text-white shadow">TimeTable</button>
                        </div>
                    </div>

                    <div className="md:fixed w-full bottom-0 no-seleccionable"><div className="flex md:justify-end md:mx-5 justify-center py-1 text-gray-500 text-xs">
                        <p>
                            Created whit <i onClick={() => this.thanksYou()} className="cursor-pointer text-gray-600 fas fa-heart"></i> by <span className="text-gray-600">studio LTE</span>
                        </p>
                    </div>
                    </div>

                </div>

                <div className="md:w-2/3 lg:w-3/4">
                    <TaskList project_id={this.state.projectId} project_title={this.state.projectTitle} />
                </div>
                {/** COMING SON */}
                <div className="md:w-1/4 lg:w-1/4 min-h-full bg-gray-300">
                    <div className="text-2xl py-56 text-center text-gray-400">
                        <p>Proximamente</p>
                        <i className="py-5 text-4xl fas fa-heart-broken"></i>
                    </div>
                </div>
            </div>
        )
    }
}
