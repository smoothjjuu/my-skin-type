export interface SkinTypeData {
    type: string;
    description: string;
    recommendations: string[];
    koreanProducts: {
        category: string;
        name: string;
        link: string;
    }[];
}

export const SKIN_TYPE_RESULTS: Record<string, SkinTypeData> = {
    'Sensitive': {
        type: 'Sensitive Skin',
        description: 'Your skin is reactive and prone to irritation, redness, or stinging.',
        recommendations: [
            'Choose fragrance-free, hypoallergenic products.',
            'Look for calming ingredients like Aloe, Chamomile, or Centella Asiatica.',
            'Simplify your routine to minimize irritation.',
            'Always patch test new products.'
        ],
        koreanProducts: [
            { category: 'Moisturizer', name: 'Etude House SoonJung 2x Barrier Intensive Cream', link: 'https://www.amazon.com/s?k=Etude+House+SoonJung+2x+Barrier+Intensive+Cream' },
            { category: 'Toner', name: 'COSRX Centella Water Alcohol-Free Toner', link: 'https://www.amazon.com/s?k=COSRX+Centella+Water+Alcohol-Free+Toner' },
            { category: 'Serum', name: 'Purito Centella Unscented Serum', link: 'https://www.amazon.com/s?k=Purito+Centella+Unscented+Serum' }
        ]
    },
    'Dry': {
        type: 'Dry Skin',
        description: 'Your skin lacks oil and moisture. It may feel tight, rough, or flaky.',
        recommendations: [
            'Use a rich, cream-based moisturizer.',
            'Incorporate Hyaluronic Acid serums.',
            'Avoid harsh foaming cleansers; opt for creamy ones.',
            'Gentle exfoliation (lactic acid) once a week.'
        ],
        koreanProducts: [
            { category: 'Essence', name: 'COSRX Advanced Snail 96 Mucin Power Essence', link: 'https://www.amazon.com/s?k=COSRX+Advanced+Snail+96+Mucin+Power+Essence' },
            { category: 'Moisturizer', name: 'Laneige Water Bank Blue Hyaluronic Cream', link: 'https://www.amazon.com/s?k=Laneige+Water+Bank+Blue+Hyaluronic+Cream' },
            { category: 'Mask', name: 'Abib Gummy Sheet Mask Milk Sticker', link: 'https://www.amazon.com/s?k=Abib+Gummy+Sheet+Mask+Milk+Sticker' }
        ]
    },
    'Oily': {
        type: 'Oily Skin',
        description: 'Your skin produces excess sebum, leading to shine and potential breakouts.',
        recommendations: [
            'Use a lightweight gel moisturizer.',
            'Look for "non-comedogenic" or "oil-free" labels.',
            'Salicylic acid (BHA) helps keep pores clear.',
            'Clay masks can help absorb excess oil.'
        ],
        koreanProducts: [
            { category: 'Toner', name: 'Isntree Green Tea Fresh Toner', link: 'https://www.amazon.com/s?k=Isntree+Green+Tea+Fresh+Toner' },
            { category: 'Mask', name: 'Innisfree Super Volcanic Pore Clay Mask 2X', link: 'https://www.amazon.com/s?k=Innisfree+Super+Volcanic+Pore+Clay+Mask+2X' },
            { category: 'Moisturizer', name: 'Rovectin Clean Lotus Water Cream', link: 'https://www.amazon.com/s?k=Rovectin+Clean+Lotus+Water+Cream' }
        ]
    },
    'Combination': {
        type: 'Combination Skin',
        description: 'You have oily areas (T-zone) and dry/normal areas (cheeks).',
        recommendations: [
            'Use a gentle foaming cleanser.',
            'Multi-mask: clay on T-zone, hydrating mask on cheeks.',
            'Lightweight lotions work best.',
            'Spot treat imperfections rather than treating the whole face.'
        ],
        koreanProducts: [
            { category: 'Sunscreen', name: 'Beauty of Joseon Relief Sun: Rice + Probiotics', link: 'https://www.amazon.com/s?k=Beauty+of+Joseon+Relief+Sun' },
            { category: 'Toner', name: 'Klairs Supple Preparation Unscented Toner', link: 'https://www.amazon.com/s?k=Klairs+Supple+Preparation+Unscented+Toner' },
            { category: 'Ampoule', name: 'Skin1004 Madagascar Centella Ampoule', link: 'https://www.amazon.com/s?k=Skin1004+Madagascar+Centella+Ampoule' }
        ]
    },
    'Normal': {
        type: 'Normal Skin',
        description: 'Your skin is well-balanced, not too oily or too dry.',
        recommendations: [
            'Maintain balance with a standard gentle cleanser.',
            'Use a daily moisturizer with SPF.',
            'Vitamin C serums for radiance.',
            'Retinol at night for anti-aging.'
        ],
        koreanProducts: [
            { category: 'Cleanser', name: 'Banila Co Clean It Zero Cleansing Balm', link: 'https://www.amazon.com/s?k=Banila+Co+Clean+It+Zero+Cleansing+Balm' },
            { category: 'Serum', name: 'Sulwhasoo First Care Activating Serum', link: 'https://www.amazon.com/s?k=Sulwhasoo+First+Care+Activating+Serum' },
            { category: 'Toner', name: 'Laneige Cream Skin Refiner', link: 'https://www.amazon.com/s?k=Laneige+Cream+Skin+Refiner' }
        ]
    }
};
