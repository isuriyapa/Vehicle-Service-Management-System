const express = require('express');
const router = express.Router();
const {
  saveNotice,
  getNoticeById,
  getNotices,
  updateNotice,
  deleteNotice,
  publish,
} = require('../controllers/JobNotice.controller');

//@route  GET api/job/notices
//@desc   fetch all job notices
//@access Public
router.get('/', getNotices);

//@route  GET api/job/notices/:id
//@desc   fetch job notices by Id
//@access Public
router.get('/:id', getNoticeById);

//@route  POST api/job/notices/
//@desc   save job/notices
//@access Public
router.post('/', saveNotice);

//@route  PUT api/job/notices/:id
//@desc   update job/notices by Id
//@access Public
router.put('/:id', updateNotice);

//@route  DELETE api/job/notices/:id
//@desc   delete job/notices by Id
//@access Public
router.delete('/:id', deleteNotice);

//@route  PUT api/job/notices/publish/:id
//@desc   update job/notices by Id
//@access Public
router.put('/publish/:id', publish);

module.exports = router;
