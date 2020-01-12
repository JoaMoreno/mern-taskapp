import React, { Component } from 'react'
import axios from 'axios'
import swal from '@sweetalert/with-react'

export default class TaskList extends Component {

    /** BUGS
     * !!BUG!! > Al eliminar queda el nombre del proyecto anterior
     * (FIXED) > Responsive TaskList
          * !!BUG!! > overflow generado por la taskList en panel izquierdo
     * (FIXED) > Conseguir el project_id desde PROPS onMount > error no id create task
     * (FIXED) > EL Subtask Tiene que estar dentro de Tasks
     * (FIXED) > !!Optimizar!! Crear en routes.js get only one !! > getTasks() > else {}
    */

    /** TAREAS
     * (DONE) > Completar boton add Task
     * (DONE)Completar boton add SubTask
     * Funcionalidad toggle class circle-done/danger/none > Task status
          * Funcionalidad Status toggle Complete/incomplete > Task
          * Funcionalidad checkbox > Subtask
     * Agregar plugin add Date (fechas limites)
     * Funcionalidad set state > CreatedAt
     * (DONE) > Funcionalidad deleteTask & deleteSubTask
     */

    state = {
        tasks: [], //Array whit tasks from Tasks
        project: "",
        project_title: "",
        vacio: false,
    }
    async componentDidUpdate(prevProps) {
        //console.log("Update")
        if (this.props.project_id !== prevProps.project_id) {
            await this.updateTitle();
            await this.getTasks(this.props.project_id);
            console.log("Update")
        }
    }

    async componentDidMount() {
        //console.log("Title", this.state.project_title)
        await this.getTasks(this.props.project_id);
    }

    getTasks = async (projectID) => {
        if (projectID !== "") {
            const res = await axios.post("http://localhost:4200/api/project/" + projectID);
            this.setState({ tasks: res.data });
            this.updateTitle();
            //console.log("RES LENGTH", res.data.length)
            if (res.data.length === 0) {
                this.setState({ vacio: true })
            } else {
                this.setState({ vacio: false })
            }
        } else {
            const res = await axios.get("http://localhost:4200/api/project");
            this.setState({ project: res.data[0]._id, project_title: res.data[0].project });
            const res1 = await axios.post("http://localhost:4200/api/project/" + this.state.project);
            this.setState({ tasks: res1.data });
            //console.log("This ELSE")
        }

        //console.log("Task state",this.state.tasks)
    }

    updateTitle = () => {
        this.setState({ project_title: this.props.project_title })
    }

    noTasks = () => {
        if (this.state.vacio) {
            return (
                <div className="text-2xl text-center text-gray-400">
                    <p>No tasks here!</p>
                    <i className="py-5 text-4xl fas fa-heart-broken"></i>
                </div>)
        }
    }

    createTask = () => {
        swal(
            <form
                onSubmit={this.onSubmitTask}
                className="mt-10 mx-10">
                <div>
                    <input
                        required
                        onChange={this.onChangeTaskTitle}
                        className="border-b py-1 w-full text-center"
                        placeholder="Task Name"
                        type="text" />
                </div>
                <div>
                    <textarea
                        onChange={this.onChangeTaskDescription}
                        className="h-auto border-b mt-1 py-1 w-full text-center"
                        placeholder="Description"
                        type="text"
                        rows="7" />
                </div>
                <button className="mt-4 bg-teal-400 py-1 w-full rounded text-white">Add!</button>
            </form>, { icon: "success", buttons: false },
        );
    }

    statusTask = (task) =>{
        const totalStatus = task.subtasks.map(p => p.status);
        let statusFalse = false;
        let statusTrue = false;
        totalStatus.forEach(element => {
            if(!element){
                statusFalse=true
            }else{
                statusTrue=true
            }
        });
        //Agregar la peticion PUT para guardar el estado
        if(!statusFalse && statusTrue){
            return ("Complete")
        }else{
            return("Incomplete")
        }
    }

