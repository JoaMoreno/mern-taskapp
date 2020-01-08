const Tasks = require("../model/added.model");
const Project = require("../model/project.model");
const addedCtrl = {};

//=========================== CRUD ===========================//

addedCtrl.getAllData = async (req, res, next) => {
    const data = await Tasks.find();
    // Return all
    res.json(data);
};

addedCtrl.getData = async (req, res, next) => {
    const data = await Tasks.findById(req.params.id);
    res.json(data);
};

addedCtrl.createData = async (req, res, next) => {
    project = req.params;
    id = project.id;
    const { title, content} = req.body;
    const task = await Tasks.create({
        title,
        content,
        project:id
    });
    await task.save();

    const projectById = await Project.findById(id);

    projectById.tasks.push(task);
    await projectById.save();

    return res.json(projectById);
};

addedCtrl.projectInTask = async (req, res) => {
    const { id } = req.params;
    const projectByTask = await Tasks.findById(id).populate('subtasks');
    console.log(projectByTask)
    res.json(projectByTask);
}

addedCtrl.deleteData = async (req, res, next) => {
    const id= req.params.id;
    await Project.updateOne({tasks:id},{ $pull:{tasks:{ $in:id}}})
    await Tasks.findByIdAndDelete(id);
    res.json({status:"Task Deleted"});
};

// ENCONTRAR FORMAR DE ACTUALIZAR DESDE DB
// (NO REESCRIBIR CADA CAMPO)
/** addedCtrl.editData = async (req, res, next) => {
     const { id } = req.params;
     const data = {
         project: req.body.project
     }
     await Project.findByIdAndUpdate(id, { $set: data }, { new: true });
     res.json({ status: "Updated successfully" })
 }*/
/** 
addedCtrl.deleteData = async (req, res, next) => {
    await Added.findByIdAndRemove(req.params.id);
    res.json({ status: 'Deleted' });
};

//=========================== Task ===========================//

addedCtrl.createTask = async (req, res, next) => {
    const { id } = req.params;
    const data = {
        // El body recibe la informacion, sin tener que entrar en tasks[{}] 
        tasks: req.body
    }
    await Added.findByIdAndUpdate(id, { $push: data }, { new: true });
    res.json({ status: "Task created successfully" })
}

addedCtrl.createNote = async (req, res, next) => {
    const { id } = req.params;
    const data = {
        // El body recibe la informacion, sin tener que entrar en tasks[{}] 
        notes: req.body
    }
    await Added.findByIdAndUpdate(id, { $push: data }, { new: true });
    res.json({ status: "Note created successfully" })
}

addedCtrl.createImg = async (req, res, next) => {
    const { id } = req.params;
    const data = {
        // El body recibe la informacion, sin tener que entrar en tasks[{}] 
        imgs: req.body
    }
    await Added.findByIdAndUpdate(id, { $push: data }, { new: true });
    res.json({ status: "Img created successfully" })
}

//================================================================================
addedCtrl.editTask = async (req, res, next) => {
    const { id } = req.params;
    const data = {
        tasks: req.body.tasks
    }
    await Added.findByIdAndUpdate(id, { $push: data }, { new: true });
    res.json({ status: "Edited successfully" })
}

addedCtrl.deleteTask = async (req, res, next) => {
    const { id } = req.params;
    await Added.findOne({ "tasks._id": id }, function (err, result) {
        result.tasks.id(id).remove();
        result.save();
    });
    res.json({ status: 'Deleted' });
};
*/
module.exports = addedCtrl