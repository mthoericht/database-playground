import { ref } from 'vue'
import type { TableSchema } from '../types'
import { DatabaseApi } from '../api/DatabaseApi'

export function useTableDetail() {
  const schema = ref<TableSchema>({ columns: [], foreignKeys: [] })
  const rows = ref<Record<string, unknown>[]>([])
  const loading = ref(true)

  async function loadTableDetail(name: string): Promise<void> {
    loading.value = true
    try {
      const [schemaResult, rowsResult] = await Promise.all([
        DatabaseApi.getTableSchema(name),
        DatabaseApi.getTableData(name),
      ])
      schema.value = schemaResult
      rows.value = rowsResult
    } catch (e) {
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return { schema, rows, loading, loadTableDetail }
}
