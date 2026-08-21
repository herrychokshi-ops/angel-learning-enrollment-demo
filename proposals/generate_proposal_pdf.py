#!/usr/bin/env python3
"""Generate a mobile-friendly client proposal PDF for Angel Learning Center."""

from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "Angel-Learning-Center-Enrollment-Portal-Proposal-1999.pdf"
ARTIFACT = Path("/opt/cursor/artifacts/Angel-Learning-Center-Enrollment-Portal-Proposal-1999.pdf")
LOGO = ROOT / "assets" / "revenelx-logo-rgb.png"

GREEN = (11, 110, 79)
INK = (28, 36, 48)
MUTED = (70, 80, 90)
SOFT = (244, 248, 246)
LINE = (213, 229, 221)


class ProposalPDF(FPDF):
    def footer(self):
        self.set_y(-12)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(120, 130, 140)
        self.cell(0, 8, "ALC-2026-001  |  Confidential  |  info@revenelx.com  |  revenelx.com", align="C")


def section_title(pdf: ProposalPDF, title: str):
    pdf.ln(2)
    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(*GREEN)
    pdf.cell(0, 7, title, new_x="LMARGIN", new_y="NEXT")
    pdf.set_draw_color(*LINE)
    y = pdf.get_y()
    pdf.line(pdf.l_margin, y, pdf.w - pdf.r_margin, y)
    pdf.ln(2.5)
    pdf.set_text_color(*INK)


def bullet(pdf: ProposalPDF, text: str):
    pdf.set_font("Helvetica", "", 10)
    pdf.set_x(pdf.l_margin + 2)
    pdf.multi_cell(0, 5.0, f"-  {text}")


