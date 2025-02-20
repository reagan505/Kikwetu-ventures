    // Budget Calculator Logic
    function calculateBudget() {
      const accommodation = +document.getElementById('accommodation').value || 0;
      const transport = +document.getElementById('transport').value || 0;
      const meals = +document.getElementById('meals').value || 0;
      const activities = +document.getElementById('activities').value || 0;
      const miscellaneous = +document.getElementById('miscellaneous').value || 0;

      const total = accommodation + transport + meals + activities + miscellaneous;
      document.getElementById('total-cost').innerText = `${total.toFixed(2)} KSH`;
    }

    // Packing Checklist Logic
    function addItem() {
      const newItem = document.getElementById('new-item').value;
      if (newItem) {
        const checklist = document.getElementById('checklist');
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox"> ${newItem}`;
        checklist.appendChild(li);
        document.getElementById('new-item').value = '';
      }
    }
