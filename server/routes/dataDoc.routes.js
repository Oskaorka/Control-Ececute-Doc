const express = require("express");
const DataDoc = require("../models/DataDoc");
const tokenService = require("../services/token.service");
const router = express.Router({ mergeParams: true });


function parseDate(time) {
  const newNum = time.split(".");
  const parseEndTime = new Date(newNum[2], newNum[1] - 1, newNum[0]);
  function getDayCount(dateEndTime) {
      const dateCurrentTime = Date.parse(new Date());
      const getTime = Date.parse(dateEndTime) - dateCurrentTime;
      const deadline = Math.floor(getTime / (24 * 60 * 60 * 1000));
      return deadline;
  }
  return getDayCount(parseEndTime);
}
function dataSort(data) {
  return data.sort(function (a, b) {
      return (
          parseDate(a.periodOfExecution) - parseDate(b.periodOfExecution)
      );
  });
}



router.get("/", async (req, res) => {
  try {
    const list = await DataDoc.find();
    // console.log(list);
    const list2 = [...list.filter(e => e.inWork.length > 0)];
    // const listWithoutInWork = list.filter(e => e.inWork.length > 0)
    // res.status(200).send(listWithoutInWork);
    // res.status(200).send(dataSort(list));
    res.status(200).send(dataSort(list2));
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
router.patch("/:userId", async (req, res) => {
  // console.log(userId);
  // console.log(req.body);
  const { userId } = req.params;
  const { _id } = req.body;
  // console.log(req.body);
  try {
    if (userId && _id) {
      const newData = await DataDoc.findByIdAndUpdate(_id, req.body, {
        new: true,
      });
      // console.log(newData);
      res.send(newData);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
router.post("/", async (req, res) => {
  // const { userId } = req.params;
  // console.log(userId);
  // console.log(newDocData);
  // console.log(req.body);
  // console.log(newDocData )
  try {
    const newDocData = await DataDoc.create({
      ...req.body,
    });
    // const tokens = tokenService.generate({ _id: newDocData._id });
    // await tokenService.save(newDocData._id, tokens.refreshToken);
    // res.status(201).send({ ...tokens, userId: newDocData._id });
    res.status(201).send(newDocData);
  } catch (error) {
    console.log(e.message);
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