def main():
    pdf = ProposalPDF(orientation="P", unit="mm", format="Letter")
    pdf.set_auto_page_break(auto=True, margin=16)
    pdf.add_page()
    pdf.set_margins(16, 12, 16)

    # Header with logo
    pdf.set_fill_color(*GREEN)
    pdf.rect(0, 0, pdf.w, 26, "F")
    if LOGO.exists():
        # White logo plate so brand mark is readable on green
        pdf.set_fill_color(255, 255, 255)
        pdf.rect(12, 4, 52, 18, "F")
        pdf.image(str(LOGO), x=14, y=6, h=14)
    pdf.set_xy(70, 6)
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(0, 6, "REVENELX", new_x="LMARGIN", new_y="NEXT")
    pdf.set_xy(70, pdf.get_y())
    pdf.set_font("Helvetica", "", 9)
    pdf.cell(0, 5, "Project Proposal  |  ALC-2026-001  |  August 5, 2026", new_x="LMARGIN", new_y="NEXT")
    pdf.set_xy(70, pdf.get_y())
    pdf.cell(0, 5, "revenelx.com  |  +1 (470) 440-3579")

    pdf.set_xy(16, 32)
    pdf.set_text_color(*INK)
    pdf.set_font("Helvetica", "B", 17)
    pdf.multi_cell(pdf.w - 32, 7.5, "Online Enrollment Portal")
    pdf.set_x(16)
    pdf.set_font("Helvetica", "B", 13)
    pdf.set_text_color(*GREEN)
    pdf.multi_cell(pdf.w - 32, 6.5, "Angel Learning Center")
    pdf.ln(1)
    pdf.set_x(16)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        pdf.w - 32,
        5.0,
        "Mobile-friendly parent and staff enrollment system that replaces paper packets "
        "with one guided digital workflow. Fixed project investment: $1,999 USD, plus "
        "optional website maintenance at $99 per month.",
    )

    # Parties
    pdf.ln(2)
    y0 = pdf.get_y()
    col_w = (pdf.w - pdf.l_margin - pdf.r_margin - 6) / 2
    pdf.set_fill_color(*SOFT)
    pdf.rect(pdf.l_margin, y0, col_w, 30, "F")
    pdf.rect(pdf.l_margin + col_w + 6, y0, col_w, 30, "F")

    pdf.set_xy(pdf.l_margin + 3, y0 + 2)
    pdf.set_font("Helvetica", "B", 8)
    pdf.set_text_color(*GREEN)
    pdf.cell(col_w - 6, 4, "PREPARED FOR")
    pdf.set_xy(pdf.l_margin + 3, y0 + 7)
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(*INK)
    pdf.cell(col_w - 6, 5, "Angel Learning Center")
    pdf.set_xy(pdf.l_margin + 3, y0 + 12)
    pdf.set_font("Helvetica", "", 9)
    pdf.multi_cell(col_w - 6, 4, "178 Basswood Drive\nSavannah, GA 31407\n(912) 600-3899")

    pdf.set_xy(pdf.l_margin + col_w + 9, y0 + 2)
    pdf.set_font("Helvetica", "B", 8)
    pdf.set_text_color(*GREEN)
    pdf.cell(col_w - 6, 4, "PREPARED BY")
    pdf.set_xy(pdf.l_margin + col_w + 9, y0 + 7)
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(*INK)
    pdf.cell(col_w - 6, 5, "RevenelX")
    pdf.set_xy(pdf.l_margin + col_w + 9, y0 + 12)
    pdf.set_font("Helvetica", "", 9)
    pdf.multi_cell(
        col_w - 6,
        4,
        "4080 McGinnis Ferry Rd., Bldg. 200\nSte 204, Alpharetta, GA 30005\ninfo@revenelx.com",
    )
    pdf.set_y(y0 + 33)

    section_title(pdf, "Project overview")
    pdf.set_font("Helvetica", "", 10)
    pdf.multi_cell(
        0,
        5.0,
        "This proposal covers delivery of a branded online enrollment portal so parents "
        "can complete the full enrollment packet digitally and staff can review "
        "submissions in one place. The interactive demo already prepared for your "
        "center is the foundation for the production build. Client provides current "
        "server and hosting; RevenelX will deploy and configure the portal on your environment.",
    )

    section_title(pdf, "Scope of work")
    for item in [
        "Parent portal with secure sign-in and account creation",
        "Guided enrollment checklist with progress tracking",
        "Five forms: Enrollment, Tuition, Transportation, Emergency Medical, CACFP/IES",
        "Staff review view for submitted packets",
        "Angel Learning Center branding with English / Spanish toggle",
        "Deploy to client's current server and hosting, plus walkthrough and handoff",
    ]:
        bullet(pdf, item)

    section_title(pdf, "Hosting")
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*INK)
    pdf.multi_cell(
        0,
        5.0,
        "Client provides current server and hosting. RevenelX does not include new "
        "hosting fees in this project price. Deployment, configuration, and handoff "
        "on the client's existing environment are included.",
    )

    section_title(pdf, "Investment")
    rows = [
        ("Online enrollment portal design, build, branding & bilingual UI", "$1,399"),
        ("Staff review view, form logic, testing & polish", "$400"),
        ("Deploy to client server, walkthrough & handoff", "$200"),
    ]
    pdf.set_fill_color(*GREEN)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font("Helvetica", "B", 9)
    pdf.cell(145, 7, "ITEM", border=0, fill=True)
    pdf.cell(35, 7, "AMOUNT", border=0, fill=True, align="R", new_x="LMARGIN", new_y="NEXT")
    pdf.set_text_color(*INK)
    pdf.set_font("Helvetica", "", 10)
    for label, amount in rows:
        pdf.cell(145, 7, label, border="B")
        pdf.cell(35, 7, amount, border="B", align="R", new_x="LMARGIN", new_y="NEXT")

    pdf.set_fill_color(*SOFT)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(*GREEN)
    pdf.cell(145, 8, "Total project investment (fixed)", fill=True)
    pdf.cell(35, 8, "$1,999", fill=True, align="R", new_x="LMARGIN", new_y="NEXT")

    pdf.ln(2)
    pdf.set_fill_color(*GREEN)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font("Helvetica", "B", 10)
    pdf.multi_cell(
        0,
        5.5,
        "  Fixed fee: $1,999 USD\n"
        "  $1,000 to start  |  $999 on delivery",
        fill=True,
    )

    pdf.ln(2)
    pdf.set_fill_color(20, 90, 70)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font("Helvetica", "B", 10)
    pdf.multi_cell(
        0,
        5.5,
        "  Website maintenance (optional ongoing): $99 per month\n"
        "  Includes updates, monitoring support, and minor content/form changes.",
        fill=True,
    )
    pdf.ln(1.5)
    pdf.set_text_color(90, 100, 110)
    pdf.set_font("Helvetica", "", 9)
    pdf.cell(0, 4.5, "Proposal valid through September 4, 2026.", new_x="LMARGIN", new_y="NEXT")

    section_title(pdf, "Payment & terms")
    for item in [
        "Fixed project fee of $1,999 USD for the scope described above.",
        "$1,000 deposit to start; $999 balance upon delivery of the live portal.",
        "Optional website maintenance: $99 per month after launch.",
        "Client provides current server and hosting for the production site.",
        "Client provides final content, tuition amounts, policy text, logos, and staff contacts.",
        "Work begins after signed acceptance and receipt of the deposit.",
    ]:
        bullet(pdf, item)

    section_title(pdf, "Acceptance")
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*INK)
    pdf.multi_cell(
        0,
        5.0,
        "By signing below, Angel Learning Center accepts this proposal and authorizes "
        "RevenelX to proceed with the Online Enrollment Portal project for $1,999 USD, "
        "with optional website maintenance at $99 per month. Client will provide current "
        "server and hosting.",
    )
    pdf.ln(7)
    y = pdf.get_y()
    pdf.set_draw_color(*INK)
    pdf.line(pdf.l_margin, y, pdf.l_margin + 80, y)
    pdf.line(pdf.l_margin + 95, y, pdf.w - pdf.r_margin, y)
    pdf.set_y(y + 2)
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(*MUTED)
    pdf.cell(80, 4, "Angel Learning Center")
    pdf.set_x(pdf.l_margin + 95)
    pdf.cell(0, 4, "RevenelX", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(80, 4, "Signature / printed name / date")
    pdf.set_x(pdf.l_margin + 95)
    pdf.cell(0, 4, "Signature / date")

    pdf.output(str(OUT))
    ARTIFACT.parent.mkdir(parents=True, exist_ok=True)
    ARTIFACT.write_bytes(OUT.read_bytes())
    # Keep a convenience copy under the prior name for existing links
    (ROOT / "Angel-Learning-Center-Enrollment-Portal-Proposal-2000.pdf").write_bytes(OUT.read_bytes())
    Path("/opt/cursor/artifacts/Angel-Learning-Center-Enrollment-Portal-Proposal-2000.pdf").write_bytes(
        OUT.read_bytes()
    )
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
