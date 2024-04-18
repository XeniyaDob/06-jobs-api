import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showItems } from "./jobs.js";

let addEditDiv = null;
let plantName = null;
let price = null;
let status = null;
let addingItem = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-job");
  plantName = document.getElementById("plant");
  price = document.getElementById("price");
  status = document.getElementById("status");
  addingItem = document.getElementById("adding-item");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingItem) {
        enableInput(false);

        let method = "POST";
        let url = "/api/v1/items";
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
          if (response.status === 201) {
            // 201 indicates a successful create
            message.textContent = "The plant item was created.";
            (plantName.value = ""),
              (price.value = ""),
              (description.value = ""),
              (type.value = "others");
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

export const showAddEdit = (job) => {
  message.textContent = "";
  setDiv(addEditDiv);
};
