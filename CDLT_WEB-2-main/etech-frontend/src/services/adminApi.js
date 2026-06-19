import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin/products';

// Nhớ phải có chữ "export" ở ngay đầu dòng này bạn nhé!
export const adminApi = {
    // Gọi API lấy danh sách (TRUY VẤN)
    getAllProducts: () => axios.get(API_URL),
    
    // Gửi dữ liệu tạo mới (THÊM)
    createProduct: (productData) => axios.post(API_URL, productData),
    
    // Gửi dữ liệu cập nhật (SỬA)
    updateProduct: (id, productData) => axios.put(`${API_URL}/${id}`, productData),
    
    // Gọi lệnh xóa (XÓA)
    deleteProduct: (id) => axios.delete(`${API_URL}/${id}`)
};