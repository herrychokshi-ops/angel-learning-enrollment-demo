import React from "react";
import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";

/**
 * Official packet look: Times (standard PDF serif) for body/labels,
 * filled values sit on underline rules without overflowing adjacent fields.
 */
export const FONT = "Times-Roman";

export const COLORS = {
  ink: "#000000",
  value: "#1a3d8f",
  line: "#111111",
  muted: "#444444",
  yellow: "#FFFF00",
  yellowBorder: "#E6C200",
  red: "#8B0000",
  rule: "#000000",
};

export const pdfStyles = StyleSheet.create({
  page: {
    paddingTop: 22,
    paddingBottom: 36,
    paddingHorizontal: 40,
    fontFamily: FONT,
    fontSize: 9,
    color: COLORS.ink,
    lineHeight: 1.2,
  },
  headerBlock: {
    marginBottom: 0,
  },
  logoWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  logo: {
    width: 122,
    height: 33,
    objectFit: "contain",
  },
  mainTitle: {
    fontFamily: FONT,
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.ink,
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  sectionTitle: {
    fontFamily: FONT,
    fontWeight: "bold",
    fontSize: 11,
    color: COLORS.ink,
    marginTop: 8,
    marginBottom: 5,
    borderBottomWidth: 0.6,
    borderBottomColor: "#555555",
    paddingBottom: 2,
  },
  formRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 5,
    width: "100%",
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginRight: 8,
    minWidth: 0,
  },
  fieldLabel: {
    fontFamily: FONT,
    fontWeight: "normal",
    fontSize: 10,
    color: COLORS.ink,
    marginRight: 4,
    flexShrink: 0,
  },
  fieldLabelBold: {
    fontFamily: FONT,
    fontWeight: "bold",
    fontSize: 9,
    color: COLORS.ink,
    marginRight: 3,
    flexShrink: 0,
  },
  underlineValue: {
    borderBottomWidth: 0.75,
    borderBottomColor: COLORS.line,
    paddingHorizontal: 2,
    paddingBottom: 1,
    minHeight: 11,
    minWidth: 0,
    flexGrow: 1,
  },
  underlineText: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#0645AD",
    lineHeight: 1.1,
  },
  blankUnderline: {
    borderBottomWidth: 0.75,
    borderBottomColor: COLORS.line,
    flex: 1,
    minHeight: 11,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    flexShrink: 0,
  },
  checkboxBox: {
    width: 9,
    height: 9,
    borderWidth: 0.85,
    borderColor: COLORS.ink,
    marginRight: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    fontFamily: FONT,
    fontWeight: "bold",
    fontSize: 7,
    color: COLORS.value,
    textAlign: "center",
    marginTop: -1,
    lineHeight: 1,
  },
  checkboxLabel: {
    fontFamily: FONT,
    fontSize: 9,
    color: COLORS.ink,
  },
  legalParagraph: {
    fontFamily: FONT,
    fontSize: 8.5,
    lineHeight: 1.28,
    marginBottom: 5,
    color: COLORS.ink,
    textAlign: "justify",
  },
  footer: {
    position: "absolute",
    bottom: 22,
    left: 40,
    right: 40,
    fontSize: 10,
    color: COLORS.ink,
    textAlign: "right",
    borderTopWidth: 0.5,
    borderTopColor: "#c8c8c8",
    paddingTop: 6,
    fontFamily: FONT,
  },
});

export function getLogoUrl() {
  if (typeof window !== "undefined" && window.location?.origin && window.location.protocol !== "file:") {
    return `${window.location.origin}/assets/angelLearningLogo.png`;
  }
  return "public/assets/angelLearningLogo.png";
}

export function getWatchMeGrowUrl() {
  if (typeof window !== "undefined" && window.location?.origin && window.location.protocol !== "file:") {
    return `${window.location.origin}/assets/WatchMeGrow.png`;
  }
  return "public/assets/WatchMeGrow.png";
}

export function PdfHeader() {
  return (
    <View style={pdfStyles.headerBlock} fixed>
      <View style={pdfStyles.logoWrapper}>
        <Image style={pdfStyles.logo} src={getLogoUrl()} />
      </View>
    </View>
  );
}

export function PdfFooter() {
  return (
    <Text
      style={pdfStyles.footer}
      render={({ pageNumber }) => `${pageNumber} | Page`}
      fixed
    />
  );
}


export function PdfSectionTitle({ title }) {
  return <Text style={pdfStyles.sectionTitle}>{title}</Text>;
}

export function FormField({ label, value, flex = 1, minWidth = 28, style = {}, grow = true }) {
  const displayVal = value == null || value === "" ? " " : String(value);
  return (
    <View style={[pdfStyles.fieldContainer, { flex, minWidth }, style]}>
      <Text style={pdfStyles.fieldLabel}>{label}:</Text>
      <View style={[pdfStyles.underlineValue, grow ? { flex: 1 } : null, { minWidth }]}>
        <Text style={pdfStyles.underlineText} wrap>
          {displayVal}
        </Text>
      </View>
    </View>
  );
}

export function CheckboxField({ label, checked, style = {} }) {
  return (
    <View style={[pdfStyles.checkboxRow, style]}>
      <View style={pdfStyles.checkboxBox}>
        {checked ? <Text style={pdfStyles.checkboxChecked}>•</Text> : <Text> </Text>}
      </View>
      <Text style={pdfStyles.checkboxLabel}>{label}</Text>
    </View>
  );
}
