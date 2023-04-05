export interface Widget {
  id: number
  type: string
  placement: string
  image: string
  route: string
  title?: string
  description?: string
  cta?: string
}

export default async function useTempWidget(id: any, placement?: string): Promise<any> {
  const { widgets } = (await $fetch('/api/jacques-loup-temp-data')) as { widgets: Widget[] }

  if (Array.isArray(id)) {
    return widgets.filter((widget: any) => id.includes(widget.id) && widget.placement === placement)
  }

  return widgets.find((widget: Widget) => widget.id === id && widget.placement === placement)
}
