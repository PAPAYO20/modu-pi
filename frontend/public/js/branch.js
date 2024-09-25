document.addEventListener('DOMContentLoaded', (event) => {
    listBranches();
});

const url = 'http://localhost:3001/api/branch';

// Función para listar todas las sucursales
const listBranches = async () => {
    const content = document.getElementById('branchesTableBody');
    let response = '';

    try {
        const res = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        const data = await res.json();
        const branches = data; // Array de sucursales

        branches.forEach((branch) => {
            response += `<tr>
                            <td>${branch.name}</td>
                            <td>${branch.location}</td>
                            <td>${branch.manager}</td>
                            <td>${branch.phone}</td>
                            <td>${branch.email}</td>
                            <td>${branch.status}</td>
                            <td>
                                <a href='#' onclick="fillBranchForm('${branch._id}')">Editar</a> | 
                                <a href='#' onclick="deleteBranch('${branch._id}')">Eliminar</a>
                            </td>
                         </tr>`;
        });

        content.innerHTML = response;
    } catch (error) {
        console.error('Error fetching branches:', error);
    }
};

// Función para crear una nueva sucursal
const createBranch = async () => {
    const newBranch = {
        name: document.getElementById('createName').value,
        location: document.getElementById('createLocation').value,
        manager: document.getElementById('createManager').value,
        phone: document.getElementById('createPhone').value,
        email: document.getElementById('createEmail').value,
        status: document.getElementById('createStatus').value,
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(newBranch),
            headers: { "Content-Type": "application/json" }
        });
        const result = await res.json();
        alert(result.message || 'Branch created successfully');
        listBranches(); // Recargar la lista
        resetForm(); // Reiniciar el formulario después de crear
    } catch (error) {
        console.error('Error creating branch:', error);
    }
};

// Función para rellenar el formulario de edición
const fillBranchForm = async (id) => {
    try {
        const res = await fetch(`${url}/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: { "Content-Type": "application/json" }
        });
        const branch = await res.json();

        // Llenar el formulario con los datos existentes de la sucursal
        document.getElementById('createName').value = branch.name;
        document.getElementById('createLocation').value = branch.location;
        document.getElementById('createManager').value = branch.manager;
        document.getElementById('createPhone').value = branch.phone;
        document.getElementById('createEmail').value = branch.email;
        document.getElementById('createStatus').value = branch.status;

        // Cambiar la acción del botón para actualizar
        document.getElementById('submitButton').onclick = () => updateBranch(id);
        
        // Mostrar la sección de edición
        document.getElementById('formTitle').style.display = 'none';
        document.getElementById('editFormTitle').style.display = 'block';
        document.getElementById('editBranchForm').style.display = 'block';
    } catch (error) {
        console.error('Error fetching branch details:', error);
    }
};

// Función para actualizar una sucursal
const updateBranch = async (id) => {
    const updatedBranch = {
        name: document.getElementById('createName').value,
        location: document.getElementById('createLocation').value,
        manager: document.getElementById('createManager').value,
        phone: document.getElementById('createPhone').value,
        email: document.getElementById('createEmail').value,
        status: document.getElementById('createStatus').value,
    };

    try {
        const res = await fetch(`${url}/${id}`, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(updatedBranch),
            headers: { "Content-Type": "application/json" }
        });
        const result = await res.json();
        alert(result.message || 'Branch updated successfully');
        listBranches(); // Recargar la lista
        resetForm(); // Reiniciar el formulario después de actualizar
    } catch (error) {
        console.error('Error updating branch:', error);
    }
};

// Función para eliminar una sucursal
const deleteBranch = async (id) => {
    if (confirm('Are you sure you want to delete this branch?')) {
        try {
            const res = await fetch(`${url}/${id}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: { "Content-Type": "application/json" }
            });
            const result = await res.json();
            alert(result.message || 'Branch deleted successfully');
            listBranches(); // Recargar la lista
        } catch (error) {
            console.error('Error deleting branch:', error);
        }
    }
};

// Función para reiniciar el formulario
const resetForm = () => {
    document.getElementById('branchForm').reset();
    document.getElementById('submitButton').onclick = createBranch; // Reiniciar la acción del botón
};