"""
Exception IT Solutions - B2B Company Portfolio PDF Generator
Complies with pdf.md specifications.
Generates:
1. Master PDF: public/docs/Exception-IT-Solutions-B2B-Company-Portfolio.pdf
2. Individual Case Studies: public/docs/case-studies/[slug]-case-study.pdf
"""

import os
import sys
import json
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable, Image as RLImage
)
from reportlab.pdfgen import canvas
from svglib.svglib import svg2rlg

# Page dimensions for A4
PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN = 36
USABLE_WIDTH = PAGE_WIDTH - 2 * MARGIN
USABLE_HEIGHT = PAGE_HEIGHT - 2 * MARGIN

# Brand Colors (Exception IT Solutions Luxury Navy & Gold Theme)
NAVY_PRIMARY = HexColor('#0A192F')
NAVY_DEEP = HexColor('#050E1A')
NAVY_SURFACE = HexColor('#102A45')
NAVY_BORDER = HexColor('#1E3A5F')
ACCENT_BLUE = HexColor('#5AA9FF')
ACCENT_GOLD = HexColor('#D4AF37')
ACCENT_CYAN = HexColor('#00D2FF')
BG_LIGHT = HexColor('#F8FAFC')
CARD_BG = HexColor('#F1F5F9')
TEXT_DARK = HexColor('#0F172A')
TEXT_MUTED = HexColor('#475569')
TEXT_LIGHT = HexColor('#94A3B8')
BORDER_LIGHT = HexColor('#E2E8F0')
BORDER_DARK = HexColor('#334155')
WHITE = HexColor('#FFFFFF')
SUCCESS_GREEN = HexColor('#059669')
ERROR_ROSE = HexColor('#BE123C')


