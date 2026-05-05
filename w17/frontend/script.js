fetch('http://localhost:3000/api/employees')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('employeeList');

    data.forEach(emp => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <img src="${emp.image}">
        <h3>${emp.name}</h3>
        <p>${emp.designation}</p>
        <p>${emp.department}</p>
        <p>Salary: ₹${emp.salary}</p>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => console.log(err));