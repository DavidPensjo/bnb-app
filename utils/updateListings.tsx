// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// Scuffed script to update listings with missing fields

// async function updateListings() {
//   try {
//     const listings = await prisma.listing.findMany();

//     for (const listing of listings) {
//       const updates = {};

//       if (listing.hasDishwasher === undefined) updates.hasDishwasher = false;
//       if (listing.hasWifi === undefined) updates.hasWifi = false;
//       if (listing.hasAirConditioning === undefined) updates.hasAirConditioning = false;
//       if (listing.hasPool === undefined) updates.hasPool = false;
//       if (listing.hasParking === undefined) updates.hasParking = false;
//       if (listing.hasGym === undefined) updates.hasGym = false;
//       if (listing.hasWasher === undefined) updates.hasWasher = false;
//       if (listing.hasDryer === undefined) updates.hasDryer = false;

//       if (Object.keys(updates).length > 0) {
//         await prisma.listing.update({
//           where: { id: listing.id },
//           data: updates,
//         });
//       }
//     }

//     console.log("All fields have been updated as needed.");
//   } catch (error) {
//     console.error("Error updating listings:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// updateListings();
