import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const colleges = [
  {
    slug: "indian-institute-of-technology-delhi",
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi",
    state: "Delhi",
    fee: 820000,
    rating: 4.8,
    placementPercent: 92,
    averagePackageLpa: 21.8,
    highestPackageLpa: 82,
    courseTags: ["Computer Science", "Mechanical", "Electrical"],
    exams: ["JEE"],
    minRank: 1200,
    overview: "A premier engineering institute known for deep research, strong placements, and an active startup ecosystem.",
    established: 1961,
    ownership: "Public",
    campusSizeAcres: 325,
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", seats: 120 },
      { name: "B.Tech Electrical Engineering", duration: "4 years", seats: 110 },
      { name: "M.Tech Data Engineering", duration: "2 years", seats: 60 }
    ],
    reviews: [
      { author: "Aarav", rating: 4.9, comment: "Excellent peer group and internship access." },
      { author: "Meera", rating: 4.7, comment: "Academics are intense, but industry exposure is outstanding." }
    ]
  },
  {
    slug: "birla-institute-of-technology-and-science-pilani",
    name: "BITS Pilani",
    location: "Pilani",
    state: "Rajasthan",
    fee: 2150000,
    rating: 4.7,
    placementPercent: 88,
    averagePackageLpa: 18.6,
    highestPackageLpa: 60,
    courseTags: ["Computer Science", "Electronics", "Pharmacy"],
    exams: ["BITSAT"],
    minRank: 2500,
    overview: "A private institute with a flexible academic structure, strong alumni network, and practice-school industry exposure.",
    established: 1964,
    ownership: "Private",
    campusSizeAcres: 328,
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", seats: 160 },
      { name: "B.E. Electronics and Instrumentation", duration: "4 years", seats: 120 },
      { name: "B.Pharm", duration: "4 years", seats: 60 }
    ],
    reviews: [
      { author: "Kabir", rating: 4.8, comment: "Flexible attendance and project culture are huge advantages." },
      { author: "Nisha", rating: 4.5, comment: "Fees are high, but placements and alumni support help." }
    ]
  },
  {
    slug: "national-institute-of-technology-trichy",
    name: "NIT Trichy",
    location: "Tiruchirappalli",
    state: "Tamil Nadu",
    fee: 650000,
    rating: 4.6,
    placementPercent: 86,
    averagePackageLpa: 15.9,
    highestPackageLpa: 52,
    courseTags: ["Computer Science", "Civil", "Production"],
    exams: ["JEE"],
    minRank: 9000,
    overview: "One of India's strongest NITs, respected for engineering education, technical clubs, and national-level placements.",
    established: 1964,
    ownership: "Public",
    campusSizeAcres: 800,
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", seats: 115 },
      { name: "B.Tech Civil Engineering", duration: "4 years", seats: 105 },
      { name: "MBA", duration: "2 years", seats: 80 }
    ],
    reviews: [
      { author: "Dev", rating: 4.6, comment: "Great technical environment and balanced campus life." },
      { author: "Isha", rating: 4.4, comment: "The campus is large and placements are reliable." }
    ]
  },
  {
    slug: "vellore-institute-of-technology",
    name: "Vellore Institute of Technology",
    location: "Vellore",
    state: "Tamil Nadu",
    fee: 780000,
    rating: 4.2,
    placementPercent: 78,
    averagePackageLpa: 8.9,
    highestPackageLpa: 44,
    courseTags: ["Computer Science", "Biotechnology", "Electronics"],
    exams: ["VITEEE"],
    minRank: 45000,
    overview: "A large private university with many engineering specializations, active clubs, and broad recruiter participation.",
    established: 1984,
    ownership: "Private",
    campusSizeAcres: 372,
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", seats: 720 },
      { name: "B.Tech Biotechnology", duration: "4 years", seats: 180 },
      { name: "B.Tech Electronics", duration: "4 years", seats: 300 }
    ],
    reviews: [
      { author: "Rohan", rating: 4.1, comment: "Many opportunities if you stay proactive." },
      { author: "Sneha", rating: 4.0, comment: "Good infrastructure, though batch sizes are large." }
    ]
  },
  {
    slug: "manipal-institute-of-technology",
    name: "Manipal Institute of Technology",
    location: "Manipal",
    state: "Karnataka",
    fee: 1680000,
    rating: 4.3,
    placementPercent: 76,
    averagePackageLpa: 10.4,
    highestPackageLpa: 54,
    courseTags: ["Computer Science", "Aeronautical", "Mechatronics"],
    exams: ["MET"],
    minRank: 30000,
    overview: "A well-known private engineering institute with strong campus life, interdisciplinary labs, and growing tech placements.",
    established: 1957,
    ownership: "Private",
    campusSizeAcres: 313,
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", seats: 240 },
      { name: "B.Tech Aeronautical Engineering", duration: "4 years", seats: 120 },
      { name: "B.Tech Mechatronics", duration: "4 years", seats: 120 }
    ],
    reviews: [
      { author: "Tara", rating: 4.4, comment: "Projects and student clubs make the experience worthwhile." },
      { author: "Aditya", rating: 4.1, comment: "A polished campus with decent placement support." }
    ]
  },
  {
    slug: "delhi-technological-university",
    name: "Delhi Technological University",
    location: "New Delhi",
    state: "Delhi",
    fee: 940000,
    rating: 4.4,
    placementPercent: 82,
    averagePackageLpa: 13.7,
    highestPackageLpa: 64,
    courseTags: ["Computer Science", "Software Engineering", "Mechanical"],
    exams: ["JEE"],
    minRank: 16000,
    overview: "A public technical university with a strong Delhi-NCR recruiter base and a practical engineering culture.",
    established: 1941,
    ownership: "Public",
    campusSizeAcres: 164,
    courses: [
      { name: "B.Tech Software Engineering", duration: "4 years", seats: 150 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", seats: 180 },
      { name: "B.Tech Computer Engineering", duration: "4 years", seats: 200 }
    ],
    reviews: [
      { author: "Priya", rating: 4.4, comment: "Location helps with internships and networking." },
      { author: "Laksh", rating: 4.2, comment: "Good placements, especially in software roles." }
    ]
  },
  {
    slug: "srm-institute-of-science-and-technology",
    name: "SRM Institute of Science and Technology",
    location: "Chennai",
    state: "Tamil Nadu",
    fee: 1000000,
    rating: 4.0,
    placementPercent: 72,
    averagePackageLpa: 7.5,
    highestPackageLpa: 42,
    courseTags: ["Computer Science", "Information Technology", "Biomedical"],
    exams: ["SRMJEEE"],
    minRank: 52000,
    overview: "A large multidisciplinary private university with broad course choices and a high-volume placement process.",
    established: 1985,
    ownership: "Private",
    campusSizeAcres: 250,
    courses: [
      { name: "B.Tech Information Technology", duration: "4 years", seats: 360 },
      { name: "B.Tech Biomedical Engineering", duration: "4 years", seats: 120 },
      { name: "B.Tech Computer Science", duration: "4 years", seats: 600 }
    ],
    reviews: [
      { author: "Ananya", rating: 4.0, comment: "Campus facilities are strong and courses are varied." },
      { author: "Harsh", rating: 3.9, comment: "Placements depend a lot on skill-building outside class." }
    ]
  },
  {
    slug: "college-of-engineering-pune",
    name: "COEP Technological University",
    location: "Pune",
    state: "Maharashtra",
    fee: 520000,
    rating: 4.3,
    placementPercent: 79,
    averagePackageLpa: 11.2,
    highestPackageLpa: 50,
    courseTags: ["Computer Science", "Civil", "Manufacturing"],
    exams: ["MHT-CET", "JEE"],
    minRank: 22000,
    overview: "A historic public engineering university with strong Maharashtra industry connections and respected core branches.",
    established: 1854,
    ownership: "Public",
    campusSizeAcres: 36,
    courses: [
      { name: "B.Tech Computer Engineering", duration: "4 years", seats: 120 },
      { name: "B.Tech Civil Engineering", duration: "4 years", seats: 90 },
      { name: "B.Tech Manufacturing Science", duration: "4 years", seats: 75 }
    ],
    reviews: [
      { author: "Sahil", rating: 4.3, comment: "Compact campus, excellent legacy, and good Pune access." },
      { author: "Ritika", rating: 4.2, comment: "Core branches have a very solid reputation." }
    ]
  }
];

async function main() {
  await prisma.review.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();

  for (const college of colleges) {
    await prisma.college.create({
      data: {
        ...college,
        courses: { create: college.courses },
        reviews: { create: college.reviews }
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
