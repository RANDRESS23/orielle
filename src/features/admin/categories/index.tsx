import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { CategoriesDialogs } from './components/categories-dialogs'
import { CategoriesPrimaryButtons } from './components/categories-primary-buttons'
import CategoriesProvider from './context/categories-context'
import { useFetchCategories } from './data/categories'

export const Categories = () => {
  return (
    <CategoriesProvider>
      <CategoriesContent />
    </CategoriesProvider>
  )
}

const CategoriesContent = () => {
  const { categories } = useFetchCategories()
  
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
            <h2 className='text-2xl font-bold tracking-tight'>Categorías</h2>
            <p className='text-muted-foreground'>
              ¡Aquí podrás gestionar todas las categorías de Orielle!
            </p>
          </div>
          <CategoriesPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={categories} columns={columns} />
        </div>
      </Main>

      <CategoriesDialogs />
    </>
  )
}
