const Project = require("../model/project.model");
const projectCtrl = {};

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//
// FIX MODEL STRUCTRURE [PROGRESS] //
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//

//=========================== DATA ===========================//

projectCtrl.getAllData = async (req, res, next) => {
    const data = await Project.find();
    // Return all
    res.json(data);
};

projectCtrl.getData = async (req, res, next) => {
    const data = await Project.findById(req.params.id);
    res.json(data);
};

projectCtrl.createData = async (req, res, next) => {
    const data = new Project(req.body);
    await data.save();
    res.json({
        status: "Data Saved"
    })
};

projectCtrl.editData = async (req, res, next) => {
    const { id } = req.params;
    const data = {
        project: req.body.project
    }
    await Project.findByIdAndUpdate(id, { $set: data }, { new: true });
    res.json({ status: "Updated successfully" })
}

projectCtrl.deleteData = async (req, res, next) => {
    await Project.findByIdAndRemove(req.params.id);
    res.json({ status: 'Deleted' });
};


projectCtrl.tasksInProject = async (req,res) =>{
    const { id } = req.params;
    //This line populate the ref 
    const project = await Project.findById(id).populate({path:'tasks',populate:{path:'subtasks'}});
    res.json(project.tasks);
}

module.exports = projectCtrl;