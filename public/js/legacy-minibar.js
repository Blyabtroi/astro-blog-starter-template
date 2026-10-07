(function () {
	var STORAGE_KEY = "mindarts-theme";

	function currentTheme() {
		var stored = localStorage.getItem(STORAGE_KEY);
		if (stored === "day" || stored === "night") return stored;
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day";
	}

	function applyTheme(bar) {
		var theme = currentTheme();
		bar.classList.toggle("ma-minibar--night", theme === "night");
		var btn = bar.querySelector("[data-ma-theme-toggle]");
		if (btn) {
			btn.setAttribute("aria-pressed", theme === "night" ? "true" : "false");
		}
	}

	function init() {
		document.querySelectorAll("[data-ma-minibar]").forEach(function (bar) {
			applyTheme(bar);
			var btn = bar.querySelector("[data-ma-theme-toggle]");
			if (btn && !btn.dataset.maBound) {
				btn.dataset.maBound = "1";
				btn.addEventListener("click", function () {
					var next = currentTheme() === "night" ? "day" : "night";
					localStorage.setItem(STORAGE_KEY, next);
					applyTheme(bar);
				});
			}
		});
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();
