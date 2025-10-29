export interface TestAssertion {
  id: string
  type: Type
  field?: string
  operator: Operator
  value: string
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
  //   preRequestScript?: string ------------> to be continued :)
  //   postResponseScript?: string
}

export interface Suite {
  id: string
  title: string
  tests: Test[]
}
