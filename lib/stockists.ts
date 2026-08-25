export type StockistRegion = 'Europe' | 'North America' | 'Asia-Pacific'

export type Stockist = {
  name: string
  city: string
  region: StockistRegion
  address: string
}

/* Placeholder directory — entries are illustrative until the confirmed
   stockist list is finalized with each boutique. */
export const stockists: Stockist[] = [
  {
    name: 'Maison Verte Apothecary',
    city: 'Paris, France',
    region: 'Europe',
    address: '18 Rue de Sévigné, 75004 Paris',
  },
  {
    name: 'Apothek am Lindenbaum',
    city: 'Berlin, Germany',
    region: 'Europe',
    address: 'Kastanienallee 42, 10435 Berlin',
  },
  {
    name: 'The Still Room',
    city: 'London, United Kingdom',
    region: 'Europe',
    address: '7 Chiltern Street, Marylebone, London W1U',
  },
  {
    name: 'Salone di Bellezza Novecento',
    city: 'Milan, Italy',
    region: 'Europe',
    address: 'Via Solferino 11, 20121 Milano',
  },
  {
    name: 'Meridian Beauty Hall',
    city: 'New York, USA',
    region: 'North America',
    address: '412 Bleecker Street, New York, NY 10014',
  },
  {
    name: 'Atelier Cinq Rues',
    city: 'Montréal, Canada',
    region: 'North America',
    address: '215 Rue Bernard O, Montréal QC H2T',
  },
  {
    name: 'Juniper & Fern',
    city: 'San Francisco, USA',
    region: 'North America',
    address: '1846 Union Street, San Francisco, CA 94123',
  },
  {
    name: 'Kōyō Select Shop',
    city: 'Tokyo, Japan',
    region: 'Asia-Pacific',
    address: '2-7-5 Jingūmae, Shibuya City, Tokyo 150-0001',
  },
  {
    name: 'The Hourglass Boutique',
    city: 'Sydney, Australia',
    region: 'Asia-Pacific',
    address: '44A Glenmore Road, Paddington NSW 2021',
  },
  {
    name: 'Verre & Sel',
    city: 'Copenhagen, Denmark',
    region: 'Europe',
    address: 'Store Kongensgade 62, 1264 København K',
  },
]

export const stockistRegions: ('All' | StockistRegion)[] = ['All', 'Europe', 'North America', 'Asia-Pacific']
