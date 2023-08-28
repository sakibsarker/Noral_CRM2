// @ts-nocheck
import { useEffect, useState } from 'react';
import {
  CButton,
  CCardBody,
  CCollapse,
  CSmartTable,
  CTableDataCell,
  CAvatar,
  CCard,
  CCardHeader,
  CTable,
  CTableRow,
  CTableBody,
  CFormInput,
  CFormSelect,
} from '@coreui/react-pro';
import { EmployeeProps } from '../../components/Employees';
import FormEmployeeSalaries from "./FormEmployeeSalaries";
import FormEmployeeContract from "./FormEmployeeContract";

type Props = {
  feed: EmployeeProps[];
  dropdownValues: any[];
  apiRoute: String[];
};

const updateEmployee = async (item: any, updatedData: any) => {
  try {
    
    const apiUrl =`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employees/updateEmployee`;
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: item.id,
        ...updatedData,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update employee data');
    }
  } catch (error) {
    console.error('Error while updating employee data:', error);
  }
};



function EmployeeTable(props: Props) {
  const [updatedItems, setUpdatedItems] = useState<any>({});
  const [details, setDetails] = useState<number[]>([]);
  const [editingRows, setEditingRows] = useState<number[]>([]);

  const toggleDetails = (itemId: number) => {
    const position = details.indexOf(itemId);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, itemId];
    }
    setDetails(newDetails);
  };

  const [openedCards, setOpenedCards] = useState<{ [key: string]: boolean }>({});

  const toggleCard = (itemId: number, cardName: string) => {
    setOpenedCards((prevState) => ({
      ...prevState,
      [`${itemId}_${cardName}`]: !prevState[`${itemId}_${cardName}`],
    }));
  };

  const toggleEdit = async (itemId: number) => {
    const item = items.find((item) => item.id === itemId);
    const position = editingRows.indexOf(item.id);
    let newEditingRows = editingRows.slice();
    if (position !== -1) {
      newEditingRows.splice(position, 1);
      if (updatedItems[item.id]) {
        await updateEmployee(item, updatedItems[item.id]);
      }
    } else {
      newEditingRows = [...editingRows, item.id];
    }
    setEditingRows(newEditingRows);
  };

  const items = (props.feed || []).map((employee) => {
    const {
      id,
      firstName,
      lastName,
      birthDate,
      email,
      phoneNumber,
      disabled,
      photo,
    } = employee;
    return {
      id,
      firstName,
      lastName,
      birthDate,
      email,
      phoneNumber,
      disabled,
      avatar: photo,
    };
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    item: any,
    field: string
  ) => {
    let value;

    if (field === 'phoneNumber') {
      value = parseInt(event.target.value, 10);
    } else if (field === 'disabled') {
      value = event.target.value === '1';
    } else {
      value = event.target.value;
    }

    setUpdatedItems((prevItems) => ({
      ...prevItems,
      [item.id]: {
        ...(prevItems[item.id] || {}),
        [field]: value,
      },
    }));
  };

  const columns = [
    { key: 'avatar', label: '', _style: { width: '5%' }, filter: false, sorter: false },
    { key: 'firstName', label: 'First Name', _style: { width: '10%' } },
    { key: 'lastName', label: 'Last Name', _style: { width: '10%' } },
    { key: 'email', label: 'Email', _style: { width: '15%' } },
    { key: 'phoneNumber', label: 'Phone Number', _style: { width: '15%' } },
    { key: 'disabled', label: 'Disabled', _style: { width: '5%' } },
    {
      key: 'edit',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    }, {
      key: 'show',
      label: '',
      _style: { width: '1%' },
      filter: false,
      sorter: false,
    },
  ];

  return (
    <CSmartTable
      sorterValue={{ column: 'firstName', state: 'asc' }}
      clickableRows
      tableProps={{
        striped: true,
        hover: true,
      }}
      items={items}
      columns={columns}
      columnFilter
      itemsPerPageSelect
      itemsPerPage={10}
      columnSorter
      pagination
      scopedColumns={{
        avatar: (item: any) => {
          return (
            <td>
              <CAvatar src="/_next/static/media/7.0f2d28b1.jpg" />
            </td>
          );
        },
        edit: (item: any, index: number) => {
          return (
            <td className="py-2">
              <CButton
                color="warning"
                variant="outline"
                shape="square"
                size="sm"
                onClick={() => toggleEdit(item.id)}
              >
                {editingRows.includes(item.id) ? 'Validate' : 'Edit'}
              </CButton>
            </td>
          );
        },
        firstName: (item: any, index: number) => {
          if (editingRows.includes(item.id)) {
            return (
              <CTableDataCell>
                <CFormInput
                  type="text"
                  defaultValue={item.firstName}
                  placeholder="First Name"
                  onChange={(event) => handleInputChange(event, item, 'firstName')}
                />
              </CTableDataCell>
            );
          } else {
            return <CTableDataCell>{item.firstName}</CTableDataCell>;
          }
        },
        lastName: (item: any, index: number) => {
          if (editingRows.includes(item.id)) {
            return (
              <CTableDataCell>
                <CFormInput
                  type="text"
                  defaultValue={item.lastName}
                  placeholder="Last Name"
                  onChange={(event) => handleInputChange(event, item, 'lastName')}
                />
              </CTableDataCell>
            );
          } else {
            return <CTableDataCell>{item.lastName}</CTableDataCell>;
          }
        },
        email: (item: any, index: number) => {
          if (editingRows.includes(item.id)) {
            return (
              <CTableDataCell>
                <CFormInput
                  type="email"
                  defaultValue={item.email}
                  placeholder="Email"
                  onChange={(event) => handleInputChange(event, item, 'email')}
                />
              </CTableDataCell>
            );
          } else {
            return <CTableDataCell>{item.email}</CTableDataCell>;
          }
        },
        phoneNumber: (item: any, index: number) => {
          if (editingRows.includes(item.id)) {
            return (
              <CTableDataCell>
                <CFormInput
                  type="number"
                  defaultValue={item.phoneNumber}
                  placeholder="Phone Number"
                  onChange={(event) => handleInputChange(event, item, 'phoneNumber')}
                />
              </CTableDataCell>
            );
          } else {
            return <CTableDataCell>{item.phoneNumber}</CTableDataCell>;
          }
        }, disabled: (item: any, index: number) => {
          if (editingRows.includes(item.id)) {
            const updatedItem = updatedItems[item.id] || item;
            return (
              <CTableDataCell>
                <CFormSelect
                  value={updatedItem.disabled ? '1' : '0'}
                  onChange={(event) =>
                    handleInputChange(event, item, 'disabled')
                  }
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </CFormSelect>
              </CTableDataCell>
            );
          } else {
            return (
              <CTableDataCell>{item.disabled ? 'Yes' : 'No'}</CTableDataCell>
            );
          }
        },
        show: (item: any, index: number) => {
          return (
            <td className="py-2">
              <CButton
                color="info"
                variant="outline"
                shape="square"
                size="sm"
                onClick={() => toggleDetails(item.id)}
              >
                {details.includes(item.id) ? 'Hide' : 'Show'}
              </CButton>
            </td>
          );
        },
        details: (item: any, index: number) => {
          if (details.includes(item.id)) {
            return (
              <CCollapse visible={details.includes(item.id)}>
                <CCard>
                  <CCardBody> Here we manage the details of the employees in relation to the contracts and the salaries. </CCardBody>
                </CCard>
                <CCard>
                  <CCardHeader className="bg-grey" onClick={() => toggleCard(item.id, "contract")}>
                    <strong>Contract of {item.lastName} {item.firstName}</strong>
                  </CCardHeader>
                  <CCollapse visible={openedCards[`${item.id}_contract`]}>
                    <CCardBody>
                      <FormEmployeeContract
                        employeeId={item.id}
                        feed={props.feed}
                        dropdownValues={props.dropdownValues}
                      />
                    </CCardBody>
                  </CCollapse>
                </CCard>
                <CCard>
                  <CCardHeader className="bg-grey" onClick={() => toggleCard(item.id, "salary")}>
                    <strong>Salaries of {item.lastName} {item.firstName}</strong>
                  </CCardHeader>
                  <CCollapse visible={openedCards[`${item.id}_salary`]}>
                    <CCardBody>
                      <FormEmployeeSalaries
                        employeeId={item.id}
                        feed={props.feed}
                        dropdownValues={props.dropdownValues}
                      />
                    </CCardBody>
                  </CCollapse>
                </CCard>
              </CCollapse>
            );

          }
          return null;
        },

      }}
    />
  );
}

export default EmployeeTable;
