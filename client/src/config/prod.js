// prod.js - production keys here
module.exports = {
  algoliaAppID: process.env.REACT_APP_ALGOLIA_APP_ID,
  algoliaAPIKey: process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY,
  algoliaIndexName: process.env.REACT_APP_ALGOLIA_INDEX_NAME,
  s3BucketAddress: process.env.REACT_APP_S3_BUCKET_ADDRESS,
};
