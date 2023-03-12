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
