const fileInput = document.getElementById('file');


const nextButton = document.querySelector('.form-buttons button:first-child');
const displayHandlingDiv = document.querySelector('.display-handling');

fileInput.addEventListener('change', handleFile);
nextButton.addEventListener('click', handleNext);

function handleFile() {
    const file = fileInput.files[0];
    if (!file) return;

    const fileType = file.name.split('.').pop();
    if (fileType !== 'csv' && fileType !== 'json') {
        alert('Unsupported file type');
        return;
    }

    displayHandlingDiv.style.display = 'block';
}

function handleNext() {
    const file = fileInput.files[0];
    if (!file) return;

    

    const reader = new FileReader();
    reader.onload = function(event) {

        const data = event.target.result;
        if (file.type === 'application/json') {
            handleJsonData(data);
        } else {
            handleCsvData(data);
        }
    };
    reader.readAsText(file);
}

function handleJsonData(data) {
  
    const parsedData = JSON.parse(data);
    console.log(parsedData["products"])
   // console.log(parsedData[0][0])
    //console.log(parsedData[0][1])
    displayOutputTable(data);
    document.getElementById("output").innerHTML = parsedData["products"];
    //console.log(parsedData)
}

function handleCsvData(data) {
    const parsedData = Papa.parse(data, { header: true }).data;
    displayOutputTable(parsedData);
}

function displayOutputTable(data) {
   
    const fieldsToDisplay = ['productId', 'subcategory', 'title', 'price', 'popularity', 'description', 'rating', 'utmSource', 'utmMedium'];
   
    console.log(typeof(data))
    //const fields = data[0].map(field => ({ key: field, value: fieldsToDisplay.includes(field) }));
   
    const outputDiv = document.createElement('div');
   
    outputDiv.style.display = 'table';
   
    fields.forEach(field => {
        if (field.value) {
            const label = document.createElement('label');
            label.textContent = field.key;
            outputDiv.appendChild(label);
        }
    });

    data.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.style.display = 'table-row';
        fields.forEach(field => {
            if (field.value) {
                const cell = document.createElement('div');
                cell.textContent = row[field.key];
                cell.style.display = 'table-cell';
                rowDiv.appendChild(cell);
            }
        });
        outputDiv.appendChild(rowDiv);
    });

    displayHandlingDiv.insertAdjacentElement('beforebegin', outputDiv);
}