FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

# Add any additional dependencies or customizations here
RUN sudo apt-get update && sudo apt-get install -y libsecret-tools && \
    npm install -g @sourcegraph/cody