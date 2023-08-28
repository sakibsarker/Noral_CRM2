// pages/api/updateEmployee.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { firstName, lastName, email, photo } = req.body;
    const birthDate = new Date('2023-04-01');
    const phoneNumber = parseInt('0662928047', 10);
    const situationId = parseInt('2', 10);

    try {
      const newEmployee = await prisma.employee.create({
        data: {
          firstName,
          lastName,
          birthDate,
          email,
          phoneNumber,
          situationId,
          disabled: false,
          photo,
        },
      });

      res.status(201).json(newEmployee);
    } catch (error) {
      console.error('Error while creating a new employee:', error);
      res.status(500).json({ message: 'An error occurred while creating a new employee' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
