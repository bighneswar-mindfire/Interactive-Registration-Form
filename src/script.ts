interface UserData {
    name: string,
    mail: string,
    phone: string,
    gender: string,
}

var selectedRow: HTMLTableRowElement | null = null;

function formSubmit(): void {
    console.log("hello");

    var formData: UserData = inputData();
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

function inputData(): UserData {
    var data: UserData = {
        name: (document.getElementById("name") as HTMLInputElement).value,
        mail: (document.getElementById("mail") as HTMLInputElement).value,
        phone: (document.getElementById("phone") as HTMLInputElement).value,
        gender: (document.querySelector('input[name="gender"]:checked') as HTMLInputElement | null)?.value || "",
    };


    return data;
}

function insertRecord(formData: UserData): void {

    var table = document.querySelector("#details") as HTMLTableElement;
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
    btnCell.innerHTML = `<button id="edit" onclick="onEdit(this)">Edit</button>
                        <button  id="delete" onclick="deleteData(this)">Delete</button>`;
    newRow.appendChild(btnCell);

    table.append(newRow);

}

function clearForm(): void {
    (document.getElementById("name") as HTMLInputElement).value = "";
    (document.getElementById("mail") as HTMLInputElement).value = "";
    (document.getElementById("phone") as HTMLInputElement).value = "";
    var radios = document.querySelectorAll('input[name="gender"]') as NodeListOf<HTMLInputElement>;
    radios.forEach(radio => {
        radio.checked = false;
    });
    selectedRow = null;
}

function onEdit(td: HTMLElement): void {
    selectedRow?.classList.remove("highlight-row");

    selectedRow = td.parentElement?.parentElement as HTMLTableRowElement;

    var allValidations = document.querySelectorAll(".validation");
    allValidations.forEach(label => {
        label.classList.add("hide");
    });

    (document.querySelector("input[type='submit']") as HTMLInputElement).value = "Update";

    (document.getElementById("name") as HTMLInputElement).value = selectedRow.cells[0]!.textContent;
    (document.getElementById("mail") as HTMLInputElement).value = selectedRow.cells[1]!.textContent;
    (document.getElementById("phone") as HTMLInputElement).value = selectedRow.cells[2]!.textContent;
    const radios = (document.querySelectorAll('input[name="gender"]') as NodeListOf<HTMLInputElement>);
    radios.forEach(radio => {
        // if the condition matches then returns true else false
        if (selectedRow != null)
            radio.checked = radio.value == selectedRow.cells[3]!.textContent;
    });

    // Highlight the currently clicked row.
    selectedRow.classList.add("highlight-row");

}

function updateData(formData: UserData): void {

    if (selectedRow == null) return;

    selectedRow.cells[0]!.textContent = formData.name;
    selectedRow.cells[1]!.textContent = formData.mail;
    selectedRow.cells[2]!.textContent = formData.phone;
    selectedRow.cells[3]!.textContent = formData.gender;

    (document.querySelector("input[type='submit']") as HTMLInputElement).value = "Submit";

    selectedRow.classList.remove("highlight-row");
}

function deleteData(td: HTMLElement): void {
    selectedRow?.classList.remove("highlight-row");
    if (confirm("Do you want to delete this record?")) {
        var row = td.parentElement?.parentElement as HTMLTableRowElement;
        (document.getElementById("details") as HTMLTableElement).deleteRow(row.rowIndex);
        clearForm();
        (document.querySelector("input[type='submit']") as HTMLInputElement).value = "Submit";
        selectedRow = null;
    }
}

function validate(formData: UserData): boolean {
    var valid: boolean = true;

    if (formData.name == "") {
        valid = false;
        document.getElementById("nameValidation")?.classList.remove("hide");
    } else {
        if (!document.getElementById("nameValidation")?.classList.contains("hide"))
            document.getElementById("nameValidation")?.classList.add("hide");
    }

    if (formData.mail == "") {
        valid = false;
        document.getElementById("mailValidation")?.classList.remove("hide");
    } else {
        if (!document.getElementById("mailValidation")?.classList.contains("hide"))
            document.getElementById("mailValidation")?.classList.add("hide");
    }

    if (formData.phone == "") {
        valid = false;
        document.getElementById("phoneValidation")?.classList.remove("hide");
    } else {
        if (!document.getElementById("phoneValidation")?.classList.contains("hide"))
            document.getElementById("phoneValidation")?.classList.add("hide");
    }

    if (formData.gender == "") {
        valid = false;
        document.getElementById("genderValidation")?.classList.remove("hide");
    } else {
        if (!document.getElementById("genderValidation")?.classList.contains("hide"))
            document.getElementById("genderValidation")?.classList.add("hide");
    }

    return valid;
}
