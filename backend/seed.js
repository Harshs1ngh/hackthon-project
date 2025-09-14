/**
 * Seed script to generate sample JSON data files.
 * Run: node seed.js
 */
const fs = require('fs');
const path = require('path');
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

function write(name, data) {
  fs.writeFileSync(path.join(dataDir, name), JSON.stringify(data, null, 2));
}

const packages = [
  { id: "pkg1", title: "Budget Beach Escape", description: "3 nights at a beachfront hotel.", price: 199, nights: 3, location: "Goa" },
  { id: "pkg2", title: "City Explorer", description: "4 days of city sightseeing and food tours.", price: 299, nights: 4, location: "Delhi" },
  { id: "pkg3", title: "Mountain Retreat", description: "Cozy cabin in the hills, perfect for relaxation.", price: 399, nights: 5, location: "Manali" }
];

const testimonials = [
  { id: "t1", name: "Asha", text: "Amazing trip, highly recommended!" },
  { id: "t2", name: "Ravi", text: "Good arrangements and friendly staff." }
];

const agents = [
  { id: "a1", name: "TravelPro", phone: "+91-9000000000", email: "agent@example.com" }
];

const users = [
  { id: "u1", name: "Test User", email: "test@example.com", password: "test123" }
];

write('packages.json', packages);
write('testimonials.json', testimonials);
write('agents.json', agents);
write('users.json', users);
write('contacts.json', []);
console.log('Seeded data into ./data/*.json');