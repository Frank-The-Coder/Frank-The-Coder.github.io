// Activity 5: dynamic project content.
// Project data lives in the array below. renderProjects() turns entries into
// Materialize cards and inserts them into <div id="project-list">. Two projects
// are shown on page load; the Load More button reveals the rest without a reload.

const projects = [
  {
    title: "AlphaForge-MAA",
    description: "AI-driven alpha factor mining that combines reinforcement learning and GANs for quantitative trading.",
    image: "/assets/img/project-ml-4.jpg",
    imageAlt: "Illustration of a data pipeline",
    tools: "PyTorch, Qlib, RL (D3QN / PPO), 3GAN",
    highlights: [
      "Replaced linear factor combination with RL agents that use IC / ICIR rewards to dynamically adjust factor weights for market adaptability.",
      "Integrated 3GAN to generate diverse alpha factors and filter high-IC candidates, boosting multi-factor robustness.",
      "Built RL trading simulators to train factor rebalancing strategies, merging deep RL with quantitative trading logic."
    ],
    link: { url: "https://github.com/Frank-The-Coder", label: "Visit Frank's GitHub profile", tooltip: "GitHub Profile" }
  },
  {
    title: "ML-Scope",
    description: "A real-time machine learning pipeline that pairs LSTM forecasting with a reinforcement learning agent.",
    image: "/assets/img/project-ml-2.jpg",
    imageAlt: "Illustration of a machine learning workstation",
    tools: "Python, PyTorch, LSTM, Q-Learning",
    highlights: [
      "Shared prediction queue for inter-process communication between the forecasting and RL modules, with latency and overflow logging.",
      "Hardware-aware forecasting: automatic CPU / GPU detection with dynamic quantization for CPU inference.",
      "Automated hyperparameter tuning and resilience testing under simulated high-load scenarios."
    ],
    link: { url: "https://github.com/Frank-The-Coder/ml-scope", label: "Visit the GitHub repo for ML-Scope", tooltip: "View Source" }
  },
  {
    title: "Autoencoder Data Imputation",
    description: "A PyTorch autoencoder that reconstructs missing values in tabular data.",
    image: "/assets/img/project-ml-1.jpg",
    imageAlt: "Illustration of data storage and reading",
    tools: "Python, PyTorch, pandas, scikit-learn",
    highlights: [
      "Imputes both continuous and categorical features on the UCI Adult dataset.",
      "Includes preprocessing and feature engineering, plus training, evaluation, and testing scripts that measure reconstruction accuracy."
    ],
    link: { url: "https://github.com/Frank-The-Coder/autoencoder-data-imputation", label: "Visit the GitHub repo for Autoencoder Data Imputation", tooltip: "View Source" }
  },
  {
    title: "Real-Time WebSocket Service",
    description: "A configurable Flask-SocketIO service for instant notifications over HTTP and HTTPS.",
    image: "/assets/img/project-python-flask1.jpg",
    imageAlt: "Flask logo",
    tools: "Python, Flask, Flask-SocketIO, SQLite, PyQt5, PyInstaller",
    highlights: [
      "Real-time messaging to connected clients with SQLite logging of messages and senders.",
      "Security controls: per-IP connection limiting and API-key authentication for sending messages.",
      "Admin GUI for configuration, and cross-platform packaging for Windows and Unix-like systems."
    ],
    link: { url: "https://github.com/Frank-The-Coder/python-websocket", label: "Visit the GitHub repo for the WebSocket service", tooltip: "View Source" }
  },
  {
    title: "White Blood Cell Classifier",
    description: "A CNN with ResNet-50 transfer learning that classifies four types of white blood cells.",
    image: "/assets/img/computer-vision-v2-04.png",
    imageAlt: "Computer vision illustration",
    tools: "Python, PyTorch, ResNet-50, Optuna, SVM",
    highlights: [
      "Classifies eosinophils, lymphocytes, monocytes, and neutrophils from 28,000 training images.",
      "Frozen ResNet-50 feature extractor with a custom classifier head; 98.06% test accuracy.",
      "Hyperparameters tuned with Optuna and compared against a GPU-accelerated SVM baseline."
    ],
    link: { url: "https://github.com/Frank-The-Coder/white-blood-cell-classifier", label: "Visit the GitHub repo for the White Blood Cell Classifier", tooltip: "View Source" }
  },
  {
    title: "Hardware ID Library",
    description: "A cross-platform C++ library that retrieves unique hardware identifiers on Linux and Windows.",
    image: "/assets/img/write-compile-run-repeat.jpg",
    imageAlt: "Dark code wallpaper",
    tools: "C++, Linux system calls, Windows APIs, PHP extension API",
    highlights: [
      "Retrieves CPU ID, MAC address, hard disk ID, and motherboard ID using assembly instructions, ioctl, and ATA / SCSI protocols.",
      "Optional PHP extension exposes the same functions to PHP applications for licensing and security use cases."
    ],
    link: { url: "https://github.com/Frank-The-Coder/hardware_id", label: "Visit the GitHub repo for the Hardware ID library", tooltip: "View Source" }
  }
];

// How many projects are visible before the user clicks Load More.
const INITIAL_PROJECT_COUNT = 2;

// Number of projects currently inserted into the page.
let shownCount = 0;

// Build the HTML for one project card (same Materialize card layout as the rest of the site).
function projectCardHTML(project) {
  const highlightItems = project.highlights
    .map(function (text) { return "<li>" + text + "</li>"; })
    .join("");

  return (
    '<div class="col s12 m6 l4">' +
      '<div class="card medium">' +
        '<div class="card-image waves-effect waves-block waves-light">' +
          '<img alt="' + project.imageAlt + '" src="' + project.image + '" style="height: 100%; width: 100%" class="activator" />' +
        '</div>' +
        '<div class="card-content">' +
          '<span class="card-title activator slate-text hoverline">' + project.title +
            '<i class="mdi-navigation-more-vert right"></i></span>' +
          '<p>' + project.description + '</p>' +
        '</div>' +
        '<div class="card-reveal">' +
          '<span class="card-title grey-text"><small>Accomplishments</small><i class="mdi-navigation-close right"></i></span>' +
          '<ul>' +
            '<li><b>Tools:</b> ' + project.tools + '</li>' +
            highlightItems +
          '</ul>' +
          '<div class="card-action">' +
            '<a aria-label="' + project.link.label + '" href="' + project.link.url + '" target="_blank" ' +
              'data-position="top" data-tooltip="' + project.link.tooltip + '" ' +
              'class="btn-floating btn-large waves-effect waves-light blue-grey tooltipped">' +
              '<i class="fa fa-github"></i></a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
}

// Insert projects[shownCount .. count-1] into the page, then update the button.
function renderProjects(count) {
  const list = document.getElementById("project-list");
  const end = Math.min(count, projects.length);

  for (let i = shownCount; i < end; i++) {
    list.insertAdjacentHTML("beforeend", projectCardHTML(projects[i]));
  }
  shownCount = end;

  updateLoadMoreButton();
}

// Hide the Load More button once every project is on the page.
function updateLoadMoreButton() {
  const button = document.getElementById("load-more-btn");
  if (shownCount >= projects.length) {
    button.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderProjects(INITIAL_PROJECT_COUNT);

  document.getElementById("load-more-btn").addEventListener("click", function () {
    renderProjects(projects.length);
  });
});
