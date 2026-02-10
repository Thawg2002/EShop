// components/seo/json-ld.tsx
import React from 'react';

interface OrganizationJsonLdProps {
    name?: string;
    url?: string;
    logo?: string;
    description?: string;
}

export function OrganizationJsonLd({
    name = 'XX.II Collective',
    url = 'https://xxii-collective.com',
    logo = 'https://xxii-collective.com/logo.png',
    description = 'Thời trang cao cấp & thiết kế vượt thời gian. Bộ sưu tập hiện đại cho phong cách sống tinh tế.',
}: OrganizationJsonLdProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name,
        url,
        logo,
        description,
        sameAs: [
            'https://facebook.com/xxiicollective',
            'https://instagram.com/xxiicollective',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            availableLanguage: ['Vietnamese', 'English'],
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface WebSiteJsonLdProps {
    name?: string;
    url?: string;
}

export function WebSiteJsonLd({
    name = 'XX.II Collective',
    url = 'https://xxii-collective.com',
}: WebSiteJsonLdProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name,
        url,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${url}/cua-hang?search={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface ProductJsonLdProps {
    name: string;
    description: string;
    image: string[];
    price: number;
    currency?: string;
    availability?: string;
    brand?: string;
    rating?: { average: number; count: number };
    url: string;
}

export function ProductJsonLd({
    name,
    description,
    image,
    price,
    currency = 'VND',
    availability = 'https://schema.org/InStock',
    brand = 'XX.II Collective',
    rating,
    url,
}: ProductJsonLdProps) {
    const schema: Record<string, any> = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        image,
        brand: {
            '@type': 'Brand',
            name: brand,
        },
        offers: {
            '@type': 'Offer',
            priceCurrency: currency,
            price: price.toString(),
            availability,
            url,
        },
    };

    if (rating && rating.count > 0) {
        schema.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: rating.average.toString(),
            reviewCount: rating.count.toString(),
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface BreadcrumbJsonLdProps {
    items: { name: string; url: string }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
