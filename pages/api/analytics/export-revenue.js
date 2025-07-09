
// pages/api/analytics/export-revenue.js
export async function exportRevenueData(req, res) {
  const { format, ...filters } = req.query

  try {
    // Fetch the same data as the reports endpoint
    const data = await getRevenueReportsData(filters)

    if (format === 'csv') {
      const csv = generateCSV(data)
      res.setHeader('Content-Type', 'text/csv')
      res.setHeader('Content-Disposition', 'attachment; filename=revenue-report.csv')
      return res.send(csv)
    }

    if (format === 'pdf') {
      // In a real app, you'd use a PDF library like puppeteer or jsPDF
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', 'attachment; filename=revenue-report.pdf')
      return res.send('PDF generation not implemented yet')
    }

    return res.status(400).json({ message: 'Invalid format' })

  } catch (error) {
    console.error('Export error:', error)
    return res.status(500).json({ message: 'Export failed' })
  }
}

function generateCSV(data) {
  const headers = ['Period', 'Jobs', 'Revenue', 'Average Order', 'Growth']
  const rows = data.detailedData.map(row => [
    row.period,
    row.jobs,
    row.revenue,
    row.averageOrder,
    `${row.growth}%`
  ])

  return [headers, ...rows].map(row => row.join(',')).join('\n')
}