export interface TestAssertion {
  id: string
  type: Type
  field?: string
  operator: Operator
  value: string
  // Test stats
  passed?: boolean
  message?: string
  expected?: string
  actual?: string
}

export type Operator = 'equals' | 'contains' | 'greater' | 'less'
//   | 'exists' --------- haii if you want them make a pr. :)
//   | 'matches'

export type Type = 'header' | 'body' | 'time' | 'code'
export type Method = 'GET' | 'PUT' | 'DELETE' | 'PATCH' | 'POST'

export interface Test {
  id: string
  title: string
  description: string
  method: Method
  endpoint: string
  link?: string
  headers?: Record<string, string>
  body?: string
  assertions: TestAssertion[]
  timeout: number
  //Test stats TODO - be moved
  status?: string
  duration?: number
  response?: any
  error?: string
  //   preRequestScript?: string ------------> to be continued :)
  //   postResponseScript?: string
}

export interface Suite {
  id: string
  title: string
  description?: string
  tests: Test[]
}

//to remove later
export interface ApiResponse {
  status: string
  statusText: string
  body: any
  headers: Record<string, string>
  time: number
}

export interface ApiRequest {
  method: Method
  endpoint: string
  headers?: Record<string, string>
  body?: string
  timeout: number
}
