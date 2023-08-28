import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { employeeId, year } = req.query;

    try {
      const salaryData = await prisma.salaries.findMany({
        where: {
          employeeId: parseInt(employeeId as string),
          year: parseInt(year as string),
        },
        orderBy: {
          month: 'asc',
        },
      });

      res.status(200).json(salaryData);
    } catch (error) {
      console.error('Error fetching salary data:', error);
      res.status(500).json({ message: 'An error occurred while fetching salary data.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
};

export default handler;
