// A function to make API calls and handle responses - rough but ill come back to it
async function apiCall(request) {
  const __response = {
    status: 200,
    statusText: '',
    timeout: 0,
    timestamp: Date.now(),
  }

  let response
  let endTime
  const startTime = performance.now()

  try {
    response = await fetch(request.fullPath, {
      method: request.method,
      body:
        request.method !== 'GET' && request.method !== 'HEAD'
          ? request.body
          : null,
      headers: { ...request.headers },
    })

    endTime = performance.now()
    __response.timeout = endTime - startTime
    __response.status = response.status
    __response.statusText = response.statusText

    if (response.status === 204) {
      return resultsFn({ data: null, ...__response }, request)
    }

    const contentType = response.headers.get('content-type') || ''
    let data
    if (contentType.includes('application/json')) {
      data = await response.json()
    } else {
      data = await response.text()
    }

    if (response.status === 404) {
      const isExpressNotFound =
        typeof data === 'string' && data.startsWith('Cannot ')
      if (isExpressNotFound) {
        return resultsFn(
          {
            data,
            ...__response,
            error:
              'Route not found. Please check the path on server and try again.',
          },
          request
        )
      }
    }

    return resultsFn({ data, ...__response }, request)
  } catch (error) {
    endTime = performance.now()
    __response.timeout = endTime - startTime
    __response.status = response?.status || '000'
    __response.statusText = response?.statusText || 'Network Error'
    __response.request = request

    const isFetchFailed =
      error.message.toLowerCase().includes('fetch failed') ||
      error.message.toLowerCase().includes('failed to fetch')

    if (isFetchFailed) {
      return resultsFn(
        {
          ...__response,
          error:
            'Route not found or server is unreachable. Please check the path on server and try again.',
        },
        request
      )
    }

    if (
      error.message.includes("Failed to execute 'fetch'") ||
      error.message.includes("Failed to execute 'json'")
    ) {
      return resultsFn(
        {
          ...__response,
          error:
            'Network error. Please check your connection or the server status.',
        },
        request
      )
    }

    if (
      error.message.includes('Unexpected token') &&
      response?.status === 500
    ) {
      // This is a server error, we can assume the server is not returning valid JSON
      return resultsFn({ ...__response, error: 'Server Error' }, request)
    }

    // Handle other errors
    return resultsFn({ ...__response, error: error.message }, request)
  }
}

const resultsFn = (data, request) => Promise.resolve({ ...data, request })

export { apiCall }
