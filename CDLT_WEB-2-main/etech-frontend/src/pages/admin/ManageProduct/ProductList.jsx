import { useEffect, useState, useCallback } from 'react';
import { adminApi } from '../../../services/adminApi';
import { Link } from 'react-router-dom';

export default function ProductList() {
    const [products, setProducts] = useState([]);

    const currencyFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

    // Bọc hàm gọi API trong useCallback để tránh render lặp (cascading renders)
    const loadProducts = useCallback(async () => {
        try {
            const response = await adminApi.getAllProducts();
            setProducts(response.data);
        } catch (error) {
            console.error("Lỗi lấy danh sách sản phẩm", error);
        }
    }, []);

    // TRUY VẤN danh sách khi vừa vào trang
    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    // XỬ LÝ XÓA SẢN PHẨM
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa thiết bị này không?")) {
            try {
                await adminApi.deleteProduct(id);
                alert("Xóa thành công!");
                loadProducts(); // Tải lại bảng sau khi xóa thành công
            } catch (error) {
                alert("Không thể xóa sản phẩm này!");
            }
        }
    };

    return (
        <div className="p-6">
            {/* Thanh tiêu đề và nút Thêm mới */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Quản Lý Kho Thiết Bị (Admin)</h2>
                <Link 
                    to="/admin/products/add" 
                    className="bg-green-600 text-white px-4 py-2 rounded-md font-medium shadow hover:bg-green-700 transition duration-200"
                >
                    + Thêm sản phẩm mới
                </Link>
            </div>

            {/* Bảng danh sách sản phẩm */}
            <table className="w-full text-left border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Hình</th>
                        <th className="p-3">Tên sản phẩm</th>
                        <th className="p-3">Thương hiệu</th>
                        <th className="p-3">Giá</th>
                        <th className="p-3">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => {
                        // Lấy chuỗi chứa link ảnh từ các thuộc tính có thể có
                        const imgSrc = item.image || item.imageUrl || (item.images && item.images[0]) || '';
                        
                        // Kiểm tra xem chuỗi có thực sự bắt đầu bằng http:// hoặc https:// không (tránh text rác làm vỡ ảnh)
                        const isValidUrl = /^(http|https):\/\/[^\s]+$/i.test(imgSrc.trim());

                        const priceText = (item.price !== undefined && item.price !== null) ? currencyFormatter.format(item.price) : '-';

                        return (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-medium text-gray-700">{item.id}</td>
                                <td className="p-3">
                                    {isValidUrl ? (
                                        <img src={imgSrc} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                    ) : (
                                        <div className="w-16 h-16 bg-gray-100 flex items-center justify-center text-xs text-gray-500 rounded border border-gray-200">
                                            No Image
                                        </div>
                                    )}
                                </td>
                                <td className="p-3 text-gray-900 font-medium">{item.name}</td>
                                <td className="p-3 text-gray-600">{item.brand}</td>
                                <td className="p-3 text-gray-800">{priceText}</td>
                                <td className="p-3 space-x-2">
                                    <button className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition">
                                        Sửa
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(item.id)} 
                                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}