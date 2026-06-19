import  { useState } from 'react';
import { adminApi } from '../../../services/adminApi';

export default function ProductAddForm() {
    const [product, setProduct] = useState({ name: '', brand: '', description: '' });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    // XỬ LÝ THÊM MỚI KHI SUBMIT FORM
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await adminApi.createProduct(product);
            alert("Thêm sản phẩm thành công!");
            setProduct({ name: '', brand: '', description: '' }); // Reset form
        } catch (error) {
            console.error(error);
            alert("Lỗi thêm mới sản phẩm!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg p-6 bg-white rounded-lg shadow-md space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Thêm Thiết Bị Công Nghệ Mới</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700">Tên máy</label>
                <input type="text" name="name" value={product.name} onChange={handleChange} required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Hãng sản xuất</label>
                <input type="text" name="brand" value={product.brand} onChange={handleChange} required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Mô tả chi tiết</label>
                <textarea name="description" value={product.description} onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" rows="3" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 font-medium">
                Lưu Vào Hệ Thống
            </button>
        </form>
    );
}