export const disableStyle = styleName => {
  const styles = document.styleSheets;
  let href = "";
  for (let i = 0; i < styles.length; i++) {
    if (!styles[i].href) {
      continue;
    }
    href = styles[i].href.split("/");
    href = href[href.length - 1];
    if (href === styleName) {
      styles[i].disabled = true;
      break;
    }
  }
};

export const freqLabels = freq => {
  const radios = document.querySelectorAll(
    ".donation-levels div.donation-level-container"
  );
  const month_label = document.querySelectorAll(".month-label");
  const honor = document.querySelector(
    'label[for="tribute_show_honor_fieldsname"]'
  );
  for (let i = 0; i < radios.length - 1; i++) {
    let box = radios[i].getElementsByClassName(
      "donation-level-label-container"
    )[0];
    if (freq == "month") {
      box.innerHTML = box.textContent + " <span>/mo</span>";
      month_label.forEach(elem => (elem.style.display = "inline"));
      if (honor) {
        if (document.getElementById("tribute_show_honor_fieldsname").checked) {
          honor.click();
        }
        honor.style.display = "none";
      }
    } else {
      let span = box.getElementsByTagName("span")[0];
      if (span) span.remove();
      month_label.forEach(elem => (elem.style.display = "none"));
      if (honor) {
        honor.style.display = "block";
      }
    }
  }
  amountSelect(
    document.querySelector('input[name="level_flexibleexpanded"]:checked')
  );
};

export const amountSelect = amount => {
  const parent = amount.closest(".form-content");
  const radios = document.querySelectorAll(
    ".donation-levels div.donation-level-container .form-content"
  );
  const isMonth = document.getElementById("month").checked;
  // Remove the .selected from all
  for (let i = 0; i < radios.length; i++) {
    radios[i].classList.remove("selected");
  }
  // If the selected item is not OTHER, clear OTHER
  if (!parent.querySelector(".donation-level-user-entered")) {
    // Clear the OTHER input
    document.querySelector(".donation-level-user-entered input").value = "";
    document.querySelector(".donation-level-user-entered input").className = "";
  }
  amount.click();
  parent.classList.add("selected");
  let val = parent
    .querySelectorAll(".donation-level-label-container")[0]
    .textContent.match(/\d+/);
  const button = document.getElementById("pstep_finish");
  if (!val) {
    val = document.querySelector(".donation-level-user-entered input").value;
  } else {
    val = val[0];
  }
  if (!isMonth) {
    button.textContent = "Give $" + parseFloat(val);
  } else {
    button.innerHTML = "Give $" + parseFloat(val) + " Monthly";
  }
};

export const writeBtn = value => {
  const isMonth = document.getElementById("month").checked;
  const button = document.getElementById("pstep_finish");
  if (!isMonth) {
    button.textContent = "Give $" + parseFloat(value);
  } else {
    button.innerHTML = "Give $" + parseFloat(value) + " Monthly";
  }
};
