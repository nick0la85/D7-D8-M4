const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDgwZGQwZWQyYWRhNDAwMTQzYzFmYTAiLCJpYXQiOjE2ODYyNTkwOTAsImV4cCI6MTY4NzQ2ODY5MH0._Xb0RrucLe3yX_MIwuRxDaKAGerDwfmw7124le-8Chc"

window.onload = getPosts();


// Recupero la lista di tutti i posts:
async function getPosts() {
  const res = await fetch(apiUrl, {
    headers: {
      "Authorization": `Bearer ${apiKey}`
    }
  });
  const json = await res.json();
  console.log(json)
  const tableBody = document.querySelector("#posts-table tbody");
  tableBody.innerHTML = ""; // Rimuovi i vecchi dati dalla tabella


  json.forEach((element) => {
    const row = document.createElement("tr");

    // Aggiungi i dati del post come celle nella riga
    const nameCell = document.createElement("td");
    nameCell.textContent = element.name;
    row.appendChild(nameCell);

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = element.description;
    row.appendChild(descriptionCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = element.price;
    row.appendChild(priceCell);

    const brandCell = document.createElement("td");
    brandCell.textContent = element.brand;
    row.appendChild(brandCell);

    const photoCell = document.createElement("td");
    photoCell.textContent = element.imageUrl;
    row.appendChild(photoCell)


    const actionsCell = document.createElement("td");

    // Aggiungi pulsante per modificare
    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-primary");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      openEditModal(element);
    });
    actionsCell.appendChild(editButton);

    // Aggiungi pulsante per eliminare
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deletePost(element);
    });
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    tableBody.appendChild(row);
  });
}

async function addNewPost() {
  const nameInput = document.getElementById("input-name");
  const descriptionInput = document.getElementById("input-description");
  const priceInput = document.getElementById("input-price");
  const brandInput = document.getElementById("input-brand");
  const photoInput = document.getElementById("input-photo");

  const name = nameInput.value;
  const description = descriptionInput.value;
  const price = priceInput.value;
  const brand = brandInput.value;
  const photo = photoInput.value;

  if (name && description && price && brand && photo) {
    const payload = {
      "name": name,
      "description": description,
      "price": price,
      "brand": brand,
      "imageUrl": photo,
      "time": new Date()
    };

    const createResult = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      }
    });
    const postIdInput = document.getElementById("input-post-id");
    postIdInput.value = createResult.id;

    // Recupero la lista aggiornata dei posts dopo una create: 
    getPosts();

    // Resetta i valori degli input
    nameInput.value = "";
    descriptionInput.value = "";
    priceInput.value = "";
    brandInput.value = "";
    photoInput.value = "";
  } else {
    console.log("errore")
  }
}

const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", addNewPost);


async function deletePost(post) {
  const confirmDelete = confirm("Are you sure you want to delete this post?");
  if (confirmDelete) {
    await fetch(apiUrl + "/" + post._id, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${apiKey}`
      }
    });

    getPosts();
  }
}


function openEditModal(post) {
  const editModal = document.getElementById("edit-modal");
  const nameInput = document.getElementById("edit-name");
  const descriptionInput = document.getElementById("edit-description");
  const priceInput = document.getElementById("edit-price");
  const brandInput = document.getElementById("edit-brand");
  const photoInput = document.getElementById("edit-photo");
  const saveBtn = document.getElementById("save-btn");
  const cancelBtn = document.getElementById("cancel-btn");

  nameInput.value = post.name;
  descriptionInput.value = post.description;
  priceInput.value = post.price;
  brandInput.value = post.brand;
  photoInput.value = post.imageUrl;

  // Aggiungi evento click al pulsante "Save" per salvare le modifiche
  saveBtn.addEventListener("click", () => {
    saveEditedPost(post);
    editModal.style.display = "none";
  });

  // Aggiungi evento click al pulsante "Cancel" per chiudere il modale senza salvare le modifiche
  cancelBtn.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  editModal.style.display = "block";

}

async function saveEditedPost(post) {
  const nameInput = document.getElementById("edit-name");
  const descriptionInput = document.getElementById("edit-description");
  const priceInput = document.getElementById("edit-price");
  const brandInput = document.getElementById("edit-brand");
  const photoInput = document.getElementById("edit-photo");

  const name = nameInput.value;
  const description = descriptionInput.value;
  const price = priceInput.value;
  const brand = brandInput.value;
  const photo = photoInput.value;

  if (name && description && price && brand && photo) {
    const payload = {
      "_id": post._id,
      "name": name,
      "description": description,
      "price": price,
      "brand": brand,
      "imageUrl": photo,
      "time": new Date()
    };

    const updateResult = await fetch(apiUrl + "/" + post._id, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      }
    });

    getPosts();

    const editModal = document.getElementById("edit-modal");
    editModal.style.display = "none";

    // Resetta i valori degli input del modale
    nameInput.value = "";
    descriptionInput.value = "";
    priceInput.value = "";
    brandInput.value = "";
    photoInput.value = "";
    location.reload(); // ricarica la pagina
  } else {
    console.log("errore")
  }
}

