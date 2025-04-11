import { IconDownload, IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useProducts } from '../context/products-context'

export function ProductsPrimaryButtons() {
  const { setOpen } = useProducts()
  
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
