// Fetch data from backend API
function animateCounter(element, start, end, duration = 1200) {
    let range = end - start;
    let stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    let increment = end > start ? 1 : -1;

    let timer = setInterval(() => {
        current += increment;
        element.innerText = current.toLocaleString();
        if (current === end) clearInterval(timer);
    }, stepTime);
}

fetch("http://127.0.0.1:5000/metrics")
  .then(res => res.json())
  .then(data => {
    const endpoints = data.map(d => d.endpoint);

    // Total summary
    let totalReqs = data.reduce((sum, d) => sum + d.req_count, 0);
    let totalErrors = data.reduce((sum, d) => sum + d.error_count, 0);
    let totalErrorRate = ((totalErrors / totalReqs) * 100).toFixed(2);

// Animate total requests
animateCounter(
  document.getElementById("totalReqs"),
  0,
  totalReqs
);
document.getElementById("totalReqs").innerText = `Total Requests: ${totalReqs}`;

// Animate total errors
animateCounter(
  document.getElementById("totalErrors"),
  0,
  totalErrors
);
document.getElementById("totalErrors").innerText = `Total Errors: ${totalErrors}`;

// Animate error rate
animateCounter(
  document.getElementById("totalErrorRate"),
  0,
  Math.round(totalErrorRate)
);
document.getElementById("totalErrorRate").innerText = `Error Rate: ${totalErrorRate}%`;


    // Color palette
    const colors = {
      blue: "#4A90E2",
      purple: "#9013FE",
      green: "#50E3C2",
      orange: "#F5A623",
      red: "#D0021B"
    };

    // 1. Avg Latency (Line Chart)
    new Chart(document.getElementById("avgChart"), {
      type: "line",
      data: {
        labels: endpoints,
        datasets: [{
          label: "Avg Latency (ms)",
          data: data.map(d => d.avg_time),
          fill: false,
          borderColor: colors.blue,
          backgroundColor: colors.blue,
          tension: 0.3,
          borderWidth: 3,
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true }},
        scales: { y: { beginAtZero: true }}
      }
    });

    // 2. Error Count (Red Bar Chart)
    new Chart(document.getElementById("errorChart"), {
      type: "bar",
      data: {
        labels: endpoints,
        datasets: [{
          label: "Error Count",
          data: data.map(d => d.error_count),
          backgroundColor: colors.red
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true }},
        scales: { y: { beginAtZero: true }}
      }
    });

    // 3. Request Count (Horizontal Bar Chart)
    new Chart(document.getElementById("reqChart"), {
      type: "bar",
      data: {
        labels: endpoints,
        datasets: [{
          label: "Request Count",
          data: data.map(d => d.req_count),
          backgroundColor: colors.green
        }]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: { legend: { display: true }},
        scales: { x: { beginAtZero: true }}
      }
    });

    // 4. Error Rate (Doughnut Chart)
    new Chart(document.getElementById("errorRateChart"), {
      type: "doughnut",
      data: {
        labels: endpoints,
        datasets: [{
          label: "Error Rate (%)",
          data: data.map(d => ((d.error_count / d.req_count) * 100).toFixed(2)),
          backgroundColor: [
            colors.red,
            colors.orange,
            colors.purple,
            colors.blue,
            colors.green
          ]
        }]
      },
      options: { responsive: true }
    });

    // 5. P95 Latency (Radar Chart)
    new Chart(document.getElementById("p95Chart"), {
      type: "radar",
      data: {
        labels: endpoints,
        datasets: [{
          label: "P95 Latency (ms)",
          data: data.map(d => d.p95),
          backgroundColor: colors.purple + "55",
          borderColor: colors.purple,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        scales: { r: { beginAtZero: true }}
      }
    });

  })
  .catch(err => console.error("Dashboard Error:", err));
