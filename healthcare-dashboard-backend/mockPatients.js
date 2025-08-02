// Removed Python imports; using JavaScript only.
const fs = require('fs');

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    .toISOString().split('T')[0];
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pad(num, size) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Carol', 'David', 'Eve', 'Frank', 'Grace', 'Hank'];
const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Martinez'];
const streets = ['Main St', 'Oak Ave', 'Pine Rd', 'Maple Dr', 'Elm St', 'Cedar Ln'];
const cities = ['Anytown', 'Otherville', 'Springfield', 'Riverside', 'Greenville'];
const states = ['CA', 'NY', 'TX', 'FL', 'IL'];
const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const conditions = ['Hypertension', 'Diabetes', 'Asthma', 'COPD', 'Arthritis', 'None'];
const allergies = ['Peanuts', 'Shellfish', 'None', 'Penicillin', 'Latex'];
const providers = ['BlueCross', 'Aetna', 'Cigna', 'UnitedHealth', 'Kaiser'];
const relationships = ['Spouse', 'Husband', 'Wife', 'Parent', 'Sibling', 'Friend'];
const statuses = ['active', 'inactive'];

function randomPhone() {
  return `${Math.floor(100 + Math.random()*900)}-${Math.floor(100 + Math.random()*900)}-${Math.floor(1000 + Math.random()*9000)}`;
}

function randomMedications() {
  const meds = [
    { name: "Lisinopril", dosage: "10mg", frequency: "daily" },
    { name: "Metformin", dosage: "500mg", frequency: "twice daily" },
    { name: "Atorvastatin", dosage: "20mg", frequency: "daily" }
  ];
  return Math.random() > 0.5 ? [randomChoice(meds)] : [];
}

const patients = [];

for (let i = 1; i <= 1000; i++) {
  const firstName = randomChoice(firstNames);
  const lastName = randomChoice(lastNames);
  const dob = randomDate(new Date(1940, 0, 1), new Date(2010, 0, 1));
  const city = randomChoice(cities);
  const state = randomChoice(states);
  const street = `${Math.floor(Math.random()*1000)} ${randomChoice(streets)}`;
  const zip = pad(Math.floor(Math.random()*90000)+10000, 5);
  const country = "USA";
  const allergyList = Math.random() > 0.7 ? [randomChoice(allergies)] : [];
  const condList = Math.random() > 0.5 ? [randomChoice(conditions)] : [];
  const medList = randomMedications();
  const bloodType = randomChoice(bloodTypes);
  const lastVisit = randomDate(new Date(2022, 0, 1), new Date());
  const status = randomChoice(statuses);
  const provider = randomChoice(providers);
  const policyNumber = Math.random().toString(36).substring(2, 10).toUpperCase();
  const effectiveDate = randomDate(new Date(2015, 0, 1), new Date(2023, 0, 1));
  const expirationDate = randomDate(new Date(2024, 0, 1), new Date(2030, 0, 1));
  const copay = Math.random() > 0.5 ? 0 : 20;
  const deductible = Math.random() > 0.5 ? 0 : 500;
  const createdAt = new Date(Date.now() - Math.floor(Math.random()*10000000000)).toISOString();
  const updatedAt = new Date(Date.now() - Math.floor(Math.random()*1000000000)).toISOString();
  const emergencyContactName = randomChoice(firstNames) + ' ' + randomChoice(lastNames);
  const emergencyContactRelationship = randomChoice(relationships);
  const emergencyContactPhone = randomPhone();

  patients.push({
    id: `pat-${pad(i, 3)}`,
    firstName,
    lastName,
    dateOfBirth: dob,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
    phone: randomPhone(),
    address: {
      street,
      city,
      state,
      zipCode: zip,
      country
    },
    emergencyContact: {
      name: emergencyContactName,
      relationship: emergencyContactRelationship,
      phone: emergencyContactPhone
    },
    medicalInfo: {
      allergies: allergyList,
      currentMedications: medList,
      conditions: condList,
      bloodType,
      lastVisit,
      status
    },
    insurance: {
      provider,
      policyNumber,
      effectiveDate,
      expirationDate,
      copay,
      deductible
    },
    documents: [],
    createdAt,
    updatedAt
  });
}

fs.writeFileSync('mockPatients.json', JSON.stringify(patients, null, 2));
console.log('Generated 1000 mock patient records.');
