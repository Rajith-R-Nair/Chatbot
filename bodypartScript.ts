const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const bodyParts = [
        'Head',
        'Neck',
        'Jaw',
        'Chest',
        'Back',
        'Shoulder',
        'Elbow',
        'Knee',
        'Hand',
        'Hip',
        'Ankle',
        'HandR',
        "FootR",
   
    ];
    const backBodyParts = [
        'ThoracicSpine',
        'LumbarSpineLowerBack',
        'SacroiliacJointSIJ'
    ];

    for (let part of bodyParts) {
        await prisma.Bodypart.createMany({
            data: {
                bodypartname: part,
            },
        });
    }


    for (let backPart of backBodyParts) {
        await prisma.BackBodypart.createMany({
            data: {
                bodypartname: backPart,
            }
        });
    }
   
}

main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });