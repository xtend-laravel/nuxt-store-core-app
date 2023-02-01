import { defineStore } from 'pinia'
import type { UnwrapRef } from 'vue'

export interface Page {
  id: number
  title: string
  short_description: string
  description: string
  status: string
}

interface PageState {
  pages: Record<string, Page>
  // Setting Page interface will make sure the data we receive matches the interface or null otherwise we will get an error.
  current: UnwrapRef<Page | null>
  heading: string
  seo: Array<{ meta_name: string; meta_desc: string }>
}

export const usePageStore = defineStore({
  id: 'page',

  // Global state for all pages
  state: (): PageState => ({
    pages: {},
    current: null,
    heading: 'Hatz Content Page',
    seo: [],
  }),

  getters: {
    currentPage(): UnwrapRef<PageState['current']> {
      return this.current
    },
    title(): string {
      return this.title
    },
    seo(): Array<{ meta_name: string; meta_desc: string }> {
      return this.seo
    },
  },

  actions: {
    async fetchPage(pageSlug: string): Promise<void> {
      // @todo - Later we will fetch page data from Laravel API
      // const res = await fetch(`/api/page/${pageSlug}`)
      // this.pages[pageSlug] = await res.json()

      // For now, we will use fake data
      this.pages[pageSlug] = {
        id: 1,
        title: 'About Us',
        short_description: 'Short description',
        description: 'Long description',
        status: 'published',
      }
      this.current = this.pages[pageSlug]
    },
  },
})
