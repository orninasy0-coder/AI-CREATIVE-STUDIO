---
Task ID: 1
Agent: Main
Task: Fix 4 issues - logo size, mega menu hover, header animated background, server performance

Work Log:
- Read Header.tsx, HeroSection.tsx, page.tsx, globals.css to understand current state
- Checked logo files - logo.png and logo-text.png are same size (131911 bytes)
- Rewrote Header.tsx with all 4 fixes:
  1. Logo: Changed from logo-text.png to logo.png with height:28px to match old text span size
  2. Mega menus: Fixed hover/close logic - menu opens on hover, closes 200ms after mouse leaves both trigger and panel. Added proper cancelCloseMegaMenu on panel enter.
  3. Header background: Added animated right-side with two Framer Motion orbs (lime glow + white glow) with infinite loop animations, plus gradient overlay
  4. Added more audio menu items with icons (Sound Effects, Music Generation, Podcast Editor, AudioCraft, SonicPro)
- Optimized page.tsx with lazy loading for below-the-fold sections using React.lazy() + Suspense
- Verified all fixes via Agent Browser - all passing

Stage Summary:
- Logo now displays as uploaded image at 28px height matching old text span
- Mega menus properly open on hover and close when mouse leaves (200ms debounce)
- Header has animated glowing orbs on right side with infinite loop
- Page performance improved with lazy loading for 12 below-the-fold sections
- No lint errors, server running without issues
