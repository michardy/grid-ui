/* Grid UI
 *
 * MIT License
 *
 * Copyright (c) 2018 Michael Hardy
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var grid_ui = {
	close_popover: function() {
		let pop = document.getElementById('popover');
		pop.style.display = "none";
	},
	popover: function(url) {
		let pop = document.getElementById('popover');
		pop.innerHTML = null;
		let icon_bar = document.createElement('div');
		icon_bar.className += "icon";
		let close = document.createElement('button');
		let link = document.createElement('a');
		close.textContent = '❌';
		link.textContent = '🔗';
		close.addEventListener("click", this.close_popover);
		link.href = url;
		close.className += "button";
		link.className += "button";
		icon_bar.appendChild(link);
		icon_bar.appendChild(close);
		pop.appendChild(icon_bar);
		let pop_window = document.createElement('iframe');
		pop_window.src = url;
		pop_window.className += "view";
		pop.appendChild(pop_window);
		pop.style.display = "block";
		return false;
	},
	switch_to: function(name, value) {
		let crumbs = document.getElementsByClassName('tabcrumb_' + name);
		for (let crumb of crumbs) {
			if (crumb.dataset.crumb.split(',').includes(value)) {
				if (crumb.tagName === "SPAN" || crumb.tagName === "A" || crumb.tagName === "B" || crumb.tagName === "STRONG") {
					crumb.style.display = "inline";
				} else {
					crumb.style.display = "block";
				}
			} else {
				crumb.style.display = "none";
			}
		}
	},
	tab_change: function(event) {
		grid_ui.switch_to(event.target.name, event.target.value);
	},
	init: function() {
		/* set states of tabctrls */
		for (let tabctrl of document.getElementsByClassName('fatradio-button')) {
			tabctrl.addEventListener("input", this.tab_change);
			if (tabctrl.checked) {
				this.switch_to(tabctrl.name, tabctrl.value);
			}
		}
	}
};

grid_ui.init();
