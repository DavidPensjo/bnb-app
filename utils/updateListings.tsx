const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// MongoDB object updater, since I can't migrate using MongoDB ;_;
async function updateListings() {
  try {
    await prisma.listing.updateMany({
      data: {
        hasDishwasher: false,
        hasWifi: false,
        hasAirConditioning: false,
        hasPool: false,
        hasParking: false,
        hasGym: false,
        hasWasher: false,
        hasDryer: false,
      },
    });

    console.log(
      "All fields have been updated"
    );
  } catch (error) {
    console.error("Error updating listings:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateListings();
