#!/bin/zsh

# Start a local Convex console for development.
tmux new-session -d -s capuchin 
tmux new-window -t capuchin:2 -n 'Convex Console' 'pnpm dlx convex dev'
tmux new-window -t capuchin:3 -n 'Next.js App' 'pnpm run dev'
tmux a -t capuchin:1