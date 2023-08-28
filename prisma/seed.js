const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Ajouter une valeur par défaut à la table Employee
  await prisma.employee.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      birthDate: new Date("1990-01-01"),
      idAdress: 1,
      email: "johndoe@example.com",
      phoneNumber: 1234567890,
      situationId: 1,
      disabled: false,
      photo: "default.jpg",
    },
  });

  // Ajouter une valeur par défaut à la table Salaries
  await prisma.salaries.create({
    data: {
      employeeId: 1,
      year: 2023,
      month: 1,
      currency: "Euro",
      salaryNet: 2000,
      salaryBrut: 2500,
    },
  });

  // Ajouter une valeur par défaut à la table Contracts
  await prisma.contracts.create({
    data: {
      employeeId: 1,
      idCompany: 1,
      contractTypeId: 1,
      jobTypeId: 1,
      jobTitleId: 1,
      description: "Exemple de description",
    },
  });

  // Situations
  const situations = ['Célibataire', 'Marié(e)', 'Veuf(ve)', 'Divorcé(e)'];
  const situationData = situations.map((label, index) => ({
    idCategory: 1,
    labelCategory: 'Situation',
    idListed: index + 1,
    icon: 'situation_icon.jpg',
    label,
  }));
  await prisma.dropdownValues.createMany({ data: situationData });

  // Types de contrat
  const contractTypes = ['CDI', 'CDD', 'Intérim', 'Freelance'];
  const contractTypeData = contractTypes.map((label, index) => ({
    idCategory: 2,
    labelCategory: 'Type de contrat',
    idListed: index + 1,
    icon: 'contract_icon.jpg',
    label,
  }));
  await prisma.dropdownValues.createMany({ data: contractTypeData });

  // Types d'emploi
  const jobTypes = ['Temps plein', 'Temps partiel', 'Stagiaire', 'Apprenti'];
  const jobTypeData = jobTypes.map((label, index) => ({
    idCategory: 3,
    labelCategory: 'Type d\'emploi',
    idListed: index + 1,
    icon: 'job_type_icon.jpg',
    label,
  }));
  await prisma.dropdownValues.createMany({ data: jobTypeData });

  // Titres de poste
  const jobTitles = ['Ingénieur', 'Technicien', 'Manager', 'Directeur'];
  const jobTitleData = jobTitles.map((label, index) => ({
    idCategory: 4,
    labelCategory: 'Titre de poste',
    idListed: index + 1,
    icon: 'job_title_icon.jpg',
    label,
  }));
  await prisma.dropdownValues.createMany({ data: jobTitleData });
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
