export default function findShippingFees(country:string) {
    const noShipping = [
        'Iran',
        'Palestine',
        'Ukraine',
        'Russia',
        'North Korea',
        'Türkiye',
        'Syria',
        'Sudan'
    ]
    const europe = [
        'Austria',
        'Belgium',
        'Bulgaria',
        'Croatia',
        'Cyprus',
        'Czechia',
        'Denmark',
        'Estonia',
        'Finland',
        'France',
        'Germany',
        'Greece',
        'Hungary',
        'Ireland',
        'Italy',
        'Latvia',
        'Lithuania',
        'Luxembourg',
        'Malta',
        'Netherlands',
        'Poland',
        'Portugal',
        'Romania',
        'Slovakia',
        'Slovenia',
        'Spain',
        'Sweden'
    ];
    const uk = ['United Kingdom'];
    const us = ['United States'];
    const canada = ['Canada'];
    const internationalZero = [
        'Switzerland',
        'Andorra',
        'Bosnia & Herzegovina',
        'Iceland', 'Moldova',
        'North Macedonia',
        'Serbia',
        'Ukraine',
        'Norway',
        'Monaco',
        'Montenegro',
        'San Marino',
        'Albania',
        'Vatican City',
        'Liechtenstein'];
    const internationalOne = [
        'Australia',
        'Hong Kong',
        'Israel',
        'Japan',
        'Malaysia',
        'New Zealand',
        'Singapore',
        'South Korea',
        'United Arab Emirates',
        'Belarus',
    ];

    if(noShipping.includes(country)) {
        return null;
    } else if(europe.includes(country)) {
        return 25;
    } else if(uk.includes(country)) {
        return 55;
    } else if(us.includes(country)) {
        return 50;
    } else if(canada.includes(country)) {
        return 55;
    } else if(internationalZero.includes(country)) {
        return 45;
    } else if(internationalOne.includes(country)) {
        return 60;
    } else {
        return 55;
    }

}