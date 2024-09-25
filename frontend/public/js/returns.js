document.addEventListener('DOMContentLoaded', async () => {
  await populateSelectFields();
  listReturns();
});

const urlProducts = 'http://localhost:3001/api/product';
const urlClients = 'http://localhost:3001/api/client';
const urlReturns = 'http://localhost:3001/api/returns';

// Function to populate select fields
const populateSelectFields = async () => {
  try {
    const [productsRes, clientsRes] = await Promise.all([
      fetch(urlProducts, { method: 'GET', headers: { "Content-Type": "application/json" } }),
      fetch(urlClients, { method: 'GET', headers: { "Content-Type": "application/json" } })
    ]);

    const products = await productsRes.json();
    const clients = await clientsRes.json();

    const productSelect = document.getElementById('productId');
    const clientSelect = document.getElementById('clientId');

    products.forEach(product => {
      const option = document.createElement('option');
      option.value = product.id;
      option.textContent = product.name;
      productSelect.appendChild(option);
    });

    clients.forEach(client => {
      const option = document.createElement('option');
      option.value = client.id;
      option.textContent = client.name;
      clientSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error populating select fields:', error);
  }
};

// Function to list all returns
const listReturns = async () => {
  const content = document.getElementById('returnsTableBody');
  let response = '';

  try {
    const res = await fetch(urlReturns, {
      method: 'GET',
      mode: 'cors',
      headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    const data = await res.json();
    const returns = data;

    returns.forEach((returnItem) => {
      response += `<tr>
                      <td>${returnItem.product.name}</td>
                      <td>${returnItem.client.name}</td>
                      <td>${returnItem.reason}</td>
                      <td>${returnItem.quantity}</td>
                      <td>${new Date(returnItem.returnDate).toLocaleString()}</td>
                      <td>
                          <a href='#' onclick="fillReturnForm('${returnItem.id}')">Edit</a> | 
                          <a href='#' onclick="deleteReturn('${returnItem.id}')">Delete</a>
                      </td>
                   </tr>`;
    });

    content.innerHTML = response;
  } catch (error) {
    console.error('Error fetching returns:', error);
  }
};

// Function to create a new return
const createReturn = async () => {
  const newReturn = {
    productId: parseInt(document.getElementById('productId').value, 10),
    clientId: parseInt(document.getElementById('clientId').value, 10),
    reason: document.getElementById('reason').value,
    quantity: parseInt(document.getElementById('quantity').value, 10),
    returnDate: new Date(document.getElementById('returnDate').value).toISOString(),
  };

  try {
    const res = await fetch(urlReturns, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(newReturn),
      headers: { "Content-Type": "application/json" }
    });
    const result = await res.json();
    alert(result.message || 'Return created successfully');
    listReturns();
    resetForm();
  } catch (error) {
    console.error('Error creating return:', error);
  }
};

// Function to fill the form for editing
const fillReturnForm = async (id) => {
  try {
    const res = await fetch(`${urlReturns}/${id}`, {
      method: 'GET',
      mode: 'cors',
      headers: { "Content-Type": "application/json" }
    });
    const returnItem = await res.json();

    document.getElementById('productId').value = returnItem.productId;
    document.getElementById('clientId').value = returnItem.clientId;
    document.getElementById('reason').value = returnItem.reason;
    document.getElementById('quantity').value = returnItem.quantity;

    // Format the returnDate to "yyyy-MM-ddThh:mm"
    const returnDate = new Date(returnItem.returnDate);
    const formattedDate = returnDate.toISOString().slice(0, 16);
    document.getElementById('returnDate').value = formattedDate;

    document.getElementById('submitButton').onclick = () => updateReturn(id);
  } catch (error) {
    console.error('Error fetching return details:', error);
  }
};

// Function to update a return
const updateReturn = async (id) => {
  const updatedReturn = {
    productId: parseInt(document.getElementById('productId').value, 10),
    clientId: parseInt(document.getElementById('clientId').value, 10),
    reason: document.getElementById('reason').value,
    quantity: parseInt(document.getElementById('quantity').value, 10),
    returnDate: new Date(document.getElementById('returnDate').value).toISOString(),
  };

  try {
    const res = await fetch(`${urlReturns}/${id}`, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(updatedReturn),
      headers: { "Content-Type": "application/json" }
    });
    const result = await res.json();
    alert(result.message || 'Return updated successfully');
    listReturns();
    resetForm();
  } catch (error) {
    console.error('Error updating return:', error);
  }
};

// Function to delete a return
const deleteReturn = async (id) => {
  if (confirm('Are you sure you want to delete this return?')) {
    try {
      const res = await fetch(`${urlReturns}/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: { "Content-Type": "application/json" }
      });
      const result = await res.json();
      alert(result.message || 'Return deleted successfully');
      listReturns();
    } catch (error) {
      console.error('Error deleting return:', error);
    }
  }
};

// Function to reset the form
const resetForm = () => {
  document.getElementById('returnForm').reset();
  document.getElementById('submitButton').onclick = createReturn;
};