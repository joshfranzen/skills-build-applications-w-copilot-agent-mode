const codespaceName = import.meta.env.REACT_APP_CODESPACE_NAME

function codespaceBackendBaseUrl() {
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`
  }

  if (window.location.hostname.endsWith('.app.github.dev')) {
    return `https://${window.location.hostname.replace(/-\d+\.app\.github\.dev$/, '-8000.app.github.dev')}/api`
  }

  return 'http://localhost:8000/api'
}

export function apiEndpoint(component) {
  return `${codespaceBackendBaseUrl()}/${component}/`
}

export function normalizeApiResults(data) {
  if (Array.isArray(data)) {
    return data
  }

  if (Array.isArray(data?.results)) {
    return data.results
  }

  return []
}