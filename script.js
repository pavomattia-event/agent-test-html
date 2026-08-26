const COOKIE_KEY = "todos";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const hostInfo = document.getElementById("host-info");

let todos = loadTodos();
renderHost();
render();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  todos.push({
    id: generateId(),
    text,
    done: false,
  });
  saveTodos();
  render();
  input.value = "";
  input.focus();
});

function loadTodos() {
  try {
    const saved = getCookie(COOKIE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  const value = encodeURIComponent(JSON.stringify(todos));
  document.cookie = `${COOKIE_KEY}=${value}; max-age=${COOKIE_MAX_AGE}; path=/; samesite=lax`;
}

function generateId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function render() {
  list.innerHTML = "";

  todos.forEach((todo) => {
    const item = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => {
      todo.done = checkbox.checked;
      saveTodos();
      render();
    });

    const text = document.createElement("span");
    text.textContent = todo.text;
    if (todo.done) text.classList.add("done");

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Delete";
    removeButton.addEventListener("click", () => {
      todos = todos.filter((value) => value.id !== todo.id);
      saveTodos();
      render();
    });

    item.append(checkbox, text, removeButton);
    list.appendChild(item);
  });
}

function getCookie(name) {
  const prefix = `${name}=`;
  const entry = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));

  if (!entry) return "";
  return decodeURIComponent(entry.slice(prefix.length));
}

function renderHost() {
  if (!hostInfo) return;
  hostInfo.textContent = `Host: ${window.location.host || "local file"}`;
}
