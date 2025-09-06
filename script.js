const studentList = document.getElementById("studentList");
const activityLog = document.getElementById("activityLog");
const addButton = document.getElementById("addButton");
let students = [];
function addStudent() {
    const fieldName = document.getElementById("name");
    const fieldAge = document.getElementById("age");
    const fieldGrade = document.getElementById("grade");

    const studentName = fieldName.value.trim();
    const studentAge = fieldAge.value.trim();
    const studentGrade = fieldGrade.value.trim();

    if (studentName === "" || studentAge === "" || studentGrade === '') {
        alert("Please enter all field values");
        return;
    }
    const newStudent = {
        name: studentName,
        age: studentAge,
        grade: studentGrade
    };

    students.push(newStudent);
    saveData();
    displayStudents();
    clearForm();
    addButton.textContent = "Add Student";
}
function displayStudents() {
    studentList.innerHTML = "";

    students.forEach(function (student, index) {
        const card = document.createElement('div');
        card.className = "card";

        const textContainer = document.createElement('div');

        const containerName = document.createElement('b');
        containerName.textContent = "Name: " + student.name;
        textContainer.appendChild(containerName);

        const containerAge = document.createElement('p');
        containerAge.textContent = "Age: " + student.age;
        textContainer.appendChild(containerAge);

        const containerGrade = document.createElement('p');
        containerGrade.textContent = "Grade:   " + student.grade;
        textContainer.appendChild(containerGrade);

        const buttonContainer = document.createElement('div');
        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.className = "edit";
        editButton.onclick = function () {
            editStudent(index);
        };
        buttonContainer.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        deleteButton.onclick = function () {
            deleteStudent(index);
        };
        buttonContainer.appendChild(deleteButton);

        card.appendChild(textContainer);
        card.appendChild(buttonContainer);

        studentList.appendChild(card);

        

    })
    saveData();
    updateActivityLog();
}

function deleteStudent(index) {
    let confirmation = confirm("Are you sure you want to delete this record?");
    if (confirmation) {
        students.splice(index, 1);
        displayStudents();
        saveData();
        updateActivityLog();
    }
}

function editStudent(index) {
    addButton.textContent ="Update";
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("age").value = student.age;
    document.getElementById("grade").value = student.grade;
    

    students.splice(index, 1);
    displayStudents();
    saveData();
    updateActivityLog();
    
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("grade").value = "";
}

function saveData() {
    localStorage.setItem("records", studentList.innerHTML);
}
function showTask() {
    studentList.innerHTML = localStorage.getItem("records");
}
showTask();
updateActivityLog();

function updateActivityLog(){
    if(studentList.children.length === 0){
        activityLog.innerHTML ="No records added yet. Add one!"
    }
    else{
        activityLog.innerHTML= "";
    }
}

function clearAll(){
    let confirmation=confirm("Are you sure you want to clear all tasks?");
    if(confirmation){
        studentList.innerHTML =""
        saveData();
        updateActivityLog();
    }
}
