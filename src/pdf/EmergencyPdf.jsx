import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import {
  pdfStyles,
  PdfHeader,
  PdfFooter,
  PdfSectionTitle,
  FormField,
} from "./PdfShared";

export function EmergencyPdf({ data = {}, location = {} }) {
  const em = data.emergency || {};

  return (
    <Document>
      <Page size="LETTER" style={pdfStyles.page}>
        <PdfHeader
          title="Vehicle Emergency Medical Information"
          location={location}
        />

        <PdfSectionTitle title="Child’s Information" />
        <View style={pdfStyles.formRow}>
          <FormField label="Child’s Name" value={em.emChild} flex={3} />
          <FormField label="Date of Birth" value={em.emDob} flex={2} />
        </View>
        <View style={pdfStyles.formRow}>
          <FormField label="Home Address" value={em.emAddress} flex={1} />
        </View>

        <PdfSectionTitle title="Parent / Guardian Contacts" />
        <View style={pdfStyles.formRow}>
          <FormField label="Father’s Name" value={em.emFather} flex={3} />
          <FormField label="Father Cell" value={em.emFatherCell || em.emFatherPhones} flex={2} />
        </View>
        <View style={pdfStyles.formRow}>
          <FormField label="Mother’s Name" value={em.emMother} flex={3} />
          <FormField label="Mother Cell" value={em.emMotherCell || em.emMotherPhones} flex={2} />
        </View>
        <View style={pdfStyles.formRow}>
          <FormField label="Emergency Contact (if parents unreachable)" value={em.emAltName} flex={3} />
          <FormField label="Phone" value={em.emAltPhone} flex={2} />
        </View>

        <PdfSectionTitle title="Medical Information" />
        <View style={pdfStyles.formRow}>
          <FormField label="Child’s Doctor" value={em.emDoctor} flex={3} />
          <FormField label="Doctor Phone" value={em.emDoctorPhone} flex={2} />
        </View>
        <View style={pdfStyles.formRow}>
          <FormField label="Emergency Facility" value={em.emFacility} flex={1} />
        </View>
        <View style={{ marginTop: 3 }}>
          <Text style={pdfStyles.fieldLabel}>Child’s Allergies:</Text>
          <View style={[pdfStyles.underlineValue, { minHeight: 14 }]}>
            <Text>{em.emAllergies || "None"}</Text>
          </View>
        </View>
        <View style={{ marginTop: 3 }}>
          <Text style={pdfStyles.fieldLabel}>Current Prescribed Medications:</Text>
          <View style={[pdfStyles.underlineValue, { minHeight: 14 }]}>
            <Text>{em.emMeds || "None"}</Text>
          </View>
        </View>
        <View style={{ marginTop: 3 }}>
          <Text style={pdfStyles.fieldLabel}>Special Needs / Conditions:</Text>
          <View style={[pdfStyles.underlineValue, { minHeight: 14 }]}>
            <Text>{em.emSpecial || "None"}</Text>
          </View>
        </View>

        <PdfSectionTitle title="Emergency Medical Authorization" />
        <Text style={pdfStyles.legalParagraph}>
          In the event of an emergency involving my child, and if Angel Learning Center cannot get in touch with me, I hereby authorize any needed emergency medical care. I further agree to be fully responsible for all medical expenses incurred during treatment.
        </Text>

        <View style={pdfStyles.formRow}>
          <FormField label="Authorized Child" value={em.emAuthChild} flex={3} />
          <FormField label="Date" value={em.emDate} flex={2} />
        </View>
        <View style={pdfStyles.formRow}>
          <FormField label="Parent / Guardian Signature" value={em.emSignature} flex={1} />
        </View>

        <PdfFooter />
      </Page>
    </Document>
  );
}

export default EmergencyPdf;
