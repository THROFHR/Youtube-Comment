const Youtube = require('./src/index')


Youtube.fetchComments('h_tkIpwbsxY').fork(e => console.error('ERROR', e),
Comments => console.log('Comments',Comments))


Youtube.fetchAllComments('h_tkIpwbsxY')
  .fork(e => console.error('ERROR', e),
    allComments => console.log('allComments',allComments))
