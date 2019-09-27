const { expect } = require('chai')
const cheerio = require('cheerio')

const fetchFirstPageToken = require('../../lib/fetch-first-page-token')
const youtubeApi = require('../../lib/youtube-api/youtube-api')

describe('/lib/youtube-api', function () {
  this.timeout(10000)

  it('fetches a comment page', done => {
    const videoId = 'h_tkIpwbsxY'
    fetchFirstPageToken(videoId)
      .chain(token => youtubeApi.commentPage(videoId, token))
      .fork(
        e => done('got an error ' + e.substr(0, 100)),
        p => {
          expect(p).to.have.property('content_html').that.is.a('string')
          const $ = cheerio.load(p.content_html)
          expect($('.comment-thread-renderer').length).to.be.above(1)
          expect($('.comment-renderer').length).to.be.above(1)
          done()
        }
      )
  })

  it('fetches comment replies', done => {
    const videoId = 's6MwGeOm8iI'
    const repliesToken =
      'EhYSC3M2TXdHZU9tOGlJwAEAyAEA4AEBGAYyWRpXEiN6MTIxenBwaGVzbTF1cGg0eTA0Y2YxZzV0bHllamRzajAzayICCAAqGFVDM1hUelZ6YUhRRWQzMHJRYnV2Q3RUUTILczZNd0dlT204aUk4AEABSPQD'
    youtubeApi.commentReplies(videoId, repliesToken).fork(
      e => done('got an error ' + e.substr(0, 100)),
      r => {
        expect(r).to.have.property('content_html').that.is.a('string')
        const $ = cheerio.load(r.content_html)
        expect($('.comment-renderer').length).to.be.above(1)
        done()
      }
    )
  })

  it('fetches comments watch fragment', done => {
    const videoId = 'h_tkIpwbsxY'
    youtubeApi.commentsWatchFragment(videoId).fork(
      e => done('got an error ' + e.substr(0, 100)),
      r => {
        expect(r).to.have.property('name').that.is.a('string')
        expect(r).to.have.property('body').that.is.an('object')
        expect(r.body).to.have.property('watch-discussion').that.is.a('string')
        expect(r).to.have.property('foot').that.is.a('string')

        const $ = cheerio.load(r.body['watch-discussion'])
        expect($('.comment-thread-renderer').length).to.be.above(1)
        expect($('.comment-renderer').length).to.be.above(1)
        done()
      }
    )
  })
})
