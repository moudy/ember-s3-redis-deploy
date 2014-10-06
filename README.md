# ember-s3-redis-deploy

A very specific command line script to build an Ember app, push it to S3, and update redis with the "index.html" contents.
[dotenv](https://github.com/motdotla/dotenv) loads and environment file based on the `--environment` option. It should contain REDIS_URL, S3_BUCKET_NAME and AWS credentials required by [aws s3 sync](http://docs.aws.amazon.com/cli/latest/reference/s3/sync.html).

``sh
ember-s3-redis-deploy --environment production --release canary
# adds the key 'photos-cms-client-app/canary/index.html' with the contents on 'app/index.html'
```

In the server app use the `buildReleaseKey` convenience function to construct the key name saved in redis.

```js
var buildReleaseKey = require('ember-s3-redis-deploy').buildReleaseKey;

...
var key = buildReleaseKey({
  appName: 'my-ember-app-name',
  release: 'stable'
});

var html = redisClient.get(key, function (html) {
  response.send(html);
});
...
```
