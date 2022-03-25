const express = require("express");
const Administrator = require("../models/Administrator");
const router = express.Router({ mergeParams: true });
// const auth = require('../middleware/auth.middleware')

router.get("/", async (req, res) => {
  try {
    const list = await Administrator.find();
    res.status(200).send(list);
    // const {userId} = req.params
    // console.log(userId)

    // console.log(list)
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;

//const { userId } = req.params
/*      if(userId) {
            const updateUser = await Admin.findByIdAndUpdate(userId, req.body, {new: true})
            res.send(updateUser)
        }*/
/* console.log(userId)*/
