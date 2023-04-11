export interface WidgetSlot {
  id: number
  routeMatch?: string
  query?: string
  params?: any
  splitTesting?: any
}

export interface Widget {
  id: string
  component: string
  colStart: number
  rowStart: number
  cols: number
  rows: number
  position?: string
  size?: string
  data: any
}
