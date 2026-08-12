export interface Report {
  id: string
  name: string
  description: string
  lastUpdated: string
}

export interface User {
  userId: string
  name: string
  email: string
  role: string
  status: string
  createdDate: string
}

export interface Department {
  departmentId: string
  name: string
  manager: string
  employeeCount: number
  location: string
}

export interface Project {
  projectId: string
  name: string
  department: string
  owner: string
  status: string
  startDate: string
  endDate: string
}
