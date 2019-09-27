const Youtube = require('./src/index')


Youtube.fetchComments('7Glc2mHLPRM').fork(e => console.error('ERROR', e),
Comments => console.log('Comments',Comments))


Youtube.fetchAllComments('7Glc2mHLPRM')
  .fork(e => console.error('ERROR', e),
    allComments => console.log('allComments',allComments))
