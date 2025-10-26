const {
    PORT ,
    CONNECTION_URL,
    JWT_SECRET,
    MAIL_USER,
    MAIL_PASS, 
    CLOUD_NAME,
    API_KEY,
    API_SECRET
} = process.env;

module.exports= {
    port : PORT ,
    connection_url : CONNECTION_URL,
    jwtSecret: JWT_SECRET,
    MailUser: MAIL_USER,
    MailPass: MAIL_PASS,
    cloud_name : CLOUD_NAME,
    cloud_api_key : API_KEY,
    cloud_api_secret : API_SECRET
};