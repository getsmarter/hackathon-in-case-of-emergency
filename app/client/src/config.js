export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "eu-west-1",
    BUCKET: "ice-app"
  },
  apiGateway: {
    REGION: "YOUR_API_GATEWAY_REGION",
    URL: "YOUR_API_GATEWAY_URL"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_aKD7FA9S2",
    APP_CLIENT_ID: "79bn8geccr4abevqc73eq8bo9k",
    IDENTITY_POOL_ID: "eu-west-1:9462592b-01d7-4c66-b4fd-289e53b42f9d"
  }
};