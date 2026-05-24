import { GITHUB_TOKEN } from "./config.js";

const REPOSITORIES_API_URL =
  "https://api.github.com/user/repos?visibility=all&affiliation=owner,collaborator,organization_member&sort=updated&per_page=100";
const REPOSITORIES_PER_BATCH = 6;

const elements = {
  container: document.getElementById("repositoriesContainer"),
  loadMore: document.getElementById("loadMoreButton"),
  showLess: document.getElementById("showLessButton"),
  loading: document.getElementById("loadingState"),
  error: document.getElementById("errorState"),
  empty: document.getElementById("emptyState"),
};

const state = {
  all: [],
  shown: 0,
};

const requestHeaders = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

if (GITHUB_TOKEN) {
  requestHeaders.Authorization = `Bearer ${GITHUB_TOKEN}`;
}

const show = (element, visible) => {
  element.classList.toggle("hidden", !visible);
};

function createRepositoryCard(repositoryData) {
  const card = document.createElement("article");
  card.className = "panel repo-card";
  card.innerHTML = `
    <div class="repo-header">
      <div class="repo-text">
        <h3 class="repo-title"></h3>
        <p class="repo-desc"></p>
      </div>
      <span class="chip mono repo-language"></span>
    </div>
    <div class="repo-footer">
      <div class="repo-stats">
        <span class="repo-stars"></span>
        <span class="repo-forks"></span>
      </div>
      <a class="repo-link" target="_blank" rel="noreferrer">View code</a>
    </div>
  `;

  card.querySelector(".repo-title").textContent =
    repositoryData.name || "Repository";
  card.querySelector(".repo-desc").textContent =
    repositoryData.description || "No description available.";
  card.querySelector(".repo-language").textContent =
    repositoryData.language || "Unspecified";
  card.querySelector(".repo-stars").textContent =
    `Stars: ${repositoryData.stargazers_count}`;
  card.querySelector(".repo-forks").textContent =
    `Forks: ${repositoryData.forks_count}`;
  card.querySelector(".repo-link").href = repositoryData.html_url;

  return card;
}

function renderNextBatch() {
  const nextBatch = state.all.slice(
    state.shown,
    state.shown + REPOSITORIES_PER_BATCH
  );

  nextBatch.forEach((repositoryData) => {
    elements.container.appendChild(createRepositoryCard(repositoryData));
  });

  state.shown += nextBatch.length;

  show(elements.empty, state.all.length === 0);
  show(elements.loadMore, state.shown < state.all.length);
  show(elements.showLess, state.shown > REPOSITORIES_PER_BATCH);
}

function renderInitialBatch() {
  state.shown = 0;
  elements.container.replaceChildren();
  renderNextBatch();
}

async function fetchRepositories() {
  show(elements.error, false);
  show(elements.loading, true);

  try {
    const response = await fetch(REPOSITORIES_API_URL, {
      headers: requestHeaders,
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const repositoryData = await response.json();
    state.all = Array.isArray(repositoryData) ? repositoryData : [];
    renderNextBatch();
  } catch (error) {
    show(elements.error, true);
  } finally {
    show(elements.loading, false);
  }
}

elements.loadMore.addEventListener("click", renderNextBatch);
elements.showLess.addEventListener("click", renderInitialBatch);
fetchRepositories();
