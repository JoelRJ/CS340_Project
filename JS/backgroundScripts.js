// Author: Joel Johnson
// Date: 6/1/19
// Purpose: Client-side javascript making AJAX requests from server for Database interactions and UI
// Site: http://web.engr.oregonstate.edu/~johnsjoe/DBAssignment/

document.addEventListener("DOMContentLoaded", initialize);

// Function to initialize table and bind the submit button 
function initialize() {
}

// Check server SQL database to see if data exists, if so populate table with data 
function updateTable() {
    
    // https://www.w3schools.com/js/js_json_http.asp
    var req = new XMLHttpRequest();
    var selector = document.getElementById("tableSelector");
    var payload = selector.options[selector.selectedIndex].value;
    console.log(payload);
    req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/view_database', true);
    
    req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            console.log(response);
        } else {
            console.log("Error in network request: " + req.statusText);
    }});
    req.send(JSON.stringify(payload));
    event.preventDefault();
}
        
        
	// var req = new XMLHttpRequest();
	// req.open("GET", "http://flip3.engr.oregonstate.edu:16066/view_database", true);

	// req.addEventListener('load',function(){
		// if(req.status >= 200 && req.status < 400){
				// var getResponse = req.responseText;
				// if (getResponse.length > 0) {
                    // console.log(getResponse);
					// // initiateTable();
					// // updateTable(getResponse);
					// // hasTable = 1;
				// }
		// } else {
			// console.log("Error in network request: " + req.statusText);
		// }
	// });

	// req.send(null);
	// event.preventDefault();
// }

// function bindButton() {
	// document.getElementById('submitData').addEventListener('click', function(event){
	
		// // https://www.w3schools.com/js/js_json_http.asp
		// var req = new XMLHttpRequest();
		// var payload = {"name": null, "reps": null, "weight": null, "unit": null, "lbs": null, "date": null, "request": 1};

		// payload.name = document.getElementById("name").value;
		
		// if (payload.name === "") {
			// alert("Exercise Name cannot be blank");
		// }
		// else {
			// payload.reps = document.getElementById("reps").value;
			// payload.weight = document.getElementById("weight").value;
			// if (document.getElementById("unitLBS").checked) {
				// payload.unit = 1;
			// }
			// else {
				// payload.unit = 0;
			// }
			// payload.date = document.getElementById("date").value;
			
			// req.open("POST", 'http://flip3.engr.oregonstate.edu:1066/', true);
			
			// req.addEventListener('load',function(){
				// if(req.status >= 200 && req.status < 400){
					// var response = JSON.parse(req.responseText);
					// if (!hasTable) {
						// initiateTable();
					// }
					// updateTable(response);
				// } else {
					// console.log("Error in network request: " + req.statusText);
			// }});
			// req.send(JSON.stringify(payload));
			// event.preventDefault();
		// }
	// });
// }


// function initiateTable() {
	// // Create a header
	// var body = document.body;

	// // Add table, and five buttons to the body 
	// var insertBreak = document.createElement("br");
	// body.appendChild(insertBreak);
	// var createTable = document.createElement("table");
	// body.appendChild(createTable);

	// // Select and edit the table 
	// var table = document.querySelector("table");
	// table.setAttribute('border', '1');
	// table.style.borderWidth = "1px";

	// // Create the header row of the table 
	// var header = table.createTHead();
	// var row = header.insertRow(0);
	
	// var headerNames = ["Exercise Name", "Number of Reps", "Weight", "Date", "Unit", "Edit Row"];
	// for (var column = 0; column < 6; column++) {
		// cell = row.insertCell(column);
		// cell.innerHTML = headerNames[column];
	// }
// }

// // Update the contents of the table. Accepts the object newData, used to access 
// // name, reps, weight, date, and unit of exercise
// function updateTable(newData) {
	
	// // Create the body of the table 
	// var table = document.querySelector("table");
	// var tbody = document.querySelector("tbody");
	// var body = table.createTBody(0);
	
	// // Delete old table's rows (not header)
	// var Parent = document.querySelector("table");
	// for(var i = Parent.rows.length - 1; i > 0; i--)
	// {
		// Parent.deleteRow(i);
	// }

	// // Insert row contents with data from server 
	// for (var row = 0; row < Object.keys(newData).length; row++) {
		
		// // First 5 columns (data input)
		// var unit;
		// if (newData[row].lbs) {
			// unit = "lbs";
		// }
		// else {
			// unit = "kgs";
		// }
		// var inputCells = [newData[row].name, newData[row].reps, newData[row].weight, newData[row].date.substr(0, newData[row].date.indexOf('T')), unit];
		// var tableRow = body.insertRow(row);
		
		// for (var column = 0; column < 5; column++) {
			// var cell = tableRow.insertCell(column);
			// cell.innerHTML = inputCells[column];
		// }
		
		// var cell = tableRow.insertCell(5);
		
		// // Last cell (add form with two buttons and one hidden id)
		// cell.appendChild(document.createElement("form"));
		// cell = cell.lastElementChild;
		
		// for (var i = 0; i < 3; i++) {
			// cell.appendChild(document.createElement("input"));
		// }

		// // Delete Button
		// cell.children[0].value = "Delete";
		// cell.children[0].type = "button";
		// cell.children[0].addEventListener("click", deleteRow);
		
		// // Edit button 
		// cell.children[1].value= "Edit";
		// cell.children[1].type = "button";
		// cell.children[1].className = "editButton";
		// cell.children[1].addEventListener("click", editRow);
		
		// // Hidden ID
		// cell.children[2].type = "hidden";
		// cell.children[2].id = newData[row].id;
	// }
