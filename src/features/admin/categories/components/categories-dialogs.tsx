import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useCategories } from '../context/categories-context'
import { CategoriesImportDialog } from './categories-import-dialog'
import { CategoriesMutateDrawer } from './categories-mutate-drawer'
import { useFetchCategories } from '../data/categories'

export function CategoriesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCategories()
  const { deleteCategory } = useFetchCategories()
  
  return (
    <>
      <CategoriesMutateDrawer
        key='category-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      <CategoriesImportDialog
        key='categories-import'
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      />

      {currentRow && (
        <>
          <CategoriesMutateDrawer
            key={`category-update-${currentRow.categoryId}`}
            open={open === 'update'}
            onOpenChange={() => {
              setOpen('update')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key='category-delete'
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={async () => {
              setOpen(null)
              const isDeletedCategory = await deleteCategory(currentRow.name)

              if (isDeletedCategory) {
                setCurrentRow(null)
                toast({
                  title: '¡La categoría ha sido eliminada!',
                  description: '¡La categoría se eliminó correctamente y se reflejará en la lista!',
                })
              } else {
                toast({
                  title: '¡Oh no!, ocurrió un error',
                  description: '¡La categoría no se pudo eliminar correctamente!'
                })
              }
            }}
            className='max-w-md'
            title={`¿Deseas eliminar la categoría: ${currentRow.name} ?`}
            desc={
              <>
                ¿Estás seguro de eliminar la categoría con el nombre{' '}
                <strong>"{currentRow.name}"</strong> ? <br />
                Esta acción no se puede deshacer.
              </>
            }
            confirmText='Eliminar'
          />
        </>
      )}
    </>
  )
}
