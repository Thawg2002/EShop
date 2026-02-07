'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { SHINE_COLORS, PRIMARY_BG } from '@/lib/constants';
import { getStaggerDelay } from '@/lib/utils';
import { PageLayout } from '@/components/layout/page-layout';
import { PageHeader } from '@/components/ui/page-header';
import { AnimatedCard } from '@/components/ui/animated-card';
import { CartItemComponent } from '@/components/features/cart-item';
import { BlurFade } from '@/components/magicui/blur-fade';
import { ShineBorder } from '@/components/magicui/shine-border';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { NumberTicker } from '@/components/magicui/number-ticker';

export default function CartPage() {
    const { items, getTotal } = useCartStore();
    const subtotal = getTotal();

    return (
        <PageLayout>
            <PageHeader title="Giỏ Hàng" subtitle={`${items.length} Sản Phẩm`} />

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                {/* Cart Items */}
                <div className="flex-1">
                    {items.length === 0 ? (
                        <BlurFade delay={0.2}>
                            <div className="text-center py-24">
                                <span className="material-symbols-outlined text-6xl text-primary/30 mb-6 block">shopping_bag</span>
                                <p className="text-sm text-muted-text dark:text-dark-text-secondary mb-8 font-serif-display">Giỏ hàng của bạn đang trống.</p>
                                <ShimmerButton className="text-white">
                                    <Link href="/shop">
                                        Tiếp Tục Mua Sắm
                                    </Link>
                                </ShimmerButton>
                            </div>
                        </BlurFade>
                    ) : (
                        <div className="space-y-8">
                            {items.map((item, idx) => (
                                <BlurFade key={item.id} delay={getStaggerDelay(idx)}>
                                    <CartItemComponent item={item} />
                                </BlurFade>
                            ))}
                        </div>
                    )}
                </div>

                {/* Order Summary */}
                {items.length > 0 && (
                    <BlurFade delay={0.3}>
                        <div className="lg:w-[420px] flex-shrink-0">
                            <ShineBorder
                                borderRadius={0}
                                borderWidth={1}
                                color={SHINE_COLORS}
                                className="w-full min-w-full p-0"
                            >
                                <div className="bg-off-white/50 dark:bg-dark-card/50 backdrop-blur-sm p-8 w-full">
                                    <h2 className="text-xs uppercase tracking-widest font-bold mb-8 text-dark-text dark:text-dark-text-primary">Tổng Đơn Hàng</h2>

                                    <div className="space-y-4 mb-8 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-text dark:text-dark-text-secondary">Tạm Tính</span>
                                            <span className="font-mono text-dark-text dark:text-dark-text-primary">${subtotal}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-text dark:text-dark-text-secondary">Vận Chuyển</span>
                                            <span className="text-primary font-medium">Miễn Phí</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-text dark:text-dark-text-secondary">Thuế</span>
                                            <span className="text-xs italic text-muted-text dark:text-dark-text-secondary">Tính tại thanh toán</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-black/5 dark:border-dark-border pt-6 mb-8">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs uppercase tracking-widest font-bold">Tổng Cộng</span>
                                            <span className="text-3xl font-light text-primary">
                                                $<NumberTicker value={subtotal} className="text-primary" />
                                            </span>
                                        </div>
                                    </div>

                                    <ShimmerButton
                                        className="w-full h-14 text-white"
                                        shimmerColor="#ffffff"
                                        background={PRIMARY_BG}
                                    >
                                        <span className="material-symbols-outlined text-lg mr-2">lock</span>
                                        Thanh Toán An Toàn
                                    </ShimmerButton>

                                    <div className="flex justify-center gap-6 text-[10px] uppercase tracking-widest text-muted-text dark:text-dark-text-secondary mt-6">
                                        <span className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm text-primary">verified</span>
                                            Bảo Mật SSL
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm text-primary">autorenew</span>
                                            Đổi Trả 30 Ngày
                                        </span>
                                    </div>
                                </div>
                            </ShineBorder>
                        </div>
                    </BlurFade>
                )}
            </div>
        </PageLayout>
    );
}
