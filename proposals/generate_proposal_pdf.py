#!/usr/bin/env python3
"""Generate a mobile-friendly client proposal PDF for Angel Learning Center."""

from pathlib import Path

from fpdf import FPDF

OUT = Path(__file__).resolve().parent / "Angel-Learning-Center-Enrollment-Portal-Proposal-2000.pdf"
ARTIFACT = Path("/opt/cursor/artifacts/Angel-Learning-Center-Enrollment-Portal-Proposal-2000.pdf")


class ProposalPDF(FPDF):
    def header(self):
        pass

    def footer(self):
        self.set_y(-12)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(120, 130, 140)
        self.cell(0, 8, "ALC-2026-001  |  Confidential  |  herry@sioxglobal.com", align="C")


def section_title(pdf: ProposalPDF, title: str):
    pdf.ln(3)
    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(11, 110, 79)
    pdf.cell(0, 8, title, new_x="LMARGIN", new_y="NEXT")
    pdf.set_draw_color(213, 229, 221)
    y = pdf.get_y()
    pdf.line(pdf.l_margin, y, pdf.w - pdf.r_margin, y)
    pdf.ln(3)
    pdf.set_text_color(28, 36, 48)


def bullet(pdf: ProposalPDF, text: str):
    pdf.set_font("Helvetica", "", 10)
    pdf.set_x(pdf.l_margin + 2)
    pdf.multi_cell(0, 5.2, f"-  {text}")


