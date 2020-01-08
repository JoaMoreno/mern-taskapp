const { Router } = require("express");
const router = Router();

const projectCtrl = require("../controller/project.controller");
const addedCtrl = require("../controller/added.controller");
const subtaskCtrl = require("../controller/subtask.controller")

/** ================ PROJECT ================ */
router.route("/project")
    .get(projectCtrl.getAllData)
    .post(projectCtrl.createData)

router.route("/project/:id")
    .post(projectCtrl.tasksInProject)
    .delete(projectCtrl.deleteData)
    

 /** ================= TASK ================= */

router.route("/task/:id")
    .post(addedCtrl.createData)
    .delete(addedCtrl.deleteData)

router.post("/task/populate/:id",addedCtrl.projectInTask); // need id of task

 /** ================= SUBTASK ================= */

 router.route("/subtask/:id")
 .post(subtaskCtrl.createData)
 .delete(subtaskCtrl.deleteData)

router.post("/subtask/populate/:id",subtaskCtrl.TaskInSubTask); // need id of task

module.exports = router;