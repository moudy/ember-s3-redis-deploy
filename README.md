# ember-s3-redis-deploy

A very specific command line script to build an Ember app, push it to S3, and update redis with the "index.html" contents.
[dotenv](https://github.com/motdotla/dotenv) loads and environment file the should contain REDIS_URL, S3_BUCKET_NAME and AWS credentials required by [aws s3 sync](http://docs.aws.amazon.com/cli/latest/reference/s3/sync.html).

``sh
ember-s3-redis-deploy --environment development --release canary
# adds the key 'photos-cms-client-app/canary/index.html' with the contents on 'app/index.html'
```
