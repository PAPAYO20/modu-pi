const url = 'http://localhost:3001/api/product';

const createProduct = async () => {
    const productName = document.getElementById('productName').value;

    const newProduct = {
        name: productName,
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();
        alert(result.message || 'Producto creado exitosamente');
        document.getElementById('productForm').reset();
    } catch (error) {
        console.error('Error al crear el producto:', error);
    }
};