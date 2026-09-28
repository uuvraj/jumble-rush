// Curated vocabulary decks with hints, categories, and difficulties
// Serves as both offline-ready curated gameplay and seamless fallback for Datamuse API

export const TECH_WORDS = [
  { word: 'REACT', hint: 'A declarative, component-based frontend UI library created by Meta', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'JAVASCRIPT', hint: 'The ubiquitous scripting language powering dynamic web experiences', category: 'Tech & Coding', difficulty: 'Medium' },
  { word: 'DEPLOY', hint: 'The process of delivering tested software artifacts to a target environment', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'BROWSER', hint: 'Client software used to retrieve, render, and navigate web content', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'COMPONENT', hint: 'A reusable, self-contained piece of UI logic and rendering', category: 'Tech & Coding', difficulty: 'Medium' },
  { word: 'TERMINAL', hint: 'Text-based interface used to execute commands directly on an operating system', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'TYPESCRIPT', hint: 'A strongly typed superset of JavaScript that compiles to plain JS', category: 'Tech & Coding', difficulty: 'Medium' },
  { word: 'REPOSITORY', hint: 'A centralized data structure storing code, commits, and revision histories', category: 'Tech & Coding', difficulty: 'Medium' },
  { word: 'COMPILER', hint: 'Translates human-readable source code into machine code or bytecode', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'DEBUGGER', hint: 'A utility to inspect variables, set breakpoints, and trace program execution', category: 'Tech & Coding', difficulty: 'Medium' },
  { word: 'ALGORITHM', hint: 'A defined, step-by-step procedure for solving a computational problem', category: 'Tech & Coding', difficulty: 'Medium' },
  { word: 'DATABASE', hint: 'An organized collection of structured data managed by a DBMS', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'PROMISE', hint: 'An asynchronous proxy object representing an eventual completion or failure', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'DOCKER', hint: 'Containerization engine that packages software into lightweight portable images', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'WEBSOCKET', hint: 'Persistent full-duplex TCP protocol for real-time bidirectional messaging', category: 'Tech & Coding', difficulty: 'Medium' },
  { word: 'GRAPHQL', hint: 'An API query language that lets clients request exact data shapes', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'MIDDLEWARE', hint: 'Software pipeline layer that intercepts and processes requests before handlers', category: 'Tech & Coding', difficulty: 'Medium' },
  { word: 'RECURSION', hint: 'A problem-solving pattern where a function calls itself with a base case', category: 'Tech & Coding', difficulty: 'Medium' },
  { word: 'VARIABLE', hint: 'A symbolic identifier associated with a memory location holding data', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'ASYNC', hint: 'Non-blocking execution model that allows other operations to run concurrently', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'FUNCTION', hint: 'A callable block of code that accepts arguments and produces output', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'BACKEND', hint: 'The server-side tier that manages databases, business logic, and security', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'PAYLOAD', hint: 'The actual data payload transmitted inside an HTTP request or message packet', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'TOKEN', hint: 'A cryptographic string (e.g., JWT) representing identity or session claims', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'CACHE', hint: 'High-speed temporary storage layer utilized to reduce access latency', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'FRAMEWORK', hint: 'A foundation providing generic functionality that custom user code extends', category: 'Tech & Coding', difficulty: 'Medium' },
  { word: 'KUBERNETES', hint: 'Container orchestration platform created by Google to automate deployments', category: 'Tech & Coding', difficulty: 'Hard' },
  { word: 'SYNTAX', hint: 'The set of grammatical rules defining valid symbol arrangements in code', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'ENDPOINT', hint: 'A specific URL where an API resource receives client requests', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'REDUX', hint: 'A predictable state container for JS apps based on actions and reducers', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'HOOK', hint: 'React mechanism enabling functional components to manage state and side effects', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'REFACTOR', hint: 'Improving internal structure and code cleanliness without altering behavior', category: 'Tech & Coding', difficulty: 'Medium' },
  { word: 'CONTAINER', hint: 'A standardized unit of software packaging code and its dependencies together', category: 'Tech & Coding', difficulty: 'Medium' },
  { word: 'CLOSURE', hint: 'A function bundled together with references to its surrounding lexical scope', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'BANDWIDTH', hint: 'The maximum data transfer capacity of a network channel', category: 'Tech & Coding', difficulty: 'Medium' },
  { word: 'PIPELINE', hint: 'Automated chain of processing stages such as build, test, and deploy (CI/CD)', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'INTERFACE', hint: 'A contract in typed languages defining shapes of methods and properties', category: 'Tech & Coding', difficulty: 'Medium' },
  { word: 'IMMUTABLE', hint: 'An object or data structure whose state cannot be modified after creation', category: 'Tech & Coding', difficulty: 'Medium' },
  { word: 'GRAPH', hint: 'Non-linear data structure consisting of vertices (nodes) connected by edges', category: 'Tech & Coding', difficulty: 'Easy' },
  { word: 'WEBPACK', hint: 'A static module bundler for modern JavaScript applications', category: 'Tech & Coding', difficulty: 'Easy' }
];

