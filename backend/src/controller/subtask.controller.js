const Tasks = require("../model/added.model"); // tasks
const SubTasks = require("../model/subtask.model"); //project
const subtaskCtrl = {};

//=========================== CRUD ===========================//

subtaskCtrl.getAllData = async (req, res, next) => {
    const data = await SubTasks.find();
    // Return all
    res.json(data);
};

subtaskCtrl.getData = async (req, res, next) => {
    const data = await SubTasks.findById(req.params.id);
    res.json(data);
};

subtaskCtrl.createData = async (req, res, next) => {
    const { id } = req.params;
    const { content} = req.body;
    const task = await SubTasks.create({
        content,
        task_prima:id
    });
    await task.save();

    const subtaskById = await Tasks.findById(id);
    //console.log(">>",subtaskById)
    await subtaskById.subtasks.push(task);
    await subtaskById.save();

    return res.json(subtaskById);
};

subtaskCtrl.TaskInSubTask = async (req, res) => {
    const { id } = req.params;
    const TaskBySubTask = await SubTasks.findById(id).populate('task_prima');
    console.log(TaskBySubTask);
    res.json(TaskBySubTask);
}

subtaskCtrl.deleteData = async (req, res, next) => {
    const { id } = req.params;
    await Tasks.updateOne({subtasks:id},{ $pull:{subtasks:{ $in:id}}})
    await SubTasks.findByIdAndDelete(id);
    res.json({status:"Task Deleted"});
};

module.exports = subtaskCtrl;