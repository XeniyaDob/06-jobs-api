import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showItems } from "./jobs.js";

let addEditDiv = null;
let plantName = null;
let price = null;
let description = null;
let type = null;
let addingItem = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-item");
  plantName = document.getElementById("plant");
  price = document.getElementById("price");
  description = document.getElementById("description");
  type = document.getElementById("type");
  addingItem = document.getElementById("adding-item");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingItem) {
        enableInput(false);

        let method = "POST";
        let url = "/api/v1/items";
        if (addingItem.textContent === "update") {
          method = "PATCH";
          url = `/api/v1/items/${addEditDiv.dataset.id}`;
        }
        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: plantName.value,
              price: price.value,
              description: description.value,
              type: type.value,
            }),
          });

          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
            if (response.status === 200) {
              // a 200 is expected for a successful update
              message.textContent = "The plant entry was updated.";
            } else {
              // a 201 is expected for a successful create
              message.textContent = "The plant entry was created.";
            }
            plantName.value = "";
            price.value = "";
            description.value = "";
            type.value = "others";
            showItems();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }

        enableInput(true);
      } else if (e.target === editCancel) {
        message.textContent = "";
        showItems();
      }
    }
  });
};

export const showAddEdit = async (itemId) => {
  if (!itemId) {
    plantName.value = "";
    price.value = "";
    description.value = "";
    type.value = "others";
    addingItem.textContent = "add";
    message.textContent = "";

    setDiv(addEditDiv);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/items/${itemId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        plant.value = data.item.name;
        price.value = data.item.price;
        description.value = data.item.description;
        type.value = data.item.type;
        addingItem.textContent = "update";
        message.textContent = "";
        addEditDiv.dataset.id = itemId;

        setDiv(addEditDiv);
      } else {
        // might happen if the list has been updated since last display
        message.textContent = "The plant entry was not found";
        showItems();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showItems();
    }

    enableInput(true);
  }
};

export const showDelete = async (itemId) => {
  enableInput(false);
  try {
    const response = await fetch(`/api/v1/items/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      addingItem.textContent = "delete";
      message.textContent = data.msg;
      showItems();
    } else {
      // might happen if the list has been updated since last display
      message.textContent = "The plant entry was not found";
      showItems();
    }
  } catch (err) {
    console.log(err);
    message.textContent = "A communications error has occurred.";
    showItems();
  }
  enableInput(true);
};