const Youtube = require('./src/index')


Youtube.fetchComments('7Glc2mHLPRM').fork(e => console.error('ERROR', e),
  (p) => {
    console.log('comments', p.comments);
    console.log('nextPageToken', p.nextPageToken);
  })


Youtube.fetchAllComments('7Glc2mHLPRM')
  .fork(e => console.error('ERROR', e),
    allComments => console.log('allComments', allComments))