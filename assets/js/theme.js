// Activity 6: dark mode.
// This file is loaded in <head> so the saved theme is applied before the page
// paints (no flash of the light theme). The theme is stored as a "dark" class
// on <html>; every dark-mode rule in style.css starts with "html.dark".
//
// Order of preference: 1) choice saved in localStorage, 2) the operating
// system's prefers-color-scheme setting, 3) light.

(function () {
  var STORAGE_KEY = "theme";

  function savedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null; // localStorage can be blocked (private mode, disabled cookies)
    }
  }

  function preferredTheme() {
    var saved = savedTheme();
    if (saved === "dark" || saved === "light") {
      return saved;
    }
    var systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return systemPrefersDark ? "dark" : "light";
  }

  function applyTheme(theme) {
    var isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);

    // The button only exists once <body> has been parsed.
    var button = document.getElementById("theme-toggle");
    if (button) {
      var icon = button.querySelector("i");
      icon.className = isDark ? "fa fa-sun-o" : "fa fa-moon-o";
      button.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      button.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  function toggleTheme() {
    var next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      // Ignore: the theme still switches for this page view.
    }
    applyTheme(next);
  }

  // 1. Apply immediately (only <html> exists at this point).
  applyTheme(preferredTheme());

  // 2. Once the DOM is ready, sync the button icon and wire up the click handler.
  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
  });
})();
