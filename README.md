# DON'T USE THIS!
This is old, use this instead https://github.com/LevelbossMike/ember-deploy

# ember-s3-redis-deploy

A very specific command line script to build an Ember app, push it to S3, and update redis with the "index.html" contents.
[dotenv](https://github.com/motdotla/dotenv) loads and environment file based on the `--environment` option. It should contain REDIS_URL, S3_BUCKET_NAME and AWS credentials required by [aws s3 sync](http://docs.aws.amazon.com/cli/latest/reference/s3/sync.html).

Keep an eye on https://github.com/stefanpenner/ember-cli/issues/1256 to see if something better comes along.

### Installing
```sh
npm install --save-dev ember-s3-redis-deploy
```

### Deploying

```sh
# adds the key 'photos-cms-client-app/canary/index.html'
# with the contents on 'app/index.html' to redis
ember-s3-redis-deploy --environment production --release stable
```

### Serving

In the server app use the `buildReleaseKey` convenience function to construct the key name saved in redis.

```js
var buildReleaseKey = require('ember-s3-redis-deploy').buildReleaseKey;

/*
 * Omitted server code
 */

app.get('/', function (request, response) {
  // opionally allow for loading different releases
  // i.e. example.com?release=beta
  var release = request.query.release || 'stable';

  var key = buildReleaseKey({
    appName: 'my-ember-app-name',
    release: release
  });

  var html = redisClient.get(key, function (html) {
    response.send(html);
  });
});
```
