function stringCorrection(text) {
  text = text.toLowerCase();
  text = text.replace(new RegExp("[ÁÀÂÃ]", "gi"), "a");
  text = text.replace(new RegExp("[ÉÈÊ]", "gi"), "e");
  text = text.replace(new RegExp("[ÍÌÎ]", "gi"), "i");
  text = text.replace(new RegExp("[ÓÒÔÕ]", "gi"), "o");
  text = text.replace(new RegExp("[ÚÙÛ]", "gi"), "u");
  text = text.replace(new RegExp("[Ç]", "gi"), "c");
  text = text.replace(/" "/, "");
  return text;
}

const string = "Projeto Anjo Da Guarda";

const accentRemove = stringCorrection(string);

const spaceRemove = accentRemove.replace(/\s/g, "");

console.log(spaceRemove);
