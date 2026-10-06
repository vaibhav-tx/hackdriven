import re

with open('src/data/opportunities.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace imports
imports_to_remove = [
    'import evCool from "@/assets/ev-cool.jpg";',
    'import evCyber from "@/assets/ev-cyber.jpg";',
    'import inspirePoster from "@/assets/inspire-colloquium.png.asset.json";',
    'import iplPoster from "@/assets/events/ipl-innovation-pitch-league-2026.jpeg.asset.json";',
    'import elevatePoster from "@/assets/events/elevate-1-0-2026.png.asset.json";',
    'import hackInHillsPoster from "@/assets/events/hack-in-hills-2026.jpeg.asset.json";',
    'import vecnaVersePoster from "@/assets/events/vecna-verse-2026.jpeg.asset.json";',
    'import unicornSummitPoster from "@/assets/events/unicorn-ai-gpu-pre-summit.png.asset.json";',
    'import structuringAiPoster from "@/assets/events/structuring-the-ai-way.png.asset.json";',
    'import aiAtWorkPoster from "@/assets/events/ai-at-work.png.asset.json";',
    'import enterpriseAiSummitPoster from "@/assets/events/enterprise-ai-summit-mumbai-2026.png.asset.json";',
    'import clinicalAiPoster from "@/assets/events/clinical-ai-summit-2026.png.asset.json";',
    'import durableDevOpsPoster from "@/assets/events/durable-devops-tech-meetup.png.asset.json";',
    'import allInOnePoster from "@/assets/events/allin1place-ai-human-touch.png.asset.json";'
]

new_imports = """import hackathonHall from "@/assets/community-real/hackathon-hall.jpg";
import inceptrixGroup from "@/assets/community-real/inceptrix-group.png";
import computerLab from "@/assets/community-real/computer-lab.png";
import organizerGroup from "@/assets/community-real/organizer-group.png";
import auditoriumAudience from "@/assets/community-real/auditorium-audience.png";"""

for imp in imports_to_remove:
    content = content.replace(imp + '\n', '')

content = new_imports + '\n' + content

# Replace images
replacements = {
    'image: inspirePoster.url': 'image: auditoriumAudience',
    'image: iplPoster.url': 'image: hackathonHall',
    'image: elevatePoster.url': 'image: inceptrixGroup',
    'image: vecnaVersePoster.url': 'image: computerLab',
    'image: hackInHillsPoster.url': 'image: organizerGroup',
    'image: evCool': 'image: hackathonHall',
    'image: evCyber': 'image: computerLab',
    'image: unicornSummitPoster.url': 'image: auditoriumAudience',
    'image: structuringAiPoster.url': 'image: inceptrixGroup',
    'image: aiAtWorkPoster.url': 'image: organizerGroup',
    'image: enterpriseAiSummitPoster.url': 'image: auditoriumAudience',
    'image: clinicalAiPoster.url': 'image: computerLab',
    'image: durableDevOpsPoster.url': 'image: hackathonHall',
    'image: allInOnePoster.url': 'image: inceptrixGroup'
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open('src/data/opportunities.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement complete.")
