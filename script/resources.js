// SVG-enhanced Budget Calculator Features
function calculateBudget() {
  const accommodation = parseFloat(document.getElementById('accommodation').value) || 0;
  const transport = parseFloat(document.getElementById('transport').value) || 0;
  const meals = parseFloat(document.getElementById('meals').value) || 0;
  const activities = parseFloat(document.getElementById('activities').value) || 0;
  const miscellaneous = parseFloat(document.getElementById('miscellaneous').value) || 0;

  const total = accommodation + transport + meals + activities + miscellaneous;
  const selectedCurrency = document.getElementById('currency').value;

  document.getElementById('total-cost').innerText = total.toFixed(2);
  document.getElementById('selected-currency').innerText = selectedCurrency;

  provideBudgetAdvice(total);
}

function provideBudgetAdvice(totalBudget) {
  const adviceElement = document.getElementById('budget-advice');
  const recommendationsElement = document.getElementById('tour-recommendations');
  let advice = '';
  let recommendations = '';

  if (totalBudget < 500) {
    advice = "Your budget is on the lower side. Consider local tours or budget-friendly options.";
    recommendations = `
      <ul>
        <li>Explore walking tours in Kibera.</li>
        <li>Visit community art projects like Mtaa Safi.</li>
        <li>Opt for local meals and free activities.</li>
      </ul>`;
  } else if (totalBudget >= 500 && totalBudget <= 1500) {
    advice = "Your budget allows for mid-range tours. Explore group tours or regional destinations.";
    recommendations = `
      <ul>
        <li>Enjoy guided tours of Uweza Art Gallery or Kibera Art District.</li>
        <li>Book affordable hotels or guest houses.</li>
        <li>Include cultural experiences like local art workshops.</li>
      </ul>`;
  } else if (totalBudget > 1500) {
    advice = "You have a flexible budget! Look into premium experiences.";
    recommendations = `
      <ul>
        <li>Book luxury tours or private guides.</li>
        <li>Stay at premium accommodations.</li>
        <li>Include unique experiences like private art exhibitions or personalized cultural tours.</li>
      </ul>`;
  }

  // Update advice and recommendations in the DOM
  if (adviceElement) {
    adviceElement.innerHTML = advice;
    adviceElement.style.display = 'block';
  }
  if (recommendationsElement) {
    recommendationsElement.innerHTML = recommendations;
    recommendationsElement.style.display = 'block';
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const checklist = document.getElementById("checklist");
  const progressElement = document.getElementById("checklist-progress");
  const newItemInput = document.getElementById("new-item");

  // Add a new item to the checklist
  function addItem() {
    const newItemText = newItemInput.value.trim();

    if (newItemText) {
      const newListItem = document.createElement("li");
      newListItem.innerHTML = `<input type="checkbox" class="checklist-item"> ${newItemText}`;
      checklist.appendChild(newListItem);
      newItemInput.value = ""; // Clear the input field
      updateProgress();
    }
  }

  // Save the checklist to local storage
  function saveChecklist() {
    const items = Array.from(checklist.children).map((item) => ({
      text: item.innerText.trim(),
      checked: item.querySelector("input[type='checkbox']").checked,
    }));
    localStorage.setItem("packingChecklist", JSON.stringify(items));
    alert("Your checklist has been saved!");
  }

  // Load the checklist from local storage and preserve default items
  function loadChecklist() {
    const savedChecklist = JSON.parse(localStorage.getItem("packingChecklist") || "[]");

    // Preserve existing checklist items
    const existingItems = Array.from(checklist.children).map((item) => ({
      text: item.innerText.trim(),
      checked: item.querySelector("input[type='checkbox']").checked,
    }));

    // Combine existing and saved items
    const combinedChecklist = [...existingItems, ...savedChecklist];

    // Clear checklist and repopulate
    checklist.innerHTML = ""; // Clear existing checklist
    combinedChecklist.forEach(({ text, checked }) => {
      const newListItem = document.createElement("li");
      newListItem.innerHTML = `<input type="checkbox" class="checklist-item" ${
        checked ? "checked" : ""
      }> ${text}`;
      checklist.appendChild(newListItem);
    });

    updateProgress();
  }

  // Update the progress percentage
  function updateProgress() {
    const checkboxes = checklist.querySelectorAll(".checklist-item");
    const checked = Array.from(checkboxes).filter((cb) => cb.checked).length;
    const progress = checkboxes.length > 0 ? (checked / checkboxes.length) * 100 : 0;
    progressElement.innerText = progress.toFixed(0);
  }

  // Update progress whenever a checkbox is toggled
  checklist.addEventListener("change", updateProgress);

  // Load checklist on page load
  loadChecklist();

  // Expose functions to the global scope
  window.addItem = addItem;
  window.saveChecklist = saveChecklist;
});




    document.addEventListener("DOMContentLoaded", () => {
      const burger = document.querySelector(".burger");
      const nav = document.querySelector(".nav");
      const cta = document.querySelector(".cta");

      burger.addEventListener("click", () => {
        nav.classList.toggle("active");
        if (nav.classList.contains("active")) {
          cta.style.display = "none"; // Hide the button
        } else {
          cta.style.display = ""; // Reset to default
        }
      });
    });
