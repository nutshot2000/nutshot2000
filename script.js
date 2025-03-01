const categories = {
    length: {
        type: "ratio",
        base: "Meters",
        units: {
            Meters: 1,
            Kilometers: 0.001,
            Centimeters: 100,
            Millimeters: 1000,
            Micrometers: 1000000,
            Nanometers: 1000000000,
            Inches: 39.37007874015748,
            Feet: 3.280839895013123,
            Yards: 1.0936132983377078,
            Miles: 0.000621371192237334,
            "Nautical Miles": 0.0005399568034557235,
            "Light Years": 1.0570008340246154e-16,
            "Astronomical Units": 6.6845871226706e-12
        }
    },
    weight: {
        type: "ratio",
        base: "Kilograms",
        units: {
            Kilograms: 1,
            Grams: 1000,
            Milligrams: 1000000,
            Micrograms: 1000000000,
            "Metric Tons": 0.001,
            Pounds: 2.2046226218487757,
            Ounces: 35.27396194958041,
            Stones: 0.1574730444177697,
            "Long Tons": 0.0009842065276110606,
            "Short Tons": 0.0011023113109243879,
            Carats: 5000
        }
    },
    temperature: {
        type: "function",
        base: "Celsius",
        units: {
            Celsius: { toBase: v => v, fromBase: v => v },
            Fahrenheit: { toBase: v => (v - 32) * 5 / 9, fromBase: v => v * 9 / 5 + 32 },
            Kelvin: { toBase: v => v - 273.15, fromBase: v => v + 273.15 },
            Rankine: { toBase: v => (v - 491.67) * 5 / 9, fromBase: v => (v * 9 / 5) + 491.67 }
        }
    },
    volume: {
        type: "ratio",
        base: "Liters",
        units: {
            Liters: 1,
            Milliliters: 1000,
            "Cubic Meters": 0.001,
            "Cubic Centimeters": 1000,
            "Cubic Feet": 0.03531466672148859,
            "Cubic Inches": 61.02374409473228,
            "US Gallons": 0.2641720523581484,
            "UK Gallons": 0.21996924829908776,
            "US Quarts": 1.05668820943259,
            "UK Quarts": 0.879876993196351,
            "US Pints": 2.11337641886519,
            "UK Pints": 1.7597539863927,
            "US Cups": 4.22675283773037,
            "US Fluid Ounces": 33.814022701843,
            "UK Fluid Ounces": 35.195079727854
        }
    },
    area: {
        type: "ratio",
        base: "Square Meters",
        units: {
            "Square Meters": 1,
            "Square Kilometers": 0.000001,
            "Square Centimeters": 10000,
            "Square Millimeters": 1000000,
            "Square Feet": 10.763910416709722,
            "Square Yards": 1.1959900463010803,
            "Square Miles": 3.8610215854244577e-7,
            Acres: 0.0002471053814671653,
            Hectares: 0.0001,
            "Square Inches": 1550.0031000062
        }
    },
    speed: {
        type: "ratio",
        base: "Meters per Second",
        units: {
            "Meters per Second": 1,
            "Kilometers per Hour": 3.6,
            "Miles per Hour": 2.2369362920544025,
            Knots: 1.9438444924406045,
            "Feet per Second": 3.280839895013123,
            Mach: 0.002938669957614793
        }
    },
    time: {
        type: "ratio",
        base: "Seconds",
        units: {
            Seconds: 1,
            Milliseconds: 1000,
            Minutes: 1/60,
            Hours: 1/3600,
            Days: 1/86400,
            Weeks: 1/604800,
            Years: 1/31536000,
            Decades: 1/315360000,
            Centuries: 1/3153600000
        }
    },
    energy: {
        type: "ratio",
        base: "Joules",
        units: {
            Joules: 1,
            Kilojoules: 0.001,
            Megajoules: 0.000001,
            Gigajoules: 1e-9,
            Calories: 0.23884589662749595,
            Kilocalories: 0.00023884589662749595,
            "Watt Hours": 0.0002777777777777778,
            "Kilowatt Hours": 2.777777777777778e-7,
            "British Thermal Units": 0.000947817120313317,
            Electronvolts: 6.24150907446076e18
        }
    },
    pressure: {
        type: "ratio",
        base: "Pascals",
        units: {
            Pascals: 1,
            Kilopascals: 0.001,
            Megapascals: 0.000001,
            Atmospheres: 9.869232667160128e-6,
            Bars: 0.00001,
            "Pounds per Square Inch": 0.00014503773800721815,
            "Millimeters of Mercury": 0.0075006168270417,
            "Inches of Mercury": 0.00029529983071445
        }
    },
    power: {
        type: "ratio",
        base: "Watts",
        units: {
            Watts: 1,
            Kilowatts: 0.001,
            Megawatts: 0.000001,
            Horsepower: 0.0013410220895958783,
            "British Horsepower": 0.0010138696667028196,
            "Foot-Pounds per Second": 0.7375621492772654
        }
    },
    storage: {  // New "Storage" category
        type: "ratio",
        base: "Bytes",
        units: {
            Bytes: 1,
            Kilobytes: 1024,           // 2^10 Bytes
            Megabytes: 1048576,        // 2^20 Bytes
            Gigabytes: 1073741824,     // 2^30 Bytes
            Terabytes: 1099511627776,  // 2^40 Bytes
            Petabytes: 1125899906842624, // 2^50 Bytes
            Exabytes: 1152921504606846976 // 2^60 Bytes
        }
    }
};

