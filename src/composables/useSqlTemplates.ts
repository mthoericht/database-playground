import { ref, computed } from 'vue';
import { categories, templates } from '../data/sqlTemplates';

export function useSqlTemplates() 
{
  const activeCategory = ref(categories[0].key);

  const filteredTemplates = computed(() =>
    templates.filter(t => t.category === activeCategory.value)
  );

  return { categories, activeCategory, filteredTemplates };
}
