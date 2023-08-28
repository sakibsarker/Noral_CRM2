import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Data received:", req.body)
  if (req.method === 'POST') {
    const { employeeId, year, monthSalaries, currency } = req.body;
    
    console.log('Received data:', { employeeId, year, monthSalaries, currency });

    try {
      // Utiliser une boucle pour insérer ou mettre à jour tous les mois
      for (let month = 0; month < 12; month++) {
        const existingSalary = await prisma.salaries.findFirst({
          where: {
            employeeId: employeeId,
            year: Number(year),
            month: month + 1,
          },
        });

        if (existingSalary) {
          await prisma.salaries.update({
            where: {
              id: existingSalary.id, // Utilisez existingSalary.id au lieu de employeeId
            },
            data: {
              currency,
              salaryNet: monthSalaries[month],
              salaryBrut: monthSalaries[month] * 1.4,
            },
          });
        } else {
          await prisma.salaries.create({
            data: {
              employeeId,
              year,
              month: month + 1, // Les mois vont de 1 à 12
              currency,
              salaryNet: monthSalaries[month],
              salaryBrut: monthSalaries[month] * 1.4,
            },
          });
        }
      }

      res.status(201).json({ message: 'Salary data added or updated successfully.' });
    } catch (error) {
      console.error('Error while adding or updating salary data:', error);
      res.status(500).json({ message: 'An error occurred while adding or updating salary data.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
};

export default handler;

