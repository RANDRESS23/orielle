import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useProducts } from '../context/products-context'
import { ProductsImportDialog } from './products-import-dialog'
import { ProductsMutateDrawer } from './products-mutate-drawer'
import { useFetchProducts } from '../data/products'

export function ProductsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useProducts()
  const { deleteProduct } = useFetchProducts()
  
  return (
    <>
      <ProductsMutateDrawer
        key='product-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      <ProductsImportDialog
        key='products-import'
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      />

      {currentRow && (
        <>
          <ProductsMutateDrawer
            key={`product-update-${currentRow.productId}`}
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
            key='product-delete'
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
              const isDeletedProduct = await deleteProduct(currentRow.name)

              if (isDeletedProduct) {
                setCurrentRow(null)
                toast({
                  title: '¡El producto ha sido eliminado!',
                  description: '¡El producto se eliminó correctamente y se reflejará en la lista!',
                })
              } else {
                toast({
                  title: '¡Oh no!, ocurrió un error',
                  description: '¡El producto no se pudo eliminar correctamente!'
                })
              }
            }}
            className='max-w-md'
            title={`¿Deseas eliminar el producto: ${currentRow.name}?`}
            desc={
              <>
                ¿Estás seguro de eliminar el producto con el nombre{' '}
                <strong>"{currentRow.name}"</strong>? <br />
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
