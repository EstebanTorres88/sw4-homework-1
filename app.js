const LOCAL_STORAGE_KEY = "students"

const getStudents = () => {
    const students = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (students === null) {
        return []
    }

    return JSON.parse(students)
};


const saveStudents = (students) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(students))
}


const saveStudent = (student) => {
    const students = getStudents()
    students.push(student)
    saveStudents(students)
}




const registerStudent = () => {
    const form = document.getElementById("student-form")
    const students = getStudents()

    if (!form) {
        return
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault()

        if (!form.checkValidity()) {
            form.reportValidity()
            return
        }


        const nameInput = document.getElementById("student-name")
        const emailInput = document.getElementById("student-email")
        const idInput = document.getElementById("student-id")
        const ageInput = document.getElementById("student-age")
        const programInput = document.getElementById("student-program")



        const student = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            id: idInput.value.trim(),
            age: ageInput.value,
            program: programInput.value

        }


        if (students.some(s => s.id === student.id)) {
            alert(student.name + " cant be registered, the given ID already exists")
            return
        }

        saveStudent(student)
        alert("Student " + student.name + " has been registered")
        form.reset()
        window.location.href = "index.html"




    })

}



const displayStudents = () => {

    const studentList = document.getElementById("student-list")
    const students = getStudents()

    if (!students) {
        return
    }

    studentList.innerHTML = ""

    students.forEach((student, index) => {
        const trow = document.createElement("tr")

        const nameField = document.createElement("td")
        nameField.textContent = student.name

        const emailField = document.createElement("td")
        emailField.textContent = student.email

        const idField = document.createElement("td")
        idField.textContent = student.id

        const programField = document.createElement("td")
        programField.textContent = student.program


        const ageField = document.createElement("td")
        ageField.textContent = student.age

        const actionsField = document.createElement("td")

        const deleteBtn = document.createElement("button")
        deleteBtn.type = "button"
        deleteBtn.textContent = "Delete"
        deleteBtn.classList.add("btn", "btn-delete")
        deleteBtn.addEventListener("click", () => {
            deleteStudent(index)
        })


        actionsField.appendChild(deleteBtn)
        trow.appendChild(idField)
        trow.appendChild(nameField)
        trow.appendChild(emailField)
        trow.appendChild(ageField)
        trow.appendChild(programField)
        trow.appendChild(actionsField)
        studentList.appendChild(trow)


        countStudents()


    });


}



const deleteStudent = (index) => {
    const students = getStudents()
    students.splice(index, 1)
    saveStudents(students)
    displayStudents()
    countStudents()


}



const searchStudent = () => {
    const searchForm = document.getElementById("search-form")
    const searchBar = document.getElementById("search-bar")

    if (!searchBar) {
        return
    }


    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault()
        })
    }

    searchBar.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase().trim()
        const tableRows = document.querySelectorAll('#student-list tr')

        tableRows.forEach((row) => {
            const trowtxt = row.textContent.toLowerCase()
            if (trowtxt.includes(searchTerm)) {
                row.style.display = ''

            } else {
                row.style.display = 'none'
            }




        })

        countStudents()
    })

}



const countStudents = () => {
    const studentCounter = document.getElementById("student-counter")
    const studentList = document.getElementById("student-list")
    if (!studentCounter) {
        return
    }

    const tableRows = document.querySelectorAll('#student-list tr')
    const visibleRows = Array.from(tableRows).filter(row => row.style.display !== 'none')
    studentCounter.textContent = visibleRows.length


    const emptyRow = document.getElementById("empty-row")
    if (visibleRows.length === 0) {

        if (!emptyRow) {
            const emptyRow = document.createElement("tr")
            emptyRow.id = "empty-row"
            const emptyField = document.createElement("td")

            emptyField.textContent = "No results found"
            emptyField.colSpan = 6
            emptyField.style.textAlign = "center"
            emptyRow.appendChild(emptyField)
            studentList.appendChild(emptyRow)

        }
    } else {
        if (emptyRow) {
            emptyRow.remove()
        }

    }
}


document.addEventListener("DOMContentLoaded", () => {
    registerStudent()
    displayStudents()
    searchStudent()
    countStudents()
})





