function parseNestedJson(json) {
	var parsedJson = {};

	for (var key in json) {
		if (json.hasOwnProperty(key)) {
			var value = json[key];

			if (typeof value === 'string') {
				try {
					parsedJson[key] = JSON.parse(value);
				} catch (error) {
					// assign the original string value
					parsedJson[key] = value;
				}
			} else if (typeof value === 'object') {
				// recursively call for JSON within object value
				parsedJson[key] = parseNestedJson(value);
			} else {
				// assign non-string and non-object values
				parsedJson[key] = value;
			}
		}
	}

	return parsedJson;
}

function parseBloksResponse(text) {
	const { tree } = JSON.parse(text).layout.bloks_payload;
	const sanitized = JSON.parse(JSON.parse(tree['㐟']['#'].match(/\"\{.*\}\"/)[0]));
	const json = parseNestedJson(sanitized);

	return json;
}

module.exports = { parseBloksResponse }
