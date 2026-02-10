import { redirect } from 'next/navigation';

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function LegacyBlogRedirect({ params }: Props) {
    const { slug } = await params;

    // Simply redirect to root slug
    redirect(`/${slug}`);
}