export const SPACE_WORDS = [
  { word: 'GALAXY', hint: 'A gravitationally bound system of stars, stellar remnants, interstellar gas, and dark matter', category: 'Space & Cosmos', difficulty: 'Medium' },
  { word: 'SATELLITE', hint: 'A natural or artificial body orbiting around a planet or celestial object', category: 'Space & Cosmos', difficulty: 'Hard' },
  { word: 'NEBULA', hint: 'An enormous cloud of dust and gas occupying the space between stars', category: 'Space & Cosmos', difficulty: 'Medium' },
  { word: 'ASTRONAUT', hint: 'A person trained to travel in a spacecraft into outer space', category: 'Space & Cosmos', difficulty: 'Hard' },
  { word: 'TELESCOPE', hint: 'An optical instrument designed to observe remote objects by collecting electromagnetic radiation', category: 'Space & Cosmos', difficulty: 'Hard' },
  { word: 'ORBIT', hint: 'The gravitationally curved trajectory of an object around a star or planet', category: 'Space & Cosmos', difficulty: 'Easy' },
  { word: 'SUPERNOVA', hint: 'A powerful and luminous stellar explosion occurring during the last evolutionary stages of a massive star', category: 'Space & Cosmos', difficulty: 'Hard' },
  { word: 'ASTEROID', hint: 'A minor planet or rocky remnant left over from the early formation of our solar system', category: 'Space & Cosmos', difficulty: 'Medium' },
  { word: 'ECLIPSE', hint: 'An astronomical event where one celestial body moves into the shadow of another', category: 'Space & Cosmos', difficulty: 'Medium' },
  { word: 'GRAVITY', hint: 'The fundamental interaction causing mutual attraction between all things with mass or energy', category: 'Space & Cosmos', difficulty: 'Medium' },
  { word: 'METEOR', hint: 'A streak of light produced when a meteoroid enters the atmosphere at high velocity and burns up', category: 'Space & Cosmos', difficulty: 'Medium' },
  { word: 'COMET', hint: 'An icy small Solar System body that displays a visible atmosphere (coma) and tail when close to the Sun', category: 'Space & Cosmos', difficulty: 'Easy' },
  { word: 'COSMOS', hint: 'The universe seen as a well-ordered and harmonious whole', category: 'Space & Cosmos', difficulty: 'Medium' },
  { word: 'PLANET', hint: 'A celestial body orbiting a star, spherical due to gravity, that has cleared its orbital path', category: 'Space & Cosmos', difficulty: 'Medium' },
  { word: 'SHUTTLE', hint: 'A reusable spacecraft designed to transport astronauts and equipment between Earth and space', category: 'Space & Cosmos', difficulty: 'Medium' },
  { word: 'PULSAR', hint: 'A highly magnetized rotating neutron star that emits beams of electromagnetic radiation', category: 'Space & Cosmos', difficulty: 'Medium' },
  { word: 'ROVER', hint: 'A planetary surface exploration vehicle designed to move across celestial surfaces', category: 'Space & Cosmos', difficulty: 'Easy' },
  { word: 'AURORA', hint: 'A natural electric display in the upper atmosphere causing colorful luminous streamers', category: 'Space & Cosmos', difficulty: 'Medium' },
  { word: 'HORIZON', hint: 'The apparent boundary separating Earth from the sky, or the event boundary of a black hole', category: 'Space & Cosmos', difficulty: 'Medium' },
  { word: 'LUNAR', hint: 'Pertaining to, caused by, or associated with Earth\'s natural satellite (the Moon)', category: 'Space & Cosmos', difficulty: 'Easy' },
  { word: 'EQUINOX', hint: 'The astronomical time twice a year when day and night are of approximately equal duration everywhere', category: 'Space & Cosmos', difficulty: 'Medium' },
  { word: 'ZENITH', hint: 'An imaginary point located directly above a particular location on the celestial sphere', category: 'Space & Cosmos', difficulty: 'Medium' },
  { word: 'SPACECRAFT', hint: 'A vehicle or machine designed to fly and operate beyond Earth\'s atmosphere', category: 'Space & Cosmos', difficulty: 'Hard' }
];

