import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import CategoriesPage from "@/pages/admin/Categories";
import ProductsPage from "@/pages/admin/Products";

export default function App () {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="products" element={<ProductsPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}
