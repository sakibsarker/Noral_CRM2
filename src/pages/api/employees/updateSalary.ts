// /pages/api/updateSalary.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const updatedSalary = await prisma.salaries.update({
        where: { id: 1 }, // Mettre à jour l'employé avec l'ID 1
        data: {
          salaryNet: {
            increment: 10000, // Augmenter le salaire net de 100
          },
        },
      });

      res.status(200).json(updatedSalary);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour du salaire', error });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}


