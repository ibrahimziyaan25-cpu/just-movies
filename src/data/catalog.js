const legalDemoVideo = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

export const catalog = [
  {
    id: 'obsession', title: 'Obsession', type: 'movie', genre: 'Thriller', country: 'United States', year: 2026, quality: 'HD', rating: '7.1', duration: '1h 42m',
    poster: '/posters/obsession.svg', backdrop: '/backdrops/obsession.svg',
    description: 'After a mysterious wish changes everything, a quiet student realizes that some dreams come with dangerous secrets.',
    cast: ['Ayaan Haleem', 'Nisha Ray', 'Darin Cole'], director: 'M. Rayan'
  },
  {
    id: 'peddi', title: 'Peddi', type: 'movie', genre: 'Action', country: 'India', year: 2026, quality: 'HD', rating: '7.8', duration: '2h 21m',
    poster: '/posters/peddi.svg', backdrop: '/backdrops/peddi.svg',
    description: 'A fearless village fighter steps into a deadly tournament to protect the people he loves.',
    cast: ['Rahul Dev', 'Mira Iyer'], director: 'Arun K.'
  },
  {
    id: 'mummy', title: 'The Mummy', type: 'movie', genre: 'Adventure', country: 'United Kingdom', year: 2025, quality: 'HD', rating: '6.9', duration: '1h 58m',
    poster: '/posters/mummy.svg', backdrop: '/backdrops/mummy.svg',
    description: 'A lost expedition wakes an ancient guardian beneath the desert and must escape before sunrise.',
    cast: ['Lara Moon', 'Hassan Grey'], director: 'D. Cross'
  },
  {
    id: 'kara', title: 'Kara', type: 'movie', genre: 'Drama', country: 'Sri Lanka', year: 2026, quality: 'HD', rating: '7.3', duration: '1h 35m',
    poster: '/posters/kara.svg', backdrop: '/backdrops/kara.svg',
    description: 'A young inventor rebuilds an old radio and starts receiving messages from a future disaster.',
    cast: ['Kavi Silva', 'Tara Jay'], director: 'S. Jayawardene'
  },
  {
    id: 'space-ranger', title: 'Space Ranger', type: 'movie', genre: 'Sci-Fi', country: 'United States', year: 2026, quality: 'HD', rating: '8.0', duration: '2h 03m',
    poster: '/posters/space-ranger.svg', backdrop: '/backdrops/space-ranger.svg',
    description: 'A lone ranger travels through broken galaxies to stop a stolen energy core from destroying a colony.',
    cast: ['Evan Star', 'Mila Voss'], director: 'J. Nova'
  },
  {
    id: 'galaxy-quest', title: 'Galaxy Quest', type: 'movie', genre: 'Animation', country: 'Japan', year: 2026, quality: 'HD', rating: '7.6', duration: '1h 49m',
    poster: '/posters/galaxy-quest.svg', backdrop: '/backdrops/galaxy-quest.svg',
    description: 'A group of tiny heroes accidentally open a portal and turn a normal arcade night into an interstellar quest.',
    cast: ['Riku Tanaka', 'Maya Lin'], director: 'Ken Ori'
  },
  {
    id: 'green-shade', title: 'In the Grey', type: 'movie', genre: 'Crime', country: 'United States', year: 2025, quality: 'HD', rating: '6.8', duration: '1h 53m',
    poster: '/posters/green-shade.svg', backdrop: '/backdrops/green-shade.svg',
    description: 'Two agents stuck on opposite sides of the law must work together when a secret file disappears.',
    cast: ['Omar King', 'Rhea Sun'], director: 'L. Hayes'
  },
  {
    id: 'punisher', title: 'Dark Agent', type: 'movie', genre: 'Action', country: 'United States', year: 2024, quality: 'HD', rating: '7.4', duration: '2h 02m',
    poster: '/posters/punisher.svg', backdrop: '/backdrops/punisher.svg',
    description: 'An ex-operative returns for one last mission after his old team is framed for a citywide attack.',
    cast: ['Mark Vale', 'Nora Flint'], director: 'C. Wolfe'
  },
  {
    id: 'masters', title: 'Masters of the Realm', type: 'movie', genre: 'Fantasy', country: 'United States', year: 2026, quality: 'HD', rating: '7.9', duration: '2h 11m',
    poster: '/posters/masters.svg', backdrop: '/backdrops/masters.svg',
    description: 'A prince and a rebel pilot unite to defend their realm from an army powered by forbidden magic.',
    cast: ['Leo Ash', 'Tina Storm'], director: 'P. River'
  },
  {
    id: 'backrooms', title: 'Backrooms', type: 'movie', genre: 'Horror', country: 'Canada', year: 2025, quality: 'HD', rating: '6.5', duration: '1h 31m',
    poster: '/posters/backrooms.svg', backdrop: '/backdrops/backrooms.svg',
    description: 'A group of friends enter a never-ending office maze where every hallway repeats and every sound matters.',
    cast: ['Eli Stone', 'Mina Hart'], director: 'J. Vale'
  },
  {
    id: 'hokum', title: 'Hokum', type: 'movie', genre: 'Mystery', country: 'Indonesia', year: 2026, quality: 'HD', rating: '7.2', duration: '1h 48m',
    poster: '/posters/hokum.svg', backdrop: '/backdrops/hokum.svg',
    description: 'A detective follows an impossible clue that points to a crime which has not happened yet.',
    cast: ['Adi Rama', 'Lina Putri'], director: 'B. Satria'
  },
  {
    id: 'scary', title: 'Scary Movie Night', type: 'movie', genre: 'Comedy', country: 'United States', year: 2026, quality: 'HD', rating: '6.7', duration: '1h 37m',
    poster: '/posters/scary.svg', backdrop: '/backdrops/scary.svg',
    description: 'A group of students try to survive a horror marathon where every movie starts becoming real.',
    cast: ['Sami Wells', 'Leah North'], director: 'K. Park'
  },
  {
    id: 'demon', title: 'Demon Blade', type: 'movie', genre: 'Anime', country: 'Japan', year: 2026, quality: 'HD', rating: '8.2', duration: '1h 55m',
    poster: '/posters/demon.svg', backdrop: '/backdrops/demon.svg',
    description: 'A young swordsman follows a glowing blade into a mountain city controlled by spirits.',
    cast: ['Hiro Aki', 'Yuna Rei'], director: 'Sora K.'
  },
  {
    id: 'michael', title: 'Michael', type: 'movie', genre: 'Biography', country: 'United States', year: 2025, quality: 'HD', rating: '7.5', duration: '2h 09m',
    poster: '/posters/michael.svg', backdrop: '/backdrops/michael.svg',
    description: 'A musician searches for his lost sound while the world expects him to become a superstar.',
    cast: ['Mason Ray', 'Ivy Noor'], director: 'T. Lane'
  },
  {
    id: 'greenland', title: 'Greenland Migration', type: 'movie', genre: 'Disaster', country: 'Norway', year: 2026, quality: 'HD', rating: '7.0', duration: '1h 56m',
    poster: '/posters/greenland.svg', backdrop: '/backdrops/greenland.svg',
    description: 'A family crosses frozen land to reach a rescue zone before a storm shuts down the last route.',
    cast: ['Erik Sol', 'Nadia Frost'], director: 'O. Berg'
  },
  {
    id: 'disclosure', title: 'Disclosure Day', type: 'movie', genre: 'Sci-Fi', country: 'United States', year: 2025, quality: 'HD', rating: '6.9', duration: '1h 44m',
    poster: '/posters/disclosure.svg', backdrop: '/backdrops/disclosure.svg',
    description: 'When the sky opens for one hour, a journalist races to prove what the world has been hiding.',
    cast: ['Nolan Pierce', 'Ari Dean'], director: 'V. Stone'
  },
  {
    id: 'furious', title: 'The Furious', type: 'movie', genre: 'Action', country: 'Thailand', year: 2026, quality: 'HD', rating: '7.6', duration: '1h 47m',
    poster: '/posters/furious.svg', backdrop: '/backdrops/furious.svg',
    description: 'A street crew pulls off one final rescue mission across neon highways and abandoned tunnels.',
    cast: ['Kai Rattan', 'June Vale'], director: 'T. Suri'
  },
  {
    id: 'marked', title: 'The Marked Woman', type: 'movie', genre: 'Mystery', country: 'United Kingdom', year: 2026, quality: 'HD', rating: '7.1', duration: '1h 52m',
    poster: '/posters/marked.svg', backdrop: '/backdrops/marked.svg',
    description: 'A museum worker finds a strange symbol on her hand and becomes the key to an unsolved case.',
    cast: ['Amelia Ross', 'Theo Marsh'], director: 'L. Finch'
  },
  {
    id: 'signal', title: 'Signal One', type: 'movie', genre: 'Sci-Fi', country: 'United States', year: 2026, quality: 'HD', rating: '7.7', duration: '1h 59m',
    poster: '/posters/signal.svg', backdrop: '/backdrops/signal.svg',
    description: 'Scientists receive a signal from Earths twin planet and discover it is a warning from themselves.',
    cast: ['Derek Hale', 'Mina Clarke'], director: 'A. Fox'
  },
  {
    id: 'office', title: 'Office Romance', type: 'movie', genre: 'Romance', country: 'United States', year: 2025, quality: 'HD', rating: '6.6', duration: '1h 39m',
    poster: '/posters/office.svg', backdrop: '/backdrops/office.svg',
    description: 'Two interns compete for the same job while accidentally helping each other chase their dreams.',
    cast: ['Lana Brooks', 'Owen Miles'], director: 'N. Reid'
  },
  {
    id: 'gaulle', title: 'Tilting Iron', type: 'movie', genre: 'War', country: 'France', year: 2025, quality: 'HD', rating: '7.4', duration: '2h 00m',
    poster: '/posters/gaulle.svg', backdrop: '/backdrops/gaulle.svg',
    description: 'Two officers on opposite fronts decide whether loyalty matters more than saving innocent lives.',
    cast: ['Jean Moreau', 'Elise Caron'], director: 'M. Durand'
  },
  {
    id: 'wwe', title: 'Clash in Italy', type: 'movie', genre: 'Sport', country: 'Italy', year: 2026, quality: 'HD', rating: '6.8', duration: '1h 28m',
    poster: '/posters/wwe.svg', backdrop: '/backdrops/wwe.svg',
    description: 'A huge sports event becomes unforgettable when rivals face each other under the lights of Rome.',
    cast: ['Marco Bell', 'Tony King'], director: 'G. Rossi'
  },
  {
    id: 'who', title: 'WHO', type: 'movie', genre: 'Horror', country: 'United States', year: 2026, quality: 'HD', rating: '6.4', duration: '1h 32m',
    poster: '/posters/who.svg', backdrop: '/backdrops/who.svg',
    description: 'A masked caller knows every secret in a small town and begins exposing them one by one.',
    cast: ['Jenna Vale', 'Noah Pike'], director: 'R. Night'
  },
  {
    id: 'crescendo', title: 'Crescendo', type: 'movie', genre: 'Drama', country: 'Italy', year: 2025, quality: 'HD', rating: '7.0', duration: '1h 50m',
    poster: '/posters/crescendo.svg', backdrop: '/backdrops/crescendo.svg',
    description: 'A young violinist returns home to save an old theater before its final concert.',
    cast: ['Elena Fiori', 'Matteo Costa'], director: 'P. Leone'
  },
  {
    id: 'pressure', title: 'Pressure', type: 'movie', genre: 'War', country: 'United Kingdom', year: 2026, quality: 'HD', rating: '7.3', duration: '1h 46m',
    poster: '/posters/pressure.svg', backdrop: '/backdrops/pressure.svg',
    description: 'A weather officer has six hours to decide whether a dangerous mission can begin.',
    cast: ['Henry Vale', 'Ruth Lane'], director: 'B. Grant'
  },
  {
    id: 'double', title: 'Double or Nothing', type: 'movie', genre: 'Sport', country: 'United States', year: 2026, quality: 'HD', rating: '7.2', duration: '1h 40m',
    poster: '/posters/double.svg', backdrop: '/backdrops/double.svg',
    description: 'Two champions put everything on the line in one final arena match.',
    cast: ['Rico Steele', 'Sam Frost'], director: 'D. Arena'
  },
  {
    id: 'mexico', title: 'Mexico 86', type: 'movie', genre: 'Comedy', country: 'Mexico', year: 2026, quality: 'HD', rating: '6.9', duration: '1h 45m',
    poster: '/posters/mexico.svg', backdrop: '/backdrops/mexico.svg',
    description: 'A radio host and his chaotic team try to cover the biggest football summer of their lives.',
    cast: ['Luis Vega', 'Marta Flores'], director: 'A. Luna'
  },
  {
    id: 'colony', title: 'Colony', type: 'movie', genre: 'Sci-Fi', country: 'Germany', year: 2025, quality: 'HD', rating: '7.1', duration: '1h 51m',
    poster: '/posters/colony.svg', backdrop: '/backdrops/colony.svg',
    description: 'An underwater colony loses contact with the surface and discovers something moving beneath it.',
    cast: ['Lena Wolf', 'Karl Meier'], director: 'F. Stein'
  },
  {
    id: 'ladies', title: 'Ladies First', type: 'movie', genre: 'Comedy', country: 'United States', year: 2025, quality: 'HD', rating: '6.7', duration: '1h 34m',
    poster: '/posters/ladies.svg', backdrop: '/backdrops/ladies.svg',
    description: 'Three office friends create a fake company and accidentally become real business rivals.',
    cast: ['Maya Brooks', 'Kelly Hart'], director: 'J. Bright'
  },
  {
    id: 'from', title: 'FROM', type: 'series', genre: 'Horror', country: 'United States', year: 2026, quality: 'HD', rating: '8.1', duration: '45 min',
    poster: '/posters/from.svg', backdrop: '/backdrops/from.svg',
    description: 'A group of strangers are trapped in a town that will not let them leave when night arrives.',
    cast: ['Harold Caine', 'Ellie Shaw'], director: 'JustMovies Originals',
    seasons: [
      { number: 1, episodes: ['Long Road', 'Night Bell', 'The Window', 'Maps', 'Run'] },
      { number: 2, episodes: ['New Faces', 'The Signal', 'Locked Doors', 'The Tree', 'Before Dawn'] },
      { number: 3, episodes: ['Arrival', 'No Way Out', 'The Tower', 'Wolves', 'The Truth'] }
    ]
  },
  {
    id: 'egoli', title: 'Egoli: Place of Gold', type: 'series', genre: 'Drama', country: 'South Africa', year: 2025, quality: 'HD', rating: '7.4', duration: '42 min',
    poster: '/posters/egoli.svg', backdrop: '/backdrops/egoli.svg',
    description: 'A family business in a city of gold becomes the center of betrayal, ambition, and revenge.',
    cast: ['Zola Mbeki', 'Tara Stone'], director: 'JustMovies Originals',
    seasons: [
      { number: 1, episodes: ['Gold Dust', 'The Deal', 'Broken Trust', 'The Letter', 'New Owner', 'Firelight'] },
      { number: 2, episodes: ['Return', 'Debt', 'The Vote', 'Family Name', 'Crossroads', 'Home'] }
    ]
  },
  {
    id: 'campus', title: 'Off Campus', type: 'series', genre: 'Romance', country: 'United States', year: 2026, quality: 'HD', rating: '7.0', duration: '39 min',
    poster: '/posters/campus.svg', backdrop: '/backdrops/campus.svg',
    description: 'College friends move off campus and discover that freedom is more complicated than they expected.',
    cast: ['Nina West', 'Ty Cole'], director: 'JustMovies Originals',
    seasons: [
      { number: 1, episodes: ['Move In', 'Group Chat', 'The Party', 'Midterms', 'New Rules', 'Final Night'] }
    ]
  },
  {
    id: 'boys', title: 'The Boys', type: 'series', genre: 'Action', country: 'United States', year: 2025, quality: 'HD', rating: '8.4', duration: '52 min',
    poster: '/posters/boys.svg', backdrop: '/backdrops/boys.svg',
    description: 'A team of unlikely heroes tries to expose a powerful company hiding dangerous secrets.',
    cast: ['Jack Rider', 'Sam Cross'], director: 'JustMovies Originals',
    seasons: [
      { number: 1, episodes: ['Supers', 'The Leak', 'Mask Off', 'Broken Hero', 'The Fall', 'Aftermath'] },
      { number: 2, episodes: ['Damage Control', 'Wanted', 'The Tower', 'No Mercy', 'The Broadcast', 'The Storm'] },
      { number: 3, episodes: ['Old Blood', 'Glory', 'The Plan', 'Red Line', 'Dark Day', 'New World'] }
    ]
  },
  {
    id: 'law', title: 'Law & Order Unit', type: 'series', genre: 'Crime', country: 'United States', year: 2026, quality: 'HD', rating: '7.6', duration: '44 min',
    poster: '/posters/law.svg', backdrop: '/backdrops/law.svg',
    description: 'A serious city investigation unit solves complex cases while dealing with pressure from every side.',
    cast: ['Olivia Kane', 'Marcus Dell'], director: 'JustMovies Originals',
    seasons: [
      { number: 1, episodes: ['Case One', 'The Witness', 'Evidence', 'Cold Trail', 'The Verdict'] },
      { number: 2, episodes: ['After Hours', 'The Room', 'Missing File', 'Silent Street', 'Confession'] }
    ]
  },
  {
    id: 'spider', title: 'Spider Noir', type: 'series', genre: 'Action', country: 'United States', year: 2026, quality: 'HD', rating: '7.9', duration: '48 min',
    poster: '/posters/spider.svg', backdrop: '/backdrops/spider.svg',
    description: 'A masked detective protects a rainy city where every case connects to one shadow organization.',
    cast: ['Peter Vale', 'Gwen Noir'], director: 'JustMovies Originals',
    seasons: [
      { number: 1, episodes: ['Rain City', 'The Web', 'Black Suit', 'Clock Tower', 'Final Swing'] }
    ]
  },
  {
    id: 'euphoria', title: 'Euphoria', type: 'series', genre: 'Drama', country: 'United States', year: 2025, quality: 'HD', rating: '7.8', duration: '50 min',
    poster: '/posters/euphoria.svg', backdrop: '/backdrops/euphoria.svg',
    description: 'Teen friends try to understand love, pressure, and friendship during one unforgettable summer.',
    cast: ['Rue Vale', 'Lexi Bloom'], director: 'JustMovies Originals',
    seasons: [
      { number: 1, episodes: ['Summer', 'Truth', 'Party Lights', 'The Call', 'After Rain'] },
      { number: 2, episodes: ['Blue Hour', 'Rumors', 'The Play', 'Lost Weekend', 'Goodbye'] }
    ]
  },
  {
    id: 'rookie', title: 'The Rookie', type: 'series', genre: 'Crime', country: 'United States', year: 2026, quality: 'HD', rating: '7.5', duration: '43 min',
    poster: '/posters/rookie.svg', backdrop: '/backdrops/rookie.svg',
    description: 'A new recruit joins a busy city unit and learns that every shift can change everything.',
    cast: ['John Cole', 'Nyla Fox'], director: 'JustMovies Originals',
    seasons: [
      { number: 1, episodes: ['First Day', 'Patrol', 'Backup', 'The Chase', 'Night Shift', 'Promotion'] }
    ]
  },
  {
    id: 'greys', title: 'Grey Hospital', type: 'series', genre: 'Drama', country: 'United States', year: 2025, quality: 'HD', rating: '7.2', duration: '46 min',
    poster: '/posters/greys.svg', backdrop: '/backdrops/greys.svg',
    description: 'Doctors inside a busy hospital balance friendship, emergencies, and impossible choices.',
    cast: ['Meredith Lane', 'Alex King'], director: 'JustMovies Originals',
    seasons: [
      { number: 1, episodes: ['Interns', 'Code Blue', 'Second Chance', 'The Crash', 'Heartbeat'] },
      { number: 2, episodes: ['New Wing', 'Emergency', 'Night Call', 'The Promise', 'Recovery'] }
    ]
  },
  {
    id: 'lesson', title: 'Teach You a Lesson', type: 'series', genre: 'Comedy', country: 'United Kingdom', year: 2026, quality: 'HD', rating: '6.8', duration: '31 min',
    poster: '/posters/lesson.svg', backdrop: '/backdrops/lesson.svg',
    description: 'A chaotic school staff tries to survive inspections, pranks, and their own terrible plans.',
    cast: ['Ben Chalk', 'Sofia Bell'], director: 'JustMovies Originals',
    seasons: [
      { number: 1, episodes: ['Detention', 'New Teacher', 'Sports Day', 'Inspection', 'Graduation'] }
    ]
  },
  {
    id: 'supernatural', title: 'Supernatural', type: 'series', genre: 'Fantasy', country: 'United States', year: 2024, quality: 'HD', rating: '7.7', duration: '45 min',
    poster: '/posters/supernatural.svg', backdrop: '/backdrops/supernatural.svg',
    description: 'Two siblings drive across the country solving strange cases that nobody else believes.',
    cast: ['Dean Rivers', 'Sam Rivers'], director: 'JustMovies Originals',
    seasons: [
      { number: 1, episodes: ['The Road', 'Black Lake', 'Old House', 'Crossroads', 'The Hunter'] },
      { number: 2, episodes: ['Ashes', 'The Mark', 'Ghost Town', 'No Sleep', 'Final Door'] }
    ]
  },
  {
    id: 'thrones', title: 'Kingdom of Thrones', type: 'series', genre: 'Fantasy', country: 'United Kingdom', year: 2026, quality: 'HD', rating: '8.4', duration: '49 min',
    poster: '/posters/thrones.svg', backdrop: '/backdrops/thrones.svg',
    description: 'Seven noble houses fight for control of a frozen kingdom while an ancient danger wakes in the far north.',
    cast: ['Peter Stone', 'Kit North', 'Nikolaj Vale'], director: 'D. Ben & D. Weiss',
    seasons: [
      { number: 0, episodes: ['Special 1', 'Special 2'] },
      { number: 1, episodes: ['Winter Gate', 'The Crown', 'Blood Line', 'The Wall', 'Old Gods', 'Fire Road'] },
      { number: 2, episodes: ['Kings', 'The Siege', 'Blackwater', 'The Pact', 'Ice Wind', 'The Choice'] },
      { number: 3, episodes: ['Dragon Stone', 'The North', 'Red Feast', 'The Trial', 'Mercy', 'The Long Night'] },
      { number: 4, episodes: ['New Crown', 'Broken Oath', 'The Mountain', 'The Keep', 'Queen Road', 'Final War'] },
      { number: 5, episodes: ['Ashes', 'The Last King', 'Beyond', 'Stormborn', 'The Throne', 'Endgame'] }
    ]
  },
  {
    id: 'ncis', title: 'NCIS Unit', type: 'series', genre: 'Crime', country: 'United States', year: 2025, quality: 'HD', rating: '7.4', duration: '43 min',
    poster: '/posters/ncis.svg', backdrop: '/backdrops/ncis.svg',
    description: 'A federal team investigates cases connected to military secrets and high-risk missions.',
    cast: ['Gibbs Stone', 'Ziva Ray'], director: 'JustMovies Originals',
    seasons: [
      { number: 1, episodes: ['Case File', 'Deep Cover', 'The Ship', 'Hidden Base', 'Last Report'] }
    ]
  },
  {
    id: 'criminal', title: 'Criminal Minds', type: 'series', genre: 'Crime', country: 'United States', year: 2026, quality: 'HD', rating: '7.9', duration: '47 min',
    poster: '/posters/criminal.svg', backdrop: '/backdrops/criminal.svg',
    description: 'A profiling team studies patterns and clues to stop dangerous crimes before they happen again.',
    cast: ['Spencer Grey', 'Emily Vale'], director: 'JustMovies Originals',
    seasons: [
      { number: 1, episodes: ['Profile', 'The Pattern', 'Hidden Room', 'No Trace', 'The Signal'] },
      { number: 2, episodes: ['Cold Start', 'The Map', 'The Call', 'Mind Games', 'The End'] }
    ]
  },
  {
    id: 'mentalist', title: 'The Mentalist', type: 'series', genre: 'Mystery', country: 'United States', year: 2025, quality: 'HD', rating: '7.6', duration: '44 min',
    poster: '/posters/mentalist.svg', backdrop: '/backdrops/mentalist.svg',
    description: 'A brilliant observer helps solve cases by reading details most people never notice.',
    cast: ['Patrick Dean', 'Teresa Vale'], director: 'JustMovies Originals',
    seasons: [
      { number: 1, episodes: ['Red Thread', 'Small Clue', 'The Smile', 'Cards', 'Revelation'] }
    ]
  }
];

export const genres = [...new Set(catalog.map((item) => item.genre))].sort();

export const heroItems = catalog.slice(0, 5);

export function getSuggestions(currentId, limit = 12) {
  const current = catalog.find((item) => item.id === currentId);
  const pool = catalog.filter((item) => item.id !== currentId);
  const sameGenre = current ? pool.filter((item) => item.genre === current.genre) : [];
  const others = pool.filter((item) => !sameGenre.includes(item));
  return [...sameGenre, ...others].slice(0, limit);
}