export const ANIMALS_WORDS = [
  { word: 'CHEETAH', hint: 'The fastest land animal on Earth, capable of reaching speeds up to 70 miles per hour', category: 'Animals & Nature', difficulty: 'Medium' },
  { word: 'DOLPHIN', hint: 'Highly intelligent marine mammal known for echolocation and social pod behavior', category: 'Animals & Nature', difficulty: 'Medium' },
  { word: 'CHAMELEON', hint: 'Reptile famous for independently mobile eyes and specialized color-changing skin', category: 'Animals & Nature', difficulty: 'Hard' },
  { word: 'ELEPHANT', hint: 'The largest living land animal, characterized by a flexible trunk and prominent ivory tusks', category: 'Animals & Nature', difficulty: 'Medium' },
  { word: 'PENGUIN', hint: 'Flightless aquatic bird largely native to the cold waters of the Southern Hemisphere', category: 'Animals & Nature', difficulty: 'Medium' },
  { word: 'KANGAROO', hint: 'Indigenous Australian marsupial with powerful hind legs and a pouch for carrying joeys', category: 'Animals & Nature', difficulty: 'Medium' },
  { word: 'OCTOPUS', hint: 'Eight-limbed soft-bodied cephalopod renowned for high problem-solving intelligence and camouflage', category: 'Animals & Nature', difficulty: 'Medium' },
  { word: 'FLAMINGO', hint: 'Wading bird renowned for its vivid pink plumage acquired from carotenoid pigments in food', category: 'Animals & Nature', difficulty: 'Medium' },
  { word: 'GORILLA', hint: 'The largest extant genus of primates, ground-dwelling herbivores inhabiting equatorial forests', category: 'Animals & Nature', difficulty: 'Medium' },
  { word: 'HEDGEHOG', hint: 'Small spiny mammal that curls into a prickly defensive ball when threatened', category: 'Animals & Nature', difficulty: 'Medium' },
  { word: 'GIRAFFE', hint: 'The tallest living terrestrial animal, characterized by an exceptionally elongated neck and spotted coat', category: 'Animals & Nature', difficulty: 'Medium' },
  { word: 'PLATYPUS', hint: 'Semi-aquatic egg-laying mammal native to eastern Australia with a duck-like bill', category: 'Animals & Nature', difficulty: 'Medium' },
  { word: 'PEACOCK', hint: 'Male peafowl celebrated for its extravagant, iridescent eye-patterned tail plumage', category: 'Animals & Nature', difficulty: 'Medium' },
  { word: 'MEERKAT', hint: 'Small mongoose native to southern Africa that stands sentry on hind legs to watch for predators', category: 'Animals & Nature', difficulty: 'Medium' },
  { word: 'KOALA', hint: 'Arboreal Australian marsupial that feeds almost exclusively on eucalyptus leaves', category: 'Animals & Nature', difficulty: 'Easy' },
  { word: 'SEAHORSE', hint: 'Small marine fish with an equine head, prehensile tail, and males that carry the unborn fry', category: 'Animals & Nature', difficulty: 'Medium' },
  { word: 'TOUCAN', hint: 'Tropical neotropical bird recognized for its oversized, brilliantly colored bill', category: 'Animals & Nature', difficulty: 'Medium' },
  { word: 'WOLVERINE', hint: 'Solitary, muscular northern carnivore known for fierce strength disproportionate to its size', category: 'Animals & Nature', difficulty: 'Hard' },
  { word: 'BUFFALO', hint: 'Large, heavily built wild ox with horns, native to grasslands and savannahs', category: 'Animals & Nature', difficulty: 'Medium' },
  { word: 'IGUANA', hint: 'Herbivorous tropical lizard with a row of spines along its back and a dewlap under its throat', category: 'Animals & Nature', difficulty: 'Medium' },
  { word: 'FALCON', hint: 'Bird of prey with long, pointed wings celebrated for high-speed hunting stoops', category: 'Animals & Nature', difficulty: 'Medium' },
  { word: 'JAGUAR', hint: 'The third-largest cat species in the world, having a rosette-patterned golden-yellow coat', category: 'Animals & Nature', difficulty: 'Medium' },
  { word: 'WALRUS', hint: 'Large flippered marine mammal with prominent long tusks and whiskered vibrissae', category: 'Animals & Nature', difficulty: 'Medium' }
];

