export interface Widget {
  id: number
  name: string
  data: any
}

export default async function useWidget(id: number): Promise<Widget> {
  // get widget from api
  return await $fetch(`/api/repositories/widgets/${id}`) as Widget
}
