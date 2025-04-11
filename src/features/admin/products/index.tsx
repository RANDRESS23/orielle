import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { ProductsDialogs } from './components/products-dialogs'
import { ProductsPrimaryButtons } from './components/products-primary-buttons'
import ProductsProvider from './context/products-context'
import { useFetchProducts } from './data/products'

export const Products = () => {
  return (
    <ProductsProvider>
      <ProductsContent />
    </ProductsProvider>
  )
}

const ProductsContent = () => {
  const { products } = useFetchProducts()
  
  return (
    <>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Productos</h2>
            <p className='text-muted-foreground'>
              ¡Aquí podrás gestionar todos los productos de Orielle!
            </p>
          </div>
          <ProductsPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={products} columns={columns} />
        </div>
      </Main>

      <ProductsDialogs />
    </>
  )
}
