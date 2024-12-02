import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { columns, rows } from '../internals/data/gridData';

export default function CustomizedDataGrid() {
  const [data, setData] = React.useState([]); // State for fetched data
  const [loading, setLoading] = React.useState(true); // State for loading indicator
  const navigate = useNavigate(); // Hook to navigate programmatically

  React.useEffect(() => {
    fetch('http://localhost:8000/api/planning/tasks')
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Update state with fetched data
        setLoading(false); // Turn off loading state
      });
  }, []);

  const handleRowClick = (param) => {
    const taskId = param.row.id; 
    navigate(`/tasks/${taskId}`);
    console.log("Row no called: ",taskId)
  };

  return (
    <DataGrid
      autoHeight
      checkboxSelection
      rows={data}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
      onRowClick={handleRowClick} // Add the onRowClick handler
    />
  );
}
