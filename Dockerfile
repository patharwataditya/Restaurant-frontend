# --- builder ---
FROM node:20-alpine AS builder
WORKDIR /app

# 1) Allow glibc-linked binaries to run on Alpine
RUN apk add --no-cache libc6-compat  # <-- important

# 2) Install deps INCLUDING optional (SWC platform binary)
COPY package.json package-lock.json* ./
RUN npm ci --include=optional        # <-- ensure optional deps aren't skipped

# 3) Build
COPY . .
RUN npm run build

# --- runner ---
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache libc6-compat  # <-- keep for runtime too
ENV NODE_ENV=production

# Copy only what you need to run
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npx", "next", "start", "-p", "3000"]

