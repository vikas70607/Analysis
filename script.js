async function fetchData() {
    const url = "https://prompttoanalysis.onrender.com/api/analysis/analyze";
    const promptInput = document.getElementById("promptInput").value;
    const loadingText = document.getElementById("loading");
    const container = document.getElementById("content");

    container.innerHTML = ""; // Clear previous content
    loadingText.style.display = "block"; // Show loading text

    const payload = JSON.stringify({ prompt: promptInput });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: payload
        });

        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        container.innerHTML = "Error fetching data. Please try again.";
    } finally {
        loadingText.style.display = "none"; // Hide loading text
    }
}

function displayData(data) {
    const container = document.getElementById("content");

    data.texts.forEach((text, index) => {
        const textElement = document.createElement("p");
        textElement.textContent = `- ${text}`;
        container.appendChild(textElement);

        if (index < data.charts.length) {
            const chart = data.charts[index];
            const chartTitle = document.createElement("h3");
            chartTitle.textContent = chart.title;

            const chartDesc = document.createElement("p");
            chartDesc.textContent = chart.description;

            const chartImage = document.createElement("img");
            chartImage.src = `data:image/png;base64,${chart.base64Image}`;
            chartImage.style.maxWidth = "400px";

            container.appendChild(chartTitle);
            container.appendChild(chartDesc);
            container.appendChild(chartImage);
        }
    });
}

window.onload = function() {
    document.getElementById("fetchButton").addEventListener("click", fetchData);
};
