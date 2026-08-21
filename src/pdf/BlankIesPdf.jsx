import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import {
  pdfStyles,
  PdfHeader,
  PdfSectionTitle,
  FormField,
  CheckboxField,
} from "./PdfShared";

const INSTRUCTIONS = [
  "Angel Learning Center requires the official Georgia Bright from the Start / USDA CACFP Meal Benefit Income Eligibility Statement.",
  "1) Print this cover sheet and complete the official IES form fields on paper (or use the DECAL fillable PDF if available).",
  "2) Include infant feeding / affidavit pages when enrolling Little Angels (6 weeks–12 months).",
  "3) Upload the completed form in the online Documents step (Completed Meal Benefit / IES).",
  "Official forms: https://www.decal.ga.gov/BftS/FormList.aspx?cat=CACFP",
];

export function BlankIesPdf() {
  return (
    <Document>
      <Page size="LETTER" style={pdfStyles.page}>
        <PdfHeader title="CACFP Meal Benefit Income Eligibility Statement" />

        <PdfSectionTitle title="Instructions & Official Requirement" />
        {INSTRUCTIONS.map((p, idx) => (
          <Text key={idx} style={[pdfStyles.legalParagraph, { marginBottom: 6 }]}>
            {p}
          </Text>
        ))}

        <PdfSectionTitle title="Parent Worksheet (For Offline / Paper Completion)" />
        <View style={pdfStyles.formRow}>
          <FormField label="Child Name" value="" flex={4} />
          <FormField label="Date of Birth" value="" flex={2} />
        </View>

        <View style={pdfStyles.formRow}>
          <FormField label="Parent / Guardian Name" value="" flex={1} />
        </View>

        <View style={pdfStyles.formRow}>
          <FormField label="SNAP / TANF / FDPIR Case # (if any)" value="" flex={1} />
        </View>

        <View style={pdfStyles.formRow}>
          <FormField label="Household Size" value="" flex={1} />
          <FormField label="Adult Signer Last 4 SSN" value="" flex={1} />
        </View>

        <View style={pdfStyles.formRow}>
          <FormField label="Care Hours" value="______ to ______" flex={2} />
          <Text style={pdfStyles.fieldLabel}>Days:</Text>
          <CheckboxField label="M" checked={false} />
          <CheckboxField label="T" checked={false} />
          <CheckboxField label="W" checked={false} />
          <CheckboxField label="Th" checked={false} />
          <CheckboxField label="F" checked={false} />
        </View>

        <View style={pdfStyles.formRow}>
          <Text style={pdfStyles.fieldLabel}>Meals Received:</Text>
          <CheckboxField label="Breakfast" checked={false} />
          <CheckboxField label="Lunch" checked={false} />
          <CheckboxField label="PM Snack" checked={false} />
        </View>

        <View style={[pdfStyles.formRow, { marginTop: 12 }]}>
          <FormField label="Signature" value="" flex={3} />
          <FormField label="Date" value="" flex={2} />
        </View>
      </Page>
    </Document>
  );
}

export default BlankIesPdf;
