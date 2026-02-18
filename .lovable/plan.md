
# 💕 Valentine's Quest - A Retro Pixel Art Mini Game

## Overview
A charming 2D top-down pixel art game where a female character navigates rooms to encounter a Valentine's Day surprise.

## Game Flow

### Room 1 - The White Room
- A simple white room rendered in pixel art style with a visible door on the right side
- **Several wardrobes scattered around the room with clothes spilling out** — pixel art dressers/closets with colorful garments overflowing from them, adding personality to the space
- The female character sprite appears in the center of the room
- Player moves the character using **arrow keys** (up, down, left, right)
- Wardrobes act as obstacles the character walks around
- Walking into the door transitions to Room 2

### Room 2 - The NPC Room
- A cozy room with a male NPC character standing in the middle
- A visual indicator (like a floating "!" or sparkle) shows the NPC can be interacted with when the player is nearby
- Pressing **Space Bar** near the NPC triggers the dialogue

### Dialogue System
- A text bubble appears above the NPC: **"Will you be my Valentine? 💕"**
- Two clickable choice buttons appear: **"Yes! 💖"** and **"No 😅"**

### "Yes" Ending 🎉
- Colorful pixel fireworks explode across the screen
- Animated monkey sprites bounce and jump around the screen
- A big "Happy Valentine's Day!" message appears
- Celebratory and joyful atmosphere

### "No" Ending 😭 (Funny)
- The NPC dramatically melts/collapses with an over-the-top crying animation
- Comedic text appears: **"NYA!"** with dramatic flair
- Rain clouds appear over the NPC
- A "Try Again?" button lets the player redo the interaction

## Visual Style
- Retro pixel art aesthetic with chunky sprites
- Simple CSS-based pixel characters (no external assets needed)
- Clean, colorful palette with Valentine's Day colors (pinks, reds, whites)

## Technical Approach
- Pure React + CSS implementation using canvas-style div grids or CSS sprites
- Keyboard event listeners for movement
- Simple collision detection for room transitions, wardrobes, and NPC interaction
- State machine for game progression (Room 1 → Room 2 → Dialogue → Ending)
- CSS animations for fireworks, monkey bouncing, and NPC reactions