const categorySelect = document.getElementById("category"),
    fromSelect = document.getElementById("from-unit"),
    toSelect = document.getElementById("to-unit"),
    inputValue = document.getElementById("input-value"),
    resultField = document.getElementById("result"),
    swapBtn = document.querySelector(".swap-btn"),
    convertBtn = document.getElementById("convert-btn"),
    resetBtn = document.getElementById("reset-btn"),
    copyBtn = document.getElementById("copy-btn"),
    bookmarkBtn = document.querySelector(".bookmark-btn"),
    shareBtn = document.querySelector(".share-btn"),
    recentList = document.getElementById("recent-list"),
    modal = document.getElementById("modal"),
    modalBody = document.getElementById("modal-body"),
    closeBtn = document.querySelector(".close-btn"),
    themeToggle = document.getElementById("theme-toggle");

let recentConversions = [];

function populateCategories() {
    categorySelect.innerHTML = '<option value="">Select Category</option>';
    Object.keys(categories).forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        categorySelect.appendChild(option);
    });
}

function populateUnits(category) {
    fromSelect.innerHTML = '<option value="">From</option>';
    toSelect.innerHTML = '<option value="">To</option>';
    if (!category || !categories[category]) return;
    const units = Object.keys(categories[category].units);
    units.forEach(unit => {
        const fromOption = document.createElement("option");
        fromOption.value = unit;
        fromOption.textContent = unit;
        fromSelect.appendChild(fromOption);
        const toOption = document.createElement("option");
        toOption.value = unit;
        toOption.textContent = unit;
        toSelect.appendChild(toOption);
    });
    fromSelect.value = units[0] || "";
    toSelect.value = units[1] || units[0] || "";
}

function convert(category, fromUnit, toUnit, value) {
    if (!categories[category] || !categories[category].units[fromUnit] || !categories[category].units[toUnit]) {
        return NaN;
    }
    const cat = categories[category];
    let result;
    if (cat.type === "ratio") {
        const fromFactor = cat.units[fromUnit] || 1;
        const toFactor = cat.units[toUnit] || 1;
        if (fromFactor === 0 || toFactor === 0) {
            return NaN;
        }
        result = (value * toFactor) / fromFactor;
    } else if (cat.type === "function") {
        const toBase = cat.units[fromUnit]?.toBase || (v => v);
        const fromBase = cat.units[toUnit]?.fromBase || (v => v);
        result = fromBase(toBase(value));
    }
    return isNaN(result) || !isFinite(result) ? NaN : result;
}

function formatResult(value) {
    if (isNaN(value) || value === null || value === undefined || !isFinite(value)) return "0";
    const num = Number(value);
    const formatted = num.toFixed(10).replace(/\.?0+$/, "");
    return formatted || "0";
}

categorySelect.addEventListener("change", () => {
    populateUnits(categorySelect.value);
    resultField.value = "";
});

swapBtn.addEventListener("click", () => {
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value || "";
    toSelect.value = temp || "";
});

convertBtn.addEventListener("click", () => {
    const category = categorySelect.value,
        fromUnit = fromSelect.value,
        toUnit = toSelect.value,
        value = parseFloat(inputValue.value) || 0;
    if (!category) {
        resultField.value = "Please select a category";
        return;
    }
    if (!fromUnit || !toUnit) {
        resultField.value = "Please select both units";
        return;
    }
    if (isNaN(value) || value === 0) {
        resultField.value = "Please enter a valid non-zero number";
        return;
    }
    const result = convert(category, fromUnit, toUnit, value);
    if (isNaN(result) || result === 0) {
        resultField.value = "Invalid conversion or zero result";
        return;
    }
    const formattedResult = formatResult(result);
    resultField.value = formattedResult;
    const conversionStr = `${value} ${fromUnit} = ${formattedResult} ${toUnit}`;
    addRecentConversion(conversionStr);
});

