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
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
// import { SelectDropdown } from '@/components/select-dropdown'
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
            {/* <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Status</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder='Select dropdown'
                    items={[
                      { label: 'In Progress', value: 'in progress' },
                      { label: 'Backlog', value: 'backlog' },
                      { label: 'Todo', value: 'todo' },
                      { label: 'Canceled', value: 'canceled' },
                      { label: 'Done', value: 'done' },
                    ]}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem className='relative space-y-3'>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='documentation' />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          Documentation
                        </FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='feature' />
                        </FormControl>
                        <FormLabel className='font-normal'>Feature</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='bug' />
                        </FormControl>
                        <FormLabel className='font-normal'>Bug</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='priority'
              render={({ field }) => (
                <FormItem className='relative space-y-3'>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='high' />
                        </FormControl>
                        <FormLabel className='font-normal'>High</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='medium' />
                        </FormControl>
                        <FormLabel className='font-normal'>Medium</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='low' />
                        </FormControl>
                        <FormLabel className='font-normal'>Low</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
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
