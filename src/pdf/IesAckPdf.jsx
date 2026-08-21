import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import {
  pdfStyles,
  PdfHeader,
  PdfFooter,
  PdfSectionTitle,
  FormField,
  CheckboxField,
} from "./PdfShared";

export function IesAckPdf({ data = {}, location = {} }) {
  const ies = data.ies || {};

  return (
    <Document>
      <Page size="LETTER" style={pdfStyles.page}>
        <PdfHeader
          title="Meal Benefit (CACFP / IES) Acknowledgment"
          location={location}
        />

        <PdfSectionTitle title="Official Form Requirement" />
        <Text style={[pdfStyles.legalParagraph, { marginTop: 4, marginBottom: 12 }]}>
          Angel Learning Center participates in the USDA Child and Adult Care Food Program (CACFP) administered through Georgia Bright from the Start. State and federal guidelines require the official Georgia CACFP Meal Benefit Income Eligibility Statement (IES) form to be completed on file for each enrolled student.
        </Text>

        <PdfSectionTitle title="Acknowledgment" />
        <View style={pdfStyles.formRow}>
          <CheckboxField
            label="I understand I must complete the official Meal Benefit (IES) form and upload the completed copy in Documents."
            checked={!!ies.iesDownloadAck}
          />
        </View>

        <View style={[pdfStyles.formRow, { marginTop: 8 }]}>
          <FormField label="Printed Name" value={ies.iesAckPrint} flex={3} />
          <FormField label="Date" value={ies.iesAckDate} flex={2} />
        </View>

        <PdfFooter />
      </Page>
    </Document>
  );
}

export default IesAckPdf;
