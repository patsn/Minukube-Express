function callApi(requestCount) {
	var podCounts = {};
	let promises = [];

	for (let i = 0; i < requestCount; i++) {
		let promise = fetch("http://localhost:30001/")
			.then((response) => response.text())
			.then((text) => {
				const podNameMatch = text.match(/express-deployment-\w+-\w+/);
				if (podNameMatch) {
					const podName = podNameMatch[0];
					if (!podCounts[podName]) {
						podCounts[podName] = 0;
					}
					podCounts[podName]++;
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
		promises.push(promise);
	}

	Promise.all(promises).then(() => {
		console.log("-----------");
		Object.keys(podCounts).forEach((podName) => {
			console.log(`${podName}: ${podCounts[podName]}`);
		});
		console.log("-----------");
		console.log("Total Pods reached: " + Object.keys(podCounts).length);
		console.log("-----------");
	});
}

// Kommandozeilenargumente lesen
const args = process.argv.slice(2);
var requestCount = parseInt(args[0]) || 1000;

if (requestCount >= 1000 || requestCount <= 0) {
	console.log("Request count is set to 1000. (Maximum)");
	requestCount = 1000;
}

callApi(requestCount);
