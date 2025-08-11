// daily-inventory.js

function initDailyInventory() {
  const dateInput = document.getElementById('date');
  if (!dateInput) return;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;

  dateInput.value = todayStr;   // default value = today
  dateInput.max = todayStr;     // disallow future dates

  // Auto-calculation for editable table inputs
  document.querySelectorAll('#inventoryTable tbody tr').forEach(row => {
    const beginningInput = row.querySelector('td:nth-child(4) input');
    const transInInput = row.querySelector('td:nth-child(5) input');
    const endorsementInput = row.querySelector('td:nth-child(7) input');
    const spoilagesInput = row.querySelector('td:nth-child(8) input');
    const totalCountCell = row.querySelector('.total-count');
    const endingCountCell = row.querySelector('.ending-count');

    function calculate() {
      const beginning = parseInt(beginningInput.value) || 0;
      const transIn = parseInt(transInInput.value) || 0;
      const endorsement = parseInt(endorsementInput.value) || 0;
      const spoilages = parseInt(spoilagesInput.value) || 0;

      const total = beginning + transIn;
      totalCountCell.textContent = total;

      const ending = total - endorsement - spoilages;
      endingCountCell.textContent = ending >= 0 ? ending : 0;
    }

    // Attach input event listeners
    [beginningInput, transInInput, endorsementInput, spoilagesInput].forEach(input => {
      input.addEventListener('input', calculate);
    });

    // Initial calculation on load
    calculate();
  });
}

// Expose globally
window.initDailyInventory = initDailyInventory;
