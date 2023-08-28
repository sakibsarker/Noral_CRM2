// pages/api/updateEmployee.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
console.log(req.method)
  if (req.method === 'PUT') {
    const { id, firstName, lastName, email, birthDate, phoneNumber, situationId, disabled, photo } = req.body;


    try {
      let updatedEmployeeData = {
        firstName,
        lastName,
        birthDate,
        email,
        phoneNumber,
        situationId,
        disabled,
      };

      // Mettre à jour l'employé dans la base de données
      const updatedEmployee = await prisma.employee.update({
        where: { id },
        data: updatedEmployeeData,
      });

      res.status(200).json(updatedEmployee);
    } catch (error) {
      console.error('Error while updating an employee:', error);
      res.status(500).json({ message: 'An error occurred while updating an employee' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
