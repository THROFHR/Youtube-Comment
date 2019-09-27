const Task = require('data.task')
var fetchComments = require('./lib/fetch-comments')

const fetchAllComments = (videoId, pageToken, fetched = []) => fetchComments(videoId, pageToken)
  .chain(({ comments, nextPageToken }) => nextPageToken
    ? fetchAllComments(videoId, nextPageToken, fetched.concat(comments))
    : Task.of(fetched.concat(comments)))


module.exports = {
  fetchComments,
  fetchAllComments,
}