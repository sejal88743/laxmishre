import { Box, Button, Grid, Typography } from '@mui/material';

const Report = () => {
  // Mock report generation functions
  const handleGenerateReport = (reportType) => {
    console.log(`Generating ${reportType} report...`);
    // Here you would typically make an API call to generate the report
  };

  const reportTypes = [
    { type: 'daily', label: 'Daily Report' },
    { type: 'weekly', label: 'Weekly Report' },
    { type: 'monthly', label: 'Monthly Report' },
    { type: 'worker', label: 'Worker-wise Report' },
    { type: 'machine', label: 'Machine-wise Report' },
    { type: 'bim', label: 'BIM-wise Report' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Grid container spacing={2} className="report-buttons">
        {reportTypes.map((report) => (
          <Grid item xs={12} sm={4} key={report.type}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleGenerateReport(report.type)}
              size="small"
              sx={{ height: '40px', fontSize: '0.875rem' }}
            >
              {report.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Report;