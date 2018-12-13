chrome.runtime.onMessage.addListener(

	function (request, sender, sendResponse) {
		if (request.greeting == "hello") {
			var StrObj = document.documentElement.innerText;
			var emailsArray = StrObj.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
			if (emailsArray != null && emailsArray.length) {

				var csvHeader = ["email", "phno"];
				csvHeader.join(',');
				var csvData = [];
				csvData.push(csvHeader);
				csvData.push(emailsArray.join("\n"));
				var csvRow = csvData.join("\n");
				var hiddenElement = document.createElement('a');
				hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvRow);
				hiddenElement.target = '_blank';
				hiddenElement.download = 'data.csv';
				hiddenElement.click();

			} else {
				alert("no email found");
			}
			var phoneArray = StrObj.match(/\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/);
			if (phoneArray != null && phoneArray.length) {
				console.log(phoneArray);
			} else {
				console.log("no ph no found");
			}
		}

	});