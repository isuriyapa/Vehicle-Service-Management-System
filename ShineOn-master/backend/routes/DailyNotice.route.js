const express = require('express');
const router = express.Router();
const {
  saveNotice,
  getNoticeById,
  getNotices,
  updateNotice,
  deleteNotice,
  publish,
} = require('../controllers/DailyNotice.controller');

//@route  GET api/daily/notices
//@desc   fetch all daily notices
//@access Public
router.get('/', getNotices);

//@route  GET api/daily/notices/:id
//@desc   fetch daily notices by Id
//@access Public
router.get('/:id', getNoticeById);

//@route  POST api/daily/notices/
//@desc   save daily/notices
//@access Public
router.post('/', saveNotice);

//@route  PUT api/daily/notices/:id
//@desc   update daily/notices by Id
//@access Public
router.put('/:id', updateNotice);

//@route  DELETE api/daily/notices/:id
//@desc   delete daily/notices by Id
//@access Public
router.delete('/:id', deleteNotice);

//@route  PUT api/daily/notices/publish/:id
//@desc   update daily/notices by Id
//@access Public
router.put('/publish/:id', publish);

module.exports = router;
