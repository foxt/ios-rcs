const RegionalIndicators = {
    A: '🇦',
    B: '🇧',
    C: '🇨',
    D: '🇩',
    E: '🇪',
    F: '🇫',
    G: '🇬',
    H: '🇭',
    I: '🇮',
    J: '🇯',
    K: '🇰',
    L: '🇱',
    M: '🇲',
    N: '🇳',
    O: '🇴',
    P: '🇵',
    Q: '🇶',
    R: '🇷',
    S: '🇸',
    T: '🇹',
    U: '🇺',
    V: '🇻',
    W: '🇼',
    X: '🇽',
    Y: '🇾',
    Z: '🇿'
} as Record<string,string>;

export const CountryCodes = {
    'AU': 'Australia',
    'BR': 'Brazil',
    'CN': 'China',
    'CO': 'Colombia',
    'DE': 'Germany',
    'EC': 'Ecuador',
    'FI': 'Finland',
    'FR': 'France',
    'GU': 'Guam',
    'ID': 'Indonesia',
    'IE': 'Ireland',
    'IN': 'India',
    'IT': 'Italy',
    'JM': 'Jamaica',
    'JP': 'Japan',
    'MO': 'Macau',
    'NL': 'Netherlands',
    'NO': 'Norway',
    'PR': 'Puerto Rico',
    'SE': 'Sweden',
    'TT': 'Trinidad and Tobago',
    'UG': 'Uganda',
    'US': 'United States',
    'VE': 'Venezuela',
    'VI': 'U.S. Virgin Islands',
    'WI': 'Worldwide'
} as Record<string,string>;

export const ReverseCountryCodes = Object.fromEntries(Object.entries(CountryCodes).map(([a,b]) => [b,a]));

export function getCountryFlag(country: string) {
    if (country == 'UK') return '🇬🇧';
    if (country == 'WI') return '🌐';
    return country.split('').map(a => RegionalIndicators[a.toUpperCase()] || a).join('');
}