export const FOOD_WORDS = [
  { word: 'ESPRESSO', hint: 'A concentrated coffee beverage brewed by forcing hot water under pressure through finely-ground beans', category: 'Food & Culinary', difficulty: 'Medium' },
  { word: 'CHOCOLATE', hint: 'Confection prepared from roasted and ground cacao seeds, sweetened with sugar and milk', category: 'Food & Culinary', difficulty: 'Hard' },
  { word: 'CINNAMON', hint: 'An aromatic spice obtained from the inner bark of several tree species of the genus Cinnamomum', category: 'Food & Culinary', difficulty: 'Medium' },
  { word: 'CROISSANT', hint: 'A buttery, flaky, crescent-shaped viennoiserie pastry of Austrian-French origin', category: 'Food & Culinary', difficulty: 'Hard' },
  { word: 'AVOCADO', hint: 'A pear-shaped subtropical fruit with a rough green skin and rich creamy nutrient-dense pulp', category: 'Food & Culinary', difficulty: 'Medium' },
  { word: 'BARBECUE', hint: 'A cooking method involving slow live fire and smoke to roast and flavor meats', category: 'Food & Culinary', difficulty: 'Medium' },
  { word: 'LASAGNA', hint: 'A wide, flat sheet of pasta baked in layers with sauce, cheese, and minced meats', category: 'Food & Culinary', difficulty: 'Medium' },
  { word: 'PANCAKE', hint: 'A thin, flat cake made from starch-based batter fried on a hot griddle', category: 'Food & Culinary', difficulty: 'Medium' },
  { word: 'RISOTTO', hint: 'A northern Italian creamy rice dish cooked gradually with warm broth until al dente', category: 'Food & Culinary', difficulty: 'Medium' },
  { word: 'VANILLA', hint: 'A popular flavoring derived from the cured pods of tropical climbing orchids', category: 'Food & Culinary', difficulty: 'Medium' },
  { word: 'BAGUETTE', hint: 'A long, thin loaf of French bread characterized by a crisp crust and aerated crumb', category: 'Food & Culinary', difficulty: 'Medium' },
  { word: 'CARAMEL', hint: 'A medium- to dark-orange confectionery product made by slowly heating sugars', category: 'Food & Culinary', difficulty: 'Medium' },
  { word: 'SUSHI', hint: 'Traditional Japanese dish of seasoned vinegared rice accompanied by fresh seafood or vegetables', category: 'Food & Culinary', difficulty: 'Easy' },
  { word: 'OMELET', hint: 'A dish of beaten eggs cooked gently in a frying pan and folded over savory fillings', category: 'Food & Culinary', difficulty: 'Medium' },
  { word: 'NOODLES', hint: 'Staple food made from unleavened dough rolled flat, cut, and boiled in soup or sauce', category: 'Food & Culinary', difficulty: 'Medium' },
  { word: 'CHEDDAR', hint: 'A relatively hard, off-white (or orange) natural cheese originating from an English village', category: 'Food & Culinary', difficulty: 'Medium' },
  { word: 'GUACAMOLE', hint: 'An avocado-based dip or spread originating from ancient Aztec cuisine', category: 'Food & Culinary', difficulty: 'Hard' },
  { word: 'BURRITO', hint: 'A Mexican and Tex-Mex dish consisting of a wheat flour tortilla rolled around seasoned fillings', category: 'Food & Culinary', difficulty: 'Medium' },
  { word: 'WAFFLE', hint: 'A crisp batter cake cooked between two patterned hot plates giving a checkered imprint', category: 'Food & Culinary', difficulty: 'Medium' },
  { word: 'GOURMET', hint: 'A cultural ideal associated with the culinary arts of fine food and premium beverages', category: 'Food & Culinary', difficulty: 'Medium' },
  { word: 'TIRAMISU', hint: 'A coffee-flavoured Italian dessert made of ladyfingers dipped in coffee, layered with mascarpone', category: 'Food & Culinary', difficulty: 'Hard' },
  { word: 'BROWNIE', hint: 'A square or rectangular chocolate baked confection with a dense, fudgy texture', category: 'Food & Culinary', difficulty: 'Medium' },
  { word: 'PISTACHIO', hint: 'A culinary nut with an ivory hard shell and vibrant edible green-yellow seed kernel', category: 'Food & Culinary', difficulty: 'Hard' }
];

