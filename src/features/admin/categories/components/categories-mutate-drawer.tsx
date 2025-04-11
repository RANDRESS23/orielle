import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Category } from '../data/schema'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import api from '@/lib/api'
import { useFetchCategories } from '../data/categories'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Category
}

const formSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio.').max(70, 'El nombre debe tener un máximo de 70 caracteres.'),
  description: z
  .string()
  .min(1, 'La descripción es obligatoria.')
  .max(120, 'La descripción debe tener un máximo de 120 caracteres.'),
})
type CategoriesForm = z.infer<typeof formSchema>

export function CategoriesMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  const { categories, setCategories } = useFetchCategories()
  const [isLoading, setIsLoading] = useState(false)
  const isUpdate = !!currentRow

  const form = useForm<CategoriesForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow ?? {
      name: '',
      description: '',
    },
  })

  const onSubmit = async (data: CategoriesForm) => {
    try {
      setIsLoading(true)

      if (isUpdate) {
        const response = await api.put(`/category/${currentRow?.categoryId}`, {
          name: data.name,
          description: data.description,
        })
  
        if (response.status === 200) {
          const newCategories = categories.map(category => category.categoryId === currentRow?.categoryId ? { ...category, name: data.name, description: data.description } : category)
          setCategories(newCategories)
  
          onOpenChange(false)
          form.reset()
          toast({
            title: '¡Categoría actualizada exitosamente!',
            description: '¡La categoría se actualizó correctamente y se reflejará en la lista!',
          })
        }
      } else {
        const response = await api.post('/category', {
          name: data.name,
          description: data.description,
        })
  
        if (response.status === 201) {
          const newCategories = [response.data, ...categories]
          setCategories(newCategories)
  
          onOpenChange(false)
          form.reset()
          toast({
            title: '¡Categoría agregada exitosamente!',
            description: '¡La categoría se agregó correctamente y se reflejará en la lista!',
          })
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error)

      toast({
        title: '¡Oh no!, ocurrió un error',
        description: error?.response?.data?.message || '¡La categoría no se pudo agregar correctamente!'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-left'>
          <SheetTitle>{isUpdate ? 'Actualizar' : 'Crear'} Categoría</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Actualizar la categoría proporcionando la información necesaria. '
              : 'Agregue una nueva categoría proporcionando la información necesaria. '}
            Haga clic en {isUpdate ? '"Actualizar categoría"' : '"Guardar categoría"'} cuando haya terminado.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id='categories-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 space-y-5 px-4 overflow-y-auto'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Ingrese el nombre' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingrese la descripción"
                      className="resize-none h-28"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Cerrar</Button>
          </SheetClose>
          <Button form='categories-form' type='submit'>
            {isLoading ? 'Cargando...' : isUpdate ? 'Actualizar categoría' : 'Guardar categoría'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
