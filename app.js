import { GITHUB_TOKEN } from "./config.js";

const REPOSITORIES_API_URL =
  "https://api.github.com/user/repos?visibility=all&affiliation=owner,collaborator,organization_member&sort=updated&per_page=100";
const REPOSITORIES_PER_BATCH = 6;

const repositoriesContainer = document.getElementById("repositoriesContainer");
const loadMoreButton = document.getElementById("loadMoreButton");
const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const emptyState = document.getElementById("emptyState");

let allRepositories = [];
let renderedRepositoryCount = 0;

const requestHeaders = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

if (GITHUB_TOKEN) {
  requestHeaders.Authorization = `Bearer ${GITHUB_TOKEN}`;
}

// Shows or hides the loading spinner.
function toggleLoadingState(isLoading) {
  loadingState.classList.toggle("hidden", !isLoading);
}

// Shows or hides the friendly error message.
function toggleErrorState(hasError) {
  errorState.classList.toggle("hidden", !hasError);
}

// Shows or hides the empty list message.
function toggleEmptyState(isEmpty) {
  emptyState.classList.toggle("hidden", !isEmpty);
}

// Enables or hides the Load More button based on remaining items.
function updateLoadMoreVisibility() {
  const shouldShowButton = renderedRepositoryCount < allRepositories.length;
  loadMoreButton.classList.toggle("hidden", !shouldShowButton);
}

// Builds a single repository card with name, description, stats, and link.
function createRepositoryCard(repositoryData) {
  const card = document.createElement("article");
  card.className = "panel p-5 flex flex-col gap-4";

  const headerRow = document.createElement("div");
  headerRow.className = "flex items-start justify-between gap-4";

  const textBlock = document.createElement("div");
  textBlock.className = "space-y-2";

  const title = document.createElement("h3");
  title.className = "text-base font-semibold text-white";
  title.textContent = repositoryData.name || "Repository";

  const description = document.createElement("p");
  description.className = "text-sm text-slate-300";
  description.textContent =
    repositoryData.description || "No description available.";

  const languageBadge = document.createElement("span");
  languageBadge.className = "chip mono";
  languageBadge.textContent = repositoryData.language || "Unspecified";

  textBlock.appendChild(title);
  textBlock.appendChild(description);
  headerRow.appendChild(textBlock);
  headerRow.appendChild(languageBadge);

  const footerRow = document.createElement("div");
  footerRow.className =
    "flex items-center justify-between text-sm text-slate-300";

  const statsGroup = document.createElement("div");
  statsGroup.className = "flex items-center gap-4";

  const starCount = document.createElement("span");
  starCount.textContent = `Stars: ${repositoryData.stargazers_count}`;

  const forkCount = document.createElement("span");
  forkCount.textContent = `Forks: ${repositoryData.forks_count}`;

  statsGroup.appendChild(starCount);
  statsGroup.appendChild(forkCount);

  const repoLink = document.createElement("a");
  repoLink.href = repositoryData.html_url;
  repoLink.target = "_blank";
  repoLink.rel = "noreferrer";
  repoLink.className = "text-sky-300 hover:text-white";
  repoLink.textContent = "View code";

  footerRow.appendChild(statsGroup);
  footerRow.appendChild(repoLink);

  card.appendChild(headerRow);
  card.appendChild(footerRow);

  return card;
}

// Renders the next batch of repositories into the grid.
function renderNextRepositoryBatch() {
  const nextBatch = allRepositories.slice(
    renderedRepositoryCount,
    renderedRepositoryCount + REPOSITORIES_PER_BATCH
  );

  nextBatch.forEach((repositoryData) => {
    repositoriesContainer.appendChild(createRepositoryCard(repositoryData));
  });

  renderedRepositoryCount += nextBatch.length;

  toggleEmptyState(allRepositories.length === 0);
  updateLoadMoreVisibility();
}

// Fetches repositories from GitHub API with authentication when available.
async function fetchRepositories() {
  toggleErrorState(false);
  toggleLoadingState(true);

  try {
    const response = await fetch(REPOSITORIES_API_URL, {
      headers: requestHeaders,
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const repositoryData = await response.json();
    allRepositories = Array.isArray(repositoryData) ? repositoryData : [];

    renderNextRepositoryBatch();
  } catch (error) {
    toggleErrorState(true);
  } finally {
    toggleLoadingState(false);
  }
}

// Wires up the Load More button click.
function setupLoadMoreHandler() {
  loadMoreButton.addEventListener("click", () => {
    renderNextRepositoryBatch();
  });
}

// Initializes the page logic.
function initializePortfolio() {
  setupLoadMoreHandler();
  fetchRepositories();
}

initializePortfolio();
