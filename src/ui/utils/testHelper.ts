import { ApiRequest, ApiResponse, Test, TestAssertion } from '../types/suites'

const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

const validateAssertion = (assertion: TestAssertion, response: any) => {
  const { type, field, operator, value } = assertion
  let passed = false
  let actual: any = response.status.toString()

  try {
    switch (type) {
      case 'code':
      case 'time':
        passed = compareValues(actual, value, operator)
        break

      case 'header':
        actual = response.headers[field?.toLowerCase() || ''] || ''
        passed = compareValues(actual, value, operator)
        break

      case 'body':
        if (field) {
          actual = getNestedValue(response.body, field)
        } else {
          actual = JSON.stringify(response.body)
        }
        passed = compareValues(actual, value, operator)
        break
    }
  } catch (error) {
    passed = false
    actual =
      'Error: ' + (error instanceof Error ? error.message : 'Unknown error')
  }

  return {
    id: assertion.id,
    type,
    field,
    operator,
    expected: value,
    actual: actual?.toString() || '',
    passed,
    message: passed
      ? `✓ ${type} ${operator} ${value}`
      : `✗ Expected ${type} to ${operator} ${value}, but got ${actual}`,
  }
}

const compareValues = (
  actual: any,
  expected: string,
  operator: string
): boolean => {
  const actualStr = actual?.toString() || ''

  switch (operator) {
    case 'equals':
      return actualStr === expected
    case 'contains':
      return actualStr.includes(expected)
    case 'greaterThan':
      return parseFloat(actualStr) > parseFloat(expected)
    case 'lessThan':
      return parseFloat(actualStr) < parseFloat(expected)
    case 'exists':
      return actual !== null && actual !== undefined && actualStr !== ''
    default:
      return false
  }
}

const singleTest = async (test: Test): Promise<void> => {
  const startTime = Date.now()

  let results: any = {
    testId: test.id,
    title: test.title,
  }

  try {
    // Simulate API call (in a real app, this would make an actual HTTP request)
    const response = await apiCall(test)
    const duration = Date.now() - startTime

    // Validate assertions
    const assertionResults = test.assertions.map((assertion) =>
      validateAssertion(assertion, response)
    )

    const allPassed = assertionResults.every((a) => a.passed)

    // Update result
    results = {
      status: allPassed ? 'passed' : 'failed',
      duration,
      assertions: assertionResults,
      response: {
        status: response.status,
        statusText: response.statusText,
        body: response.body,
        headers: response.headers,
        time: duration,
      },
    }

    return results
  } catch (error) {
    const duration = Date.now() - startTime
    results = {
      ...results,
      status: 'failed',
      duration,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
    return results
  }
}

const apiCall = async (request: ApiRequest): Promise<ApiResponse> => {
  let response: ApiResponse
  response.time = performance.now()
  try {
    const api_response = await fetch(request.endpoint, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    })
    const endTime = response.time - performance.now()
    const responseBody = await api_response.text()
    let parsedBody: any
    try {
      parsedBody = JSON.parse(responseBody)
    } catch (e) {
      parsedBody = responseBody
    }
    response = {
      status: api_response.status.toString(),
      statusText: api_response.statusText,
      body: parsedBody,
      headers: api_response.headers
        ? Object.fromEntries(api_response.headers.entries())
        : {},
      time: endTime,
    }
  } catch (error) {
    throw new Error(
      'Network error: ' +
        (error instanceof Error ? error.message : 'Unknown error')
    )
  }

  return Promise.resolve(response)
}

export { getNestedValue, validateAssertion }