class NumberedCanvas(canvas.Canvas):
    """
    Two-pass canvas to dynamically compute total pages and render
    consistent headers, footers, page numbers, and bookmarks.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, total_pages):
        page_num = self._pageNumber

        # Cover page (Page 1): No running header or footer
        if page_num == 1:
            return

        self.saveState()

        # Running Header
        self.setFont('Helvetica-Bold', 7.5)
        self.setFillColor(NAVY_PRIMARY)
        self.drawString(MARGIN, PAGE_HEIGHT - 24, "EXCEPTION IT SOLUTIONS")
        
        self.setFont('Helvetica', 7.5)
        self.setFillColor(TEXT_MUTED)
        self.drawRightString(PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 24, "B2B COMPANY PORTFOLIO 2026")

        # Header thin divider line
        self.setStrokeColor(BORDER_LIGHT)
        self.setLineWidth(0.6)
        self.line(MARGIN, PAGE_HEIGHT - 28, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 28)

        # Running Footer thin divider line
        self.line(MARGIN, 32, PAGE_WIDTH - MARGIN, 32)

        # Running Footer text
        self.setFont('Helvetica', 7.5)
        self.setFillColor(TEXT_MUTED)
        self.drawString(MARGIN, 20, "https://exceptionit.com • Confidential B2B Capability Document")

        # Page Number: "Page X of Y"
        page_str = f"Page {page_num} of {total_pages}"
        self.setFont('Helvetica-Bold', 7.5)
        self.setFillColor(NAVY_PRIMARY)
        self.drawRightString(PAGE_WIDTH - MARGIN, 20, page_str)

        self.restoreState()


def get_custom_styles():
    styles = getSampleStyleSheet()

    # Section tag / eyebrow
    styles.add(ParagraphStyle(
        'SectionEyebrow',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=ACCENT_BLUE,
        textTransform='uppercase',
        spaceAfter=4,
    ))

    # Page Main Title
    styles.add(ParagraphStyle(
        'PageTitle',
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=NAVY_PRIMARY,
        spaceAfter=8,
    ))

    # Page Subtitle / Tagline
    styles.add(ParagraphStyle(
        'PageSubtitle',
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=TEXT_MUTED,
        spaceAfter=14,
    ))

    # Content Section Heading (H2)
    styles.add(ParagraphStyle(
        'SectionH2',
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=NAVY_PRIMARY,
        spaceBefore=8,
        spaceAfter=6,
    ))

    # Card Title (H3)
    styles.add(ParagraphStyle(
        'CardTitle',
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=NAVY_PRIMARY,
        spaceAfter=3,
    ))

    # Body regular
    styles.add(ParagraphStyle(
        'BodyRegular',
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=TEXT_DARK,
        spaceAfter=4,
    ))

    # Body muted
    styles.add(ParagraphStyle(
        'BodyMuted',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=TEXT_MUTED,
    ))

    # Bullet item
    styles.add(ParagraphStyle(
        'BulletItem',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=TEXT_DARK,
        leftIndent=10,
        firstLineIndent=-10,
        spaceAfter=2,
    ))

    # Cover Title
    styles.add(ParagraphStyle(
        'CoverTitle',
        fontName='Helvetica-Bold',
        fontSize=30,
        leading=34,
        textColor=WHITE,
        spaceAfter=8,
    ))

    # Cover Subtitle
    styles.add(ParagraphStyle(
        'CoverSubtitle',
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=ACCENT_BLUE,
        spaceAfter=18,
    ))

    # Table Cell Normal
    styles.add(ParagraphStyle(
        'TableCell',
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=TEXT_DARK,
    ))

    # Table Cell Bold
    styles.add(ParagraphStyle(
        'TableCellBold',
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10,
        textColor=NAVY_PRIMARY,
    ))

    # Table Header
    styles.add(ParagraphStyle(
        'TableHeader',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=WHITE,
    ))

    return styles


def fit_asset_image(image_path, target_width=USABLE_WIDTH, target_height=140):
    """
    Safely loads a raster or SVG image from public/ and rescales it into a Flowable.
    Returns Flowable or None if file does not exist.
    """
    if not os.path.exists(image_path):
        return None

    ext = os.path.splitext(image_path)[1].lower()
    try:
        if ext == '.svg':
            drawing = svg2rlg(image_path)
            if drawing:
                scale_x = target_width / float(drawing.width)
                scale_y = target_height / float(drawing.height)
                scale = min(scale_x, scale_y)
                drawing.width = drawing.width * scale
                drawing.height = drawing.height * scale
                drawing.scale(scale, scale)
                return drawing
        elif ext in ['.jpg', '.jpeg', '.png']:
            img = RLImage(image_path)
            orig_w, orig_h = img.imageWidth, img.imageHeight
            scale_w = target_width / orig_w
            scale_h = target_height / orig_h
            scale = min(scale_w, scale_h)
            img.drawWidth = orig_w * scale
            img.drawHeight = orig_h * scale
            return img
    except Exception as e:
        print(f"Warning: could not render image {image_path}: {e}")
    return None


def build_cover_page(data, styles):
    """
    Builds the luxury cover page as specified in pdf.md Page 1.
    """
    flowables = []
    company = data.get('company', {})

    # Top Spacer
    flowables.append(Spacer(1, 20))

    # Cover Box styled as a luxury dark card table
    logo_path = os.path.abspath('public/logo-mark.png')
    logo_flowable = None
    if os.path.exists(logo_path):
        logo_flowable = RLImage(logo_path, width=70, height=70)

    cover_content = []
    if logo_flowable:
        cover_content.append(logo_flowable)
        cover_content.append(Spacer(1, 14))

    cover_content.append(Paragraph("EXCEPTION IT SOLUTIONS • ENTERPRISE TECHNOLOGY BRIEFING", styles['SectionEyebrow']))
    cover_content.append(Spacer(1, 4))
    cover_content.append(Paragraph("Company Portfolio", styles['CoverTitle']))
    cover_content.append(Paragraph("B2B Digital Solutions, Software Engineering & Intelligent Systems", styles['CoverSubtitle']))

    headline_callout = (
        "<b>\"Engineering Digital Solutions for Business Growth.\"</b><br/><br/>"
        "A client-ready technical portfolio documenting engineering capabilities, verified software projects, "
        "interactive enterprise platforms, AI pipelines, and bespoke B2B engagement models."
    )
    callout_p = Paragraph(headline_callout, ParagraphStyle(
        'CoverCallout',
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=WHITE,
    ))
    cover_content.append(callout_p)
    cover_content.append(Spacer(1, 24))

    # Metadata Badges in a mini table
    meta_data = [
        [
            Paragraph("<b>Target Audience</b><br/>Founders, CTOs, Enterprise Decision-Makers", ParagraphStyle('M1', fontName='Helvetica', fontSize=7.5, leading=10, textColor=ACCENT_BLUE)),
            Paragraph("<b>Edition</b><br/>2026 Official Capability Release", ParagraphStyle('M2', fontName='Helvetica', fontSize=7.5, leading=10, textColor=ACCENT_BLUE)),
            Paragraph("<b>Official Portal</b><br/>https://exceptionit.com", ParagraphStyle('M3', fontName='Helvetica', fontSize=7.5, leading=10, textColor=ACCENT_BLUE))
        ]
    ]
    meta_table = Table(meta_data, colWidths=[160, 160, 160])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), HexColor('#0F2642')),
        ('BOX', (0, 0), (-1, -1), 0.8, ACCENT_BLUE),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, NAVY_SURFACE),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ]))
    cover_content.append(meta_table)

    cover_table = Table([[cover_content]], colWidths=[USABLE_WIDTH])
    cover_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), NAVY_PRIMARY),
        ('BOX', (0, 0), (-1, -1), 1.5, ACCENT_BLUE),
        ('TOPPADDING', (0, 0), (-1, -1), 40),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 40),
        ('LEFTPADDING', (0, 0), (-1, -1), 28),
        ('RIGHTPADDING', (0, 0), (-1, -1), 28),
    ]))

    flowables.append(cover_table)
    flowables.append(Spacer(1, 16))

    # Cover Footer info
    contact_line = f"<b>Contact:</b> {company.get('email', 'exceptionitsolution@gmail.com')} • <b>Phone:</b> {company.get('phone', '+91 76984 04843')} • <b>Website:</b> https://exceptionit.com"
    flowables.append(Paragraph(contact_line, ParagraphStyle('CF', fontName='Helvetica', fontSize=7.5, leading=10, textColor=TEXT_MUTED, alignment=1)))
    flowables.append(PageBreak())

    return flowables


def build_executive_summary_page(data, styles):
    """
    Page 2: Executive Summary per pdf.md
    """
    flowables = []
    flowables.append(Paragraph("01 • EXECUTIVE BRIEFING", styles['SectionEyebrow']))
    flowables.append(Paragraph("Executive Summary", styles['PageTitle']))
    flowables.append(Paragraph(
        "A concise orientation for business leaders, CTOs, and product innovators evaluating Exception IT Solutions as their core engineering partner.",
        styles['PageSubtitle']
    ))

    # Narrative 2-col overview
    col1 = [
        Paragraph("<b>Who We Are</b>", styles['SectionH2']),
        Paragraph(
            "Exception IT Solutions is a full-stack digital product engineering and technology consultancy. "
            "We engineer robust web applications, data-driven dashboards, AI pipelines, and enterprise automation "
            "systems that solve operational bottlenecks and accelerate business growth.",
            styles['BodyRegular']
        ),
        Paragraph(
            "Rather than functioning as a detached vendor, our engineering team embeds directly with stakeholders "
            "to translate complex domain challenges into high-performance, maintainable software architectures.",
            styles['BodyRegular']
        ),
    ]

    col2 = [
        Paragraph("<b>Why This Portfolio Matters</b>", styles['SectionH2']),
        Paragraph(
            "This document presents verified capabilities and demonstration architectures implemented by Exception IT Solutions. "
            "It showcases authentic codebases, verified technical stacks, and practical design solutions across "
            "multiple commercial domains including E-Commerce, Healthcare Logistics, AI Recommendation, and Cybersecurity.",
            styles['BodyRegular']
        ),
        Paragraph(
            "Decision-makers can evaluate our technical depth, UI/UX precision, and architectural discipline before initiating commercial discussions.",
            styles['BodyRegular']
        ),
    ]

    narrative_table = Table([[col1, col2]], colWidths=[USABLE_WIDTH/2 - 6, USABLE_WIDTH/2 - 6])
    narrative_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    flowables.append(narrative_table)
    flowables.append(Spacer(1, 8))

    # Business Problems Addressed Matrix
    flowables.append(Paragraph("<b>Strategic Business Challenges We Address</b>", styles['SectionH2']))
    
    problems_data = [
        [
            Paragraph("<b>Operational Challenge</b>", styles['TableHeader']),
            Paragraph("<b>Business Impact</b>", styles['TableHeader']),
            Paragraph("<b>Exception IT Solution Architecture</b>", styles['TableHeader']),
        ],
        [
            Paragraph("<b>Slow Legacy Systems & High Latency</b>", styles['TableCellBold']),
            Paragraph("Customer abandonment, lost conversions, poor Google Core Web Vitals.", styles['TableCell']),
            Paragraph("Modern headless frameworks (Next.js/React), sub-80ms API response caching, and dynamic edge CDNs.", styles['TableCell']),
        ],
        [
            Paragraph("<b>Manual Workflows & Data Silos</b>", styles['TableCellBold']),
            Paragraph("Excess overhead, human transcription errors, delayed reporting.", styles['TableCell']),
            Paragraph("Event-driven automation engines, real-time ETL pipelines, and visual workflow builders.", styles['TableCell']),
        ],
        [
            Paragraph("<b>Unreliable Third-Party Integrations</b>", styles['TableCellBold']),
            Paragraph("Broken payment gates, failed syncs, lack of system observability.", styles['TableCell']),
            Paragraph("Contract-tested REST/GraphQL gateways, resilient webhook queues, and robust error handling.", styles['TableCell']),
        ],
        [
            Paragraph("<b>Complex AI / ML Operationalization</b>", styles['TableCellBold']),
            Paragraph("Inability to move beyond basic prototypes to reliable production value.", styles['TableCell']),
            Paragraph("Custom vector embeddings, LLM guardrails, hybrid cosine reranking, and scalable cloud inference.", styles['TableCell']),
        ],
    ]

    prob_table = Table(problems_data, colWidths=[150, 160, 213])
    prob_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY_PRIMARY),
        ('BOX', (0, 0), (-1, -1), 0.8, BORDER_LIGHT),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 7),
        ('RIGHTPADDING', (0, 0), (-1, -1), 7),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CARD_BG]),
    ]))
    flowables.append(prob_table)
    flowables.append(Spacer(1, 12))

    # Value Callout Card
    callout_data = [[
        Paragraph(
            "<b>The Exception IT Standard:</b> Every engagement produces test-covered, strongly-typed codebases "
            "delivered alongside transparent milestone roadmaps. We ensure your technology investment delivers measurable competitive advantage.",
            ParagraphStyle('ExecNotice', fontName='Helvetica', fontSize=8, leading=12, textColor=NAVY_PRIMARY)
        )
    ]]
    callout_t = Table(callout_data, colWidths=[USABLE_WIDTH])
    callout_t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), HexColor('#E8F1FC')),
        ('BOX', (0, 0), (-1, -1), 1, ACCENT_BLUE),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))
    flowables.append(callout_t)

    flowables.append(PageBreak())
    return flowables


def build_company_overview_page(data, styles):
    """
    Page 3: Company Overview & Value Proposition per pdf.md
    """
    flowables = []
    company = data.get('company', {})

    flowables.append(Paragraph("02 • CORPORATE FOUNDATION", styles['SectionEyebrow']))
    flowables.append(Paragraph("Company Overview & Value Proposition", styles['PageTitle']))
    flowables.append(Paragraph(
        "Built with Purpose. Designed for People. Engineered for Growth.",
        styles['PageSubtitle']
    ))

    # Company background box
    intro_p = Paragraph(
        "Exception IT Solutions operates on a single core belief: <b>technology is only as valuable as the business results it creates.</b> "
        "Modern companies don't need redundant slide decks or bloated software teams — they need pragmatic, high-velocity engineering partners "
        "who take total ownership of product design, cloud infrastructure, and software delivery.",
        styles['BodyRegular']
    )
    flowables.append(intro_p)
    flowables.append(Spacer(1, 10))

    flowables.append(Paragraph("<b>Our Four Core Engineering Principles</b>", styles['SectionH2']))

    # Principles in a 2x2 grid
    principles = company.get('principles', [])
    principle_cells = []
    for p in principles:
        cell_content = [
            Paragraph(f"<b>{p['title']}</b>", styles['CardTitle']),
            Paragraph(p['description'], styles['BodyMuted']),
        ]
        principle_cells.append(cell_content)

    # Fill up to 4 if needed
    while len(principle_cells) < 4:
        principle_cells.append([Paragraph("Enterprise Quality", styles['CardTitle'])])

    p_grid_data = [
        [principle_cells[0], principle_cells[1]],
        [principle_cells[2], principle_cells[3]]
    ]
    p_grid = Table(p_grid_data, colWidths=[USABLE_WIDTH/2 - 4, USABLE_WIDTH/2 - 4])
    p_grid.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), CARD_BG),
        ('BOX', (0, 0), (-1, -1), 0.8, BORDER_LIGHT),
        ('INNERGRID', (0, 0), (-1, -1), 6, WHITE),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ]))
    flowables.append(p_grid)
    flowables.append(Spacer(1, 14))

    # Commercial Differentiation
    flowables.append(Paragraph("<b>How We Compare to Traditional IT Vendors</b>", styles['SectionH2']))

    diff_data = [
        [
            Paragraph("<b>Dimension</b>", styles['TableHeader']),
            Paragraph("<b>Traditional IT Outsourcing</b>", styles['TableHeader']),
            Paragraph("<b>Exception IT Solutions</b>", styles['TableHeader']),
        ],
        [
            Paragraph("<b>Accountability</b>", styles['TableCellBold']),
            Paragraph("Fragmented teams; frequent finger-pointing between design and dev vendors.", styles['TableCell']),
            Paragraph("Single-point full-stack ownership from UX wireframes to production deployment.", styles['TableCellBold']),
        ],
        [
            Paragraph("<b>Code Quality</b>", styles['TableCellBold']),
            Paragraph("Black-box repositories; poor typing; expensive technical debt.", styles['TableCell']),
            Paragraph("Clean modular architectures, TypeScript safety, and strict peer code reviews.", styles['TableCellBold']),
        ],
        [
            Paragraph("<b>Communication</b>", styles['TableCellBold']),
            Paragraph("Layers of middle management; slow ticket turnarounds.", styles['TableCell']),
            Paragraph("Direct access to senior engineers; integrated Slack/Teams stand-ups.", styles['TableCellBold']),
        ],
        [
            Paragraph("<b>IP & Security</b>", styles['TableCellBold']),
            Paragraph("Ambiguous licensing; shared libraries; potential data leakage.", styles['TableCell']),
            Paragraph("100% client code ownership, strict NDAs, and enterprise encryption standards.", styles['TableCellBold']),
        ],
    ]

    diff_table = Table(diff_data, colWidths=[100, 205, 218])
    diff_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY_PRIMARY),
        ('BOX', (0, 0), (-1, -1), 0.8, BORDER_LIGHT),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 7),
        ('RIGHTPADDING', (0, 0), (-1, -1), 7),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CARD_BG]),
    ]))
    flowables.append(diff_table)

    flowables.append(PageBreak())
    return flowables


def build_services_page(data, styles):
    """
    Page 4: Services and Business Capabilities per pdf.md
    """
    flowables = []
    services = data.get('services', [])

    flowables.append(Paragraph("03 • SERVICE CAPABILITIES", styles['SectionEyebrow']))
    flowables.append(Paragraph("Enterprise Digital Services", styles['PageTitle']))
    flowables.append(Paragraph(
        "Verified core technology competencies engineered to solve complex operational requirements.",
        styles['PageSubtitle']
    ))

    # Grid of services (2 columns x 3 rows)
    service_cards = []
    for s in services:
        points_html = "<br/>".join([f"• {pt}" for pt in s.get('points', [])])
        card_content = [
            Paragraph(f"<b>{s['indexNumber']} • {s['title']}</b>", styles['CardTitle']),
            Paragraph(f"<i>{s['highlight']}</i> • <b>{s['statsBadge']}</b>", ParagraphStyle('SHigh', fontName='Helvetica', fontSize=7.5, leading=9, textColor=ACCENT_BLUE, spaceAfter=3)),
            Paragraph(s['blurb'], styles['BodyMuted']),
            Spacer(1, 4),
            Paragraph(f"<b>Key Capabilities:</b><br/>{points_html}", ParagraphStyle('SPoints', fontName='Helvetica', fontSize=7.5, leading=10, textColor=TEXT_DARK)),
        ]
        service_cards.append(card_content)

    # Pair them into rows
    rows = []
    for i in range(0, len(service_cards), 2):
        row = [service_cards[i]]
        if i + 1 < len(service_cards):
            row.append(service_cards[i + 1])
        else:
            row.append([])
        rows.append(row)

    services_table = Table(rows, colWidths=[USABLE_WIDTH/2 - 4, USABLE_WIDTH/2 - 4])
    services_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), CARD_BG),
        ('BOX', (0, 0), (-1, -1), 0.8, BORDER_LIGHT),
        ('INNERGRID', (0, 0), (-1, -1), 6, WHITE),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    flowables.append(services_table)
    flowables.append(Spacer(1, 10))

    # Commercial Note
    flowables.append(Paragraph(
        "<b>Engagement Note:</b> All services are available as end-to-end turnkey deliveries or as modular engineering sprints augmenting your internal product teams.",
        ParagraphStyle('SNote', fontName='Helvetica', fontSize=8, leading=11, textColor=TEXT_MUTED, alignment=1)
    ))

    flowables.append(PageBreak())
    return flowables


def build_tech_stack_page(data, styles):
    """
    Page 5: Technology Stack & Engineering Expertise per pdf.md
    """
    flowables = []
    tech_cats = data.get('techCategories', [])

    flowables.append(Paragraph("04 • TECHNICAL PROFICIENCY", styles['SectionEyebrow']))
    flowables.append(Paragraph("Technology Ecosystem & Standards", styles['PageTitle']))
    flowables.append(Paragraph(
        "A rigorous, modern technology stack chosen for maximum scalability, speed, and long-term maintainability.",
        styles['PageSubtitle']
    ))

    # 4 Key Stack Categories
    stack_cards = []
    for cat in tech_cats[:4]:
        items_summary = []
        for it in cat.get('items', [])[:4]:
            items_summary.append(f"<b>{it['name']}</b> ({it.get('badge', 'Core')}): {it['description']}")
        items_html = "<br/><br/>".join(items_summary)

        content = [
            Paragraph(f"<b>{cat['category']}</b>", styles['SectionH2']),
            Paragraph(cat['description'], styles['BodyMuted']),
            Spacer(1, 4),
            Paragraph(items_html, ParagraphStyle('TechIt', fontName='Helvetica', fontSize=7.5, leading=10, textColor=TEXT_DARK)),
        ]
        stack_cards.append(content)

    # 2x2 grid
    stack_grid_data = [
        [stack_cards[0] if len(stack_cards) > 0 else [], stack_cards[1] if len(stack_cards) > 1 else []],
        [stack_cards[2] if len(stack_cards) > 2 else [], stack_cards[3] if len(stack_cards) > 3 else []],
    ]
    stack_table = Table(stack_grid_data, colWidths=[USABLE_WIDTH/2 - 4, USABLE_WIDTH/2 - 4])
    stack_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), CARD_BG),
        ('BOX', (0, 0), (-1, -1), 0.8, BORDER_LIGHT),
        ('INNERGRID', (0, 0), (-1, -1), 6, WHITE),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    flowables.append(stack_table)
    flowables.append(Spacer(1, 10))

    # Engineering Discipline Table
    flowables.append(Paragraph("<b>Architectural & Quality Standards</b>", styles['SectionH2']))

    standards_data = [
        [
            Paragraph("<b>Architecture Pillar</b>", styles['TableHeader']),
            Paragraph("<b>Standard Implementation</b>", styles['TableHeader']),
            Paragraph("<b>Business Benefit</b>", styles['TableHeader']),
        ],
        [
            Paragraph("<b>Strict Type Safety</b>", styles['TableCellBold']),
            Paragraph("TypeScript 5+ throughout frontend & backend API boundaries.", styles['TableCell']),
            Paragraph("Eliminates runtime null pointer regressions; self-documenting code.", styles['TableCell']),
        ],
        [
            Paragraph("<b>Security First</b>", styles['TableCellBold']),
            Paragraph("Tokenized auth, role-based access control (RBAC), sanitization.", styles['TableCell']),
            Paragraph("Protects customer data and secures compliance audits.", styles['TableCell']),
        ],
        [
            Paragraph("<b>Speed & Performance</b>", styles['TableCellBold']),
            Paragraph("Lighthouse 95+ target; sub-100ms API response latency.", styles['TableCell']),
            Paragraph("Boosts user retention and search engine rankings.", styles['TableCell']),
        ],
    ]
    std_table = Table(standards_data, colWidths=[120, 200, 203])
    std_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY_PRIMARY),
        ('BOX', (0, 0), (-1, -1), 0.8, BORDER_LIGHT),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CARD_BG]),
    ]))
    flowables.append(std_table)

    flowables.append(PageBreak())
    return flowables


def build_portfolio_matrix_page(data, styles):
    """
    Page 6: Automatically Generated Project Overview Matrix per pdf.md
    """
    flowables = []
    projects = data.get('projects', [])

    flowables.append(Paragraph("05 • PROVEN DEMONSTRATIONS", styles['SectionEyebrow']))
    flowables.append(Paragraph("Discovered Portfolio Overview", styles['PageTitle']))
    flowables.append(Paragraph(
        "A structured matrix of verified digital projects, interactive prototypes, and production architectures.",
        styles['PageSubtitle']
    ))

    matrix_rows = [
        [
            Paragraph("<b>#</b>", styles['TableHeader']),
            Paragraph("<b>Project Name</b>", styles['TableHeader']),
            Paragraph("<b>Domain & Category</b>", styles['TableHeader']),
            Paragraph("<b>Status / Type</b>", styles['TableHeader']),
            Paragraph("<b>Core Stack</b>", styles['TableHeader']),
            Paragraph("<b>Key Innovation</b>", styles['TableHeader']),
        ]
    ]

    for idx, p in enumerate(projects, 1):
        tech_names = ", ".join([t['name'] for t in p.get('technologies', [])[:3]])
        matrix_rows.append([
            Paragraph(f"<b>0{idx}</b>", styles['TableCell']),
            Paragraph(f"<b>{p['title']}</b>", styles['TableCellBold']),
            Paragraph(p['category'], styles['TableCell']),
            Paragraph(f"<i>{p['type']}</i>", styles['TableCell']),
            Paragraph(tech_names, styles['TableCell']),
            Paragraph(p.get('tagline', '')[:75] + '...', styles['TableCell']),
        ])

    matrix_table = Table(matrix_rows, colWidths=[24, 120, 85, 80, 95, 119])
    matrix_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY_PRIMARY),
        ('BOX', (0, 0), (-1, -1), 0.8, BORDER_LIGHT),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CARD_BG]),
    ]))
    flowables.append(matrix_table)
    flowables.append(Spacer(1, 12))

    notice_p = Paragraph(
        "<b>Verification Note:</b> The case studies in the following section detail actual software demonstrations and prototypes "
        "designed and engineered by Exception IT Solutions. Each project is accessible for live interactive inspection on our web platform.",
        ParagraphStyle('MatNotice', fontName='Helvetica', fontSize=8, leading=11, textColor=TEXT_MUTED)
    )
    flowables.append(notice_p)

    flowables.append(PageBreak())
    return flowables


def build_single_case_study_pages(project, styles, is_standalone=False):
    """
    Builds the complete case study according to Section 5 of pdf.md.
    Fits neatly into 1 page for master or 2 pages for standalone.
    """
    flowables = []

    # Header
    cat_tag = f"{project.get('category', '').upper()} • {project.get('type', '').upper()} • {project.get('year', '2025')}"
    flowables.append(Paragraph(cat_tag, styles['SectionEyebrow']))
    flowables.append(Paragraph(project['title'], styles['PageTitle']))
    flowables.append(Paragraph(project.get('tagline', project.get('summary', '')), styles['PageSubtitle']))

    # 2-Column: Left (Problem & Solution), Right (Image & Key Stats)
    left_col = []
    left_col.append(Paragraph("<b>Business Context & Problem</b>", styles['SectionH2']))
    left_col.append(Paragraph(project.get('problem', project.get('overview', '')), styles['BodyRegular']))
    left_col.append(Spacer(1, 4))

    left_col.append(Paragraph("<b>Engineered Solution Blueprint</b>", styles['SectionH2']))
    left_col.append(Paragraph(project.get('solution', ''), styles['BodyRegular']))
    left_col.append(Spacer(1, 4))

    # Key Features
    left_col.append(Paragraph("<b>Core Capabilities & Features</b>", styles['SectionH2']))
    for feat in project.get('keyFeatures', [])[:3]:
        left_col.append(Paragraph(f"• <b>{feat['title']}:</b> {feat['description']}", styles['BulletItem']))

    # Right Column: Image + Tech Stack + Challenges
    right_col = []

    # Pick the best image (prefer .jpg or fallback to .svg)
    img_flowable = None
    images = project.get('images', [])
    for img_obj in images:
        rel_url = img_obj.get('url', '').lstrip('/')
        full_path = os.path.abspath(f"public/{rel_url}")
        img_flowable = fit_asset_image(full_path, target_width=USABLE_WIDTH/2 - 10, target_height=125)
        if img_flowable:
            break

    if img_flowable:
        right_col.append(img_flowable)
        caption_text = images[0].get('caption', 'System Interface Preview')
        right_col.append(Paragraph(f"<i>{caption_text}</i>", ParagraphStyle('Cap', fontName='Helvetica', fontSize=7, leading=9, textColor=TEXT_MUTED, alignment=1)))
        right_col.append(Spacer(1, 6))

    # Tech Stack Badges
    tech_names = ", ".join([t['name'] for t in project.get('technologies', [])[:6]])
    right_col.append(Paragraph("<b>Technology Stack</b>", styles['CardTitle']))
    right_col.append(Paragraph(tech_names, styles['BodyMuted']))
    right_col.append(Spacer(1, 4))

    # Architecture bullet
    if project.get('architecture'):
        right_col.append(Paragraph("<b>Architecture Highlight</b>", styles['CardTitle']))
        arch_summary = project['architecture'][0] if len(project['architecture']) > 0 else "Modular design"
        right_col.append(Paragraph(arch_summary, styles['BodyMuted']))
        right_col.append(Spacer(1, 4))

    # Key Challenge & Resolution
    challenges = project.get('challenges', [])
    if challenges:
        c = challenges[0]
        right_col.append(Paragraph(f"<b>Challenge:</b> {c['challenge']}", ParagraphStyle('Ch', fontName='Helvetica', fontSize=7.5, leading=10, textColor=ERROR_ROSE)))
        right_col.append(Paragraph(f"<b>Solution:</b> {c['solution']}", ParagraphStyle('Sol', fontName='Helvetica', fontSize=7.5, leading=10, textColor=SUCCESS_GREEN)))

    # Metrics row
    metrics = project.get('metrics', [])
    if metrics:
        metric_paras = []
        for m in metrics[:3]:
            metric_paras.append(Paragraph(f"<b>{m['value']}</b><br/><font color='#64748B'>{m['label']}</font>", ParagraphStyle('MP', fontName='Helvetica', fontSize=7.5, leading=10, alignment=1)))
        m_table = Table([metric_paras], colWidths=[(USABLE_WIDTH/2 - 10)/len(metric_paras)] * len(metric_paras))
        m_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), CARD_BG),
            ('BOX', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
            ('TOPPADDING', (0, 0), (-1, -1), 4),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ]))
        right_col.append(Spacer(1, 4))
        right_col.append(m_table)

    two_col_table = Table([[left_col, right_col]], colWidths=[USABLE_WIDTH/2 - 5, USABLE_WIDTH/2 - 5])
    two_col_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    flowables.append(two_col_table)
    flowables.append(Spacer(1, 8))

    # Project Call to Action Footer
    cta_text = (
        f"<b>Interested in a solution like {project['title']}?</b> "
        "Discuss your technical scope, architecture feasibility, and milestone roadmap with Exception IT Solutions. "
        "Visit: <u>https://exceptionit.com</u> or email <u>exceptionitsolution@gmail.com</u>"
    )
    cta_t = Table([[Paragraph(cta_text, ParagraphStyle('CaseCTA', fontName='Helvetica', fontSize=7.5, leading=10, textColor=NAVY_PRIMARY))]], colWidths=[USABLE_WIDTH])
    cta_t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), HexColor('#F0FDF4')),
        ('BOX', (0, 0), (-1, -1), 0.8, SUCCESS_GREEN),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    flowables.append(cta_t)

    flowables.append(PageBreak())
    return flowables


def build_methodology_page(data, styles):
    """
    Page 15: Project Delivery Methodology per pdf.md
    """
    flowables = []
    process_steps = data.get('processSteps', [])

    flowables.append(Paragraph("06 • EXECUTION PLAYBOOK", styles['SectionEyebrow']))
    flowables.append(Paragraph("Sprint-Driven Delivery Methodology", styles['PageTitle']))
    flowables.append(Paragraph(
        "A transparent, milestone-gated engineering workflow ensuring zero-defect deployments and predictable schedules.",
        styles['PageSubtitle']
    ))

    methodology_rows = [
        [
            Paragraph("<b>Sprint Phase</b>", styles['TableHeader']),
            Paragraph("<b>Core Focus & Activities</b>", styles['TableHeader']),
            Paragraph("<b>Primary Deliverables</b>", styles['TableHeader']),
            Paragraph("<b>Quality Gate</b>", styles['TableHeader']),
        ]
    ]

    for p in process_steps:
        deliv_html = ", ".join(p.get('deliverables', []))
        methodology_rows.append([
            Paragraph(f"<b>{p['number']} • {p['title']}</b><br/><font color='#64748B'>{p['duration']}</font>", styles['TableCellBold']),
            Paragraph(f"<b>{p['subtitle']}</b><br/>{p['description']}", styles['TableCell']),
            Paragraph(deliv_html, styles['TableCell']),
            Paragraph(f"<b>{p['metricBadge']}</b>", ParagraphStyle('QG', fontName='Helvetica-Bold', fontSize=7.5, leading=10, textColor=SUCCESS_GREEN)),
        ])

    meth_table = Table(methodology_rows, colWidths=[90, 180, 160, 93])
    meth_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), NAVY_PRIMARY),
        ('BOX', (0, 0), (-1, -1), 0.8, BORDER_LIGHT),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, BORDER_LIGHT),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CARD_BG]),
    ]))
    flowables.append(meth_table)
    flowables.append(Spacer(1, 14))

    # Client Collaboration Commitments
    flowables.append(Paragraph("<b>Client Involvement & Governance Commitments</b>", styles['SectionH2']))

    comm_boxes = [
        Paragraph("<b>1. Weekly Sprint Demos:</b> Working software demonstrated in staging environments every 2 weeks.", styles['BodyRegular']),
        Paragraph("<b>2. Direct Git / Slack Access:</b> Transparent commits, direct developer channels, and zero intermediary delay.", styles['BodyRegular']),
        Paragraph("<b>3. Documented Architecture:</b> Full API schemas, database ERDs, and deployment runbooks handed over upon completion.", styles['BodyRegular']),
    ]
    flowables.extend(comm_boxes)

    flowables.append(PageBreak())
    return flowables


def build_engagement_model_page(data, styles):
    """
    Page 16: B2B Engagement Model per pdf.md
    """
    flowables = []

    flowables.append(Paragraph("07 • PARTNERSHIP FRAMEWORK", styles['SectionEyebrow']))
    flowables.append(Paragraph("B2B Engagement Models & Onboarding", styles['PageTitle']))
    flowables.append(Paragraph(
        "Commercial structures tailored to startups, growing product companies, and enterprise initiatives.",
        styles['PageSubtitle']
    ))

    # 3 Engagement Models in cards
    models_data = [
        [
            Paragraph("<b>Model A: Fixed-Scope Delivery</b>", styles['CardTitle']),
            Paragraph("<b>Model B: Dedicated Pod</b>", styles['CardTitle']),
            Paragraph("<b>Model C: Retainer & Support</b>", styles['CardTitle']),
        ],
        [
            Paragraph("Ideal for well-defined MVPs, prototypes, or redesigns with clear technical specifications.", styles['BodyMuted']),
            Paragraph("Ideal for scaling startups needing high-velocity engineering pods directly integrated into their backlog.", styles['BodyMuted']),
            Paragraph("Ideal for production applications requiring continuous SLA maintenance, feature iteration, and security audits.", styles['BodyMuted']),
        ],
        [
            Paragraph("• Milestone-based payments<br/>• Clear scope boundary<br/>• Strict delivery timeline", styles['BodyRegular']),
            Paragraph("• Senior Full-Stack Engineers<br/>• Flexible monthly allocation<br/>• Seamless sprint agility", styles['BodyRegular']),
            Paragraph("• 24/7 uptime monitoring<br/>• Security patch updates<br/>• Priority bug fixes", styles['BodyRegular']),
        ]
    ]

    models_table = Table(models_data, colWidths=[USABLE_WIDTH/3 - 4, USABLE_WIDTH/3 - 4, USABLE_WIDTH/3 - 4])
    models_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), CARD_BG),
        ('BOX', (0, 0), (-1, -1), 0.8, BORDER_LIGHT),
        ('INNERGRID', (0, 0), (-1, -1), 6, WHITE),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    flowables.append(models_table)
    flowables.append(Spacer(1, 14))

    # Client Preparation Checklist
    flowables.append(Paragraph("<b>Client Project Preparation Checklist</b>", styles['SectionH2']))
    flowables.append(Paragraph(
        "To expedite technical discovery and proposal formulation, clients are invited to prepare:",
        styles['BodyRegular']
    ))

    checklist_items = [
        "1. High-level business objective & target user personas.",
        "2. Existing technical assets, APIs, wireframes, or reference benchmark apps.",
        "3. Core integrations required (payment gateways, CRM, SSO, legacy databases).",
        "4. Anticipated launch timeline or key fundraising / investor milestones.",
    ]
    for ch in checklist_items:
        flowables.append(Paragraph(f"• {ch}", styles['BulletItem']))

    flowables.append(Spacer(1, 10))

    # Security & IP Statement
    sec_notice = (
        "<b>Intellectual Property & Confidentiality Guarantee:</b> "
        "Exception IT Solutions signs strict bilateral Non-Disclosure Agreements (NDAs) prior to detailed discovery discussions. "
        "All source code, database architectures, and digital assets developed under contract are 100% owned by the client upon completion."
    )
    sec_t = Table([[Paragraph(sec_notice, ParagraphStyle('SecNot', fontName='Helvetica', fontSize=8, leading=11, textColor=NAVY_PRIMARY))]], colWidths=[USABLE_WIDTH])
    sec_t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), HexColor('#F8FAFC')),
        ('BOX', (0, 0), (-1, -1), 0.8, ACCENT_BLUE),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ]))
    flowables.append(sec_t)

    flowables.append(PageBreak())
    return flowables


def build_contact_cta_page(data, styles):
    """
    Page 17: Final Contact and Call to Action per pdf.md
    """
    flowables = []
    company = data.get('company', {})

    flowables.append(Spacer(1, 15))

    # Dark Closing Card
    closing_content = []

    logo_path = os.path.abspath('public/logo-mark.png')
    if os.path.exists(logo_path):
        closing_content.append(RLImage(logo_path, width=55, height=55))
        closing_content.append(Spacer(1, 10))

    closing_content.append(Paragraph("EXCEPTION IT SOLUTIONS • COMMERCIAL ENGAGEMENT", styles['SectionEyebrow']))
    closing_content.append(Spacer(1, 4))
    closing_content.append(Paragraph("Let's Build Your Next Digital Solution.", styles['CoverTitle']))
    closing_content.append(Spacer(1, 6))

    body_text = (
        "Share your business challenge, product vision, or technical requirements with Exception IT Solutions. "
        "Our team will conduct an architecture feasibility review and provide a structured scope and timeline proposal."
    )
    closing_content.append(Paragraph(body_text, ParagraphStyle('CTABody', fontName='Helvetica', fontSize=10, leading=15, textColor=WHITE)))
    closing_content.append(Spacer(1, 20))

    # Direct contact blocks
    contacts_data = [
        [
            Paragraph("<b>Direct Inquiries</b><br/><font color='#5AA9FF'>exceptionitsolution@gmail.com</font>", ParagraphStyle('C1', fontName='Helvetica', fontSize=8.5, leading=12, textColor=WHITE)),
            Paragraph("<b>Telephone & WhatsApp</b><br/><font color='#5AA9FF'>+91 76984 04843<br/>+91 98242 14100</font>", ParagraphStyle('C2', fontName='Helvetica', fontSize=8.5, leading=12, textColor=WHITE)),
            Paragraph("<b>Official Website</b><br/><font color='#5AA9FF'>https://exceptionit.com</font>", ParagraphStyle('C3', fontName='Helvetica', fontSize=8.5, leading=12, textColor=WHITE)),
        ]
    ]
    c_table = Table(contacts_data, colWidths=[150, 160, 160])
    c_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), HexColor('#0C243E')),
        ('BOX', (0, 0), (-1, -1), 0.8, ACCENT_BLUE),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, NAVY_SURFACE),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    closing_content.append(c_table)
    closing_content.append(Spacer(1, 16))

    # Social Channels
    socials_p = Paragraph(
        "<b>Verified Socials:</b> LinkedIn: /company/exception-it-solutions • Instagram: @exception_it • Facebook: /exception_it",
        ParagraphStyle('Soc', fontName='Helvetica', fontSize=7.5, leading=10, textColor=ACCENT_BLUE)
    )
    closing_content.append(socials_p)

    closing_table = Table([[closing_content]], colWidths=[USABLE_WIDTH])
    closing_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), NAVY_PRIMARY),
        ('BOX', (0, 0), (-1, -1), 1.5, ACCENT_BLUE),
        ('TOPPADDING', (0, 0), (-1, -1), 35),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 35),
        ('LEFTPADDING', (0, 0), (-1, -1), 25),
        ('RIGHTPADDING', (0, 0), (-1, -1), 25),
    ]))

    flowables.append(closing_table)
    return flowables


def generate_master_portfolio_pdf(data, output_path):
    """
    Generates the complete 17-page B2B Company Portfolio PDF.
    """
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN,
        bottomMargin=MARGIN,
        title="Exception IT Solutions - B2B Company Portfolio",
        author="Exception IT Solutions",
        subject="B2B Digital Solutions, Software Engineering & Technology",
        creator="Exception IT Solutions Publishing Engine",
    )

    styles = get_custom_styles()
    story = []

    # 1. Cover
    story.extend(build_cover_page(data, styles))
    # 2. Executive Summary
    story.extend(build_executive_summary_page(data, styles))
    # 3. Company Overview & Value Proposition
    story.extend(build_company_overview_page(data, styles))
    # 4. Services
    story.extend(build_services_page(data, styles))
    # 5. Tech Stack
    story.extend(build_tech_stack_page(data, styles))
    # 6. Portfolio Overview Matrix
    story.extend(build_portfolio_matrix_page(data, styles))

    # 7-14. Detailed Case Studies for all 8 discovered projects
    for project in data.get('projects', []):
        story.extend(build_single_case_study_pages(project, styles))

    # 15. Methodology
    story.extend(build_methodology_page(data, styles))
    # 16. Engagement Model
    story.extend(build_engagement_model_page(data, styles))
    # 17. Contact & CTA
    story.extend(build_contact_cta_page(data, styles))

    print(f"Building Master PDF: {output_path}...")
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"-> Successfully generated Master PDF ({os.path.getsize(output_path)} bytes)!")


def generate_individual_case_study_pdfs(data, output_dir):
    """
    Generates dedicated 3-page case study PDFs for each discovered project.
    """
    os.makedirs(output_dir, exist_ok=True)
    styles = get_custom_styles()

    for project in data.get('projects', []):
        slug = project['slug']
        file_path = os.path.join(output_dir, f"{slug}-case-study.pdf")
        doc = SimpleDocTemplate(
            file_path,
            pagesize=A4,
            leftMargin=MARGIN,
            rightMargin=MARGIN,
            topMargin=MARGIN,
            bottomMargin=MARGIN,
            title=f"{project['title']} - Case Study | Exception IT Solutions",
            author="Exception IT Solutions",
            subject=f"Case Study: {project['title']}",
        )

        story = []
        # Page 1: Dedicated Case Study Deep-Dive
        story.extend(build_single_case_study_pages(project, styles, is_standalone=True))
        # Page 2: Delivery Methodology & Engagement
        story.extend(build_methodology_page(data, styles))
        # Page 3: Contact & CTA
        story.extend(build_contact_cta_page(data, styles))

        doc.build(story, canvasmaker=NumberedCanvas)
        print(f"-> Generated Case Study PDF: {file_path} ({os.path.getsize(file_path)} bytes)")


def main():
    json_path = os.path.abspath('scripts/exported_data.json')
    if not os.path.exists(json_path):
        print(f"Error: {json_path} does not exist. Run node scripts/export_data.js first.")
        sys.exit(1)

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # 1. Master PDF
    master_pdf_path = os.path.abspath('public/docs/Exception-IT-Solutions-B2B-Company-Portfolio.pdf')
    generate_master_portfolio_pdf(data, master_pdf_path)

    # 2. Individual Case Study PDFs
    case_studies_dir = os.path.abspath('public/docs/case-studies')
    generate_individual_case_study_pdfs(data, case_studies_dir)

    print("\nALL B2B PDFs GENERATED SUCCESSFULLY!")


if __name__ == '__main__':
    main()