def main():
    pdf = ProposalPDF(orientation="P", unit="mm", format="Letter")
    pdf.set_auto_page_break(auto=True, margin=16)
    pdf.add_page()
    pdf.set_margins(16, 14, 16)

    # Header bar
    pdf.set_fill_color(11, 110, 79)
    pdf.rect(0, 0, pdf.w, 28, "F")
    pdf.set_xy(16, 8)
    pdf.set_font("Helvetica", "B", 16)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(0, 7, "SIOX GLOBAL", new_x="LMARGIN", new_y="NEXT")
    pdf.set_x(16)
    pdf.set_font("Helvetica", "", 9)
    pdf.cell(0, 5, "Project Proposal  |  ALC-2026-001  |  August 5, 2026")

    pdf.set_xy(16, 34)
    pdf.set_text_color(28, 36, 48)
    pdf.set_font("Helvetica", "B", 18)
    pdf.multi_cell(pdf.w - 32, 8, "Online Enrollment Portal")
    pdf.set_x(16)
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(11, 110, 79)
    pdf.multi_cell(pdf.w - 32, 7, "Angel Learning Center")
    pdf.ln(1)
    pdf.set_x(16)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(70, 80, 90)
    pdf.multi_cell(
        pdf.w - 32,
        5.2,
        "Mobile-friendly parent and staff enrollment system to replace paper packets "
        "with one guided digital workflow. Fixed project investment: $2,000 USD.",
    )

    # Parties
    pdf.ln(3)
    y0 = pdf.get_y()
    col_w = (pdf.w - pdf.l_margin - pdf.r_margin - 6) / 2
    pdf.set_fill_color(244, 248, 246)
    pdf.set_draw_color(11, 110, 79)
    pdf.rect(pdf.l_margin, y0, col_w, 28, "F")
    pdf.rect(pdf.l_margin + col_w + 6, y0, col_w, 28, "F")
    pdf.set_xy(pdf.l_margin + 3, y0 + 2)
    pdf.set_font("Helvetica", "B", 8)
    pdf.set_text_color(11, 110, 79)
    pdf.cell(col_w - 6, 4, "PREPARED FOR")
    pdf.set_xy(pdf.l_margin + 3, y0 + 7)
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(28, 36, 48)
    pdf.cell(col_w - 6, 5, "Angel Learning Center")
    pdf.set_xy(pdf.l_margin + 3, y0 + 12)
    pdf.set_font("Helvetica", "", 9)
    pdf.multi_cell(col_w - 6, 4, "178 Basswood Drive\nSavannah, GA 31407\n(912) 600-3899")

    pdf.set_xy(pdf.l_margin + col_w + 9, y0 + 2)
    pdf.set_font("Helvetica", "B", 8)
    pdf.set_text_color(11, 110, 79)
    pdf.cell(col_w - 6, 4, "PREPARED BY")
    pdf.set_xy(pdf.l_margin + col_w + 9, y0 + 7)
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(28, 36, 48)
    pdf.cell(col_w - 6, 5, "Herry Chokshi")
    pdf.set_xy(pdf.l_margin + col_w + 9, y0 + 12)
    pdf.set_font("Helvetica", "", 9)
    pdf.multi_cell(col_w - 6, 4, "Siox Global\nherry@sioxglobal.com")
    pdf.set_y(y0 + 31)

    section_title(pdf, "Project overview")
    pdf.set_font("Helvetica", "", 10)
    pdf.multi_cell(
        0,
        5.2,
        "This proposal covers delivery of a branded online enrollment portal so parents "
        "can complete the full enrollment packet digitally and staff can review "
        "submissions in one place. The interactive demo already prepared for your "
        "center is the foundation for the production build.",
    )

    section_title(pdf, "Scope of work")
    for item in [
        "Parent portal with secure sign-in and account creation",
        "Guided enrollment checklist with progress tracking",
        "Five forms: Enrollment, Tuition, Transportation, Emergency Medical, CACFP/IES",
        "Staff review view for submitted packets",
        "Angel Learning Center branding with English / Spanish toggle",
        "Live deployment, walkthrough, and basic handoff",
    ]:
        bullet(pdf, item)

    section_title(pdf, "Investment")
    # Pricing table
    rows = [
        ("Online enrollment portal design, build, branding & bilingual UI", "$1,400"),
        ("Staff review view, form logic, testing & polish", "$400"),
        ("Deployment, walkthrough & handoff", "$200"),
    ]
    pdf.set_fill_color(11, 110, 79)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font("Helvetica", "B", 9)
    pdf.cell(145, 7, "ITEM", border=0, fill=True)
    pdf.cell(35, 7, "AMOUNT", border=0, fill=True, align="R", new_x="LMARGIN", new_y="NEXT")
    pdf.set_text_color(28, 36, 48)
    pdf.set_font("Helvetica", "", 10)
    for label, amount in rows:
        pdf.cell(145, 7, label, border="B")
        pdf.cell(35, 7, amount, border="B", align="R", new_x="LMARGIN", new_y="NEXT")

    pdf.set_fill_color(244, 248, 246)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(11, 110, 79)
    pdf.cell(145, 9, "Total project investment (fixed)", fill=True)
    pdf.cell(35, 9, "$2,000", fill=True, align="R", new_x="LMARGIN", new_y="NEXT")

    pdf.ln(3)
    pdf.set_fill_color(11, 110, 79)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font("Helvetica", "B", 11)
    pdf.cell(0, 10, "  Fixed fee: $2,000 USD   |   50% to start ($1,000)   |   50% on delivery ($1,000)", fill=True, new_x="LMARGIN", new_y="NEXT")
    pdf.ln(2)
    pdf.set_text_color(90, 100, 110)
    pdf.set_font("Helvetica", "", 9)
    pdf.cell(0, 5, "Proposal valid through September 4, 2026.", new_x="LMARGIN", new_y="NEXT")

    section_title(pdf, "Payment & terms")
    for item in [
        "Fixed fee of $2,000 USD for the scope described above.",
        "50% deposit ($1,000) to start; 50% balance ($1,000) upon delivery of the live portal.",
        "Out-of-scope items (payment processing, SMS, multi-location admin, ongoing support) quoted separately if needed.",
        "Client provides final content, tuition amounts, policy text, logos, and staff contacts for production.",
        "Work begins after signed acceptance and receipt of the deposit.",
    ]:
        bullet(pdf, item)

    section_title(pdf, "Acceptance")
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(28, 36, 48)
    pdf.multi_cell(
        0,
        5.2,
        "By signing below, Angel Learning Center accepts this proposal and authorizes "
        "Siox Global to proceed with the Online Enrollment Portal project for $2,000 USD.",
    )
    pdf.ln(8)
    y = pdf.get_y()
    pdf.set_draw_color(28, 36, 48)
    pdf.line(pdf.l_margin, y, pdf.l_margin + 80, y)
    pdf.line(pdf.l_margin + 95, y, pdf.w - pdf.r_margin, y)
    pdf.set_y(y + 2)
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(70, 80, 90)
    pdf.cell(80, 4, "Angel Learning Center")
    pdf.set_x(pdf.l_margin + 95)
    pdf.cell(0, 4, "Herry Chokshi / Siox Global", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(80, 4, "Signature / printed name / date")
    pdf.set_x(pdf.l_margin + 95)
    pdf.cell(0, 4, "Signature / date")

    pdf.output(str(OUT))
    ARTIFACT.parent.mkdir(parents=True, exist_ok=True)
    ARTIFACT.write_bytes(OUT.read_bytes())
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")
    print(f"Wrote {ARTIFACT}")


if __name__ == "__main__":
    main()
