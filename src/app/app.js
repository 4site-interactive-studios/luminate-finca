import { disableStyle, freqLabels, amountSelect } from "./utils/custom-methods";
import { parseInputs } from "./utils/parse-inputs";
export const run = () => {
  const input = document.querySelectorAll("input[type='text'],textarea");
  const honor = document.getElementById("tribute_show_honor_fieldsname");
  parseInputs(input);
  disableStyle("DonFormResponsive.css");
  disableStyle("ResponsiveBase.css");
  disableStyle("CustomStyle.css");
  disableStyle("UserGlobalStyle.css");
  // We need to COMMENT the line below before publishing
  // disableStyle("main.css");
  document.querySelector(".donation-level-user-entered input").placeholder =
    "$ Enter an amount";

  document
    .getElementById("billing_addr_state")
    .getElementsByTagName("option")[0].text = "State";
  document
    .getElementById("billing_addr_country")
    .getElementsByTagName("option")[0].text = "Country";
  document
    .getElementById("tribute_type")
    .getElementsByTagName("option")[0].text = "Honor Gift Type";
  document
    .getElementById("tribute_notify_recip_state")
    .getElementsByTagName("option")[0].text = "Recipient's State";
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
};
