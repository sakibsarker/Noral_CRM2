import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      employeeId,
      idCompany,
      contractTypeId,
      jobTypeId,
      jobTitleId,
      description,
      startDate,
      endDate,
    } = req.body;

    try {
      // Convertir les chaînes de caractères en entiers
      const companyIdInt = parseInt(idCompany);
      const contractTypeIdInt = parseInt(contractTypeId);
      const jobTypeIdInt = parseInt(jobTypeId);
      const jobTitleIdInt = parseInt(jobTitleId);

      // Convertir les chaînes de caractères en objets DateTime
      const startDateTime = new Date(startDate);
      const endDateTime = endDate ? new Date(endDate) : null;

      // Vérifier si les données du contrat existent déjà
      const existingContract = await prisma.contracts.findFirst({
        where: {
          employeeId: employeeId,
        },
      });

      if (existingContract) {
        // Mettre à jour le contrat existant
        await prisma.contracts.update({
          where: {
            id: existingContract.id,
          },
          data: {
            idCompany: companyIdInt,
            contractTypeId: contractTypeIdInt,
            jobTypeId: jobTypeIdInt,
            jobTitleId: jobTitleIdInt,
            description,
            startDate: startDateTime,
            endDate: endDateTime,
          },
        });
      } else {
        // Créer un nouveau contrat
        await prisma.contracts.create({
          data: {
            employeeId,
            idCompany: companyIdInt,
            contractTypeId: contractTypeIdInt,
            jobTypeId: jobTypeIdInt,
            jobTitleId: jobTitleIdInt,
            description,
            startDate: startDateTime,
            endDate: endDateTime,
          },
        });
      }

      res.status(201).json({ message: "Contract data processed successfully." });
    } catch (error) {
      console.error("Error while processing contract data:", error);
      res.status(500).json({ message: "An error occurred while processing contract data." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
};

export default handler;
