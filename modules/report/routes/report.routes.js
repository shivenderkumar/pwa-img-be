const {createReport} = require("../controller/report.controller")
const upload = require("../../../middlewares/multer");

module.exports= (app)=>{
    const router  = require("express").Router();

    router.post("/", upload.single('image'), createReport);
    
    app.use("/api/v1/report", router);
}