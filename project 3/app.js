document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('employee-form');
    const employeeList = document.getElementById('employee-list');

    let employees = [];

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const position = document.getElementById('position').value;

        const employee = { id: Date.now(), name, email, position };
        employees.push(employee);
        renderEmployees();

        form.reset();
    });

    function renderEmployees() {
        employeeList.innerHTML = '';
        employees.forEach(employee => {
            const div = document.createElement('div');
            div.classList.add('employee-item');
            div.innerHTML = `
                <div>
                    <p><strong>Name:</strong> ${employee.name}</p>
                    <p><strong>Email:</strong> ${employee.email}</p>
                    <p><strong>Position:</strong> ${employee.position}</p>
                </div>
                <div>
                    <button onclick="editEmployee(${employee.id})">Edit</button>
                    <button onclick="deleteEmployee(${employee.id})">Delete</button>
                </div>
            `;
            employeeList.appendChild(div);
        });
    }

    window.editEmployee = function(id) {
        const employee = employees.find(emp => emp.id === id);
        if (employee) {
            document.getElementById('name').value = employee.name;
            document.getElementById('email').value = employee.email;
            document.getElementById('position').value = employee.position;
            deleteEmployee(id); // Remove employee to update
        }
    };

    window.deleteEmployee = function(id) {
        employees = employees.filter(emp => emp.id !== id);
        renderEmployees();
    };
});
