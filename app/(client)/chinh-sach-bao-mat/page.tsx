import { PageLayout } from '@/components/layout/page-layout';
import { Section } from '@/components/ui/section';

// Server Component for SEO
export default function PrivacyPolicyPage() {
    return (
        <PageLayout>
            <Section className="py-20">
                <h1 className="text-6xl md:text-8xl font-serif font-medium text-zinc-950 dark:text-zinc-50 mb-16 tracking-tight leading-[0.9]">
                    Chính Sách <br /> <span className="italic opacity-30">Quyền Riêng Tư</span>
                </h1>

                <div className="prose prose-zinc prose-lg dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 space-y-8">
                    <p className="text-lg font-bold tracking-tight">
                        Chào mừng bạn đến với <strong>XX.II Collective</strong>. Chúng tôi tôn trọng quyền riêng tư của bạn và cam kết bảo vệ thông tin cá nhân của bạn. Chính sách quyền riêng tư này sẽ cho bạn biết cách chúng tôi chăm sóc dữ liệu cá nhân của bạn khi bạn truy cập trang web của chúng tôi và cho bạn biết về quyền riêng tư của bạn cũng như cách luật pháp bảo vệ bạn.
                    </p>

                    <h2 className="text-3xl font-serif font-medium text-zinc-950 dark:text-zinc-50 mt-16 mb-8 tracking-tight">
                        1. Thông tin chúng tôi thu thập
                    </h2>
                    <p>
                        Chúng tôi có thể thu thập, sử dụng, lưu trữ và chuyển giao các loại dữ liệu cá nhân khác nhau về bạn bao gồm:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Dữ liệu Danh tính: Tên, tên người dùng.</li>
                        <li>Dữ liệu Liên hệ: Địa chỉ email, số điện thoại.</li>
                    </ul>

                    <h2 className="text-3xl font-serif font-medium text-zinc-950 dark:text-zinc-50 mt-16 mb-8 tracking-tight">
                        2. Cách chúng tôi sử dụng dữ liệu của bạn
                    </h2>
                    <p>
                        Chúng tôi chỉ sử dụng dữ liệu cá nhân của bạn khi luật pháp cho phép. Thông thường nhất, chúng tôi sẽ sử dụng dữ liệu cá nhân của bạn trong các trường hợp sau:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Để cung cấp dịch vụ và nội dung bạn yêu cầu.</li>
                        <li>Để cải thiện trang web và trải nghiệm người dùng của chúng tôi.</li>
                    </ul>

                    <p className="mt-16 text-sm font-bold uppercase tracking-widest text-zinc-400">
                        Cập nhật lần cuối: 08 Tháng 2, 2026.
                    </p>
                </div>
            </Section>
        </PageLayout>
    );
}