export const SCIENCE_WORDS = [
  { word: 'QUANTUM', hint: 'The minimum amount of any physical entity or property involved in an interaction', category: 'Science & Physics', difficulty: 'Medium' },
  { word: 'MOLECULE', hint: 'An electrically neutral group of two or more atoms held together by chemical bonds', category: 'Science & Physics', difficulty: 'Medium' },
  { word: 'ELECTRON', hint: 'A subatomic particle whose electric charge is negative one elementary charge', category: 'Science & Physics', difficulty: 'Medium' },
  { word: 'VELOCITY', hint: 'The directional speed of an object in motion as an indication of its rate of position change', category: 'Science & Physics', difficulty: 'Medium' },
  { word: 'FRICTION', hint: 'The force resisting the relative lateral motion of solid surfaces or fluid layers in contact', category: 'Science & Physics', difficulty: 'Medium' },
  { word: 'GENOME', hint: 'An organism’s complete set of genetic instructions encoded inside DNA sequences', category: 'Science & Physics', difficulty: 'Medium' },
  { word: 'MAGNET', hint: 'A material or object that produces an unseen magnetic field attracting ferromagnetic metals', category: 'Science & Physics', difficulty: 'Medium' },
  { word: 'SPECTRUM', hint: 'A condition that is not limited to a specific set of values but varies continuously across a continuum', category: 'Science & Physics', difficulty: 'Medium' },
  { word: 'KINETIC', hint: 'Relating to or resulting from motion; energy possessed by virtue of being in motion', category: 'Science & Physics', difficulty: 'Medium' },
  { word: 'CATALYST', hint: 'A substance that increases the rate of a chemical reaction without undergoing permanent change', category: 'Science & Physics', difficulty: 'Medium' },
  { word: 'NUCLEUS', hint: 'The positively charged central core of an atom consisting of protons and neutrons', category: 'Science & Physics', difficulty: 'Medium' },
  { word: 'DIFFUSION', hint: 'The net movement of anything from a region of higher concentration to lower concentration', category: 'Science & Physics', difficulty: 'Hard' },
  { word: 'ENTROPY', hint: 'A scientific concept as well as a measurable physical property representing thermal disorder', category: 'Science & Physics', difficulty: 'Medium' },
  { word: 'PRISM', hint: 'A transparent optical element with flat polished surfaces that refract light by wavelength', category: 'Science & Physics', difficulty: 'Easy' },
  { word: 'ELEMENT', hint: 'A pure substance consisting entirely of atoms that all possess identical numbers of protons', category: 'Science & Physics', difficulty: 'Medium' },
  { word: 'OSMOSIS', hint: 'The spontaneous net movement of solvent molecules through a selectively permeable membrane', category: 'Science & Physics', difficulty: 'Medium' },
  { word: 'PHOTON', hint: 'An elementary particle that is a quantum of electromagnetic field, including visible light', category: 'Science & Physics', difficulty: 'Medium' },
  { word: 'THERMAL', hint: 'Relating to or caused by heat or temperature changes', category: 'Science & Physics', difficulty: 'Medium' },
  { word: 'ISOTOPE', hint: 'Variations of a chemical element that possess the same atomic number but differing neutron counts', category: 'Science & Physics', difficulty: 'Medium' },
  { word: 'NEUTRON', hint: 'A subatomic hadron particle found in atomic nuclei having zero net electric charge', category: 'Science & Physics', difficulty: 'Medium' },
  { word: 'RADIATION', hint: 'Emission or transmission of energy in the form of waves or particles through space', category: 'Science & Physics', difficulty: 'Hard' },
  { word: 'CIRCUIT', hint: 'A complete and closed path through which electric charges can flow continuously', category: 'Science & Physics', difficulty: 'Medium' }
];

