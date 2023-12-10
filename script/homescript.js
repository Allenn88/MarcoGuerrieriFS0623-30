
const productList = document.getElementById('productList')

let arrayproducts = []

class productsLine{
    constructor(_name, _description,_brand,_imageUrl,_price,_id,_userid){
        this.name = _name;
        this.description = _description;
        this.brand = _brand
        this.imageUrl = _imageUrl;
        this.price = _price;
        this.id = _id;
        this.userid = _userid;
    }
}

let borboneRosso = new productsLine(
    "Caffè Borbone",
    "Cialda Compostabile, Miscela Rossa - 150 Cialde - Sistema ESE",
    "Borbone",
    "https://m.media-amazon.com/images/I/61dY4rlS6VL.__AC_SY300_SX300_QL70_ML2_.jpg",
    20,
    "5d318e1a8541744830bef139",
    "6385f782597b9d001545386b",
    "2019-07-19T09:32:10.535Z",
    "2019-07-19T09:32:10.535Z",
    "0"
)
let toDa = new productsLine(
    "To.da caffè",
    "150 Cialde ese 44mm miscela CREMA To.da in filtrocarta",
    "To.da",
    "https://m.media-amazon.com/images/I/41tfCE9A8DL.__AC_SY300_SX300_QL70_ML2_.jpg",
    23.99,
    "5d318e1a8541744830bef139",
    "6385f782597b9d001545386b",
    "2019-07-19T09:32:10.535Z",
    "2019-07-19T09:32:10.535Z",
    "0"
)

let pop = new productsLine(
    "POP CAFFE",
    "150 CIALDE 1MISCELA ROSSA CREMOSA (CIALDE ESE 44)",
    "POP CAFFE",
    "https://m.media-amazon.com/images/I/51LiCjlBA4L.__AC_SX300_SY300_QL70_ML2_.jpg",
    23.99,
    "5d318e1a8541744830bef139",
    "6385f782597b9d001545386b",
    "2019-07-19T09:32:10.535Z",
    "2019-07-19T09:32:10.535Z",
    "0"
)

arrayproducts.push(borboneRosso, toDa, pop)
displayProducts(arrayproducts)

const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczNTA4ZmZlMDMxZTAwMTliYTE5M2EiLCJpYXQiOjE3MDIwNTYwNzksImV4cCI6MTcwMzI2NTY3OX0.myuxC5ty_BeWfYPf5WUjL1kgnNEgGHWJAjXQ6chd2vw"; 

async function getProducts() {
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Authorization": `${token}`,
            },
        });

        if (response.ok) {
            const products = await response.json();
            displayProducts(products);
        } else {
            console.error("Errore nel recupero dei prodotti:", response.status);
        }
    } catch (error) {
        console.error("Errore nel recupero dei prodotti:", error);
    }
}

function displayProducts(products) {
    const productListDiv = document.getElementById("productList");

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
        <div class="productLineList">
            <img src="${product.imageUrl}" alt="${product.name}"width="50" height="auto">
                <h3>${product.name}</h3>
                 <p>${product.description}</p>
                <p>Prezzo: ${product.price}</p>
                    <div class="conteinerbtn">
                        <button onclick="goToBackOffice()" id="scopriBtn">Scopri di piú</button>
                        <button onclick="goToBackOffice()" id="editBtn">Modifica</button>
                    </div>            
      </div>  `;

        productListDiv.appendChild(card);
    });
}

function goToBackOffice() {
    window.location.href = "../back-office.html";
}

getProducts();
