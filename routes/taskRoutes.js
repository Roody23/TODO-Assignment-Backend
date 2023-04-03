const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/getTasks", taskController.getTasks);

router.get("/getTask", taskController.getTask);

router.post("/postTask", taskController.postTask);

router.put("/putTask", taskController.putTask);

router.delete("/delTask", taskController.delTask);

module.exports = router;
