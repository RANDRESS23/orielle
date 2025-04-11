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
import { SelectDropdown } from '@/components/select-dropdown'
import { Product } from '../data/schema'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import api from '@/lib/api'
import { useFetchProducts } from '../data/products'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Product
}

const formSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio.').max(70, 'El nombre debe tener un máximo de 70 caracteres.'),
  description: z
  .string()
  .min(1, 'La descripción es obligatoria.')
  .max(120, 'La descripción debe tener un máximo de 120 caracteres.'),
  quantity: z.coerce.number().min(1, 'La cantidad debe ser mayor a 0'),
  price: z.coerce.number().min(1, 'El precio debe ser mayor a 0'),
  image: z.string().min(1, 'La imagen es obligatoria.'),
  category: z.object({
    categoryId: z.number(),
  })
})

type ProductsForm = z.infer<typeof formSchema>

export function ProductsMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  const { products, setProducts, categories } = useFetchProducts()
  const [isLoading, setIsLoading] = useState(false)
  const isUpdate = !!currentRow

  const form = useForm<ProductsForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow ?? {
        name: '',
        description: '',
        quantity: 0,
        price: 0,
        image: '',
        category: { categoryId: 0 },
    },
  })

  const onSubmit = async (data: ProductsForm) => {
    try {
      setIsLoading(true)

      if (isUpdate) {
        const response = await api.put(`/product/${currentRow?.productId}`, {
          name: data.name,
          description: data.description,
          quantity: data.quantity,
          price: data.price,
          image: data.image,
          categoryId: data.category.categoryId,
        })
  
        if (response.status === 200) {
          const newProducts = products.map(product => product.productId === currentRow?.productId ? { ...product, name: data.name, description: data.description, quantity: data.quantity, price: data.price, image: data.image, category: response.data.category } : product)
          setProducts(newProducts)
  
          onOpenChange(false)
          form.reset()
          toast({
            title: '¡Producto actualizado exitosamente!',
            description: '¡El producto se actualizó correctamente y se reflejará en la lista!',
          })
        }
      } else {
        const response = await api.post('/product', {
          name: data.name,
          description: data.description,
          quantity: data.quantity,
          price: data.price,
          image: data.image,
          categoryId: data.category.categoryId,
        })
  
        if (response.status === 201) {
          const newProducts = [response.data, ...products]
          setProducts(newProducts)
  
          onOpenChange(false)
          form.reset()
          toast({
            title: '¡Producto agregado exitosamente!',
            description: '¡El producto se agregó correctamente y se reflejará en la lista!',
          })
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error)

      toast({
        title: '¡Oh no!, ocurrió un error',
        description: error?.response?.data?.message || '¡El producto no se pudo agregar correctamente!'
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
          <SheetTitle>{isUpdate ? 'Actualizar' : 'Crear'} Producto</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Actualizar el producto proporcionando la información necesaria. '
              : 'Agregue un nuevo producto proporcionando la información necesaria. '}
            Haga clic en {isUpdate ? '"Actualizar producto"' : '"Guardar producto"'} cuando haya terminado.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id='products-form'
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
            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Cantidad</FormLabel>
                  <FormControl>
                    <Input {...field} type='number' placeholder='Ingrese la cantidad en stock' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input {...field} type='number' placeholder='Ingrese el precio' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Imagen</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Ingrese la URL de la imagen' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Categoría</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value.categoryId.toString() === '0' ? '' : field.value.categoryId.toString()}
                    onValueChange={(value) => field.onChange({ categoryId: Number(value) })}
                    placeholder='Selecciona la categoría'
                    items={categories.map((category) => ({
                      label: category.name,
                      value: category.categoryId.toString(),
                    }))}
                  />
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
          <Button form='products-form' type='submit'>
            {isLoading ? 'Cargando...' : isUpdate ? 'Actualizar producto' : 'Guardar producto'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
