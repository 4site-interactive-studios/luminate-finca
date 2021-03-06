import {
  disableStyle,
  freqLabels,
  writeBtn,
  amountSelect,
  isIE11
} from "./utils/custom-methods";
import { parseInputs } from "./utils/parse-inputs";
export const run = () => {
  if (window.ie11 !== undefined && isIE11) {
    window.location.replace(window.ie11);
    return;
  }

  const input = document.querySelectorAll("input[type='text'],textarea");
  const honor = document.getElementById("tribute_show_honor_fieldsname");
  const form = document.getElementById("ProcessForm");
  parseInputs(input);
  disableStyle("DonFormResponsive.css");
  disableStyle("ResponsiveBase.css");
  disableStyle("CustomStyle.css");
  disableStyle("UserGlobalStyle.css");
  // We need to COMMENT the line below before publishing
  // disableStyle("main.css");
  document.querySelector(".donation-level-user-entered input").placeholder =
    "$ Enter an amount";

  if (document.getElementById("billing_addr_country").value == "Canada") {
    document
      .getElementById("billing_addr_state")
      .getElementsByTagName("option")[0].text = "Province";
    document
      .getElementById("tribute_notify_recip_state")
      .getElementsByTagName("option")[0].text = "Recipient's Province";
  } else {
    document
      .getElementById("billing_addr_state")
      .getElementsByTagName("option")[0].text = "State";
    document
      .getElementById("tribute_notify_recip_state")
      .getElementsByTagName("option")[0].text = "Recipient's State";
  }

  document
    .getElementById("billing_addr_country")
    .getElementsByTagName("option")[0].text = "Country";
  document
    .getElementById("tribute_type")
    .getElementsByTagName("option")[0].text = "Honor Gift Type";
  document.getElementById(
    "give-in-honor-form-section-heading-wrapper"
  ).style.display = "none";

  input.forEach(function(elem) {
    elem.addEventListener("focus", evt => {
      const parent = elem.closest(".form-content");
      elem.classList.add("filled");
      parent.classList.add("filled");
    });
    elem.addEventListener("blur", evt => {
      parseInputs(elem);
    });
  });
  // Dealing with the Frequency Radio Boxes
  Array.prototype.forEach.call(
    document.querySelectorAll("input[name='freq']"),
    radio => {
      radio.addEventListener("change", () => {
        document.getElementById(radio.value).click();
        freqLabels(radio.id);
      });
    }
  );
  freqLabels(document.querySelector('input[name="freq"]:checked').id);
  Array.prototype.forEach.call(
    document.querySelectorAll("input[name='level_flexibleexpanded']"),
    radio => {
      radio.addEventListener("change", () => {
        amountSelect(radio);
      });
    }
  );
  amountSelect(
    document.querySelector('input[name="level_flexibleexpanded"]:checked')
  );
  // Other Input Field
  document
    .querySelector(".donation-level-user-entered input")
    .addEventListener("input", evt => {
      writeBtn(evt.target.value);
    });

  honor.addEventListener("change", () => {
    if (honor.checked) {
      document.getElementById(
        "give-in-honor-form-section-heading-wrapper"
      ).style.display = "block";
    } else {
      document.getElementById(
        "give-in-honor-form-section-heading-wrapper"
      ).style.display = "none";
    }
  });
  document.getElementById("finca-page-wrapper").classList.add("loaded");
  // OnSubmit Event
  form.addEventListener("submit", evt => {
    const frequency = document.querySelector('input[name="freq"]:checked').id;
    if (frequency == "month") {
      // Clear out all the values from the Honor fields
      document
        .querySelectorAll("[name^='tribute_']")
        .forEach(elem => (elem.value = ""));
    }
  });
};
