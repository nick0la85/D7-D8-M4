const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgwZGQwZWQyYWRhNDAwMTQzYzFmYTAiLCJpYXQiOjE2ODYyNTkwOTAsImV4cCI6MTY4NzQ2ODY5MH0._Xb0RrucLe3yX_MIwuRxDaKAGerDwfmw7124le-8Chc"

async function getPosts() {
    const res = await fetch(apiUrl, {
        headers: {
            "Authorization": `Bearer ${apiKey}`
        }
    });

    const json = await res.json();
    console.log(json)

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""; // Rimuovi eventuali card precedenti

    json.forEach((element) => {
        const card = createCard(element);
        cardContainer.appendChild(card);
    });
}
getPosts()

function createCard(post) {

   
    const card = document.createElement("div");
    card.classList.add("card", "rounded", "bg-light", "col-sm-3", "mb-3", "mx-1");
    card.style.width = "18rem";

    const image = document.createElement("img");
    image.classList.add("card-img-top");
    image.src = post.imageUrl;
    card.appendChild(image);

    const link = document.createElement("a");
    link.href = `product.html?id=${post._id}`; // Aggiungi l'id come query string nell'URL
  
    // Aggiungi l'evento click alla card
    card.addEventListener("click", function() {
      window.location.href = link.href; // Reindirizza l'utente alla pagina prodotto
    });
    card.appendChild(link);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = post.name;
    cardBody.appendChild(title);

    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent = post.description;
    cardBody.appendChild(description);

    const brand = document.createElement("p");
    brand.classList.add("card-text");
    brand.textContent = "Brand: " + post.brand;
    cardBody.appendChild(brand);

    const price = document.createElement("p");
    price.classList.add("card-text");
    price.textContent = "Prezzo: " + post.price + "€";
    cardBody.appendChild(price);

    return card;
}
createCard()