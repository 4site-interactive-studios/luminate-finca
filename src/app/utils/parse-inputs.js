export const parseInputs = input => {
  if (NodeList.prototype.isPrototypeOf(input)) {
    input.forEach(elem => checkValue(elem));
    return;
  }
  checkValue(input);
};
function checkValue(elem) {
  if (typeof elem != "object") return;
  const value = elem.value ? elem.value.trim() : null;
  const parent = elem.closest(".form-content");

  // If you can't find the parent, we don't care about this field
  if (!parent) return;

  if (value) {
    elem.classList.add("filled");
    parent.classList.add("filled");
  } else {
    elem.classList.remove("filled");
    parent.classList.remove("filled");
  }
}