export const SPORTS_WORDS = [
  { word: 'MARATHON', hint: 'A long-distance foot race with an official distance of 42.195 kilometers (26.2 miles)', category: 'Sports & Games', difficulty: 'Medium' },
  { word: 'ATHLETE', hint: 'A person who competes in one or more sports involving physical strength, speed, or endurance', category: 'Sports & Games', difficulty: 'Medium' },
  { word: 'CHAMPION', hint: 'A victor in a competition or tournament who holds the highest official title', category: 'Sports & Games', difficulty: 'Medium' },
  { word: 'STADIUM', hint: 'A venue with a tiered arena designed for spectators to view sports and concerts', category: 'Sports & Games', difficulty: 'Medium' },
  { word: 'OLYMPICS', hint: 'The world\'s leading international sporting events featuring summer and winter competitions', category: 'Sports & Games', difficulty: 'Medium' },
  { word: 'GYMNAST', hint: 'An athlete skilled in acrobatic exercises requiring agility, balance, and coordination', category: 'Sports & Games', difficulty: 'Medium' },
  { word: 'ARCHERY', hint: 'The sport, practice, or skill of using a bow to shoot arrows accurately at targets', category: 'Sports & Games', difficulty: 'Medium' },
  { word: 'TRIATHLON', hint: 'A multisport endurance contest consisting of swimming, cycling, and running in immediate succession', category: 'Sports & Games', difficulty: 'Hard' },
  { word: 'SURFING', hint: 'A surface water sport in which an individual rides a moving wave on a board towards the shore', category: 'Sports & Games', difficulty: 'Medium' },
  { word: 'VOLLEYBALL', hint: 'A team sport where two teams are separated by a high net and score points by grounding the ball', category: 'Sports & Games', difficulty: 'Hard' },
  { word: 'HURDLES', hint: 'Track and field sprint race where competitors must leap over rectangular wooden barriers', category: 'Sports & Games', difficulty: 'Medium' },
  { word: 'TOURNAMENT', hint: 'A competition involving multiple competitors or teams vying for an overall championship', category: 'Sports & Games', difficulty: 'Hard' },
  { word: 'JAVELIN', hint: 'A light spear thrown by hand as an athletic field event for maximum distance', category: 'Sports & Games', difficulty: 'Medium' },
  { word: 'CRICKET', hint: 'A bat-and-ball game played between two teams of eleven players on a field with a 22-yard pitch', category: 'Sports & Games', difficulty: 'Medium' },
  { word: 'BADMINTON', hint: 'A racquet sport played using racquets to hit a feathered shuttlecock across a net', category: 'Sports & Games', difficulty: 'Hard' },
  { word: 'SOCCER', hint: 'The most popular sport in the world, played between two teams of eleven players kicking a ball', category: 'Sports & Games', difficulty: 'Medium' },
  { word: 'SPRINTER', hint: 'An athlete specializing in running over short distances at top velocity', category: 'Sports & Games', difficulty: 'Medium' },
  { word: 'CYCLING', hint: 'The use of bicycles for transport, recreation, exercise, or competitive racing', category: 'Sports & Games', difficulty: 'Medium' },
  { word: 'BOXING', hint: 'A combat sport in which two athletes throw punches at each other inside a squared ring', category: 'Sports & Games', difficulty: 'Medium' },
  { word: 'REFEREE', hint: 'An official of an athletic game or match who enforces rules and decides disputes', category: 'Sports & Games', difficulty: 'Medium' },
  { word: 'BASKETBALL', hint: 'A game played between two teams of five players each who score by tossing a ball through an elevated hoop', category: 'Sports & Games', difficulty: 'Hard' },
  { word: 'TROPHY', hint: 'A decorative cup, shield, or statue awarded as a tangible token of athletic victory', category: 'Sports & Games', difficulty: 'Medium' }
];

