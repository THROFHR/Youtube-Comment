# Youtube-Comments

## Examples

``` javascript
const Youtube = require('youtube-comments-fetch')

Youtube.fetchComments('7Glc2mHLPRM')
  .fork(e => console.error('ERROR', e),
        p => {
          console.log('comments', p.comments)
          console.log('nextPageToken', p.nextPageToken)
        })
```

``` javascript
const Youtube = require('youtube-comments-fetch')

Youtube.fetchAllComments('7Glc2mHLPRM')
  .fork(e => console.error('ERROR', e),
        allComments => console.log(allComments))

```
