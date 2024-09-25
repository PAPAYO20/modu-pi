const url = 'http://localhost:3001/api/client';

const createClient = async () => {
    const clientName = document.getElementById('clientName').value;

    const newClient = {
        name: clientName,
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newClient),
        });

        const result = await res.json();
        alert(result.message || 'Cliente creado exitosamente');
        document.getElementById('clientForm').reset();
    } catch (error) {
        console.error('Error al crear el cliente:', error);
    }
};