export const GEOGRAPHY_WORDS = [
  { word: 'CONTINENT', hint: 'Any of the world\'s main continuous expanses of land (e.g., Africa, Asia, Europe)', category: 'World & Travel', difficulty: 'Hard' },
  { word: 'ARCHIPELAGO', hint: 'An extensive group or cluster of scattered islands in a sea or ocean', category: 'World & Travel', difficulty: 'Hard' },
  { word: 'VOLCANO', hint: 'A rupture in the crust of a planetary-mass object that allows hot lava and gases to escape', category: 'World & Travel', difficulty: 'Medium' },
  { word: 'GLACIER', hint: 'A persistent body of dense ice that is constantly moving under its own gravity', category: 'World & Travel', difficulty: 'Medium' },
  { word: 'PENINSULA', hint: 'A piece of land bordered by water on three sides while joined to the mainland', category: 'World & Travel', difficulty: 'Hard' },
  { word: 'EQUATOR', hint: 'An imaginary planetary line situated at zero degrees latitude equidistant from both poles', category: 'World & Travel', difficulty: 'Medium' },
  { word: 'CANYON', hint: 'A deep ravine between cliffs often carved by the long-term erosive activity of a river', category: 'World & Travel', difficulty: 'Medium' },
  { word: 'HORIZON', hint: 'The apparent boundary line where the earth\'s surface appears to meet the sky', category: 'World & Travel', difficulty: 'Medium' },
  { word: 'TUNDRA', hint: 'A vast, flat, treeless Arctic region of Europe, Asia, and North America with frozen subsoil', category: 'World & Travel', difficulty: 'Medium' },
  { word: 'SAVANNA', hint: 'A rolling grassland biome scattered with shrubs and isolated trees, having distinct wet and dry seasons', category: 'World & Travel', difficulty: 'Medium' },
  { word: 'PLATEAU', hint: 'An area of relatively level high ground raised significantly above surrounding terrain', category: 'World & Travel', difficulty: 'Medium' },
  { word: 'FJORD', hint: 'A long, deep, narrow body of water that reaches far inland, carved by historical glacial retreat', category: 'World & Travel', difficulty: 'Easy' },
  { word: 'MERIDIAN', hint: 'A circle of constant longitude passing through a given place and the terrestrial poles', category: 'World & Travel', difficulty: 'Medium' },
  { word: 'WATERFALL', hint: 'A cascade of water falling from a height, formed when a river flows over a precipice', category: 'World & Travel', difficulty: 'Hard' },
  { word: 'DESERT', hint: 'A barren area of landscape where little precipitation occurs, creating hostile living conditions', category: 'World & Travel', difficulty: 'Medium' },
  { word: 'LAGOON', hint: 'A shallow body of water separated from a larger body of water by reefs or barrier islands', category: 'World & Travel', difficulty: 'Medium' },
  { word: 'MOUNTAIN', hint: 'A large natural elevation of the earth\'s surface rising abruptly from the surrounding level', category: 'World & Travel', difficulty: 'Medium' },
  { word: 'ATOLL', hint: 'A ring-shaped coral reef, island, or series of islets surrounding a body of water called a lagoon', category: 'World & Travel', difficulty: 'Easy' },
  { word: 'TECTONIC', hint: 'Relating to the structure of the earth\'s crust and the large-scale processes within it', category: 'World & Travel', difficulty: 'Medium' },
  { word: 'STRAIT', hint: 'A naturally formed, narrow, typically navigable waterway that connects two larger bodies of water', category: 'World & Travel', difficulty: 'Medium' },
  { word: 'DELTA', hint: 'A landform created by deposition of sediment that is carried by a river entering slower water', category: 'World & Travel', difficulty: 'Easy' },
  { word: 'COMPASS', hint: 'A navigational device that shows directions in a frame of reference that is stationary relative to Earth', category: 'World & Travel', difficulty: 'Medium' }
];

