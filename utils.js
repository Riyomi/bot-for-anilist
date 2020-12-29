const PREFIX = "!";

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
  const arguments = message.content.slice(PREFIX.length).trim().toLowerCase();

  if (arguments.indexOf(" ") == -1) return { command: arguments };

  const command = arguments.slice(0, arguments.indexOf(" "));
  const args = arguments.slice(arguments.indexOf(" ")).trim();

  return { command, args };
};
