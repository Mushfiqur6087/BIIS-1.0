const express = require("express");
const { type } = require("os");
const { runInNewContext } = require("vm");
const router = express.Router({ mergeParams: true });
const query = require("../../Database/STUDENT/course");
router.get("/", async (req, res) => {
  const status =(await query.getRegistrationStatus())[0];
  //console.log(itemsArray);
  res.render("admin-registration-promoteStudents",{status});
});

router.post("/" ,async (req,res) => {
  console.log(req.body.action);
  await query.changeRegistrationStatus(req.body.action);

});
module.exports = router;
