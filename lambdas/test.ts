module.exports.test = function (event, context, callback) {
    console.log(event); // Contains incoming request data (e.g., query params, headers and more)

    callback(null, {
        statusCode: 200,
        body: JSON.stringify({ "message": "Hello World!" })
    });
};
