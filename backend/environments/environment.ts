export const environment = {
  name: 'LOCAL',
  production: false,
  jwt_secret: 'temp4only_LOCAL_development_USE', //DO NOT EXPOSE THIS VALUE IN A PROD ENVIRONMENT!
  session_length: '360m',
  database: {
    mongo_uri: 'mongodb://localhost:27017', //DO NOT EXPOSE THIS VALUE IN A PROD ENVIRONMENT!
    name: 'nestAng',
  },
  sendgrid: {
    api_key: '{{YOUR_SENDGRID_API_KEY}}', //DO NOT EXPOSE THIS VALUE IN A PROD ENVIRONMENT!
    url: 'http://localhost:4200',
    email_domain: '@{{YOUR_EMAIL_DOMAIN}}.com',
  },
  google: {
    project_id: '{{YOUR GCP PROJECT ID}}', //DO NOT EXPOSE THIS VALUE IN A PROD ENVIRONMENT!
    image_bucket_id: '{{YOUR GCP PUBLIC IMAGE BUCKET ID}}', //DO NOT EXPOSE THIS VALUE IN A PROD ENVIRONMENT!
    doc_bucket_id: '{{YOUR GCP PRIVATE DOCS BUCKET ID}}', //DO NOT EXPOSE THIS VALUE IN A PROD ENVIRONMENT!
  },
};
  