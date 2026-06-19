import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from '../pages/admin/ManageProduct/ProductList';
import ProductAddForm from '../pages/admin/ManageProduct/ProductAddForm';

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* 1. Tuyến đường mặc định: Tự động chuyển hướng vào trang danh sách admin */}
                <Route path="/" element={<Navigate to="/admin/products" replace />} />

                {/* 2. Giao diện trang hiển thị danh sách sản phẩm (Admin) */}
                <Route path="/admin/products" element={<ProductList />} />

                {/* 3. Giao diện trang Form thêm mới sản phẩm (Admin) */}
                <Route path="/admin/products/add" element={<ProductAddForm />} />
                
                {/* Bạn có thể thêm các tuyến đường cho khách hàng (client) ở dưới này sau */}
            </Routes>
        </Router>
    );
}