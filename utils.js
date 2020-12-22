const { prefix } = require("./config.json");

exports.handleResponse = (response) => {
  return response.json().then(function (json) {
    return response.ok ? json : Promise.reject(json);
  });
};

exports.getOptions = (query, variables) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };
  return options;
};

exports.getArgs = (message) => {
  return message.content.slice(prefix.length).trim();
};

exports.getCommand = (args) => {
  return args.slice(0, args.indexOf(" ")).toLowerCase();
};
