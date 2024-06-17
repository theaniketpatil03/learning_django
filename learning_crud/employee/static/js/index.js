// document.getElementById('employeeSubmit').addEventListener(

function submitForm() {

    // 'submit', function (event) {

    //     event.preventDefault();

    const form = document.getElementById('employeeForm')
    const inputs = form.getElementsByTagName('input');
    const select = form.querySelector('.form-select');

    const formData = new FormData(form);
    console.log(form)
    console.log(formData)

    fetch('/employee/', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            console.log('Success', data)
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].type !== 'submit' && inputs[i].type !== 'button' && inputs[i].type !== 'reset') {
                    inputs[i].value = inputs[i].defaultValue;
                }
            }
            select.selectedIndex = 0;
            window.location.reload();
            // alert('Form submitted successfully');
            document.getElementById('successAlert').classList.remove('d-none');
            document.getElementById('errorAlert').classList.add('d-none');
            

            setTimeout(() => {
                document.getElementById('successAlert').classList.add('d-none');
            }, 2000);
        })
        .catch(error => {
            console.error('Error:', error)
            alert(`Error submitting form. Please try again. ${error}`);
            document.getElementById('errorAlert').classList.remove('d-none');
            document.getElementById('successAlert').classList.add('d-none');

            setTimeout(() => {
                document.getElementById('errorAlert').classList.add('d-none');
            }, 2000);
        })
    // }
}
// )

function openUpdatePopup(emp_id, name, designation, experiance, salary, city){
    const popupForm = document.getElementById('popupForm')
    popupForm.style.display = 'block'

    document.getElementById('up_emp_name').value = name
    document.getElementById('up_emp_experiance').value = experiance
    document.getElementById('up_emp_salary').value = salary
    document.getElementById('up_emp_city').value = city


    const selectElement = document.getElementById('up_emp_designation');
    for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].value === designation) {
            selectElement.selectedIndex = i;
            break; // Exit loop once found
        }
    }

    const saveButton = document.getElementById('submitUpdateButton');
    saveButton.setAttribute('data-employee-id', emp_id);


    
}
function closeUpdatePopup(){
    const popupForm = document.getElementById('popupForm')

    popupForm.style.display = 'none'
}


function submitUpdateForm(){
    const form = document.getElementById('employeeUpdateForm')
    const formData = new FormData(form);
    const employee_id = document.getElementById('submitUpdateButton').getAttribute('data-employee-id');
    const csrfToken = formData.get('csrfmiddlewaretoken');

    console.log(form)
    console.log(formData)
    emp_name = document.getElementById("up_emp_name").value
    emp_designation = document.getElementById("up_emp_designation").value
    emp_experiance = document.getElementById("up_emp_experiance").value
    emp_salary = document.getElementById("up_emp_salary").value
    emp_city = document.getElementById("up_emp_city").value
    console.log(emp_name, emp_designation)

    fetch(`/employee/${employee_id}/`, {
        method: 'PUT',
        body: JSON.stringify({
            'emp_name': emp_name,
            'emp_designation': emp_designation,
            'emp_experiance': emp_experiance,
            'emp_salary': emp_salary,
            'emp_city': emp_city
        }),
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken  // Set the CSRF token in the headers
        },
    })
    .then(response => {
        console.log(response)
        if (!response.ok){
            throw new Error('Network response was not ok')
            }
        window.location.reload();
    })
    .catch(error => {
        console.log(error)
    })
}

function deleteData(employee_id){
    console.log('button clicked')
    console.log(employee_id)
    const csrftoken = getCookie('csrftoken');

    fetch(`/employee/${employee_id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,  // Include CSRF token in headers
        },
    })
    .then(response => {
        if (!response.ok){
            throw new Error('Network response was not ok')
        }
        console.log(response)
        window.location.reload();
    })
    .catch(error => {
        console.log('Error deleting employee: ', error)
    })
}


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
