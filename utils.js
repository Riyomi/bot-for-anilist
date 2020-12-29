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

exports.convertStringToColor = (color) => {
  let hexRegex = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

  if (color.match(hexRegex)) return color;

  colors = [
    { name: "blue", value: "#3db4f2" },
    { name: "purple", value: "#c063ff" },
    { name: "green", value: "#4cca51" },
    { name: "orange", value: "#ef881a" },
    { name: "red", value: "#e13333" },
    { name: "pink", value: "#fc9dd6" },
    { name: "gray", value: "#677b94" },
  ];

  return colors.find((c) => c.name === color).value;
};
