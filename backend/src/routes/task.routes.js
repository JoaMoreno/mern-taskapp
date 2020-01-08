const { Router } = require("express")
const router = Router()

const addedCtrl = require("../controller/added.controller");

router.route("/")
    .get(addedCtrl.getAllData)
    .post(addedCtrl.createData)

router.route("/:id")
    .delete(addedCtrl.deleteData)

module.exports = router;