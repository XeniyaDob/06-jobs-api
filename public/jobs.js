import {
  inputEnabled,
  setDiv,
  message,
  setToken,
  token,
  enableInput,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";

let jobsDiv = null;
let jobsTable = null;
let jobsTableHeader = null;

export const handleJobs = () => {
  jobsDiv = document.getElementById("jobs");
  const logoff = document.getElementById("logoff");
  const addItem = document.getElementById("add-item");
  jobsTable = document.getElementById("jobs-table");
  jobsTableHeader = document.getElementById("jobs-table-header");

  jobsDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addItem) {
        showAddEdit(null);
      } else if (e.target === logoff) {
        setToken(null);

        message.textContent = "You have been logged off.";

        jobsTable.replaceChildren([jobsTableHeader]);

        showLoginRegister();
      }
    }
  });
};

export const showItems = async () => {
  setDiv(jobsDiv);
};
