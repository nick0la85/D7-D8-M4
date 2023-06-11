const urlParams = new URLSearchParams(window.location.search);


// Ottenere il valore dell'id dalla query string
const productId = urlParams.get('id');
console.log(productId)


function createProductCard() {
    console.log(productId)
    const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
    const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgwZGQwZWQyYWRhNDAwMTQzYzFmYTAiLCJpYXQiOjE2ODYyNTkwOTAsImV4cCI6MTY4NzQ2ODY5MH0._Xb0RrucLe3yX_MIwuRxDaKAGerDwfmw7124le-8Chc";
    const productContainer = document.getElementById("product-container");

    // Recupera i dettagli del prodotto dall'API utilizzando l'ID
    async function getProductDetails() {
        console.log(productId)
        try {
            const res = await fetch(apiUrl +productId, {
                headers: {
                    "Authorization": `Bearer ${apiKey}`
                }
            });
            const product = await res.json();
            return product;
            
        } catch (error) {
            console.error("Errore durante il recupero dei dettagli del prodotto:", error);
        }
    }

    // Crea la card del prodotto utilizzando i dettagli recuperati
    async function renderProductCard() {
        const product = await getProductDetails();

        if (product) {
            // Costruisci la struttura HTML della card del prodotto
            const cardContainer = document.createElement("div");
            cardContainer.classList.add("card");
            cardContainer.style.width = "18rem";

            const imageElement = document.createElement("img");
            imageElement.classList.add("card-img-top");
            imageElement.src = product.imageUrl;
            imageElement.alt = product.name;

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const titleElement = document.createElement("h5");
            titleElement.classList.add("card-title");
            titleElement.textContent = product.name;

            const brandElement = document.createElement("p");
            brandElement.classList.add("card-text");
            brandElement.textContent = "Brand: " + product.brand;

            const priceElement = document.createElement("p");
            priceElement.classList.add("card-text");
            priceElement.textContent = "Price: €" + product.price;

            const descriptionElement = document.createElement("p");
            descriptionElement.classList.add("card-text");
            descriptionElement.textContent = product.description;

            // Aggiungi gli elementi alla card
            cardBody.appendChild(titleElement);
            cardBody.appendChild(brandElement);
            cardBody.appendChild(priceElement);
            cardBody.appendChild(descriptionElement);

            cardContainer.appendChild(imageElement);
            cardContainer.appendChild(cardBody);

            // Aggiungi la card al contenitore
            productContainer.appendChild(cardContainer);
        }
    }

    // Invoca la funzione per creare la card del prodotto
    renderProductCard();
}
createProductCard()
