
const baseURL = "https://swapi.co/api/";

function getData(type, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", baseURL + type + "/");
    xhr.send();
}


function getTableHeaders(obj) {
    var tableHeaders = []

       Object.keys(obj).forEach(function(key) {;
       tableHeaders.push(`<td>${key}</td>`) 
});

    return `<tr>${tableHeaders}</tr>`;
}

function writeToDocument(type) {
    var el = document.getElementById("data");
    el.innerHTML = "";

    getData(type, function(data) {
        var tableRows = [];
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            var dataRow = [];

            Object.keys(item).forEach(function(key) {

            var rowData = item[key].toString();
            var TruncatedData = rowData.substring(0,15);   
            dataRow.push(`<td>${TruncatedData}</td>`);
        });
        tableRows.push(`<tr>${dataRow}</tr>`);
    });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`
    });
}