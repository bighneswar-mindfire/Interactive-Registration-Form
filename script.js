var selectedRow = null;

function formSubmit() {
    console.log("hello");

    var formData = inputData();
    console.log(formData);
    if (validate(formData)) {
        if (selectedRow == null) {
            insertRecord(formData);
        } else {
            updateData(formData);
        }
        clearForm();
    }

}

function inputData() {
    var data = {};
    data["name"] = document.getElementById("name").value;
    data["mail"] = document.getElementById("mail").value;
    data["phone"] = document.getElementById("phone").value;
    data["gender"] = document.querySelector('input[name="gender"]:checked')?.value || "";

    return data;
}

function insertRecord(formData) {

    var table = document.querySelector("#details");
    var newRow = document.createElement("tr");

    var nameCell = document.createElement("td");
    nameCell.textContent = formData.name;
    newRow.appendChild(nameCell);

    var mailCell = document.createElement("td");
    mailCell.textContent = formData.mail;
    newRow.appendChild(mailCell);

    var phoneCell = document.createElement("td");
    phoneCell.textContent = formData.phone;
    newRow.appendChild(phoneCell);

    var genderCell = document.createElement("td");
    genderCell.textContent = formData.gender;
    newRow.appendChild(genderCell);

    var btnCell = document.createElement("td");
    btnCell.innerHTML = `<button onclick="onEdit(this)">Edit</button>
                        <button onclick="deleteData(this)">Delete</button>`;
    newRow.appendChild(btnCell);

    table.append(newRow);

}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("mail").value = "";
    document.getElementById("phone").value = "";
    var radios = document.querySelectorAll('input[name="gender"]');
    radios.forEach(radio => {
        radio.checked = false;
    });
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    console.log(selectedRow);
    document.querySelector("input[type='submit']").value = "Update";

    document.getElementById("name").value = selectedRow.cells[0].textContent;
    document.getElementById("mail").value = selectedRow.cells[1].textContent;
    document.getElementById("phone").value = selectedRow.cells[2].textContent;
    var radios = document.querySelectorAll('input[name="gender"]');
    radios.forEach(radio => {
        radio.checked = radio.value == selectedRow.cells[3].textContent;
    })
}

function updateData(formData) {
    selectedRow.cells[0].textContent = formData.name;
    selectedRow.cells[1].textContent = formData.mail;
    selectedRow.cells[2].textContent = formData.phone;
    selectedRow.cells[3].textContent = formData.gender;
    document.querySelector("input[type='submit']").value = "Submit";
}

function deleteData(td) {
    if (confirm("Do you want to delete this record?")) {
        var row = td.parentElement.parentElement;
        document.getElementById("details").deleteRow(row.rowIndex);
    }
}

function validate(formData) {
    var valid = true;

    if (formData.name == "") {
        valid = false;
        document.getElementById("nameValidation").classList.remove("hide");
    } else {
        if (!document.getElementById("nameValidation").classList.contains("hide"))
            document.getElementById("nameValidation").classList.add("hide");
    }

    if (formData.mail == "") {
        valid = false;
        document.getElementById("mailValidation").classList.remove("hide");
    } else {
        if (!document.getElementById("mailValidation").classList.contains("hide"))
            document.getElementById("mailValidation").classList.add("hide");
    }

    if (formData.phone == "") {
        valid = false;
        document.getElementById("phoneValidation").classList.remove("hide");
    } else {
        if (!document.getElementById("phoneValidation").classList.contains("hide"))
            document.getElementById("phoneValidation").classList.add("hide");
    }

    if (formData.gender == "") {
        valid = false;
        document.getElementById("genderValidation").classList.remove("hide");
    } else {
        if (!document.getElementById("genderValidation").classList.contains("hide"))
            document.getElementById("genderValidation").classList.add("hide");
    }

    return valid;

}