resetBtn.addEventListener("click", () => {
    inputValue.value = "";
    resultField.value = "";
    categorySelect.value = "";
    fromSelect.value = "";
    toSelect.value = "";
    populateUnits("");
});

copyBtn.addEventListener("click", () => {
    if (resultField.value) {
        navigator.clipboard.writeText(resultField.value).then(() => {
            alert("Result copied!");
        }).catch(() => {
            alert("Failed to copy.");
        });
    }
});

// Theme Toggle Functionality
let isDarkMode = localStorage.getItem('darkMode') === 'true';
document.body.classList.toggle('dark-mode', isDarkMode);

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
    themeToggle.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Initialize theme button text
themeToggle.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';

// Bookmark Functionality
bookmarkBtn.addEventListener('click', () => {
    if (window.sidebar && window.sidebar.addPanel) { // Firefox
        window.sidebar.addPanel(document.title, window.location.href, '');
    } else if (window.external && ('AddFavorite' in window.external)) { // IE
        window.external.AddFavorite(window.location.href, document.title);
    } else { // Chrome, Safari, etc.
        showMessageModal('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
    }
});

// Share Functionality
shareBtn.addEventListener('click', () => {
    const currentConversion = `${inputValue.value} ${fromSelect.value} = ${resultField.value} ${toSelect.value}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Unit Converter Elite',
            text: currentConversion,
            url: window.location.href
        }).catch(err => {
            showShareModal(currentConversion);
        });
    } else {
        showShareModal(currentConversion);
    }
});

// Modal Close Button
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Show Message Modal Function
function showMessageModal(message) {
    modalBody.innerHTML = `<p>${message}</p>`;
    modal.style.display = 'block';
}

// Show Share Modal Function
function showShareModal(shareText) {
    modalBody.innerHTML = `
        <h3>Share this conversion</h3>
        <p>${shareText}</p>
        <button onclick="navigator.clipboard.writeText('${shareText}').then(() => showMessageModal('Copied to clipboard!'))">
            Copy to Clipboard
        </button>
    `;
    modal.style.display = 'block';
}

function addRecentConversion(str) {
    recentConversions.unshift(str);
    if (recentConversions.length > 10) recentConversions.pop();
    updateRecentList();
}

function updateRecentList() {
    recentList.innerHTML = "";
    recentConversions.forEach(conv => {
        const div = document.createElement("div");
        div.textContent = conv;
        div.classList.add("recent-item");
        recentList.appendChild(div);
    });
}

// Handle Popular Conversion Links
document.querySelector('.conversion-links').addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.tagName === 'A') {
        const fromUnit = e.target.getAttribute('data-from');
        const toUnit = e.target.getAttribute('data-to');
        
        // Find the appropriate category based on the units
        let selectedCategory = '';
        for (const [category, data] of Object.entries(categories)) {
            if (data.units.hasOwnProperty(fromUnit.charAt(0).toUpperCase() + fromUnit.slice(1)) && 
                data.units.hasOwnProperty(toUnit.charAt(0).toUpperCase() + toUnit.slice(1))) {
                selectedCategory = category;
                break;
            }
        }

        if (selectedCategory) {
            // Set the category
            categorySelect.value = selectedCategory;
            populateUnits(selectedCategory);

            // Set the units (capitalize first letter to match the units object)
            fromSelect.value = fromUnit.charAt(0).toUpperCase() + fromUnit.slice(1);
            toSelect.value = toUnit.charAt(0).toUpperCase() + toUnit.slice(1);

            // Focus on the input field
            inputValue.focus();

            // Scroll to the converter section
            document.querySelector('.converter').scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Handle Popular Tools Links in Footer
document.querySelector('.footer-section').addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').includes('#')) {
        e.preventDefault();
        const category = e.target.getAttribute('href').split('#')[1];
        
        if (categories.hasOwnProperty(category)) {
            // Set the category
            categorySelect.value = category;
            populateUnits(category);

            // Scroll to the converter section
            document.querySelector('.converter').scrollIntoView({ behavior: 'smooth' });
        }
    }
});

populateCategories();