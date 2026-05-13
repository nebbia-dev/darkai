'use server'
import {createClient} from "@/lib/supabase/serverSU";

export default async function findShippingFees(country:string) {
    let fee;
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

    const supabase = await createClient();
    let { data, error } = await supabase
        .from('Shipping_Fees')
        .select('*');

        if(noShipping.includes(country)) {
            fee = null;
        } else if(europe.includes(country)) {
            fee = data?.filter(el => el.zone === 'europe')[0].price;
        } else if(uk.includes(country)) {
            fee = data?.filter(el => el.zone === 'uk')[0].price;
        } else if(us.includes(country)) {
            fee = data?.filter(el => el.zone === 'us')[0].price;
        } else if(canada.includes(country)) {
            fee = data?.filter(el => el.zone === 'canada')[0].price;
        } else if(internationalZero.includes(country)) {
            fee = data?.filter(el => el.zone === 'internationalZero')[0].price;
        } else if(internationalOne.includes(country)) {
            fee = data?.filter(el => el.zone === 'internationalOne')[0].price;
        } else {
            fee = data?.filter(el => el.zone === 'internationalTwo')[0].price;
        }
    return fee;
}