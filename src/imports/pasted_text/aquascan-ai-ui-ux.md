Design a complete, production-ready, multi-screen web application UI/UX for an AI-powered underwater marine debris detection platform named "AquaScan AI". This is a scientific/research-grade tool used by marine researchers, environmental agencies, and hackathon demo purposes.
1. BRAND IDENTITY & VISUAL LANGUAGE
Theme: Deep-sea dark mode, futuristic sonar/radar aesthetic
Primary background: Deep navy-black gradient (#050D17 to #0A1929)
Secondary panel background: #0D2436 with 8% opacity glassmorphism blur (backdrop-blur)
Primary accent color: Cyan/Aqua glow (#22D3EE, #00D9FF) — used for buttons, active states, highlights, sonar wave graphics
Secondary accent: Coral-red (#FF4D4D) for debris/alert indicators
Success/safe color: Emerald green (#34D399) for natural/non-debris objects
Warning color: Amber (#FBBF24) for medium-confidence detections
Typography:
Headings — "Space Grotesk" or "Poppins" Bold, letter-spacing slightly wide
Body text — "Inter" Regular/Medium
Font sizes: H1 (40px), H2 (28px), H3 (20px), Body (14-16px), Caption (12px)
Iconography: Line-style icons (Lucide/Feather icon set), cyan glow on hover
Logo: Minimalist wave/radar-ping symbol combined with "AquaScan AI" wordmark
Corner radius: 12-16px on cards, 8px on buttons/inputs
Shadows: Soft cyan-tinted glow shadows on hover states (box-shadow with cyan at low opacity)
Grid system: 12-column responsive grid, 24px gutter, 1440px max desktop width
2. SCREEN 1 — LANDING / HERO PAGE
Top Navbar: Logo (left), nav links (Home, Features, How It Works, Demo, Contact) center-aligned, "Try Demo" CTA button (right, filled cyan)
Hero Section:
Large heading: "Detect Marine Debris Before It Destroys Our Oceans"
Subheading: "AI-powered sonar analysis that identifies, classifies, and maps underwater debris in real-time"
Two CTA buttons: "Upload Sonar Image" (filled cyan) and "Watch Demo" (outline, ghost button with play icon)
Right/background visual: animated concentric sonar rings pulsing outward from center, with small dots representing detected objects appearing on the rings
Stats strip below hero: 4 small stat cards horizontally — "98.5% Accuracy", "11+ Object Classes", "Real-Time Detection", "Noise-Resistant AI"
How It Works section: 3-step horizontal process cards with icons — Step 1: Upload Sonar Image, Step 2: AI Analysis, Step 3: Get Detection Report — connected by dotted line with arrow
Features grid: 6 feature cards in 3x2 grid (icon + title + short description) — Object Detection, Classification, Noise Handling, Confidence Scoring, Location Mapping, Exportable Reports
Footer: Logo, quick links, social icons, copyright text, dark background matching theme
3. SCREEN 2 — MAIN DASHBOARD (Post-login)
Left Sidebar (fixed, 240px width, collapsible):
Logo at top
Nav items with icons: Dashboard (home icon), Upload Scan (upload icon), Detection History (clock icon), Analytics (bar-chart icon), Reports (file icon), Settings (gear icon)
Active nav item highlighted with cyan left-border + subtle background glow
User profile card at bottom (avatar, name, "View Profile" link, logout icon)
Top Header Bar:
Search bar (rounded, with search icon, placeholder "Search scans, reports...")
Notification bell icon with red dot badge
Dark/light mode toggle
User avatar dropdown
Main content area — Dashboard Overview:
Welcome text: "Welcome back, [User Name]"
4 KPI summary cards in a row: "Total Scans" (with number + small trend arrow), "Debris Detected" (count + red accent), "Avg Confidence Score" (percentage + circular indicator), "Active Alerts" (count + amber accent)
Large chart card: "Detections Over Time" — line/area chart, last 30 days, cyan gradient fill under line
Donut chart card: "Debris Type Distribution" — segments for Plastic, Metal, Fishing Net, Unknown, each color-coded with legend
Recent Scans table/list (last 5 entries): thumbnail, filename, date, detected count, status badge (Processing/Completed/Failed)
Floating "+ New Scan" button (bottom-right, circular, cyan, with plus icon and subtle pulse animation)
4. SCREEN 3 — UPLOAD / SCAN SCREEN
Page title: "Upload Sonar Image for Analysis"
Large drag-and-drop upload zone: dashed cyan border, centered upload cloud icon, text "Drag & drop your sonar image here" + "or" + "Browse Files" button, supported formats caption below (.png, .jpg, .tiff — sonar formats)
Uploaded file preview card: thumbnail, filename, file size, remove (X) icon, progress bar during upload
Settings panel (right side or below upload):
Toggle switches: "Enable Noise Reduction", "Enhance Low Resolution", "Show Confidence Threshold"
Slider: "Minimum Confidence Threshold" (0-100%)
Dropdown: "Detection Model Version" (v1.0, v1.2 Beta)
"Start Analysis" primary button (large, filled cyan, with loading spinner state when processing)
Processing state UI: Animated scanning line moving across the uploaded image (like a radar sweep), progress percentage text, "Analyzing sonar patterns..." status text
5. SCREEN 4 — DETECTION RESULTS SCREEN (Most important — core demo screen)
Split-view layout:
Left panel (60% width): The sonar image displayed large, with colored bounding boxes overlaid on detected objects
Red bounding box = Debris (Plastic/Metal/Net)
Green bounding box = Natural structure (Rock/Coral)
Each box has a small label tag above it showing class name + confidence % (e.g., "Plastic 94%")
Zoom in/out controls (bottom-left of image), fullscreen toggle icon (top-right of image)
Toggle switch: "Show/Hide Bounding Boxes", "Show/Hide Labels"
Right panel (40% width) — Detected Objects List:
Scrollable list of cards, one per detected object
Each card: colored icon/dot (red/green/amber based on type), object class name, confidence score (circular progress ring, e.g., 94%), coordinates (X, Y), small thumbnail crop of that specific object
Sort/filter dropdown: "Sort by Confidence", "Filter by Type"
Bottom action bar: "Download Report (PDF)" button, "Export Data (CSV/JSON)" button, "Save to History" button, "Share Results" icon button
Summary strip at top of results: "12 Objects Detected | 8 Debris | 4 Natural | Processing Time: 2.3s"
6. SCREEN 5 — ANALYTICS / REPORTS SCREEN
Page title: "Analytics & Insights"
Date range filter (top-right, dropdown: Last 7 days, 30 days, Custom range)
Grid of analytics cards:
Bar chart: "Debris Detected by Type" (Plastic, Metal, Net, Other)
Line chart: "Detection Accuracy Trend Over Time"
Heatmap or map visualization: "Debris Density by Location" (if location data used)
Pie chart: "Detection Confidence Distribution" (High/Medium/Low buckets)
Data table below: Full scan history with sortable columns — Scan ID, Date, Location, Objects Found, Debris Count, Accuracy, Status, Actions (view/download icons)
Export All Reports button (top-right, outline style)
7. SCREEN 6 — HISTORY SCREEN
Table/Card hybrid view toggle (grid icon / list icon switch, top-right)
Each history item shows: sonar image thumbnail, scan date & time, total objects detected, debris count badge (red), natural count badge (green), confidence average, status tag (Completed/Processing/Failed), "View Details" button
Search and filter bar: filter by date, object type, confidence range, status
Pagination controls at bottom
8. COMPONENT LIBRARY TO DESIGN (as a separate Figma page/section)
Buttons: Primary (filled cyan), Secondary (outline cyan), Ghost, Danger (red), Disabled state, Loading state (with spinner)
Input fields: Text input, search input, dropdown/select, slider, toggle switch, checkbox, radio button — all with default/focus/error states
Badges/Tags: Debris type tags (color-coded pills) — Plastic (red), Metal (orange), Net (purple), Rock/Natural (green), Unknown (gray)
Cards: Stat card, chart card, list item card, upload card — all with hover elevation effect
Modals: Image preview modal, confirmation modal, "Detection Complete" success modal
Toast notifications: Success (green), Error (red), Info (cyan), Warning (amber) — top-right corner slide-in style
Progress indicators: Circular percentage ring, linear progress bar, loading skeleton screens
Navigation: Sidebar (expanded/collapsed states), breadcrumbs, tabs
9. INTERACTION & MICRO-ANIMATION NOTES
Sonar ping/ripple animation on hero background (looping)
Radar-sweep scanning line animation during image processing
Bounding boxes fade-in one-by-one with slight delay (staggered animation) when results load
Hover states: cards lift slightly with increased glow shadow
Button click: subtle scale-down (press effect) + ripple
Page transitions: smooth fade/slide between screens
10. RESPONSIVE BEHAVIOR
Design for Desktop (1440px), Tablet (768px), and Mobile (375px) breakpoints
On mobile: sidebar collapses into bottom nav bar or hamburger menu, split-view result screen stacks vertically (image on top, detected list below)
OVERALL MOOD/TONE
Professional, trustworthy, scientific — similar to ocean research dashboards, NASA-style mission control panels, or environmental monitoring tools. NOT playful, NOT cartoonish. Should feel like a serious tool used by marine conservation professionals and AI researchers.