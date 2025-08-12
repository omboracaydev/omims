  function addReceivingRows() {
    const tableBody = document.getElementById("receivingTableBody");

    const mockData = [
      { particular: "Tomatoes", uom: "kg", requestQty: 50, receivedQty: 48, unitPrice: 60 },
      { particular: "Cooking Oil", uom: "L", requestQty: 20, receivedQty: 20, unitPrice: 120 },
      { particular: "Flour", uom: "kg", requestQty: 30, receivedQty: 28, unitPrice: 45 },
      { particular: "Sugar", uom: "kg", requestQty: 25, receivedQty: 26, unitPrice: 55 }
    ];

    tableBody.innerHTML = "";

    mockData.forEach(item => {
      const row = document.createElement("tr");

      // Cells: static values
      const tdParticular = `<td class="border border-gray-300 px-4 py-2">${item.particular}</td>`;
      const tdUOM = `<td class="border border-gray-300 px-4 py-2 text-center">${item.uom}</td>`;
      const tdRequestQty = `<td class="border border-gray-300 px-4 py-2 text-center">${item.requestQty}</td>`;

      // Editable Received Quantity
      const receivedQtyInput = document.createElement("input");
      receivedQtyInput.type = "number";
      receivedQtyInput.value = item.receivedQty;
      receivedQtyInput.className = "w-20 border rounded px-1 py-0.5 text-center focus:outline-none focus:ring-2 focus:ring-blue-500";

      const tdReceivedQty = document.createElement("td");
      tdReceivedQty.className = "border border-gray-300 px-4 py-2 text-center";
      tdReceivedQty.appendChild(receivedQtyInput);

      // Editable Unit Price
      const unitPriceInput = document.createElement("input");
      unitPriceInput.type = "number";
      unitPriceInput.step = "0.01";
      unitPriceInput.value = item.unitPrice;
      unitPriceInput.className = "w-24 border rounded px-1 py-0.5 text-center focus:outline-none focus:ring-2 focus:ring-blue-500";

      const tdUnitPrice = document.createElement("td");
      tdUnitPrice.className = "border border-gray-300 px-4 py-2 text-center";
      tdUnitPrice.appendChild(unitPriceInput);

      // Total Price (dynamic)
      const tdTotalPrice = document.createElement("td");
      tdTotalPrice.className = "border border-gray-300 px-4 py-2 text-center";
      tdTotalPrice.textContent = `₱${(item.unitPrice * item.receivedQty).toFixed(2)}`;

      // Status Dropdown (dynamic)
      const statusSelect = document.createElement("select");
      statusSelect.className = "border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500";
      ["Complete", "Partial", "Undelivered", "Excess"].forEach(status => {
        const option = document.createElement("option");
        option.text = status;
        statusSelect.add(option);
      });

      const tdStatus = document.createElement("td");
      tdStatus.className = "border border-gray-300 px-4 py-2 text-center";
      tdStatus.appendChild(statusSelect);

      // Function to update total price & status dynamically
      function updateRow() {
        const qty = parseFloat(receivedQtyInput.value) || 0;
        const price = parseFloat(unitPriceInput.value) || 0;

        // Update total price
        tdTotalPrice.textContent = `₱${(qty * price).toFixed(2)}`;

        // Auto-set status
        if (qty === item.requestQty) {
          statusSelect.value = "Complete";
        } else if (qty === 0) {
          statusSelect.value = "Undelivered";
        } else if (qty > item.requestQty) {
          statusSelect.value = "Excess";
        } else {
          statusSelect.value = "Partial";
        }
      }

      // Initial status set
      updateRow();

      // Event listeners for changes
      receivedQtyInput.addEventListener("input", updateRow);
      unitPriceInput.addEventListener("input", updateRow);

      // Append all cells to row
      row.innerHTML = tdParticular + tdUOM + tdRequestQty;
      row.appendChild(tdReceivedQty);
      row.appendChild(tdUnitPrice);
      row.appendChild(tdTotalPrice);
      row.appendChild(tdStatus);

      tableBody.appendChild(row);
    });
  }