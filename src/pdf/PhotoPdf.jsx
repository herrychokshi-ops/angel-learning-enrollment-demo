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

export function PhotoPdf({ data = {}, location = {} }) {
  const ph = data.photo || {};

  return (
    <Document>
      <Page size="LETTER" style={pdfStyles.page}>
        <PdfHeader
          title="Photo / Video Permission Form"
          location={location}
        />

        <PdfSectionTitle title="Permission Authorization" />
        <Text style={[pdfStyles.legalParagraph, { marginTop: 4, marginBottom: 10 }]}>
          I understand that Angel Learning Center may take photographs and/or video of children during normal program activities, special events, and classroom learning. These images may be used for classroom displays, center communications to enrolled families, the center website or social media, and marketing materials, unless limited below.
        </Text>

        <PdfSectionTitle title="Granted Permissions (Check all that apply)" />
        <View style={[pdfStyles.formRow, { flexWrap: "wrap" }]}>
          <CheckboxField label="Classroom / center displays" checked={!!ph.photoClassroom} style={{ marginBottom: 4 }} />
          <CheckboxField label="Communications to enrolled families" checked={!!ph.photoFamily} style={{ marginBottom: 4 }} />
          <CheckboxField label="Website / social media" checked={!!ph.photoWeb} style={{ marginBottom: 4 }} />
          <CheckboxField label="Marketing / promotional materials" checked={!!ph.photoMarketing} style={{ marginBottom: 4 }} />
          <CheckboxField label="I do NOT grant photo/video permission" checked={!!ph.photoNone} style={{ marginBottom: 4 }} />
        </View>

        <PdfSectionTitle title="Child & Parent Acknowledgment" />
        <View style={pdfStyles.formRow}>
          <FormField label="Child’s Full Name" value={ph.photoChild} flex={1} />
        </View>

        <View style={pdfStyles.formRow}>
          <CheckboxField
            label="I have read this Photo / Video Permission form and my choices above are correct."
            checked={!!ph.photoAgree}
          />
        </View>

        <View style={pdfStyles.formRow}>
          <FormField label="Printed Name" value={ph.photoPrint} flex={3} />
          <FormField label="Date" value={ph.photoDate} flex={2} />
        </View>

        <View style={pdfStyles.formRow}>
          <FormField label="Parent / Guardian Signature" value={ph.photoSignature} flex={1} />
        </View>

        <PdfFooter />
      </Page>
    </Document>
  );
}

export default PhotoPdf;
