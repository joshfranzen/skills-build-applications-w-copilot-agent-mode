import { createElement, useEffect, useState } from 'react'
import { apiEndpoint, normalizeApiResults } from './api.js'

function formatValue(value) {
  if (Array.isArray(value)) {
    return value.join(', ')
  }

  if (value === null || value === undefined || value === '') {
    return 'Not provided'
  }

  return value
}

function renderCell(column, record) {
  const value = column.render ? column.render(record) : record[column.key]
  return formatValue(value)
}

function DataTablePage({ title, endpointName, description, columns }) {
  const [records, setRecords] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [selectedRecord, setSelectedRecord] = useState(null)

  useEffect(() => {
    const endpoint = apiEndpoint(endpointName)
    console.log(`${title} REST API endpoint:`, endpoint)

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        return response.json()
      })
      .then((data) => {
        console.log(`${title} fetched data:`, data)
        setRecords(normalizeApiResults(data))
        setError('')
      })
      .catch((fetchError) => {
        console.error(`${title} fetch error:`, fetchError)
        setError(fetchError.message)
      })
      .finally(() => setIsLoading(false))
  }, [endpointName, title])

  const normalizedQuery = query.trim().toLowerCase()
  const filteredRecords = records.filter((record) => {
    if (!normalizedQuery) {
      return true
    }

    return JSON.stringify(record).toLowerCase().includes(normalizedQuery)
  })

  return createElement(
    'section',
    { className: 'data-page' },
    createElement(
      'div',
      { className: 'd-flex flex-column flex-lg-row justify-content-between gap-3 mb-4' },
      createElement(
        'div',
        null,
        createElement('p', { className: 'text-uppercase text-primary fw-semibold small mb-2' }, 'Octofit Tracker'),
        createElement('h1', { className: 'display-6 fw-bold mb-2' }, title),
        createElement('p', { className: 'lead text-secondary mb-0' }, description),
      ),
      createElement(
        'a',
        {
          className: 'btn btn-outline-primary align-self-start',
          href: apiEndpoint(endpointName),
          target: '_blank',
          rel: 'noreferrer',
        },
        'Open API endpoint',
      ),
    ),
    createElement(
      'form',
      { className: 'card card-body mb-4', onSubmit: (event) => event.preventDefault() },
      createElement('label', { className: 'form-label fw-semibold', htmlFor: `${endpointName}-search` }, `Search ${title}`),
      createElement('input', {
        className: 'form-control',
        id: `${endpointName}-search`,
        onChange: (event) => setQuery(event.target.value),
        placeholder: `Filter ${title.toLowerCase()} data`,
        type: 'search',
        value: query,
      }),
    ),
    error && createElement('div', { className: 'alert alert-danger', role: 'alert' }, error),
    createElement(
      'div',
      { className: 'card data-card' },
      createElement(
        'div',
        { className: 'card-header d-flex justify-content-between align-items-center' },
        createElement('h2', { className: 'h5 mb-0' }, `${title} Data`),
        createElement('span', { className: 'badge text-bg-primary' }, `${filteredRecords.length} records`),
      ),
      createElement(
        'div',
        { className: 'table-responsive' },
        createElement(
          'table',
          { className: 'table table-striped table-hover align-middle mb-0' },
          createElement(
            'thead',
            { className: 'table-dark' },
            createElement(
              'tr',
              null,
              columns.map((column) => createElement('th', { key: column.key, scope: 'col' }, column.label)),
              createElement('th', { scope: 'col' }, 'Actions'),
            ),
          ),
          createElement(
            'tbody',
            null,
            isLoading && createElement(
              'tr',
              null,
              createElement('td', { className: 'text-center py-4', colSpan: columns.length + 1 }, 'Loading data...'),
            ),
            !isLoading && filteredRecords.length === 0 && createElement(
              'tr',
              null,
              createElement('td', { className: 'text-center py-4', colSpan: columns.length + 1 }, 'No records found.'),
            ),
            !isLoading && filteredRecords.map((record, index) => createElement(
              'tr',
              { key: record.id || `${endpointName}-${index}` },
              columns.map((column) => createElement('td', { key: column.key }, renderCell(column, record))),
              createElement(
                'td',
                null,
                createElement(
                  'button',
                  { className: 'btn btn-sm btn-primary', onClick: () => setSelectedRecord(record), type: 'button' },
                  'View',
                ),
              ),
            )),
          ),
        ),
      ),
    ),
    selectedRecord && createElement(
      'div',
      { className: 'modal fade show', role: 'dialog', style: { display: 'block' }, tabIndex: '-1' },
      createElement(
        'div',
        { className: 'modal-dialog modal-dialog-centered modal-lg' },
        createElement(
          'div',
          { className: 'modal-content' },
          createElement(
            'div',
            { className: 'modal-header' },
            createElement('h2', { className: 'modal-title h5' }, `${title} Details`),
            createElement(
              'button',
              { 'aria-label': 'Close', className: 'btn-close', onClick: () => setSelectedRecord(null), type: 'button' },
            ),
          ),
          createElement(
            'div',
            { className: 'modal-body' },
            createElement(
              'div',
              { className: 'row g-3' },
              columns.map((column) => createElement(
                'div',
                { className: 'col-md-6', key: column.key },
                createElement(
                  'div',
                  { className: 'card h-100' },
                  createElement(
                    'div',
                    { className: 'card-body' },
                    createElement('h3', { className: 'h6 card-title text-secondary' }, column.label),
                    createElement('p', { className: 'card-text fw-semibold mb-0' }, renderCell(column, selectedRecord)),
                  ),
                ),
              )),
            ),
          ),
          createElement(
            'div',
            { className: 'modal-footer' },
            createElement(
              'button',
              { className: 'btn btn-secondary', onClick: () => setSelectedRecord(null), type: 'button' },
              'Close',
            ),
          ),
        ),
      ),
    ),
    selectedRecord && createElement('div', { className: 'modal-backdrop fade show' }),
  )
}

export default DataTablePage