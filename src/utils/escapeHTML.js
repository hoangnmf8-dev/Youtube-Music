function escapeHTML(value) {
  const div = document.createElement("div");
  const text = document.createTextNode(value);
  div.append(text);
  return div.innerHTML;
}

export default escapeHTML;