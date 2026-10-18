export type Category = "Pizzas" | "Sides" | "Drinks" | "Desserts" | "Deals";
export type Filter = "All" | Category;

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  tag?: string;
  category: Category;
  image: string;
  popularity: number;
  veg: boolean;
};

export const categories: Filter[] = [
  "All",
  "Pizzas",
  "Sides",
  "Drinks",
  "Desserts",
  "Deals",
];

export const DELIVERY_FEE = 199;
export const FREE_DELIVERY_THRESHOLD = 3000;

const img = (photo: string, width = 1000) =>
  `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${width}&q=85`;

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "The Firestarter",
    description: "Spicy pepperoni, mozzarella, hot honey.",
    price: 1499,
    tag: "BESTSELLER",
    category: "Pizzas",
    image: img("photo-1628840042765-356cda07504e"),
    popularity: 98,
    veg: false,
  },
  {
    id: 2,
    name: "Garden State",
    description: "Fresh basil, cherry tomatoes, creamy mozzarella.",
    price: 1299,
    tag: "VEGETARIAN",
    category: "Pizzas",
    image: img("photo-1574071318508-1cdbab80d002"),
    popularity: 86,
    veg: true,
  },
  {
    id: 3,
    name: "Smoky BBQ",
    description: "Smoky BBQ sauce, tender chicken, red onion.",
    price: 1599,
    tag: "HOUSE FAVOURITE",
    category: "Pizzas",
    image: img("photo-1513104890138-7c749659a591"),
    popularity: 92,
    veg: false,
  },
  {
    id: 4,
    name: "Truffle Garden",
    description: "Mushrooms, mozzarella, herbs and truffle oil.",
    price: 1699,
    tag: "A LITTLE FANCY",
    category: "Pizzas",
    image: img("photo-1593560708920-61dd98c46a4e"),
    popularity: 74,
    veg: true,
  },
  {
    id: 5,
    name: "Margherita Classica",
    description: "San Marzano tomato, fior di latte, fresh basil.",
    price: 1199,
    category: "Pizzas",
    image: img("photo-1604382354936-07c5d9983bd3"),
    popularity: 80,
    veg: true,
  },
  {
    id: 6,
    name: "Chicken Tikka Blaze",
    description: "Tandoori chicken tikka, green chilli, mint drizzle.",
    price: 1549,
    tag: "DESI FIRE",
    category: "Pizzas",
    image: img("photo-1594007654729-407eedc4be65"),
    popularity: 95,
    veg: false,
  },
  {
    id: 7,
    name: "Garlic Dough Balls",
    description: "Warm dough bites, garlic butter, parmesan dust.",
    price: 599,
    category: "Sides",
    image: img("photo-1619531040576-f9416740661b"),
    popularity: 70,
    veg: true,
  },
  {
    id: 8,
    name: "Crispy Fire Wings",
    description: "Six wings glazed in our house hot sauce.",
    price: 899,
    tag: "SPICY",
    category: "Sides",
    image: img("photo-1608039755401-742074f0548d"),
    popularity: 88,
    veg: false,
  },
  {
    id: 9,
    name: "Loaded Fries",
    description: "Skin-on fries, cheese sauce, jalapeño, herbs.",
    price: 649,
    category: "Sides",
    image: img("photo-1573080496219-bb080dd4f877"),
    popularity: 76,
    veg: true,
  },
  {
    id: 10,
    name: "Mint Lemonade",
    description: "Fresh lemon, crushed mint, a pinch of salt.",
    price: 349,
    category: "Drinks",
    image: img("photo-1621263764928-df1444c5e859"),
    popularity: 84,
    veg: true,
  },
  {
    id: 11,
    name: "Chilled Craft Cola",
    description: "Ice-cold cola in a glass bottle.",
    price: 249,
    category: "Drinks",
    image: img("photo-1622483767028-3f66f32aef97"),
    popularity: 60,
    veg: true,
  },
  {
    id: 12,
    name: "Molten Brownie",
    description: "Warm chocolate brownie with a gooey centre.",
    price: 499,
    tag: "SWEET FINISH",
    category: "Desserts",
    image: img("photo-1606313564200-e75d5e30476c"),
    popularity: 82,
    veg: true,
  },
  {
    id: 13,
    name: "Nutella Calzone",
    description: "Folded fire-baked dough, Nutella, icing sugar.",
    price: 699,
    category: "Desserts",
    image: img("photo-1551024601-bec78aea704b"),
    popularity: 78,
    veg: true,
  },
  {
    id: 14,
    name: "Family Fire Feast",
    description: "2 large pizzas, 6 wings, dough balls and a 1.5L drink.",
    price: 3299,
    tag: "SAVE Rs. 600",
    category: "Deals",
    image: img("photo-1590947132387-155cc02f3212"),
    popularity: 90,
    veg: false,
  },
  {
    id: 15,
    name: "Duo Night Deal",
    description: "2 medium pizzas, loaded fries and 2 lemonades.",
    price: 2399,
    tag: "FOR TWO",
    category: "Deals",
    image: img("photo-1595854341625-f33ee10dbf94"),
    popularity: 85,
    veg: false,
  },
];