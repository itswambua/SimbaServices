// pages/api/invoices/generatepdf.js (Simplified version without PDFKit dependency)
import { prisma } from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: 'Invoice ID is required' })
  }

  try {
    // Fetch invoice with customer and booking details
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        customer: true,
        booking: true
      }
    })

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' })
    }

    // Parse items
    const items = invoice.items ? JSON.parse(invoice.items) : []
    
    // Since we don't have PDFKit, we'll generate a simple text representation
    let invoiceText = `
SIMBA CLEANING SERVICES
123 Business St, Sydney NSW 2000, Australia
Phone: +61 400 123 456 | Email: info@simbacleaning.com

INVOICE #${invoice.invoiceId}
Date: ${new Date(invoice.issueDate).toLocaleDateString()}
Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}

BILL TO:
${invoice.customer?.name || 'Unknown Customer'}
Email: ${invoice.customer?.email || 'N/A'}
${invoice.customer?.phone ? `Phone: ${invoice.customer.phone}` : ''}
${invoice.customer?.address ? `Address: ${invoice.customer.address}` : ''}

${invoice.booking ? `
SERVICE DETAILS:
Service: ${invoice.booking.service}
Date: ${new Date(invoice.booking.date).toLocaleDateString()}
Time: ${invoice.booking.time}
Location: ${invoice.booking.address}
` : ''}

INVOICE ITEMS:
${'#'.padEnd(5)} ${'Description'.padEnd(30)} ${'Qty'.padEnd(5)} ${'Rate'.padEnd(10)} ${'Amount'.padEnd(10)}
${'-'.repeat(70)}
${items.map((item, i) => 
  `${(i + 1).toString().padEnd(5)} ${item.description.padEnd(30)} ${item.quantity.toString().padEnd(5)} $${item.rate.toFixed(2).padEnd(10)} $${(item.quantity * item.rate).toFixed(2).padEnd(10)}`
).join('\n')}
${'-'.repeat(70)}
${''.padEnd(50)}Total: $${invoice.amount.toFixed(2)}

${invoice.notes ? `NOTES:
${invoice.notes}

` : ''}
PAYMENT TERMS:
${invoice.terms || 'Payment due within 14 days. Late payments may incur a fee.'}

Thank you for your business!
    `.trim()

    // Set response headers for text download instead of PDF
    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Content-Disposition', `attachment; filename=Invoice-${invoice.invoiceId}.txt`)
    
    // Send the text data
    res.send(invoiceText)
    
  } catch (error) {
    console.error('Error generating invoice:', error)
    return res.status(500).json({ error: 'Failed to generate invoice' })
  }
}