import { IconDownload, IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useCategories } from '../context/categories-context'

export function CategoriesPrimaryButtons() {
  const { setOpen } = useCategories()
  
  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('import')}
      >
        <span>Importar</span> <IconDownload size={18} />
      </Button>
      <Button className='space-x-1' onClick={() => setOpen('create')}>
        <span>Crear</span> <IconPlus size={18} />
      </Button>
    </div>
  )
}
