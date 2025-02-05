import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
    field: 'session_id',
    headerName: 'Session Id',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'total_queries',
    headerName: 'Total Queries',
    type: 'number',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'query_time',
    headerName: 'Query Time',
    description: 'This column has a value getter and is not sortable.',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'origin_url',
    headerName: 'Origin URL',
    type: 'string',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function ChatBotQueryTable({ queries,company,chatbot }) {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (queries) {
      // Count total queries for each session
      const sessionCounts = queries.reduce((acc, query) => {
        acc[query.session_id] = (acc[query.session_id] || 0) + 1;
        return acc;
      }, {});
  
      // Map rows with total queries and convert query_time to Date for sorting
      const rowsWithTotalQueries = queries
        .map((query) => ({
          ...query,
          total_queries: sessionCounts[query.session_id] || 0,
          query_time: new Date(query.query_time), // Convert query_time to Date
        }))
        .sort((a, b) => b.query_time - a.query_time); // Sort by query_time descending
  
      setRows(rowsWithTotalQueries);
      setLoading(false);
    }
  }, [queries]);
  
  

  const handleRowClick = (params) => {
    const sessionId = params.row.session_id;

    
    const chatMessages = queries
      .filter((query) => query.session_id === sessionId)
      .map((query) => ({
        query_text_bot: query.query_text_bot,
        query_text_user: query.query_text_user,
        session_id: query.session_id,
      }))
      .sort((a, b) => new Date(a.query_time) - new Date(b.query_time)); 

   
    navigate(`/chat/${sessionId}`, { state: { chatMessages,company,chatbot } });
  };
  

  const distinctRows = rows.filter((value, index, self) => {
    return (
      index === self.findIndex((row) => row.session_id === value.session_id)
    );
  });

  return (
    <div className="mt-[2rem] flex items-center justify-left">
      <Paper sx={{ height: 400, width: '100%', position: 'relative' }}>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <DataGrid
            rows={distinctRows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            getRowId={(row) => row.id}
            disableSelectionOnClick
            onRowClick={handleRowClick}
            sx={{
              border: 0,
              '& .MuiDataGrid-columnHeaderTitle': {
                display: 'flex',
                justifyContent: 'center',
              },
            }}
          />
        )}
      </Paper>
    </div>
  );
}
