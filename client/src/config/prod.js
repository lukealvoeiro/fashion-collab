// prod.js - production keys here
module.exports = {
  algoliaAppID: process.env.ALGOLIA_APP_ID,
  algoliaAPIKey: process.env.ALGOLIA_API_KEY,
  algoliaIndexName: process.env.ALGOLIA_INDEX_NAME,
  s3BucketAddress: process.env.S3_BUCKET_ADDRESS,
};