export const ART_WORDS = [
  { word: 'SYMPHONY', hint: 'An elaborate musical composition for full orchestra, typically in four movements', category: 'Art & Music', difficulty: 'Medium' },
  { word: 'MOSAIC', hint: 'A piece of art or image made from the assembling of small pieces of colored glass, stone, or ceramic', category: 'Art & Music', difficulty: 'Medium' },
  { word: 'PORTRAIT', hint: 'A painting, drawing, sculpture, or photograph depicting a specific person or animal', category: 'Art & Music', difficulty: 'Medium' },
  { word: 'PALETTE', hint: 'A thin board or slab on which an artist lays and mixes pigments before painting', category: 'Art & Music', difficulty: 'Medium' },
  { word: 'HARMONY', hint: 'The combination of simultaneously sounded musical notes to produce chords and chord progressions', category: 'Art & Music', difficulty: 'Medium' },
  { word: 'SCULPTURE', hint: 'The branch of the visual arts that operates in three dimensions via carving or casting', category: 'Art & Music', difficulty: 'Hard' },
  { word: 'FRESCO', hint: 'A technique of mural painting executed upon freshly laid, or wet, lime plaster', category: 'Art & Music', difficulty: 'Medium' },
  { word: 'MELODY', hint: 'A linear succession of musical tones that the listener perceives as a single unified entity', category: 'Art & Music', difficulty: 'Medium' },
  { word: 'RHYTHM', hint: 'A strong, regular, repeated pattern of movement or sound in music and poetry', category: 'Art & Music', difficulty: 'Medium' },
  { word: 'CANVAS', hint: 'An extremely durable plain-woven fabric used by artists as a painting surface', category: 'Art & Music', difficulty: 'Medium' },
  { word: 'ACOUSTIC', hint: 'Pertaining to sense of hearing, sound production, or instruments without electrical amplification', category: 'Art & Music', difficulty: 'Medium' },
  { word: 'CHORUS', hint: 'A recurring stanza or refrain in music sung by multiple vocalists in unison', category: 'Art & Music', difficulty: 'Medium' },
  { word: 'ABSTRACT', hint: 'Art that does not attempt to represent external reality, but achieves its effect using shapes and color', category: 'Art & Music', difficulty: 'Medium' },
  { word: 'SONATA', hint: 'A composition for an instrumental soloist, often with a piano accompaniment, in several movements', category: 'Art & Music', difficulty: 'Medium' },
  { word: 'EXHIBIT', hint: 'A public display in an art gallery or museum of artistic works or historical items', category: 'Art & Music', difficulty: 'Medium' },
  { word: 'EASEL', hint: 'An upright tripod frame used for displaying or supporting an artist’s canvas while working', category: 'Art & Music', difficulty: 'Easy' },
  { word: 'COLLAGE', hint: 'A piece of art made by sticking various different materials such as photographs onto a backing', category: 'Art & Music', difficulty: 'Medium' },
  { word: 'CERAMIC', hint: 'Pots and other articles made from clay hardened by high temperature kiln heat', category: 'Art & Music', difficulty: 'Medium' },
  { word: 'TEMPO', hint: 'The speed or pace of a given piece of music typically measured in beats per minute', category: 'Art & Music', difficulty: 'Easy' },
  { word: 'GALLERY', hint: 'A room or building for the display or sale of works of fine visual art', category: 'Art & Music', difficulty: 'Medium' },
  { word: 'CONCERTO', hint: 'A musical composition usually in three parts, with one solo instrument accompanied by an orchestra', category: 'Art & Music', difficulty: 'Medium' },
  { word: 'SKETCH', hint: 'A rough or unfinished drawing or painting, often made to assist in making a more finished picture', category: 'Art & Music', difficulty: 'Medium' }
];

export const CURATED_DECKS = {
  tech: TECH_WORDS,
  space: SPACE_WORDS,
  animals: ANIMALS_WORDS,
  food: FOOD_WORDS,
  science: SCIENCE_WORDS,
  sports: SPORTS_WORDS,
  geography: GEOGRAPHY_WORDS,
  art: ART_WORDS
};

/**
 * Scrambles a word randomly and guarantees the scrambled output
 * does NOT match the original word.
 */
export function scrambleWord(word) {
  const clean = (word || '').toUpperCase().trim();
  if (clean.length <= 1) return clean;

  const letters = clean.split('');
  let scrambled = clean;
  let attempts = 0;
  const maxAttempts = 100;

  // Try random permutations
  while (scrambled === clean && attempts < maxAttempts) {
    const arr = [...letters];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    scrambled = arr.join('');
    attempts++;
  }

  // If still matches, force swap two distinct characters
  if (scrambled === clean) {
    const arr = [...letters];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] !== arr[j]) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          scrambled = arr.join('');
          return scrambled;
        }
      }
    }
  }

  return scrambled;
}
