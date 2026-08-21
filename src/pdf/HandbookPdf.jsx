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

const HANDBOOK_ACK_TEXT =
  "I acknowledge that I have received and read the Angel Learning Center Parent Handbook. I understand the policies, procedures, and expectations contained within and agree to abide by them while my child is enrolled at Angel Learning Center. I understand that policies may be updated as needed, and I will be notified of any changes.";

export function HandbookPdf({ data = {}, location = {} }) {
  const hb = data.handbook || {};

  return (
    <Document>
      <Page size="LETTER" style={pdfStyles.page}>
        <PdfHeader
          title="Parent Handbook Acknowledgment 2026"
          location={location}
        />

        <PdfSectionTitle title="Handbook Receipt & Policies" />
        <Text style={[pdfStyles.legalParagraph, { marginTop: 4, marginBottom: 12 }]}>
          {HANDBOOK_ACK_TEXT}
        </Text>

        <PdfSectionTitle title="Agreement & Signature" />
        <View style={pdfStyles.formRow}>
          <CheckboxField
            label="I have received and read the 2026 Parent Handbook and agree to its policies."
            checked={!!hb.hbAgree}
          />
        </View>

        <View style={pdfStyles.formRow}>
          <FormField label="Enrolled Child’s Full Name" value={hb.hbChild} flex={1} />
        </View>

        <View style={pdfStyles.formRow}>
          <FormField label="Printed Name" value={hb.hbPrint} flex={3} />
          <FormField label="Date" value={hb.hbDate} flex={2} />
        </View>

        <View style={pdfStyles.formRow}>
          <FormField label="Parent / Guardian Signature" value={hb.hbSignature} flex={1} />
        </View>

        <PdfFooter />
      </Page>
    </Document>
  );
}

export default HandbookPdf;
