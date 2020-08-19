# Use node
FROM node:latest

LABEL version="1.0"
LABEL maintainer="sdtorresl@unal.edu.co"

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN npm install

# Expose API port to the outside
EXPOSE 5000

# Launch application
#RUN mongoimport --host localhost --db assessments --collection assessments --type json --file /data/initial/test.json --jsonArray
#RUN mongoimport --host localhost --db assessments --collection questions --type json --file /data/initial/questions.json --jsonArray
CMD ["npm","start"]