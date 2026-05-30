// Data model for RetrieverRoutes tours and trips (Pricing updated to INR)
export const tripsData = [
  {
    id: 'bali-adventure',
    title: 'Bali Adventure',
    location: 'Bali, Indonesia',
    duration: '7 Days',
    durationDays: 7,
    groupSize: '2-10 People',
    difficulty: 'Moderate',
    price: 74999,
    rating: 4.8,
    reviewsCount: 120,
    categories: ['Beach', 'Adventure', 'Popular'],
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    description: 'Experience the perfect blend of culture, adventure and relaxation in the beautiful island of Bali. Hike up Mount Batur at sunrise, explore sacred water temples, and surf the pristine waves of Uluwatu.',
    highlights: [
      'Visit iconic temples and cultural sites',
      'Explore stunning beaches and hidden waterfalls',
      'Enjoy local organic cuisine and luxury spas',
      'Exciting adventure activities including white-water rafting'
    ],
    inclusions: {
      hotels: true,
      meals: true,
      transport: true,
      guide: true,
      activities: true
    }
  },
  {
    id: 'maldives-paradise',
    title: 'Maldives Paradise',
    location: 'Male, Maldives',
    duration: '5 Days',
    durationDays: 5,
    groupSize: '2-6 People',
    difficulty: 'Easy',
    price: 99999,
    rating: 4.9,
    reviewsCount: 85,
    categories: ['Beach', 'Popular'],
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    description: 'Escape to a secluded overwater bungalow paradise. Snorkel in crystal clear turquoise lagoons, swim with majestic manta rays, and enjoy private candlelit dinners on powdery white sand beaches.',
    highlights: [
      'Stay in premium 5-star overwater villas',
      'Private sunset dolphin-watching yacht cruise',
      'Guided coral reef snorkeling and diving tours',
      'All-inclusive fine dining and tropical cocktails'
    ],
    inclusions: {
      hotels: true,
      meals: true,
      transport: true,
      guide: false,
      activities: true
    }
  },
  {
    id: 'swiss-alps-trek',
    title: 'Swiss Alps Trek',
    location: 'Zermatt, Switzerland',
    duration: '6 Days',
    durationDays: 6,
    groupSize: '4-12 People',
    difficulty: 'Hard',
    price: 149999,
    rating: 4.7,
    reviewsCount: 95,
    categories: ['Mountains', 'Adventure', 'Popular'],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    description: 'Challenge yourself with guided hikes through the spectacular snow-capped peaks of the Swiss Alps. Witness the iconic Matterhorn, pass by crystalline alpine lakes, and stay in authentic cozy mountain huts.',
    highlights: [
      'Trek with breathtaking views of the Matterhorn',
      'Stay in authentic Swiss alpine lodges',
      'Glacier walk with professional climbing guides',
      'Relax with warm fondue and Swiss chocolates'
    ],
    inclusions: {
      hotels: true,
      meals: true,
      transport: true,
      guide: true,
      activities: false
    }
  },
  {
    id: 'iceland-aurora',
    title: 'Iceland Northern Lights',
    location: 'Reykjavik, Iceland',
    duration: '6 Days',
    durationDays: 6,
    groupSize: '2-8 People',
    difficulty: 'Moderate',
    price: 124999,
    rating: 4.8,
    reviewsCount: 76,
    categories: ['Adventure', 'Mountains'],
    image: 'https://images.unsplash.com/photo-1483168527879-c66136b56105?auto=format&fit=crop&w=800&q=80',
    description: 'Chase the ethereal Aurora Borealis under the dark sub-arctic skies. Tour the famous Golden Circle, trek across spectacular ancient glaciers, soak in geothermal hot springs, and explore magical ice caves.',
    highlights: [
      'Guided nightly hunts for the Aurora Borealis',
      'Bathe in the famous Blue Lagoon geothermal waters',
      'Explore deep electric-blue crystal ice caves',
      'Walk alongside black sand beaches and towering waterfalls'
    ],
    inclusions: {
      hotels: true,
      meals: false,
      transport: true,
      guide: true,
      activities: true
    }
  },
  {
    id: 'icebal-luxury',
    title: 'Icebal Luxury',
    location: 'Svalbard, Norway',
    duration: '4 Days',
    durationDays: 4,
    groupSize: '2-4 People',
    difficulty: 'Easy',
    price: 189999,
    rating: 4.6,
    reviewsCount: 45,
    categories: ['Mountains', 'Popular'],
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
    description: 'Experience Arctic luxury at its absolute finest. Cozy up in a high-end glass igloo looking out at the polar sky, ride through majestic snowscapes on a husky-drawn sled, and dine on custom-crafted Nordic delicacies.',
    highlights: [
      'Sleep under starry skies in a heated luxury glass igloo',
      'Adventurous dog-sledding safari through snowy valleys',
      'Private Arctic snowmobile trek under the midnight sun',
      'Gourmet tasting menu prepared by an award-winning chef'
    ],
    inclusions: {
      hotels: true,
      meals: true,
      transport: true,
      guide: true,
      activities: true
    }
  },
  {
    id: 'thailand-escape',
    title: 'Thailand Escape',
    location: 'Phuket & Phi Phi, Thailand',
    duration: '7 Days',
    durationDays: 7,
    groupSize: '2-15 People',
    difficulty: 'Easy',
    price: 59999,
    rating: 4.7,
    reviewsCount: 112,
    categories: ['Beach', 'City'],
    image: 'https://images.unsplash.com/photo-1528181304800-2f1908c39522?auto=format&fit=crop&w=800&q=80',
    description: 'Immerse yourself in the vibrant colors and warm hospitality of Thailand. Explore golden Buddhist temples, sail around limestone karst cliffs in Phang Nga Bay, and sample legendary street foods in bustling night markets.',
    highlights: [
      'Speedboat tour of the stunning Phi Phi Islands',
      'Visit beautiful sacred temples and the Big Buddha',
      'Authentic Thai cooking masterclass with a local chef',
      'Traditional Thai massage and ocean-front yoga'
    ],
    inclusions: {
      hotels: true,
      meals: true,
      transport: true,
      guide: true,
      activities: true
    }
  },
  {
    id: 'machu-picchu',
    title: 'Machu Picchu Expedition',
    location: 'Cusco, Peru',
    duration: '8 Days',
    durationDays: 8,
    groupSize: '4-10 People',
    difficulty: 'Hard',
    price: 169999,
    rating: 4.9,
    reviewsCount: 150,
    categories: ['Mountains', 'Adventure', 'Popular'],
    image: 'https://images.unsplash.com/photo-1509024644558-2f56ce76c490?auto=format&fit=crop&w=800&q=80',
    description: 'Walk the historic, cobblestone Inca Trail to the legendary citadel of Machu Picchu. Climb through misty cloud forests, scale dramatic high mountain passes, and witness the sunrise over the ancient citadel ruins.',
    highlights: [
      'Trek the classic Inca Trail with expert native Quechua guides',
      'Explore Cusco\'s vibrant culture and historic ruins',
      'Witness the breathtaking sunrise over Machu Picchu',
      'Scenic expedition train journey back through the Andes'
    ],
    inclusions: {
      hotels: true,
      meals: true,
      transport: true,
      guide: true,
      activities: true
    }
  }
];