    deleteConfirm = (id,type) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this task!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Task deleted!", {
                        icon: "success",
                        buttons: false,
                        timer: 1250
                    })
                    this.deleteTask(id,type)
                }
            });
    }

    deleteTask = async (id,type) => {
        if(type === "task"){
            await axios.delete("http://localhost:4200/api/task/" + id);
        }else{
            if(type === "subtask"){
                await axios.delete("http://localhost:4200/api/subtask/" + id)
            }else{console.log("locked")}
        }
        this.getTasks(this.props.project_id);
    }

    onSubmitTask = async e => {
        e.preventDefault();
        const id = this.props.project_id || this.state.project;
        await axios({
            method: 'post',
            url: 'http://localhost:4200/api/task/' + id,
            data: {
                title: this.state.task_title,
                content: this.state.task_description
            }
        });
        // .then((response) => {
        //     console.log(response);
        //   }, (error) => {
        //     console.log(error);
        //   });
        this.getTasks(this.props.project_id)
        swal.close()
    }

    onSubmitSubTask = e => {
        e.preventDefault();
    }

    sendSubTask = async(id) =>{
        if(this.state.subtask_description){
            await axios({
                method: 'post',
                url: 'http://localhost:4200/api/subtask/' + id,
                data: {
                    content: this.state.subtask_description
                }
            });
            // .then((response) => {
            //     console.log(response);
            //   }, (error) => {
            //     console.log(error);
            //   });
            this.getTasks(this.props.project_id)
            swal.close()

        }
    }

    onChangeTaskTitle = (e) => {
        this.setState({
            task_title: e.target.value
        });
    }

    onChangeTaskDescription = (e) => {
        this.setState({
            task_description: e.target.value
        });
    }

    onChangeSubTaskDescription = (e) => {
        this.setState({
            subtask_description: e.target.value
        });
    }

    createSubTask = (id) => {
        swal(
            <form
                onSubmit={this.onSubmitSubTask}
                className="mt-5 mx-10">
                <div>
                    <label className="text-gray-500">Description</label>
                    <textarea
                        required
                        onChange={this.onChangeSubTaskDescription}
                        className="h-auto border-b mt-5 py-2 px-2 w-full"
                        type="text"
                        rows="7" />
                </div>
                <button 
                onClick={()=>this.sendSubTask(id)}
                className="mt-4 bg-teal-400 py-1 w-full rounded text-white">Add!</button>
            </form>, { icon: "success", buttons: false },
        );
    }

    deleteSubTask = async(id) => {
        await axios.delete("http://localhost:4200/api/subtask/" + id);
        this.getTasks(this.props.project_id);
    }

    buttonChecked = async(e,id) =>{
        if(e){
            await axios({
                method: 'put',
                url: 'http://localhost:4200/api/subtask/' + id,
                data: {
                    status: false
                }
            });
        }else{
            await axios({
                method: 'put',
                url: 'http://localhost:4200/api/subtask/' + id,
                data: {
                    status: true
                }
            });
        };
        this.getTasks(this.props.project_id);
    }

    render() {

        return (
            //{/* Container Project */}
            <div className="overflow-y-scroll scrollbar">

                {/* Title Project */}
                <div className="flex items-center ml-10 pt-5 pl-5 text-gray-800">
                    <h1 className="text-2xl">{this.state.project_title}</h1>
                    <button onClick={() => this.createTask()} className="mx-5 mt-1 text-teal-400"><i className="fas fa-plus"></i></button>
                </div>
                {/* END Title Project */}

                {/* Tasks of Project */}
                <div className="m-5 ml-10 md:px-2 px-0">
                    {this.noTasks()}

                    <ul>
                        {
                            this.state.tasks.map(task => (
                                <div
                                    className="text-gray-800 mb-8 pb-8 border-b"
                                    key={task._id}>
                                    {/* Task Primary */}

                                    <div
                                        onDoubleClick={() => this.deleteConfirm(task._id,"task")}
                                        className="md:flex px-4 md:py-5 sm:pb-1 bg-white rounded shadow-task">
                                        <div className="circle-list-md circle-none"></div>
                                        <div className="md:w-3/4">
                                            {/* Title */}
                                            <h1 className="text-2xl">{task.title}</h1>
                                            {/* Contend description */}
                                            <p className="my-2">{task.content}</p>
                                        </div>
                                        {/* info */}
                                        <div className="md:w-1/4 md:pb-0 sm:pb-1">
                                            <div className="lg:flex -mb-3 h-full lg:justify-between">
                                                {/* Status */}
                                                <div>
                                                    <p className="text-xs">Status:</p>
                                                    <h1>{this.statusTask(task)}</h1>
                                                </div>
                                                {/* Date */}
                                                <div>
                                                    <p className="text-xs text-gray-600">06/12/2020</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div></div>
                                                <button onClick={()=>this.createSubTask(task._id)}><i className="text-gray-600 fas fa-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* END Task Primary */}

                                    <div>
                                        {/* Task Secondary */}
                                        <div>

                                            {task.subtasks.map(subtask => (

                                                <div
                                                    onDoubleClick={()=>this.deleteConfirm(subtask._id,"subtask")}
                                                    className="mt-3 md:flex px-4 py-3 bg-white rounded-lg border-t border-b"
                                                    key={subtask._id}>
                                                        {/* Conditional in className inline */}
                                                    <div className={"circle-list-sm "+(subtask.status ? "circle-done":"circle-none")}></div>
                                                    {/* Contend Task secondary */}
                                                    <div className="md:w-3/4 text-sm text-gray-600">
                                                        <p>{subtask.content}</p>
                                                    </div>
                                                    {/* Info */}
                                                    <div className="flex md:justify-end justify-between md:mt-1 mt-3 items-center md:w-1/4 ml-3">
                                                        {/* Button checkbox */}
                                                        <div className="container-switch mr-8">
                                                            <label 
                                                            className="switch">
                                                                <input 
                                                                onClick={()=>this.buttonChecked(subtask.status,subtask._id)} 
                                                                type="checkbox" 
                                                                defaultChecked={subtask.status}/>
                                                                <div></div>
                                                            </label>
                                                        </div>
                                                        {/* Date */}
                                                        <div>
                                                            <p className="text-xs text-gray-500">06/12/2020</p>
                                                        </div>
                                                    </div>
                                                    
                                                </div>

                                            ))}

                                        </div>
                                        {/* END Task Secondary */}

                                    </div>

                                </div>)
                            )
                        }
                    </ul>

                </div>
                {/* END Tasks of Project */}

            </div>
            //{/* END Container Project */}
        )
    }
}
