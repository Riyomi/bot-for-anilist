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

exports.parseArgs = (message) => {
  const arguments = message.content.slice(prefix.length).trim();
  const command = arguments.slice(0, arguments.indexOf(" ")).toLowerCase();
  const args = arguments.slice(arguments.indexOf(" ")).trim().toLowerCase();

  return { command, args };
};