// }

// // Called from the edit button, this allows the user to edit the selected row
// // Once called, is changed to access updateRow() and changes button label to Update 
// function editRow() {
	// var id = this.parentElement.lastElementChild.id;
	
	// var tableRow = this.parentElement.parentElement.parentElement;
	
	// // Save the contents in the cells, populate editable input with contents 
	// var contents = [null, null, null, null, null];
	// var headerNames = ["nameUpdate", "repsUpdate", "weightUpdate", "dateUpdate", "unitUpdate"];
	// for (var i = 0; i < 5; i++) {
		// var cell =  tableRow.childNodes[i];
		// contents[i] = cell.textContent;
		// cell.textContent = "";
		
		// var input = document.createElement("input");
		// input.type = "text";
		// input.value = contents[i];
		// input.name = headerNames[i];
		// input.id = headerNames[i];
		// cell.appendChild(input);
	// }
	
	// // Change button to update 
	// var updateButton = tableRow.getElementsByClassName("editButton")[0];
	// updateButton.value = "Update";
	// updateButton.removeEventListener('click', editRow);
	// updateButton.addEventListener('click', updateRow);
// }

// // Allows user to save changes made to row edits
// function updateRow() {
	// var id = this.parentElement.lastElementChild.id;
	// var tableRow = this.parentElement.parentElement.parentElement;
	
	// var payload = {"name": null, "reps": null, "weight": null, "unit": null, "lbs": null, "date": null, "request": 0};
	// var headerNames = ["nameUpdate", "repsUpdate", "weightUpdate", "dateUpdate", "unitUpdate"];

	// // Gather data to be sent 
	// payload.id = id;
	// payload.name = document.getElementById(headerNames[0]).value;
	// payload.reps = document.getElementById(headerNames[1]).value;
	// payload.weight = document.getElementById(headerNames[2]).value;
	// payload.date = document.getElementById(headerNames[3]).value;
	// if (document.getElementById(headerNames[4]).value.toLowerCase() === "lbs") {
		// payload.unit = 1;
	// }
	// else {
		// payload.unit = 0;
	// }
	
	// // Make POST request to server 
	// var req = new XMLHttpRequest();
	// req.open("POST", 'http://flip3.engr.oregonstate.edu:1066/', true);
	
	// req.addEventListener('load',function(){
		// if(req.status >= 200 && req.status < 400){
		// } else {
			// console.log("Error in network request: " + req.statusText);
		// }
	// });
	// req.send(JSON.stringify(payload));
	// event.preventDefault();
	
	// // Reset all cells to be uneditable
	// for (var i = 0; i < 5; i++) {
		// var cell =  tableRow.childNodes[i];
		// var lastValue = document.getElementById(headerNames[i]).value;
		// cell.innerHTML = "";
		// cell.textContent = lastValue;
	// }
	
	// // Change button to be edit button 
	// var updateButton = tableRow.getElementsByClassName("editButton")[0];
	// updateButton.value = "Edit";
	// updateButton.removeEventListener('click', updateRow);
	// updateButton.addEventListener('click', editRow);
// }

// // Delete the selected row (attached to delete button)
// function deleteRow() {
	// var id = this.parentElement.lastElementChild.id;
	
	// // Make get request (sending id to be deleted)
	// var req = new XMLHttpRequest();
	// req.open("GET", "http://flip3.engr.oregonstate.edu:1066/?id=" + id, true);

	// var rowToDelete = this.parentElement.parentElement.parentElement;

	// req.addEventListener('load',function(){
		// if(req.status >= 200 && req.status < 400){
			// rowToDelete.parentElement.removeChild(rowToDelete);
		// } else {
			// console.log("Error in network request: " + req.statusText);
		// }
	// });

	// req.send(null);
	// event.preventDefault();
// }
