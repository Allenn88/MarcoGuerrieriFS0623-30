// link e chiave di autorizzazione
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczNTA4ZmZlMDMxZTAwMTliYTE5M2EiLCJpYXQiOjE3MDIwNTYwNzksImV4cCI6MTcwMzI2NTY3OX0.myuxC5ty_BeWfYPf5WUjL1kgnNEgGHWJAjXQ6chd2vw"; 
//creazione del prodotto
async function createProduct() {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const brand = document.getElementById("brand").value;
    const imageUrl = document.getElementById("imageUrl").value;
    const price = document.getElementById("price").value;

    if (!name || !price) {
        alert("Compila tutti i campi obbligatori");
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                name,
                description,
                brand,
                imageUrl,
                price: parseFloat(price),
            }),
        });
        if (response.ok) {
            alert("Prodotto creato con successo!");
        } else {
            console.error("Errore durante la creazione del prodotto:", response.status);
        }
    } catch (error) {
        console.error("Errore durante la richiesta di creazione del prodotto:", error);
    }
}

async function getProducts() {
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const products = await response.json();
            displayProducts(products);
            console.log(products)
        } else {
            console.error("Errore nel recupero dei prodotti:", response.status);
        }
    } catch (error) {
        console.error("Errore nel recupero dei prodotti:", error);
    }
}


function displayProducts(products) {
    const table = document.getElementById("productTable");
    table.innerHTML = "<tr><th>ID</th><th>Nome</th><th>Prezzo</th><th>Immagine</th><th>Azioni</th></tr>";

    products.forEach(product => {
        const row = table.insertRow(-1);
        row.innerHTML = `<td>${product._id}</td>
                         <td>${product.name}</td>
                         <td>${product.price}</td>
                         <td> <img src="${product.imageUrl}" width="50" height="auto"/></td>
                         <td>
                             <button onclick="openModal('${product._id}', '${product.name}', '${product.description}', '${product.price}', '${product.imageUrl}')">Modifica</button>
                             <button onclick="confirmDelete('${product._id}', '${product.name}')">Cancella</button>
                         </td>`;
    });
}

getProducts();

function openModal(productId, productName, productDescription, productPrice, productImage) {
    const editProductNameInput = document.getElementById("editProductName");
    const editProductDescriptionInput = document.getElementById("editProductDescription");
    const editProductPriceInput = document.getElementById("editProductPrice");
    const editProductImageInput = document.getElementById("editProductImage");

    editProductNameInput.value = productName;
    editProductDescriptionInput.value = productDescription;
    editProductPriceInput.value = productPrice;
    editProductImageInput.value = productImage;


    const modal = document.getElementById("modal");
    modal.dataset.productId = productId;

    // Mostra la finestra modale
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

function saveChanges() {
    const productId = document.getElementById("modal").dataset.productId;
    const newName = document.getElementById("editProductName").value;
    const newDescription = document.getElementById("editProductDescription").value;
    const newPrice = document.getElementById("editProductPrice").value;
    const newImage = document.getElementById("editProductImage").value;

    fetch(apiUrl + productId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: newName,
            description: newDescription,
            price: parseFloat(newPrice),
            imageUrl: newImage,
        }),
    }).then(response => {
        if (response.ok) {
            alert("Modifiche salvate con successo!");
            closeModal();
            getProducts(); 
        } else {
            console.error("Errore durante il salvataggio delle modifiche:", response.status);
        }
    }).catch(error => {
        console.error("Errore durante la richiesta di salvataggio delle modifiche:", error);
    });
}

function confirmDelete(productId, productName) {
    const isConfirmed = confirm(`Sei sicuro di voler cancellare il prodotto "${productName}"?`);
    if (isConfirmed) {
        deleteProduct(productId);
    }
}

async function deleteProduct(productId) {
    try {
        const response = await fetch(apiUrl + productId, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (response.ok) {
            alert("Prodotto cancellato con successo!");
            getProducts(); 
        } else {
            console.error("Errore durante la cancellazione del prodotto:", response.status);
        }
    } catch (error) {
        console.error("Errore durante la richiesta di cancellazione del prodotto:", error);
    }
}
