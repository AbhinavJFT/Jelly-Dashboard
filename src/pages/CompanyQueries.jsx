import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';

const CompanyQueries = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const companies = location.state.companies;

  // State for pagination
  const [page, setPage] = useState(0); // Current page number
  const [rowsPerPage, setRowsPerPage] = useState(6); // Number of rows per page

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  const calculateTotalCost = (company) => {
    return (company.input_token_cost + company.output_token_cost).toFixed(3);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value); // Convert to number
    setPage(0); // Reset to the first page when rows per page changes
  };

  // Get current page rows
  const currentPageData = companies.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="h-auto bg-gradient-to-b from-black to-[#343368] text-white p-[2rem] relative">
      <Navbar />
      <button
        className="border h-[3rem] w-[7rem] mt-[1.2rem] hover:font-bold text-[1rem]"
        onClick={handleBackClick}
      >
        Back
      </button>

      <div className="h-[50rem] mt-[2rem] flex gap-5 ">
        <Sidebar />
        <div className="w-[80%] h-auto ">
          <div className="flex-grow overflow-x-auto mt-[8.5rem] h-auto p-3">
            <TableContainer component={Paper} sx={{ padding: '1rem' }}>
              <Table sx={{ minWidth: 650 }} aria-label="company costings table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: 'bold', padding: '1rem' }}
                    >
                      Company Name
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: 'bold', padding: '1rem' }}
                    >
                      Total Queries
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: 'bold', padding: '1rem' }}
                    >
                      Base URL
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentPageData &&
                    currentPageData.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell align="center" sx={{ padding: '1rem' }}>
                          {company.company_name}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: '1rem' }}>
                          {company.total_queries}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: '1rem' }}>
                          {company.base_url}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[6, 10, 25]}
                component="div"
                count={companies.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyQueries;
