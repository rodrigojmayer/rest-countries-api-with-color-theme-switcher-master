interface Currency {
  code?: string;
  name: string;
  symbol?: string;
}

// interface Country {
//   currencies?: { [key: string]: Currency };
//   // other fields...
// }


export interface Country {
    name: string
    nativeName?: string
    flags: {
        png: string
        svg: string
    }
    population: number
    region: string
    capital?: string
    subregion: string
    tld?: string[]
    // currencies?: { name: string }[] 
    currencies?: Currency[]
    languages?: { name: string }[]
    borders?: string[]
}