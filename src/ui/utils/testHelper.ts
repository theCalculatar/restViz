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
      : `✗ Expected ${type} to be ${operator} ${value}, but got ${actual}`,
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
    case 'greater':
      return parseFloat(actualStr) > parseFloat(expected)
    case 'less':
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

  localStorage.setItem('lastRun', Date.now().toString())

  try {
    // Simulate API call (in a real app, this would make an actual HTTP request)
    const response = await apiCall(test)
    const duration = Date.now() - startTime

    // Validate assertions
    const assertionResults = test.assertions.map((assertion) =>
      validateAssertion(assertion, response)
    )

    const allPassed = assertionResults.every((a) => a.passed)

    //calc pass rate (get old value and update)
    const passed = allPassed ? 1 : 0
    const oldPassRate =
      localStorage.getItem('passRate') ||
      JSON.stringify({
        passRate: 0,
        totalTests: 0,
      })
    const { passRate: oldPassRateValue, totalTests: oldTotalTests } =
      JSON.parse(oldPassRate)

    const oldPassedCount = oldPassRateValue * oldTotalTests
    const newTotalTests = oldTotalTests + 1
    const newPassedCount = oldPassedCount + passed
    const newPassRate = newPassedCount / newTotalTests

    localStorage.setItem(
      'passRate',
      JSON.stringify({
        passRate: newPassRate,
        totalTests: newTotalTests,
      })
    )

    // Update result
    results = {
      ...results,
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

const apiCall = async (
  request: ApiRequest,
  options?: any
): Promise<ApiResponse> => {
  let response: ApiResponse = {
    status: '',
    statusText: '',
    body: null,
    headers: {},
    time: 0,
  }
  response.time = Date.now()
  try {
    const MAX_RETRIES = options?.maxRetries || 3
    const TIMEOUT_MS = options?.timeout || 5000
    let retries = 0
    let api_response: Response | null = null

    while (retries < MAX_RETRIES) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

        api_response = await fetch(request.endpoint, {
          method: request.method,
          headers: request.headers,
          body:
            request.method === 'GET' || request.method === 'DELETE'
              ? null
              : JSON.stringify(request.body),
          signal: controller.signal,
        })
        clearTimeout(timeoutId)
        break
      } catch (error) {
        retries++
        if (retries >= MAX_RETRIES) {
          throw Error('Failed to get response after retries')
        }
      }
    }

    if (!api_response) {
      throw new Error('Failed to get response after retries')
    }
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

export { getNestedValue, validateAssertion, singleTest }
