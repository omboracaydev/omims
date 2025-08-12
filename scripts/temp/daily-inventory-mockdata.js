  // Mock data array (no real values for editable inputs)
  const mockInventoryData = [
    { particular: 'Tomatoes', category: 'Vegetables', uom: 'kg', parStock: 100 },
    { particular: 'Chicken Breast', category: 'Meat', uom: 'pcs', parStock: 50 },
    { particular: 'Olive Oil', category: 'Condiments', uom: 'ltr', parStock: 20 },
    { particular: 'Rice', category: 'Grains', uom: 'kg', parStock: 200 },
    { particular: 'Cheddar Cheese', category: 'Dairy', uom: 'kg', parStock: 30 },
  ];

  function addDailyRows() {
    const tbody = document.querySelector('#inventoryTable tbody');
    tbody.innerHTML = ''; // Clear existing rows if any

    mockInventoryData.forEach(item => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td class="border border-gray-300 px-4 py-2">${item.particular}</td>
        <td class="border border-gray-300 px-4 py-2">${item.category}</td>
        <td class="border border-gray-300 px-4 py-2 text-center">${item.uom}</td>
        <td class="border border-gray-300 px-4 py-2 text-center">${item.parStock}</td>
        <td class="border border-gray-300 px-4 py-2 text-center">
          <input type="number" min="0" value="0" class="w-full h-full box-border text-center border rounded" />
        </td>
        <td class="border border-gray-300 px-4 py-2 text-center">
          <input type="number" min="0" value="0" class="w-full h-full box-border text-center border rounded" />
        </td>
        <td class="border border-gray-300 px-4 py-2 text-center total-count">${item.parStock}</td>
        <td class="border border-gray-300 px-4 py-2 text-center">
          <input type="number" min="0" value="0" class="w-full h-full box-border text-center border rounded" />
        </td>
        <td class="border border-gray-300 px-4 py-2 text-center">
          <input type="number" min="0" value="0" class="w-full h-full box-border text-center border rounded" />
        </td>
        <td class="border border-gray-300 px-4 py-2 text-center ending-count">${item.parStock}</td>
      `;
      tbody.appendChild(row);
    });
  }