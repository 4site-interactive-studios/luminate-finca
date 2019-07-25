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
  for (let i = 0; i < radios.length - 1; i++) {
    let box = radios[i].getElementsByClassName(
      "donation-level-label-container"
    )[0];
    if (freq == "month") {
      box.innerHTML = box.textContent + " <span>/mo</span>";
    } else {
      let span = box.getElementsByTagName("span")[0];
      if (span) span.remove();
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
  // Remove the .selected from all
  for (let i = 0; i < radios.length; i++) {
    radios[i].classList.remove("selected");
  }
  amount.click();
  parent.classList.add("selected");
  const value = parent.querySelectorAll(".donation-level-label-container")[0];
  const span = value.getElementsByTagName("span")[0];
  const button = document.getElementById("pstep_finish");
  if (!span) {
    button.textContent = "Give " + value.textContent;
  } else {
    button.innerHTML = "Give " + value.innerHTML + " Monthly";
  }
};
