'use client';

import { SHINE_COLORS, PRIMARY_BG } from '@/lib/constants';
import { getStaggerDelay } from '@/lib/utils';
import { PageLayout } from '@/components/layout/page-layout';
import { PageHeader } from '@/components/ui/page-header';
import { BlurFade } from '@/components/magicui/blur-fade';
import { ShineBorder } from '@/components/magicui/shine-border';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';

const CONTACT_INFO = [
    { icon: 'location_on', title: 'Địa Chỉ', content: '123 Đường Nguyễn Huệ\nQuận 1, TP. Hồ Chí Minh' },
    { icon: 'phone', title: 'Điện Thoại', content: '+84 28 1234 5678' },
    { icon: 'mail', title: 'Email', content: 'hello@xxii-collective.com' },
    { icon: 'schedule', title: 'Giờ Làm Việc', content: 'Thứ 2 - Thứ 7: 9:00 - 21:00\nChủ Nhật: 10:00 - 18:00' },
];

export default function ContactPage() {
    return (
        <PageLayout>
            <PageHeader
                title={<AnimatedGradientText>Liên Hệ Với Chúng Tôi</AnimatedGradientText>}
                subtitle="Chúng tôi luôn sẵn sàng hỗ trợ bạn"
                align="center"
            />

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Contact Info */}
                <div className="space-y-6">
                    {CONTACT_INFO.map((info, idx) => (
                        <BlurFade key={info.title} delay={getStaggerDelay(idx, 0.2)}>
                            <ShineBorder
                                borderRadius={0}
                                borderWidth={1}
                                color={SHINE_COLORS}
                                className="w-full min-w-full p-0"
                            >
                                <div className="bg-white dark:bg-dark-card p-6 flex items-start gap-4">
                                    <span className="material-symbols-outlined text-primary text-2xl">{info.icon}</span>
                                    <div>
                                        <h3 className="text-xs uppercase tracking-widest font-bold text-dark-text dark:text-dark-text-primary mb-2">{info.title}</h3>
                                        <p className="text-sm text-muted-text dark:text-dark-text-secondary whitespace-pre-line">{info.content}</p>
                                    </div>
                                </div>
                            </ShineBorder>
                        </BlurFade>
                    ))}
                </div>

                {/* Contact Form */}
                <BlurFade delay={0.4}>
                    <ShineBorder
                        borderRadius={0}
                        borderWidth={1}
                        color={SHINE_COLORS}
                        className="w-full min-w-full p-0"
                    >
                        <div className="bg-off-white/50 dark:bg-dark-card/50 p-8">
                            <h2 className="text-xs uppercase tracking-widest font-bold mb-8 text-dark-text dark:text-dark-text-primary">Gửi Tin Nhắn</h2>

                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-[11px] uppercase tracking-widest text-muted-text dark:text-dark-text-secondary block mb-2">Họ và Tên</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-200 dark:border-dark-border dark:bg-dark-card rounded px-4 py-3 text-sm focus:ring-primary focus:border-primary"
                                            placeholder="Nguyễn Văn An"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] uppercase tracking-widest text-muted-text dark:text-dark-text-secondary block mb-2">Email</label>
                                        <input
                                            type="email"
                                            className="w-full border border-gray-200 dark:border-dark-border dark:bg-dark-card rounded px-4 py-3 text-sm focus:ring-primary focus:border-primary"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[11px] uppercase tracking-widest text-muted-text dark:text-dark-text-secondary block mb-2">Chủ Đề</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-200 dark:border-dark-border dark:bg-dark-card rounded px-4 py-3 text-sm focus:ring-primary focus:border-primary"
                                        placeholder="Tôi cần hỗ trợ về..."
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] uppercase tracking-widest text-muted-text dark:text-dark-text-secondary block mb-2">Tin Nhắn</label>
                                    <textarea
                                        rows={5}
                                        className="w-full border border-gray-200 dark:border-dark-border dark:bg-dark-card rounded px-4 py-3 text-sm focus:ring-primary focus:border-primary resize-none"
                                        placeholder="Nội dung tin nhắn..."
                                    />
                                </div>
                                <ShimmerButton
                                    type="submit"
                                    className="w-full h-14 text-white"
                                    shimmerColor="#ffffff"
                                    background={PRIMARY_BG}
                                >
                                    <span className="material-symbols-outlined text-lg mr-2">send</span>
                                    Gửi Tin Nhắn
                                </ShimmerButton>
                            </form>
                        </div>
                    </ShineBorder>
                </BlurFade>
            </div>
        </PageLayout>
    );
}
