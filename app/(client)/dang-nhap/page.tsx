import { Metadata } from 'next';
import { AuthView } from '@/components/views/auth-view';

export const metadata: Metadata = {
    title: 'Đăng Nhập',
    description: 'Đăng nhập vào tài khoản XX.II Collective của bạn để quản lý đơn hàng và nhận ưu đãi đặc quyền.',
    openGraph: {
        title: 'Đăng Nhập | XX.II Collective',
        description: 'Đăng nhập thành viên.',
    },
};

export default function LoginPage() {
    return <AuthView defaultMode="login" />;
}
