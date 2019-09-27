const Task = require('data.task')
var fetchComments = require('./lib/fetch-comments')

const fetchAllComments = (videoId, pageToken, fetched = []) => fetchComments(videoId, pageToken)
  .chain(({ comments, nextPageToken }) => nextPageToken
    ? fetchAllComments(videoId, nextPageToken, fetched.concat(comments))
    : Task.of(fetched.concat(comments)))

fetchAllComments('h_tkIpwbsxY')
  .fork(e => console.error('ERROR', e),
    allComments => console.log(allComments))

module.exports = {
  fetchComments,
  fetchAllComments,
}