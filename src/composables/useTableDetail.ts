import { ref } from 'vue'
import type { TableSchema } from '../types'

export function useTableDetail() {
  const schema = ref<TableSchema>({ columns: [], foreignKeys: [] })
  const rows = ref<Record<string, unknown>[]>([])
  const loading = ref(true)

  async function loadTableDetail(name: string): Promise<void> {
    loading.value = true
    try {
      const [schemaRes, dataRes] = await Promise.all([
        fetch(`/api/tables/${name}/schema`),
        fetch(`/api/tables/${name}/data`)
      ])
      schema.value = await schemaRes.json()
      rows.value = await dataRes.json()
    } catch (e) {
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return { schema, rows, loading, loadTableDetail }
}
