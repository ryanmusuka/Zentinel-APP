import { PrismaClient, InspectionResult, PayStatus, DetectionMethod } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting Zentinel Seeding...')

  // ==========================================
  // 1. CREATE STATUTORY CODES (The Laws)
  // ==========================================
  console.log('... Seeding Laws')
  
  const lawLicense = await prisma.statutoryCode.upsert({
    where: { offenseCode: 'SI-129-01' },
    update: {},
    create: {
      offenseCode: 'SI-129-01',
      shortDesc: 'Operating without valid driver license',
      statutoryRef: 'Section 129 of RTA',
      fineAmount: 20.00,
      isCritical: false
    }
  })

  const lawTires = await prisma.statutoryCode.upsert({
    where: { offenseCode: 'SI-154-12' },
    update: {},
    create: {
      offenseCode: 'SI-154-12',
      shortDesc: 'Worn out tires (canvas exposed)',
      statutoryRef: 'SI 154 of 2010',
      fineAmount: 30.00,
      isCritical: true, // This is a critical safety issue
    }
  })

  // ==========================================
  // 2. CREATE USERS (The Officers)
  // ==========================================
  console.log('... Seeding Officers')

  const officerMoyo = await prisma.user.upsert({
    where: { officerId: '0800-ZRP' },
    update: {},
    create: {
      officerId: '0800-ZRP',
      fullName: 'Tinashe Moyo',
      rank: 'CONSTABLE',
      stationId: 'GWERU-CENTRAL',
      passwordHash: 'mock_hash_123', // In real app, this must be bcrypt hash
      salt: 'mock_salt',
      status: true
    }
  })

  const officerNdlovu = await prisma.user.upsert({
    where: { officerId: '0900-ZRP' },
    update: {},
    create: {
      officerId: '0900-ZRP',
      fullName: 'Sarah Ndlovu',
      rank: 'SGT',
      stationId: 'HARARE-CENTRAL',
      passwordHash: 'mock_hash_456',
      salt: 'mock_salt',
      status: true
    }
  })

  // ==========================================
  // 3. CREATE VEHICLES (The Registry)
  // ==========================================
  console.log('... Seeding Vehicles')

  const hondaFit = await prisma.vehicle.upsert({
    where: { vrn: 'ABZ-9988' }, // Honda Fit
    update: {},
    create: {
      vrn: 'ABZ-9988',
      vin: 'JHM-FIT-2015-X99',
      makeModel: 'Honda Fit (Silver)',
      class: 'PASSENGER',
      ownerName: 'Blessing Chigumba',
    }
  })

  const hilux = await prisma.vehicle.upsert({
    where: { vrn: 'AFE-1234' }, // Toyota Hilux
    update: {},
    create: {
      vrn: 'AFE-1234',
      vin: 'AHT-TOYO-2022-G6',
      makeModel: 'Toyota Hilux GD-6',
      class: 'HEAVY',
      ownerName: 'Mining Corp Ltd',
    }
  })

  // ==========================================
  // 4. CREATE SCENARIO (Inspection & Ticket)
  // ==========================================
  console.log('... Seeding Live Scenario')

  // Scenario: Officer Moyo checks the Honda Fit, Fails it, and Issues a Ticket
  
  // A. Create the Inspection Log
  // We use 'create' here because inspections are historical events (many can exist)
  // To avoid duplicates on re-seed, we check if one exists for this VRN today first, 
  // but for simplicity in this script, we'll just create a fresh one.
  const inspection = await prisma.inspection.create({
    data: {
      officerId: officerMoyo.officerId,
      vrn: hondaFit.vrn,
      gpsLat: -19.4567, // Somewhere in Gweru
      gpsLong: 29.8231,
      result: InspectionResult.FAIL,
      timestamp: new Date(), // Now
    }
  })

  // B. Issue the Ticket linked to that Inspection
  const ticket = await prisma.ticket.create({
    data: {
      inspectionId: inspection.inspectionId,
      vrn: hondaFit.vrn,
      totalAmount: 30.00,
      payStatus: PayStatus.PENDING,
      lines: {
        create: [
          {
            offenseCode: lawTires.offenseCode,
            appliedFine: 30.00,
            detectionMethod: DetectionMethod.CHECKLIST
          }
        ]
      }
    }
  })

  console.log(`✅ Seeding Finished. Created Ticket UUID: ${ticket.ticketUuid}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })