import { Metadata } from 'next';
import { AuthView } from '@/components/views/auth-view';

export const metadata: Metadata = {
    title: 'Đăng Ký',
    description: 'Trở thành thành viên của gia đình XX.II Collective. Nhận ưu đãi độc quyền và cập nhật những xu hướng thời trang mới nhất sớm nhất.',
    openGraph: {
        title: 'Đăng Ký | XX.II Collective',
        description: 'Tạo tài khoản mới.',
    },
};

export default function RegisterPage() {
    return <AuthView defaultMode="register" />;
}
